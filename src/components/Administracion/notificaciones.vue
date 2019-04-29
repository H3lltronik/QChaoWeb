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
                              <!-- {{notificaciones}} -->
                              <b-col md="12" v-if="notificaciones.length > 0">
                                <b-list-group>
                                    <b-list-group-item v-for="(notificacion, index) in notificaciones" :key="index" 
                                    class="flex-column align-items-start" style="cursor: pointer;"
                                    @click="goToRouter(getUrlNotificacion(notificacion))">
                                        <b-row >
                                            <b-col md="1">
                                                <div class="d-flex h-100"  v-if="notificacion.tipo == 'reporte'">
                                                    <alert-icon class="my-auto"/>
                                                </div>
                                                <div class="d-flex h-100"  v-if="notificacion.tipo == 'verificacion'">
                                                    <shieldcheck-icon class="my-auto"/>
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
        getUrlNotificacion (notificacion) {
            if (notificacion.tipo == 'verificacion') {
                return 'administracion/confirmaciones/' + notificacion.idVerificacion
            } else if (notificacion.tipo == 'reporte') {
                return 'administracion/reportes/' + notificacion.idReporte
            }
        }
    },
    created () {
        setTimeout(() => {
            this.$store.dispatch('loadAdminNotificaciones')
        }, 1000);
    },
    computed: {
        ...mapGetters({
            notificaciones: 'getAdminNotificaciones'
      }),
    }
  }
</script>

<style scoped>
    .noPadding  > .card-body{
        padding-left: 0px !important;
        padding-right: 0px !important;
        padding-top: 0px !important;
        padding-bottom: 0px !important;
    }
    .noPadding {
        padding: 0px !important;
    }
</style>