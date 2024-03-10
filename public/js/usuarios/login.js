window.addEventListener('load', function () {
    let email = document.querySelector('.email');
    let contraseña = document.querySelector('.contraseña');
    let emptyEmail = document.querySelector('.empty-email-message');
    let contraseñaMessage = document.querySelector('.contraseña-message');
    let emailMessage = document.querySelector('.email-message');

    let emptyPassword = document.querySelector('.empty-password-message')

    email.addEventListener('blur', function () {
        if (email.value === '') {
            emptyEmail.style.display = 'block';
            email.style.border = '2px solid red';
            emailMessage.style.display = 'none';
        } else if (email.validity.typeMismatch) {
            emailMessage.style.display = 'block'; 
            emptyEmail.style.display = 'none';
            email.style.border = '2px solid red';
        } else {
            emptyEmail.style.display = 'none';
            emailMessage.style.display = 'none';
            email.style.border = '2px solid green';
        }
    });

    email.addEventListener('input', function () {
        if (email.value === '') {
            emptyEmail.style.display = 'block';
            email.style.border = '2px solid red';
            emailMessage.style.display = 'none';
        } else {
            emptyEmail.style.display = 'none';
            emailMessage.style.display = 'none';
            email.style.border = '2px solid green';
        }
    });


    contraseña.addEventListener('blur', function () {
        if (contraseña.value === '') {
            emptyPassword.style.display = 'block';
            contraseña.style.border = '2px solid red';
            contraseñaMessage.style.display = 'none';
        } else if (contraseña.value.length < 8) {
            contraseñaMessage.style.display = 'block';
            contraseña.style.border = '2px solid red';
        } else {
            contraseña.style.border = '2px solid green';
        }
    });


    contraseña.addEventListener('input', function () {
        if (contraseña.value.length < 8) {
            emptyPassword.style.display = 'none';
            contraseña.style.border = '2px solid red';
            contraseñaMessage.style.display = 'none';
        } else {
            contraseña.style.border = '2px solid green';
            contraseñaMessage.style.display = 'none';
        }
    });




    let form = document.querySelector('.login__form');

    form.addEventListener('submit', function (e) {
        if (email.value === '' || contraseña.value === '') {
            e.preventDefault(); 
        }
    })
})
