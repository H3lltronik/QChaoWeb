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
                            <div v-if="eventos.length > 0">
                                <event-base :eventos="eventos"></event-base>
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
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
        }
    },
    created () {
      setTimeout(() => {
          this.$store.dispatch('loadEventosUsuario', this.usuario.idUsuario)
      }, 1000);  
    },
    computed: {
        ...mapGetters({
            eventos: "getEventosUsuario",
        }),
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        },
    },
    methods: {
        goToRouter (route) {
          this.$router.push("/"+route)
        },
    }
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