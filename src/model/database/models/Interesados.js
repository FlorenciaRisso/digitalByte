module.exports = (sequelize, DataTypes) =>{
    
    let alias = 'Interesados';
    let columns = {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: DataTypes.STRING(50)
      },
      apellido: {
        type: DataTypes.STRING(50)
      },
      email: {
        type: DataTypes.STRING(50)
      },
      telefono: {
        type: DataTypes.STRING(20)
      }
    }
    
      let config = {
            tableName: 'interesados',
            timestamps: false
        }
    
  
    let Interesados = sequelize.define(alias, columns, config);
  
    return Interesados; 
  }