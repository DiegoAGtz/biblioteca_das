<template>
  <v-container>
    <v-data-table
        :headers="encabezados"
        :items="libros"
        :items-per-page="5"
        class="elevation-1"
        >
        <template v-slot:[`item.actions`]="{item}">
          <v-icon small @click="eliminar_libro(item)">
            fas fa-trash
          </v-icon>
        </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      encabezados: [
        {
          text: 'Identificador',
          align: 'start',
          value: 'lib_id',
        },
        { text: 'Titulo', value: 'lib_titulo' },
        { text: 'Autor', value: 'lib_autor' },
        { text: 'Editorial', value: 'lib_editorial' },
        { text: 'Edicion', value: 'lib_edicion' },
        { text: 'Acciones', value: 'actions' },
      ],
      libros: [
      ]
    }
  },
  created() {
    this.llenar_libros();
  },    
  methods: {
    async llenar_libros() {
      const api_data = await this.axios.get('http://localhost:3000/libro/todos_los_libros');
      this.libros = api_data.data;
    },
    async eliminar_libro(item) {
      const body = {
        lib_id: item.lib_id
      };
      const res = await this.axios.post('http://localhost:3000/libro/eliminar_libro', body);
      this.llenar_libros();
    }, 
  },
  components: {
  },
}
</script>
