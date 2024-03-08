window.addEventListener('load', function () {
        let email = document.querySelector('.email');
        let contraseña = document.querySelector('.contraseña');
        let contraseñaMessage = document.querySelector('.contraseña-message');
        let emailMessage = document.querySelector('.email-message');
        let emptyMessage = document.querySelector('.empty-message');
    
        email.addEventListener('blur', function () {
            if (email.value === '' ) {
                emptyMessage.style.display = 'block';
                email.style.border = '2px solid red';
                emailMessage.style.display = 'none';
            } else if (email.validity.typeMismatch) {
                emailMessage.style.display = 'block'; // Correo electrónico no válido
                emptyMessage.style.display = 'none';
                email.style.border = '2px solid red';
            } else {
                emptyMessage.style.display = 'none';
                emailMessage.style.display = 'none';
                email.style.border = '2px solid green';
            }
        });
    
        contraseña.addEventListener('blur', function () {
                if (contraseña.value.length < 8 ) {
                    contraseña.style.border = '2px solid red';
                    contraseñaMessage.style.display = 'block';
                } else {
                    contraseñaMessage.style.display = 'none';
                    contraseña.style.border = '2px solid green';
                }
            });
    
        let form = document.querySelector('.login__form');
    
        form.addEventListener('submit', function (e) {
            if (email.value === '' || contraseña.value === '') {
                e.preventDefault(); // Evitar que el formulario se envíe si algún campo está vacío
            }
        });
    });