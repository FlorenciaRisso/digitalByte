const db = require('../model/database/models');
const interesadoService = {

    save: async function (req) {
        try {
            let existe = await db.Interesados.findOne({ where: { email: req.body.email } });
            let resultado=[];
            if (!existe) {
                resultado=await db.Interesados.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    telefono: req.body.telefono
                });
            }
            return resultado;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = interesadoService;