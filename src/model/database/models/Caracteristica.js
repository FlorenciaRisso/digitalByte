module.exports = (sequelize, DataTypes) => {
    let alias = 'Caracteristicas';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ID_Producto: {
            type: DataTypes.INTEGER
        },
        tamaño: {
            type: DataTypes.STRING(50)
        },
        memoria: {
            type: DataTypes.STRING(50)
        },
        camara: {
            type: DataTypes.STRING(50)
        },
        ram: {
            type: DataTypes.STRING(50)
        }
    };

    let config = {
        tableName: 'caracteristicas',
        timestamps: false
    };

    let Caracteristica = sequelize.define(alias, columns, config);

    Caracteristica.associate = function (models) {
        Caracteristica.belongsTo(models.Productos,{
            as: 'Productos',
            foreignKey: 'ID_Producto'
        })
    }

    return Caracteristica;
};
