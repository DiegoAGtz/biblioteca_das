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
          <v-icon small @click="eliminar_prestamo(item)" class="mr-5">
            fas fa-trash
          </v-icon>
          <v-icon small @click="agregar_libros(item)">
            fas fa-pencil-alt
          </v-icon>
        </template>
    </v-data-table>

    <v-dialog v-model='nl_dialog' max-width="500px">
      <v-card>
        <v-card-title>Nuevo Prestamo</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                    :items="usuarios"
                    v-model="nuevo_prestamo.pre_id_usu"
                    label="Usuario">
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="nuevo_prestamo.pre_fecha_prestamo"
                          label="Fecha de Préstamo"
                          prepend-icon="far fa-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          ></v-text-field>
                    </template>
                  <v-date-picker
                      v-model="nuevo_prestamo.pre_fecha_prestamo"
                      @input="menu1 = false"
                      ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                          v-model="nuevo_prestamo.pre_fecha_entrega"
                          label="Fecha de Entrega"
                          prepend-icon="far fa-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          ></v-text-field>
                    </template>
                  <v-date-picker
                      v-model="nuevo_prestamo.pre_fecha_entrega"
                      @input="menu2 = false"
                      ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color='success' @click="guardar_prestamo()">Guardar</v-btn>
          <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model='np_dialog' max-width="500px">
      <v-card>
        <v-card-title>
          Agregar Libros
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="agregar_renglon()">Agregar Libro</v-btn>
        </v-card-title>
        <card-text>
          <v-container>
            <v-row v-for="(libro, index) in det_prestamo" v-bind:key="index">
              <v-col cols="12">
                <v-select
                  :items="libros"
                  label="Titulo del libro"
                  v-model='libro.dep_lib_id'>

                </v-select>
              </v-col>
            </v-row>
          </v-container>
        </card-text>
        <v-card-actions>

        </v-card-actions>
      </v-card>
    </v-dialog>

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
      usuarios: [],
      libros: [],
      det_prestamo: [],
      nl_dialog: false,
      np_dialog: false,
      menu1: false,
      menu2: false,
      nuevo_prestamo: {
        pre_fecha_prestamo: new Date().toISOString().substr(0, 10),
        pre_fecha_entrega: new Date().toISOString().substr(0, 10)
      },
    }
  },
  created() {
    this.llenar_prestamos();
    this.llenar_usuarios();
    this.llenar_libros();
  },    
  methods: {
    async llenar_prestamos() {
      const api_data = await this.axios.get('/prestamo/todos_los_prestamos');
      this.prestamos = api_data.data;
    },
    async llenar_usuarios() {
      const api_data = await this.axios.get('/usuario/todos_los_usuarios');
      api_data.data.forEach((item) => {
        this.usuarios.push({
          text: item.usu_nombre + ' ' + item.usu_ap_pat + ' ' + item.usu_ap_mat,
          value: item.usu_id
        });
      });
    },
    async llenar_libros() {
      const api_data = await this.axios.get('/libro/todos_los_libros');
      api_data.data.forEach((item) => {
        this.libros.push({
          text: item.lib_titulo + ', ' + item.lib_autor + ', ' + item.lib_edicion,
          value: item.lib_id
        });
      });
    },
    async eliminar_prestamo(item) {
      const body = {
        pre_id: item.pre_id
      };
      await this.axios.post('/prestamo/eliminar_prestamo/', body);
      this.llenar_prestamos();
    }, 
    async guardar_prestamo() {
      await this.axios.post('/prestamo/nuevo_prestamo/', this.nuevo_prestamo);
      this.llenar_prestamos();
      this.cancelar();
    },
    agregar_libros() {
      this.np_dialog = true;
    },
    agregar_renglon() {
      this.det_prestamo.push({
        dep_lib_id: '',
      });
    },
    cancelar() {
      this.nl_dialog = false;
      this.nuevo_prestamo = {};
    },
  },
}
</script>
