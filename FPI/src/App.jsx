import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import AddProduct from './Pages/Addproduct';
import Home from './Pages/Home';
import ScannerPage from './Pages/Scan';

function App() {
  const [provider, setProvider] = useState(null);

  return (
    <Router>
      <Navbar setProvider={setProvider} />
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/AddProduct" element={<AddProduct provider={provider} />} />
        <Route path="/scan" element={<ScannerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
