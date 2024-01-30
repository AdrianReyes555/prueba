const express = require('express');
const router = express.Router()

const {mostrar} = require('../controller/dashboardController')

router.get('/listar', mostrar)

module.exports = router