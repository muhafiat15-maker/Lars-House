import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import OrderStatus from './pages/OrderStatus';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import './index.css';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <CustomCursor />
        <div className="min-h-screen bg-[var(--bg-dark)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/cek-pesanan" element={<OrderStatus />} />
          </Routes>
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
