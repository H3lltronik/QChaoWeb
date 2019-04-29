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
                        <perfil-component :idPerfil="idPerfil"></perfil-component>
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
      idPerfil: '',
    }
  },
  created () {
    this.idPerfil = this.$route.params.idPerfil
    
  },
  methods: {
  },
  computed: {
    }
}
</script>
