'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import '@/components/auth.css';
import {injectModels} from '@/Redux/injectModel';
const ResetPassword = (props:any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const access_token = searchParams.get('access_token'); // ✅ extract token from URL

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  useEffect(() => {
    if (!access_token) {
      setError('Missing or invalid token. Please request a new password reset.');
    }
  }, [access_token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await props.auth.resetPassword({
        password,
        // confirmPassword,
        access_token,
      });

      if (response.success) {
        setSuccess('Password reset successful! Redirecting to login...');
         router.push('/login');
      } else {
        setError(response.message || 'Failed to reset password.');
      }
    } catch (err: any) {
      console.error('Reset error:', err);
      setError(err?.response?.data?.message || 'Unexpected error occurred.');
    }
  };

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="input-group">
          <label htmlFor="password">New Password:</label>
          <input
            className="input-field"
            type="password"
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            className="input-field"
            type="password"
            id="confirmPassword"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="button" type="submit">
          Reset Password
        </button>
        <p>
          <Link href="/login">Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default injectModels(['auth'])(ResetPassword);
