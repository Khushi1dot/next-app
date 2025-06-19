'use client';
import './auth.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Auth } from '@/Services/index';
import {injectModels} from '@/Redux/injectModel'
const Login = (props:any) => {
  console.log(props,'props');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const validateEmail = (email: string) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return regex.test(password);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email must contain @ and .com and @ will come befor .com');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.');
      return;
    }

    try {
      let object = {
        email: email,
        password: password,
        role:'user'
      }
      const response = await props.auth.login(object);
      if (response.success) {
        setSuccess('Login successful!');
        console.log('login success:', response);
        router.push('/home');
      } else {
        console.log('Login failed:', error);
        setError("Getting error in login");
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error?.response?.data?.msg || 'Login failed.');
    }
  };

  const handleForgot = () => {
    router.push('/forgotPassword')
  }

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleLogin}>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          className="input-field"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Don't have an account? <Link href="/register">Register</Link></p>
        <button type="submit" className="button">Login</button> <br></br><br></br>
        <span className='button' onClick={handleForgot}>Forgot Password</span>
      </form>
    </div>
  );
};

export default injectModels(['auth'])(Login);
