<template>
    <div>
        <navbar-component></navbar-component>
        <b-container fluid class="mt-5">
            <b-row>
                <b-col sm="12" class="mx-auto">
                    <b-row>
                        <b-col md="3">
                            <left-aside></left-aside>
                        </b-col>
                        <b-col md="6" >
                            <b-card class="mt-5 noPadding">
                                <b-container class="noPadding">
                                    <b-row>
                                        <b-col md="12">
                                        <b-row>
                                            <b-col md="12" class="mt-2 ">
                                                <div>Datos del taller</div>
                                            </b-col>
                                            <b-col md="12" class="mt-2">
                                                <b-form-input size="sm" type="text" placeholder="Nombre del dueño o rendatario" v-model="nombre"/>
                                            </b-col>
                                            <b-col md="6" class="mt-2">
                                                <b-form-input size="sm" type="text" placeholder="Rol del comercio" v-model="rol"/>
                                            </b-col>
                                            <b-col md="6" class="mt-2">
                                                <b-form-input size="sm" type="text" placeholder="Ubicacion o ciudad" v-model="ubicacion"/>
                                            </b-col>
                                            <b-col md="12" class="mt-2">
                                                <b-form-input size="sm" type="text" placeholder="Domicilio" v-model="domicilio"/>
                                            </b-col>

                                            <b-col class="mt-2">
                                                <div style="font-size: 11px !important;">Fotos de licencias y comprobantes de domicilio</div>
                                                <b-button size="sm" variant="primary" block @click="onPickFile">Elegir imagenes</b-button>
                                                <input type="file" ref="fileInput" style="display: none;" accept="image/*" multiple @change="onFilePicked">
                                            </b-col>
                                            <b-col class="mt-4">
                                                <b-button size="sm" variant="success" block @click="solicitarVerficicacion">Publicar</b-button>
                                            </b-col>
                                            <b-col md="12">
                                                Seleccionados:
                                                <div v-for="(item, index) in imagenes" :key="index">
                                                    {{item.name}}
                                                </div>
                                            </b-col>
                                        </b-row>
                                        </b-col>
                                    </b-row>
                                </b-container>
                            </b-card>
                        </b-col>
                        <b-col md="3">
                            <right-aside></right-aside>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container> 
    </div>
</template>

<script>
export default {
    data () {
        return {
            idTaller: 0,
            nombre: '',
            rol: '',
            ubicacion: '',
            domicilio: '',
            imagenes: [],
        }
    },
    methods: {
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            this.imagenes = this.$refs.fileInput.files
        },
        solicitarVerficicacion () {
            let verificacion = {
                idUsuario: this.usuario.idUsuario,
                idTaller: this.idTaller,
                nombre: this.nombre,
                rol: this.rol,
                ubicacion: this.ubicacion,
                domicilio: this.domicilio,
                imagenes: this.imagenes,
            }
            this.$store.dispatch('solicitarVerficicacion', verificacion)
        }
    },
    created () {
        this.idTaller = this.$route.params.idTaller
        // alert(this.idTaller)
    },
    computed: {
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        }
    }
}
</script>

<style>
    
</style>
