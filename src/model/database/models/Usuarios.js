module.exports = (sequelize, DataTypes) =>{
    
  let alias = 'Usuarios';
  let columns = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING(100)
    },
    last_name: {
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
    Direccion: {
      type: DataTypes.STRING(255)
    },
    Telefono: {
      type: DataTypes.STRING(20)
    }
  }
  
    let config = {
          tableName: 'usuarios',
          timestamps: false
      }
  

  let Usuario = sequelize.define(alias, columns, config);

  return Usuario; 
}