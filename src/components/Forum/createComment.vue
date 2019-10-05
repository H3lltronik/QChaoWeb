<template>
    <div class="row mb-4">
      <div class="col-10">
        <div class="form-group">
          <textarea v-model="comentario" placeholder="Comentario..." class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          <!-- hola {{editar}} -->
        </div>
      </div>
      <div class="col-2 d-flex flex-column justify-content-between ali">
        <div class="row my-auto">
          <button class="btn btn-primary btn-block" @click="onPickFile">Imagen</button>
          <input type="file" ref="fileInput" style="display: none;" accept="image/*" @change="onFilePicked">
        </div>
        <div class="row my-auto">
          <div class="col-12 m-0 p-0" v-if="!editando">
            <button class="btn btn-primary btn-block" @click="comentar ()">
              {{btnText}}
            </button>
          </div>

          <div class="col-10 m-0 p-0" v-if="editando">
            <button class="btn btn-primary btn-block" @click="editarHilo ()">
              {{btnText}}
            </button>
          </div>

          <div class="col-2 m-0 p-0 d-flex" v-if="editando" @click="cancelEditar ()">
            <button class="btn btn-danger btn-sm my-auto">x</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    // Via props obtenemos el objeto que se vaya a editar, por default es null asi que  si es null ps no hay objeto por editar xd
    editar: {
      type: Object,
      default: null,
    }
  },
  data () {
    return {
      comentario: '',
      idPost: null,
      file: null,
      btnText: 'Comentar'
    }
  },
  created () {
    this.idPost = this.$route.params.idPost
  },
  methods: {
    onPickFile () {
        this.$refs.fileInput.click()
    },
    onFilePicked () {
        this.file = this.$refs.fileInput.files[0];
    },
    comentar () {
      if (!this.comentario.length > 0) {
        alert('Ingrese un comentario')
        return
      }
      let payload = {
        idPost: this.idPost,
        imagen: this.file,
        comentario: this.comentario,
        idUsuario: this.usuario.idUsuario,
      }
      this.$store.dispatch('crearHilo', payload)
    },
    cancelEditar () {
      this.btnText = 'Comentar'
      this.comentario = ''
      this.$emit('cancelEdit')
    },
    editarHilo () {
      let payload = {
        idHilo: this.editar.idHilo,
        imagen: this.file,
        comentario: this.comentario,
      }
      this.$store.dispatch('editarHilo', payload)
    }
  },
  computed: {
    ...mapGetters({
        usuario: 'getUsuario',
    }),
    editando () {
      return (this.btnText == 'Editar')
    }
  },
  watch: {
    // Wachamos el prop editar, si su valor cambio es porque hay algo que debemos editar...
    editar: {
        handler: function(newValue) {
          if (newValue == null) {
            return
          }
            console.log("Hay algo por editar", newValue)
            this.comentario = newValue.texto
            this.btnText = 'Editar'

            window.scrollTo(0,document.body.scrollHeight);  // Scroll hasta abajo
        },
        deep: true
    }
  }
}
</script>

<style>

</style>
