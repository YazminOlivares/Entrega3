const mongoose = require('mongoose');

const enviosModel = new  mongoose.Schema ({

    fechaEnvio: { type: Date, require: true},
    origen: {
        nombre: { type: String, require: true },
        direccion: [{
            calle: { type: String, require: true },
            numero: { type: Number, require: true },
            ciudad: { type: String, require: true },
            codigoPostal: { type: Number, require: true }
        }],
        telefono: { type: Number, require: true },
        email: { type: String, require: true }
    },
    destino: {
        nombre: { type: String, require: true },
        direccion: {
            calle: { type: String, require: true },
            numero: { type: Number, require: true },
            ciudad: { type: String, require: true },
            codigoPostal: { type: Number, require: true }
        },
        telefono: { type: Number, require: true },
        email: { type: String, require: true }
    },
    tipoEnvio: { 
        _id: { type: String, require: true },
        descripcion: { type: String, require: true }, 
        precio: { type: Number, require: true },
        tiempo: { type: String, require: true }
     },
    cliente: {
        CURP: { type: String, require: true },
        nombre: { type: String, require: true },
        apellidos: { type: String, require: true },
        email: { type: String, require: true }
    },
    peso: { type: String, require: true },
    dimensiones: { type: String, require: true },
    total: { type: Number, require: true },
    estatus: { type: String, require: true }

});

module.exports = mongoose.model('envios',enviosModel);