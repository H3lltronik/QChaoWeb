<template>
    <div>
        <b-card class="mt-5" align="left" v-for="(publicacion, index) in publicaciones" :key="index">
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
                                                    <b-card-text style="font-size: 16pt;" >
                                                        {{publicacion.nombre}}
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
                                                <img class="img-fluid" :src="publicacion.imagen" alt="">
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col md="12" class="mt-3">
                                        <b-row>
                                            <div class="mr-5 my-auto">
                                                <thumbup-icon/>
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
                                        <b-row>
                                            <b-col md="1" class="">
                                                <img class="" height="40"
                                                    :src="publicacion.perfilImagen" alt="">
                                            </b-col>
                                            <b-col md="11" class="my-auto">
                                                <!-- De esta forma de alinean y juntan un boton y un input -->
                                                <div class="input-group">
                                                    <b-form-input size="sm" type="text" placeholder="Escribe un comentario" />
                                                    <span class="input-group-btn">
                                                        <b-button size="sm" type="submit">Comentar</b-button>
                                                    </span>
                                                </div>
                                            </b-col>
                                            
                                        </b-row>

                                        <b-row class="mt-3">
                                            <b-col md="12" class="my-auto ">
                                                 <hr> Comentarios <hr>
                                            </b-col>
                                        </b-row>


                                        <comentario v-for="(comentario, index) in publicacion.comentarios" :key="index"
                                        :comentario="comentario.comentario" :nickname="comentario.nombre" 
                                        :idUsuario="comentario.idUsuario">
                                        </comentario>


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
export default {
    data () {
        return {

        }
    },
    created () {
        this.$store.dispatch('loadShitpost')
    },
    methods: {

    },
    computed: {
        publicaciones () {
            let auxPublicaciones = this.$store.getters.getShitpost
            let urlBase = this.$store.getters.urlBase

            if (auxPublicaciones.length > 0) {
                // Completar url de las imagenes del shitpost
                auxPublicaciones.forEach(element => {
                    element.imagen = urlBase + 'media/shitpost/' + element.imagen
                });
                // Hacer url de las imagenes del perfil de quien publico
                auxPublicaciones.forEach(element => {
                    element.perfilImagen = urlBase + 'media/usuarios/' + element.idUsuario + '.jpg'
                });
                console.log("Publicaciones", auxPublicaciones)
                return auxPublicaciones
                
            } else {
                return []
            }
        },
        // comentarios () {
        //     let comentarios = []
        //     let publicaciones = this.publicaciones
        //     if (publicaciones.length > 0) {
        //         publicaciones.forEach(publicacion => {
        //             comentarios.push(publicacion.comentarios)
        //         });
        //         console.log("Ok", comentarios)
        //     } 
        //     return comentarios
        // }
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