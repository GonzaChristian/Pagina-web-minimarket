// ========================================
// 1. INTRODUCCIÓN A JAVASCRIPT
// ========================================

// Variables y constantes
let carritoProductos = [];
let totalCompra = 0;
const IVA = 0.18;
const DESCUENTO_MINIMO = 50;

// Función para mostrar mensaje de bienvenida al cargar la página
window.addEventListener('load', () => {
  console.log('Página cargada correctamente');
  console.log('Versión del sitio: 1.0');
  console.log('Carrito inicializado:', carritoProductos);
});

// ========================================
// 2. ESTRUCTURAS DE CONTROL Y E/S
// ========================================

// Función para validar edad del usuario
function validarEdad() {
  const edad = prompt("Bienvenido a MiniMarket GONZA\n¿Cuál es tu edad?");
  
  if (edad === null) {
    console.log('Usuario canceló la validación de edad');
    return;
  }
  
  const edadNumero = parseInt(edad);
  
  if (isNaN(edadNumero) || edadNumero < 0) {
    alert("Por favor, ingresa una edad válida");
    console.error('Edad inválida ingresada:', edad);
    return;
  }
  
  if (edadNumero < 18) {
    alert("Eres menor de edad. Algunos productos pueden tener restricciones.");
    console.log('Usuario menor de edad:', edadNumero);
  } else {
    alert("¡Bienvenido! Puedes ver todos nuestros productos.");
    console.log('Usuario mayor de edad:', edadNumero);
  }
}

// Función para buscar productos
function buscarProducto() {
  const busqueda = document.querySelector('.busqueda');
  if (!busqueda) return;
  
  const termino = busqueda.value.toLowerCase().trim();
  
  if (termino === '') {
    alert('Por favor, ingresa un término de búsqueda');
    return;
  }
  
  console.log('Búsqueda realizada:', termino);
  
  const productos = document.querySelectorAll('.productos > div');
  let encontrados = 0;
  
  // Recorrer todos los productos
  for (let i = 0; i < productos.length; i++) {
    const titulo = productos[i].querySelector('.TituloProducto');
    if (titulo) {
      const textoProducto = titulo.textContent.toLowerCase();
      
      if (textoProducto.includes(termino)) {
        productos[i].style.display = 'block';
        productos[i].style.animation = 'pulso 0.5s ease-in-out';
        encontrados++;
      } else {
        productos[i].style.display = 'none';
      }
    }
  }
  
  console.log('Productos encontrados:', encontrados);
  
  if (encontrados === 0) {
    alert(`No se encontraron productos con "${termino}"`);
  } else {
    alert(`Se encontraron ${encontrados} producto(s)`);
  }
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombreProducto, precio) {
  const confirmar = confirm(`¿Deseas agregar ${nombreProducto} al carrito?\nPrecio: S/ ${precio.toFixed(2)}`);
  
  if (confirmar) {
    // Verificar si el producto ya existe en el carrito
    let productoExistente = null;
    for (let i = 0; i < carritoProductos.length; i++) {
      if (carritoProductos[i].nombre === nombreProducto) {
        productoExistente = carritoProductos[i];
        break;
      }
    }
    
    if (productoExistente) {
      // Si ya existe, aumentar cantidad
      productoExistente.cantidad++;
      console.log('Cantidad aumentada:', productoExistente);
    } else {
      // Si no existe, agregar nuevo producto
      const producto = {
        nombre: nombreProducto,
        precio: precio,
        cantidad: 1,
        id: Date.now()
      };
      carritoProductos.push(producto);
      console.log('Producto agregado:', producto);
    }
    
    totalCompra = calcularSubtotal();
    console.log('Carrito actual:', carritoProductos);
    console.log('Total actual: S/', totalCompra.toFixed(2));
    
    actualizarContadorCarrito();
    alert(`${nombreProducto} agregado al carrito!\nTotal: S/ ${totalCompra.toFixed(2)}`);
  } else {
    console.log('Usuario canceló la compra de:', nombreProducto);
  }
}

// ========================================
// 3. MANIPULACIÓN DEL DOM
// ========================================

