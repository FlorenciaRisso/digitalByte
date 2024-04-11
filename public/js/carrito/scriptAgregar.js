
document.addEventListener("DOMContentLoaded", function () {
  //Accion agregar al carrito en detalle
  let btnAgregarCarrito = document.getElementById("btnAgregarCarrito");
  if (btnAgregarCarrito) {
    btnAgregarCarrito.addEventListener("click", function () {

      var productId = this.getAttribute("data-id");
      var cantidad = document.getElementById("cantidadProducto").value
      window.location.href = "/carrito/agregarCarrito?id=" + productId + "&cant=" + cantidad;
    });
  }
  //ingremento en la cantidad en carrito
  let btnCantidadProducto = document.getElementById('cantidadProducto');
  btnCantidadProducto.addEventListener('change', function () {
    var cantidad = parseInt(this.value);
    var stock = parseInt(this.getAttribute("data-id"));

    if (cantidad > stock) {
      document.getElementById('mensajeStock').innerText = 'Sin stock';

    }
  });

  // Extrae el parámetro de la URL en detalle
  const urlParams = new URLSearchParams(window.location.search);
  const added = urlParams.get('added');

  // Si el parámetro 'added' es 'true', muestra una alerta
  if (added === 'true') {
    alert('El producto se agregó al carrito correctamente.');
  }

});