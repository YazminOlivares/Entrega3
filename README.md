# ------------------ ESCENARIO DE DATOS -------------------

## tiposEnvio
Es un catálogo donde guardamos todos los tipos de envio que tienen las sucursales. Cada tipo de envío tiene un ID, descripción, precio (costo) y tiempo (cuánto tarda).

```
db.getCollection('tiposEnvio').insertMany([
    { 
        'descripcion': 'Terrestre', 
        'precio': 100,
        'tiempo': "7 días"
    },
    { 
        'descripcion': 'Aéreo', 
        'precio': 88,
        'tiempo': "5"
    },
    { 
        'descripcion': 'Express', 
        'precio': 100,
        'tiempo': "1 día"
    }
]);
```
## envios
Contiene la información completa de cada envío, en esta colección se englobó todo lo que se tendría en varias tablas si esto fuera una base de datos relacional. Se agregan los datos generales del envio, datos completos de la sucursal de origen y la de destino, también se añaden los datos del cliente y se agrega el tipo de envío que estará usando. Union todos estos campos se pretendía que las querys fueran mucho más sencillas y, por tanto, implicará ua menor carga de procesamiento.

```
db.getCollection('envios').insertMany([
    { 
        'FechaEnvío': "2024-11-01",
        'origen': {
        'nombre': 'FedEx',
        'direccion': {
            'calle': 'Miguel Hidalgo', 
            'número': '34', 
            'ciudad': 'Tepic', 
            'codigo postal': '2345'
        }, 
        'telefono': 1234566, 
        'email': 'FedEx@gmail.com'
        }, // FedEx
        'destino': {
        'nombre': 'Estafeta',
        'direccion': {
            'calle': 'Mirasol', 
            'número': '10', 
            'ciudad': 'Puebla', 
            'codigo postal': '9847'
        }, 
        'telefono': 10564893, 
        'email': 'Estafeta@gmail.com' 
        }, // Estafeta
        'tipoEnvio': {
        '_id': ObjectId("67395d0a11f775829f2f4364"),
        'descripcion': 'Terrestre', 
        'precio': 100,
        'tiempo': "7 días"
        }, // Terrestre
        'cliente': {
        'CURP': "HERR880914MDFNNN08",
        'nombre': "Rocío",
        'apellidos': "Herrera Cruz",
        'email': "rocio.herrera@example.com"
        }, // Rocío Herrera Cruz
        'peso': "5kg",
        'dimensiones': "30x20x15cm",
        'total': 500,
        'estatus': "En tránsito"
    },
])
```

# ---------------------  QUERYS  --------------------------

### Q1. Listar los datos de todas las oficinas.
Con el siguiente comando se pretenden agrupar todas las oficinas, tanto de origen como de destino, para posteriormente volver a hacer un filtrado dentro de ellas, el cual nos dará como resultado que estas no se repitan y así poder tener un listado de las oficinas.

    const q1 = db.envios.aggregate([
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

### Q02. Listar los envíos realizados en determinada oficina con estatus en tránsito.

    const q2 = db.envios.find({ "origen.nombre": "Estafeta", "estatus": "En tránsito" });

### Q03. Listar los envíos que utilizan un tipo específico de envío.
    
    const q3 = db.envios.find({'tipoEnvio.descripcion': 'Aéreo'});

### Q04. Listar los envíos realizados por un cliente en específico en todas las oficinas
    
    const q4 = db.envios.find({'cliente.CURP': "HERR880914MDFNNN08"});

### Q05. Listar los clientes que han realizado envíos en una determinada oficina.
Para no mostrar todos los datos que contiene el envio y hacer el listado más legible, hacemos un match a la oficina de la que queremos extraer los datos y luego agrupamos los datos únicamente con los datos que nos interesan.

    const q5 = db.envios.aggregate([
        { $match: { "origen.nombre": "DHL" } },
        { $group: { _id: "$cliente._id", nombre: { $first: "$cliente.nombre" }, apellidos: { $first: "$cliente.apellidos" } } }
    ]);

### Q06. Listar los envíos de todas las oficinas con estatus de entregado.
    
    const q6 = db.envios.find({ "estatus": "Entregado" });

### Q07. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.

    const q7 = db.envios.find({ "tipoEnvio.descripcion":        'Terrestre' }, { cliente: 1, tipoEnvio: 1 });

### Q08. Listar los clientes y sus envíos se han remitido por el servicio express considerando una oficina en específico.

    const q8 = db.envios.find({ "tipoEnvio.descripcion": "Express", "origen.nombre": "FedEx" }, { cliente: 1, tipoEnvio: 1 });

# ----------------  ESTRUCTURA DE LA API  ------------------

Archivo utilizado por Docker para definir el entorno de la aplicación. Contiene instrucciones para:

    - Especificar la imagen base.
    - Instalar dependencias necesarias.
    - Copiar el código fuente al contenedor.
    - Configurar el puerto que se expone.
    - Definir el comando de inicio de la aplicación.

```
    FROM node:latest
    WORKDIR /ENTREGA3
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 3000
    CMD ["npm","start"]

```
## CONFIGURACIONES

En el archivo .env contiene variables de entorno que configuran el entorno de desarrollo o producción:

```
    MONGO_URI=mongodb://mongo01:27017/EscenarioDatos
    # Host del servidor Redis
    # Generalmente es el nombre del servicio definido en docker-compose o la dirección IP
    REDIS_HOST=redis_stack
    # Puerto en el que Redis está escuchando
    REDIS_PORT=6379
    # Puerto en el que nuestra aplicaci'on Node.js escuchará
    PORT=3000
```

## CÓDIGO

##### Configuración de la conexión a la base de datos (db.js)

    const mongoose = require('mongoose'); // Módulo para interactuar con MongoDB
    const redis = require('redis'); // Módulo para interactuar con Redis
    require('dotenv').config(); // Cargar variables de entorno desde un archivo .env
    // Conexión a MongoDB
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Conectado a MongoDB'); // Mensaje de éxito en la conexión
        })
        .catch((error) => {
            console.error('Error al conectar a MongoDB:', error); // Mensaje de error en la
            conexión
        });

    // Configuración de Redis
    const redisClient = redis.createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });

    redisClient.on('error', (err) => {
        console.error('Error en la conexión a Redis:', err); // Mensaje de error en la conexión
    });

    redisClient.connect().then(() => {
        console.log('Conectado a Redis');
    }).catch((err) => {
        console.error('No se pudo conectar a Redis:', err);
    });

    module.exports = { mongoose, redisClient };


