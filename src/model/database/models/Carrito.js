module.exports = (sequelize, DataTypes) => {
    let alias = 'Carritos';
    let columns = {
        ID_Carrito: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ID_Usuario: {
            type: DataTypes.INTEGER
        },
        Fecha_Creacion: {
            type: DataTypes.DATE
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

        Carrito.hasMany(models.Productos, {
            as: 'Productos',

            foreignKey: 'ID_Producto'
        });
    }
    return Carrito;
};
