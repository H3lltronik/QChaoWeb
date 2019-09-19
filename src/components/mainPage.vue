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
                            <nuevo-shitpost v-if="hayUsuario"/>
                            <shitpost-base :publicaciones="publicaciones"></shitpost-base>
                            <event-base :eventos="eventos"></event-base>
                            <taller-base :talleres="talleres"></taller-base>
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
        }
    },
    created () {
        this.$store.dispatch('cargarEventos')
        this.$store.dispatch('cargarTalleres')
        this.$store.dispatch('loadShitpost')
    },
    computed: {
        publicaciones () {
            let auxPublicaciones = this.$store.getters.getShitpost
            if (auxPublicaciones.length > 0) {

                return auxPublicaciones

            } else {
                return []
            }
        },
        eventos () {
            let eventos = this.$store.getters.getEventos
            if (eventos.length > 0) {
                return eventos
            } else {
                return []
            }
        },
        talleres () {
            let talleres = this.$store.getters.getTalleres
            if (talleres.length > 0) {
                return talleres
            } else {
                return []
            }
        },
        hayUsuario () {
            let user = this.$store.getters.getUsuario
            if (user.idUsuario)
                return true
            else
                return false
        },
    }
}
</script>

<style>

</style>
