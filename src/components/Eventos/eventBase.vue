<template>
    <div>
        <b-card class="mt-5 noPadding">
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
                            <b-carousel-slide class="carousel-slide" img-src="https://i.ytimg.com/vi/MK9UguJjpiI/hqdefault.jpg" />
                            <b-carousel-slide class="carousel-slide" img-src="http://1.bp.blogspot.com/-AMtDaj6UwRM/U3YyNdt1SyI/AAAAAAAAA0U/DCzOlCuRVgI/s1600/1395895_648253681908840_1065879546_n.jpg" />
                            <b-carousel-slide class="carousel-slide" img-src="https://i.ytimg.com/vi/ybOuv3Vi-YU/maxresdefault.jpg" />
                        </b-carousel>
                    </b-col>
                    <b-col md="12" class="mt-3">
                        <b-card-text class="text-left">
                            <b-row >
                                <h4 class="h4 my-auto">BOCHOEVENTO 2019</h4>
                                <b-button class="ml-auto" size="sm">ASISTIRE</b-button>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><crosshairs-icon/> Guadalajara</h6>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><clockoutline-icon/> (30/02/19)</h6>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><account-icon/> xXHELLTRONIKXx</h6>
                            </b-row>
                            <b-row class="my-2">
                                <h6 class="text-muted my-auto"><staroutline-icon/> 4 de calificacion</h6>
                            </b-row>
                            <hr class="my-3">
                            <b-row class="text-center">
                                <b-col md="4">
                                    <h6 class="text-muted my-auto">200 ASISTENTES</h6>
                                </b-col>
                                <b-col md="4">
                                    <h6 class="text-muted my-auto">Volkswagen Compactos</h6>
                                </b-col>
                                <b-col md="4">
                                    <h6 class="text-muted my-auto">Volkswagen Compactos</h6>
                                </b-col>
                            </b-row>
                            <hr class="my-3">
                            <b-row>
                                <h6 class="text-muted my-auto">Califica: </h6>
                                <b-input-group prepend="0" append="5" class="my-2">
                                    <b-form-input type="range" min="0" max="5"/>
                                </b-input-group>
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