<template>
    <div>
        <b-card class="mt-5 noPadding" v-for="(taller, index) in talleres" :key="index">
            <b-container class="noPadding">
                <b-row class="noPadding w-100">
                    <b-col md="auto" class="noPadding">
                        <b-row class="noPadding" v-if="taller.idUsuario == usuario.idUsuario">
                            <b-button size="sm" variant="primary"  @click="editar(taller)" v-if="hayUsuario && !bloqueado">
                                Editar
                            </b-button>
                        </b-row>
                    </b-col>
                    <b-col md="auto" class="noPadding">
                        <b-row class="noPadding" v-if="taller.idUsuario == usuario.idUsuario">
                            <b-button size="sm" variant="danger"  @click="eliminarTaller(taller)" v-if="hayUsuario && !bloqueado">
                                ELIMINAR
                            </b-button>
                        </b-row>
                    </b-col>
                    <b-col md="12" style="overflow: hidden; height: 300px;" class="noPadding">
                        <b-carousel
                            id="carousel-fade"
                            fade controls class="noPadding"
                            indicators>
                            <b-carousel-slide class="carousel-slide" v-for="imagen in Number(taller.cantImagenes)" :key="imagen"
                            :img-src="getImageUrl(taller, imagen)" style="width: 100% !important; height: 300px !important;"/>
                        </b-carousel>
                    </b-col>
                    <b-col md="12" class="mt-3">
                        <b-card-text class="text-left">
                            <b-row >
                                <!-- {{taller}} -->
                                <h4 class="h4 my-auto">{{taller.Nombre}}</h4>
                                <b-button variant="danger" size="sm" @click="reportar(taller)" class="ml-2" v-if="hayUsuario && !bloqueado">
                                    Reportar
                                </b-button>
                                <div class="ml-auto">
                                    <b-row v-if="taller.Verificado != 1">
                                        <div v-if="taller.idUsuario == usuario.idUsuario && !bloqueado" class="mr-2">
                                            <b-row class="">
                                                <b-button variant="primary" size="sm" @click="goToRouter('verificarTaller/' + taller.idEstablecimiento)">
                                                    Solicitar verificacion
                                                </b-button>
                                            </b-row>
                                        </div>
                                        <div class="my-auto">Sin verificar</div>
                                    </b-row>
                                    <b-row v-else>
                                        <div class="my-auto">Verificado: </div>
                                        <staroutline-icon class="mr-2 my-auto" style="margin-bottom: 8px !important;"/>
                                    </b-row>
                                </div>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><crosshairs-icon/> {{taller.Ciudad}} - {{taller.Domicilio}}</h6>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><clockoutline-icon/> {{taller.horario}}</h6>
                            </b-row>
                            <b-row class="my-2">
                                <account-icon/>
                                <a href="#" class="text-muted my-auto ml-1"
                                @click.prevent="goToRouter('perfil/' + taller.idUsuario)">
                                    {{taller.propietario}}
                                </a>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><contactmail-icon/> {{taller.Contacto}}</h6>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><information-icon/> {{taller.tipoEstablecimiento}}</h6>
                            </b-row>
                            <b-row class="d-flex">
                                <div class="my-auto">
                                    <b-row>
                                        Tags:
                                        <div v-if="taller.tags != undefined">
                                            <b-badge class="mr-1" v-for="(tag, index) in taller.tags" :key="index">
                                                {{tag.name}}
                                            </b-badge>
                                        </div>
                                        <div v-else>
                                            Sin tags
                                        </div>
                                    </b-row>
                                </div>
                            </b-row>

                            <h6 class="text-muted my-auto">
                                  <staroutline-icon/>{{calificacion(taller)}} de calificacion
                              </h6>
                              <div class="text-muted my-auto mx-1" style="font-size: 8pt;">
                                  <div v-if="Array.isArray(taller.calificaciones)">( de {{taller.calificaciones.length || 0 }} calificacion[es] )</div>
                                  <div v-else>( de 0 calificacion[es] )</div>
                              </div>

                            <hr class="my-3">
                            <b-row class="text-center">
                                <b-col md="12" class="mt-2">
                                    <b-form-textarea size="sm" no-resize rows="4"
                                    :disabled="true" type="text" :value="taller.Descripcion"/>
                                </b-col>
                            </b-row>

                            <div class="row" v-if="hayUsuario && usuario.idUsuario != taller.idUsuario && !bloqueado">
                              <h6 class="text-muted my-auto">¿Que te parece este taller?</h6>
                              <b-input-group prepend="0" append="5" class="my-2">
                                  <b-form-input type="range" min="0" max="5" v-model="calificar"/>
                              </b-input-group>
                              <b-button class="ml-auto" size="sm" block @click="calificarTaller(taller)">
                                  Calificar
                              </b-button>
                            </div>
                        </b-card-text>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>
</template>

<script>
export default {
    props: {
        talleres: {
            type: Array
        }
    },
    data () {
        return {
          calificar: '',
        }
    },
    created () {
    },
    computed: {
        usuario () {
            let user = this.$store.getters.getUsuario
            if (user)
                return user
            else {
                return {
                    idUsuario: 'NADA'
                }
            }
        },
        hayUsuario () {
            let user = this.$store.getters.getUsuario
            if (user)
                return true
            else
                return false
        },
        bloqueado () {
          let bloqueoTimestamp = localStorage.getItem("bloqueoTimestamp")
          return (bloqueoTimestamp !== null)
        }
    },
    methods: {
      calificacion (taller) {
          let total = 0;
          if (Array.isArray(taller.calificaciones)) {
            if (taller.calificaciones.length > 0) {
                taller.calificaciones.forEach(cal => {
                    total += Number(cal.Calificacion)
                });
                return (total / taller.calificaciones.length)
            } else {
                return 0;
            }
          } else {
            return 0;
          }
        },
        calificarTaller (taller) {
          let payload = {
              idEstablecimiento: taller.idEstablecimiento,
              idUsuario: this.usuario.idUsuario,
              calificacion: this.calificar,
          }
          this.$store.dispatch('calificarTaller', payload)
        },
        getImageUrl (taller, imgIndex) {
            let urlBase = this.$store.getters.getUrlBase
            return urlBase + 'media/establecimientos/' + taller.idEstablecimiento + '/' + (imgIndex-1) + '.jpg';
        },
        goToRouter (route) {
          this.$router.push("/"+route)
        },
        editar (publicacion) {
            this.$router.push('editarTaller/')
            this.$store.commit('setTallerAEditar', publicacion)
        },
        reportar (publicacion) {
            let mensaje = ''
            do{
                mensaje = prompt('Cuentanos porque reportaste eso')
            }while(mensaje == null || mensaje == 0 );

            let descicion = confirm('Desea mandar su reporte?')
            let payload = {
                mensaje: mensaje,
                contenido: publicacion,
                tipo: 'establecimiento',
                idUsuario: publicacion.idUsuario,
            }
            if (descicion) {
                this.$store.dispatch('generarReporte', payload)
            }
            // console.log("publicacion", publicacion)
        },
        eliminarTaller (taller) {
          let payload = {
              idEstablecimiento: taller.idEstablecimiento,
          }
          this.$store.dispatch('eliminarTaller', payload)
        },
    }
}
</script>

<style scoped>
    .card-body{
        padding-left: 0px !important;
        padding-right: 0px !important;
        padding-top: 0px !important;
    }
    .noPadding {
        padding: 0px !important;
    }
    .carousel-slide{
        height: 300px;
    }
</style>
