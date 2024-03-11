document.addEventListener('DOMContentLoaded', function () {

    const cameraIcon = document.getElementById("camera-icon");
    const avatarUpload = document.getElementById("avatar-upload");

    if (cameraIcon && avatarUpload) {
        cameraIcon.addEventListener("click", function () {
            avatarUpload.click();
        });
    }

    const inputs = document.querySelectorAll('input[type="file"]');

    inputs.forEach(function (input) {
        input.addEventListener('change', function (event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            const previewId = 'avatar-img'; // No necesitas modificar el id
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