const apiUserService = require("../../data/api/API-userService");

let userController = {
  
  list: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;
      let userList = await apiUserService.getAllWithPagination(limit, offset);
  
      let siguienteUrl = null;
      let anteriorUrl = null;
      const count = await apiUserService.getCount();
      const totalPages = Math.ceil(count / limit);
  
      if (page < totalPages) {
        siguienteUrl = `${page + 1}`;
      }
      if (page > 1) {
        anteriorUrl = `${page - 1}`;
      }

      userList = userList.map(user => ({
        id: user.id,
        name: `${user.nombre} ${user.apellido}`,
        email: user.email,
        detail: `/api/users/${user.id}`,
        imagen:user.avatar
      }));

      res.json({
        count: count,
        users:userList,
        next: siguienteUrl,
        previous: anteriorUrl
      });
  
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error inesperado' });
    }
  },

  detail: async (req, res) => {
    try {
      const user = await apiUserService.getOne(req.params.id);

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const userDetails = {};

      userDetails.id = user.id;
      userDetails.nombre = user.nombre;
      userDetails.apellido = user.apellido;
      userDetails.email = user.email;
      userDetails.nacionalidad = user.nacionalidad;
      userDetails.rol = user.rol;
      userDetails.direccion = user.direccion;
      userDetails.telefono = user.telefono;

      userDetails.avatarURL = user.avatar;

      res.json(userDetails);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: 'Error inesperado' });
    }
  }

};

module.exports = userController;