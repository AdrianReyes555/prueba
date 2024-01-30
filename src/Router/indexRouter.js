const express = require('express');
const router = express.Router()

const { mostrar }= require ('../controller/indexController')

router.get('/', mostrar)

module.exports = router