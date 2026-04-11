// === BASE DE DATOS CENTRALIZADA DE PRODUCTOS ===
const productos = [
    { id: 1, nombre: "CAMPERA MARRON", precio: 200000, imagen: "Imagenes/edicionespecialmarron.png.webp", alt: "CAMPERA MARRON" },
    { id: 2, nombre: "JEAN GRIS", precio: 150000, imagen: "Imagenes/jeangris.png.webp", alt: "JEAN GRIS" },
    { id: 3, nombre: "CINTURÓN", precio: 75000, imagen: "Imagenes/cinturon.png.webp", alt: "CINTURÓN" },
    { id: 4, nombre: "GORRA", precio: 40000, imagen: "Imagenes/gorramarronpng.webp", alt: "GORRA" },
    { id: 5, nombre: "GORRO DE INVIERNO", precio: 35000, imagen: "Imagenes/gorroinvierno.png.webp", alt: "GORRO DE INVIERNO" },
    { id: 6, nombre: "GUANTES DE INVIERNO", precio: 30000, imagen: "Imagenes/guantesfrio.png.webp", alt: "GUANTES DE INVIERNO" },
    { id: 7, nombre: "HOODIE GRIS", precio: 120000, imagen: "Imagenes/hoodiegris.png.webp", alt: "HOODIE GRIS" },
    { id: 8, nombre: "HOODIE NEGRO", precio: 120000, imagen: "Imagenes/hoodienegropng.webp", alt: "HOODIE NEGRO" },
    { id: 9, nombre: "LENTE DE SOL", precio: 31000, imagen: "Imagenes/lentes.png.webp", alt: "LENTE DE SOL" },
    { id: 10, nombre: "LENTE DE SOL", precio: 33000, imagen: "Imagenes/lentes2.png.webp", alt: "LENTE DE SOL" },
    { id: 11, nombre: "MOCHILA", precio: 80000, imagen: "Imagenes/mochila.png.webp", alt: "MOCHILA" },
    { id: 12, nombre: "OJOTAS AZUL", precio: 65000, imagen: "Imagenes/ojotasazul.png.webp", alt: "OJOTAS AZUL" },
    { id: 13, nombre: "OJOTAS BLANCAS", precio: 65000, imagen: "Imagenes/ojotasblancaspng.webp", alt: "OJOTAS BLANCAS" },
    { id: 14, nombre: "OJOTAS GRISES", precio: 65000, imagen: "Imagenes/ojotasverdes.png.webp", alt: "OJOTAS GRISES" },
    { id: 15, nombre: "PACK DE MEDIAS", precio: 40000, imagen: "Imagenes/packmediaspng.webp", alt: "PACK DE MEDIAS" },
    { id: 16, nombre: "PACK DE MUSCULOSAS", precio: 70000, imagen: "Imagenes/packmusculosas.png.webp", alt: "PACK DE MUSCULOSAS" },
    { id: 17, nombre: "PANTALÓN BLANCO", precio: 130000, imagen: "Imagenes/pantalonblanco.png.webp", alt: "PANTALÓN BLANCO" },
    { id: 18, nombre: "PANTALÓN CREMA", precio: 130000, imagen: "Imagenes/pantaloncrema.png.webp", alt: "PANTALÓN CREMA" },
    { id: 19, nombre: "PANTALÓN ROMPEVIENTOS", precio: 200000, imagen: "Imagenes/pantalonrompevientospng.webp", alt: "PANTALÓN ROMPEVIENTOS" },
    { id: 20, nombre: "PACK DE REMERAS BLANCAS", precio: 60000, imagen: "Imagenes/remerasblancas.png.webp", alt: "PACK DE REMERAS BLANCAS" },
    { id: 21, nombre: "PACK DE REMERAS VERDES", precio: 60000, imagen: "Imagenes/remerasverdes.png.webp", alt: "PACK DE REMERAS VERDES" },
    { id: 22, nombre: "CAMPERA AZUL", precio: 220000, imagen: "Imagenes/camperaazul.png.webp", alt: "CAMPERA AZUL" },
    { id: 23, nombre: "CAMPERA CAMUFLADA", precio: 200000, imagen: "Imagenes/camperacamuflada.png.webp", alt: "CAMPERA CAMUFLADA" },
    { id: 24, nombre: "CAMPERA PUFFER", precio: 240000, imagen: "Imagenes/camperapuffer.png.webp", alt: "CAMPERA PUFFER" }
];

// === FUNCIÓN PARA RENDERIZAR LA GRILLA ===
function renderizarProductos() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = ''; // Limpiar contenedor
    
    productos.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <div class="image-box"><img src="${producto.imagen}" alt="${producto.alt}"></div>
            <div class="item-meta">
                <span>${producto.nombre}</span>
                <span>$${producto.precio.toLocaleString('es-AR')}</span>
            </div>
        `;
        contenedor.appendChild(item);
    });
}

// === FUNCIÓN PARA CAMBIAR PRECIOS DINÁMICAMENTE ===
function cambiarPrecio(idProducto, nuevoPrecio) {
    const producto = productos.find(p => p.id === idProducto);
    if (producto) {
        producto.precio = nuevoPrecio;
        renderizarProductos(); // Renderiza de nuevo con el precio actualizado
        console.log(`✓ Precio de "${producto.nombre}" actualizado a $${nuevoPrecio}`);
    } else {
        console.error(`Producto con ID ${idProducto} no encontrado`);
    }
}

// === EJECUTAR AL CARGAR LA PÁGINA ===
document.addEventListener('DOMContentLoaded', renderizarProductos);