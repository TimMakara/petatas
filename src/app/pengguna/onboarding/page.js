'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Gift, Users, Trophy, Sparkles } from 'lucide-react';

export default function PenggunaOnboardingPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem('petatasUser');
    if (user) {
      setUserData(JSON.parse(user));
    } else {
      router.push('/auth/signup');
    }
  }, [router]);

  const handleComplete = () => {
    // Navigate to story page
    router.push('/pengguna/onboarding/story');
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f5ff 50%, #fff9f5 100%)'
    }}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#6379B9 1px, transparent 1px), linear-gradient(90deg, #6379B9 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30" style={{
          background: 'radial-gradient(circle, rgba(99, 121, 185, 0.3), transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          filter: 'blur(40px)'
        }} />
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full opacity-30" style={{
          background: 'radial-gradient(circle, rgba(212, 163, 115, 0.3), transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse',
          filter: 'blur(40px)'
        }} />
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Success Icon */}
        <div className="flex justify-center mb-5">
          <div className="relative w-20 h-20 rounded-full flex items-center justify-center" style={{
            background: 'rgba(255, 255, 255, 0.7)',
            border: '2px solid rgba(99, 121, 185, 0.4)',
            boxShadow: '0 0 40px rgba(99, 121, 185, 0.3), inset 0 0 20px rgba(99, 121, 185, 0.1)'
          }}>
            <div className="absolute inset-0 animate-ping opacity-20 rounded-full" style={{
              background: 'radial-gradient(circle, rgba(99, 121, 185, 0.6), transparent 70%)'
            }} />
            <CheckCircle2 className="w-12 h-12 relative z-10" style={{
              color: '#10b981',
              filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))'
            }} />
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2" style={{
            color: '#1B1B1E',
            textShadow: '0 0 20px rgba(99, 121, 185, 0.2)'
          }}>
            Selamat Datang, {userData.nama}!
          </h1>
          <p className="text-sm" style={{
            color: '#8B7355',
            textShadow: '0 0 8px rgba(212, 163, 115, 0.2)'
          }}>
            Profil Anda telah berhasil dibuat
          </p>
        </div>

        {/* Features Card */}
        <div className="relative rounded-3xl p-5 mb-5 overflow-hidden" style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(99, 121, 185, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 20px rgba(99, 121, 185, 0.05)'
        }}>
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            background: 'radial-gradient(circle at top, rgba(99, 121, 185, 0.3), transparent 70%)'
          }} />

          <h2 className="text-lg font-bold mb-4 relative z-10" style={{
            color: '#1B1B1E',
            textShadow: '0 0 10px rgba(99, 121, 185, 0.15)'
          }}>
            Apa yang bisa Anda lakukan:
          </h2>

          <div className="space-y-3 relative z-10">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{
                background: 'rgba(99, 121, 185, 0.15)',
                border: '2px solid rgba(99, 121, 185, 0.3)'
              }}>
                <Sparkles className="w-4 h-4" style={{ color: '#6379B9' }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-0.5" style={{ color: '#1B1B1E' }}>
                  Bayar dengan QRIS
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#8B7355' }}>
                  Scan QR, bayar cepat tanpa ribet uang pas
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{
                background: 'rgba(212, 163, 115, 0.15)',
                border: '2px solid rgba(212, 163, 115, 0.3)'
              }}>
                <Users className="w-4 h-4" style={{ color: '#D4A373' }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-0.5" style={{ color: '#1B1B1E' }}>
                  Challenge & Leaderboard
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#8B7355' }}>
                  Selesaikan challenge, kumpulkan poin, menangkan hadiah
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{
                background: 'rgba(255, 200, 87, 0.15)',
                border: '2px solid rgba(255, 200, 87, 0.3)'
              }}>
                <Trophy className="w-4 h-4" style={{ color: '#FFC857' }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-0.5" style={{ color: '#1B1B1E' }}>
                  Referral & Rewards
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#8B7355' }}>
                  Ajak teman, dapat bonus dan cashback
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleComplete}
          className="w-full relative py-3.5 rounded-xl font-bold text-base text-white transition-all duration-300 overflow-hidden group"
          style={{
            background: 'linear-gradient(135deg, #6379B9 0%, #7A8FD1 100%)',
            border: '2px solid rgba(99, 121, 185, 0.4)',
            boxShadow: '0 0 30px rgba(99, 121, 185, 0.35), inset 0 0 20px rgba(99, 121, 185, 0.1)',
            textShadow: '0 0 8px rgba(255, 255, 255, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 40px rgba(99, 121, 185, 0.5), inset 0 0 30px rgba(99, 121, 185, 0.15)';
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(99, 121, 185, 0.35), inset 0 0 20px rgba(99, 121, 185, 0.1)';
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
            background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
            animation: 'shimmer 2s infinite'
          }} />
          <span className="relative z-10">Mulai Perjalanan</span>
        </button>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

