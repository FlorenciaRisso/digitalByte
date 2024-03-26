const apiUserService = require("../../data/api/API-userService");

let userController = {
  list: async (req, res) => {
    try {
      const users = await apiUserService.getAll();

      const count = users.length;

      const userList = users.map(user => ({
        id: user.id,
        name: `${user.nombre} ${user.apellido}`,
        email: user.email,
        detail: `/api/users/${user.id}`
      }));

      res.json({
        count: count,
        users: userList
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