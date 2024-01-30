const subCategoria = (sequelize, type) => {
    return sequelize.define('subCategorias', {
        idSubCategoria: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nameSubCategory: type.STRING(20),
        price: type.STRING(20),
        
        crearSubCategoria:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateSubCategoria: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = subCategoria