const carro = (sequelize, type) => {
    return sequelize.define('carros', {
        idCarros: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        limitaciones: type.STRING(20),
        estado: type.STRING(10),
        
        crearCarro:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateCarro: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = carro