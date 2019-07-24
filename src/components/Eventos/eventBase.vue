<template>
    <div>
        <b-card class="mt-5 noPadding" v-for="(evento, index) in eventos" :key="index">
            <b-container class="noPadding">
                <b-row class="noPadding">
                    <b-col md="12" class="noPadding">
                        <b-row class="noPadding" v-if="evento.idUsuario == usuario.idUsuario">
                            <b-button size="sm" variant="primary"  @click="editar(evento)" v-if="hayUsuario">
                                Editar
                            </b-button>
                        </b-row>
                    </b-col>
                    <b-col md="12" style="overflow: hidden; height: 300px;" class="noPadding">
                        <b-carousel
                            id="carousel-fade"
                            fade controls class="noPadding"
                            indicators>
                            <b-carousel-slide class="carousel-slide" v-for="imagen in Number(evento.cantImagenes)" :key="imagen"
                            :img-src="getImageUrl(evento, imagen)" style="width: 100% !important; height: 300px !important;"/>
                        </b-carousel>
                    </b-col>
                    <b-col md="12" class="mt-3">
                        <b-card-text class="text-left">
                            <b-row >
                                <h4 class="h4 my-auto">{{evento.titulo}}</h4>
                                <b-button size="sm" variant="danger" class="ml-2" @click="reportar(evento)" v-if="hayUsuario">
                                    Reportar
                                </b-button>
                                <b-button class="ml-auto" size="sm" :disabled="eventoPasado(evento)" v-if="hayUsuario"
                                variant="primary" @click="registrarAsistencia(evento)">
                                    ASISTIRE
                                </b-button>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><crosshairs-icon/> {{evento.ubicacion}}</h6>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><clockoutline-icon/> {{evento.fecha}}</h6>
                            </b-row>
                            <b-row class="my-2">
                                <account-icon/>
                                <a href="#" class="text-muted my-auto ml-1"
                                @click.prevent="goToRouter('perfil/' + evento.idUsuario)">
                                    {{evento.Nombre}}
                                </a>
                            </b-row>
                            <b-row class="my-2" v-if="eventoPasado(evento)">
                                <h6 class="text-muted my-auto">
                                    <staroutline-icon/>{{calificacion(evento)}} de calificacion 
                                </h6>
                                <div class="text-muted my-auto mx-1" style="font-size: 8pt;"> 
                                    ( de {{evento.calificaciones.length}} calificacion[es] )
                                </div>
                            </b-row>
                            <b-row class="d-flex">
                                <div class="my-auto">
                                    <b-row>
                                        Tags: 
                                        <div v-if="evento.tags.length > 0">
                                            <b-badge class="mr-1" v-for="(tag, index) in evento.tags" :key="index">
                                                {{tag.name}}
                                            </b-badge>
                                        </div>
                                        <div v-else>
                                            Sin tags
                                        </div>
                                    </b-row>
                                </div>
                            </b-row>
                            <hr class="my-3">
                            <b-row class="text-center">
                                <b-col md="4">
                                    <h6 class="text-muted my-auto">{{evento.asistentes}} ASISTENTES</h6>
                                </b-col>
                                <b-col md="8">
                                    <h6 class="text-muted my-auto">tags: </h6>
                                </b-col>
                                <b-col md="12" class="mt-2">
                                    <b-form-textarea size="sm" no-resize rows="4"
                                    :disabled="true" type="text" :value="evento.descripcion"/>
                                </b-col>
                            </b-row>
                            <hr class="my-3">
                            <b-row v-if="eventoPasado(evento) && hayUsuario">
                                <h6 class="text-muted my-auto">¿Que te parecio el evento?</h6>
                                <b-input-group prepend="0" append="5" class="my-2">
                                    <b-form-input type="range" min="0" max="5" v-model="calificar"/>
                                </b-input-group>
                                <b-button class="ml-auto" size="sm" block @click="calificarEvento(evento)">
                                    Calificar
                                </b-button>
                            </b-row>
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
        eventos: {
            type: Array
        }
    },
    data () {
        return {
            calificar: '',
        }
    },
    computed: {
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        },
        hayUsuario () {
            let user = this.$store.getters.getUsuario
            if (user)
                return true
            else
                return false
        },
    },
    methods: {
        eventoPasado (evento) {
            var date1 = new Date(evento.fecha);
            var date2 = new Date();
            var timeDiff = date1.getTime() - date2.getTime();
            
            if (timeDiff < 0)
                return true
            else
                return false
        },
        getImageUrl (evento, imgIndex) {
            let urlBase = this.$store.getters.getUrlBase
            return urlBase + 'media/eventos/' + evento.idEvento + '/' + (imgIndex-1) + '.jpg';
        },
        calificacion (evento) {
            let total = 0;
            if (evento.calificaciones.length > 0) {
                evento.calificaciones.forEach(cal => {
                    total += Number(cal.calificacion)
                });
                return (total / evento.calificaciones.length)
            } else {
                return 0;
            }
        },
        calificarEvento (evento) {
            let newEvento = {
                idEvento: evento.idEvento,
                idUsuario: this.usuario.idUsuario,
                calificacion: this.calificar,
            }
            this.$store.dispatch('calificarEvento', newEvento)
        },
        registrarAsistencia (evento) {
            let asistencia = {
                idEvento: evento.idEvento,
                idUsuario: this.usuario.idUsuario,
            }
            this.$store.dispatch('registrarAsistencia', asistencia)
        },
        goToRouter (route) {
          this.$router.push("/"+route)
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
                tipo: 'evento',
                idUsuario: publicacion.idUsuario,
            }
            if (descicion) {
                this.$store.dispatch('generarReporte', payload)
            }
            // console.log("publicacion", publicacion)
        },
        editar (publicacion) {
            this.$router.push('editarEvento/')
            this.$store.commit('setEditarEvento', publicacion)
        }
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