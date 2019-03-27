/* eslint-disable */
import axios from 'axios'
import router from '../../router'

export default({
    state: {
        user: {}
    },
    mutations: {
        setUsuario (state, payload) {
            console.log('payload', payload)
            state.user = payload
        },
        removeUser (state) {
            state.user = {}
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
            alert("AutoLogin!")
            commit('setUsuario', currUser)
        },
        cambiarImagen ({commit}, payload) {
            
        },
        logout ({commit}) {
            alert("Sesion cerrada")
            localStorage.removeItem("usuario")
            commit('removeUser')
        }
    },
    getters: {
        getUsuario (state) {
            return state.user
        }
    }
})
