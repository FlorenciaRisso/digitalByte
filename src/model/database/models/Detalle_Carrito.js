module.exports = (sequelize, DataTypes) => {
    let alias = 'DetalleCarrito';
    let columns = {
        ID_Detalle: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ID_Carrito: {
            type: DataTypes.INTEGER
        },
        ID_Producto: {
            type: DataTypes.INTEGER
        },
        Cantidad: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'detalle_carrito',
        timestamps: false
    };

    let DetalleCarrito = sequelize.define(alias, columns, config);

    return DetalleCarrito;
};
