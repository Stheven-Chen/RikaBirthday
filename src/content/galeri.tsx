import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Heart } from 'lucide-react';

const Galeri = () => {
  const navigate = useNavigate();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  
  // Array foto menggunakan Lorem Picsum
  const photos = [
    { src: "https://picsum.photos/id/1015/800/600", caption: "Kenangan Indah Bersama" },
    { src: "https://picsum.photos/id/1016/800/600", caption: "Momen Spesial" },
    { src: "https://picsum.photos/id/1018/800/600", caption: "Tertawa Bersama" },
    { src: "https://picsum.photos/id/1024/800/600", caption: "Kebahagiaan Selalu" },
    { src: "https://picsum.photos/id/1020/800/600", caption: "Semoga Tahun Depan Lebih Baik!" },
  ];
  
  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };
  
  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <button 
        onClick={() => navigate('/pesan')}
        className="absolute top-4 left-4 bg-white/80 p-2 rounded-full hover:bg-blue-100 transition-colors z-10"
        aria-label="Kembali ke pesan"
      >
        <ArrowLeft size={24} className="text-blue-600" />
      </button>
      
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-2">
          Galeri Kenangan
        </h1>
        <p className="text-blue-600">
          Beberapa momen spesial yang kita lalui bersama
        </p>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${photos[currentPhoto].src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Camera 
              size={48} 
              className="text-gray-400 opacity-50" 
              style={{ display: 'none' }} 
            />
          </div>
          
          <button 
            onClick={prevPhoto}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Foto sebelumnya"
          >
            <ArrowLeft size={20} className="text-blue-600" />
          </button>
          
          <button 
            onClick={nextPhoto}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white transition-colors"
            aria-label="Foto berikutnya"
          >
            <ArrowRight size={20} className="text-blue-600" />
          </button>
          
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 px-2 py-1 rounded-full text-white text-xs">
            {currentPhoto + 1} / {photos.length}
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-blue-700 text-center font-medium">
            {photos[currentPhoto].caption}
          </p>
          
          <div className="mt-4 flex justify-center">
            <button 
              className="flex items-center gap-1 text-red-500 bg-red-50 py-2 px-4 rounded-full hover:bg-red-100 transition-colors"
            >
              <Heart size={16} /> Like
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex gap-2 justify-center flex-wrap">
        {photos.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentPhoto(index)}
            className={`w-3 h-3 rounded-full ${currentPhoto === index ? 'bg-blue-600' : 'bg-blue-300'}`}
            aria-label={`Lihat foto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Galeri;
