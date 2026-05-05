'use client';

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedCollections from './components/FeaturedCollections';
import Lookbook from './components/Lookbook';
import Productos from './components/Productos';
import ProductModal from './components/ProductModal';
import CartModal from './components/CartModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const cartCount = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast({ ...toast, visible: false });
  };

  const handleProductClick = (id) => {
    setSelectedProduct(id);
  };

  const handleAddToCart = (producto) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === producto.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
    showToast(`${producto.nombre} agregado al carrito`, 'success');
  };

  const handleRemoveItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Carrito vaciado', 'success');
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const showSearchResults = searchTerm.trim() !== '';

  return (
    <main>
      <Header 
        cartCount={cartCount} 
        onCartClick={handleCartClick}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <div className="content-wrapper">
        {!showSearchResults && <Hero />}
        
        {!showSearchResults && (
          <FeaturedCollections onProductClick={handleProductClick} />
        )}
        
        {!showSearchResults && (
          <Lookbook onProductClick={handleProductClick} />
        )}
        
        <Productos 
          searchTerm={searchTerm} 
          onProductClick={handleProductClick}
        />
      </div>

      <Footer />

      {selectedProduct && (
        <ProductModal 
          productId={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <Toast 
        message={toast.message}
        isVisible={toast.visible}
        onClose={hideToast}
        type={toast.type}
      />
    </main>
  );
}