// src/Router.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; // Your existing landing page
import ScanOrSearch from './ScanOrSearch';
import Scan from './Scan';
import Search from './Search';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/options" element={<ScanOrSearch />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
