window.addEventListener('load', function () {
    let nombre = document.querySelector('.nombre');
    let descripcion = document.querySelector('.descripcion');
    let tamaño = document.querySelector('.tamaño');
    let memoria = document.querySelector('.memoria');
    let camara = document.querySelector('.camara');
    let ram = document.querySelector('.ram');
    let precio = document.querySelector('.precio');
    let descuento = document.querySelector('.descuento');
    let stock = document.querySelector('.stock');

    let nombreMsg = document.querySelector('.name-msg');
    let descripcionMsg = document.querySelector('.descripcion-msg');
    let precioMsg = document.querySelector('.precio-msg');
    let stockMsg = document.querySelector('.stock-msg');


    // Event listeners para los campos de tamaño, memoria, cámara, RAM, precio, descuento y stock
    [tamaño, memoria, camara, ram, precio, descuento, stock].forEach(function (campo) {
        campo.addEventListener('input', function () {
            // Verifica si el valor ingresado contiene solo números
            if (!soloNumeros(campo.value)) {
                // Muestra un mensaje de error si no se ingresan solo números
                console.log(campo.value)
                campo.nextElementSibling.style.display = 'block';
                campo.style.border = '2px solid red';
            } else {
                // Oculta el mensaje de error si se ingresan solo números
                console.log(campo.value)
                campo.nextElementSibling.style.display = 'none';
                campo.style.border = 'none';
            }
        });

        campo.addEventListener('blur', function () {
            if (soloNumeros(campo.value)) {
                console.log(campo.value)
                nombre.style.border = 'none';
            }
        });
    });

    nombre.addEventListener('blur', function () {
        // Verifica si el campo de nombre está vacío
        if (nombre.value === '') {
            nombreMsg.style.display = 'block';
            nombre.style.border = '2px solid red';
        } else {
            // Verifica la longitud mínima del nombre
            if (nombre.value.length < 5) {
                nombreMsg.textContent = 'Debe contener al menos 5 caracteres'; // Muestra el mensaje de longitud mínima
                nombre.style.border = '2px solid red';
            } else {
                nombreMsg.style.display = 'none';
                nombre.style.border = '2px solid green';
            }
        }
    });

    nombre.addEventListener('input', function () {
        // Verifica si el campo de nombre está vacío
        if (nombre.value === '') {
            nombreMsg.style.display = 'block';
            nombre.style.border = '2px solid red';
        } else {
            // Verifica la longitud mínima del nombre
            if (nombre.value.length < 5) {
                nameMsg.textContent = 'Debe contener al menos 5 caracteres'; // Muestra el mensaje de longitud mínima
                nombre.style.border = '2px solid red';
            } else {
                nombreMsg.style.display = 'none';
                nombre.style.border = '2px solid green';
            }
        }
    });

    descripcion.addEventListener('blur', function () {
        // Verifica si el campo de descripción está vacío
        if (descripcion.value === '') {
            descripcionMsg.style.display = 'block';
            descripcion.style.border = '2px solid red';
        } else {
            // Verifica la longitud mínima de la descripción
            if (descripcion.value.length < 20) {
                descripcionMsg.textContent = 'La descripción debe contener al menos 20 caracteres';
                descripcion.style.border = '2px solid red';
            } else {
                descripcionMsg.style.display = 'none';
                descripcion.style.border = '2px solid green';
            }
        }
    });

    descripcion.addEventListener('input', function () {
        // Verifica si el campo de descripción está vacío
        if (descripcion.value === '') {
            descripcionMsg.style.display = 'block';
            descripcion.style.border = '2px solid red';
        } else {
            // Verifica la longitud mínima de la descripción
            if (descripcion.value.length < 20) {
                descripcionMsg.style.display = 'La descripción debe contener al menos 20 caracteres';
                descripcion.style.border = '2px solid red';
            } else {
                descripcionMsg.style.display = 'none';
                descripcion.style.border = '2px solid red';
            }
        }
    });

    precio.addEventListener('blur', function () {
        if (precio.value === '') {
            precioMsg.style.display = 'block';
            precio.style.border = '2px solid red';
        } else {
            nombreMsg.style.display = 'none';
            nombre.style.border = '2px solid green';
        }
    })

    precio.addEventListener('input', function () {
        if (precio.value === '') {
            precioMsg.style.display = 'block';
            precio.style.border = '2px solid red';
        } else {
            precioMsg.style.display = 'none';
            precio.style.border = '2px solid green';
        }
    })


    function soloNumeros(input) {
        let regex = /^[0-9]*$/;
        return regex.test(input);
    }
});