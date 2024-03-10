window.addEventListener('load', function () {
    let form = document.querySelector('.register__form');
    let nombre = document.querySelector('.nombre');
    let apellido = document.querySelector('.apellido');
    let email = document.querySelector('.email');
    let contraseña = document.querySelector('.contraseña');
    let repetirContraseña = document.querySelector('.repetirContraseña');
    let rol = document.querySelector('.rol');
    let nacionalidad = document.querySelector('.nacionalidad')

    let nombreMsg = document.querySelector('.name-msg');
    let apellidoMsg = document.querySelector('.apellido-msg');
    let emailMsg = document.querySelector('.email-msg');
    let contraseñaMsg = document.querySelector('.contraseña-msg');
    let repetirContraseñaMsg = document.querySelector('.contraseña2-msg');
    let rolMsg = document.querySelector('.empty-rol');
    let nacionalidadMsg = document.querySelector('.nacionalidad-msg')



    nombre.addEventListener('blur', function () {
        if (nombre.value === '') {
            nombre.style.border = '2px solid red';
            nombreMsg.style.display = 'block';
        } else if (nombre.value.length < 2) {
            nombre.style.border = '2px solid red';
            nombreMsg.textContent = 'Debe contener al menos 2 caracteres';
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


    apellido.addEventListener('blur', function () {
        if (apellido.value === '') {
            apellido.style.border = '2px solid red';
            apellidoMsg.style.display = 'block';
        } else if (apellido.value.length < 2) {
            apellido.style.border = '2px solid red';
            apellidoMsg.textContent = 'Debe contener al menos 2 caracteres';
        } else {
            apellido.style.border = '2px solid green';
            apellidoMsg.style.display = 'none';
        }
    });

    apellido.addEventListener('input', function () {
        if (apellido.value.length > 2) {
            apellido.style.border = '1px solid green';
            apellidoMsg.style.display = 'none';
        } else {
            apellido.style.border = '1px solid red';
        }
    });

    email.addEventListener('blur', function () {
        let emailValue = email.value.trim();

        // Expresión regular para validar un email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            email.style.border = '2px solid red';
            emailMsg.style.display = 'block';
        } else if (!emailRegex.test(emailValue)) {
            email.style.border = '2px solid red';
            emailMsg.textContent = 'Email inválido';
        } else {
            email.style.border = '2px solid green';
            emailMsg.style.display = 'none';
        }
    });

    email.addEventListener('input', function () {
        let emailValue = email.value.trim();

        // Expresión regular para validar un email
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === '') {
            email.style.border = '2px solid red';
            emailMsg.style.display = 'block';
        } else if (!emailRegex.test(emailValue)) {
            email.style.border = '2px solid red';
            emailMsg.textContent = 'Email inválido';
        } else {
            email.style.border = '2px solid green';
            emailMsg.style.display = 'none';
        }
    });

    contraseña.addEventListener('blur', function () {
        let regexMayuscula = /[A-Z]/;
        let regexMinuscula = /[a-z]/;
        let regexNumero = /[0-9]/;
        let regexCaracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
        if (contraseña.value === '') {
            contraseña.style.border = '2px solid red';
            contraseñaMsg.textContent = 'La contraseña no puede estar vacía';
            contraseñaMsg.style.display = 'block';
        } else if (contraseña.value.length < 8) {
            contraseña.style.border = '2px solid red';
            contraseñaMsg.textContent = 'La contraseña debe contener al menos 8 caracteres';
            contraseñaMsg.style.display = 'block';
        } else if (!regexMayuscula.test(contraseña.value) ||
                   !regexMinuscula.test(contraseña.value) ||
                   !regexNumero.test(contraseña.value) ||
                   !regexCaracterEspecial.test(contraseña.value)) {
            contraseña.style.border = '2px solid red';
            contraseñaMsg.textContent = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial';
            contraseñaMsg.style.display = 'block';
        } else {
            contraseña.style.border = '2px solid green';
            contraseñaMsg.style.display = 'none';
        }
    });

    contraseña.addEventListener('input', function () {
        let regexMayuscula = /[A-Z]/;
        let regexMinuscula = /[a-z]/;
        let regexNumero = /[0-9]/;
        let regexCaracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    
        if (contraseña.value === '') {
            contraseña.style.border = '2px solid red';
            contraseñaMsg.textContent = 'La contraseña no puede estar vacía';
            contraseñaMsg.style.display = 'block';
        } else if (contraseña.value.length < 8) {
            contraseña.style.border = '2px solid red';
            contraseñaMsg.textContent = 'La contraseña debe contener al menos 8 caracteres';
            contraseñaMsg.style.display = 'block';
        } else if (!regexMayuscula.test(contraseña.value) ||
                   !regexMinuscula.test(contraseña.value) ||
                   !regexNumero.test(contraseña.value) ||
                   !regexCaracterEspecial.test(contraseña.value)) {
            contraseña.style.border = '2px solid red';
            contraseñaMsg.textContent = 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un caracter especial';
            contraseñaMsg.style.display = 'block';
        } else {
            contraseña.style.border = '2px solid green';
            contraseñaMsg.style.display = 'none';
        }
    });

    repetirContraseña.addEventListener('blur', function () {
        if (repetirContraseña.value === '') {
            repetirContraseña.style.border = '2px solid red';
            repetirContraseñaMsg.style.display = 'block';
        } else if (repetirContraseña.value !== contraseña.value) {
            repetirContraseña.style.border = '2px solid red';
            repetirContraseñaMsg.style.display = 'block';
        } else {
            repetirContraseña.style.border = '2px solid green';
            repetirContraseñaMsg.style.display = 'none'
        }

    });


    repetirContraseña.addEventListener('blur', function () {
        if (repetirContraseña.value === '') {
            repetirContraseña.style.border = '2px solid red';
            repetirContraseñaMsg.style.display = 'block';
        } else if (repetirContraseña.value !== contraseña.value) {
            repetirContraseña.style.border = '2px solid red';
            repetirContraseñaMsg.style.display = 'block';
        } else {
            repetirContraseña.style.border = '2px solid green';
            repetirContraseñaMsg.style.display = 'none'
        }
    });


    rol.addEventListener('blur', function () {
        if (rol.value === '') {
            rol.style.border = '2px solid red';
            rolMsg.style.display = 'block';
        } else {
            rol.style.border = '2px solid green';
            rolMsg.style.display = 'none';
        }
    })

    rol.addEventListener('change', function () {
        if (rol.value === '') {
            rol.style.border = '2px solid red';
            rolMsg.style.display = 'block';
        } else {
            rol.style.border = '2px solid green';
            rolMsg.style.display = 'none';
        }
    });

    nacionalidad.addEventListener('blur', function () {
        if (nacionalidad.value === '') {
            nacionalidad.style.border = '2px solid red';
            nacionalidadMsg.style.display = 'block';
        } else {
            nacionalidad.style.border = '2px solid green';
            nacionalidadMsg.style.display = 'none';
        }
    })

    nacionalidad.addEventListener('change', function () {
        if (nacionalidad.value === '') {
            nacionalidad.style.border = '2px solid red';
            nacionalidadMsg.style.display = 'block';
        }else {
            nacionalidad.style.border = '2px solid green';
            nacionalidadMsg.style.display = 'none';
        }
    });

    // // Agregar otras validaciones según sea necesario para tu formulario

    // // Escuchar el evento submit del formulario para realizar una validación final antes de enviar los datos al servidor
    // form.addEventListener('submit', function (event) {
    //     // Validar campos adicionales si es necesario

    //     if (nombre.value === '') {
    //         nombre.style.border = '2px solid red';
    //         nombreVacio.style.display = 'block';
    //         event.preventDefault(); // Evitar que el formulario se envíe si hay campos vacíos
    //     }

    //     if (apellido.value === '') {
    //         apellido.style.border = '2px solid red';
    //         apellidoVacio.style.display = 'block';
    //         event.preventDefault();
    //     }

    //     if (email.value === '') {
    //         email.style.border = '2px solid red';
    //         emailVacio.style.display = 'block';
    //         event.preventDefault();
    //     }

    //     if (contraseña.value === '') {
    //         contraseña.style.border = '2px solid red';
    //         contraseñaVacia.style.display = 'block';
    //         event.preventDefault();
    //     }

    //     if (repetirContraseña.value === '') {
    //         repetirContraseña.style.border = '2px solid red';
    //         repetirContraseñaVacia.style.display = 'block';
    //         event.preventDefault();
    //     }

    //     if (rol.value === '') {
    //         rol.style.border = '2px solid red';
    //         rolVacio.style.display = 'block';
    //         event.preventDefault();
    //     }

    //     // Agregar otras validaciones según sea necesario

    //     // Si todas las validaciones son exitosas, el formulario se enviará
    // });
});