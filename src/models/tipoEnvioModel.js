const mongoose = require('mongoose')

const tipoEnvioModel = new mongoose.Schema ({

    descripcion: { type: String, require: true }, 
    precio: { type: Number, require: true },
    tiempo: { type: String, require: true }

});

module.exports = mongoose.model('tipoEnvio', tipoEnvioModel);