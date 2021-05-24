const express = require('express');
const router = express.Router();

const connection = require('../connection.js');

router.get('/todos_los_libros', async(req, res) => {
   // Función asíncrona
   try {
      const query = 'SELECT * FROM libro;';
      const libros = await connection.query(query);
      res.json(libros);
   } catch(error) {
      return res.json({
         error: error
      });
   }
});

module.exports = router;
