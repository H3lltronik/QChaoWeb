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
                            <div v-if="talleres.length > 0">
                                <taller-base :talleres="talleres"></taller-base>
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
          this.$store.dispatch('loadTalleresUsuario', this.usuario.idUsuario)
      }, 1000);
    },
    computed: {
        ...mapGetters({

        }),
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        },
        talleres () {
            let talleres = this.$store.getters.getTalleresUsuario
            if (talleres) {
                return (talleres)? talleres:[]
            } else {
                return []
            }
        }
    },
    watch: {
        // usuario: {
        //     handler(newVal, oldVal){
        //         if (!oldVal.idUsuario && newVal.idUsuario) {
        //             console.log("idUsuario", newVal.idUsuario)
        //             this.$store.dispatch('loadTalleresUsuario', newVal.idUsuario)
        //         }
        //     },
        //     deep: true
        // }
    },
    methods: {
        getImageUrl (taller, imgIndex) {
            let urlBase = this.$store.getters.getUrlBase
            return urlBase + 'media/establecimientos/' + taller.idEstablecimiento + '/' + (imgIndex-1) + '.jpg';
        },
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
