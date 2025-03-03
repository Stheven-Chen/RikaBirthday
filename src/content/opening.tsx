import { useNavigate } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';

const Opening = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 text-center">
      <div className="animate-bounce mb-4 sm:mb-6">
        <PartyPopper size={60} className="text-blue-600" />
      </div>
      
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-blue-800 mb-4 sm:mb-6">
        Ada yang Ulang Tahun Nih!
      </h1>
      
      <div className="bg-white/80 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <p className="text-lg sm:text-xl text-blue-700 mb-6 sm:mb-8">
          Ada pesan spesial buat kamu hari ini! 
          Penasaran apa pesannya?
        </p>
        
        <button
          onClick={() => navigate('/pesan')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transform transition-all duration-300 hover:scale-110 hover:shadow-xl w-full sm:w-auto"
        >
          Lihat Pesan Ulang Tahun
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
    </div>
  );
};

export default Opening;