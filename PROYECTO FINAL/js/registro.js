// ========================================
// VALIDACIÓN DEL FORMULARIO DE REGISTRO
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-registro');
  
  if (!formulario) return;
  
  console.log('Formulario de registro inicializado');
  
  // Agregar eventos de validación en tiempo real
  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirmar = document.getElementById('confirmar');
  const fecha = document.getElementById('fecha');
  
  // Validación en tiempo real para el nombre
  nombre.addEventListener('input', () => {
    validarNombre(nombre);
  });
  
  apellidos.addEventListener('input', () => {
    validarNombre(apellidos);
  });
  
  // Validación de email
  email.addEventListener('blur', () => {
    validarEmail();
  });
  
  // Validación de contraseña
  password.addEventListener('input', () => {
    validarPassword();
  });
  
  // Validación de confirmación de contraseña
  confirmar.addEventListener('input', () => {
    validarConfirmacion();
  });
  
  // Validación de fecha
  fecha.addEventListener('change', () => {
    validarFecha();
  });
  
  // Evento principal de envío del formulario
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    validarFormularioCompleto();
  });
});

// Función para validar nombres y apellidos
function validarNombre(campo) {
  const valor = campo.value.trim();
  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  
  if (valor.length < 2) {
    mostrarError(campo, 'Debe tener al menos 2 caracteres');
    return false;
  } else if (!regex.test(valor)) {
    mostrarError(campo, 'Solo se permiten letras');
    return false;
  } else {
    mostrarExito(campo);
    return true;
  }
}

// Función para validar email
function validarEmail() {
  const email = document.getElementById('email');
  const valor = email.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!regex.test(valor)) {
    mostrarError(email, 'Ingresa un correo válido');
    return false;
  } else {
    mostrarExito(email);
    return true;
  }
}

// Función para validar contraseña
function validarPassword() {
  const password = document.getElementById('password');
  const valor = password.value;
  
  if (valor.length < 6) {
    mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
    return false;
  } else if (!/[A-Z]/.test(valor)) {
    mostrarError(password, 'Debe incluir al menos una mayúscula');
    return false;
  } else if (!/[0-9]/.test(valor)) {
    mostrarError(password, 'Debe incluir al menos un número');
    return false;
  } else {
    mostrarExito(password);
    return true;
  }
}

// Función para validar confirmación de contraseña
function validarConfirmacion() {
  const password = document.getElementById('password');
  const confirmar = document.getElementById('confirmar');
  
  if (confirmar.value !== password.value) {
    mostrarError(confirmar, 'Las contraseñas no coinciden');
    return false;
  } else if (confirmar.value.length > 0) {
    mostrarExito(confirmar);
    return true;
  }
  return false;
}

// Función para validar fecha de nacimiento
function validarFecha() {
  const fecha = document.getElementById('fecha');
  const fechaNacimiento = new Date(fecha.value);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  
  if (!fecha.value) {
    mostrarError(fecha, 'Selecciona tu fecha de nacimiento');
    return false;
  } else if (edad < 18) {
    mostrarError(fecha, 'Debes ser mayor de 18 años');
    return false;
  } else if (edad > 120) {
    mostrarError(fecha, 'Fecha no válida');
    return false;
  } else {
    mostrarExito(fecha);
    return true;
  }
}

// Función para validar género
function validarGenero() {
  const generos = document.getElementsByName('genero');
  let seleccionado = false;
  
  for (let i = 0; i < generos.length; i++) {
    if (generos[i].checked) {
      seleccionado = true;
      break;
    }
  }
  
  if (!seleccionado) {
    alert('Por favor selecciona tu género');
    return false;
  }
  return true;
}

// Función para mostrar errores
function mostrarError(campo, mensaje) {
  // Remover mensaje de error anterior si existe
  const errorAnterior = campo.parentElement.querySelector('.mensaje-error');
  if (errorAnterior) {
    errorAnterior.remove();
  }
  
  // Agregar estilo de error
  campo.style.borderColor = '#f44336';
  campo.style.backgroundColor = '#ffebee';
  
  // Crear y agregar mensaje de error
  const mensajeError = document.createElement('span');
  mensajeError.className = 'mensaje-error';
  mensajeError.textContent = mensaje;
  mensajeError.style.cssText = `
    color: #f44336;
    font-size: 12px;
    display: block;
    margin-top: -10px;
    margin-bottom: 10px;
  `;
  
  campo.parentElement.insertBefore(mensajeError, campo.nextSibling);
  
  console.log('Error en', campo.name + ':', mensaje);
}

// Función para mostrar éxito
function mostrarExito(campo) {
  // Remover mensaje de error si existe
  const errorAnterior = campo.parentElement.querySelector('.mensaje-error');
  if (errorAnterior) {
    errorAnterior.remove();
  }
  
  // Agregar estilo de éxito
  campo.style.borderColor = '#4caf50';
  campo.style.backgroundColor = '#e8f5e9';
}

// Función para validar formulario completo
function validarFormularioCompleto() {
  const nombre = document.getElementById('nombre');
  const apellidos = document.getElementById('apellidos');
  
  // Realizar todas las validaciones
  const nombreValido = validarNombre(nombre);
  const apellidosValidos = validarNombre(apellidos);
  const emailValido = validarEmail();
  const passwordValida = validarPassword();
  const confirmacionValida = validarConfirmacion();
  const fechaValida = validarFecha();
  const generoValido = validarGenero();
  
  console.log('Validaciones:', {
    nombre: nombreValido,
    apellidos: apellidosValidos,
    email: emailValido,
    password: passwordValida,
    confirmacion: confirmacionValida,
    fecha: fechaValida,
    genero: generoValido
  });
  
  // Si todo es válido, proceder con el registro
  if (nombreValido && apellidosValidos && emailValido && passwordValida && 
      confirmacionValida && fechaValida && generoValido) {
    
    const confirmarRegistro = confirm('¿Estás seguro de crear esta cuenta?');
    
    if (confirmarRegistro) {
      // Obtener todos los datos del formulario
      const datosUsuario = {
        nombre: nombre.value.trim(),
        apellidos: apellidos.value.trim(),
        email: document.getElementById('email').value.trim(),
        fecha: document.getElementById('fecha').value,
        genero: document.querySelector('input[name="genero"]:checked').value
      };
      
      console.log('Usuario registrado:', datosUsuario);
      
      alert(`¡Registro exitoso!\n\nBienvenido ${datosUsuario.nombre} ${datosUsuario.apellidos}\nCorreo: ${datosUsuario.email}`);
      
      // Limpiar formulario
      document.getElementById('formulario-registro').reset();
      
      // Resetear estilos
      const campos = document.querySelectorAll('input');
      campos.forEach(campo => {
        campo.style.borderColor = '#ccc';
        campo.style.backgroundColor = 'white';
      });
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = 'market.html';
      }, 2000);
    }
  } else {
    alert('Por favor, corrige los errores en el formulario');
  }
}