'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductDetail from '../../components/ProductDetail';
import { productos } from '../../data/productos';

export default function ProductoPage() {
  const params = useParams();
  const [producto, setProducto] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const found = productos.find(p => p.id === parseInt(params.id));
    setProducto(found);
  }, [params.id]);

  const addToCart = (item) => {
    const newCart = [...cart, { ...item, cartId: Date.now() }];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setToast(`${item.nombre} (${item.color}) agregado al carrito`);
    setTimeout(() => setToast(null), 3000);
  };

  if (!producto) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <>
      <ProductDetail producto={producto} onAddToCart={addToCart} />
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}