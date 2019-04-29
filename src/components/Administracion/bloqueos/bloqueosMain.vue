<template>
  <div>
    <navbar-component></navbar-component>
    <b-container fluid class="mt-5">
        <b-row>
            <b-col sm="12" class="mx-auto">
                <b-row>
                    <b-col md="3">
                        <left-aside></left-aside>
                    </b-col>
                    <b-col md="6" >
                        <b-card class="mt-5">
                          <b-row>
                              <b-table :items="bloqueos" :fields="fields" striped>
                                <template slot="ver_perfil" slot-scope="row">
                                    <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                                    {{ row.detailsShowing ? 'Ocultar' : 'Mostrar'}} Perfil 
                                    </b-button>
                                </template>

                                <template slot="row-details" slot-scope="row">
                                    <perfil-component :idPerfil="row.item.idUsuario"></perfil-component>
                                </template>
                                </b-table>
                          </b-row>
                        </b-card>
                    </b-col>
                    <b-col md="3">
                        <right-aside></right-aside>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        fields: ['dias', 'idUsuario', 'timestampDesbloqueo' , 'ver_perfil'],
        items: [
          { Dias: 2, ID_Usuario: '11', Fecha_de_inicio: this.moment().format('lll')},
          { Dias: 2, ID_Usuario: '17', Fecha_de_inicio: this.moment().format('lll')},
          { Dias: 3, ID_Usuario: '18', Fecha_de_inicio: this.moment().format('lll')},
        ]
      }
    },
    created () {
        this.$store.dispatch('loadBloqueos')
    },
    computed: {
        ...mapGetters({
          bloqueos: 'getBloqueos',
      }),
    }
  }
</script>