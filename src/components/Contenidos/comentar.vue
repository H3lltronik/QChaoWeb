<template>
    <b-row>
        <div class="col-auto">
            <img class="" height="40"
                :src="imagen" alt="">
        </div>
        <div class="my-auto pl-4 col-auto" style="flex: 1">
            <!-- De esta forma de alinean y juntan un boton y un input -->
            <div class="input-group">
                <b-form-input size="sm" type="text" placeholder="Escribe un comentario"
                    v-model="comentario"/>
                <span class="input-group-btn">
                    <b-button size="sm" type="submit" @click="comentar">Comentar</b-button>
                </span>
            </div>
        </div>

    </b-row>
</template>

<script>
export default {
    props: {
        idUsuario: {
            type: String,
            default: ''
        },
        idShitpost: {
            type: String,
            default: ''
        },
        nombre: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            comentario: ''
        }
    },
    computed: {
        imagen () {
            let urlBase = this.$store.getters.getUrlBase
            return urlBase + 'media/usuarios/' + this.idUsuario + '.jpg'
        }
    },
    methods: {
        comentar () {
          if (this.comentario.length <= 0) {
            alert("Favor de ingresar algun texto")
            return
          }

            let comentario = {
                idUsuario: this.idUsuario,
                idShitpost: this.idShitpost,
                comentario: this.comentario,
                nombre: this.nombre,
            }
            this.$store.dispatch('comentar', comentario)

            this.comentario = ""
        }
    }
}
</script>
