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
                                  <b-form-input size="sm" type="text" placeholder="Tags separados por coma" v-model="tags"/>
                                </b-col>
                                <b-col md="6" class="mt-2">
                                  <b-form-input size="sm" type="text" placeholder="Contacto" v-model="contacto"/>
                               </b-col>
                                <b-col md="6" class="mt-2">
                                    <b-dropdown text="Tipo de establecimiento" class="mx-5" v-model="tipo" block size="sm">
                                        <b-dropdown-item value="Refaccionaria" @click="selectTipo('Refaccionaria')">
                                            Refaccionaria
                                        </b-dropdown-item>
                                        <b-dropdown-item value="Taller"  @click="selectTipo('Taller')">
                                            Taller
                                        </b-dropdown-item>
                                    </b-dropdown>
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
        }
    },
    methods: {
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            this.imagenes = this.$refs.fileInput.files
        },
        crearSoporte () {
            let taller = {
            idUsuario: this.usuario.idUsuario,
            imagenes: this.imagenes,
            nombre: this.nombre,
            descripcion: this.descripcion,
            domicilio: this.domicilio,
            contacto: this.contacto,
            horario: this.horarios,
            ciudad: this.ciudad,
            tags: this.tags,
            tipo: this.tipo,
        }
        this.$store.dispatch('crearSoporte', taller)
        },
        selectTipo (tipo) {
            this.tipo = tipo
        },
    },
    computed: {
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        }
    }
}
</script>