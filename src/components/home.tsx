'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
 
 Cookies.remove("access_token");
 Cookies.remove("isAuthenticated");
 router.push('/login');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to the Home Page!</h1>
      <p>You are successfully logged in.</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}
