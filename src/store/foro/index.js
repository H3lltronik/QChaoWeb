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
    addHilo (state, payload) {
      state.post.hilos.push(payload)
    }
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
          // http://localhost/Qchao/media/hilos/ee576a6cf5.jpg
          // Preparar las imagenes con la url del sitio
          let hilos = response.data.post.hilos
          if (hilos) {
            hilos.forEach(hilo => {
              if (hilo.imagen)
                hilo.imagen = urlBase + hilo.imagen
            });
          }

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
      formData.append('idUsuario', payload.idUsuario)
      formData.append('tema', payload.tema)
      formData.append('tags', JSON.stringify(payload.tags));
      formData.append('urgente', payload.urgente)

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
    editarPost ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase

      let formData = new FormData ()
      formData.set('idPost', payload.idPost)
      formData.set('tema', payload.tema)
      formData.set('urgente', payload.urgente)

      axios.post(urlBase + 'conexiones/contenido/foros/editarPost.php', formData).then(response => {
        if (response.data.status.includes('OK')) {
          alert('Post Editado')
          window.location.reload()
        } else {
          alert("Error al editado el post")
        }
      }).catch(error => {
        alert('Error al editado el post', error)
      })
    },
    deleteHilo ({commit, getters}, idHilo) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      formData.set('idHilo', idHilo)

      axios.post(urlBase + 'conexiones/contenido/foros/borrarHilo.php', formData).then(response => {
        if (response.data.status.includes('OK')) {
          alert('Hilo borrado')
          window.location.reload()
        } else {
          alert("Error al borrar el hilo")
        }
      }).catch(error => {
        alert('Error al borrar el hilo', error)
      })
    },
    crearHilo ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase

      let formData = new FormData ()
      formData.set('idUsuario', payload.idUsuario)
      formData.set('idPost', payload.idPost)
      formData.set('file', payload.imagen)
      formData.set('texto', payload.comentario)

      axios.post(urlBase + 'conexiones/contenido/foros/crearHilo.php', formData).then(response => {
        if (response.data.status.includes('OK')) {
          alert('Comentario creado')
          window.location.reload()

        } else {
          alert("Error al crear el hilo")
        }
      }).catch(error => {
        alert('Error al crear el hilo', error)
      })
    },
    editarHilo ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase

      let formData = new FormData ()
      formData.set('idHilo', payload.idHilo)
      formData.set('file', payload.imagen)
      formData.set('texto', payload.comentario)

      axios.post(urlBase + 'conexiones/contenido/foros/editarHilo.php', formData).then(response => {
        if (response.data.status.includes('OK')) {
          alert('Comentario editado')
          window.location.reload()

        } else {
          alert("Error al editar el hilo")
        }
      }).catch(error => {
        alert('Error al editar el hilo', error)
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
