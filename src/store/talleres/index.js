/* eslint-disable */
import axios from 'axios'
import moment from 'moment'
import router from '../../router'
import * as firebase from 'firebase'

export default({
  state: {
      talleres: [],
      talleresUsuario: [],
      talleresAux: [],
      tallerAEditar: {},
  },
  mutations: {
      setTalleres (state, talleres) {
        state.talleres = talleres
      },
        setTalleresUsuario (state, talleres) {
        state.talleresUsuario = talleres
      },
      setTalleresAux (state, payload) {
        state.talleresAux = payload
      },
      setTallerAEditar (state, payload) {
        state.tallerAEditar = payload
      }
  },
  actions: {
    crearSoporte ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase
        let formData = new FormData ()
        let imagenes = payload.imagenes
        formData.append('idUsuario', payload.idUsuario)
        formData.append('nombre', payload.nombre)
        formData.append('descripcion', payload.descripcion)
        formData.append('domicilio', payload.domicilio)
        formData.append('contacto', payload.contacto)
        formData.append('horario', payload.horario)
        formData.append('ciudad', payload.ciudad)
        formData.append('tipo', payload.tipo)
        formData.append('tags', JSON.stringify(payload.tags))

        for(let i = 0; i < imagenes.length; i++) {
            formData.append('imagen_'+i, imagenes[i])
        }

        axios.post(urlBase + 'conexiones/contenido/talleres/crearTaller.php', formData,
        {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
          console.log("Debug", response.data)
            if (response.data.status.includes('OK')) {
            alert('SE HA CREADO EL TALLER')
            router.push('/')
            } else
            alert('HUBO UN ERROR AL CREAR EL TALLER')
        }).catch(error => {
            console.log(error)
        })
    },
    calificarTaller ({commit, getters}, taller) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      formData.set('idUsuario', taller.idUsuario)
      formData.set('idEstablecimiento', taller.idEstablecimiento)
      formData.set('calificacion', taller.calificacion)
      axios.post(urlBase + 'conexiones/contenido/talleres/puntuarTaller.php', formData).then(response => {
        console.log('Puntuar', response.data)
        if (response.data.status.includes('OK')){
          alert(response.data.response)
        } else {
          alert('ERROR AL REGISTRAR LA CALIFICACION')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    editarSoporte ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase
        let formData = new FormData ()
        let imagenes = payload.imagenes
        formData.append('idEstablecimiento', payload.idEstablecimiento)
        formData.append('nombre', payload.nombre)
        formData.append('descripcion', payload.descripcion)
        formData.append('domicilio', payload.domicilio)
        formData.append('contacto', payload.contacto)
        formData.append('horario', payload.horario)
        formData.append('ciudad', payload.ciudad)
        formData.append('tipo', payload.tipo)
        formData.append('tags', JSON.stringify(payload.tags))

        for(let i = 0; i < imagenes.length; i++) {
            formData.append('imagen_'+i, imagenes[i])
        }

        axios.post(urlBase + 'conexiones/contenido/talleres/editarTaller.php', formData,
        {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
          console.log("Debug", response.data)
            if (response.data.status.includes('OK')) {
            alert('SE HA EDITADO EL TALLER')
            } else
            alert('HUBO UN ERROR AL EDITAR EL TALLER')
        }).catch(error => {
            console.log(error)
        })
    },
    cargarTalleres ({commit, getters}) {
      let urlBase = getters.getUrlBase
      axios.post(urlBase + 'conexiones/contenido/talleres/getAllTalleres.php').then(response => {
        let talleres = response.data.talleres
        if (response.data.status.includes('OK')) {
          commit('setTalleres', talleres)
          console.log('talleres', talleres)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    cargarLastTalleres ({commit, getters}) {
      let urlBase = getters.getUrlBase
      axios.post(urlBase + 'conexiones/contenido/talleres/getLastsTalleres.php').then(response => {
        let talleres = response.data.talleres
        if (response.data.status.includes('OK')) {
          commit('setTalleres', talleres)
          console.log('talleres', talleres)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    eliminarTaller ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase

      let formData = new FormData ()
      formData.set('idEstablecimiento', payload.idEstablecimiento)

      axios.post(urlBase + 'conexiones/contenido/talleres/eliminarTaller.php', formData).then(response => {
        if (response.data.status.includes('OK')) {
          alert("Taller Eliminado")
          window.location.reload()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadTalleresUsuario ({commit, getters}, idUsuario) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      formData.set('idUsuario', idUsuario)
      console.log("idUsuario STORE", idUsuario)
      axios.post(urlBase + 'conexiones/usuario/talleres/getTalleresUsuario.php', formData).then(response => {
        let data = response.data
        console.log("Mi soporte", data)
        if (data.status.includes('OK')) {
          commit('setTalleresUsuario', data.talleres)
        }
      }).catch(error => {
        console.log("Error Talleres usuario", error)
      })
    },
    solicitarVerficicacion ({commit, getters}, payload) {
      let urlBase = getters.getUrlBase
      let formData = new FormData ()
      let imagenes = payload.imagenes
      formData.append('idTaller', payload.idTaller)
      formData.append('idUsuario', payload.idUsuario)
      formData.append('nombre', payload.nombre)
      formData.append('rol', payload.rol)
      formData.append('ubicacion', payload.ubicacion)
      formData.append('domicilio', payload.domicilio)

      for(let i = 0; i < imagenes.length; i++) {
        formData.append('imagen_'+i, imagenes[i])
      }

      axios.post(urlBase + 'conexiones/usuario/talleres/solicitarVerificacion.php', formData,
      {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
        let data = response.data
        console.log("Data", data)
        if (data.status.includes('OK')) {
          alert('Se solicito la verificacion')
          // Se hace la notificacion para el admin
          let notificacion = {
              mensaje: 'Confirmacion: <strong>' + payload.nombre + '</strong> ha solicitado verificacion',
              timestamp: moment.now(),
              idVerificacion: data.idVerificacion,
              tipo: 'verificacion'
          }
          firebase.database().ref('notificacionesAdmin/').push(notificacion).then(res => {
              firebase.database().ref('notificacionesAdmin/' + res.key).child('idNotificacion').set(res.key)
          })

        }  else {
          alert('Hubo un error la solicitar la verficicacion')
        }
      }).catch(error => {
        console.log("Error verificacion taller", error)
      })
    },
    loadTalleresAux ({commit, getters}) {
      let urlBase = getters.getUrlBase
      axios.post(urlBase + 'conexiones/administracion/getTalleresSinConfirmar.php').then(response => {
        let data = response.data
        if (data.status.includes('OK')) {
          commit('setTalleresAux', data.talleres)
        }
      }).catch(error => {
        console.log("Error Talleres aux", error)
      })
    }
  },
  getters: {
      getTalleres (state) {
          return state.talleres.reverse()
      },
      getTalleresUsuario (state) {
          return state.talleresUsuario.reverse()
      },
      getTalleresAux (state) {
        return state.talleresAux
      },
      getTallerAEditar (state) {
        return state.tallerAEditar
      }
  }
})
