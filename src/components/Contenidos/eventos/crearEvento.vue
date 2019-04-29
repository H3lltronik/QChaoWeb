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
                            <b-col md="12">
                              <b-row>
                                <b-col md="12" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="Nombre del evento" v-model="nombre"/>
                                </b-col>
                                <b-col md="12" class="mt-2">
                                  <b-form-textarea size="sm" no-resize rows="3" type="text" v-model="descripcion"
                                  placeholder="Descripcion del evento"/>
                                </b-col>
                                <b-col md="6" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="Domicilio" v-model="domicilio"/>
                                </b-col>
                                <b-col md="3" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="aaaa/mm/dd" v-model="fecha"/>
                                </b-col>
                                <b-col md="3" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="$ Entrada" v-model="entrada"/>
                                </b-col>
                               <b-col md="6" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="Ciudad" v-model="ciudad"/>
                               </b-col>
                                <b-col md="6" class="mt-2">
                                  <vue-tags class="mx-auto my-auto mt-3"
                                    style="z-index: 10;"
                                    :active="activeTags"
                                    :all="allTags"
                                    :element-count-for-start-arrow-scrolling="3"
                                    :tab-index="1"
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
                                </b-col>
                                <b-col class="mt-2">
                                  <b-button size="sm" variant="primary" block @click="onPickFile">Elegir imagenes</b-button>
                                  <input type="file" ref="fileInput" style="display: none;" accept="image/*" multiple @change="onFilePicked">
                                </b-col>
                                <b-col class="mt-2">
                                  <b-button size="sm" variant="success" block @click="crearEvento">Publicar</b-button>
                                </b-col>
                                <b-col md="12">
                                  Seleccionados:
                                  <div v-for="(item, index) in imagenes" :key="index">
                                    {{item.name}}
                                  </div>
                                </b-col>
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
      imagenes: [],
      nombre: '',
      descripcion: '',
      domicilio: '',
      fecha: '',
      entrada: '',
      ciudad: '',
      tags: '',
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
    onPickFile () {
        this.$refs.fileInput.click()
    },
    onFilePicked (event) {
        this.imagenes = this.$refs.fileInput.files
    },
    crearEvento () {
      let evento = {
        idUsuario: this.usuario.idUsuario,
        imagenes: this.imagenes,
        nombre: this.nombre,
        descripcion: this.descripcion,
        domicilio: this.domicilio,
        fecha: this.fecha,
        entrada: this.entrada,
        ciudad: this.ciudad,
        tags: this.generateTags()
      }
      this.$store.dispatch('crearEvento', evento)
    },
    generateTags () {
        let aux = []
        this.activeTags.forEach(element => {
            aux.push(JSON.stringify(element))
        });
        return aux
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
        }
    }
}
</script>
