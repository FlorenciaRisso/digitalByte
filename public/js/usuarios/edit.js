window.addEventListener('load', function () {

    let nombre = document.querySelector('.nombre');
    let descripcion = document.querySelector('.descripcion');
    let precio = document.querySelector('.precio');
    let stock = document.querySelector('.stock');

    let nombreMsg = document.querySelector('.nombre-msg')
    let descripcionMsg = document.querySelector('.descripcion-msg')
    let precioMsg = document.querySelector('.precio-msg')
    let stockMsg = document.querySelector('.stock-msg')

    
    nombre.addEventListener('blur', function () {
        if (nombre.value === '') {
            nombre.style.border = '2px solid red';
            nombreMsg.style.display = 'block';
        } else if (nombre.value.length < 2) {
            nombre.style.border = '2px solid red';
            nombreMsg.textContent = 'Debe contener al menos 5 caracteres';
        } else {
            nombre.style.border = '2px solid green';
            nombreMsg.style.display = 'none'
        }
    });

    nombre.addEventListener('input', function () {
        if (nombre.value.length > 2) {
            nombre.style.border = '1px solid green';
            nombreMsg.style.display = 'none';
        } else {
            nombre.style.border = '1px solid red';
        }
    });
})