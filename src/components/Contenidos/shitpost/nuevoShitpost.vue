<template>
    <b-card class="mt-5" align="left">
        <b-row>
            <b-col md="12">
                <b-form-textarea size="sm" no-resize rows="3" v-model="descripcion"
                type="text" placeholder="Descripcion de tu publicacion" :maxLength="300"/>
            </b-col>
            <b-col md="12" class="mt-2">
                <b-row>
                    <div class="col-auto">
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
                    <div class="col-auto my-auto">
                        <b-button variant="primary" block @click="onPickFile" size="sm">Seleccionar</b-button>
                        <input type="file" ref="fileInput" style="display: none;" :accept="accept[type]+'/*'" @change="onFilePicked">
                    </div>
                    <div class="col-auto my-auto">
                            <b-form-radio-group buttons v-model="type" :options="options" size="sm"/>
                    </div>
                </b-row>
                <b-row>
                    <b-col class="mt-2">
                        <b-button variant="success" block @click="publicar">Subir</b-button>
                    </b-col>
                </b-row>
                Seleccionado: {{file? file.name:''}}
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            type: '1',
            options: [
                { text: 'Video', value: 0},
                { text: 'Imagen', value: 1}
            ],
            accept: ['video', 'image'],
            file: null,
            descripcion: null,
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
            let publicacion = {
                tags: this.generateTags(),
                file: this.file,
                descripcion: this.descripcion,
                idUsuario: this.usuario.idUsuario,
                nombreUsuario: this.usuario.nickname
            }
            if (this.file) {
              console.log("PUBLICACION WEON", publicacion)
                this.$store.dispatch('publicarShitpost', publicacion)
            } else {
                alert("Favor de elegir un archivo")
            }
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
        }
    }
}
</script>
