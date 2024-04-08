module.exports = (sequelize, DataTypes) => {
    let alias = 'DetalleCarrito';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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

    DetalleCarrito.associate = function (models) {
        DetalleCarrito.belongsTo(models.Carritos, {
            as: 'Carrito',
            foreignKey: 'ID_Carrito'
        });

        DetalleCarrito.hasMany(models.Productos, {
            as: 'Producto',
            foreignKey: 'ID_Producto'
        });
    }
    return DetalleCarrito;
};
