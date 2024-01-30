const categoria = (sequelize, type) => {
    return sequelize.define('categorias', {
        idCategoria: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: type.STRING(20),

        crearCategory:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateCategory: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = categoria