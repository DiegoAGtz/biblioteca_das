const express = require('express');
const router = express.Router();

const connection = require('../connection.js');

router.get('/todos_los_usuarios', async(req, res) => {
   // Función asíncrona
   try {
      const query = 'SELECT * FROM usuario;';
      const usuarios = await connection.query(query);
      res.json(usuarios);
   } catch(error) {
      return res.json({
         error: error
      });
   }
});

router.post('/eliminar_usuario', async(req, res) => {
   // Vamos a eliminar un libro, por lo tanto necesitamos POST
   try {
      const usu_id= req.body.usu_id;
      const query = 'DELETE FROM usuario WHERE usu_id = ?;';
      const result = await connection.query(query, [usu_id]);
      res.json('ok');
   } catch(error) {
      return res.json({
         error: error
      });
   }
});

router.post('/nuevo_usuario', async(req, res) => {
   // Vamos a insertar un libro, por lo tanto necesitamos POST
   try {
      const body = req.body;
      const query = 'INSERT INTO usuario(usu_nombre, usu_ap_pat, usu_ap_mat, usu_correo, usu_activo) VALUES (?, ?, ?, ?, ?);';
      const result = await connection.query(query, [body.usu_nombre, body.usu_ap_pat, body.usu_ap_mat, body.usu_correo, body.usu_activo]);
      res.json('ok');
   } catch(error) {
      return res.json({
         error: error
      });
   }
});

module.exports = router;
