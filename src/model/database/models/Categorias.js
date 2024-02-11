module.exports = (sequelize, DataTypes) => {
    let alias = 'Categoria';
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

    return Categoria;
};
