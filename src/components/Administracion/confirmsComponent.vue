<template>
    <div>
        <b-col md="12" class="noPadding">
            <b-row class="noPadding">
                <!-- {{confirmacion}} -->
            </b-row>
        </b-col>
        <b-col md="12">
            <div class="mx-auto">Imagenes de verificacion</div>
        </b-col>
        <b-col md="12" style="overflow-x: hidden; height: 300px;" class="noPadding">
            <b-row style="overflow-x: hidden;">
                <b-col col md="12" lg="6" v-for="(item, index) in Number(confirmacion.cantImages)" :key="index">
                    <img class="img-fluid mx-auto mb-3" :src="getImageUrl(confirmacion, index)" alt="">
                </b-col>
            </b-row>
        </b-col>
        <b-col md="12" class="mt-3">
            <b-row>
                <b-col md="12">
                <b-row>
                    <b-col md="12" class="mt-2 ">
                        <div>Datos del taller</div>
                    </b-col>
                    <b-col md="12" class="mt-2">
                        <b-form-input size="sm" type="text" :disabled="true" :value="'Propietario: ' + confirmacion.nombrePropietario"/>
                    </b-col>
                    <b-col md="6" class="mt-2">
                        <b-form-input size="sm" type="text" :disabled="true" :value="'Rol: ' + confirmacion.rolTaller"/>
                    </b-col>
                    <b-col md="6" class="mt-2">
                        <b-form-input size="sm" type="text" :disabled="true" :value="'Ubicacion: ' + confirmacion.ubicacionTaller"/>
                    </b-col>
                    <b-col md="12" class="mt-2">
                        <b-form-input size="sm" type="text" :disabled="true" :value="'Domicilio: ' + confirmacion.domicilioTaller"/>
                    </b-col>

                    <b-col class="mt-2">
                        <b-button size="sm" variant="primary" block @click="verTaller(confirmacion.idTaller)" v-if="!selectedTaller[0]">
                            Ver taller
                        </b-button>
                        <b-button size="sm" variant="primary" block @click="ocultarTaller()" v-else>
                            Ocultar taller
                        </b-button>
                    </b-col>
                    <b-col class="mt-2">
                        <b-button size="sm" variant="success" block @click="verificarTaller">Dar verificacion</b-button>
                    </b-col>
                    <b-col md="12">
                        <taller-base :talleres="selectedTaller"></taller-base>
                    </b-col>
                </b-row>
                </b-col>
            </b-row>
            <hr class="mt-4">
        </b-col>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        confirmacion: {
            type: Object,
            default: {}
        },
    },
    data () {
        return {
            idTaller: 0,
            nombre: '1',
            rol: '2',
            ubicacion: '3',
            domicilio: '4',
            imagenes: [],
            verTallerId: 0,
        }
    },
    methods: {
        getImageUrl (confirmacion, imgIndex) {
            let url = 'http://localhost/QChao/media/verificaciones/' + confirmacion.idVerificacion + '/' + (imgIndex) + '.jpg'
            return url
        },
        verTaller (idTaller) {
            this.verTallerId = idTaller
        },
        ocultarTaller () {
            this.verTallerId = null
        },
        verificarTaller () {
            this.$store.dispatch('confirmarTaller', this.confirmacion.idTaller)
        }
    },
    created () {
        this.$store.dispatch('loadTalleresAux') // Esta en el modulo de talleres
        this.$store.dispatch('loadConfirmaciones')
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
        }
    },
}
</script>

<style>
    
</style>