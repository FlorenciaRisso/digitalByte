module.exports = (sequelize, DataTypes) => {
    let alias = 'Categorias';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(50)
        }
    };

    let config = {
        tableName: 'categorias',
        timestamps: false
    };

    let Categoria = sequelize.define(alias, columns, config);

    Categoria.associate = function (models) {
        Categoria.hasMany(models.Productos, {
            as: 'Productos',
            foreignKey: 'ID_Categoria'
        })
    }
    return Categoria;
};
