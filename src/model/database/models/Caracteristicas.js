module.exports = (sequelize, DataTypes) => {
    let alias = 'Caracteristica';
    let columns = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        producto_id: {
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
        desbloqueo: {
            type: DataTypes.STRING(50)
        }
    };

    let config = {
        tableName: 'caracteristicas',
        timestamps: false
    };

    let Caracteristica = sequelize.define(alias, columns, config);

    return Caracteristica;
};
