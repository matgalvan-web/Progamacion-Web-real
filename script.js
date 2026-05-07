// === BASE DE DATOS DE PRODUCTOS ===
const productos = [
    { id: 1, nombre: "CAMPERA MARRON", precio: 200000, imagen: "Imagenes/edicionespecialmarron.png.webp" },
    { id: 2, nombre: "JEAN GRIS", precio: 150000, imagen: "Imagenes/jeangris.png.webp" },
    { id: 3, nombre: "CINTURÓN", precio: 75000, imagen: "Imagenes/cinturon.png.webp" },
    { id: 4, nombre: "GORRA", precio: 40000, imagen: "Imagenes/gorramarronpng.webp" },
    { id: 5, nombre: "GORRO DE INVIERNO", precio: 35000, imagen: "Imagenes/gorroinvierno.png.webp" },
    { id: 6, nombre: "GUANTES DE INVIERNO", precio: 30000, imagen: "Imagenes/guantesfrio.png.webp" },
    { id: 7, nombre: "BUZO GRIS", precio: 120000, imagen: "Imagenes/hoodiegris.png.webp" },
    { id: 8, nombre: "BUZO NEGRO", precio: 120000, imagen: "Imagenes/hoodienegropng.webp" },
    { id: 9, nombre: "LENTE DE SOL", precio: 31000, imagen: "Imagenes/lentes.png.webp" },
    { id: 10, nombre: "LENTE DE SOL PRO", precio: 33000, imagen: "Imagenes/lentes2.png.webp" },
    { id: 11, nombre: "MOCHILA", precio: 80000, imagen: "Imagenes/mochila.png.webp" },
    { id: 12, nombre: "OJOTAS AZUL", precio: 65000, imagen: "Imagenes/ojotasazul.png.webp" },
    { id: 13, nombre: "OJOTAS BLANCAS", precio: 65000, imagen: "Imagenes/ojotasblancaspng.webp" },
    { id: 14, nombre: "OJOTAS GRISES", precio: 65000, imagen: "Imagenes/ojotasverdes.png.webp" },
    { id: 15, nombre: "PACK DE MEDIAS", precio: 40000, imagen: "Imagenes/packmediaspng.webp" },
    { id: 16, nombre: "PACK DE MUSCULOSAS", precio: 70000, imagen: "Imagenes/packmusculosas.png.webp" },
    { id: 17, nombre: "PANTALÓN BLANCO", precio: 130000, imagen: "Imagenes/pantalonblanco.png.webp" },
    { id: 18, nombre: "PANTALÓN CREMA", precio: 130000, imagen: "Imagenes/pantaloncrema.png.webp" },
    { id: 19, nombre: "PANTALÓN ROMPEVIENTOS", precio: 200000, imagen: "Imagenes/pantalonrompevientospng.webp" },
    { id: 20, nombre: "REMERAS BLANCAS", precio: 60000, imagen: "Imagenes/remerasblancas.png.webp" },
    { id: 21, nombre: "REMERAS VERDES", precio: 60000, imagen: "Imagenes/remerasverdes.png.webp" },
    { id: 22, nombre: "CAMPERA AZUL", precio: 220000, imagen: "Imagenes/camperaazul.png.webp" },
    { id: 23, nombre: "CAMPERA CAMUFLADA", precio: 200000, imagen: "Imagenes/camperacamuflada.png.webp" },
    { id: 24, nombre: "CAMPERA PUFFER", precio: 240000, imagen: "Imagenes/camperapuffer.png.webp" }
];

let textoBusqueda = '';
let carrito = [];

function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.innerText = carrito.length;
    }
}

function alternarSecciones() {
    const hayBusqueda = textoBusqueda.trim() !== '';
    const seccionesAOcultar = document.querySelectorAll('.hero, .featured-collections, .lookbook-section, .limited-collection, .story-section');

    seccionesAOcultar.forEach(sec => {
        if (sec) {
            sec.style.display = hayBusqueda ? 'none' : 'block';
            if (sec.classList.contains('hero') && !hayBusqueda) {
                sec.style.display = 'flex';
            }
        }
    });
}

