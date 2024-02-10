module.exports = (sequelize, DataTypes) =>{
    
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
        Categoria_id: {
            type: DataTypes.INTEGER
        },
        Marca: {
            type: DataTypes.STRING(50)
        },
        Descuento: {
            type: DataTypes.DECIMAL(10, 2)
        }

    }
    let config = {
        tableName: 'productos',
        timestamps: false
    }

    let Producto = sequelize.define(alias, columns, config);

    return Producto; 
}