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
                            <b-card class="mt-5">
                                <b-row v-if="reportes.length <= 0">
                                    <b-col>
                                        <div style="font-size: 4rem;">
                                            Sin reportes :)
                                        </div>
                                    </b-col>
                                </b-row>
                                <b-row v-for="(reporte, index) in reportesById" :key="index" class="mb-3">
                                    <b-col md="12">
                                        <reporte-component :reporte="reporte" :index="index + 1"/>
                                    </b-col>
                                </b-row>
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
/* eslint-disable */
export default {
    data () {
        return {
            contenido: [],
            idReporte: null,
        }
    },
    created () {
        this.$store.dispatch('loadReportes')
        this.idReporte = this.$route.params.idReporte
    },
    methods: {
    },
    computed: {
        ...mapGetters({
            notificaciones: 'getAdminNotificaciones',
            reportes: 'getReportes',
        }),
        reportesById () {
            if (!this.idReporte) {
                return this.reportes
            } else {
                let auxArray = []
                let aux = this.reportes.find(auxFind => {
                    return auxFind.idReporte == this.idReporte
                })
                auxArray.push(aux)
                return auxArray
            }
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
    .container {
        display: flex;
        align-items: center;
    }

    .container hr {
        width: 100%;
    }
</style>