function renderizarProductos() {
    const contenedor = document.getElementById('productos');
    if (!contenedor) return;

    const busqueda = textoBusqueda.toLowerCase().trim();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda));

    contenedor.innerHTML = '';

    if (filtrados.length === 0 && busqueda !== '') {
        contenedor.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 100px; color: #555;">NO SE ENCONTRARON RESULTADOS</p>`;
        return;
    }

    filtrados.forEach(p => {
        const div = document.createElement('div');
        div.className = 'item';
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => abrirModal(p.id));
        div.innerHTML = `
            <div class="image-box"><img src="${p.imagen}" alt="${p.nombre}"></div>
            <div class="item-meta">
                <span>${p.nombre}</span>
                <span>$${p.precio.toLocaleString('es-AR')}</span>
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function abrirModal(id) {
    const p = productos.find(prod => prod.id === id);
    if (!p) return;

    const modal = document.getElementById('product-modal');
    const modalName = document.getElementById('modal-name');
    const modalPrice = document.getElementById('modal-price');
    const modalImg = document.getElementById('modal-img');
    const btn = document.querySelector('.add-to-cart-btn');

    if (!modal || !modalName || !modalPrice || !modalImg || !btn) return;

    modalName.innerText = p.nombre;
    modalPrice.innerText = `$${p.precio.toLocaleString('es-AR')}`;
    modalImg.src = p.imagen;
    modal.style.display = 'block';

    btn.onclick = () => {
        carrito.push(p);
        actualizarContadorCarrito();
        modal.style.display = 'none';
        console.log('Producto agregado:', p.nombre);
    };
}

function mostrarCarrito() {
    const listaContenedor = document.getElementById('cart-items-list');
    const totalContenedor = document.getElementById('cart-total-amount');
    const cartModal = document.getElementById('cart-display-modal');

    if (!listaContenedor || !totalContenedor || !cartModal) return;

    listaContenedor.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        listaContenedor.innerHTML = '<p style="color: #555; text-align: center; padding: 20px;">EL CARRITO ESTÁ VACÍO</p>';
    } else {
        carrito.forEach((p, index) => {
            total += p.precio;
            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <img src="${p.imagen}" alt="${p.nombre}">
                <div class="cart-item-info">
                    <h4>${p.nombre}</h4>
                    <p>$${p.precio.toLocaleString('es-AR')}</p>
                </div>
                <button class="remove-cart-item" data-index="${index}">QUITAR</button>
            `;
            listaContenedor.appendChild(row);
        });

        listaContenedor.querySelectorAll('.remove-cart-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = Number(event.currentTarget.dataset.index);
                eliminarDelCarrito(index);
            });
        });
    }

    totalContenedor.innerText = `$${total.toLocaleString('es-AR')}`;
    cartModal.style.display = 'block';
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContadorCarrito();
    mostrarCarrito();
}

function cerrarProductModal() {
    const modal = document.getElementById('product-modal');
    if (modal) modal.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.search-input');
    if (input) {
        input.addEventListener('input', (e) => {
            textoBusqueda = e.target.value;
            renderizarProductos();
            alternarSecciones();
        });
    }

    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarCarrito();
        });
    }

    const closeCart = document.querySelector('.close-cart');
    if (closeCart) {
        closeCart.addEventListener('click', () => {
            const cartModal = document.getElementById('cart-display-modal');
            if (cartModal) cartModal.style.display = 'none';
        });
    }

    const closeProductModalElement = document.querySelector('.close-modal');
    if (closeProductModalElement) {
        closeProductModalElement.addEventListener('click', cerrarProductModal);
    }

    renderizarProductos();
    alternarSecciones();
});

window.onclick = (event) => {
    const productModal = document.getElementById('product-modal');
    if (event.target === productModal) {
        cerrarProductModal();
    }
};
