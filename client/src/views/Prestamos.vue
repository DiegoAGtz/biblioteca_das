<template>
  <v-container>
    <v-data-table
        :headers="encabezados"
        :items="prestamos"
        :items-per-page="5"
        class="elevation-1"
        >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Préstamos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color='success' @click="nl_dialog = true">Nuevo Préstamo</v-btn>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{item}">
          <v-icon small @click="eliminar_prestamo(item)">
            fas fa-trash
          </v-icon>
        </template>
    </v-data-table>

  </v-container>
</template>

<script>
export default {
  name: 'Prestamos',
  data() {
    return {
      encabezados: [
        {
          text: 'Identificador',
          align: 'start',
          value: 'pre_id'
        },
        { text: 'Usuario', value: 'usu_nombre_comp' },
        { text: 'Fecha prestamo', value: 'pre_fecha_prestamo' },
        { text: 'Fecha Entrega', value: 'pre_fecha_entrega' },
        { text: 'Acciones', value: 'actions' }
      ],
      prestamos: [],
      nl_dialog: false,
      nuevo_prestamo: [],
    }
  },
  created() {
    this.llenar_prestamos();
  },    
  methods: {
    async llenar_prestamos() {
      const api_data = await this.axios.get('/prestamo/todos_los_prestamos');
      this.prestamos = api_data.data;
    },
    async eliminar_usuario(item) {
      const body = {
        pre_id: item.pre_id
      };
      await this.axios.post('/prestamo/eliminar_prestamo/', body);
      this.llenar_prestamos();
    }, 
    async guardar_prestamo() {
      await this.axios.post('/prestamo/nuevo_prestamo/', this.nuevo_usuario);
      this.llenar_prestamos();
      this.cancelar();
    }, 
    cancelar() {
      this.nl_dialog = false;
      this.nuevo_prestamo = {};
    },
  },
}
</script>
