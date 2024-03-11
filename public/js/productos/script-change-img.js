
document.addEventListener("DOMContentLoaded", function () {

    for (let i = 0; i < 4; i++) {
        const cameraIcon = document.querySelector("#previewImage" + i);
        const imageInput = document.getElementById("imagen" + i);

        if (cameraIcon && imageInput) {
            cameraIcon.addEventListener("click", function () {
                imageInput.click();
            });
        }
    }
    const inputs = document.querySelectorAll('input[type="file"]');

    inputs.forEach(function (input) {
        input.addEventListener('change', function (event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            const previewId = event.target.getAttribute('id').replace('imagen', 'previewImage'); // Obtenemos el id de la imagen de vista previa
            const preview = document.getElementById(previewId); // Seleccionamos la imagen de vista previa

            reader.onload = function () {
                preview.src = reader.result;
                preview.classList.remove('none'); // Quitamos la clase none para que se muestre la vista previa
            }

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    });
});