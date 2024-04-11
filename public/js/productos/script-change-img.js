
document.addEventListener("DOMContentLoaded", function () {

    //Cuando hacemos click en el icono de la camara Realiza el click en el input que es hidden y muestra la ventana
    //Para cargar la imagen

    for (let i = 0; i < 4; i++) {
        const cameraIcon = document.querySelector("#previewImage" + i);
        const imageInput = document.getElementById("imagen" + i);

        if (cameraIcon && imageInput) {
            cameraIcon.addEventListener("click", function () {
                imageInput.click();
            });
        }
    }

    //Almacena los inputs de la imagenes
    const inputs = document.querySelectorAll('input[type="file"]');

    //Los recorre agregando un evento para detectar la carga de la imagen
    inputs.forEach(function (input) {
        input.addEventListener('change', function (event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            // Obtenemos el id de la imagen de vista previa
            const previewId = event.target.getAttribute('id').replace('imagen', 'previewImage');
            const preview = document.getElementById(previewId); // Seleccionamos la imagen de vista previa

            reader.onload = function () {
                preview.src = reader.result;
            }

            if (file) {
                reader.readAsDataURL(file);
            }
        });
    });
});