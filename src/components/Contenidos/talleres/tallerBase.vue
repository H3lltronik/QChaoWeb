<template>
    <div>
        <b-card class="mt-5 noPadding" v-for="(taller, index) in talleres" :key="index">
            <b-container class="noPadding">
                <b-row class="noPadding">
                    <b-col md="12" class="noPadding">
                        <b-row class="noPadding">
                            
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
                                <h4 class="h4 my-auto">{{taller.Nombre}}</h4>
                                <div class="ml-auto">
                                    <b-row v-if="1">
                                        <div class="my-auto">Sin verificar</div>
                                    </b-row>
                                    <b-row v-if="0">
                                        <div class="my-auto">Verificado: </div>
                                        <staroutline-icon class="mr-2 my-auto"/>
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
                            <hr class="my-3">
                            <b-row class="text-center">
                                <b-col md="12" class="mt-2">
                                    <b-form-textarea size="sm" no-resize rows="4"
                                    :disabled="true" type="text" :value="taller.Descripcion"/>
                                </b-col>
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
        talleres: {
            type: Array
        }
    },
    data () {
        return {
        }
    },
    computed: {
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        }
    },
    methods: {
        getImageUrl (taller, imgIndex) {
            return 'http://localhost/QChao/media/establecimientos/' + taller.idEstablecimiento + '/' + (imgIndex-1) + '.jpg';
        },
        goToRouter (route) {
          this.$router.push("/"+route)
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