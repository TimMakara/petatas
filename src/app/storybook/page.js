'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Sparkles, Send, Map, Lightbulb, Wand2, Shield, Moon, PartyPopper, Loader2 } from 'lucide-react';

export default function StorybookPage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dummy moods for selection with lucide-react icons
  const moods = [
    { id: 'adventure', name: 'Petualangan', icon: Map, color: '#FFC857' },
    { id: 'wisdom', name: 'Kebijaksanaan', icon: Lightbulb, color: '#D4A373' },
    { id: 'magical', name: 'Magis', icon: Wand2, color: '#473C8B' },
    { id: 'heroic', name: 'Heroik', icon: Shield, color: '#2563eb' },
    { id: 'mysterious', name: 'Misterius', icon: Moon, color: '#6366f1' },
    { id: 'joyful', name: 'Riang', icon: PartyPopper, color: '#ec4899' },
  ];

  const handleGenerate = async () => {
    if (!topic.trim()) {
      alert('Silakan masukkan topik terlebih dahulu!');
      return;
    }
    if (!selectedMood) {
      alert('Silakan pilih mood cerita!');
      return;
    }
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate loading for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to the story page with the fixed ID
    router.push('/storybook/my/0debe010-4dfc-452b-bdce-caaca077d3c0');
  };

  const handleQuickSuggestion = () => {
    setTopic('Pacu Jalur Riau');
  };

  return (
    <div className="min-h-screen pb-24 px-4 sm:px-6" style={{backgroundColor: '#F8F5F2'}}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl">
            <div className="flex justify-center mb-4">
              <Loader2 className="w-16 h-16 animate-spin" style={{color: '#473C8B'}} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{color: '#1B1B1E'}}>
              Membuat Storybook...
            </h3>
            <p className="text-sm" style={{color: '#473C8B'}}>
              AI sedang menyiapkan cerita edukatif untuk Anda
            </p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="pt-8 pb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#473C8B'}}>
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{color: '#1B1B1E'}}>
          Buat Storybook
        </h1>
        <p className="text-base" style={{color: '#473C8B'}}>
          Cerita budaya Indonesia yang interaktif dan edukatif
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Topic Input Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2" style={{borderColor: '#D4A373'}}>
          <label className="block mb-3">
            <span className="text-lg font-semibold" style={{color: '#1B1B1E'}}>
              Topik Budaya
            </span>
            <span className="text-sm ml-2" style={{color: '#473C8B'}}>
              Apa yang ingin Anda pelajari?
            </span>
          </label>
          
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: Cerita tentang tradisi Pacu Jalur Riau..."
            className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-opacity-100 transition-all resize-none"
            style={{
              borderColor: '#D4A373',
              color: '#1B1B1E',
              backgroundColor: '#F8F5F2',
              minHeight: '120px'
            }}
          />

          {/* Quick Suggestion */}
          <div className="mt-3">
            <p className="text-sm mb-2" style={{color: '#473C8B'}}>
              Saran cepat:
            </p>
            <button
              onClick={handleQuickSuggestion}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 hover:shadow-md transition-all text-sm font-medium"
              style={{
                borderColor: '#FFC857',
                color: '#473C8B',
                backgroundColor: 'rgba(255, 200, 87, 0.1)'
              }}
            >
              <Sparkles className="w-4 h-4" />
              Pacu Jalur Riau
            </button>
          </div>
        </div>

        {/* Mood Selection Section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2" style={{borderColor: '#D4A373'}}>
          <label className="block mb-4">
            <span className="text-lg font-semibold" style={{color: '#1B1B1E'}}>
              Pilih Mood Cerita
            </span>
            <span className="text-sm ml-2" style={{color: '#473C8B'}}>
              Bagaimana gaya ceritanya?
            </span>
          </label>

          <div className="grid grid-cols-2 gap-3">
            {moods.map((mood) => {
              const IconComponent = mood.icon;
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedMood === mood.id
                      ? 'border-opacity-100 shadow-lg scale-105'
                      : 'border-opacity-30 hover:border-opacity-60'
                  }`}
                  style={{
                    borderColor: mood.color,
                    backgroundColor: selectedMood === mood.id 
                      ? `${mood.color}15` 
                      : 'transparent'
                  }}
                >
                  <IconComponent 
                    className="w-8 h-8 mx-auto mb-2" 
                    style={{color: mood.color}}
                  />
                  <div className="text-sm font-semibold" style={{color: '#1B1B1E'}}>
                    {mood.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!topic.trim() || !selectedMood || isLoading}
          className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 ${
            !topic.trim() || !selectedMood || isLoading
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:shadow-xl hover:scale-105'
          }`}
          style={{
            backgroundColor: '#473C8B',
            color: 'white'
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Membuat...
            </>
          ) : (
            <>
              <Send className="w-6 h-6" />
              Buat Storybook
            </>
          )}
        </button>

        {/* Info Text */}
        <div className="text-center px-4">
          <p className="text-sm" style={{color: '#473C8B'}}>
            AI akan menghasilkan cerita edukatif berdasarkan topik dan mood yang Anda pilih
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 gap-4 pt-4">
          <div className="flex items-start gap-3 p-4 rounded-xl" style={{backgroundColor: 'rgba(212, 163, 115, 0.1)'}}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{backgroundColor: '#D4A373'}}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1" style={{color: '#1B1B1E'}}>
                Cerita Interaktif
              </h3>
              <p className="text-sm" style={{color: '#473C8B'}}>
                Nikmati cerita dengan visual yang menarik dan narasi yang mendalam
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl" style={{backgroundColor: 'rgba(71, 60, 139, 0.1)'}}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{backgroundColor: '#473C8B'}}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold mb-1" style={{color: '#1B1B1E'}}>
                Disesuaikan dengan Mood
              </h3>
              <p className="text-sm" style={{color: '#473C8B'}}>
                Setiap cerita disesuaikan dengan mood yang Anda pilih untuk pengalaman yang unik
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
