module.exports = (sequelize, DataTypes) => {
    let alias = 'Ventas';
    let columns = {
        ID_Venta: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ID_Usuario: {
            type: DataTypes.INTEGER
        },
        Fecha_Venta: {
            type: DataTypes.DATE
        }
    };

    let config = {
        tableName: 'ventas',
        timestamps: false
    };

    let Venta = sequelize.define(alias, columns, config);

    Venta.associate = function (models) {
        Venta.belongsTo(models.Usuarios, {
            as: 'Usuarios',
            foreignKey: 'ID_Usuario'
        });

        Venta.hasMany(models.DetalleVenta, {
            as: 'ventas',
            foreignKey: 'ID_Detalle_Venta',
            onDelete: 'CASCADE'
        });
    }
    return Venta;
};
