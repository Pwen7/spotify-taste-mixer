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
      <div className='h-screen grid place-items-center'>
        <button onClick={handleLogin} className='bg-[#1db954] hover:bg-[#1ba14a] font-bold px-4 py-2 rounded-lg'>
          Start
        </button>
      </div>
    </>
  );
}