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
    methods: {
        
    },
    created () {
        this.$store.dispatch('cargarTalleres')
    },
    computed: {
        talleres () {
            let talleres = this.$store.getters.getTalleres
            if (talleres.length > 0) {
                return talleres
            } else {
                return []
            }
        }
    }
}
</script>

<style>
    
</style>
