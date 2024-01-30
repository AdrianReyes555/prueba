const crearPlato = (sequelize, type) => {
    return sequelize.define('crearPlatos', {
        idCrearPlato: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING(20),
        description: type.STRING(20),
        price: type.STRING(2),
        
        crearPlato:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatePlato: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = crearPlato