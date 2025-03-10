import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, Headphones } from 'lucide-react';

const Opening = () => {
  const navigate = useNavigate();
  const [showHeadsetReminder, setShowHeadsetReminder] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleHeadsetConfirm = () => {
    setShowHeadsetReminder(false);
    
    // Menampilkan konten utama setelah pop-up hilang
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
      {/* Headset Reminder Pop-up */}
      {showHeadsetReminder && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full text-center animate-fade-in shadow-xl">
            <Headphones size={48} className="mx-auto mb-4 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
              Eits Pakai Headset Dulu
            </h2>
            <p className="text-gray-600 mb-6">
              Pakai headset dulu ya baru lanjut
            </p>
            <button
              onClick={handleHeadsetConfirm}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transform transition-all duration-300 hover:scale-105 w-full"
            >
              OK, Sudah Pakai
            </button>
          </div>
        </div>
      )}

      {/* Konten Utama - hanya muncul setelah konfirmasi headset */}
      {showContent && (
        <>
          <div className="animate-bounce mb-4 sm:mb-6">
            <PartyPopper size={60} className="text-blue-600" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-800 mb-4 sm:mb-6">
           Cie Ada yang Ulang Tahun Nih!
          </h1>
          
          <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">
            <p className="text-lg sm:text-xl text-blue-700 mb-6 sm:mb-8">
              Aku punya pesan spesial untukmu! 
              Penasaran ya?
            </p>
            
            <button
              onClick={() => navigate('/pesan')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transform transition-all duration-300 hover:scale-110 hover:shadow-xl w-full sm:w-auto"
            >
              Lihat lah
            </button>
          </div>
          
          <div className="mt-8 sm:mt-12 flex gap-3 sm:gap-4">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 animate-pulse"
                style={{animationDelay: `${i * 0.15}s`}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Opening;