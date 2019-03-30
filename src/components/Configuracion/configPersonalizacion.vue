<template>
    <div>
        <b-card class="h-100 w-100">
            <h4>Personalizacion</h4>
            <b-card-text class="mt-3">
                <b-row >
                    <b-col md="5">
                        <div>
                            <div style="font-size: 16pt;">Imagen de perfil</div>
                            <b-img fluid alt="Responsive image" style="max-height: 20rem;"
                                :src="personalizacion.imagen"/>
                            <b-row>
                              <b-button variant="primary" block @click="onPickFile" size="sm">Seleccionar Imagen</b-button>
                              <input type="file" ref="fileInput" style="display: none;" accept="imagen/*" @change="onFilePicked">
                              <div>Seleccionado: {{imagen? imagen.name:''}}</div>
                            </b-row>
                        </div>
                    </b-col>
                    <b-col md="7">
                        <b-row>
                            <b-col>
                                <b-form-group label="Nickname" class="my-3">
                                    <b-form-input v-model="nickname"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label="Tags o gustos por los autos" class="my-3">
                                    <b-form-input v-model="tags"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label="Descripcion" class="my-3">
                                    <b-form-textarea v-model="descripcion"/>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card-text>
            <b-button class="mt-2" block variant="success" @click="updatePersonalizacion">Guardar cambios</b-button>
        </b-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
          nickname: '',
          tags: '',
          descripcion: '',
          imagen: '',
        }
    },
    created () {
      let user = this.$store.getters.getUsuario
      this.$store.dispatch('getPerfil', user.idUsuario)
    },
    methods: {
      onPickFile () {
          this.$refs.fileInput.click()
      },
      onFilePicked () {
          this.imagen = this.$refs.fileInput.files[0];
          console.log(this.imagen)
      },
      updatePersonalizacion () {
        let newData = {
          idUsuario: this.usuario.idUsuario,
          descripcion: this.descripcion,
          nickname: this.nickname,
          imagen: this.imagen,
        }
        this.$store.dispatch('personalizarPerfil', newData)
      }
    },
    computed: {
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        },
        personalizacion () {
          let aux = this.$store.getters.getOtroPerfil
          if (aux.idUsuario) {
            this.descripcion = aux.descripcion
            this.nickname = aux.nickname
            this.imagen = 'http://localhost/QChao/media/usuarios/' + aux.idUsuario + '.jpg'
          }
          return this.$store.getters.getOtroPerfil
        }
    }
}
</script>

<style>

</style>
