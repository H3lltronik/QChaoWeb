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
                      <b-card class="mt-5" align="left" v-if="usuario !== null && !bloqueado">
                        <b-row>
                            <b-col md="12">
                              <b-row>
                                <b-col md="12" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="Nombre del taller" v-model="nombre"/>
                                </b-col>
                                <b-col md="12" class="mt-2">
                                  <b-form-textarea size="sm" no-resize rows="3" type="text" v-model="descripcion"
                                  placeholder="Descripcion del taller"/>
                                </b-col>
                                <b-col md="6" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="Domicilio" v-model="domicilio"/>
                                </b-col>
                                <b-col md="6" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="Horarios" v-model="horarios"/>
                                </b-col>
                               <b-col md="6" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="Ciudad" v-model="ciudad"/>
                               </b-col>
                               <b-col md="6" class="mt-2">
                                  <b-form-input size="sm" type="number" placeholder="Contacto" v-model="contacto"/>
                               </b-col>
                                <b-col md="12" class="mt-2">
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
                                <b-col md="12" class="mt-2 d-flex">
                                    <b-row class="mx-auto">
                                      <b-dropdown text="Tipo de establecimiento" class="mx-5" v-model="tipo" block size="sm">
                                          <b-dropdown-item value="Refaccionaria" @click="selectTipo('Refaccionaria')">
                                              Refaccionaria
                                          </b-dropdown-item>
                                          <b-dropdown-item value="Taller"  @click="selectTipo('Taller')">
                                              Taller
                                          </b-dropdown-item>
                                      </b-dropdown>
                                    </b-row>
                                </b-col>
                                <b-col class="mt-2">
                                  <b-button size="sm" variant="primary" block @click="onPickFile">Elegir imagenes</b-button>
                                  <input type="file" ref="fileInput" style="display: none;" accept="image/*" multiple @change="onFilePicked">
                                </b-col>
                                <b-col class="mt-2">
                                  <b-button size="sm" variant="success" block @click="crearSoporte">Publicar</b-button>
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
            imagenes: '',
            nombre: '',
            descripcion: '',
            domicilio: '',
            horarios: '',
            ciudad: '',
            tags: '',
            contacto: '',
            tipo: '',
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
        crearSoporte () {

          let errors = [];
          let anyError = false;
          // chingos de if para verificacion
          if (this.imagenes.length <= 0) {
            errors.push("\nFavor de elegir una imagen");
            anyError = true;
          }
          if (this.nombre.length <= 0) {
            errors.push("\nFavor de ingresar un nombre");
            anyError = true;
          }
          if (this.descripcion.length <= 0) {
            errors.push("\nFavor de ingresar una descripcion");
            anyError = true;
          }
          if (this.domicilio.length <= 0) {
            errors.push("\nFavor de ingresar un domicilio");
            anyError = true;
          }
          if (this.contacto.length <= 0) {
            errors.push("\nFavor de ingresar una contacto");
            anyError = true;
          }
          if (this.horarios.length <= 0) {
            errors.push("\nFavor de ingresar una horarios");
            anyError = true;
          }
          if (this.ciudad.length <= 0) {
            errors.push("\nFavor de ingresar una ciudad");
            anyError = true;
          }
          if (this.tipo.length == null) {
            errors.push("\nFavor de elegir un tipo de establecimiento");
            anyError = true;
          }

          if (anyError) {
            alert("Favor de completar los campos: " + errors);
            return;
          }

            let taller = {
            idUsuario: this.usuario.idUsuario,
            imagenes: this.imagenes,
            nombre: this.nombre,
            descripcion: this.descripcion,
            domicilio: this.domicilio,
            contacto: this.contacto,
            horario: this.horarios,
            ciudad: this.ciudad,
            tags: this.generateTags(),
            tipo: this.tipo,
        }
        this.$store.dispatch('crearSoporte', taller)
        },
        selectTipo (tipo) {
            this.tipo = tipo
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
        },
        bloqueado () {
          let bloqueoTimestamp = localStorage.getItem("bloqueoTimestamp")
          return (bloqueoTimestamp !== null)
        }
    }
}
</script>
