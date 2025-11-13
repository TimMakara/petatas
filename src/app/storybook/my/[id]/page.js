'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, BookOpen, Heart, Share2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function MyStorybookPage() {
  const router = useRouter();
  const params = useParams();
  const [isFavorited, setIsFavorited] = useState(false);

  // Dummy storybook data - will be replaced with actual data from API
  const storybook = {
    id: params.id,
    title: 'Pacu Jalur Riau',
    subtitle: 'Tradisi Balap Perahu Legendaris',
    mood: 'adventure',
    description: 'Cerita ini akan menampilkan tradisi Pacu Jalur yang merupakan warisan budaya Riau.',
    createdAt: new Date().toLocaleDateString('id-ID'),
    totalPages: 10
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: storybook.title,
        text: storybook.subtitle,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Link telah disalin ke clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="min-h-screen pb-24" style={{backgroundColor: '#F8F5F2'}}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-4 flex items-center justify-between border-b shadow-sm" style={{backgroundColor: 'white', borderColor: '#D4A373'}}>
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-opacity-10 transition-all"
          style={{color: '#473C8B'}}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" style={{color: '#473C8B'}} />
          <span className="font-semibold" style={{color: '#1B1B1E'}}>
            Lihat Storybook
          </span>
        </div>
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 px-4 pt-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#473C8B'}}>
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{color: '#1B1B1E'}}>
            {storybook.title}
          </h1>
          <p className="text-lg mb-2" style={{color: '#473C8B'}}>
            {storybook.subtitle}
          </p>
          <p className="text-sm" style={{color: '#D4A373'}}>
            Dibuat pada {storybook.createdAt}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 mb-6 mx-4" style={{borderColor: '#D4A373'}}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold" style={{color: '#1B1B1E'}}>
              Tentang Storybook Ini
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={handleFavorite}
                className={`p-2 rounded-lg transition-all ${isFavorited ? 'bg-red-50' : 'hover:bg-gray-100'}`}
                style={{color: isFavorited ? '#ef4444' : '#473C8B'}}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleShare}
                className="p-2 rounded-lg hover:bg-gray-100 transition-all"
                style={{color: '#473C8B'}}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="leading-relaxed mb-6" style={{color: '#473C8B'}}>
            {storybook.description}
          </p>
          
          <div className="border-t pt-6" style={{borderColor: '#D4A373'}}>
            <p className="text-sm font-semibold mb-2" style={{color: '#1B1B1E'}}>
              ID Storybook:
            </p>
            <code className="text-xs px-3 py-2 rounded-lg block break-all" style={{backgroundColor: '#F8F5F2', color: '#473C8B'}}>
              {storybook.id}
            </code>
          </div>
        </div>

        {/* Comic Viewer */}
        <div>
          {Array.from({ length: storybook.totalPages }, (_, index) => (
            <div key={index + 1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/komik-pacujalur/${index + 1}.png`}
                alt={`Halaman ${index + 1}`}
                className="w-full h-auto"
                style={{display: 'block'}}
              />
            </div>
          ))}
        </div>

        {/* End of Story Section */}
        <div className="px-4 py-12 text-center" style={{backgroundColor: '#F8F5F2'}}>
          <div className="max-w-md mx-auto">
            {/* End of Story Badge */}
            <div className="inline-block px-6 py-2 rounded-full mb-6" style={{backgroundColor: '#473C8B'}}>
              <p className="text-white font-bold text-lg">Akhir Cerita</p>
            </div>

            {/* Question */}
            <h3 className="text-xl font-semibold mb-6" style={{color: '#1B1B1E'}}>
              Anda suka dengan cerita ini?
            </h3>

            {/* Like and Share Buttons */}
            <div className="flex gap-3 justify-center mb-8">
              <button 
                onClick={handleFavorite}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isFavorited ? 'scale-105' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: isFavorited ? '#ef4444' : 'white',
                  color: isFavorited ? 'white' : '#473C8B',
                  border: `2px solid ${isFavorited ? '#ef4444' : '#D4A373'}`
                }}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Disukai' : 'Suka'}
              </button>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: 'white',
                  color: '#473C8B',
                  border: '2px solid #D4A373'
                }}
              >
                <Share2 className="w-5 h-5" />
                Bagikan
              </button>
            </div>

            {/* UMKM Support Section */}
            <div className="bg-white rounded-2xl p-6 border-2 shadow-lg" style={{borderColor: '#FFC857'}}>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#FFC857'}}>
                  <ShoppingCart className="w-8 h-8" style={{color: '#473C8B'}} />
                </div>
              </div>
              <p className="text-base leading-relaxed mb-4" style={{color: '#1B1B1E'}}>
                Dukung UMKM lokal dan lihat produk yang berkaitan dengan budaya ini!
              </p>
              <button
                onClick={() => router.push(`/marketplace?story=${storybook.id}`)}
                className="w-full py-3 rounded-xl font-bold text-white transition-all hover:shadow-xl hover:scale-105"
                style={{backgroundColor: '#473C8B'}}
              >
                Lihat Produk Berkaitan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
