'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Validate required fields
      if (!phone.trim()) {
        alert('Nomor HP wajib diisi!');
        return;
      }
      
      // Store phone temporarily
      localStorage.setItem('petatasUserPhone', phone);
      
      // Redirect to questionnaire
      router.push('/auth/questionnaire');
    } else {
      // Login flow - just check if phone exists
      if (!phone.trim()) {
        alert('Nomor HP wajib diisi!');
        return;
      }
      
      const existingUser = localStorage.getItem('petatasUser');
      if (existingUser) {
        // Assume login successful - go to home or dashboard
        router.push('/galeri');
      } else {
        alert('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f5ff 50%, #fff9f5 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#6379B9 1px, transparent 1px), linear-gradient(90deg, #6379B9 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />

        {/* Floating Orbs */}
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

      {/* Main Card */}
      <div className="w-full max-w-sm relative z-10">
        <div className="relative rounded-3xl p-8 overflow-hidden" style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(99, 121, 185, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 20px rgba(99, 121, 185, 0.05)'
        }}>
          {/* Glow effect */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            background: 'radial-gradient(circle at top, rgba(99, 121, 185, 0.3), transparent 70%)'
          }} />

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full opacity-30 blur-2xl" style={{
                background: 'radial-gradient(circle, rgba(99, 121, 185, 0.4), transparent 70%)',
                animation: 'float 6s ease-in-out infinite'
              }} />
              <img src="/petatas-mascot.png" alt="Petatas Mascot" className="w-24 h-24 relative z-10 object-contain" style={{
                filter: 'drop-shadow(0 0 15px rgba(99, 121, 185, 0.3))'
              }} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-center mb-2" style={{
            color: '#1B1B1E',
            textShadow: '0 0 15px rgba(99, 121, 185, 0.2)'
          }}>
            {isSignUp ? 'Selamat Datang! 👋' : 'Masuk Kembali'}
          </h1>
          <p className="text-center text-sm mb-6" style={{
            color: '#8B7355',
            textShadow: '0 0 5px rgba(212, 163, 115, 0.2)'
          }}>
            {isSignUp ? 'Mari kenalan dulu sebelum memulai' : 'Lanjutkan perjalanan Anda'}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#1B1B1E' }}>
                Nomor WhatsApp <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6379B9' }} />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
                  style={{
                    borderColor: 'rgba(99, 121, 185, 0.3)',
                    color: '#1B1B1E',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99, 121, 185, 0.6)';
                    e.target.style.boxShadow = '0 0 20px rgba(99, 121, 185, 0.25), inset 0 2px 10px rgba(0, 0, 0, 0.05)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(99, 121, 185, 0.3)';
                    e.target.style.boxShadow = 'inset 0 2px 10px rgba(0, 0, 0, 0.05)';
                  }}
                />
              </div>
              {isSignUp && (
                <p className="text-xs mt-2" style={{ color: '#8B7355' }}>
                  Kami akan mengirim kode OTP ke nomor ini
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="relative w-full py-3 rounded-xl font-bold text-white transition-all duration-300 overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #6379B9 0%, #7A8FD1 100%)',
                border: '2px solid rgba(99, 121, 185, 0.4)',
                boxShadow: '0 0 30px rgba(99, 121, 185, 0.3)',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 0 40px rgba(99, 121, 185, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(99, 121, 185, 0.3)';
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                animation: 'shimmer 2s infinite'
              }} />
              <span className="relative z-10">{isSignUp ? 'Daftar' : 'Masuk'}</span>
            </button>

            {/* Toggle Sign Up / Login */}
            <div className="text-center mt-4">
              <p className="text-sm" style={{ color: '#8B7355' }}>
                {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="font-semibold transition-all"
                  style={{ color: '#6379B9' }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#9DB4E8';
                    e.target.style.textShadow = '0 0 10px rgba(99, 121, 185, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6379B9';
                    e.target.style.textShadow = 'none';
                  }}
                >
                  {isSignUp ? 'Masuk di sini' : 'Daftar di sini'}
                </button>
              </p>
            </div>
          </form>
        </div>
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

