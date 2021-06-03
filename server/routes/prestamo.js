const express = require('express');
const router = express.Router();

const connection = require('../connection.js');

router.get('/todos_los_prestamos', async(req, res) => {
   // Función asíncrona
   try {
      const query = 'SELECT ' +
                        'p.pre_id, u.usu_id, CONCAT_WS(\' \', u.usu_nombre, u.usu_ap_pat, u.usu_ap_mat) AS usu_nombre_comp, ' +
                        'p.pre_fecha_prestamo, p.pre_fecha_entrega ' + 
                        'FROM prestamo p ' +
                        'INNER JOIN usuario u ' +
                        'ON p.pre_id_usu = u.usu_id;';
      const prestamos = await connection.query(query);
      res.json(prestamos);
   } catch(error) {
      return res.json({
         error: error
      });
   }
});

router.post('/eliminar_prestamo', async(req, res) => {
   // Vamos a eliminar un prestamo, por lo tanto necesitamos POST
   try {
      const lib_id= req.body.lib_id;
      const query = 'DELETE FROM prestamo WHERE pre_id = ?;';
      const result = await connection.query(query, [pre_id]);
      res.json('ok');
   } catch(error) {
      return res.json({
         error: error
      });
   }
});

router.post('/nuevo_prestamo', async(req, res) => {
   // Vamos a insertar un prestamo, por lo tanto necesitamos POST
   try {
      const body = req.body;
      const query = 'INSERT INTO prestamo(pre_id_usu, pre_fecha_prestamo, pre_fecha_entrega) VALUES (?, ?, ?);';
      const result = await connection.query(query, [body.pre_id_usu, body.pre_fecha_prestamo, body.pre_fecha_entrega]);
      res.json('ok');
   } catch(error) {
      return res.json({
         error: error
      });
   }
});

module.exports = router;
