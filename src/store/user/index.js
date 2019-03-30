/* eslint-disable */
import axios from 'axios'
import router from '../../router'

export default({
    state: {
        user: {},
        otroPerfil: {},
    },
    mutations: {
        setUsuario (state, payload) {
            console.log('payload', payload)
            state.user = payload
        },
        removeUser (state) {
            state.user = {}
        },
        setOtroPerfil (state, perfil) {
          state.otroPerfil = perfil
        }
    },
    actions: {
        loginUser ({commit}, loginAccount) {
            let formData = new FormData()

            formData.set('nombre', loginAccount.username)
            formData.set('password', loginAccount.password)

            axios.post('http://localhost/QChao/conexiones/usuario/login.php', formData).then(response => {
                alert(response.data.response)
                if (response.data.status == 'OK') {
                    let usuario = response.data.user
                    console.log('Usuario logged', usuario)
                    commit('setUsuario', usuario)
                    // Guardar el usuario en las cookies
                    if (typeof(Storage) !== undefined){
                        localStorage.setItem("usuario", JSON.stringify(usuario))
                    } else {
                        console.log("No soporta localStorage")
                    }

                    router.push('/')
                }
            })
        },
        autoLogin ({commit}, currUser) {
            // alert("AutoLogin!")
            commit('setUsuario', currUser)
        },
        cambiarImagen ({commit}, payload) {

        },
        logout ({commit}) {
            alert("Sesion cerrada")
            localStorage.removeItem("usuario")
            commit('removeUser')
        },
        enviarMensaje ({commit}, payload) {
          let mensaje = prompt("Ingrese su mensaje")
          let formData = new FormData ()
          formData.set('idRemitente', payload.idRemitente)
          formData.set('idDestino', payload.idDestino)
          formData.set('mensaje', mensaje)
          axios.post('http://localhost/QChao/conexiones/usuario/enviarMensaje.php', formData).then(response => {
            console.log(response.data)
            if (response.data.status.includes('OK')){
              alert("Se envio el mensaje correctamente ")
            } else {
              alert("Error al enviar el mensaje")
            }
          }).catch(error => {
            console.log(error)
          })
        },
        getPerfil ({commit}, idPerfil) {
          let formData = new FormData()
          formData.set('idUsuario', idPerfil)
          axios.post('http://localhost/QChao/conexiones/usuario/getUserProfile.php', formData).then(response => {
            if (response.data.status.includes('OK')) {
              response.data.usuario.imagen = 'http://localhost/QChao/media/usuarios/' + idPerfil + '.jpg'
              commit('setOtroPerfil', response.data.usuario)
            } else {
              alert("Error")
            }
          }).catch(error => {
            console.log(error)
          })
        },
        personalizarPerfil ({commit}, newData) {
          // T A G S P E N D I E N T E S
          let formData = new FormData ()

          if (newData.idUsuario)
            formData.append('idUsuario', newData.idUsuario)
          if (newData.descripcion)
            formData.append('descripcion', newData.descripcion)
          if (newData.imagen)
            formData.append('file', newData.imagen)
          if (newData.nickname)
            formData.append('nickname', newData.nickname)

            axios.post('http://localhost/QChao/conexiones/usuario/personalizar.php',
          formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
            console.log("Response", response.data.response)
            if (response.data.status.includes('OK')) {
              alert('SE HA ACTUALIZADO CORRECTAMENTE')
            } else {
              alert('HUBO UN ERROR AL ACTUALIZAR')
            }
          }).catch(error => {
            console.log(error)
          })
        }
    },
    getters: {
        getUsuario (state) {
            return state.user
        },
        getOtroPerfil (state) {
          return state.otroPerfil
        }
    }
})
