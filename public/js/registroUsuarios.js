window.onload = function () {

    document.addEventListener('load', function () {
        const form = document.querySelector('.register__form');
        const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

        inputs.forEach(input => {
            input.addEventListener('blur', function () {
                if (this.value.trim() === '') {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
        });

        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Evitar que el formulario se envíe automáticamente

            // Validar nombre y apellido
            const nombreInput = document.querySelector('.nombre');
            const apellidoInput = document.querySelector('input[name="apellido"]');
            const nombre = nombreInput.value.trim();
            const apellido = apellidoInput.value.trim();

            if (nombre.length < 2 || apellido.length < 2) {
                alert('El nombre y el apellido deben tener al menos 2 caracteres.');
                return;
            }

            // Aquí puedes agregar más validaciones para otros campos según tus requisitos

            // Si todas las validaciones pasan, puedes enviar el formulario
            form.submit();
        });
    });

}