const restaurante = {}
const path = require('path')

const orm = require('../Database/dataBase.orm')
const sql = require('../Database/dataBase.sql')

restaurante.show = (req, res) => {
    res.render('restaurante/listar');
}
restaurante.sendCarsadd = async (req, res) => {
    const id = req.user.idUsers
    const { idRestaurante, nombreRestaurante, imagenRestaurante} = req.body
    const newSend = {
        nombreRestaurante,
        imagenRestaurante,

        userIdUsers: id
    }
    await orm.platform.create(newSend)

    const imageRestaurante = req.files.imageCars;
    const validacion = path.extname(imageRestaurante.name);
    const extencion = [".PNG", ".JPG", ".JPEG", ".GIF", ".TIF", ".png", ".jpg", ".jpeg", ".gif", ".tif"];

    if (!extencion.includes(validacion)) {
        req.flash("success", "Imagen no compatible.");
    }

    if (!req.files) {
        req.flash("success", "Imagen no insertada.");
    }

    const ubicacion = __dirname + "/../public/img/restaurante/" + imageRestaurante.name;

    imageRestaurante.mv(ubicacion, function (err) {
        if (err) {
            return req.flash("message", err);
        }
        sql.query("UPDATE restaurante SET imagenRestaurante = ? WHERE idRestaurantes = ?", [
            imageRestaurante.name,
            idUsers,
        ]);
        console.log("Imagen de usuario ingresada");
    });
    res.redirect('/restaurante/listar/' + id);
}

restaurante.traerRestaurante = async (req, res) => {
    const id = req.params.id
    const list = await sql.query('select * from restaurante where idRestaurante = ?', [id])
    res.render('/restaurante/listar/', { list })
}

restaurante.updateRestaurante = async (req, res) => {
    const id = req.user.idUsers
    const { idRestaurante, nombreRestaurante, imagenRestaurante} = req.body
    const newSend = {
        nombreRestaurante,
        imagenRestaurante,

        userIdUsers: id
    }
    const imageRestaurante = req.files.imageRestaurante;
    const validacion = path.extname(imageRestaurante.name);
    const extencion = [".PNG", ".JPG", ".JPEG", ".GIF", ".TIF", ".png", ".jpg", ".jpeg", ".gif", ".tif"];

    if (!extencion.includes(validacion)) {
        req.flash("success", "Imagen no compatible.");
    }

    if (!req.files) {
        req.flash("success", "Imagen no insertada.");
    }

    const ubicacion = __dirname + "/../public/img/restaurante/" + imagenRestaurante.name;

    imagenRestaurante.mv(ubicacion, function (err) {
        if (err) {
            return req.flash("message", err);
        }
        sql.query("UPDATE restaurantes SET imageRestaurantes = ? WHERE idRestaurantes = ?", [
            imagenUsuario.name,
            idCarro,
        ]);
        console.log("Imagen de usuario ingresada");
    });
    res.redirect('/restaurante/listar/' + id);
}

module.exports = restaurante