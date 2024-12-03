/* Select the database to use.
use('EscenarioDatos');

// Insertar documentos dentro de la colección de oficinas
db.getCollection('oficinas').insertMany([
  { 
    'Nombre': 'FedEx', 
    'direccion': {
      'calle': 'Miguel Hidalgo', 
      'número': '34', 
      'ciudad': 'Tepic', 
      'codigo postal': '2345'
    }, 
    'telefono': 1234566, 
    'email': 'FedEx@gmail.com'
  },
  { 
    'Nombre': 'DHL', 
    'direccion': {
      'calle': 'Colombia', 
      'número': '367', 
      'ciudad': 'Guadalajara', 
      'codigo postal': '4578'
    }, 
    'telefono': 9875443, 
    'email': 'DHL@gmail.com'
  },
  { 
    'Nombre': 'Estafeta', 
    'direccion': {
      'calle': 'Mirasol', 
      'número': '10', 
      'ciudad': 'Puebla', 
      'codigo postal': '9847'
    }, 
    'telefono': 10564893, 
    'email': 'Estafeta@gmail.com' 
  },
]);

db.getCollection('clientes').insertMany([
  { 
    'CURP': "CABC850101HDFNNL09",
    'nombre': "Carlos",
    'apellidos': "Bermúdez Castillo",
    'email': "carlos.bermudez@example.com"
  },
  { 
    'CURP': "GOMM930215MDFNNR10",
    'nombre': "Mariana",
    'apellidos': "Gómez Martínez",
    'email': "mariana.gomez@example.com"
  },
  { 
    'CURP': "PERE801005HDFNNL01",
    'nombre': "Ricardo",
    'apellidos': "Pérez Estrada",
    'email': "ricardo.perez@example.com"
  },
  { 
    'CURP': "TORF900123MDFNNN02",
    'nombre': "Fernanda",
    'apellidos': "Torres Fernández",
    'email': "fernanda.torres@example.com"
  },
  { 
    'CURP': "LOPE860430HDFNLL03",
    'nombre': "Luis",
    'apellidos': "López Esquivel",
    'email': "luis.lopez@example.com"
  },
  { 
    'CURP': "RAMC940721MDFNRL04",
    'nombre': "Claudia",
    'apellidos': "Ramírez Campos",
    'email': "claudia.ramirez@example.com"
  },
  { 
    'CURP': "MENJ870812HDFNNR05",
    'nombre': "Jorge",
    'apellidos': "Mendoza Juárez",
    'email': "jorge.mendoza@example.com"
  },
  { 
    'CURP': "SALV950318MDFNNN06",
    'nombre': "Valeria",
    'apellidos': "Salinas Vargas",
    'email': "valeria.salinas@example.com"
  },
  { 
    'CURP': "GARC830625HDFNNN07",
    'nombre': "Gabriel",
    'apellidos': "García Rodríguez",
    'email': "gabriel.garcia@example.com"
  },
  { 
    'CURP': "HERR880914MDFNNN08",
    'nombre': "Rocío",
    'apellidos': "Herrera Cruz",
    'email': "rocio.herrera@example.com"
  },
]); */

