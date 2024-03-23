const userService = require("../../data/userService");

let userController = {
  list: async function (req, res) {
    try {
      let users = await userService.getAll();
      res.json(users);
    } catch (error) {
        console.log(error.message)
        res.set('Content-type', 'text/plain')
        res.status(500).send('Error inesperado')
    }
  },
};

module.exports = userController;