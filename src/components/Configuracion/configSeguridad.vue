<template>
    <div>
        <b-card class="h-100 w-100">
            <h4>Seguridad</h4>
            <b-card-text class="mt-3">
                <b-row >
                    <b-button variant="" block class="mx-auto mt-3" @click="cerrarSesiones">Cerrar sesion en todos los dispositivos</b-button>
                </b-row>
                <b-row>
                    <b-col>
                        <b-card class="mt-3" v-for="(item, index) in dispositivos" :key="index">
                            <b-row>
                                <b-col md="8">
                                    <b-row class="my-auto">
                                        <b-img fluid style="max-height: 3rem;" src="./imagenes/computer.png"/>
                                        <h4 class="ml-3 my-auto">{{item.sesionInfo.os}} - {{item.sesionInfo.name}} {{item.sesionInfo.version}}</h4>
                                    </b-row>
                                </b-col>
                                <b-col md="4" class="my-auto">
                                    <b-button size="sm" variant="success" @click="cerrarSesion(item)">
                                        Eliminar dispositivo
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
        }
    },
    methods: {
        cerrarSesiones () {
            let descicion = confirm('Esta seguro de que desea realizar esta accion?')
            if(!descicion) {
                alert('Cancelar')
                return
            }
            this.dispositivos.forEach(sesion => {
                this.$store.dispatch('cerrarSesion', sesion)
            });
        },
        cerrarSesion (sesion) {
            let descicion = confirm('Esta seguro de que desea realizar esta accion?')
            if(!descicion) {
                alert('Cancelar')
                return
            }
            this.$store.dispatch('cerrarSesion', sesion)
        }
    },
    mounted () {
    },
    computed: {
        ...mapGetters({
            user: 'getUsuario',
        }),
        dispositivos () {
            let aux = this.$store.getters.getSesiones
            console.log("El aux", aux)
            if (aux.length > 0) {
                aux.forEach(element => {
                    try {
                        element.sesionInfo = JSON.parse(element.sesionInfo)
                    } catch (e) {
                        
                    }
                });
                return aux
            } else {
                return []
            }
        }
    }
}
</script>

<style>
    
</style>