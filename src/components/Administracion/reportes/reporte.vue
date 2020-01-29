<template>
    <b-row>
        <b-col>
            <b-row>
                <div>
                    Reporte #{{index}}
                </div>
                <div class="ml-auto">
                    <b-button size="sm" variant="warning" @click="borrarReporte">
                        Borrar
                    </b-button>
                </div>
                <div class="container">
                    <hr />
                </div>
            </b-row>
            <b-row class="mt-3">
                <b-col>
                    <b-card>
                        <b-row>
                            <!-- {{reporte}} -->
                            <b-col md="12">
                                <b-form-textarea size="sm" no-resize rows="4"
                                :disabled="true" type="text" :value="reporte.mensaje"/>
                            </b-col>
                            <b-col md="12">
                                <b-row class="mt-2 noPadding">
                                    <b-col md="6" class="noPadding ">
                                        <b-button size="sm" variant="primary" block @click="mostrarContenido = !mostrarContenido">
                                            <div v-if="!mostrarContenido">Ver publicacion</div>
                                            <div v-else>Ocultar publicacion</div>
                                        </b-button>
                                    </b-col>
                                    <b-col md="6" class="noPadding">
                                        <b-button size="sm" variant="danger" block @click="bloquearUsuario">
                                            Bloquear usuario id: {{contenidoArray[0].idUsuario}}
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row class="mt-2" v-if="reporte.tipo == 'shitpost' && mostrarContenido">
                            <shitpost-base :publicaciones="contenidoArray"></shitpost-base>
                        </b-row>
                        <b-row class="mt-2" v-else-if="reporte.tipo == 'establecimiento' && mostrarContenido">
                            <taller-base :talleres="contenidoArray"></taller-base>
                        </b-row>
                        <b-row class="mt-2" v-else-if="reporte.tipo == 'evento' && mostrarContenido">
                            <event-base :eventos="contenidoArray"></event-base>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        reporte: {
            type: Object,
            default: function () {
                return {idUsuario: '',mensaje: '',contenido: '{"idUsuario":"","nombre":"","descripcion":""}',tipo: '',}
            },
        },
        index: {
            type: Number
        }
    },
    data () {
        return {
            mostrarContenido: false,
            horaAux: this.moment.now(),
        }
    },
    created () {
    },
    methods: {
        borrarReporte () {
            let borrar = confirm('Estas seguro que desea borrar este reporte?')
            if (borrar) {
                this.$store.dispatch('borrarReporte', this.reporte.idReporte)
            }
        },
        bloquearUsuario () {
          let timestamp = this.moment.now()
          let dias = null
          let mensaje = "Durante cuantos dias a partir ahora sera bloqueado el usuario?\nHora actual: " + this.moment(timestamp).format('lll')
          let fechaFinal = ''
          let borrar = false

          do{
                dias = prompt(mensaje)
                dias = Number(dias)
                if (dias == 0){ // Osea que cancelo
                  alert('cancelar')
                  return
                }
          }while(isNaN(dias));
          fechaFinal = this.moment(timestamp).add(dias, 'days').valueOf();
          // console.log("Fecha desbloqueo", fechaFinal, this.moment(fechaFinal).format('lll'))
          // WARD
          borrar = confirm('Estas seguro que desea bloquear a este usuario?')
          if (borrar) {
              let payload = {
                  idUsuario: this.reporte.idUsuario,
                  timestamp: fechaFinal,
                  dias: dias
              }
              console.log("Payload", payload)
              this.$store.dispatch('bloquearUsuario', payload)
          }
      }
    },
    computed: {
        ...mapGetters({
            usuario: 'getUsuario',
        }),
        contenidoArray () {
            let auxArray = []
            let contenido = this.reporte.contenido
            if (typeof(contenido) !== Object) {
                contenido = JSON.parse(contenido)
            }
            auxArray[0] = contenido
            return auxArray
        }
    }
}
</script>
