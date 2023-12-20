let funciones={
    getPrecioFormateado:function(precio){
        let resultado = Math.floor(precio).toLocaleString('es-ES'); // Formato de miles con punto
        let decimales = (precio % 1).toFixed(2).substring(1).replace('.', ','); // Formato de decimales
        let precioFormateado = resultado + decimales;
        return precioFormateado;
    }
}
module.exports=funciones;