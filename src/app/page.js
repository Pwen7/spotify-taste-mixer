'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getValidAccessToken, getSpotifyAuthUrl } from '@/lib/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const token = await getValidAccessToken();
      if (token) {
        router.push('/dashboard');
      }
    };
    check();
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <>
      <div className='h-screen grid place-items-center'>
        <button onClick={handleLogin} className='bg-[#1db954] hover:bg-[#1ba14a] font-bold px-4 py-2 rounded-lg'>
          Login
        </button>
      </div>
    </>
  );
}