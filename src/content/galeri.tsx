import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';

const Galeri = () => {
  const navigate = useNavigate();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [liked, setLiked] = useState(Array(5).fill(false));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Array foto menggunakan Lorem Picsum dan URL lainnya
  const photos = [
    { src: "https://raw.githubusercontent.com/Stheven-Chen/birthdaySong/main/First.png", caption: "Dimulai Dari Ini" },
    { src: "https://picsum.photos/id/1016/800/600", caption: "Pertama Kita Keluar Berdua" },
    { src: "https://raw.githubusercontent.com/Stheven-Chen/birthdaySong/main/3-1.jpg", caption: "Habis Dari Rumah Hantu" },
    { src: "https://raw.githubusercontent.com/Stheven-Chen/birthdaySong/main/3.jpeg", caption: "Bulan Favoritku" },
    { src: "https://raw.githubusercontent.com/Stheven-Chen/birthdaySong/main/YouAndMe.jpg", caption: "Christmas Dinner Time!" },
    { src: "https://raw.githubusercontent.com/Stheven-Chen/birthdaySong/main/Fav.jpg", caption: "Senyummu" },
  ];

  // Pesan statis dan tanggal untuk masing-masing foto
  const messages = [
    { text: "Awal kita mulai keluar bersama terus. <br/> (Fotonya blur 🥲)", date: "15 September 2024" },
    { text: "Pertama kali kita keluar bersama, kau menjagaku disaat aku pusing karena terlalu banyak orang", date: "06 Oktober 2024" },
    { text: "Kau ingat kita mengantri lama untuk mendapatkan foto ini setelah dari rumah hantu?", date: "23 November 2024" },
    { text: "Tetap ini adalah foto bersama kita yang paling ku suka", date: "22 Desember 2024" },
    { text: "Aku sangat senang sekali christmas dinner bersamamu", date: "26 Desember 2024" },
    { text: "Aku sangat menyukai senyumanmu", date: "23 Desember 2024" },
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
        <p className="text-blue-800">
          Beberapa momen spesial yang kita lalui bersama
        </p>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
        {/* Vertical photo container with fixed height and object-contain */}
        <div className="relative w-full h-[500px] bg-gray-100 flex items-center justify-center">
          <img
            src={photos[currentPhoto].src}
            alt={photos[currentPhoto].caption}
            className="max-w-full max-h-full object-contain"
          />
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
        
        <div className="p-4 flex-grow flex flex-col">
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
          
          <div className="mt-3 flex-grow">
            <div className="w-full p-4 border border-blue-200 rounded-lg bg-blue-50 shadow-sm relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              <p 
                className="text-blue-800 pl-2"
                dangerouslySetInnerHTML={{ __html: messages[currentPhoto].text }}
              />
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