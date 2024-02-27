module.exports = (sequelize, DataTypes) => {
    let alias = 'DetalleVenta';
    let columns = {
        id: {
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
    
    DetalleVenta.associate = function (models) {
        DetalleVenta.belongsTo(models.Ventas, {
            as: 'Venta',
            foreignKey: 'ID_Detalle_Venta'
        });
        
        DetalleVenta.hasOne(models.Productos, {
            as: 'Producto',
            foreignKey: 'ID_Producto'
        });

    }
    return DetalleVenta;
};
