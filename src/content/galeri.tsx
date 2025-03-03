import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Camera, Heart } from 'lucide-react';

const Galeri = () => {
  const navigate = useNavigate();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [liked, setLiked] = useState(Array(5).fill(false));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Array foto menggunakan Lorem Picsum
  const photos = [
    { src: "https://picsum.photos/id/1015/800/600", caption: "Kenangan Indah Bersama" },
    { src: "https://picsum.photos/id/1016/800/600", caption: "Momen Spesial" },
    { src: "https://picsum.photos/id/1018/800/600", caption: "Tertawa Bersama" },
    { src: "https://picsum.photos/id/1024/800/600", caption: "Kebahagiaan Selalu" },
    { src: "https://picsum.photos/id/1020/800/600", caption: "Semoga Tahun Depan Lebih Baik!" },
  ];

  // Pesan statis dan tanggal untuk masing-masing foto
  const messages = [
    { text: "Foto pertama mengingatkan aku pada awal perjalanan ini.", date: "10 Januari 2024" },
    { text: "Momen spesial yang tak terlupakan di foto kedua.", date: "15 Februari 2023" },
    { text: "Senyuman dan tawa yang membuat hari-hari lebih berarti.", date: "20 Maret 2023" },
    { text: "Setiap kenangan membawa kebahagiaan yang mendalam.", date: "25 April 2023" },
    { text: "Harapan dan doa untuk masa depan yang lebih baik.", date: "30 Mei 2023" },
  ];


  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleLike = () => {
    const newLiked = [...liked];
    newLiked[currentPhoto] = !newLiked[currentPhoto];
    setLiked(newLiked);
  };

  // Jalankan audio otomatis saat foto terakhir tampil
  useEffect(() => {
    if (currentPhoto === photos.length - 1 && audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.error("Auto-play audio gagal:", err);
      });
    }
  }, [currentPhoto, photos.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      {/* Audio element */}
      <audio ref={audioRef} src="https://raw.githubusercontent.com/Stheven-Chen/birthdaySong/main/birthday%20song.mp3" />

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
      
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-2xl shadow-lg overflow-hidden">
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
          <div className="flex justify-between items-center mb-2">
            <p className="text-blue-700 text-center font-medium text-lg">
              {photos[currentPhoto].caption}
            </p>
            <button 
              onClick={toggleLike} 
              className="p-2 transition-all duration-300"
              aria-label={liked[currentPhoto] ? "Batal suka" : "Suka foto ini"}
            >
              <Heart 
                size={24} 
                className={`${liked[currentPhoto] ? "text-red-500 fill-red-500" : "text-gray-400"} transition-colors`} 
              />
            </button>
          </div>
          
          <div className="mt-3">
            <div className="w-full p-4 border border-blue-200 rounded-lg bg-blue-50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <p className="text-blue-800 pl-2">
                {messages[currentPhoto].text}
              </p>
              <div className="mt-3 flex justify-end">
                <span className="text-xs text-blue-400 italic">
                  {messages[currentPhoto].date}
                </span>
              </div>
            </div>
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