// Función para actualizar contador del carrito
function actualizarContadorCarrito() {
  let contador = document.getElementById('contador-carrito');
  
  if (!contador) {
    // Crear contador si no existe
    const navLinks = document.querySelectorAll('nav ul li');
    navLinks.forEach(link => {
      const linkText = link.textContent.toLowerCase();
      if (linkText.includes('carrito')) {
        contador = document.createElement('span');
        contador.id = 'contador-carrito';
        contador.style.cssText = `
          background-color: #ff5722;
          color: white;
          border-radius: 50%;
          padding: 2px 8px;
          font-size: 12px;
          margin-left: 5px;
          font-weight: bold;
        `;
        link.querySelector('a').appendChild(contador);
      }
    });
  }
  
  if (contador) {
    const totalProductos = contarTotalProductos();
    contador.textContent = totalProductos;
    contador.style.display = totalProductos > 0 ? 'inline' : 'none';
  }
}

// Función para calcular subtotal
function calcularSubtotal() {
  let subtotal = 0;
  for (let i = 0; i < carritoProductos.length; i++) {
    subtotal += carritoProductos[i].precio * carritoProductos[i].cantidad;
  }
  return subtotal;
}

// Función para contar total de productos
function contarTotalProductos() {
  let total = 0;
  for (let i = 0; i < carritoProductos.length; i++) {
    total += carritoProductos[i].cantidad;
  }
  return total;
}

// ========================================
// 4. MENÚ RESPONSIVO Y MODALES
// ========================================

// Función para toggle del menú hamburguesa
function toggleMenu() {
  const navMenu = document.querySelector('nav ul');
  const menuBtn = document.getElementById('menu-hamburguesa');
  
  if (!navMenu || !menuBtn) return;
  
  if (navMenu.classList.contains('menu-activo')) {
    navMenu.classList.remove('menu-activo');
    menuBtn.classList.remove('activo');
    console.log('Menú cerrado');
  } else {
    navMenu.classList.add('menu-activo');
    menuBtn.classList.add('activo');
    console.log('Menú abierto');
  }
}

// Función para abrir modales
function abrirModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    console.log('Modal abierto:', modalId);
  }
}

// Función para cerrar modales
function cerrarModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    console.log('Modal cerrado:', modalId);
  }
}

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    cerrarModal(e.target.id);
  }
});

// ========================================
// INICIALIZACIÓN DE EVENTOS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM completamente cargado');
  
  // Evento para el botón de búsqueda
  const botonBuscar = document.querySelector('.botonBuscar');
  if (botonBuscar) {
    botonBuscar.addEventListener('click', buscarProducto);
    console.log('Evento de búsqueda agregado');
  }
  
  // Evento para búsqueda con Enter
  const inputBusqueda = document.querySelector('.busqueda');
  if (inputBusqueda) {
    inputBusqueda.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        buscarProducto();
      }
    });
    console.log('Evento Enter en búsqueda agregado');
  }
  
  // Eventos para botones "Agregar al carrito"
  const botonesAgregar = document.querySelectorAll('.productos button');
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const productoDiv = e.target.closest('div');
      const nombre = productoDiv.querySelector('.TituloProducto').textContent.trim();
      const precioTexto = productoDiv.querySelector('h4').textContent;
      const precio = parseFloat(precioTexto.match(/[\d.]+/)[0]);
      
      agregarAlCarrito(nombre, precio);
    });
  });
  console.log(`${botonesAgregar.length} botones de carrito configurados`);
  
  // Evento para validación de edad (solo en página principal)
  const esMarketPage = window.location.pathname.includes('market.html') || 
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname === '/';
  
  if (esMarketPage) {
    setTimeout(() => {
      validarEdad();
    }, 1000);
  }
  
  // Crear menú hamburguesa
  crearMenuHamburguesa();
  
  // Actualizar contador del carrito al cargar
  actualizarContadorCarrito();
  
  console.log('Inicialización completa');
});

// Función para crear menú hamburguesa
function crearMenuHamburguesa() {
  const header = document.querySelector('header');
  const nav = document.querySelector('nav');
  
  if (!header || !nav) return;
  
  // Verificar si ya existe
  if (document.getElementById('menu-hamburguesa')) return;
  
  // Crear botón hamburguesa
  const menuBtn = document.createElement('button');
  menuBtn.id = 'menu-hamburguesa';
  menuBtn.className = 'menu-hamburguesa';
  menuBtn.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  
  menuBtn.addEventListener('click', toggleMenu);
  
  // Insertar antes del nav
  header.insertBefore(menuBtn, nav);
  
  console.log('Menú hamburguesa creado');
}