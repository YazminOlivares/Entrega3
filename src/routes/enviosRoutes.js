const express = require('express');
var router = express.Router();
const enviosController = require('../controllers/enviosController');

//Añadir un nuevo envio
router.route('/new').post(enviosController.agregarEnvio);

//Añadir varios envios
router.route('/many').post(enviosController.variosEnvios);

//Añadir tipos de envio
router.route('/tipos').post(enviosController.tiposEnvio);

//Q1. Listar los datos de todas las oficinas.
router.route('/q01').get(enviosController.obtenerOficinas);

//Q2. Listar los envíos realizados en determinada oficina con estatus en tránsito.
router.route('/q02/:nombreOficina').get(enviosController.enviosUnaOficina);

//Q3. Listar los envíos que utilizan un tipo específico de envío.
router.route('/q03/:tipoEnvio').get(enviosController.porTipoEnvio);

//Q4. Listar los envíos realizados por un cliente en específico en todas las oficinas
router.route('/q04/:curp').get(enviosController.enviosCliente);

//Q5. Listar los clientes que han realizado envíos en una determinada oficina.
router.route('/q05/:oficina').get(enviosController.clienteOficina);

//Q6. Listar los envíos de todas las oficinas con estatus de entregado.
router.route('/q06').get(enviosController.enviosEntregados);

//Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.
router.route('/q07').get(enviosController.clientesEnvioTerrestre);

//Q8. Listar los clientes y sus envíos se han remitido por el servicio express considerando una oficina en específico.
router.route('/q08/:sucursal').get(enviosController.enviosExpress);

module.exports = router;