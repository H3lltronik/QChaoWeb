/* eslint-disable */
import axios from 'axios'
import router from '../../router'

export default({
  state: {
    eventos: [],
    eventoAEditar: {}, // Aqui se guarda el evento al que se le dad click a editar
    eventosUsuario: []
  },
  mutations: {
    setEventos (state, eventos) {
      state.eventos = eventos
    },
    actualizaCalificacion (state, newCal) {

    },
    addAsistencia (state, currEvento) {
      let evento = state.eventos.find(auxFind => {
          return auxFind.idEvento == currEvento.idEvento
      })
      evento.asistentes++
    },
    removeAsistencia (state, currEvento) {
      let evento = state.eventos.find(auxFind => {
          return auxFind.idEvento == currEvento.idEvento
      })
      evento.asistentes--
    },
    setEditarEvento (state, evento) {
      state.eventoAEditar = evento
    },
    setEventosUsuario (state, payload) {
      state.eventosUsuario = payload
    }
  },
  actions: {
    crearEvento ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      let imagenes = payload.imagenes
      formData.append('idUsuario', payload.idUsuario)
      formData.append('nombre', payload.nombre)
      formData.append('descripcion', payload.descripcion)
      formData.append('domicilio', payload.domicilio)
      formData.append('fecha', payload.fecha)
      formData.append('entrada', payload.entrada)
      formData.append('ciudad', payload.ciudad)
      formData.append('tags', JSON.stringify(payload.tags))

      for(let i = 0; i < imagenes.length; i++) {
        formData.append('imagen_'+i, imagenes[i])
      }

      axios.post(urlBase + 'conexiones/contenido/eventos/crearEvento.php', formData,
      {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        if (response.data.status.includes('OK')) {
          alert('SE HA CREADO EL EVENTO')
          router.push('/')
        } else
          alert('HUBO UN ERROR AL CREAR EL EVENTO')
      }).catch(error => {
        console.log(error)
      })
    },
    cargarEventos ({commit, getters}) {
      let urlBase = getters.getUrlBase
      axios.post(urlBase + 'conexiones/contenido/eventos/getAllEventos.php').then(response => {
        let eventos = response.data.eventos
        if (response.data.status.includes('OK')) {
          console.log("Eventos", eventos)
          commit('setEventos', eventos)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    cargarLastEventos ({commit, getters}) {
      let urlBase = getters.getUrlBase
      axios.post(urlBase + 'conexiones/contenido/eventos/getLastsEventos.php').then(response => {
        let eventos = response.data.eventos
        if (response.data.status.includes('OK')) {
          console.log("Eventos", eventos)
          commit('setEventos', eventos)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    eliminarEvento ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase

      let formData = new FormData ()
      formData.set('idEvento', payload.idEvento)

      axios.post(urlBase + 'conexiones/contenido/eventos/eliminarEvento.php', formData).then(response => {
        if (response.data.status.includes('OK')) {
          alert("Evento Eliminado")
          // window.location.reload()
          router.push("events")
        }
      }).catch(error => {
        console.log(error)
      })
    },
    calificarEvento ({commit, getters}, evento) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      formData.set('idUsuario', evento.idUsuario)
      formData.set('idEvento', evento.idEvento)
      formData.set('calificacion', evento.calificacion)
      axios.post(urlBase + 'conexiones/contenido/eventos/puntuarEvento.php', formData).then(response => {
        console.log('Puntuar', response.data)
        if (response.data.status.includes('OK')){
          alert('SE REGISTRO LA CALIFICACION')
        } else {
          alert('ERROR AL REGISTRAR LA CALIFICACION')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    registrarAsistencia ({commit, getters}, evento) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      formData.set('idUsuario', evento.idUsuario)
      formData.set('idEvento', evento.idEvento)

      axios.post(urlBase + 'conexiones/contenido/eventos/registrarAsistencia.php', formData).then(response => {
        console.log('Puntuar', response.data)
        if (response.data.status.includes('OK')){
          alert(response.data.response)
          if (response.data.type.includes('add')) {
            commit('addAsistencia', evento)
          } else if (response.data.type.includes('remove')){
            commit('removeAsistencia', evento)
          }
        } else {
          alert(response.data.response)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadEventosUsuario ({commit, getters}, idUsuario) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      formData.set('idUsuario', idUsuario)
      axios.post(urlBase + 'conexiones/contenido/eventos/getEventosUsuario.php', formData).then(response => {
        let data = response.data
        if (data.status.includes('OK')) {
          commit('setEventosUsuario', data.eventos)
        }
      }).catch(error => {
        console.log("Error Eventos usuario", error)
      })
    },
    editarEvento ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      let imagenes = payload.imagenes
      formData.append('idEvento', payload.idEvento)
      formData.append('nombre', payload.nombre)
      formData.append('descripcion', payload.descripcion)
      formData.append('domicilio', payload.domicilio)
      formData.append('fecha', payload.fecha)
      formData.append('entrada', payload.entrada)
      formData.append('ciudad', payload.ciudad)
      formData.append('tags', JSON.stringify(payload.tags))

      for(let i = 0; i < imagenes.length; i++) {
        formData.append('imagen_'+i, imagenes[i])
      }

      axios.post(urlBase + 'conexiones/contenido/eventos/editarEvento.php', formData,
      {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        if (response.data.status.includes('OK')) {
          alert('SE HA EDITADO EL EVENTO')
          router.push("/events")
        } else
          alert('HUBO UN ERROR AL CREAR EL EVENTO')
      }).catch(error => {
        console.log(error)
      })
    }
  },
  getters: {
    getEventos (state) {
      return state.eventos.reverse()
    },
    getEditarEvento (state) {
      return state.eventoAEditar
    },
    getEventosUsuario (state) {
      return state.eventosUsuario.reverse()
    }
  }
})
