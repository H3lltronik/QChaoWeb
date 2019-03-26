<template>
    <b-row class="mt-3">
        <b-col md="1" class="">
            <b-row>
                <img class="mx-auto" height="40"
                :src="imagen" alt="">
            </b-row>
            <b-row>
                <small class="text-muted mt-1 text-center" style="font-size: 8pt;">
                    {{nickname}}
                </small>
            </b-row>
        </b-col>
        <b-col md="11" class="my-auto pl-4">
            <!-- De esta forma de alinean y juntan un boton y un input -->
            <div class="input-group">
                <b-form-textarea size="sm" no-resize rows="3"
                :disabled="true" type="text" :value="comentario"/>
            </div>
        </b-col>
        
    </b-row>
</template>

<script>
export default {
    props: {
        idUsuario: {
            type: String,
            default: 1
        },
        nickname: {
            type: String,
            default: ''
        },
        comentario: {
            type: String,
            default: ''
        }
    },
    data () {
        return {

        }
    },
    created () {
    },
    methods: {

    },
    computed: {
        imagen () {
            let urlBase = this.$store.getters.urlBase
            return urlBase + 'media/usuarios/' + this.idUsuario + '.jpg'
        }
    }
}
</script>

<style>
</style>