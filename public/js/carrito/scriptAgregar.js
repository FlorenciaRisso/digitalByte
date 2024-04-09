
document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("btnAgregarCarrito").addEventListener("click", function () {
    
    var productId = this.getAttribute("data-id");
    var cantidad=document.getElementById("cantidadProducto").value
    window.location.href = "/carrito/agregarCarrito?id="+productId+"&cant="+cantidad;
  });
  
  
  document.getElementById('cantidadProducto').addEventListener('change', function() {
      var cantidad = parseInt(this.value);
      var stock = parseInt(this.getAttribute("data-id"));

      if (cantidad > stock) {
          document.getElementById('mensajeStock').innerText = 'Sin stock';

      }
  });

});