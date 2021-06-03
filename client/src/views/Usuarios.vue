<template>
  <v-container>
    <v-data-table
        :headers="encabezados"
        :items="usuarios"
        :items-per-page="5"
        class="elevation-1"
        >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Usuarios</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color='success' @click="nl_dialog = true">Nuevo Usuario</v-btn>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{item}">
          <v-icon small @click="eliminar_usuario(item)">
            fas fa-trash
          </v-icon>
        </template>
    </v-data-table>

    <v-dialog v-model='nl_dialog' max-width="500px">
      <v-card>
        <v-card-title>Nuevo Usuario</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols='6'>
                <v-text-field v-model="nuevo_usuario.usu_nombre" label='Nombre'></v-text-field>
              </v-col>
              <v-col cols='6'>
                <v-text-field v-model="nuevo_usuario.usu_ap_pat" label='Apellido Paterno'></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols='6'>
                <v-text-field v-model="nuevo_usuario.usu_ap_mat" label='Apellido Materno'></v-text-field>
              </v-col>
              <v-col cols='6'>
                <v-text-field v-model="nuevo_usuario.usu_correo" label='Correo Electrónico' type="email"></v-text-field>
              </v-col>
              <v-col cols='6'>
                <v-text-field v-model="nuevo_usuario.usu_activo" label='Activo'></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color='success' @click="guardar_usuario()">Guardar</v-btn>
          <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
export default {
  name: 'Usuarios',
  data() {
    return {
      encabezados: [
        {
          text: 'Identificador',
          align: 'start',
          value: 'usu_id'
        },
        { text: 'Nombre', value: 'usu_nombre' },
        { text: 'Apellido Paterno', value: 'usu_ap_pat' },
        { text: 'Apellido Materno', value: 'usu_ap_mat' },
        { text: 'Correo Electrónico', value: 'usu_correo' },
        { text: 'Activo', value: 'usu_activo' },
        { text: 'Acciones', value: 'actions' }
      ],
      usuarios: [],
      nl_dialog: false,
      nuevo_usuario: [],
    }
  },
  created() {
    this.llenar_usuarios();
  },    
  methods: {
    async llenar_usuarios() {
      const api_data = await this.axios.get('/usuario/todos_los_usuarios');
      this.usuarios = api_data.data;
    },
    async eliminar_usuario(item) {
      const body = {
        usu_id: item.usu_id
      };
      await this.axios.post('/usuario/eliminar_usuario/', body);
      this.llenar_usuarios();
    }, 
    async guardar_usuario() {
      await this.axios.post('/usuario/nuevo_usuario/', this.nuevo_usuario);
      this.llenar_usuarios();
      this.cancelar();
    }, 
    cancelar() {
      this.nl_dialog = false;
      this.nuevo_usuario = {};
    },
  },
}
</script>
