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
                                  <div>Titulo</div>
                                  <b-form-input size="sm" type="text" placeholder="Nombre del taller" v-model="nombre"/>
                                </b-col>
                                <b-col md="12" class="mt-2">
                                  <div>Descripcion</div>
                                  <b-form-textarea size="sm" no-resize rows="3" type="text" v-model="descripcion"
                                  placeholder="Descripcion del taller"/>
                                </b-col>
                                <b-col md="6" class="mt-2">
                                  <div>Domiclio</div>
                                  <b-form-input size="sm" type="text" placeholder="Domicilio" v-model="domicilio"/>
                                </b-col>
                                <b-col md="6" class="mt-2">
                                  <div>Horario</div>
                                  <b-form-input size="sm" type="text" placeholder="Horarios" v-model="horarios"/>
                                </b-col>
                               <b-col md="6" class="mt-2">
                                 <div>Ciudad</div>
                                  <b-form-input size="sm" type="text" placeholder="Ciudad" v-model="ciudad"/>
                               </b-col>
                               <b-col md="6" class="mt-2">
                                 <div>Contacto</div>
                                  <b-form-input size="sm" type="number" placeholder="Contacto" v-model="contacto"/>
                               </b-col>
                                <b-col md="12" class="mt-2">
                                  <div>Tags</div>
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
                                  <div>Tipo de soporte</div>
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
                                    <span style="font-size: 8pt;">Se remplazaran a las anteriores</span>
                                  <b-button size="sm" variant="primary" block @click="onPickFile">Elegir imagenes</b-button>
                                  <input type="file" ref="fileInput" style="display: none;" accept="image/*" multiple @change="onFilePicked">
                                </b-col>
                                <b-col class="mt-2">
                                  <b-button size="sm" variant="success" block @click="editarSoporte ()">Editar</b-button>
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
            idEstablecimiento: '',
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
        // Cargar el taller a editar
        let taller = this.tallerAEditar
        // Si es null
        if (!taller.idUsuario) {
            alert('No se selecciono ningun taller')
            this.$router.push('/') // Volver a la pagina principal
        }

        this.$store.dispatch('loadTags').then(res => {
            console.log(res)
            this.allTags = res
        })

        // Llenar los demas campos con la informacio existente del taller
        this.nombre = taller.Nombre
        this.descripcion = taller.Descripcion
        this.domicilio = taller.Domicilio
        this.horarios = taller.horario
        this.ciudad = taller.Ciudad
        this.activeTags = taller.tags
        this.contacto = taller.Contacto
        this.tipo = taller.tipoEstablecimiento
        this.idEstablecimiento = taller.idEstablecimiento

        console.log("El taller a editar", taller)
    },
    methods: {
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            this.imagenes = this.$refs.fileInput.files
        },
        editarSoporte () {
            let taller = {
            idEstablecimiento: this.idEstablecimiento,
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
        this.$store.dispatch('editarSoporte', taller)
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
        tallerAEditar () {
            return this.$store.getters.getTallerAEditar
        }
    }
}
</script>