##### La API corre en http://localhost:3000. Através del archivo server.js:

    require('dotenv').config(); 
    const express = require('express'); 
    const cors = require('cors'); 
    const morgan = require('morgan'); 
    const logger = require('./middleware/logger'); 
    const { mongoose, redisClient } = require('./config/db'); 

    // Importamos las rutas
    const enviosRoutes = require('./routes/enviosRoutes');

    // Creamos una instancia de la aplicación Express
    const app = express();
    // Middleware para parsear solicitudes JSON
    app.use(express.json());
    // Middleware para permitir solicitudes de recursos cruzados
    app.use(cors());
    // Middleware para registrar solicitudes HTTP
    app.use(morgan('dev'));
    // Middleware personalizado para registrar solicitudes en Redis
    app.use(logger);
    // Usamos las rutas importadas
    app.use('/envios', enviosRoutes);

    // Definimos el puerto en el que la aplicación escuchará las solicitudes
    const PORT = process.env.PORT || 3000;
    // Iniciamos el servidor y lo ponemos a escuchar en el puerto definido
    app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    });

## Modelos

### enviosModel.js:

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

### tiposEnvioModel.js:

    const mongoose = require('mongoose')

    const tipoEnvioModel = new mongoose.Schema ({

        descripcion: { type: String, require: true }, 
        precio: { type: Number, require: true },
        tiempo: { type: String, require: true }

    });

    module.exports = mongoose.model('tipoEnvio', tipoEnvioModel);

## Controladores

### enviosController.js:

    Lógica de las solicitudes relacionadas con envíos. 

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

## Rutas 

#### enviosRoutes.js
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

### Logger con Redis
#### El middleware logger.js en la carpeta rutas/ registra todas las solicitudes HTTP en Redis, almacenando el método, la URL y una marca de tiempo.
```
    module.exports = (req, res, next) => {
        res.on('finish', async () => {

            const key = req.method +":"+ Date.now()+ ":"+ req.originalUrl;
            const valor = JSON.stringify({
                clave: key,
                time: new Date(),
                req: {
                    method: req.method,
                    url: req.originalUrl,
                    headers: req.headers,
                    body: req.body
                },
                res: {
                    statusCode: res.statusCode,
                    statusMessage: res.statusMessage,
                    response: req.method === 'GET' ? res.data : null
                }
            });
            await client.connect();
            await client.set(key, valor);
            await client.disconnect();
        });
        next();
    };
```

# -------------------------  Docker-Compose  -------------------------

En el archivo, se definen servicios (contenedores) y una red que permite la comunicación entre ellos. Cada servicio tiene configuraciones específicas, como puertos, imágenes de Docker y variables de entorno. La red configurada (backend) asegura que los servicios puedan interactuar entre sí sin interferencias externas.

## Servicios

### 1. Redis Stack (redis_stack)
Utiliza la imagen oficial de redis-stack, que es una versión extendida de Redis con funcionalidades avanzadas como un panel web para monitoreo.

Configuración de Puertos:
    - 6379:6379: Expone el puerto estándar de Redis para conexiones de la aplicación.
    - 8001:8001: Habilita el acceso al panel web de Redis Stack desde el navegador.
Red:
Este servicio está conectado a la red backend, lo que permite que otros servicios, como la base de datos MongoDB o la aplicación, interactúen con Redis.

