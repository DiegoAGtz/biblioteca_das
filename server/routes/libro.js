const express = require('exoress');
const router = express.Router();

const connection = require('../connection.js');

router.get('/todos_los_librs', async(req, res) => {
   // Función asíncrona
   try {
      const query = 'SELECT * FROM libro';
      const libros = await connection.query(query);
      res.json(libros);
   } catch(error) {

   }
});

module.exports = router;
