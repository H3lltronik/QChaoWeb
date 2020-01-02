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
          <input type="text" value="URGENTEE" class="form-control" aria-label="URGENTE" disabled="false">
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

    <div class="col-12">
      <div class="row justify-content-start">
        <div class="col-auto mt-1 ml-n2">
          <!-- https://www.npmjs.com/package/vue-tags-component -->
          <vue-tags class="mx-auto my-auto mt-3"
              style="z-index: 10;"
              :active="activeTags"
              :max-height="100"
              :all="allTags"
              :element-count-for-start-arrow-scrolling="1"
              :tab-index="2"
              :tag-creation-enabled="true"
              :colors-enabled="false"
              :tag-color-default="'green'"
              :tag-list-label="'Seleccione sus tags'"
              :placeholder="'Seleccione sus tags'"
              @on-tag-added="onTagAdded"
              @on-tag-removed="onTagRemoved"
              @on-tag-list-opened="onTagListOpened"
              @on-tag-list-closed="onTagListClosed"
              @on-tag-created="onTagCreated"/>
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
      allTags: [],
      activeTags: [],
    }
  },
  created () {
      this.$store.dispatch('loadTags').then(res => {
          console.log(res)
          this.allTags = res
      })
  },
  methods: {
    publicar () {
      if (!this.tema.length > 0) {
        alert ('Ingrese un tema')
        return
      }

      let payload = {
        idUsuario: this.usuario.idUsuario,
        tags: this.generateTags(),
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
    },
    generateTags () {
        let aux = []
        this.activeTags.forEach(element => {
            aux.push(JSON.stringify(element))
        });
        return aux
    },
    onPickFile () {
        this.$refs.fileInput.click()
    },
    onFilePicked () {
        this.file = this.$refs.fileInput.files[0];
    },
    onTagAdded ($event) {
        this.activeTags.push($event)
    },
    onTagRemoved ($event) {
        console.log('removed', $event)
        let index = this.activeTags.map(function(e) { return e.id; }).indexOf($event.id);
        this.activeTags.splice(index, 1)
    },
    onTagListOpened ($event) {
        console.log("Open", $event)
    },
    onTagListClosed ($event) {

    },
    onTagCreated ($event) {
        console.log($event)

        let aux = {...$event}
        aux.id = this.numeroRandom(1, 500)
        this.allTags.push(aux)
    },
    numeroRandom (min, max) {
        return Math.floor(Math.random() * (+max - +min)) + +min;
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
  .tags__list {
    max-height: 500px;
    overflow-y: auto;
  }
</style>
