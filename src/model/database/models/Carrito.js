module.exports = (sequelize, DataTypes) => {
    let alias = 'Carrito';
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

    return Carrito;
};
