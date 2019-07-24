<template>
    <div>
        <navbar-component></navbar-component>
        <b-container fluid class="mt-5">
            <b-row>
                <b-col sm="12" class="mx-auto">
                    <b-row>
                        <b-col md="9">
                            <b-card class="mt-5 chatBox" align="left" id="chatContainer">
                                <!-- Mensjaes:{{mensajes}} <br>
                                Selected: {{selectedChat}} <br>-->
                                <!-- Active: {{activeChat}} <br>  -->
                                <b-row class="mt-3 mx-2 flex-nowrap" v-for="(mensaje, index) in mensajes" :key="index">
                                        <b-col v-if="mensaje.idUsuario != usuario.idUsuario">
                                            <img class="mx-auto" height="50" width="50"
                                            :src="imgGen(mensaje.idUsuario)" alt="">
                                            <small class="text-muted text-center mt-1" style="font-size: 8pt;">
                                                <div v-if="mensaje.idUsuario == activeChat.idRemitente">Remitente</div> <div v-else>Destino</div>
                                            </small>
                                        </b-col>
                                        <!-- De esta forma de alinean y juntan un boton y un input -->
                                        <div class="input-group">
                                            <b-form-textarea size="sm" no-resize rows="3"
                                            :disabled="true" type="text" :value="mensaje.mensaje"/>
                                        </div>
                                        <b-col v-if="mensaje.idUsuario == usuario.idUsuario">
                                            <img class="mx-auto" height="50" width="50"
                                            :src="imgGen(mensaje.idUsuario)" alt="">
                                            <small class="text-muted text-center mt-1" style="font-size: 8pt;">
                                                <div v-if="mensaje.idUsuario == activeChat.idRemitente">Remitente</div> <div v-else>Destino</div>
                                            </small>
                                        </b-col>
                                </b-row>
                            </b-card>
                            <b-row class="my-3" style=" width: 100%;">
                                <b-col md="12">
                                    <hr class="my-3">
                                </b-col>
                                <b-col md="12">
                                    <div class="input-group">
                                        <b-form-input autocomplete="off" size="sm" type="text" placeholder="Escribe un comentario" 
                                            v-model="mensajeUsuario"/>
                                        <span class="input-group-btn">
                                            <b-button size="sm" type="submit" @click="enviarMensaje">Enviar</b-button>
                                        </span>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                        <b-col md="3">
                            <b-card class="mt-5" align="left">
                                <b-row class="chatsBox">
                                    <b-col>
                                        <b-list-group>
                                            <b-list-group-item v-for="(item, index) in chats" :key="index"
                                            style="cursor: pointer;"
                                            @click="setActive(item)" :active="item.idChat == activeChat.idChat"
                                            class="d-flex justify-content-between align-items-center">
                                                {{item.nombreOtro}}
                                            </b-list-group-item>
                                        </b-list-group>
                                    </b-col>
                                </b-row>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            selectedChat: '1',
            mensajeUsuario: '',
            initialChat: false,
            idChatRoute: null,
        }
    },
    created () {
        this.idChatRoute = this.$route.params.idChat
    },
    methods: {
        imgGen (idUsuario) {
            let urlBase = this.$store.getters.getUrlBase
            return urlBase + "media/usuarios/" + idUsuario + ".jpg"
        },
        enviarMensaje () {
            
            let idDestino = this.activeChat.idDestino
            if (idDestino == this.usuario.idUsuario) {
                idDestino = this.activeChat.idRemitente
            }

            let payload = {
                idChat: this.activeChat.idChat,
                mensaje: {
                    mensaje: this.mensajeUsuario,
                    idUsuario: this.usuario.idUsuario,
                    idDestino: idDestino, // Para notificaciones
                    nickname: this.usuario.nickname // Tambien para notificaciones
                },
            }
            console.log("MENSAJE ENVIADO: ", payload)
            console.log("CHAT ACTIVO: ", this.activeChat)
            this.$store.dispatch('enviarMensaje', payload).then(res => {
                this.mensajeUsuario = ''
                this.scrollAlFondo(0)
            })
        },
        setActive (chat) {
            this.selectedChat = chat.idChat
            this.$store.dispatch('loadMensajes', chat.idChat).then(res => {
                this.scrollAlFondo(400)
            })
        },
        scrollAlFondo (timer) {
            setTimeout(() => {
                    // Mandar al fondo el scroll
                var container = this.$el.querySelector("#chatContainer");
                container.scrollTop = container.scrollHeight;
                // Le tuve que poner 200ms porque no lo mandaba hasta abajo sin el, solo hasta el penultimo mensaje
            }, timer);
        }
    },
    computed: {
        ...mapGetters({
            chats: 'getChats',
            mensajes: 'getMensajes',
        }),
        usuario () {
            let user = this.$store.getters.getUsuario
            return user
        },
        activeChat () {
            let aux = this.chats.find(auxFind => {
                return auxFind.idChat == this.selectedChat
            })
            if (aux) {
                console.log("El uno")
                return aux
            } else {
                if (!this.initialChat && this.chats[0]) {
                    this.$store.dispatch('loadMensajes', this.chats[0].idChat)
                    this.initialChat = true
                    // Si se le paso el id del chat ps se carga ese
                    if (this.idChatRoute) {
                        console.log("ID chat proporcionada", this.idChatRoute)
                        // Buscar el chat con ese ID
                        let auxChat = this.chats.find(auxFind => {
                            return auxFind.idChat == this.idChatRoute
                        })
                        console.log("Chat encontrado", auxChat)
                        // Y ps asignarlo
                        this.selectedChat = auxChat.idChat
                        this.setActive(auxChat)
                        return auxChat
                    } else {
                        this.selectedChat = this.chats[0].idChat
                        console.log("Sin ID chat")
                        return this.chats[0]
                    }
                } else {
                    return []
                }
            }
        },
    },
    watch: {
        mensajes: {
            handler: function (val, oldVal) {
                this.scrollAlFondo (0)
            },
        deep: true
        },
  },
}
</script>

<style>
    .card-body{
        padding-left: 0px;
        padding-right: 0px;
    }
    .noPadding {
        padding: 0px !important;
    }
    .chatBox {
        overflow-x: hidden;
        height: 70vh;
    }
    .chatsBox {
        overflow-x: hidden;
        height: 75vh;
    }
</style>