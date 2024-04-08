
window.addEventListener("load", function () {

  const inputsCantidad = document.querySelectorAll('.input-cantidad');

  inputsCantidad.forEach(input => {

    input.addEventListener('change', function () {
      const detalleProductoId = this.dataset.id;
      const nuevaCantidad = parseInt(this.value);

      fetch(`/carrito/actualizarCantidad/${detalleProductoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: detalleProductoId, cantidad: nuevaCantidad })
      })
        .then(response => {
          if (response.ok) {
            location.reload();
            console.log('Cantidad actualizada correctamente');
          } else {
            console.error('Error al actualizar la cantidad del producto');
          }
        })
        .catch(error => {
          console.error('Error en la solicitud AJAX:', error);
        });
    });

  });
  
  document.getElementById("btnAgregarCarrito").addEventListener("click", function () {
    var productId = this.getAttribute("data-id");
    window.location.href = "/carrito/agregarCarrito?id=" + productId;
  });

});