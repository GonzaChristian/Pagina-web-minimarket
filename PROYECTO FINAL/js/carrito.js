// ========================================
// PÁGINA DEL CARRITO DE COMPRAS
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Página del carrito cargada');
  mostrarCarritoCompleto();
});

function mostrarCarritoCompleto() {
  const contenedor = document.getElementById('contenedor-carrito');
  
  if (!contenedor) return;
  
  console.log('Mostrando carrito:', carritoProductos);
  console.log('Total de productos:', carritoProductos.length);
  
  // Limpiar contenedor
  contenedor.innerHTML = '';
  
  if (carritoProductos.length === 0) {
    // Mostrar mensaje de carrito vacío
    contenedor.innerHTML = `
      <div class="carrito-vacio">
        <i class="fa-solid fa-cart-shopping"></i>
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega productos para comenzar a comprar!</p>
        <br>
        <a href="productos.html" class="btn-seguir-comprando">
          <i class="fa-solid fa-bag-shopping"></i> Ver Productos
        </a>
      </div>
    `;
    return;
  }
  
  // Crear lista de productos
  carritoProductos.forEach((producto, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-carrito';
    itemDiv.innerHTML = `
      <div class="item-info">
        <div class="item-detalles">
          <h3>${producto.nombre}</h3>
          <p class="item-precio">S/ ${producto.precio.toFixed(2)} c/u</p>
        </div>
      </div>
      <div class="item-acciones">
        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, -1)">-</button>
        <span class="cantidad-display">${producto.cantidad}</span>
        <button class="btn-cantidad" onclick="cambiarCantidad(${index}, 1)">+</button>
        <button class="btn-eliminar" onclick="eliminarProducto(${index})">
          <i class="fa-solid fa-trash"></i> Eliminar
        </button>
      </div>
    `;
    contenedor.appendChild(itemDiv);
  });
  
  // Crear resumen
  const resumenDiv = document.createElement('div');
  resumenDiv.className = 'resumen-carrito';
  
  const subtotal = calcularSubtotal();
  const impuesto = subtotal * IVA;
  const descuento = subtotal >= DESCUENTO_MINIMO ? subtotal * 0.05 : 0;
  const total = subtotal + impuesto - descuento;
  
  resumenDiv.innerHTML = `
    <h2 style="color: #1976D2; margin-bottom: 20px;">
      <i class="fa-solid fa-receipt"></i> Resumen de Compra
    </h2>
    
    <div class="resumen-linea">
      <span>Subtotal (${contarTotalProductos()} productos):</span>
      <span>S/ ${subtotal.toFixed(2)}</span>
    </div>
    
    <div class="resumen-linea">
      <span>IGV (18%):</span>
      <span>S/ ${impuesto.toFixed(2)}</span>
    </div>
    
    ${descuento > 0 ? `
      <div class="resumen-linea" style="color: #4caf50;">
        <span><i class="fa-solid fa-tag"></i> Descuento (5%):</span>
        <span>-S/ ${descuento.toFixed(2)}</span>
      </div>
    ` : ''}
    
    ${subtotal < DESCUENTO_MINIMO ? `
      <div class="resumen-linea" style="color: #ff9800; font-size: 14px;">
        <span><i class="fa-solid fa-info-circle"></i> Compra S/ ${(DESCUENTO_MINIMO - subtotal).toFixed(2)} más para 5% de descuento</span>
      </div>
    ` : ''}
    
    <div class="resumen-linea resumen-total">
      <span>TOTAL:</span>
      <span>S/ ${total.toFixed(2)}</span>
    </div>
    
    <button class="btn-finalizar" onclick="procesarCompra()">
      <i class="fa-solid fa-check-circle"></i> Finalizar Compra
    </button>
    
    <a href="productos.html" class="btn-seguir-comprando" style="text-align: center;">
      <i class="fa-solid fa-arrow-left"></i> Seguir Comprando
    </a>
  `;
  
  contenedor.appendChild(resumenDiv);
  
  console.log('Resumen - Subtotal:', subtotal, 'IGV:', impuesto, 'Descuento:', descuento, 'Total:', total);
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

// Función para cambiar cantidad de producto
function cambiarCantidad(index, cambio) {
  if (index < 0 || index >= carritoProductos.length) return;
  
  const producto = carritoProductos[index];
  const nuevaCantidad = producto.cantidad + cambio;
  
  if (nuevaCantidad <= 0) {
    // Si la cantidad llega a 0, preguntar si desea eliminar
    const confirmar = confirm(`¿Deseas eliminar ${producto.nombre} del carrito?`);
    if (confirmar) {
      eliminarProducto(index);
    }
    return;
  }
  
  if (nuevaCantidad > 10) {
    alert('Cantidad máxima por producto: 10 unidades');
    return;
  }
  
  producto.cantidad = nuevaCantidad;
  totalCompra = calcularSubtotal();
  
  console.log('Cantidad actualizada:', producto.nombre, 'Nueva cantidad:', producto.cantidad);
  
  mostrarCarritoCompleto();
  actualizarContadorCarrito();
}

// Función para eliminar producto
function eliminarProducto(index) {
  if (index < 0 || index >= carritoProductos.length) return;
  
  const producto = carritoProductos[index];
  const confirmar = confirm(`¿Estás seguro de eliminar ${producto.nombre}?`);
  
  if (confirmar) {
    console.log('Producto eliminado:', producto);
    carritoProductos.splice(index, 1);
    totalCompra = calcularSubtotal();
    
    mostrarCarritoCompleto();
    actualizarContadorCarrito();
    
    alert(`${producto.nombre} eliminado del carrito`);
  }
}

// Función para procesar la compra
function procesarCompra() {
  if (carritoProductos.length === 0) {
    alert('El carrito está vacío');
    return;
  }
  
  const subtotal = calcularSubtotal();
  const impuesto = subtotal * IVA;
  const descuento = subtotal >= DESCUENTO_MINIMO ? subtotal * 0.05 : 0;
  const total = subtotal + impuesto - descuento;
  
  const mensaje = `
RESUMEN DE TU COMPRA

Productos: ${contarTotalProductos()} unidades
Subtotal: S/ ${subtotal.toFixed(2)}
IGV (18%): S/ ${impuesto.toFixed(2)}
${descuento > 0 ? `Descuento: -S/ ${descuento.toFixed(2)}\n` : ''}
TOTAL A PAGAR: S/ ${total.toFixed(2)}

¿Confirmar compra?
  `;
  
  const confirmar = confirm(mensaje);
  
  if (confirmar) {
    // Simular proceso de pago
    console.log('Procesando compra...');
    console.log('Productos comprados:', carritoProductos);
    console.log('Total pagado: S/', total.toFixed(2));
    
    alert('¡Compra realizada con éxito!\n\nGracias por tu compra en MiniMarket GONZA.\nRecibirás un correo de confirmación.');
    
    // Limpiar carrito
    carritoProductos = [];
    totalCompra = 0;
    
    mostrarCarritoCompleto();
    actualizarContadorCarrito();
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      window.location.href = 'market.html';
    }, 2000);
  } else {
    console.log('Compra cancelada por el usuario');
  }
}