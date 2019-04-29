<template>
    <div>
        <b-card class="mt-5">
            <b-row>
            <b-col md="3">
                <img style="width: 100% !important;" :src="otroPerfil.imagen" alt="">
            </b-col>
            <b-col md="9">
                <b-row>
                <b-col>
                    <b-button size="sm" type="primary" block @click="crearChat"
                    :disabled="mismoUsuario || !hayUsuario || existeChat">
                    <div v-if="!existeChat  && hayUsuario">Crear chat</div> <div v-else-if="existeChat && hayUsuario">Chat creado</div> <div v-else>Chat</div>
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
                :disabled="true" type="text" :value="otroPerfil.descripcion"/>
                </b-row>
            </b-col>
            </b-row>
            <b-row>
            <b-button size="sm" class="mt-2 mx-4" type="text" variant="danger" block @click="bloquearUsuario" v-if="hayUsuario && tipoUsuario == 'Administrador'"> <!-- PARA ADMINS WARD -->
                Bloquear Usuario id: {{idPerfil}}
            </b-button>
            </b-row>
        </b-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        idPerfil: {
            type: String
        }
    },
    data () {
        return {
            
        }
    },
    created () {
        this.$store.dispatch('getPerfil', this.idPerfil)
    },
    methods: {
        crearChat () {
        let mensaje = {
          idRemitente: this.usuario.idUsuario,
          idDestino: this.idPerfil,
          nickname: this.otroPerfil.nickname
        }
        this.$store.dispatch('crearChat', mensaje)
      },
      bloquearUsuario () {
          let timestamp = this.moment.now()
          let dias = null
          let mensaje = "Durante cuantos dias a partir ahora sera bloqueado el usuario?\nHora actual: " + this.moment(timestamp).format('lll')
          let fechaFinal = ''
          let borrar = false

          do{
                dias = prompt(mensaje)
                dias = Number(dias)
                if (dias == 0){ // Osea que cancelo 
                  alert('cancelar')
                  return
                }
          }while(isNaN(dias));
          fechaFinal = this.moment(timestamp).add(dias, 'days').valueOf();
          // console.log("Fecha desbloqueo", fechaFinal, this.moment(fechaFinal).format('lll'))
          // WARD
          borrar = confirm('Estas seguro que desea bloquar a este usuario?')
          if (borrar) {
              let payload = {
                  idUsuario: this.idPerfil,
                  timestamp: fechaFinal,
                  dias: dias
              }
              console.log("Payload", payload)
              this.$store.dispatch('bloquearUsuario', payload)
          }
      }
    },
    computed: {
        ...mapGetters({
          chats: 'getChats',
      }),
      usuario () {
          let user = this.$store.getters.getUsuario
          return user
      },
      otroPerfil () {
        return this.$store.getters.getOtroPerfil
      },
      mismoUsuario () {
          if (!this.hayUsuario)
            return
        if (this.usuario.idUsuario == this.otroPerfil.idUsuario)
          return true
        else
          return false
      },
      hayUsuario () {
          let user = this.$store.getters.getUsuario
          if (user)
              return true
          else
              return false
      },
      tipoUsuario () {
            if (!this.usuario)
                return 0
            let user = this.$store.getters.getUsuario
            return user.nombredetipo
        },
      existeChat () {
        let aux = this.chats.find(auxFind => {
          return (auxFind.idDestino == this.idPerfil)
        })
        if (aux)
          return true
        else
          return false
      }
    }
}
</script>