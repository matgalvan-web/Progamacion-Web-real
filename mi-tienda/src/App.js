import { useMemo, useState } from 'react';
import './App.css';

const productos = [
  { id: 1, nombre: 'CAMPERA MARRON', precio: 200000, imagen: '/Imagenes/edicionespecialmarron.png.webp' },
  { id: 2, nombre: 'JEAN GRIS', precio: 150000, imagen: '/Imagenes/jeangris.png.webp' },
  { id: 3, nombre: 'CINTURÓN', precio: 75000, imagen: '/Imagenes/cinturon.png.webp' },
  { id: 4, nombre: 'GORRA', precio: 40000, imagen: '/Imagenes/gorramarronpng.webp' },
  { id: 5, nombre: 'GORRO DE INVIERNO', precio: 35000, imagen: '/Imagenes/gorroinvierno.png.webp' },
  { id: 6, nombre: 'GUANTES DE INVIERNO', precio: 30000, imagen: '/Imagenes/guantesfrio.png.webp' },
  { id: 7, nombre: 'BUZO GRIS', precio: 120000, imagen: '/Imagenes/hoodiegris.png.webp' },
  { id: 8, nombre: 'BUZO NEGRO', precio: 120000, imagen: '/Imagenes/hoodienegropng.webp' },
  { id: 9, nombre: 'LENTE DE SOL', precio: 31000, imagen: '/Imagenes/lentes.png.webp' },
  { id: 10, nombre: 'LENTE DE SOL PRO', precio: 33000, imagen: '/Imagenes/lentes2.png.webp' },
  { id: 11, nombre: 'MOCHILA', precio: 80000, imagen: '/Imagenes/mochila.png.webp' },
  { id: 12, nombre: 'OJOTAS AZUL', precio: 65000, imagen: '/Imagenes/ojotasazul.png.webp' },
  { id: 13, nombre: 'OJOTAS BLANCAS', precio: 65000, imagen: '/Imagenes/ojotasblancaspng.webp' },
  { id: 14, nombre: 'OJOTAS GRISES', precio: 65000, imagen: '/Imagenes/ojotasverdes.png.webp' },
  { id: 15, nombre: 'PACK DE MEDIAS', precio: 40000, imagen: '/Imagenes/packmediaspng.webp' },
  { id: 16, nombre: 'PACK DE MUSCULOSAS', precio: 70000, imagen: '/Imagenes/packmusculosas.png.webp' },
  { id: 17, nombre: 'PANTALÓN BLANCO', precio: 130000, imagen: '/Imagenes/pantalonblanco.png.webp' },
  { id: 18, nombre: 'PANTALÓN CREMA', precio: 130000, imagen: '/Imagenes/pantaloncrema.png.webp' },
  { id: 19, nombre: 'PANTALÓN ROMPEVIENTOS', precio: 200000, imagen: '/Imagenes/pantalonrompevientospng.webp' },
  { id: 20, nombre: 'REMERAS BLANCAS', precio: 60000, imagen: '/Imagenes/remerasblancas.png.webp' },
  { id: 21, nombre: 'REMERAS VERDES', precio: 60000, imagen: '/Imagenes/remerasverdes.png.webp' },
  { id: 22, nombre: 'CAMPERA AZUL', precio: 220000, imagen: '/Imagenes/camperaazul.png.webp' },
  { id: 23, nombre: 'CAMPERA CAMUFLADA', precio: 200000, imagen: '/Imagenes/camperacamuflada.png.webp' },
  { id: 24, nombre: 'CAMPERA PUFFER', precio: 240000, imagen: '/Imagenes/camperapuffer.png.webp' }
];

const destacados = [
  { id: 1, tag: 'STREET CORE', title: 'Campera nocturna', description: 'Una pieza estructurada con presencia urbana y líneas bien definidas.' },
  { id: 21, tag: 'BASICS', title: 'Remeras esenciales', description: 'Contraste suave, corte moderno y un bloque visual más contundente.' },
  { id: 17, tag: 'CONTRASTE', title: 'Pantalón claro', description: 'Minimalismo con actitud para balancear la nueva colección OFF-BLACK.' },
  { id: 24, tag: 'ACCESORIOS', title: 'Bolso grande', description: 'Un accesorio funcional y estético que complementa cualquier look urbano.' }
];

