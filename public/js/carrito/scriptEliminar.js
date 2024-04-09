window.addEventListener("load", function () {
    const inputsCantidad = document.querySelectorAll('.input-cantidad');
    const deleteButtons = document.querySelectorAll('.btn-trash');

    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('.detalle-producto');
            const id = row.dataset.id;

            fetch(`/carrito/eliminarDetalleCarrito?id=${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        row.remove();
                        location.reload();
                    } else {
                        console.error('Error al eliminar el detalle del carrito');
                    }
                })
                .catch(error => console.error('Error al enviar la solicitud:', error));
        });
    });


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
});