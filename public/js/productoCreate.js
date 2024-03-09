window.addEventListener('load', function () {
    let nombre = document.querySelector('.nombre');
    let nombreVacio = document.querySelector('.nombre-empty-msg');
    let descripcion = document.querySelector('.descripcion');
    let descripcionVacio = document.querySelector('.descripcion-empty-msg');
    let descripcionMsg = document.querySelector('.descripcion-msg');
    let nameMsg = document.querySelector('.nombre-msg');
    let tamaño = document.querySelector('.tamaño');
    let memoria = document.querySelector('.memoria');
    let camara = document.querySelector('.camara');
    let ram = document.querySelector('.ram');
    let precio = document.querySelector('.precio');
    let descuento = document.querySelector('.descuento');
    let stock = document.querySelector('.stock');



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
            nombreVacio.style.display = 'block';
            nombre.style.border = '2px solid red';
        } else {
            // Verifica la longitud mínima del nombre
            if (nombre.value.length < 5) {
                nombreVacio.style.display = 'none';
                nameMsg.style.display = 'block'; // Muestra el mensaje de longitud mínima
                nombre.style.border = '2px solid red';
            } else {
                nombreVacio.style.display = 'none';
                nameMsg.style.display = 'none'; // Oculta el mensaje de longitud mínima
                nombre.style.border = 'none';
            }
        }
    });

    nombre.addEventListener('input', function () {
        console.log(1)
        // Verifica si el campo de nombre está vacío
        if (nombre.value === '') {
            nombreVacio.style.display = 'block';
            nombre.style.border = '2px solid red';
            nameMsg.style.display = 'none'; // Oculta el mensaje de longitud mínima
        } else {
            // Verifica la longitud mínima del nombre
            if (nombre.value.length < 5) {
                nombreVacio.style.display = 'none';
                nameMsg.style.display = 'block'; // Muestra el mensaje de longitud mínima
                nombre.style.border = '2px solid red';
            } else {
                nombreVacio.style.display = 'none';
                nameMsg.style.display = 'none'; // Oculta el mensaje de longitud mínima
                nombre.style.border = '2px solid initial';
            }
        }
    });

    descripcion.addEventListener('blur', function () {
        // Verifica si el campo de descripción está vacío
        if (descripcion.value === '') {
            descripcionVacio.style.display = 'block';
            descripcion.style.border = '2px solid red';
        } else {
            // Verifica la longitud mínima de la descripción
            if (descripcion.value.length < 20) {
                descripcionMsg.style.display = 'block';
                descripcionVacio.style.display = 'none';
                descripcion.style.border = '2px solid red';
            } else {
                descripcionVacio.style.display = 'none';
                descripcion.style.border = '2px solid initial';
            }
        }
    });

    descripcion.addEventListener('input', function () {
        // Verifica si el campo de descripción está vacío
        if (descripcion.value === '') {
            descripcionVacio.style.display = 'block';
            descripcion.style.border = '2px solid red';
            descripcionMsg.style.display = 'none'; // Oculta el mensaje de longitud mínima
        } else {
            // Verifica la longitud mínima de la descripción
            if (descripcion.value.length < 20) {
                descripcionMsg.style.display = 'block';
                descripcionVacio.style.display = 'none';
                descripcion.style.border = '2px solid red';
            } else {
                descripcionVacio.style.display = 'none';
                descripcionMsg.style.display = 'none'; // Oculta el mensaje de longitud mínima
                descripcion.style.border = 'none';
            }
        }
    });

    function soloNumeros(input) {
        let regex = /^[0-9]*$/;
        return regex.test(input);
    }
});