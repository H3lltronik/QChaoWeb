<template>
    <div>
        <b-card class="h-100 w-100">
          <div style="display: none;">
            {{personalizacion}}
            {{usuario}}
          </div>
            <h4>Cuenta</h4>
            <b-card-text class="mt-3">
                <b-form-group label="Nombre de cuenta" class="my-3">
                    <b-form-input v-model="cuenta.nombre"></b-form-input>
                </b-form-group>

                <b-form-group label="Correo" class="my-3">
                    <b-form-input v-model="cuenta.correo"></b-form-input>
                </b-form-group>

                <b-form-group label="Nueva contraseña" class="my-3">
                    <b-form-input v-model="cuenta.password" type="password"></b-form-input>
                </b-form-group>

                <b-form-group label="Confirmar contraseña" class="my-3">
                    <b-form-input v-model="cuenta.confirmarPass" type="password"></b-form-input>
                </b-form-group>

                <b-form-group label="Agregar telefono" class="my-3">
                    <b-form-input v-model="cuenta.telefono"></b-form-input>
                </b-form-group>
                <b-button variant="danger">Borrar cuenta</b-button>
            </b-card-text>
            <b-button class="mt-2" @click="guardarCambios">Guardar cambios</b-button>
        </b-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cuenta: {
                nombre: '',
                correo: '',
                password: '',
                confirmarPass: '',
                telefono: '',
            }
        }
    },
    methods: {
      guardarCambios () {
        let formData = new FormData ()
        formData.set('idUsuario', this.usuario.idUsuario)
        formData.set('nombre', this.cuenta.nombre)
        formData.set('correo', this.cuenta.correo)
        formData.set('password', this.cuenta.password)
        formData.set('telefono', this.cuenta.telefono)
        this.axios.post('http://localhost/QChao/conexiones/usuario/saveGeneralConf.php', formData).then(response => {
          if (response.data.status.includes('OK')) {
            alert("Se ha actualizado la informacion")
          } else {
            alert("ERROR AL ACTUALIZAR" + response.data.response)
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    computed: {
        usuario () {
            let user = this.$store.getters.getUsuario
            if (user.idUsuario) {
              this.cuenta.nombre = user.nombre
              this.cuenta.correo = user.correo
              this.cuenta.password = user.pass
            }
            return user
        },
        personalizacion () {
          let aux = this.$store.getters.getOtroPerfil
          if (aux.idUsuario) {
            this.cuenta.telefono = aux.telefono
          }
          return this.$store.getters.getOtroPerfil
        }
    },
    mounted () {
      let user = this.$store.getters.getUsuario
      console.log("USUARIO", user)
      this.$store.dispatch('getPerfil', user.idUsuario)
    },
}
</script>

<style lang="">

</style>
