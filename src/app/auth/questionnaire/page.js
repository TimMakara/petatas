'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronLeft, User, Briefcase, GraduationCap, Home, Users, ShoppingBag, Coffee, Store, Wrench, Zap, TrendingUp, Heart, Rocket, Building, Palette, Compass } from 'lucide-react';

export default function QuestionnairePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    nama: '',
    umur: '',
    lokasi: '',
    role: '', // 'pengguna' or 'bisnis'
    profesi: '',
    frequency: '',
    motivation: '',
    businessScale: '',
    businessType: '',
    qrisStatus: '',
    challenge: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('petatasUser');
    if (!user) {
      router.push('/auth/signup');
    }
  }, [router]);

  // Initial questions (before role selection)
  const initialQuestions = [
    {
      id: 'nama',
      question: 'Siapa nama Anda?',
      type: 'text',
      icon: User,
      placeholder: 'Masukkan nama lengkap Anda',
      description: 'Nama yang akan kami gunakan untuk memanggil Anda'
    },
    {
      id: 'umur',
      question: 'Berapa umur Anda?',
      type: 'number',
      icon: User,
      placeholder: 'Contoh: 25',
      description: 'Ini membantu kami menyesuaikan pengalaman untuk Anda'
    },
    {
      id: 'lokasi',
      question: 'Anda tinggal di mana?',
      type: 'text',
      icon: User,
      placeholder: 'Kota/Kabupaten',
      description: 'Untuk menampilkan merchant dan challenge yang relevan'
    }
  ];

  // Question flow
  const roleQuestion = {
    id: 'role',
    question: 'Apa peran Anda?',
    icon: User,
    options: [
      { value: 'pengguna', label: 'Pengguna', description: 'Saya ingin menggunakan QRIS', icon: User },
      { value: 'bisnis', label: 'Pelaku Bisnis', description: 'Saya pemilik usaha/UMKM', icon: Briefcase }
    ]
  };

  // Branch A: Questions for Pengguna
  const penggunaQuestions = [
    {
      id: 'profesi',
      question: 'Apa profesi Anda?',
      icon: GraduationCap,
      description: 'Ini membantu kami memberikan challenge yang sesuai',
      options: [
        { value: 'mahasiswa', label: 'Mahasiswa/Pelajar', description: 'Sedang menempuh pendidikan', icon: GraduationCap },
        { value: 'guru', label: 'Guru/Dosen', description: 'Tenaga pendidik', icon: Users },
        { value: 'pegawai', label: 'Pegawai Kantoran', description: 'Bekerja di perusahaan/instansi', icon: Briefcase },
        { value: 'irt', label: 'Ibu Rumah Tangga', description: 'Mengurus rumah tangga', icon: Home },
        { value: 'lainnya', label: 'Pemuda/Lainnya', description: 'Pekerjaan lain', icon: User }
      ]
    },
    {
      id: 'frequency',
      question: 'Seberapa sering Anda gunakan digital payment?',
      icon: Zap,
      description: 'E-wallet, mobile banking, QRIS, dll',
      options: [
        { value: 'sering', label: 'Sering', description: 'Hampir setiap hari' },
        { value: 'kadang', label: 'Kadang-kadang', description: '2-3x seminggu' },
        { value: 'jarang', label: 'Jarang', description: 'Sesekali saja' },
        { value: 'belum', label: 'Belum Pernah', description: 'Masih pakai cash' }
      ]
    },
    {
      id: 'motivation',
      question: 'Apa yang paling Anda inginkan dari QRIS?',
      icon: Heart,
      description: 'Motivasi Anda menggunakan pembayaran digital',
      options: [
        { value: 'cepat', label: 'Transaksi Cepat', description: 'Ga perlu antri lama' },
        { value: 'cashback', label: 'Cashback & Rewards', description: 'Dapat poin dan hadiah' },
        { value: 'aman', label: 'Lebih Aman', description: 'Ga khawatir uang hilang' },
        { value: 'praktis', label: 'Praktis', description: 'Ga perlu bawa cash banyak' }
      ]
    }
  ];

  // Branch B: Questions for Pelaku Bisnis  
  const bisnisQuestions = [
    {
      id: 'businessScale',
      question: 'Bagaimana skala bisnis Anda?',
      icon: TrendingUp,
      description: 'Ukuran usaha Anda saat ini',
      options: [
        { value: 'umkm', label: 'UMKM', description: 'Usaha Mikro, Kecil & Menengah', icon: Store },
        { value: 'warung', label: 'Warung/Kedai', description: 'Usaha rumahan atau warung kecil', icon: Coffee },
        { value: 'toko', label: 'Toko/Restoran', description: 'Usaha dengan tempat tetap', icon: ShoppingBag },
        { value: 'freelance', label: 'Freelance/Jasa', description: 'Bekerja sendiri/jasa', icon: User }
      ]
    },
    {
      id: 'businessType',
      question: 'Apa jenis usaha Anda?',
      icon: Store,
      description: 'Kategori bisnis Anda',
      options: [
        { value: 'warung', label: 'Warung Makan/Kopi', description: 'Makanan & minuman', icon: Coffee },
        { value: 'retail', label: 'Toko Retail/Sembako', description: 'Toko kelontong & kebutuhan', icon: ShoppingBag },
        { value: 'restoran', label: 'Restoran/Rumah Makan', description: 'Bisnis kuliner', icon: Coffee },
        { value: 'jasa', label: 'Jasa', description: 'Salon, bengkel, dll', icon: Wrench },
        { value: 'pedagang', label: 'Pedagang Pasar', description: 'Jualan di pasar', icon: Store }
      ]
    },
    {
      id: 'qrisStatus',
      question: 'Status QRIS Anda saat ini?',
      icon: Zap,
      description: 'Apakah sudah punya dan pakai QRIS?',
      options: [
        { value: 'belum', label: 'Belum Punya QRIS', description: 'Masih pakai cash saja' },
        { value: 'baru', label: 'Baru Daftar', description: 'Sudah daftar tapi jarang dipakai' },
        { value: 'aktif', label: 'Aktif Pakai', description: 'Regularly use (3-20 tx/minggu)' },
        { value: 'power', label: 'Power User', description: 'Heavy user (>20 tx/minggu)' }
      ]
    },
    {
      id: 'challenge',
      question: 'Apa tantangan terbesar Anda?',
      icon: Heart,
      description: 'Kami ingin membantu mengatasi tantangan Anda',
      options: [
        { value: 'pemasaran', label: 'Pemasaran', description: 'Sulit menarik pelanggan baru' },
        { value: 'digital', label: 'Digitalisasi', description: 'Belum melek teknologi digital' },
        { value: 'modal', label: 'Modal Usaha', description: 'Keterbatasan modal' },
        { value: 'kompetisi', label: 'Persaingan', description: 'Banyak kompetitor' }
      ]
    }
  ];

  // Helper function to get questions based on given answers
  const getCurrentQuestionsForAnswers = (answersObj) => {
    const allQuestions = [...initialQuestions, roleQuestion];
    
    if (answersObj.role === 'pengguna') {
      return [...allQuestions, ...penggunaQuestions];
    } else if (answersObj.role === 'bisnis') {
      return [...allQuestions, ...bisnisQuestions];
    }
    
    return allQuestions;
  };

  // Calculate current questions based on role - will recalculate when answers.role changes
  const currentQuestions = (() => {
    const allQuestions = [...initialQuestions, roleQuestion];
    
    if (answers.role === 'pengguna') {
      return [...allQuestions, ...penggunaQuestions];
    } else if (answers.role === 'bisnis') {
      return [...allQuestions, ...bisnisQuestions];
    }
    
    return allQuestions;
  })();
  const currentQuestion = currentQuestions[currentStep];
  const progress = ((currentStep + 1) / currentQuestions.length) * 100;

  const handleAnswer = (value) => {
    const questionId = currentQuestion.id;
    
    // Update answers
    const newAnswers = {
      ...answers,
      [questionId]: value
    };
    setAnswers(newAnswers);

    // If this is the role question, we need to recalculate questions on next render
    // So we move to next step after state update
    const newCurrentQuestions = questionId === 'role' ? getCurrentQuestionsForAnswers(newAnswers) : currentQuestions;
    
    // Move to next question or finish
    if (currentStep < newCurrentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    } else {
      // Save to localStorage and redirect
      setTimeout(() => {
        const phone = localStorage.getItem('petatasUserPhone') || '';
        const userData = {
          nama: newAnswers.nama,
          phone: phone,
          umur: newAnswers.umur,
          lokasi: newAnswers.lokasi,
          questionnaire: newAnswers
        };
        localStorage.setItem('petatasUser', JSON.stringify(userData));
        localStorage.removeItem('petatasUserPhone');
        
        // Redirect based on role
        if (newAnswers.role === 'bisnis') {
          router.push('/mitra/onboarding');
        } else {
          router.push('/pengguna/onboarding');
        }
      }, 300);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    const value = answers[currentQuestion.id];
    if (!value || !value.trim()) {
      alert('Mohon isi jawaban terlebih dahulu');
      return;
    }
    handleAnswer(value);
  };

  const handleTextChange = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!currentQuestion) return null;

  const QuestionIcon = currentQuestion.icon;

  return (
    <div className="min-h-screen flex flex-col px-4 pt-6 pb-8 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f5ff 50%, #fff9f5 100%)'
    }}>
      {/* Animated Background Elements */}
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

      {/* Progress Bar */}
      <div className="w-full max-w-lg mx-auto mb-6 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: '#6379B9' }}>
            Pertanyaan {currentStep + 1} dari {currentQuestions.length}
          </span>
          <span className="text-sm font-semibold" style={{ color: '#D4A373' }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="relative h-3 rounded-full overflow-hidden" style={{
          background: 'rgba(255, 255, 255, 0.6)',
          border: '2px solid rgba(99, 121, 185, 0.3)',
          boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(135deg, #6379B9 0%, #9DB4E8 50%, #D4A373 100%)',
              boxShadow: '0 0 20px rgba(99, 121, 185, 0.4)'
            }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg mx-auto relative z-10">
        <div className="w-full relative rounded-3xl p-6 overflow-hidden" style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(99, 121, 185, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 20px rgba(99, 121, 185, 0.05)'
        }}>
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            background: 'radial-gradient(circle at top, rgba(99, 121, 185, 0.3), transparent 70%)'
          }} />

          {/* Question Icon */}
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center" style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: '2px solid rgba(99, 121, 185, 0.4)',
              boxShadow: '0 0 30px rgba(99, 121, 185, 0.3), inset 0 0 20px rgba(99, 121, 185, 0.1)'
            }}>
              <QuestionIcon className="w-8 h-8" style={{
                color: '#6379B9',
                filter: 'drop-shadow(0 0 8px rgba(99, 121, 185, 0.5))'
              }} />
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-xl font-bold text-center mb-2" style={{
            color: '#1B1B1E',
            textShadow: '0 0 15px rgba(99, 121, 185, 0.2)'
          }}>
            {currentQuestion.question}
          </h2>

          {/* Description */}
          {currentQuestion.description && (
            <p className="text-sm text-center mb-6" style={{ color: '#8B7355' }}>
              {currentQuestion.description}
            </p>
          )}

          {/* Text Input or Options */}
          {currentQuestion.type === 'text' || currentQuestion.type === 'number' ? (
            <form onSubmit={handleTextSubmit} className="space-y-4 relative z-10">
              <input
                type={currentQuestion.type}
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="w-full px-4 py-3.5 rounded-xl border-2 focus:outline-none transition-all"
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
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, #6379B9 0%, #7A8FD1 100%)',
                  border: '2px solid rgba(99, 121, 185, 0.4)',
                  boxShadow: '0 0 20px rgba(99, 121, 185, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(99, 121, 185, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(99, 121, 185, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Lanjut
              </button>
            </form>
          ) : (
            <div className="space-y-3 relative z-10">
              {currentQuestion.options.map((option) => {
                const OptionIcon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full p-3.5 rounded-xl border-2 transition-all duration-300 text-left group relative overflow-hidden"
                    style={{
                      borderColor: 'rgba(99, 121, 185, 0.3)',
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(99, 121, 185, 0.6)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 121, 185, 0.25)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(99, 121, 185, 0.3)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                      background: 'radial-gradient(circle at center, rgba(99, 121, 185, 0.1), transparent 70%)'
                    }} />
                    
                    <div className="flex items-center gap-3 relative z-10">
                      {OptionIcon && (
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{
                          background: 'rgba(99, 121, 185, 0.1)',
                          border: '2px solid rgba(99, 121, 185, 0.2)'
                        }}>
                          <OptionIcon className="w-5 h-5" style={{ color: '#6379B9' }} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm" style={{ color: '#1B1B1E' }}>
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-xs mt-0.5 line-clamp-1" style={{ color: '#8B7355' }}>
                            {option.description}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: '#6379B9' }} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Back Button */}
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all text-sm"
            style={{
              color: '#6379B9',
              background: 'rgba(255, 255, 255, 0.6)',
              border: '2px solid rgba(99, 121, 185, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 121, 185, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.6)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali
          </button>
        )}
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
      `}</style>
    </div>
  );
}

