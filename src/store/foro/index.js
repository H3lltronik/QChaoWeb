/* eslint-disable */
import axios from 'axios'
import router from '../../router'
import * as firebase from 'firebase'

export default({
  state: {
      posts: [],
      post: {}
  },
  mutations: {
    setPosts (state, payload) {
      state.posts = payload
    },
    addPosts (state, payload) {
      state.posts.push(payload)
    },
    setPost (state, payload) {
      state.post = payload
    },
  },
  actions: {
    cargarPosts ({commit, getters}) {
      let urlBase = getters.getUrlBase

      axios.post(urlBase + 'conexiones/contenido/foros/getPosts.php').then(response => {
        if (response.data.status.includes('OK')) {
          commit('setPosts', response.data.posts)
        } else {
          alert("Error al cargar los posts")
        }
      }).catch(error => {

      })
    },
    cargarPost ({commit, getters}, idPost) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      formData.set('idPost', idPost)

      axios.post(urlBase + 'conexiones/contenido/foros/getPost.php', formData).then(response => {
        if (response.data.status.includes('OK')) {
          commit('setPost', response.data.post)
        } else {
          alert("Error al cargar los posts")
        }
      }).catch(error => {

      })
    },
    crearPost ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase

      let formData = new FormData ()
      formData.set('idUsuario', payload.idUsuario)
      formData.set('tema', payload.tema)
      formData.set('urgente', payload.urgente)

      axios.post(urlBase + 'conexiones/contenido/foros/crearPost.php', formData).then(response => {
        if (response.data.status.includes('OK')) {
          alert('Post creado')
          commit('addPosts', payload)
        } else {
          alert("Error al crear el post")
        }
      }).catch(error => {
        alert('Error al crear el post', error)
      })
    },
    crearHilo ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase

      let formData = new FormData ()
      formData.set('idUsuario', payload.idUsuario)
      formData.set('tema', payload.tema)
      formData.set('urgente', payload.urgente)

      axios.post(urlBase + 'conexiones/contenido/foros/crearPost.php', formData).then(response => {
        if (response.data.status.includes('OK')) {
          alert('Post creado')
          commit('addPosts', payload)
        } else {
          alert("Error al crear el post")
        }
      }).catch(error => {
        alert('Error al crear el post', error)
      })
    }
  },
  getters: {
    getPosts (state) {
      return state.posts.reverse()
    },
    getPost (state) {
      return state.post
    }
  }
})