### 2. MongoDB Principal (mongo01)
Este es el nodo principal de un clúster de réplicas de MongoDB. Se utiliza para manejar datos persistentes con alta disponibilidad y tolerancia a fallos.

    - Imagen: mongo:latest, la última versión oficial de MongoDB.
    - Comando: mongod --replSet replica01, configura este nodo como parte del conjunto de réplicas llamado replica01.
    - Puertos:
        27018:27017: El puerto 27017 es el predeterminado de MongoDB dentro del contenedor, pero externamente se accede mediante el puerto 27018.
    - Comprobación de Salud (healthcheck):
        Realiza un chequeo periódico para asegurarse de que el nodo esté funcionando y correctamente configurado como parte del conjunto de réplicas. Si la réplica no está configurada, se inicializa automáticamente con los miembros definidos.
    - Dependencias:
        Este nodo depende del servicio redis_stack, lo que significa que Redis debe estar funcionando antes de que MongoDB se inicie.
    - Red:
        Conectado a la red backend para comunicarse con los otros servicios.

### 3. MongoDB Réplicas Secundarias (mongo-secondary1, mongo-secondary2, mongo-secondary3)
Estos servicios configuran nodos secundarios para el clúster de réplicas replica01. MongoDB utiliza estos nodos secundarios para:

    - Garantizar alta disponibilidad.

    - Permitir lecturas distribuidas en caso de que el nodo principal esté inactivo.

    - Imagen: Igual que el nodo principal (mongo:latest).

    - Comando: También están configurados para el conjunto de réplicas replica01.

    - Puertos: Cada nodo usa un puerto diferente para evitar conflictos:
        27019:27017 para mongo-secondary1.
        27020:27017 para mongo-secondary2.
        27021:27017 para mongo-secondary3.

    - Dependencias:
        Cada nodo depende del nodo anterior y de Redis para asegurarse de que los servicios necesarios ya estén activos antes de iniciarse.

    - Red: Todos están en la red backend.

### 4. Aplicación (app03)
Este servicio representa la aplicación principal, probablemente un servidor Node.js.

    - Build: La aplicación se construye a partir del Dockerfile ubicado en el directorio actual (build: .).
    - Puertos:
        3000:3000: Expone la aplicación en el puerto 3000, permitiendo que los usuarios accedan desde el navegador o clientes HTTP.
    - Dependencias:
        Depende del nodo principal de MongoDB (mongo01) y del servicio Redis (redis_stack).
        Esto asegura que la base de datos y Redis estén disponibles antes de que la aplicación intente conectarse a ellos.
    - Variables de Entorno:
        Estas variables configuran la aplicación para interactuar con MongoDB y Redis:
    - MONGO_URI: URL de conexión al nodo principal de MongoDB.
    - REDIS_HOST y REDIS_PORT: Configuración para conectarse a Redis.
    - PORT: Define el puerto en que la aplicación escuchará.
    - Red: Está conectado a la red backend, lo que permite la comunicación con los demás servicios.

## Código

```
services:
  
  redis_stack:
    image: redis/redis-stack:latest
    ports:
      - "6379:6379"
      - "8001:8001"
    networks:
      - backend

  mongo01:
    image: mongo:latest
    command: mongod --replSet replica01
    ports:
      - "27018:27017"
    healthcheck:
      test: >
        echo "try { rs.status() } catch (err) { 
          rs.initiate({
            _id: 'replica01', 
            members: [
              { _id: 0, host: 'mongo01:27017', priority: 1 },
              { _id: 1, host: 'mongo-secondary1:27017', priority: 0.5 },
              { _id: 2, host: 'mongo-secondary2:27017', priority: 0.5 },
              { _id: 3, host: 'mongo-secondary3:27017', priority: 0.5 }
            ]
          }) 
        }" | mongosh --port 27017 --quiet
      interval: 5s
      timeout: 30s
      start_period: 0s
      retries: 30
    depends_on:
      - redis_stack
    networks:
      - backend

  mongo-secondary1:
    image: mongo:latest
    command: mongod --replSet replica01
    ports:
      - "27019:27017"
    depends_on:
      - mongo01
      - redis_stack
    networks:
      - backend

  mongo-secondary2:
    image: mongo:latest
    command: mongod --replSet replica01
    ports:
      - "27020:27017"
    depends_on:
      - mongo-secondary1
      - redis_stack
    networks:
      - backend

  mongo-secondary3:
    image: mongo:latest
    command: mongod --replSet replica01
    ports:
      - "27021:27017"
    depends_on:
      - mongo-secondary2
      - redis_stack
    networks:
      - backend

  app03:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongo01
      - redis_stack
    environment:
      - MONGO_URI=mongodb://mongo01:27017/paqueteria
      - REDIS_HOST=redis_stack
      - REDIS_PORT=6379
      - PORT=3000
    networks:
      - backend

networks:
  backend:
    driver: bridge

```
# ------------------------  REPOSITORIO  ------------------------
https://github.com/YazminOlivares/Entrega3.git