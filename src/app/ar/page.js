'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function ARPage() {
  const [currentScene, setCurrentScene] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [scriptIndex, setScriptIndex] = useState(0);
  const modelViewerRef = useRef(null);

  // Sample scenes with models and scripts
  const scenes = [
    {
      model: '/models/cartoon_crocodile_croco-roco.glb',
      script: [
        'In ancient Indonesian waters,',
        'crocodiles were revered as sacred creatures.'
      ]
    },
    {
      model: '/models/banana.glb',
      script: [
        'Bananas have been cultivated in Indonesia',
        'for thousands of years as a staple food.'
      ]
    }
  ];

  // Auto-play scenes
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentScene((prev) => {
        const next = prev + 1;
        if (next >= scenes.length) {
          setAutoPlay(false);
          return prev;
        }
        return next;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, [autoPlay, scenes.length]);

  // Animate script lines
  useEffect(() => {
    setScriptIndex(0);
    const timer = setInterval(() => {
      setScriptIndex((prev) => {
        if (prev < scenes[currentScene].script.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentScene, scenes]);

  const nextScene = () => {
    setAutoPlay(false);
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
    }
  };

  const prevScene = () => {
    setAutoPlay(false);
    if (currentScene > 0) {
      setCurrentScene(prev => prev - 1);
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  return (
    <>
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
      />

      <div className="min-h-screen" style={{backgroundColor: '#F8F5F2'}}>
        {/* Navigation */}
        <nav className="fixed top-0 w-full backdrop-blur-md z-50 border-b" style={{backgroundColor: 'rgba(248, 245, 242, 0.95)', borderColor: '#D4A373'}}>
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/1.svg" alt="Lelana Logo" className="h-10" />
              </div>
              <div className="flex items-center gap-4">
                <a href="/" className="text-sm font-medium transition" style={{color: '#473C8B'}}>
                  ← Kembali ke Home
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-24 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold" style={{color: '#1B1B1E'}}>
                Pengalaman AR Budaya
              </h1>
              <div className="inline-block px-6 py-2 rounded-full font-medium text-sm" style={{backgroundColor: '#D4A373', color: 'white'}}>
                Scene {currentScene + 1} dari {scenes.length}
              </div>
            </div>

            {/* AR Viewer Card */}
            <div className="rounded-3xl shadow-lg overflow-hidden mb-8" style={{backgroundColor: 'white', border: '2px solid #D4A373'}}>
              <model-viewer
                ref={modelViewerRef}
                key={currentScene}
                src={scenes[currentScene].model}
                ar
                ar-modes="scene-viewer webxr quick-look"
                camera-controls
                touch-action="pan-y"
                alt={`3D model for scene ${currentScene + 1}`}
                shadow-intensity="1"
                auto-rotate
                auto-rotate-delay="0"
                rotation-per-second="30deg"
                camera-orbit="0deg 75deg 2.5m"
                style={{
                  width: '100%',
                  height: '500px',
                  backgroundColor: '#F8F5F2'
                }}
              >
                <button slot="ar-button" className="px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105" style={{backgroundColor: '#473C8B', position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)'}}>
                  👁️ Lihat dalam AR
                </button>
              </model-viewer>
            </div>

            {/* Script Display Card */}
            <div className="rounded-3xl p-8 mb-8 relative overflow-hidden" style={{backgroundColor: '#473C8B'}}>
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'url(/batik.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}></div>
              <div className="relative z-10 space-y-4">
                {scenes[currentScene].script.map((line, index) => (
                  <p
                    key={index}
                    className={`text-xl leading-relaxed text-center font-light transition-all duration-500 ${index <= scriptIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{color: '#F8F5F2'}}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={toggleAutoPlay}
                className="px-8 py-3 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: autoPlay ? '#FFC857' : '#D4A373',
                  color: autoPlay ? '#1B1B1E' : 'white'
                }}
              >
                {autoPlay ? '⏸️ Jeda' : '▶️ Auto Play'}
              </button>
              <button
                onClick={prevScene}
                disabled={currentScene === 0}
                className="px-8 py-3 font-semibold rounded-lg border-2 transition-all duration-300"
                style={{
                  borderColor: '#473C8B',
                  color: '#473C8B',
                  backgroundColor: 'white',
                  opacity: currentScene === 0 ? 0.5 : 1,
                  cursor: currentScene === 0 ? 'not-allowed' : 'pointer'
                }}
              >
                ← Sebelumnya
              </button>
              <button
                onClick={nextScene}
                disabled={currentScene === scenes.length - 1}
                className="px-8 py-3 font-semibold rounded-lg border-2 transition-all duration-300"
                style={{
                  borderColor: '#473C8B',
                  color: '#473C8B',
                  backgroundColor: 'white',
                  opacity: currentScene === scenes.length - 1 ? 0.5 : 1,
                  cursor: currentScene === scenes.length - 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Selanjutnya →
              </button>
            </div>

            {/* Instructions Card */}
            <div className="rounded-3xl p-8 backdrop-blur-sm" style={{backgroundColor: 'rgba(212, 163, 115, 0.15)', border: '1px solid #D4A373'}}>
              <h3 className="font-bold text-xl mb-4" style={{color: '#1B1B1E'}}>Cara Menggunakan:</h3>
              <ul className="space-y-3" style={{color: '#473C8B'}}>
                <li className="flex items-start gap-2">
                  <span style={{color: '#D4A373'}}>•</span>
                  <span>Putar dan zoom model 3D di viewer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{color: '#D4A373'}}>•</span>
                  <span>Klik "Lihat dalam AR" untuk mode AR</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{color: '#D4A373'}}>•</span>
                  <span>Navigasi antar scene dengan tombol di atas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{color: '#D4A373'}}>•</span>
                  <span>Aktifkan Auto Play untuk pengalaman otomatis</span>
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-lg" style={{backgroundColor: 'rgba(71, 60, 139, 0.1)'}}>
                <p className="text-sm font-semibold mb-2" style={{color: '#473C8B'}}>
                  📱 Kompatibilitas AR:
                </p>
                <p className="text-sm" style={{color: '#473C8B'}}>
                  <strong>Android:</strong> Scene Viewer (Chrome/Edge)<br/>
                  <strong>iPhone:</strong> Quick Look AR (Safari)<br/>
                  Fitur AR mungkin berbeda per platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
