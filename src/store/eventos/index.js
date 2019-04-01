/* eslint-disable */
import axios from 'axios'
import router from '../../router'

export default({
  state: {
    eventos: [],
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
    }
  },
  actions: {
    crearEvento ({commit}, payload) {
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

      axios.post('http://localhost/QChao/conexiones/contenido/eventos/crearEvento.php', formData, 
      {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        if (response.data.status.includes('OK')) {
          alert('SE HA CREADO EL EVENTO')
        } else 
          alert('HUBO UN ERROR AL CREAR EL EVENTO')
      }).catch(error => {
        console.log(error)
      })
    },
    cargarEventos ({commit}) {
      axios.post('http://localhost/QChao/conexiones/contenido/eventos/getAllEventos.php').then(response => {
        let eventos = response.data.eventos
        if (response.data.status.includes('OK')) {
          commit('setEventos', eventos)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    calificarEvento ({commit}, evento) {
      let formData = new FormData ()
      formData.set('idUsuario', evento.idUsuario)
      formData.set('idEvento', evento.idEvento)
      formData.set('calificacion', evento.calificacion)
      axios.post('http://localhost/QChao/conexiones/contenido/eventos/puntuarEvento.php', formData).then(response => {
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
    registrarAsistencia ({commit}, evento) {
      let formData = new FormData ()
      formData.set('idUsuario', evento.idUsuario)
      formData.set('idEvento', evento.idEvento)

      axios.post('http://localhost/QChao/conexiones/contenido/eventos/registrarAsistencia.php', formData).then(response => {
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
    }
  },
  getters: {
    getEventos (state) {
      return state.eventos
    }
  }
})
