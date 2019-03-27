<template>
    <b-card class="mt-5" align="left">
        <b-row>
            <b-col md="12">
                <b-form-textarea size="sm" no-resize rows="3" v-model="descripcion"
                type="text" placeholder="Descripcion de tu publicacion"/>
            </b-col>
            <b-col md="12" class="mt-2">
                <b-row>
                    <b-col cols="3" xl="4">
                        <b-button variant="primary" block @click="onPickFile" size="sm">Seleccionar</b-button>
                        <input type="file" ref="fileInput" style="display: none;" :accept="accept[type]+'/*'" @change="onFilePicked">
                    </b-col>
                    <b-col cols="3" xl="3">
                            <b-form-radio-group buttons v-model="type" :options="options" size="sm"/>
                    </b-col>
                    <b-col cols="6" xl="5">
                        <b-form-input size="sm" type="text" placeholder="Tags separados por coma"
                        v-model="tags"/>
                    </b-col>
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
export default {
    data () {
        return {
            tags: null,
            type: '1',
            options: [
                { text: 'Video', value: 0},
                { text: 'Imagen', value: 1}
            ],
            accept: ['video', 'image'],
            file: null,
            descripcion: null,
        }
    },
    methods: {
        publicar () {
            let publicacion = {
                tags: this.generateTags(),
                file: this.file,
                descripcion: this.descripcion,
                idUsuario: this.usuario.idUsuario,
                nombreUsuario: this.usuario.Nombre
            }
            if (this.file) {
                this.$store.dispatch('publicarShitpost', publicacion)
                console.log(publicacion)
            } else {
                alert("Favor de elegir un archivo")
            }
        },
        generateTags () {
            let tags = this.tags
            if (tags !== null) {
                if (tags.length >= 2) {
                    tags = tags.replace(/\s/g, '');
                    return tags.split(",")
                } else {
                    return 'sin tags'
                }
            }
            return 'X'
        },
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked () {
            this.file = this.$refs.fileInput.files[0];
            console.log(this.file)
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