const registroCtl = {};
const passport = require("passport");
const CryptoJS = require("crypto-js");

const { descifrarDatos } = require("../lib/encrypDates"); // Asume que existe un archivo de ayuda con funciones como descifrarDatos

registroCtl.showregistro = async (req, res) => {
    const gerente = await sql.query('select COUNT(*) AS total from gerentes');
    if (gerente[0].total === 0) {
        res.render("login/registro");
    } else {
        res.redirect('/');
    }
};

registroCtl.registro = passport.authenticate("local.signup", {
    successRedirect: "/login",
    failureRedirect: "/registro",
    failureFlash: true,
});

registroCtl.showLogin = async (req, res) => {
    try {
        const ids = req.params.id;
        const gerente = await sql.query('select * from gerentes where idgerentes = ?', [ids]);
        const gerentename = await descifrarDatos(gerente[0].gerentenamegerente);
        gerente[0].gerentenamegerente = gerentename;
        res.render('login/Login', { gerente });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.redirect('login/login');
    }
};
//login
registroCtl.login = passport.authenticate("local.signin", {
    successRedirect: "/generalList/",
    failureRedirect: "/login",
    failureFlash: true,
});

registroCtl.showProfile = async (req, res) => {
    try {
        const id = req.gerente.idgerente;
        const list = await sql.query("select * from datosCompletos where idgerente = ?", [id]);

        // Desglosar la lógica de desencriptación
        const decryptedList = await decryptgerenteData(list[0]);

        res.render("login/perfil", { list: decryptedList });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.redirect('/login');
    }
};

/////////////
registroCtl.login = (req, res, next) => {
    req.login(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Cerrada la Sesión con éxito.");
        res.redirect("/login");
    });
};

module.exports = registroCtl;
