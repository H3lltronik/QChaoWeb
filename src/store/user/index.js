/* eslint-disable */
import axios from 'axios'
import moment from 'moment'
import router from '../../router'
// Milagrosa esta madre
// https://www.npmjs.com/package/browser-detect
import browser from 'browser-detect';

export default({
    state: {
        user: {},
        sesiones: [],
        otroPerfil: {},
    },
    mutations: {
        setUsuario (state, payload) {
            state.user = payload
        },
        removeUser (state) {
            state.user = {}
        },
        setOtroPerfil (state, perfil) {
          state.otroPerfil = perfil
        },
        setSesiones (state, payload) {
          state.sesiones = payload
        },
        quitarSesion (state, payload) {
          let index = state.sesiones.map(function(e) { return e.idSesion; }).indexOf(payload.idSesion);
          state.sesiones.splice(index, 1)
        }
    },
    actions: {
        async loadSesiones ({commit, getters}) {
          let user = getters.getUsuario
          console.log("loadSesiones", user)
          let formData = new FormData()

          if (!user) {
            return
          }

          formData.set('idUsuario', user.idUsuario)
          await axios.post('http://localhost/QChao/conexiones/usuario/getSesiones.php', formData).then(response => {
            let data = response.data
            if (data.status.includes('OK')) {
              commit('setSesiones', data.sesiones)
            } else {
            }
          }).catch(error => {

          })
        },
        cerrarSesion ({commit, getters}, sesion) {
          let formData = new FormData()
          formData.set('sesionToken', sesion.sesionToken)
          axios.post('http://localhost/Qchao/conexiones/usuario/cerrarSesiones.php', formData).then(res => {
              alert('Se han cerrado las sesiones')
              commit ('quitarSesion', sesion)
          })
        },
        loginUser ({commit, getters, dispatch}, loginAccount) {
            let formData = new FormData()
            let token = getters.generateToken
            let result = browser();
            result.name = result.name.charAt(0).toUpperCase() + result.name.slice(1);

            formData.set('nombre', loginAccount.username)
            formData.set('password', loginAccount.password)
            formData.set('token', token)
            formData.set('browser', JSON.stringify(result))

            axios.post('http://localhost/QChao/conexiones/usuario/login.php', formData).then(response => {
                console.log(response.data)
                if (response.data.status == 'OK') {
                    let usuario = response.data.user
                    usuario.token = token
                    // Asignar al objeto usuario el "token" de su sesion
                    console.log('Usuario logged', usuario)
                    commit('setUsuario', usuario)
                    dispatch('loadSesiones')
                    dispatch('loadChatsInfo')

                    // Guardar el usuario en las cookies
                    if (typeof(Storage) !== undefined){
                        localStorage.setItem("token", JSON.stringify(usuario.token))
                    } else {
                        console.log("No soporta localStorage")
                    }

                    router.push('/')
                } else if (response.data.status == 'BLOQUEADO') {
                  let timestamp = Number(response.data.timestamp)
                  alert("Timestamp " + timestamp)
                  let fecha = moment(timestamp * 1000).format('lll')
                  alert('USUARIO BLOQUEADO HASTA ' + fecha)
                }
            })
        },
        autoLogin ({commit, dispatch, getters}, token) {
          console.log('Autologin')
          let formData = new FormData()
          formData.set('token', token)

          axios.post('http://localhost/Qchao/conexiones/usuario/loginByToken.php', formData).then(response => {
            let data = response.data
            if (data.status.includes('OK')) {
              commit('setUsuario', data.user)
              dispatch('loadSesiones')
              dispatch('loadChatsInfo')
            } else {
              console.log("Error autologin", data)
            }
          }).catch(error => {
            console.log("Catch autologin", error)
          })
        },
        cambiarImagen ({commit}, payload) {

        },
        logout ({commit, getters}) {
          let token = getters.getUsuario.token
          let formData = new FormData()
          formData.set('token', token)

          axios.post('http://localhost/Qchao/conexiones/usuario/logout.php', formData).then(response => {
            console.log("Debug cerar sesion", response.data)
            if (response.data.status.includes('OK')) {
              alert("Sesion cerrada")
              localStorage.removeItem("usuario")
              commit('removeUser')
              router.go(0)
            } else {
              alert("NO SE PUDO CERRAR LA SESION")
              console.log("Logout error: ", response.data)
            }
          }).catch(error => {
            console.log("Logout catch: ", error)
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
        getSesiones (state) {
            return state.sesiones
        },
        getOtroPerfil (state) {
          return state.otroPerfil
        },
        generateToken(state) {
            let n = 20
            var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var token = '';
            for(var i = 0; i < n; i++) {
                token += chars[Math.floor(Math.random() * chars.length)];
            }
            console.log("Token generado:", token)
            return token;
        }
    }
})
