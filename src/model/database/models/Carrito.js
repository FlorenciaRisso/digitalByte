module.exports = (sequelize, DataTypes) => {
    let alias = 'Carritos';
    let columns = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_Usuario: {
            type: DataTypes.INTEGER
        },
        Total:{
            type: DataTypes.DECIMAL(10, 2)
        },
        Fecha_Creacion: {
            type: DataTypes.DATE
        },
        Estado:{
            type:DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'carrito',
        timestamps: false
    };

    let Carrito = sequelize.define(alias, columns, config);

    Carrito.associate = function (models) {
        Carrito.belongsTo(models.Usuarios, {
            as: 'Usuarios',
            foreignKey: 'ID_Usuario'
        });

        Carrito.hasMany(models.DetalleCarrito, {
            as: 'Detalles',
            foreignKey: 'ID_Carrito'
        });
    }
    return Carrito;
};
