window.addEventListener('load', function () {

    let form = document.querySelector('.register__form');
    let inputs = form.querySelectorAll('.block-input');

    inputs.forEach(input => {
        input.querySelector('input').addEventListener('blur', function () {
            if (this.value.trim() === '') {
                this.classList.add('is-invalid');
                let small = input.querySelector('small');
                if (!small) {
                    small = document.createElement('small');
                    small.textContent = 'El campo no puede estar vacío';
                    input.appendChild(small);
                }
            } else {
                this.classList.remove('is-invalid');
                let small = input.querySelector('small');
                if (small) {
                    small.remove();
                }
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        let invalidInputs = form.querySelectorAll('.is-invalid');

        if (invalidInputs.length > 0) {
            alert('Por favor complete todos los campos correctamente.');
            return;
        }

        // Si todas las validaciones pasan, puedes enviar el formulario
        form.submit();
    });
});