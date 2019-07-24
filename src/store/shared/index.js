/* eslint-disable */
import axios from 'axios'

export default({
    state: {
        urlBase: 'http://192.168.0.26/QChao/',
        loading: false,
        tags: [],
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        },
        setTags (state, payload) {
            state.tags = payload
        }
    },
    actions: {
        async loadTags ({commit, getters}) {
            let urlBase = getters.getUrlBase
            let tags = []
            await axios.post(urlBase + "conexiones/contenido/getAllTags.php").then(response => {
                let data = response.data
                if (data.status.includes('OK')) {
                    tags = data.tags
                    tags.forEach(element => {
                        let aux = element
                        aux.slug = element.name,
                        aux.color = "#963dff"
                    });

                    commit('setTags', tags)
                }
                
            }).catch(error => {
                console.log("Error al obtener los tags", error)
            })
            return tags
        },
        async buscar ({commit, getters}, tags) {
            let urlBase = getters.getUrlBase
            let formData = new FormData ()
            let busqueda = {}
            formData.set('tags', JSON.stringify(tags))
            await axios.post(urlBase + "conexiones/contenido/buscar.php", formData).then(response => {
                console.log("Debug", response.data)
                let data = response.data
                if (data.status.includes('OK')) {
                    // Completar url de las imagenes del shitpost
                    data.shitposts.forEach(element => {
                        element.imagen = urlBase + 'media/shitpost/' + element.imagen
                    });
                    // Hacer url de las imagenes del perfil de quien publico
                    data.shitposts.forEach(element => {
                        element.perfilImagen = urlBase + 'media/usuarios/' + element.idUsuario + '.jpg'
                    });

                    busqueda.shitpost = data.shitposts
                    busqueda.eventos = data.eventos
                    busqueda.talleres = data.talleres
                }
            })
            return busqueda
        }
    },
    getters: {
        getLoading (state) {
            return state.loading
        },
        getUrlBase (state) {
            return state.urlBase
        },
        getTags (state) {
            return state.tags
        }
    }
})
