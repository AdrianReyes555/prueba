const { Sequelize, HasMany } = require("sequelize");
const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI } = require("../keys");

let sequelize;

// Usar URI de conexión si está disponible
if (MYSQL_URI) {
    sequelize = new Sequelize(MYSQL_URI);
} else {
    // Configuración para parámetros individuales
    sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
        host: MYSQLHOST,
        port: MYSQLPORT,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 1,
            acquire: 30000,
            idle: 10000
        }
    });
}

// Autenticar y sincronizar
sequelize.authenticate()
    .then(() => {
        console.log("Conexión establecida con la base de datos");
    })
    .catch((err) => {
        console.error("No se pudo conectar a la base de datos:", err.message);
    });

sequelize.sync({ force: false })
    .then(() => {
        console.log("Tablas sincronizadas");
    })
    .catch((err) => {
        console.error("Error al sincronizar las tablas:", err.message);
    });

//!sincronia

const gerenteModel = require('../models/gerenteModel')
const restauranteModel = require('../models/restauranteModel')
const menuModel = require('../models/menuModel')
const crearPlatoModel = require('../models/crearPlatoModel')
const categoriaModel = require('../models/categoriaModel')
const subCategoriaModel = require('../models/subCategoriaModel')
const carroModel = require('../models/carroModel')
const pagosModel = require('../models/pagosModel')

const gerente = gerenteModel(sequelize, Sequelize)
const restaurante = restauranteModel(sequelize, Sequelize)
const menu = menuModel(sequelize, Sequelize)
const plato = crearPlatoModel(sequelize, Sequelize)
const categoria = categoriaModel(sequelize, Sequelize)
const subCategoria = subCategoriaModel(sequelize, Sequelize)
const carro = carroModel(sequelize, Sequelize)
const pagos = pagosModel(sequelize, Sequelize)

//!Relaciones

gerente.hasMany(restaurante)
restaurante.belongsTo(gerente)

restaurante.hasMany(menu)
menu.belongsTo(restaurante)

menu.hasMany(plato)
plato.belongsTo(menu)

plato.hasMany(categoria)
categoria.belongsTo(plato)

categoria.hasMany(subCategoria)
subCategoria.belongsTo(categoria)

menu.hasMany(carro)
carro.belongsTo(menu)

carro.hasMany(pagos)
pagos.belongsTo(carro)


// Exportar el objeto sequelize
module.exports = {
gerente,
restaurante,
menu,
plato,
categoria,
subCategoria,
carro,
pagos
};