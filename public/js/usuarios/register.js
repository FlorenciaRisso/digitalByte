window.addEventListener('load', function () {
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
    let rolMsg = document.querySelector('.rol-msg');
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

    email.addEventListener("input", function () {
        let emailValue = this.value.trim();
    
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (emailValue === '') {
            email.style.border = '2px solid red';
            emailMsg.textContent = 'Este campo es obligatorio';
            emailMsg.style.display = 'block';
        } else if (!emailRegex.test(emailValue)) {
            email.style.border = '2px solid red';
            emailMsg.textContent = 'Email inválido';
            emailMsg.style.display = 'block';
        } else {
            email.style.border = '2px solid green';
            emailMsg.style.display = 'none';
        }
    });
    
    email.addEventListener("blur", function () {
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValue = this.value.trim();
        if (emailValue === '') {
            email.style.border = '2px solid red';
            emailMsg.textContent = 'Este campo es obligatorio';
            emailMsg.style.display = 'block';
        } else if (!emailRegex.test(emailValue)) {
            email.style.border = '2px solid red';
            emailMsg.textContent = 'Email inválido';
            emailMsg.style.display = 'block';
        } else {
            email.style.border = '2px solid green';
            emailMsg.style.display = 'none';
        }
        fetch('/usuarios/verificarEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: emailValue }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.existe && Object.keys(data.existe).length > 0) {
                emailMsg.textContent = "Este correo electrónico ya está registrado.";
                emailMsg.style.display = 'block';
                email.style.border = '2px solid red';
            } 
        })
        .catch(error => {
            console.error('Error:', error);
        });
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


    repetirContraseña.addEventListener('input', function () {
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


});