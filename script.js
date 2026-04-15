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

function alternarSecciones() {
    const hayBusqueda = textoBusqueda.trim() !== '';
    
    // Seleccionamos TODAS las secciones que quieres ocultar
    const seccionesAOcultar = document.querySelectorAll('.hero, .featured-collections, .lookbook-section, .limited-collection, .story-section');

    seccionesAOcultar.forEach(sec => {
        if (sec) {
            // Si hay algo escrito en el buscador, ocultamos la sección entera
            sec.style.display = hayBusqueda ? 'none' : 'block';
            
            // Caso especial para el Hero si es flex
            if (sec.classList.contains('hero') && !hayBusqueda) {
                sec.style.display = 'flex';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.search-input');
    if (input) {
        input.addEventListener('input', (e) => {
            textoBusqueda = e.target.value;
            renderizarProductos();
            alternarSecciones();
        });
    }
    renderizarProductos();
});

// Variable para el carrito (en memoria)
let carrito = [];

// Función para abrir el modal
function abrirModal(id) {
    const p = productos.find(prod => prod.id === id);
    if (!p) return;

    // Llenamos el modal con la info del producto
    document.getElementById('modal-name').innerText = p.nombre;
    document.getElementById('modal-price').innerText = `$${p.precio.toLocaleString('es-AR')}`;
    document.getElementById('modal-img').src = p.imagen;
    
    const modal = document.getElementById('product-modal');
    modal.style.display = "block";

    // Programamos el botón de añadir al carrito
    const btn = document.querySelector('.add-to-cart-btn');
    btn.onclick = () => {
        carrito.push(p); // Se agrega al array
        document.getElementById('cart-count').innerText = carrito.length; // Actualiza el (0)
        modal.style.display = "none"; // Cierra el modal
        console.log("Producto agregado:", p.nombre);
    };
}

// Modificamos el renderizado para que responda al click
function renderizarProductos() {
    const contenedor = document.getElementById('productos');
    if (!contenedor) return;
    
    const busqueda = textoBusqueda.toLowerCase().trim();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda));
    
    contenedor.innerHTML = '';
    
    filtrados.forEach(p => {
        const div = document.createElement('div');
        div.className = 'item';
        // Agregamos el evento onclick aquí
        div.onclick = () => abrirModal(p.id); 
        div.style.cursor = "pointer";
        
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

// Cerrar el modal al hacer click en la X o fuera del cuadro
document.querySelector('.close-modal').onclick = () => {
    document.getElementById('product-modal').style.display = "none";
};

window.onclick = (event) => {
    const modal = document.getElementById('product-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
