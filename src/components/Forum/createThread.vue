<template>
  <div class="row">
    <!-- hola {{editar}} -->
    <div class="col-10">
      <div class="form-group">
        <textarea v-model="tema" placeholder="Tema..." class="form-control" id="exampleFormControlTextarea1" rows="3" required></textarea>
      </div>
    </div>
    <div class="col-2 d-flex flex-column justify-content-between">
      <div class="row">
        <div class="input-group mb-3 d-flex justify-content-around">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input v-model="urgente" type="checkbox" aria-label="Checkbox for following text input">
            </div>
          </div>
          <input type="text" value="URGENTE" class="form-control" aria-label="URGENTE" disabled="false">
        </div>

      </div>
      <div class="row">
        <div class="col-12 m-0 p-0" v-if="!editando">
          <button class="btn btn-primary btn-block" @click="publicar ()">
            {{btnText}}
          </button>
        </div>

        <div class="col-10 m-0 p-0" v-if="editando">
          <button class="btn btn-primary btn-block" @click="editarPost ()">
            {{btnText}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editar: {
      type: Object,
      default: null,
    }
  },
  data () {
    return {
      tema: '',
      urgente: false,
      btnText: 'Publicar',
    }
  },
  methods: {
    publicar () {
      if (!this.tema.length > 0) {
        alert ('Ingrese un tema')
        return
      }

      let payload = {
        idUsuario: this.usuario.idUsuario,
        tema: this.tema,
        urgente: this.urgente,
        nickname: this.usuario.nickname,
        participantes: 0,
      }
      this.$store.dispatch('crearPost', payload)
    },
    editarPost () {
      let payload = {
        idPost: this.editar.idPost,
        tema: this.tema,
        urgente: this.urgente
      }
      this.$store.dispatch('editarPost', payload)
    }
  },
  computed: {
    usuario () {
        let user = this.$store.getters.getUsuario
        return user
    },
    editando () {
      return (this.btnText == 'Editar')
    }
  },
  watch: {
    // Wachamos el prop editar, si su valor cambio es porque hay algo que debemos editar...
    editar: {
        handler: function(newValue) {
            console.log("Hay algo por editar", newValue)
            this.tema = newValue.tema
            this.urgente = newValue.urgente
            this.btnText = 'Editar'

            window.scrollTo(0, 0);  // Scroll hasta abajo
        },
        deep: true
    }
  }
}
</script>

<style>

</style>
