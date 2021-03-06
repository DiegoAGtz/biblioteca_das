const mysql = require('mysql');
const { promisify } = require('util');

// Configurar la conexión a la base de datos
const connection = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'Uykw041o',
   database: 'biblioteca_db'
});

// Crear la función para hacer la conexión 
// Normalmente
//
// connection.getConnection(
//    function myfuntion(err, conn) {
//       // Operaciones
//    }
// )

// Más directo. Crear una funcipon anónima
// Función que sólo se usa localmente (en este
// punto)
// Arrow function
connection.getConnection(
   (err, conn) => {
      if(err) {
         console.log('Problema para conectar a la DB');
         console.log(err);
      }
      if(conn) {
         console.log('¡DB conectada!');
      }
      return;
   }
)

connection.query = promisify(connection.query);
module.exports = connection;
