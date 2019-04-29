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
                            <b-card class="mt-5 noPadding" v-if="confirmacionesFilter.length > 0">
                                <b-container class="noPadding">
                                    <b-row class="noPadding" >
                                        <b-col md="12" class="mb-4" v-for="(confirmacion, index) in confirmacionesFilter" :key="index">
                                            <confirms-component :confirmacion="confirmacion" :selectedTaller="selectedTaller"></confirms-component>
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
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            idTaller: 0,
            nombre: '1',
            rol: '2',
            ubicacion: '3',
            domicilio: '4',
            imagenes: [],
            verTallerId: 0,
            idVerificacion: null,
        }
    },
    methods: {
        getImageUrl (confirmacion, imgIndex) {
            let url = 'http://localhost/QChao/media/verificaciones/' + confirmacion.idTaller + '/' + (imgIndex) + '.jpg'
            return url
        },
        verTaller (idTaller) {
            this.verTallerId = idTaller
        },
        ocultarTaller () {
            this.verTallerId = null
        }
    },
    created () {
        this.$store.dispatch('loadTalleresAux') // Esta en el modulo de talleres
        this.$store.dispatch('loadConfirmaciones')
        this.idVerificacion = this.$route.params.idVerificacion
    },
    computed: {
        ...mapGetters({
            talleres: 'getTalleresAux',
            confirmaciones: 'getConfirmaciones',
        }),
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        },
        selectedTaller () {
            let aux = this.talleres.find(auxFind => {
                return auxFind.idEstablecimiento == this.verTallerId
            })
            let auxArray = []
            if (aux) {
                auxArray.push(aux)
                return auxArray
            } else {
                return []
            }
        },
        confirmacionesFilter () {
            if (!this.idVerificacion) {
                return this.confirmaciones
            } else {
                let auxArray = []
                let aux = this.confirmaciones.find(auxFind => {
                    return auxFind.idVerificacion == this.idVerificacion
                })
                auxArray.push(aux)
                return auxArray
            }
        }
    },
}
</script>

<style>
    
</style>
