
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
            nombreMsg.textContent = 'Ingresa el nombre del producto'
        } else if (nombre.value.length < 5) {
            nombre.style.border = '2px solid red';
            nombreMsg.textContent = 'Debe contener al menos 5 caracteres';
        } else {
            nombre.style.border = '2px solid green';
            nombreMsg.style.display = 'none'
        }
    });

    nombre.addEventListener('input', function () {
        if (nombre.value.length >= 5) {
            nombre.style.border = '1px solid green';
            nombreMsg.style.display = 'none';
        } else {
            nombre.style.border = '1px solid red';
            nombreMsg.textContent = 'Debe contener al menos 5 caracteres';
        }
    });

    descripcion.addEventListener('blur', function () {
        if (descripcion.value === '') {
            descripcion.style.border = '2px solid red';
            descripcionMsg.style.display = 'block';
            descripcionMsg.textContent = 'Ingresa la descripcion del producto'
        } else if (descripcion.value.length < 20) {
            descripcion.style.border = '2px solid red';
            descripcionMsg.style.display = 'block';
            descripcionMsg.textContent = 'Debe contener al menos 20 caracteres';
        } else {
            descripcion.style.border = '2px solid green';
            descripcionMsg.style.display = 'none'
        }
    });

    descripcion.addEventListener('input', function () {
        if (descripcion.value.length >= 20) {
            descripcion.style.border = '1px solid green';
            descripcionMsg.style.display = 'none';
        } else {
            descripcion.style.border = '1px solid red';
            descripcionMsg.textContent = 'Debe contener al menos 20 caracteres';
        }
    });

    stock.addEventListener('blur', function () {
        if (stock.value === '') {
            stock.style.border = '2px solid red';
            stockMsg.style.display = 'block';
            stockMsg.textContent = 'Ingresa el stock del producto'
        } else {
            stock.style.border = '2px solid green';
            stockMsg.style.display = 'none'
        }
    });

    stock.addEventListener('input', function () {
        if (!/^\d*$/.test(stock.value)) {
            stock.value = stock.value.replace(/[^\d]/g, '');
        }
        if (stock.value.length >= 5) {
            stock.style.border = '1px solid green';
            stockMsg.style.display = 'none';
        } else {
            stock.style.border = '1px solid red';
        }
    });
    precio.addEventListener('blur', function () {
        if (!/^\d*$/.test(precio.value)) {
            precio.value = precio.value.replace(/[^\d]/g, '');
        }
        if (precio.value === '') {
            precio.style.border = '2px solid red';
            precioMsg.style.display = 'block';
            precioMsg.textContent = 'Ingresa el precio del producto'
        } else {
            precio.style.border = '2px solid green';
            precioMsg.style.display = 'none'
        }
    });

    precio.addEventListener('input', function () {
        if (precio.value === '') {
            precio.style.border = '1px solid red';
            precioMsg.textContent = 'Ingresa el precio del producto'            
            precioMsg.style.display = 'block';
        } else {
            precio.style.border = '1px solid green';
            precioMsg.style.display = 'none'
        }
    });
})