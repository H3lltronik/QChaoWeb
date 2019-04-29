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
                        <b-col md="6" class="mt-5">
                            <div v-if="shitposts.length > 0 || eventos.length > 0 || talleres.length > 0">
                                <shitpost-base :publicaciones="shitposts"></shitpost-base>
                                <event-base :eventos="eventos"></event-base>
                                <taller-base :talleres="talleres"></taller-base>
                            </div>
                            <div v-else>
                                No se encontro ningun resultado
                            </div>
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
            shitposts: [],
            eventos: [],
            talleres: [],
        }
    },
    created () {
        let tags = JSON.parse(this.$route.params.tags)
        console.log("tags", tags)
        this.$store.dispatch('buscar', tags).then(response => {
            console.log("Busqueda", response)
            this.shitposts = response.shitpost
            this.eventos = response.eventos
            this.talleres = response.talleres
        })
    },
    methods: {

    }
}
</script>
