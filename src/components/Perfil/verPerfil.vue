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
                          <b-row>
                            <b-col md="3">
                              <img style="width: 100% !important;" :src="otroPerfil.imagen" alt="">
                            </b-col>
                            <b-col md="9">
                              <b-row>
                                <b-col>
                                  <b-button size="sm" type="primary" block @click="enviarMensaje"
                                  :disabled="mismoUsuario || !hayUsuario">
                                    Mensaje
                                  </b-button>
                                </b-col>
                                <b-col>
                                  <b-form-input size="sm" type="text" class="text-center" disabled :value="otroPerfil.nickname"/>
                                </b-col>
                                <b-col>
                                  <b-button size="sm" type="success" block disabled>{{otroPerfil.nombredetipo}}</b-button>
                                </b-col>
                              </b-row>
                              <b-row class="mt-3">
                                <b-form-textarea size="sm" no-resize rows="4"
                                :disabled="true" type="text" value="XD"/>
                              </b-row>
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
export default {
  data () {
    return {
      idPerfil: '',
    }
  },
  created () {
    this.idPerfil = this.$route.params.idPerfil
    this.$store.dispatch('getPerfil', this.idPerfil)
  },
  methods: {
      enviarMensaje () {
        let mensaje = {
          idRemitente: this.usuario.idUsuario,
          idDestino: this.idPerfil,
        }
        this.$store.dispatch('enviarMensaje', mensaje)
      }
  },
  computed: {
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        },
        otroPerfil () {
          return this.$store.getters.getOtroPerfil
        },
        mismoUsuario () {
          if (this.usuario.idUsuario == this.otroPerfil.idUsuario)
            return true
          else
            return false
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
