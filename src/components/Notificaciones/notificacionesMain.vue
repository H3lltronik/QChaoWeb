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
                              <b-col md="12" v-if="notificaciones.length > 0">
                                <b-list-group>
                                    <b-list-group-item v-for="(notificacion, index) in notificaciones" :key="index" 
                                    class="flex-column align-items-start" style="cursor: pointer;"
                                    @click="goToRouter('mensajes/' + notificacion.idChat)">
                                        <b-row >
                                            <b-col md="1">
                                                <div class="d-flex h-100"  v-if="notificacion.tipo == 'mensaje' || notificacion.tipo == 'chat'">
                                                    <message-icon class="my-auto"/>
                                                </div>
                                            </b-col>
                                            <b-col md="9">
                                                <div class="d-flex w-100 justify-content-between h-100">
                                                    <h6 class="mb-1 my-auto" v-html="notificacion.mensaje"></h6>
                                                </div>
                                            </b-col>
                                            <b-col md="2">
                                                <div class="d-flex h-100">
                                                    <div class="my-auto">
                                                        {{moment(Number(notificacion.timestamp)).format('L')}}
                                                    </div>
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </b-list-group-item>
                                </b-list-group>
                              </b-col>
                              <b-col md="12" v-else>
                                  <div>Sin notificaciones</div>
                              </b-col>
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
      }
    },
    methods: {
        goToRouter (route) {
            this.$router.push("/"+route)
        },
    },
    created () {
        setTimeout(() => {
            this.$store.dispatch('loadUserNotificaciones')
        }, 1000);
    },
    computed: {
        ...mapGetters({
            notificaciones: 'getUsuarioNotificaciones'
      }),
    }
  }
</script>