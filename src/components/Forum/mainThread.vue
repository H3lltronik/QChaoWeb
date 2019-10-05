<template>
  <div>
    <navbar-component></navbar-component>
    <b-container fluid class="mt-5">
        <!-- b-row de la tabla -->
        <b-row class="pt-4">
          <div class="col-12">
            <div class="card w-100">
              <div class="card-header">
                <div class="row justify-content-center">
                  <span>Tema</span>
                  <div class="ml-3" v-if="post.idUsuario == usuario.idUsuario" style="cursor: pointer;">
                    <edit-icon @click="editandoPost (true)"></edit-icon>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div v-if="!editarPost">{{post.tema}}</div>
                <div v-show="hayUsuario && editarPost">
                  <close-icon @click="editandoPost (false)" style="cursor: pointer;"></close-icon>
                  <create-thread-component :editar="postAEditar"></create-thread-component>
                </div>
              </div>
            </div>
          </div>

          <b-col sm="12" class="mt-4" v-if="post.hilos.length > 0">
              <table class="table table-striped table-bordered table-responsive d-flex flex-wrap">
                  <thead class="thead-light text-left w-100">
                      <tr class="row">
                          <th class="col-12">Respuestas</th>
                      </tr>
                  </thead>
                  <tbody class="text-left w-100">
                      <tr class="row" v-for="(hilo, index) in post.hilos" :key="index">
                          <!-- {{hilo}} -->
                          <td :class="{'col-10': hilo.imagen, 'col-12': !hilo.imagen}" style="max-height: 300px; justify-content: space-between; display: flex; flex-direction: column;">
                              <p>{{hilo.texto}}</p>
                              <div class="row d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center">
                                  <span class="text-muted" style="font-size: 9pt;">Por: <a href="#" @click.prevent="goToRouter('perfil/' + hilo.idUsuario)">{{hilo.nickname}}</a></span>
                                  <span v-if="hilo.idUsuario == usuario.idUsuario" style="cursor: pointer;">
                                    <close-icon @click="deleteHilo (hilo.idHilo)"></close-icon>
                                    <edit-icon @click="editandoHilo (hilo)"></edit-icon>
                                  </span>
                                </div>
                              </div>
                          </td>
                          <td class="col-2 text-center" v-if="hilo.imagen">
                            <img class="img-fluid" :src="hilo.imagen" style="max-height: 260px; display: inline-block;">
                          </td>
                      </tr>
                  </tbody>
              </table>
          </b-col>
          <div class="col-12" v-else>
            <h3>Sin comentarios</h3>
          </div>

          <div class="col-12 mt-4">
            <CrearComentario :editar="editarHilo" v-on:cancelEdit="editarHilo = null"></CrearComentario>
          </div>

        </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CrearComentario from './createComment.vue'

export default {
   components: {
     CrearComentario
   },
  data () {
    return {
      editarHilo: null,
      editarPost: false,
      postAEditar: null,
    }
  },
  created () {
    this.$store.dispatch('cargarPost', this.$route.params.idPost)
  },
  methods: {
    goToRouter (route) {
      this.$router.push("/"+route)
    },
    deleteHilo (idHilo) {
      let confirmacion = confirm('De verdad deseas borrar este hilo?');
      if (confirmacion) {
        this.$store.dispatch('deleteHilo', idHilo)
      }
    },
    editandoHilo (hilo) {
      // El hilo que se haya elegido para editar se le va a pasar via props al componente de crear comentarios para solo llenarlo con informacion
      this.editarHilo = hilo
      console.log("Editar?", hilo)
    },
    editandoPost (edito) {
      this.editarPost = edito
      this.postAEditar = this.post
    },
    hayUsuario () {
        let user = this.$store.getters.getUsuario
        if (user.idUsuario)
            return true
        else
            return false
    },
  },
  computed: {
      ...mapGetters({
        post: 'getPost',
        usuario: 'getUsuario',
      }),
  }
}
</script>
