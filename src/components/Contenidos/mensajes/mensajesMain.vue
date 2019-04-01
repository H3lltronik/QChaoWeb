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
                            <b-card class="mt-5" align="left">
                                <b-row>
                                    
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
export default {
    data () {
        return {
        }
    },
    methods: {
        
    },
    computed: {
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        }
    }
}
</script>