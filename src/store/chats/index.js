/* eslint-disable */
import axios from 'axios'
import router from '../../router'
import moment from 'moment'
import * as firebase from 'firebase'

export default({
    state: {
        chats: [
            // {
            //     idChat: '1',
            //     idDestino: 11,
            //     idRemitente: 17,
            //     imgRemitente: "http://localhost/Qchao/media/usuarios/17.jpg",
            //     imgDestino: "http://localhost/Qchao/media/usuarios/11.jpg",
            //     mensajes: [
            //         {
            //             idUsuario: 17,
            //             mensaje: 'Presio'
            //         },
            //         {
            //             idUsuario: 11,
            //             mensaje: 'Hola joto'
            //         },
            //         {
            //             idUsuario: 11,
            //             mensaje: 'Saluda'
            //         },
            //         {
            //             idUsuario: 17,
            //             mensaje: 'Hola'
            //         },
            //         {
            //             idUsuario: 17,
            //             mensaje: 'Porque no te mueres?'
            //         },
            //         {
            //             idUsuario: 11,
            //             mensaje: 'Porque me gusta vivir'
            //         },
            //     ]
            // }
        ],
        mensajes: []
    },
    mutations: {
        addChat (state, chat) {
            state.chats.push(chat)
        },
        setChats (state, chats) {
            state.chats = chats
        },
        setMensajes (state, payload) {
            // Hice trampa xd
            /* Busca el chat con el idchat que se acaba de obtener y se elimina y se coloca el nuevo chat
                Que tiene lo mismo menos los mensajes */
            // let index = state.chats.map(function(e) { return e.idChat; }).indexOf(payload.idChat);
            // let newVal = state.chats[index]
            // newVal.mensajes = payload.mensajes
            // state.chats[index] = newVal
            // // state.chats.splice(index, 1)
            // // state.chats.push(newVal)
            
            // console.log("Mutation mensajes", state.chats, "El index", index)
            state.mensajes = payload
        },
    },
    actions: {
        crearChat ({commit, getters}, payload) {
            let formData = new FormData ()
            formData.set('idRemitente', payload.idRemitente)
            formData.set('idDestino', payload.idDestino)
            
            axios.post('http://localhost/Qchao/conexiones/usuario/chat/crearChat.php', formData).then(response => {
                let data = response.data
                if (data.status.includes('OK')) {
                    let idChat = data.idChat
                    let chat = {
                        idRemitente: payload.idRemitente,
                        idDestino: payload.idDestino,
                        idChat: idChat,
                    }
                    firebase.database().ref('chats/' + idChat).set(chat).then(res => {
                        alert('Chat creado')
                        commit('addChat', chat)
                        // Despues de crear el chat se crea la notificacion
                        let notificacion = {
                            mensaje: 'El usuario <strong>' + payload.nickname + '</strong> ha creado un chat contigo',
                            timestamp: moment.now(),
                            idChat: idChat,
                            tipo: 'chat'
                        }
                        firebase.database().ref('notificacionesUsuario/' + payload.idDestino).push(notificacion).then(res => {
                            firebase.database().ref('notificacionesUsuario/' + payload.idDestino + "/" + res.key).child('idNotificacion').set(res.key)       
                        })
                    })
                }
            })
        },
        loadChatsInfo ({commit, getters}) {
            if (!getters.getUsuario)
                return
                
            let idUsuario = getters.getUsuario.idUsuario
            let formData = new FormData ()

            formData.set('idRemitente', idUsuario)
            axios.post('http://localhost/Qchao/conexiones/usuario/chat/getAllMyChats.php', formData).then(response => {
                let data = response.data
                console.log("Chats data", data)
                if (data.status.includes('OK')) {
                    commit('setChats', data.chats)
                    console.log("Chats cargados", data)
                } else {
                    console.log("Error al cargar los chats")
                }
            }).catch(error => {
                console.log("Error al cargar los chats", error)
            })
        },
        async loadMensajes ({commit}, idChat) {
            // console.log("Cargar mensajes", idChat)
            await firebase.database().ref('chats/' + idChat + '/mensajes').on('value', snapshot => {
                let payload = ''
                let returnArr = []; // Contiene los mensajes ya que mensajes es un arreglo
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                console.log("Cargar mensajes", returnArr)
                commit('setMensajes', returnArr)
            })
        },
        async enviarMensaje ({commit}, payload) {
            await firebase.database().ref('chats/' + payload.idChat).child('mensajes').push(payload.mensaje).then(res => {
                // Despues de mandar el mensaje se crea la notificacion
                let notificacion = {
                    mensaje: 'El usuario <strong>' + payload.mensaje.nickname + '</strong> te ha enviado un mensaje',
                    timestamp: moment.now(),
                    idChat: payload.idChat,
                    tipo: 'mensaje'
                }
                firebase.database().ref('notificacionesUsuario/' + payload.mensaje.idDestino).push(notificacion).then(res => {
                    firebase.database().ref('notificacionesUsuario/' + payload.mensaje.idDestino + "/" + res.key).child('idNotificacion').set(res.key)            
                })
            })
        }
    },
    getters: {
        getChats (state) {
            return state.chats
        },
        getMensajes (state) {
            return state.mensajes
        }
    }
})
