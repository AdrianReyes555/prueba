const pago = (sequelize, type) => {
    return sequelize.define('pagos', {
        idPago: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        datosPersonales: type.STRING(20),
        datosIdentificacion: type.STRING(20),
        datosSeguridad: type.STRING(30),
        estado: type.STRING(10),
        
        crearPago:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatePagos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = pago