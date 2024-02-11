module.exports = (sequelize, DataTypes) => {
    let alias = 'Venta';
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

    return Venta;
};
