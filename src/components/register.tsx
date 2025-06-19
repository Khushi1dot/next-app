'use client';
import './auth.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { injectModels } from '@/Redux/injectModel';
const Register = (props:any) => {
  console.log(props,'props')
  const [Fname, setFname] = useState('');
  const [Lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const validEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
  const validPassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    ;
    return regex.test(password);
  }


  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!Fname ||!Lname || !email || !role|| !password) {
      // console.log('invlaid details');
      setError("All field are required");
      return;
    }

    if (!validEmail(email)) {
      setError("Email must contain @ and .com and @ will come befor .com")
      return;
    }

    if (!validPassword(password)) {
      setError("Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.");
      return;
    }

    try {
      let object = {
        firstName: Fname,
        lastName: Lname,
        role:  role,
        email: email,
        password: password
      }
      const response = await props.auth.register(object);
      if(response.success){
      router.push('/login')
      setSuccess("Registration successfull.");
      alert("Registration successfull.");
      console.log('Registeration success:', response);
      }else{
        console.log('user already exists')
        setSuccess('user already register');
        
      }
    } catch (error) {
      console.log('Registration failed:', error);
      setError("Getting error in registration");
    }
  };

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleRegister}>
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          className="input-field"
          type="text"
          placeholder="Enter your first name"
          value={Fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Enter your last name"
          value={Lname}
          onChange={(e) => setLname(e.target.value)}
        />
         <input
          className="input-field"
          type="text"
          placeholder="Enter your role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <input
          className="input-field"
          type="email"
          placeholder="Enter your email"
          value-={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Already have an account
          <Link href='/login'>SignIn</Link>
        </p>
        <button type="submit" className="button">Register</button>
      </form>
    </div>
  );
};

export default injectModels(['auth'])(Register);
