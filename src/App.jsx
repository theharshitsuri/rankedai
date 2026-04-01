import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import ScannerApp from './ScannerApp';
import Upgrade from './Upgrade';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<ScannerApp />} />
        <Route path="/upgrade" element={<Upgrade />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
