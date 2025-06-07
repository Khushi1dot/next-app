'use client';
import './auth.css';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import{Auth} from '@/Services/index'
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const validEmail = (email: string) => {
    const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

    if (!name || !email || !password) {
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
      let object={
        name:name,
        email:email,
        password:password
      }
      const response = await Auth.registerUser (object);
      router.push('/login')
      setSuccess("Registration successfull");
      console.log('Registeration success:', response.data);
    } catch (error) {
      console.log('Registration failed:', error)
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
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default Register;
