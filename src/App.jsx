import React from 'react';
import Navbar from './components/navbar/Navbar';
import './App.css';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';

// default imports (assumes each component file uses `export default`)
import Home from './components/home/home';
import Products from './components/products/products';
import About from './components/about/about';
import Services from './components/services/services';
import Contact from './components/Contact/Contact';
import Cart from './components/cart/cart';
import Login from './components/login/login';
import ProductDetails from './components/productDetails/productDetails';
import Profile from './components/profile/profile';

function App() {
  return (
    <div>
      <Navbar />

      {/* Keep only <Route> (or <React.Fragment>) inside <Routes> */}
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
// routes 
// home http://localhost:5173/
// products http://localhost:5173/products
// about http://localhost:5173/about  
// services http://localhost:5173/services
// contact http://localhost:5173/contact
// cart http://localhost:5173/cart
// login http://localhost:5173/login
