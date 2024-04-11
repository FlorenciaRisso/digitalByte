window.addEventListener("load", function () {

    function updateCartNumber() {
        const cartNumberElement = document.getElementById('cart-number');
        if (cartNumberElement) {
            cartNumberElement.textContent = '..';
            fetch('/carrito/cantidadItems')
                .then(response => response.json())
                .then(data => {
                    cartNumberElement.textContent = data;
                })
                .catch(error => console.error('Error al obtener el número de productos en el carrito:', error));
        }
    }

    updateCartNumber();
})