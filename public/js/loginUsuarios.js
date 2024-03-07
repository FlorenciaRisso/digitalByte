window.addEventListener('load', function () {
        let email = document.querySelector('.email');
        let contraseña = document.querySelector('.contraseña');
        let contraseñaMessage = document.querySelector('.contraseña-message');
        let emailMessage = this.document.querySelector('.email-message')

        email.addEventListener('blur', function () {
                if (email.value === '') {
                        email.style.border = '2px solid red';
                } else {
                        email.style.border = '2px solid initial';
                }


                if (email.validity.typeMismatch) {
                        emailMessage.style.display = 'block'; //Correo electrónico no válido
                } else {
                        emailMessage.style.display = 'none'; //Correo electrónico válido
                }
        });

        contraseña.addEventListener('blur', function () {
                if (contraseña.value === '') {
                        contraseña.style.border = '2px solid red';
                } else {
                        contraseña.style.border = '2px solid initial';
                }
        });


        contraseña.addEventListener('focus', function () {
                contraseñaMessage.style.display = 'block';
        });

        contraseña.addEventListener('blur', function () {
                contraseñaMessage.style.display = 'none';
        });

        let form = document.querySelector('.login__form');

        form.addEventListener('submit', function (e) {
                if (email.value === '' || contraseña.value === '') {
                        e.preventDefault(); // Evitar que el formulario se envíe si algún campo está vacío
                }
        });


});