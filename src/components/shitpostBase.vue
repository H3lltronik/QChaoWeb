<template>
<!-- eslint-disable -->
    <div>
        <nuevo-shitpost v-if="hayUsuario"/>

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
                                            <b-card-img :src="publicacion.perfilImagen"
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
                                        </b-row>
                                        <hr>
                                    </b-col>
                                    <b-col md="12" class="mt-2 noPadding ">

                                        <comentario-comentar :idUsuario="usuario.idUsuario" v-if="hayUsuario"
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
    data () {
        return {

        }
    },
    created () {
        this.$store.dispatch('loadShitpost')
        if (typeof(Storage) !== undefined){
            let usuario = localStorage.getItem("usuario")
            if (usuario)
                console.log(usuario.idUsuario)
            }
    },
    methods: {
        meGusta (idShitpost) {
            let publicacion = {
                idUsuario: this.usuario.idUsuario,
                idShitpost: idShitpost,
            }
            this.$store.dispatch('indicarLike', publicacion)
        },
        goToRouter (route) {
          this.$router.push("/"+route)
        },
    },
    computed: {
        publicaciones () {
            let auxPublicaciones = this.$store.getters.getShitpost
            if (auxPublicaciones.length > 0) {

                return auxPublicaciones

            } else {
                return []
            }
        },
        hayUsuario () {
            let user = this.$store.getters.getUsuario
            if (user.idUsuario)
                return true
            else
                return false
        },
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        }
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