const lookbook = [
  { id: 8, image: '/Imagenes/hoodienegropng.webp', title: 'Atuendo nocturno', description: 'Una composición moderna con silueta relajada y líneas sólidas.' },
  { id: 24, image: '/Imagenes/camperapuffer.png.webp', title: 'Textura y volumen', description: 'La pieza técnica que define la temporada y agrega actitud a cada outfit.' },
  { id: 10, image: '/Imagenes/lentes2.png.webp', title: 'Detalles clave', description: 'Accesorios limpios y geométricos que completan la identidad OFF-BLACK.' }
];

const formatPrice = (value) => `$${value.toLocaleString('es-AR')}`;

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const term = searchQuery.toLowerCase().trim();
    return term === '' ? productos : productos.filter((producto) => producto.nombre.toLowerCase().includes(term));
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCartItems((current) => [...current, product]);
    closeProductModal();
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const removeFromCart = (index) => {
    setCartItems((current) => current.filter((_, i) => i !== index));
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.precio, 0);
  const hasSearch = searchQuery.trim() !== '';

  return (
    <div className="App">
      <header className="main-header">
        <a href="#root" className="brand-logo-link">
          <img src="/Imagenes/off-black.jpg" alt="Logo de la marca OFF-BLACK" className="brand-logo" />
        </a>
        <h1 className="brand-name">OFF-BLACK</h1>
        <nav className="sub-nav">
          <div className="nav-links">
            <a href="#productos">SHOP</a>
            <button type="button" className="auth-button" onClick={(e) => e.preventDefault()}>ARCHIVE</button>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="BUSCAR..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="nav-actions">
            <button type="button" className="auth-button" onClick={(e) => e.preventDefault()}>
              INICIAR SESIÓN
            </button>
            <button type="button" className="auth-button register-button" onClick={(e) => e.preventDefault()}>
              REGISTRARSE
            </button>
            <button type="button" className="cart-link" onClick={openCart}>
              CART ({cartItems.length})
            </button>
          </div>
        </nav>
      </header>

      <main className="content-wrapper">
        {!hasSearch && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <p className="hero-label">NUEVA COLECCIÓN</p>
                <h2 className="hero-title">Diseño limpio, actitud real.</h2>
                <p className="hero-description">Prendas esenciales con diseño preciso y estética urbana moderna.</p>
                <a href="#productos" className="hero-cta">VER COLECCIÓN</a>
              </div>
            </section>

            <section className="featured-collections">
              <div className="section-label">DESTACADOS</div>
              <div className="section-title">Imágenes rectangulares para darle energía a OFF-BLACK</div>
              <div className="feature-grid">
                {destacados.map((item) => {
                  const product = productos.find((p) => p.id === item.id) || productos[0];
                  return (
                    <article key={item.id} className="feature-card" onClick={() => openProductModal(product)}>
                      <img src={product.imagen} alt={item.title} />
                      <div className="feature-copy">
                        <span className="feature-tag">{item.tag}</span>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="lookbook-section">
              <div className="section-label">LOOKBOOK</div>
              <div className="section-title">Más imágenes rectangulares para inspirarte</div>
              <div className="lookbook-grid">
                {lookbook.map((item) => (
                  <article key={item.id} className="lookbook-card" onClick={() => openProductModal(productos.find((p) => p.id === item.id))}>
                    <img src={item.image} alt={item.title} />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="limited-collection">
              <div className="limited-card">
                <div className="limited-copy">
                  <span className="section-label">COLECCIÓN LIMITADA</span>
                  <div className="section-title">OFF-BLACK X NIGHT RIDER</div>
                  <p>Solo 30 unidades. Prendas utilitarias con detalles reflectantes, cortes técnicos y una paleta oscura que se siente urbana.</p>
                  <button type="button" className="hero-cta" onClick={(e) => e.preventDefault()}>Explorar ahora</button>
                </div>
                <img src="/Imagenes/rompevientoscrema.png.webp" alt="Colección limitada OFF-BLACK" />
              </div>
            </section>

            <section className="story-section">
              <div className="story-grid">
                <div className="story-copy">
                  <div className="section-label">HISTORIA</div>
                  <div className="section-title">Una marca con pulso urbano</div>
                  <p>OFF-BLACK nace para vestir las noches de la ciudad con piezas sobrias, texturas auténticas y una identidad minimalista que no pasa desapercibida.</p>
                  <p>Cada lanzamiento equilibra materiales resistentes con cortes contemporáneos: un lenguaje visual oscuro, limpio y elegante para quienes buscan presencia sin ruido.</p>
                  <button type="button" className="story-cta" onClick={(e) => e.preventDefault()}>VER LOOKBOOK</button>
                </div>
                <div className="story-image-card">
                  <img src="/Imagenes/camperacuero.png.webp" alt="Historia de la marca OFF-BLACK" />
                  <span className="story-badge">LOOKBOOK</span>
                </div>
              </div>
            </section>
          </>
        )}

        <div id="productos" className="product-grid">
          {filteredProducts.length === 0 ? (
            <p className="no-results">NO SE ENCONTRARON RESULTADOS</p>
          ) : (
            filteredProducts.map((producto) => (
              <article key={producto.id} className="item" onClick={() => openProductModal(producto)}>
                <div className="image-box">
                  <img src={producto.imagen} alt={producto.nombre} />
                </div>
                <div className="item-meta">
                  <span>{producto.nombre}</span>
                  <span>{formatPrice(producto.precio)}</span>
                </div>
              </article>
            ))
          )}
        </div>
      </main>

      {isCartOpen && (
        <div className="modal visible" onClick={(e) => e.target === e.currentTarget && closeCart()}>
          <div className="modal-content cart-modal-content">
            <button className="close-cart" onClick={closeCart} aria-label="Cerrar carrito">×</button>
            <h2>TU CARRITO</h2>
            <div id="cart-items-list" className="cart-items-list">
              {cartItems.length === 0 ? (
                <p className="empty-cart">EL CARRITO ESTÁ VACÍO</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="cart-item-row">
                    <img src={item.imagen} alt={item.nombre} />
                    <div className="cart-item-info">
                      <h4>{item.nombre}</h4>
                      <p>{formatPrice(item.precio)}</p>
                    </div>
                    <button className="remove-cart-item" onClick={() => removeFromCart(index)}>
                      QUITAR
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="cart-footer">
              <div className="cart-total-row">
                <span>TOTAL:</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <button className="hero-cta finish-checkout" onClick={(e) => e.preventDefault()}>
                FINALIZAR COMPRA
              </button>
            </div>
          </div>
        </div>
      )}

      {isProductModalOpen && selectedProduct && (
        <div className="modal visible" onClick={(e) => e.target === e.currentTarget && closeProductModal()}>
          <div className="modal-content product-modal-content">
            <button className="close-modal" onClick={closeProductModal} aria-label="Cerrar producto">×</button>
            <div className="modal-body">
              <img id="modal-img" src={selectedProduct.imagen} alt={selectedProduct.nombre} />
              <div className="modal-info">
                <h2 id="modal-name">{selectedProduct.nombre}</h2>
                <p id="modal-price">{formatPrice(selectedProduct.precio)}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(selectedProduct)}>
                  AÑADIR AL CARRITO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-tags">
          <button type="button" className="tag" onClick={(e) => e.preventDefault()}>CONTACTO</button>
          <button type="button" className="tag" onClick={(e) => e.preventDefault()}>TERMINOS</button>
          <button type="button" className="tag" onClick={(e) => e.preventDefault()}>PRIVACIDAD</button>
        </div>
        <p className="copyright">[ SITES TERMINATED ©️ 2026 ]</p>
      </footer>
    </div>
  );
}

export default App;
