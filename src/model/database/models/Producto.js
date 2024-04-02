module.exports = (sequelize, DataTypes) => {

    let alias = 'Productos';
    let columns = {
        ID_Producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(100)
        },
        Descripcion: {
            type: DataTypes.TEXT
        },
        Precio: {
            type: DataTypes.DECIMAL(10, 2)
        },
        Stock: {
            type: DataTypes.INTEGER
        },
        ID_Categoria: {
            type: DataTypes.INTEGER
        },
        Marca: {
            type: DataTypes.STRING(50)
        },
        Descuento: {
            type: DataTypes.DECIMAL(10, 2)
        },
        ID_Vendedor: {
            type: DataTypes.INTEGER(11)
        },
        Estado: {
            type: DataTypes.STRING(1),
            defaultValue: 'A'
        }

    }
    let config = {
        tableName: 'productos',
        timestamps: false
    }

    let Producto = sequelize.define(alias, columns, config);

    Producto.associate = function (models) {
        Producto.belongsToMany(models.Carritos, {
            as: 'Carrito',
            through: 'DetalleCarrito',
            foreignKey: 'ID_Vendedor',
            otherKey: 'ID_Carrito'
        });
        Producto.belongsTo(models.Categorias, {
            as: 'Categoria',
            foreignKey: 'ID_Categoria'
        });
        Producto.belongsTo(models.Usuarios, {
            as: 'Usuario',
            foreignKey: 'ID_Vendedor'
        });
        Producto.hasOne(models.Caracteristicas, {
            as: 'Caracteristica',
            foreignKey: 'ID_Producto',
            onDelete: 'CASCADE'
        });
        Producto.hasMany(models.ImagenesProductos, {
            as: 'ImagenesProductos',
            foreignKey: 'ID_Producto',
            onDelete:'CASCADE'
        })
    }
    return Producto;
}