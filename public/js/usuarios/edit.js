window.addEventListener('load', function () {

    let nombre = document.querySelector('.nombre');
    let apellido = document.querySelector('.apellido');
    let email = document.querySelector('.email');
    let rol = document.querySelector('.rol');
    let nacionalidad = document.querySelector('.nacionalidad')

    let nombreMsg = document.querySelector('.nombre-msg');
    let apellidoMsg = document.querySelector('.apellido-msg');
    let emailMsg = document.querySelector('.email-msg');
    let rolMsg = document.querySelector('.empty-rol');
    let nacionalidadMsg = document.querySelector('.nacionalidad-msg')

    nombre.addEventListener('blur', function () {
        if (nombre.value === '') {
            nombre.style.border = '2px solid red';
            nombreMsg.style.display = 'block';
            nombreMsg.textContent = 'Ingresa tu nombre';
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
            apellidoMsg.textContent = 'Ingresa tu apellido';
        } else if (apellido.value.length < 2) {
            apellido.style.border = '2px solid red';
            apellidoMsg.textContent = 'Debe contener al menos 2 caracteres';
        } else {
            apellido.style.border = '2px solid green';
            apellidoMsg.style.display = 'none'
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

    email.addEventListener("blur", function () {
        const emailValue = this.value.trim();
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === '') {
            email.style.border = '2px solid red';
            emailMsg.textContent = 'Este campo es obligatorio';
            emailMsg.style.display = 'block';
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
                    email.style.border = '2px solid red';
                    emailMsg.style.display = 'block';
                    emailMsg.textContent = 'El email ya esta registrado';
                } else if (email.value.length > 0 && emailRegex.test(emailValue)) {
                    email.style.border = '2px solid green';
                    emailMsg.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
            rolMsg.textContent = 'Ingresa tu rol de usuario'
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
})