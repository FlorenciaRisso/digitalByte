window.addEventListener('load', function () {
    let email = document.querySelector('.email');
    let contraseña = document.querySelector('.contraseña');

    let emailMsg = document.querySelector('.email-msg');
    let contraseñaMsg = document.querySelector('.contraseña-msg');


    email.addEventListener("input", function () {
        let emailValue = this.value.trim();

        // Expresión regular para validar un email
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
                    email.style.border = '2px solid green';
                    emailMsg.style.display = 'none';
                } else if (email.value.length > 0 && emailRegex.test(emailValue)) {
                    email.style.border = '2px solid red';
                    emailMsg.textContent = 'El email no esta registrado';
                    emailMsg.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    contraseña.addEventListener('blur', function () {
        if (contraseña.value === '') {
            contraseñaMsg.textContent = 'Ingresa una contraseña';
            contraseñaMsg.style.display = 'block';
            contraseña.style.border = '2px solid red';
        } else if (contraseña.value.length < 8) {
            contraseñaMsg.textContent = 'Debe contener al menos 8 caracteres';
            contraseñaMsg.style.display = 'block';
            contraseña.style.border = '2px solid red';
        } else {
            contraseña.style.border = '2px solid green';
            contraseñaMsg.style.display = 'none';
        }
    });


    contraseña.addEventListener('input', function () {
        if (contraseña.value.length < '') {
            contraseñaMsg.textContent = 'Ingresa una contraseña';
            contraseñaMsg.style.display = 'block';
            contraseña.style.border = '2px solid red';
        } else {
            contraseña.style.border = '2px solid green';
            contraseñaMsg.style.display = 'none';
        }
    });




    let form = document.querySelector('.login__form');

    form.addEventListener('submit', function (e) {
        if (email.value === '' || contraseña.value === '') {
            e.preventDefault();
        }
    })

    let togglePassword = document.querySelector(".toggle-password");
    let passwordField = document.querySelector(".contraseña");

    togglePassword.addEventListener("click", function () {
        const type =
            passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
        this.classList.toggle("fa-eye");
    });

})
