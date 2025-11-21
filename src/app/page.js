'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is onboarded
    const user = typeof window !== 'undefined' ? localStorage.getItem('petatasUser') : null;
    if (user) {
      router.push('/pengguna/dashboard');
    } else {
      router.push('/auth/signup');
    }
  }, [router]);

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
      <div className="relative w-full max-w-[430px] h-full bg-white flex items-center justify-center shadow-2xl">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#E29B06] to-[#6379B9] rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">PETATAS</h1>
          <p className="text-gray-600 mb-6">Platform Gamifikasi Adopsi QRIS Papua</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E29B06] mx-auto"></div>
        </div>
      </div>
    </div>
  );
}
