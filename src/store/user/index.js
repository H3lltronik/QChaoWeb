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
                    commit('setUsuario', response.data.user)
                    router.push('/')
                }
            })
        }
    },
    getters: {
    }
})
