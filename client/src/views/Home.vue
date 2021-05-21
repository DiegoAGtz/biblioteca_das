<template>
    <v-container>
        <v-data-table
        :headers="encabezados"
        :items="libros"
        :items-per-page="5"
        class="elevation-1"
          ></v-data-table>
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
        ],
        libros: [
        ]
      }
    },
    methods: {

    },
    components: {
    },
  }
</script>
