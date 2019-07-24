/* eslint-disable */
import axios from 'axios'
import moment from 'moment'
import router from '../../router'

export default({
  state: {
      bloqueos: [],
  },
  mutations: {
      setBloqueos (state, payload) {
          state.bloqueos = payload
      }
  },
  actions: {
      async bloquearUsuario ({commit, dispatch, getters}, payload) {
          let urlBase = getters.getUrlBase
          let formData = new FormData ()
          formData.set('idUsuario', payload.idUsuario)
          formData.set('timestamp', (payload.timestamp / 1000))
          formData.set('dias', payload.dias)
          dispatch('borrarReportes', payload.idUsuario)
          await axios.post(urlBase + 'conexiones/administracion/bloqueos/bloquearUsuario.php', formData).then(response => {
              let data = response.data
              console.log("Debug", data)
              if (data.status.includes('OK')) {
                  alert(data.response)
                  alert('Se bloqueara al usuario por ' + payload.dias + ' dias\nFecha de liberacion: ' + moment(payload.timestamp).format('lll'))
              } else if (data.status.includes('ACTUALIZACION')) {
                  alert(data.response)
                //   alert('Se bloqueara al usuario por ' + payload.dias + ' dias mas\nFecha de liberacion: ' + moment(data.timestamp * 1000).format('lll'))
              } else {
                  alert(data.response)
              }
          }).catch(error => {
              console.log("Error al generar bloqueo", error)
          })
      },
      loadBloqueos ({commit, getters}) {
          let urlBase = getters.getUrlBase
          axios.post(urlBase + 'conexiones/administracion/bloqueos/getAllBloqueos.php').then(response => {
              let data = response.data
              console.log("Debug bloqueos", data)
              if (data.status.includes('OK')) {
                  let auxArray = []
                  data.bloqueos.forEach(element => {
                      // Formatear el timestamp para que salga la fecha en lugar del numero
                      element.timestampDesbloqueo = moment(element.timestampDesbloqueo * 1000).format('lll')
                      auxArray.push(element)
                  });
                  commit('setBloqueos', auxArray)
              } else {
                  alert(data.response)
              }
          }).catch(error => {
              console.log("Error al traer bloqueos", error)
          })
      }
  },
  getters: {
      getBloqueos (state) {
          return state.bloqueos
      }
  }
})
