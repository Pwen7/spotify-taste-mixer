'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getSpotifyAuthUrl } from '@/lib/auth';
import Header from "@/components/Header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Si ya está autenticado, redirigir al dashboard
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <>
      <div>
        <Header></Header>
        <button onClick={handleLogin} className='bg-[#1db954] hover:bg-[#1ba14a] text-white font-bold py-2 px-4 rounded'>
          Start
        </button>
      </div>
    </>
  );
}