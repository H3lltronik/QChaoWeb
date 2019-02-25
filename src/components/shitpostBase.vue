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
                                            <b-card-img src="https://i.pinimg.com/474x/55/89/7a/55897a1249d5db035b6a68c37340f364--goddesses-icons.jpg"
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
                                            <b-col md="12" style="overflow: hidden; height: 500px;" class="noPadding">
                                                <img class="img-fluid" src="https://homuapp.000webhostapp.com/Imagenes/4-1-2019-22-24-45.jpg" alt="">
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
                                                    src="https://i.pinimg.com/474x/55/89/7a/55897a1249d5db035b6a68c37340f364--goddesses-icons.jpg" alt="">
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