'use client';
import './auth.css'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link'; 
import {injectModels} from '@/Redux/injectModel'
const ForgotPassword = (props:any) => {
  console.log(props,'props')
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const validateEmail = (email: string) => {
  
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); 
    setSuccess(''); 

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email must contain @ and a valid domain (e.g., @example.com).");
      return;
    }

    try {
      const object = {
        email: email,
      };

      const response = await props.auth.forgotPassword(object);

      if (response.success) { 
        setSuccess("Password reset link sent! Please check your email.");
        alert("Password reset link sent! Please check your email.");
        router.push('/login'); 
      } else {
       
        setError(response.msg || "Failed to send password reset link. Please try again.");
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      
      setError(error?.response?.data?.msg || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2> 

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          className="input-field" 
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Remembered your password? <Link href="/login">Login</Link></p> 
        <button type="submit" className="button">Send Reset Link</button> 
      </form>
    </div>
  );
};

export default injectModels(['auth'])(ForgotPassword);