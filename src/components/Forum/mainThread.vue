<template>
  <div>
    <navbar-component></navbar-component>
    <b-container fluid class="mt-5">
        <!-- b-row de la tabla -->
        <b-row class="pt-4">
          <div class="col-12">
            <div class="card w-100">
              <div class="card-header">
                Tema
              </div>
              <div class="card-body">
                {{post.tema}}
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
                          <td class="col-12">
                              <p>{{hilo.texto}}</p>
                              <div class="row d-flex justify-content-between align-items-center">
                                <span class="text-muted" style="font-size: 9pt;">Por <a href="#">El {{hilo.nickname}}</a></span>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </b-col>
          <div class="col-12" v-else>
            <h3>Sin comentarios</h3>
          </div>

          <div class="col-12 mt-4">
            <CrearComentario></CrearComentario>
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

    }
  },
  created () {
    this.$store.dispatch('cargarPost', this.$route.params.idPost)
  },
  methods: {
    goToRouter (route) {
      this.$router.push("/"+route)
    },
  },
  computed: {
      ...mapGetters({
        post: 'getPost'
      }),
  }
}
</script>
