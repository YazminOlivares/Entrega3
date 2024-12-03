const Envio = require('../models/enviosModel');
const TipoEnvio = require('../models/tipoEnvioModel');

const agregarEnvio = async (req, res) => {
    try {

        const datosEnvio = new Envio(req.body);

        const nuevoEnvio = await datosEnvio.save(); 
        res.status(201).json(nuevoEnvio);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const variosEnvios = async (req, res) => {
    try {
        const envios = req.body; 
        const nuevosEnvios = await Envio.insertMany(envios); 
        res.status(201).json(nuevosEnvios); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const tiposEnvio = async (req, res) => {
    try {
        const tiposEnvio = req.body; 
        const tipos = await TipoEnvio.insertMany(tiposEnvio); 
        res.status(201).json(tipos); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const obtenerOficinas = async (req, res) => {
    try {
        const oficinas = await Envio.aggregate([
            {
              $project: {
                oficinas: [
                  {
                    nombre: "$origen.nombre",
                    direccion: "$origen.direccion",
                    telefono: "$origen.telefono",
                    email: "$origen.email"
                  },
                  {
                    nombre: "$destino.nombre",
                    direccion: "$destino.direccion",
                    telefono: "$destino.telefono",
                    email: "$destino.email"
                  }
                ]
              }
            },
            { $unwind: "$oficinas" },
            {
              $group: {
                _id: {
                  nombre: "$oficinas.nombre",
                  direccion: "$oficinas.direccion" 
                },
                telefono: { $first: "$oficinas.telefono" },
                email: { $first: "$oficinas.email" }
              }
            },
            {
              $project: {
                _id: 0,
                nombre: "$_id.nombre",
                direccion: "$_id.direccion",
                telefono: 1,
                email: 1
              }
            }
          ]);
        
        res.status(200).json(oficinas);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const enviosUnaOficina = async (req, res) => {
    try {
        const nombre = req.params.nombreOficina;
        const oficina = await Envio.find({ "origen.nombre": nombre, "estatus": "En tránsito" });
        res.status(200).json(oficina);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

const porTipoEnvio = async (req, res) => {
    try {
        const nombre = req.params.tipoEnvio;
        const envios = await Envio.find({'tipoEnvio.descripcion': nombre});
        res.status(200).json(envios);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

const enviosCliente = async (req, res) => {
    try {
        const curp = req.params.curp+"";
        const envios = await Envio.find({'cliente.CURP': curp});
        res.status(200).json(envios);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

const clienteOficina = async (req, res) => {
    try {
        const oficina = req.params.oficina;
        const clientes = await Envio.aggregate([
            { $match: { "origen.nombre": oficina } },
            { $group: { _id: "$cliente._id", nombre: { $first: "$cliente.nombre" }, apellidos: { $first: "$cliente.apellidos" } } }
          ]);
        res.status(200).json(clientes);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

const enviosEntregados = async (req, res) => {
    try {
        const envios = await Envio.find({ "estatus": "Entregado" });
        res.status(200).json(envios);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

const clientesEnvioTerrestre = async (req, res) => {
    try {
        const envios = await Envio.find({ "tipoEnvio.descripcion": 'Terrestre' }, { cliente: 1, tipoEnvio: 1 });
        res.status(200).json(envios);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

const enviosExpress = async (req, res) => {
    try {
        const sucursal = req.params.sucursal+"";
        const envios = await Envio.find({ "tipoEnvio.descripcion": "Express", "origen.nombre": sucursal }, 
            { cliente: 1, tipoEnvio: 1 });
        res.status(200).json(envios);
    } catch (error) {
        // En caso de error, enviar un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    agregarEnvio,
    obtenerOficinas,
    enviosUnaOficina,
    porTipoEnvio,
    enviosCliente,
    clienteOficina,
    enviosEntregados,
    clientesEnvioTerrestre,
    enviosExpress,
    variosEnvios,
    tiposEnvio
}