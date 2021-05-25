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

router.post('/eliminar_libro', async(req, res) => {
   // Vamos a eliminar un libro, por lo tanto necesitamos POST
   try {
      const body = req.body;
      const query = `DELETE FROM libro WHERE lib_id = ${body.lib_id};`;
      await connection.query(query);
      res.json('ok');
   } catch(error) {
      return res.json({
         error: error
      });
   }
});

module.exports = router;
