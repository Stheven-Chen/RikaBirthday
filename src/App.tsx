import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Opening from './content/opening';
import Pesan from './content/pesan';
import Galeri from './content/galeri';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-white">
        <Routes>
          <Route path="/" element={<Opening />} />
          <Route path="/pesan" element={<Pesan />} />
          <Route path="/galeri" element={<Galeri />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
