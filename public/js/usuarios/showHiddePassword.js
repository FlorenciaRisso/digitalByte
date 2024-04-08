window.addEventListener('load', function () {
    let togglePasswords = document.querySelectorAll(".toggle-password");

    togglePasswords.forEach(function (togglePassword) {
        let passwordField = togglePassword.previousElementSibling;

        togglePassword.addEventListener("click", function () {
            const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
            passwordField.setAttribute("type", type);

            this.classList.toggle("fa-eye-slash");
            this.classList.toggle("fa-eye");
        });
    });
});