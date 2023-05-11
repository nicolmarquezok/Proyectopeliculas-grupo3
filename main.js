const form = document.getElementById('miFormulario');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById('nombre').value;
  
  // Crear un objeto de usuario con los datos del formulario
  const usuario = { nombre };
  
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  usuarios.push(usuario);
  
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
  alert(`Hola ${nombre}, gracias por comunicarte con RollingFlix, pronto nos pondremos en contacto.`);
  
  // Reiniciar el formulario
  form.reset();
});