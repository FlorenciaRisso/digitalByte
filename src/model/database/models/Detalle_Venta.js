module.exports = (sequelize, DataTypes) => {
    let alias = 'DetalleVenta';
    let columns = {
        ID_Detalle_Venta: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ID_Venta: {
            type: DataTypes.INTEGER
        },
        ID_Producto: {
            type: DataTypes.INTEGER
        },
        Cantidad: {
            type: DataTypes.INTEGER
        },
        Precio_Unitario: {
            type: DataTypes.DECIMAL(10, 2)
        }
    };

    let config = {
        tableName: 'detalle_venta',
        timestamps: false
    };

    let DetalleVenta = sequelize.define(alias, columns, config);

    return DetalleVenta;
};
