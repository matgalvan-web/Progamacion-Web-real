"use client";

import { useContext, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductDetail from '../../components/ProductDetail';
import Toast from '../../components/Toast';
import { getProductById } from '../../../lib/supabaseOperations';
import { CartContext } from '../../context/CartContext';

export default function ProductoPage() {
  const params = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState('');
  const { addToCart, toast, hideToast } = useContext(CartContext);

  useEffect(() => {
    let mounted = true;
    const id = params.id;
    if (!id) {
      setError('ID de producto inválido.');
      return;
    }

    getProductById(id)
      .then((res) => {
        if (!mounted) return;
        if (res.success && res.product) {
          setProducto(res.product);
        } else {
          setError(res.error || 'No se pudo cargar el producto.');
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || 'Error al cargar el producto.');
      });

    return () => { mounted = false; };
  }, [params.id]);

  if (error) {
    return <div className="loading">{error}</div>;
  }

  if (!producto) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <>
      <ProductDetail producto={producto} onAddToCart={addToCart} />
      <Toast
        message={toast.message}
        isVisible={toast.visible}
        onClose={hideToast}
        type={toast.type}
      />
    </>
  );
}