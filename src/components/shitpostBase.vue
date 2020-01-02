<template>
<!-- eslint-disable -->
    <div>

        <b-card class="mt-2" align="left" v-for="(publicacion, index) in publicaciones" :key="index">
            <b-container class="noPadding" >
                <b-row>
                    <!-- Las columnas en bootstrap dividen todo el layout en 12 columnas y segun la etiqueta de tamaño se le asigna el valor/cantidad de columnas
                        que tomara lo que este dentro -->
                    <b-col md="12" class="noPadding" >
                        <b-card-group>
                            <b-container class="noPadding">
                                <b-row class="noPadding">
                                    <b-col md="12" class="noPadding">
                                        <b-row>
                                            <b-card-img class="ml-2" :src="publicacion.perfilImagen"
                                                left height="50"></b-card-img>
                                            <b-col>
                                                <b-row>
                                                    <b-card-text style="font-size: 16pt; cursor: pointer;">
                                                        <a href="#" @click.prevent="goToRouter('perfil/' + publicacion.idUsuario)">
                                                          {{publicacion.nombre}}
                                                        </a>
                                                    </b-card-text>
                                                </b-row>
                                                <b-row>
                                                    <small class="text-muted" style="font-size: 8pt;">{{publicacion.fecha}}</small>
                                                </b-row>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col md="12" class="noPadding">
                                        <b-card-text class="my-2" style="font-size: 11pt;">
                                            {{publicacion.descripcion}}
                                        </b-card-text>
                                        <b-row class="d-flex">
                                            <div class="my-auto">
                                                <b-row>
                                                    Tags:
                                                    <div v-if="publicacion.tags.length > 0">
                                                        <b-badge class="mr-1" v-for="(tag, index) in publicacion.tags" :key="index">
                                                            {{tag.name}}
                                                        </b-badge>
                                                    </div>
                                                    <div v-else>
                                                        Sin tags
                                                    </div>
                                                </b-row>
                                            </div>
                                        </b-row>
                                        <b-row class="noPadding">
                                            <b-col md="12" style="overflow: hidden; height: 500px;" class="noPadding text-center">
                                                <img v-if="publicacion.tipo == 'image'"
                                                style="width: 100% !important; " :src="publicacion.imagen" alt="">
                                                <video style="width: 100% !important; height: 500px;" controls
                                                v-if="publicacion.tipo == 'video'" :src="publicacion.imagen"/>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col md="12" class="mt-3">
                                        <b-row>
                                            <div class="mr-5 my-auto">
                                                <thumbup-icon @click="meGusta(publicacion.idShitpost)"
                                                style="cursor: pointer;"/>
                                                <small class="ml-2">{{publicacion.likes}}</small>
                                            </div>
                                            <div class="mr-5 my-auto">
                                                <comment-icon/>
                                                <small class="ml-2">{{publicacion.comentarios.length}}</small>
                                            </div>
                                            <div class="mr-5 my-auto">
                                                <b-button size="sm" variant="danger" class="mb-2" @click="reportar(publicacion)" v-if="hayUsuario && !bloqueado">
                                                    Reportar
                                                </b-button>
                                            </div>
                                        </b-row>
                                        <hr>
                                    </b-col>
                                    <b-col md="12" class="mt-2 noPadding ">

                                        <comentario-comentar :idUsuario="usuario.idUsuario" v-if="hayUsuario && !bloqueado"
                                        :imagen="usuario.imagen" :idShitpost="publicacion.idShitpost"
                                        :nombre="usuario.Nombre"/>

                                        <b-row class="mt-3">
                                            <b-col md="12" class="my-auto ">
                                                 <hr> Comentarios <hr>
                                            </b-col>
                                        </b-row>


                                        <comentario-ver v-for="(comentario, index) in publicacion.comentarios" :key="index"
                                        :comentario="comentario.comentario" :nickname="comentario.nombre"
                                        :idUsuario="comentario.idUsuario"/>


                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-card-group>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props: {
        publicaciones: {
            type: Array
        }
    },
    data () {
        return {

        }
    },
    created () {
        // this.$store.dispatch('loadShitpost')
        if (typeof(Storage) !== undefined){
            let token = localStorage.getItem("token")
            if (token)
                console.log("token", token)
            }
    },
    methods: {
        meGusta (idShitpost) {
          if (this.bloqueado) {
            return;
          }
            let publicacion = {
                idUsuario: this.usuario.idUsuario,
                idShitpost: idShitpost,
            }
            this.$store.dispatch('indicarLike', publicacion)
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
                tipo: 'shitpost',
                idUsuario: publicacion.idUsuario,
            }
            if (descicion) {
                this.$store.dispatch('generarReporte', payload)
            }
            // console.log("publicacion", publicacion)
        }
    },
    computed: {
        // publicaciones () {
        //     let auxPublicaciones = this.$store.getters.getShitpost
        //     if (auxPublicaciones.length > 0) {

        //         return auxPublicaciones

        //     } else {
        //         return []
        //     }
        // },
        hayUsuario () {
            let user = this.$store.getters.getUsuario
            if (user)
                return true
            else
                return false
        },
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        },
        bloqueado () {
          let bloqueoTimestamp = localStorage.getItem("bloqueoTimestamp")
          return (bloqueoTimestamp !== null)
        },
    }
}
</script>

<style>
    .card-body{
        padding-left: 0px;
        padding-right: 0px;
    }
    .noPadding {
        padding: 0px !important;
    }
</style>
