module.exports = (sequelize, DataTypes) => {
    let alias = 'ImagenProducto';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        producto_id: {
            type: DataTypes.INTEGER
        },
        ruta: {
            type: DataTypes.STRING(255)
        }
    };

    let config = {
        tableName: 'imagenes_producto',
        timestamps: false
    };

    let ImagenProducto = sequelize.define(alias, columns, config);

    return ImagenProducto;
};
