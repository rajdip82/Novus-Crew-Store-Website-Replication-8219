import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import DigitalShowcase from './components/DigitalShowcase';
import Stats from './components/Stats';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import DigitalStore from './components/DigitalStore';
import NCSellerPage from './components/NCSellerPage';
import SellerDashboard from './components/SellerDashboard';
import AdminPanel from './components/AdminPanel';
import './App.css';

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <DigitalShowcase />
      <Stats />
      <About />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<DigitalStore />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/nc-seller" element={<NCSellerPage />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;