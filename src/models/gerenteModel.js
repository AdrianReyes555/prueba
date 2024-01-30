const gerente = (sequelize, type) => {
    return sequelize.define('gerentes', {
        idGerente: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: type.STRING(20),
        user: type.STRING(20),
        email: type.STRING(100),
        password: type.STRING(20),
        
        crearGerente:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateGerente: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = gerente