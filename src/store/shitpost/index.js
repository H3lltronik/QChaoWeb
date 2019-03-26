/* eslint-disable */
import axios from 'axios'
import router from '../../router'

export default({
    state: {
        publicaciones: []
    },
    mutations: {
        setPublicaciones (state, payload) {
            state.publicaciones = payload
        }
    },
    actions: {
        loadShitpost ({commit}) {
            axios.post('http://localhost/QChao/conexiones/contenido/shitpost/getAllShitpost.php').then(response => {
                let contenidos = response.data.contenido
                console.log("Contenidos", contenidos)
                commit('setPublicaciones', contenidos)
            })
        }
    },
    getters: {
        getShitpost (state) {
            return state.publicaciones
        }
    }
})
