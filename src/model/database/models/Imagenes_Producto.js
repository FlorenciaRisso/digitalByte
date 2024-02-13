module.exports = (sequelize, DataTypes) => {
    let alias = 'ImagenesProductos';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_Producto: {
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

    ImagenProducto.associate = function (models) {
        ImagenProducto.belongsTo(models.Productos,{
            as: 'Productos',
            foreignKey: 'ID_Producto'
        })
    }
    return ImagenProducto;
};