use('EscenarioDatos');

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
  { 
    'FechaEnvío': "2024-11-02",
    'origen': {
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'destino': {
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
    'tipoEnvio': {
      '_id': ObjectId("67395d0a11f775829f2f4365"),
      'descripcion': 'Aéreo', 
      'precio': 88,
      'tiempo': "5"
    }, // Aéreo
    'cliente': {
      'CURP': "GARC830625HDFNNN07",
      'nombre': "Gabriel",
      'apellidos': "García Rodríguez",
      'email': "gabriel.garcia@example.com"
    }, // Gabriel García Rodríguez
    'peso': "3kg",
    'dimensiones': "25x15x10cm",
    'total': 350,
    'estatus': "Pendiente"
  },
  { 
    'FechaEnvío': "2024-11-03",
    'origen': {
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
    'destino': {
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'tipoEnvio': {
      '_id': ObjectId("67395d0a11f775829f2f4366"),
      'descripcion': 'Express', 
      'precio': 100,
      'tiempo': "1 día"
    }, // Express
    'cliente': {
      'CURP': "HERR880914MDFNNN08",
      'nombre': "Rocío",
      'apellidos': "Herrera Cruz",
      'email': "rocio.herrera@example.com"
    }, // Rocío Herrera Cruz
    'peso': "8kg",
    'dimensiones': "40x30x25cm",
    'total': 900,
    'estatus': "Entregado"
  },
  { 
    'FechaEnvío': "2024-11-04",
    'origen': {
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'destino': {
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
    'tipoEnvio': {
      '_id': ObjectId("67395d0a11f775829f2f4364"),
      'descripcion': 'Terrestre', 
      'precio': 100,
      'tiempo': "7 días"
    }, // Terrestre
    'cliente': {
      'CURP': "GARC830625HDFNNN07",
      'nombre': "Gabriel",
      'apellidos': "García Rodríguez",
      'email': "gabriel.garcia@example.com"
    }, // Gabriel García Rodríguez
    'peso': "6kg",
    'dimensiones': "35x25x15cm",
    'total': 700,
    'estatus': "En tránsito"
  },
  { 
    'FechaEnvío': "2024-11-05",
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
    'tipoEnvio':  {
      '_id': ObjectId("67395d0a11f775829f2f4365"),
      'descripcion': 'Aéreo', 
      'precio': 88,
      'tiempo': "5"
    }, // Aéreo
    'cliente': {
      'CURP': "SALV950318MDFNNN06",
      'nombre': "Valeria",
      'apellidos': "Salinas Vargas",
      'email': "valeria.salinas@example.com"
    }, // Valeria Salinas Vargas
    'peso': "10kg",
    'dimensiones': "50x40x30cm",
    'total': 1200,
    'estatus': "Pendiente"
  },
  { 
    'FechaEnvío': "2024-11-06",
    'origen': {
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
    'destino': {
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'tipoEnvio': {
      '_id': ObjectId("67395d0a11f775829f2f4366"),
      'descripcion': 'Express', 
      'precio': 100,
      'tiempo': "1 día"
    }, // Express
    'cliente': {
      'CURP': "MENJ870812HDFNNR05",
      'nombre': "Jorge",
      'apellidos': "Mendoza Juárez",
      'email': "jorge.mendoza@example.com"
    }, // Jorge Mendoza Juarez 
    'peso': "15kg",
    'dimensiones': "70x50x40cm",
    'total': 1500,
    'estatus': "Entregado"
  },
  { 
    'FechaEnvío': "2024-11-07",
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
      'CURP': "RAMC940721MDFNRL04",
      'nombre': "Claudia",
      'apellidos': "Ramírez Campos",
      'email': "claudia.ramirez@example.com"
    }, // Claudia Ramirez Juarez
    'peso': "7kg",
    'dimensiones': "35x25x20cm",
    'total': 750,
    'estatus': "En tránsito"
  },
  { 
    'FechaEnvío': "2024-11-08",
    'origen': {
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'destino': {
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
    'tipoEnvio':  {
      '_id': ObjectId("67395d0a11f775829f2f4365"),
      'descripcion': 'Aéreo', 
      'precio': 88,
      'tiempo': "5"
    }, // Aéreo
    'cliente': {
      'CURP': "LOPE860430HDFNLL03",
      'nombre': "Luis",
      'apellidos': "López Esquivel",
      'email': "luis.lopez@example.com"
    }, // Luis Lopez Esquivel
    'peso': "4kg",
    'dimensiones': "30x20x10cm",
    'total': 400,
    'estatus': "Pendiente"
  },
  { 
    'FechaEnvío': "2024-11-09",
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
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'tipoEnvio': {
      '_id': ObjectId("67395d0a11f775829f2f4366"),
      'descripcion': 'Express', 
      'precio': 100,
      'tiempo': "1 día"
    }, // Express
    'cliente': {
      'CURP': "HERR880914MDFNNN08",
      'nombre': "Rocío",
      'apellidos': "Herrera Cruz",
      'email': "rocio.herrera@example.com"
    }, // Rocío Herrera Cruz
    'peso': "6kg",
    'dimensiones': "40x30x20cm",
    'total': 900,
    'estatus': "Entregado"
  },
  { 
    'FechaEnvío': "2024-11-10",
    'origen': {
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
    'destino': {
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'tipoEnvio': {
      '_id': ObjectId("67395d0a11f775829f2f4364"),
      'descripcion': 'Terrestre', 
      'precio': 100,
      'tiempo': "7 días"
    }, // Terrestre
    'cliente': {
      'CURP': "TORF900123MDFNNN02",
      'nombre': "Fernanda",
      'apellidos': "Torres Fernández",
      'email': "fernanda.torres@example.com"
    }, // Fernanda Torres Fernandez
    'peso': "8kg",
    'dimensiones': "60x40x30cm",
    'total': 800,
    'estatus': "En tránsito"
  },
  { 
    'FechaEnvío': "2024-11-11",
    'origen': {
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
    'destino': {
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
    'tipoEnvio':  {
      '_id': ObjectId("67395d0a11f775829f2f4365"),
      'descripcion': 'Aéreo', 
      'precio': 88,
      'tiempo': "5"
    }, // Aéreo
    'cliente': {
      'CURP': "PERE801005HDFNNL01",
      'nombre': "Ricardo",
      'apellidos': "Pérez Estrada",
      'email': "ricardo.perez@example.com"
    }, // Ricardo Perez Estrada 
    'peso': "12kg",
    'dimensiones': "45x35x25cm",
    'total': 1100,
    'estatus': "Pendiente"
  },
  { 
    'FechaEnvío': "2024-11-12",
    'origen': {
      'nombre': 'DHL',
        'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
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
      '_id': ObjectId("67395d0a11f775829f2f4366"),
      'descripcion': 'Express', 
      'precio': 100,
      'tiempo': "1 día"
    }, // Express
    'cliente': {
      'CURP': "HERR880914MDFNNN08",
      'nombre': "Rocío",
      'apellidos': "Herrera Cruz",
      'email': "rocio.herrera@example.com"
    }, // Rocío Herrera Cruz
    'peso': "5kg",
    'dimensiones': "35x25x15cm",
    'total': 700,
    'estatus': "En tránsito"
  },
  { 
    'FechaEnvío': "2024-11-13",
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
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'tipoEnvio': {
      '_id': ObjectId("67395d0a11f775829f2f4364"),
      'descripcion': 'Terrestre', 
      'precio': 100,
      'tiempo': "7 días"
    }, // Terrestre
    'cliente': {
      'CURP': "GOMM930215MDFNNR10",
      'nombre': "Mariana",
      'apellidos': "Gómez Martínez",
      'email': "mariana.gomez@example.com"
    }, // Mariana Gomez Martinez
    'peso': "9kg",
    'dimensiones': "50x40x30cm",
    'total': 950,
    'estatus': "Entregado"
  },
  { 
    'FechaEnvío': "2024-11-14",
    'origen': {
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
    'destino': {
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
    'tipoEnvio':  {
      '_id': ObjectId("67395d0a11f775829f2f4365"),
      'descripcion': 'Aéreo', 
      'precio': 88,
      'tiempo': "5"
    }, // Aéreo
    'cliente': {
      'CURP': "CABC850101HDFNNL09",
      'nombre': "Carlos",
      'apellidos': "Bermúdez Castillo",
      'email': "carlos.bermudez@example.com"
    }, // Carlos Bermudez Castillo
    'peso': "6kg",
    'dimensiones': "40x30x20cm",
    'total': 600,
    'estatus': "Pendiente"
  },
  { 
    'FechaEnvío': "2024-11-15",
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
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'tipoEnvio': {
      '_id': ObjectId("67395d0a11f775829f2f4366"),
      'descripcion': 'Express', 
      'precio': 100,
      'tiempo': "1 día"
    }, // Express
    'cliente': {
      'CURP': "CABC850101HDFNNL09",
      'nombre': "Carlos",
      'apellidos': "Bermúdez Castillo",
      'email': "carlos.bermudez@example.com"
    }, // Carlos Bermudez Castillo
    'peso': "4kg",
    'dimensiones': "30x25x15cm",
    'total': 550,
    'estatus': "En tránsito"
  },
  { 
    'FechaEnvío': "2024-11-16",
    'origen': {
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
    'destino': {
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
    'tipoEnvio':  {
      '_id': ObjectId("67395d0a11f775829f2f4365"),
      'descripcion': 'Aéreo', 
      'precio': 88,
      'tiempo': "5"
    }, // Aéreo
    'cliente':  {
      'CURP': "GOMM930215MDFNNR10",
      'nombre': "Mariana",
      'apellidos': "Gómez Martínez",
      'email': "mariana.gomez@example.com"
    }, // Mariana Gomez Martinez
    'peso': "3kg",
    'dimensiones': "25x20x10cm",
    'total': 300,
    'estatus': "Pendiente"
  },
  { 
    'FechaEnvío': "2024-11-17",
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
      'CURP': "PERE801005HDFNNL01",
      'nombre': "Ricardo",
      'apellidos': "Pérez Estrada",
      'email': "ricardo.perez@example.com"
    }, // Ricardo Perez Estrada
    'peso': "10kg",
    'dimensiones': "60x50x40cm",
    'total': 1000,
    'estatus': "Entregado"
  },
  { 
    'FechaEnvío': "2024-11-18",
    'origen': {
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
    'destino': {
      'nombre': 'DHL',
      'direccion': {
        'calle': 'Colombia', 
        'número': '367', 
        'ciudad': 'Guadalajara', 
        'codigo postal': '4578'
      }, 
      'telefono': 9875443, 
      'email': 'DHL@gmail.com'
    }, // DHL
    'tipoEnvio':  {
      '_id': ObjectId("67395d0a11f775829f2f4366"),
      'descripcion': 'Express', 
      'precio': 100,
      'tiempo': "1 día"
    }, // Express
    'cliente': {
      'CURP': "TORF900123MDFNNN02",
      'nombre': "Fernanda",
      'apellidos': "Torres Fernández",
      'email': "fernanda.torres@example.com"
    }, // Fernanda Torres Fernandez
    'peso': "7kg",
    'dimensiones': "45x35x25cm",
    'total': 800,
    'estatus': "En tránsito"
  }
]);

//Q1. Listar los datos de todas las oficinas.
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
        direccion: "$oficinas.direccion" // Dirección como identificador único
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

console.log(q1);

// Q2. Listar los envíos realizados en determinada oficina con estatus en tránsito.
const q2 = db.envios.find({ "origen.nombre": "Estafeta", "estatus": "En tránsito" });
console.log(q2);

//Listar los envíos que utilizan un tipo específico de envío.
const q3 = db.envios.find({'tipoEnvio.descripcion': 'Aéreo'});
console.log(q3);

//Q4. Listar los envíos realizados por un cliente en específico en todas las oficinas
const q4 = db.envios.find({'cliente.CURP': "HERR880914MDFNNN08"});
console.log(q4);

// Q5. Listar los clientes que han realizado envíos en una determinada oficina.
const q5 = db.envios.aggregate([
  { $match: { "origen.nombre": "DHL" } },
  { $group: { _id: "$cliente._id", nombre: { $first: "$cliente.nombre" }, apellidos: { $first: "$cliente.apellidos" } } }
]);

console.log(q5);

// Q6. Listar los envíos de todas las oficinas con estatus de entregado.
const q6 = db.envios.find({ "estatus": "Entregado" });
console.log(q6);

// Q7. Listar los clientes y sus envíos que se han remitido por el servicio terrestre considerando todas las oficinas.
const q7 = db.envios.find({ "tipoEnvio.descripcion": 'Terrestre' }, { cliente: 1, tipoEnvio: 1 });
console.log(q7);

//Q8. Listar los clientes y sus envíos se han remitido por el servicio express considerando una oficina en específico.
const q8 = db.envios.find({ "tipoEnvio.descripcion": "Express", "origen.nombre": "FedEx" }, { cliente: 1, tipoEnvio: 1 });
console.log(q8);


/*
[
  { 
    "_id": "67395d0a11f775829f2f4364",
    "descripcion": "Terrestre", 
    "precio": 100,
    "tiempo": "7 días"
  },
  { 
    "_id": "67395d0a11f775829f2f4365",
    "descripcion": "Aéreo", 
    "precio": 88,
    "tiempo": "5"
  },
  { 
    "_id": "67395d0a11f775829f2f4366",
    "descripcion": "Express", 
    "precio": 100,
    "tiempo": "1 día"
  }
]

[
  { 
    "FechaEnvío": "2024-11-01",
    "origen": {
      "nombre": "FedEx",
      "direccion": {
        "calle": "Miguel Hidalgo", 
        "número": "34", 
        "ciudad": "Tepic", 
        "codigo postal": "2345"
      }, 
      "telefono": 1234566, 
      "email": "FedEx@gmail.com"
    },
    "destino": {
      "nombre": "Estafeta",
      "direccion": {
        "calle": "Mirasol", 
        "número": "10", 
        "ciudad": "Puebla", 
        "codigo postal": "9847"
      }, 
      "telefono": 10564893, 
      "email": "Estafeta@gmail.com" 
    },
    "tipoEnvio": {
      "_id": "67395d0a11f775829f2f4364",
      "descripcion": "Terrestre", 
      "precio": 100,
      "tiempo": "7 días"
    },
    "cliente": {
      "CURP": "HERR880914MDFNNN08",
      "nombre": "Rocío",
      "apellidos": "Herrera Cruz",
      "email": "rocio.herrera@example.com"
    },
    "peso": "5kg",
    "dimensiones": "30x20x15cm",
    "total": 500,
    "estatus": "En tránsito"
  },
  { 
    "FechaEnvío": "2024-11-02",
    "origen": {
      "nombre": "DHL",
      "direccion": {
        "calle": "Colombia", 
        "número": "367", 
        "ciudad": "Guadalajara", 
        "codigo postal": "4578"
      }, 
      "telefono": 9875443, 
      "email": "DHL@gmail.com"
    },
    "destino": {
      "nombre": "FedEx",
      "direccion": {
        "calle": "Miguel Hidalgo", 
        "número": "34", 
        "ciudad": "Tepic", 
        "codigo postal": "2345"
      }, 
      "telefono": 1234566, 
      "email": "FedEx@gmail.com"
    },
    "tipoEnvio": {
      "_id": "67395d0a11f775829f2f4365",
      "descripcion": "Aéreo", 
      "precio": 88,
      "tiempo": "5"
    },
    "cliente": {
      "CURP": "GARC830625HDFNNN07",
      "nombre": "Gabriel",
      "apellidos": "García Rodríguez",
      "email": "gabriel.garcia@example.com"
    },
    "peso": "3kg",
    "dimensiones": "25x15x10cm",
    "total": 350,
    "estatus": "Pendiente"
  },
  { 
    "FechaEnvío": "2024-11-03",
    "origen": {
      "nombre": "Estafeta",
      "direccion": {
        "calle": "Mirasol", 
        "número": "10", 
        "ciudad": "Puebla", 
        "codigo postal": "9847"
      }, 
      "telefono": 10564893, 
      "email": "Estafeta@gmail.com"
    },
    "destino": {
      "nombre": "DHL",
      "direccion": {
        "calle": "Colombia", 
        "número": "367", 
        "ciudad": "Guadalajara", 
        "codigo postal": "4578"
      }, 
      "telefono": 9875443, 
      "email": "DHL@gmail.com"
    },
    "tipoEnvio": {
      "_id": "67395d0a11f775829f2f4366",
      "descripcion": "Express", 
      "precio": 100,
      "tiempo": "1 día"
    },
    "cliente": {
      "CURP": "HERR880914MDFNNN08",
      "nombre": "Rocío",
      "apellidos": "Herrera Cruz",
      "email": "rocio.herrera@example.com"
    },
    "peso": "8kg",
    "dimensiones": "40x30x25cm",
    "total": 900,
    "estatus": "Entregado"
  },
  { 
    "FechaEnvío": "2024-11-04",
    "origen": {
      "nombre": "DHL",
      "direccion": {
        "calle": "Colombia", 
        "número": "367", 
        "ciudad": "Guadalajara", 
        "codigo postal": "4578"
      }, 
      "telefono": 9875443, 
      "email": "DHL@gmail.com"
    },
    "destino": {
      "nombre": "FedEx",
      "direccion": {
        "calle": "Miguel Hidalgo", 
        "número": "34", 
        "ciudad": "Tepic", 
        "codigo postal": "2345"
      }, 
      "telefono": 1234566, 
      "email": "FedEx@gmail.com"
    },
    "tipoEnvio": {
      "_id": "67395d0a11f775829f2f4364",
      "descripcion": "Terrestre", 
      "precio": 100,
      "tiempo": "7 días"
    },
    "cliente": {
      "CURP": "GARC830625HDFNNN07",
      "nombre": "Gabriel",
      "apellidos": "García Rodríguez",
      "email": "gabriel.garcia@example.com"
    },
    "peso": "6kg",
    "dimensiones": "35x25x15cm",
    "total": 700,
    "estatus": "En tránsito"
  },
  { 
    "FechaEnvío": "2024-11-05",
    "origen": {
      "nombre": "FedEx",
      "direccion": {
        "calle": "Miguel Hidalgo", 
        "número": "34", 
        "ciudad": "Tepic", 
        "codigo postal": "2345"
      }, 
      "telefono": 1234566, 
      "email": "FedEx@gmail.com"
    },
    "destino": {
      "nombre": "Estafeta",
      "direccion": {
        "calle": "Mirasol", 
        "número": "10", 
        "ciudad": "Puebla", 
        "codigo postal": "9847"
      }, 
      "telefono": 10564893, 
      "email": "Estafeta@gmail.com"
    },
    "tipoEnvio": {
      "_id": "67395d0a11f775829f2f4365",
      "descripcion": "Aéreo", 
      "precio": 88,
      "tiempo": "5"
    },
    "cliente": {
      "CURP": "SALV950318MDFNNN06",
      "nombre": "Valeria",
      "apellidos": "Salinas Vargas",
      "email": "valeria.salinas@example.com"
    },
    "peso": "10kg",
    "dimensiones": "50x40x30cm",
    "total": 1200,
    "estatus": "Pendiente"
  },
  { 
    "FechaEnvío": "2024-11-06",
    "origen": {
      "nombre": "Estafeta",
      "direccion": {
        "calle": "Mirasol", 
        "número": "10", 
        "ciudad": "Puebla", 
        "codigo postal": "9847"
      }, 
      "telefono": 10564893, 
      "email": "Estafeta@gmail.com"
    },
    "destino": {
      "nombre": "DHL",
      "direccion": {
        "calle": "Colombia", 
        "número": "367", 
        "ciudad": "Guadalajara", 
        "codigo postal": "4578"
      }, 
      "telefono": 9875443, 
      "email": "DHL@gmail.com"
    },
    "tipoEnvio": {
      "_id": "67395d0a11f775829f2f4366",
      "descripcion": "Express", 
      "precio": 100,
      "tiempo": "1 día"
    },
    "cliente": {
      "CURP": "MENJ870812HDFNNR05",
      "nombre": "Jorge",
      "apellidos": "Mendoza Juárez",
      "email": "jorge.mendoza@example.com"
    },
    "peso": "15kg",
    "dimensiones": "70x50x40cm",
    "total": 1500,
    "estatus": "Entregado"
  }
]

*/