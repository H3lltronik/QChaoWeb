<template>
    <div>
        <navbar-component></navbar-component>
        <b-container fluid class="mt-5">
            <!-- b-row de la tabla -->
            <b-row>
                <div class="col-12 mt-4 ">
                    <create-thread-component v-if="hayUsuario && !bloqueado"></create-thread-component>
                </div>
                <b-col sm="10" class="mt-2 text-left">
                    <h2 class="h4">Categoria del foro</h2>
                </b-col>
                <b-col sm="12">
                    <table class="table table-striped table-bordered table-responsive d-flex flex-wrap">
                        <thead class="thead-light text-left w-100">
                            <tr class="row">
                                <th class="col-9">Tema</th>
                                <th class="col-1">Urgente</th>
                                <th class="col-2">Participantes</th>
                            </tr>
                        </thead>
                        <tbody class="text-left w-100">
                            <tr class="row" v-for="(post, index) in posts" :key="index">
                                <td class="col-9 w-100">
                                    <p>{{post.tema}}</p>
                                    <div class="row d-flex justify-content-between align-items-center">
                                      <div class="d-flex align-items-center">
                                        <span class="text-muted" style="font-size: 9pt;">Por <a href="#" @click.prevent="goToRouter('perfil/' + post.idUsuario)">{{post.nickname}}</a></span>
                                        <span @click="deletePost (post.idPost)" v-if="post.idUsuario == usuario.idUsuario" style="cursor: pointer;">
                                          <close-icon></close-icon>
                                        </span>
                                      </div>
                                      <button class="btn btn-sm btn-primary sm" @click="goToRouter('discusion/' + post.idPost)">Ver</button>
                                    </div>
                                </td>
                                <td class="col-1 d-flex">
                                    <div class="m-auto" v-if="post.urgente == 1">
                                      <check-icon></check-icon>
                                    </div>
                                </td>
                                <td class="col-2 d-flex">
                                    <div class="m-auto">{{post.participantes}}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {

        }
    },
    created () {
      this.$store.dispatch('cargarPosts')
    },
    methods: {
      goToRouter (route) {
        this.$router.push("/"+route)
      },
      deletePost (idPost) {
        let confirmacion = confirm('Confirmas que deseas borrar este post?');
        if (confirmacion) {
          this.$store.dispatch('deletePost', { idPost })
        }
      }
    },
    computed: {
      ...mapGetters({
          posts: 'getPosts',
          usuario: 'getUsuario',
      }),
      hayUsuario () {
          let user = this.$store.getters.getUsuario
          if (user.idUsuario)
              return true
          else
              return false
      },
      bloqueado () {
        let bloqueoTimestamp = localStorage.getItem("bloqueoTimestamp")
        return (bloqueoTimestamp !== null)
      }
  }
}
</script>

<style scoped>
  a {
      text-decoration:none;
   }
</style>
