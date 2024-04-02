module.exports = (sequelize, DataTypes) =>{
    
  let alias = 'Usuarios';
  let columns = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100)
    },
    apellido: {
      type: DataTypes.STRING(100)
    },
    email: {
      type: DataTypes.STRING(100)
    },
    nacionalidad: {
      type: DataTypes.STRING(100)
    },
    rol: {
      type: DataTypes.STRING(50)
    },
    contraseña: {
      type: DataTypes.STRING(100)
    },
    direccion: {
      type: DataTypes.STRING(255)
    },
    telefono: {
      type: DataTypes.STRING(20)
    },
    avatar: {
      type: DataTypes.STRING(100)
    },
    estado: {
        type: DataTypes.STRING(1),
        defaultValue: 'A'
    }
  }
  
    let config = {
          tableName: 'usuarios',
          timestamps: false
      }
  

  let Usuario = sequelize.define(alias, columns, config);

  Usuario.associate = function(models){
    Usuario.hasMany(models.Ventas,{
      as: 'Ventas',
      foreignKey: 'ID_Usuario'
    });

    Usuario.hasMany(models.Carritos,{
      as: 'Carrito',
      foreignKey: 'ID_Usuario'
    });

    Usuario.hasMany(models.Productos,{
      as: 'Producto',
      foreignKey: 'ID_Vendedor'
    });
  }

  return Usuario; 
}