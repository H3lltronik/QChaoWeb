<template>
    <div>
        <b-card class="mt-5" align="left">
            <b-container class="noPadding">
                <b-row>
                    <!-- Las columnas en bootstrap dividen todo el layout en 12 columnas y segun la etiqueta de tamaño se le asigna el valor/cantidad de columnas 
                        que tomara lo que este dentro -->
                    <b-col md="12" class="noPadding">
                        <b-card-group>
                            <b-container class="noPadding">
                                <b-row class="noPadding">
                                    <b-col md="12" class="noPadding">
                                        <b-row>
                                            <b-card-img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/68f46e97-6a91-4028-848f-1f2a6ff6716c/d53mgu0-5e5f7af6-ba42-403a-a9e7-7c4fec32fd43.jpg/v1/fill/w_783,h_1021,q_70,strp/amlito_amoroso_lopez_obrador_by_marionette2007_d53mgu0-pre.jpg"
                                                left height="50"></b-card-img>
                                            <b-col>
                                                <b-row>
                                                    <b-card-text style="font-size: 16pt;" >
                                                        Fernando Valle
                                                    </b-card-text>
                                                </b-row>
                                                <b-row>
                                                    <small class="text-muted" style="font-size: 8pt;">24 de Febrero</small>
                                                </b-row>
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col md="12" class="noPadding">
                                        <b-card-text class="my-2" style="font-size: 11pt;">
                                            Monitas chinaaaas ~ >w< <br>
                                            Soy bien webo pero no lo admito
                                        </b-card-text>
                                        <b-row class="noPadding">
                                            <b-col md="12" style="overflow: hidden; height: 500px;" class="noPadding text-center">
                                                <img class="img-fluid" src="https://img.taxyc.com/1/v/t1.0-9/s720x720/22448226_1903266053328194_3187917734065479314_n.jpg?_nc_cat=102&_nc_ht=scontent.xx&oh=936a100756fbcfcfd81cb6cf7fc6980c&oe=5CCCC245" alt="">
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                    <b-col md="12" class="mt-3">
                                        <b-row>
                                            <div class="mr-5 my-auto">
                                                <thumbup-icon/>
                                                <small class="ml-2">0</small>
                                            </div>
                                            <div class="mr-5 my-auto">
                                                <comment-icon/>
                                                <small class="ml-2">0</small>
                                            </div>
                                        </b-row>
                                        <hr>
                                    </b-col>
                                    <b-col md="12" class="mt-2 noPadding ">
                                        <b-row>
                                            <b-col md="1" class="">
                                                <img class="" height="40"
                                                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/68f46e97-6a91-4028-848f-1f2a6ff6716c/d53mgu0-5e5f7af6-ba42-403a-a9e7-7c4fec32fd43.jpg/v1/fill/w_783,h_1021,q_70,strp/amlito_amoroso_lopez_obrador_by_marionette2007_d53mgu0-pre.jpg" alt="">
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