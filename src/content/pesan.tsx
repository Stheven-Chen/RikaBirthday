import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cake, Gift, Sparkles, Heart, ArrowLeft, Music } from 'lucide-react';

const Pesan = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Hentikan audio ketika komponen unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleRayakanClick = () => {
    setShowPopup(true);
  };

  const startCelebration = () => {
    setShowPopup(false);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => {
        console.error("Error playing audio:", e);
      });
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    navigate('/galeri');
  };

  // Animasi CSS untuk popup, confetti, dan osilasi scale
  const animationsStyle = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes fall {
      0% { top: -10vh; opacity: 1; }
      100% { top: 100vh; opacity: 0; }
    }
    @keyframes scaleOscillation {
      0% { transform: scale(0.9); }
      50% { transform: scale(1.0); }
      100% { transform: scale(0.9); }
    }
  `;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 relative">
      {/* Audio player menggunakan link raw GitHub */}
      <audio ref={audioRef} preload="auto">
        <source 
          src="https://raw.githubusercontent.com/Stheven-Chen/birthdaySong/main/birthday%20song.mp3" 
          type="audio/mpeg" 
        />
      </audio>
      
      <style>{animationsStyle}</style>
      
      {/* Popup untuk memulai pemutaran audio */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center"
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Music size={32} className="text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-blue-800 mb-4">
              Sebelum Kita Rayakan
            </h3>
            <p className="text-blue-700 mb-6">
              Ayo kita dengar lagu ini dulu untukmu!
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 border border-blue-300 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
              >
                Nanti Saja
              </button>
              <button
                onClick={startCelebration}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Putar Lagu!
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Confetti muncul terus menerus selama audio diputar */}
      {isPlaying && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => {
            const duration = Math.random() * 3 + 2;
            const delay = -Math.random() * duration;
            const color = ['#ff4d4d', '#ffcc00', '#66ff66', '#66d9ff', '#cc66ff'][Math.floor(Math.random() * 5)];
            return (
              <div 
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  animation: `fall ${duration}s linear infinite ${delay}s, scaleOscillation 2s ease-in-out infinite`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  background: color,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      )}
      
      <button 
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-white/80 p-2 rounded-full hover:bg-blue-100 transition-colors z-10"
        aria-label="Kembali ke halaman awal"
      >
        <ArrowLeft size={24} className="text-blue-600" />
      </button>
      
      {/* Kontainer pesan dengan animasi scaleOscillation selama audio diputar */}
      <div 
        className="bg-white/90 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-lg transform transition-all duration-500 hover:scale-105"
        style={isPlaying ? { animation: 'scaleOscillation 2s ease-in-out infinite' } : {}}
      >
        <div className="flex justify-center mb-6">
          <Cake size={56} className="text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-4 sm:mb-6 text-center">
          Selamat Ulang Tahun!
        </h1>
        <div className="space-y-4 sm:space-y-6 text-blue-700 text-base sm:text-lg">
          <p>
            Di hari spesialmu ini, aku ingin mengucapkan selamat ulang tahun yang penuh dengan kebahagiaan!
          </p>
          <p>
            Semoga tahun barumu dipenuhi dengan tawa, cinta, dan segala hal baik yang kamu impikan.
          </p>
          <p className="font-bold text-center">
            Kamu adalah orang yang luar biasa!
          </p>
          <div className="flex justify-center gap-4">
            <Heart size={24} className="text-red-500" />
            <Gift size={24} className="text-purple-500" />
            <Sparkles size={24} className="text-yellow-500" />
          </div>
        </div>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          {!isPlaying && (
            <button
              onClick={handleRayakanClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transform transition-all duration-300 hover:rotate-3 flex items-center gap-2"
            >
              Rayakan! 🎉
            </button>
          )}
          {isPlaying && (
            <button
              onClick={handleStop}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transform transition-all duration-300 flex items-center gap-2"
            >
              Stop & Lanjut ke Galeri
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pesan;
