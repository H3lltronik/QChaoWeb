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
                                  <b-form-input size="sm" type="text" placeholder="Tags separados por coma" v-model="tags"/>
                                </b-col>
                                <b-col class="mt-2">
                                  <b-button size="sm" variant="primary" block @click="onPickFile">Elegir imagenes</b-button>
                                  <input type="file" ref="fileInput" style="display: none;" accept="image/*" multiple @change="onFilePicked">
                                </b-col>
                                <b-col class="mt-2">
                                  <b-button size="sm" variant="success" block>Publicar</b-button>
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
    }
  },
  methods: {
    onPickFile () {
        this.$refs.fileInput.click()
    },
    onFilePicked (event) {
        this.imagenes = this.$refs.fileInput.files
        console.log("Imagenes", this.imagenes)
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
        tags: this.tags
      }
      this.$store.dispatch('crearEvento', evento)
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
