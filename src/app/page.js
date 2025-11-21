'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
      <div className="relative w-full max-w-[430px] h-full bg-white flex items-center justify-center shadow-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">PETATAS</h1>
          <p className="text-gray-600">Platform Gamifikasi Adopsi QRIS Papua</p>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E29B06] mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
