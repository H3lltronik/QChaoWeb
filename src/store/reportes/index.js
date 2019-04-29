/* eslint-disable */
import axios from 'axios'
import moment from 'moment'
import router from '../../router'
import * as firebase from 'firebase'

export default({
  state: {
      reportes: [],
  },
  mutations: {
      setReportes (state, payload) {
          state.reportes = payload
      },
      quitarReporte (state, idReporte) {
          let index = state.reportes.map(function(e) { return e.idReporte; }).indexOf(idReporte);
          state.reportes.splice(index, 1)
      }
  },
  actions: {
      loadReportes ({commit}) {
          axios.post('http://localhost/Qchao/conexiones/administracion/reportes/getAllReportes.php').then(response => {
              let data = response.data
              if (data.status.includes('OK')) {
                  commit('setReportes', data.reportes)
              } else {
                  alert('Error al obtener los reportes')
              }
          }).catch(error => {
              console.log("Error al generar reporte", error)
          })
      },
      generarReporte ({commit}, payload) {
          let formData = new FormData ()
          formData.set('mensaje', payload.mensaje)
          formData.set('contenido', JSON.stringify(payload.contenido))
          formData.set('idUsuario', payload.idUsuario)
          formData.set('tipo', payload.tipo)
          axios.post('http://localhost/Qchao/conexiones/administracion/reportes/generarReporte.php', formData).then(response => {
              let data = response.data
              if (data.status.includes('OK')) {
                  alert('Se ha generado el reporte')
                  // Despues del reporte generamos la notificacion
                  let notificacion = {
                    mensaje: 'Reporte: <i>' + payload.mensaje + '</i>',
                    timestamp: moment.now(),
                    idReporte: data.idReporte,
                    tipo: 'reporte'
                }
                firebase.database().ref('notificacionesAdmin/').push(notificacion).then(res => {
                    firebase.database().ref('notificacionesAdmin/' + res.key).child('idNotificacion').set(res.key)            
                })
              } else {
                  alert('Error al generar el reporte')
              }
          }).catch(error => {
              console.log("Error al generar reporte", error)
          })
      },
      borrarReporte ({commit}, idReporte) {
          let formData = new FormData ()
          formData.set('idReporte', idReporte)
          axios.post('http://localhost/Qchao/conexiones/administracion/reportes/borrarReporte.php', formData).then(response => {
              let data = response.data
              if (data.status.includes('OK')) {
                //   alert('Se ha eliminado el reporte')
                  commit('quitarReporte', idReporte)
              } else {
                  alert('Error al eliminar el reporte')
              }
          }).catch(error => {
              console.log("Error al generar reporte", error)
          })
      },
      borrarReportes ({commit, getters, dispatch}, idUsuario) {
          let reportes = getters.getReportes
          reportes.forEach(element => {
              if (element.idUsuario == idUsuario) {
                  console.log(element, idUsuario)
                  dispatch('borrarReporte', element.idReporte)
              }
          });
      }
  },
  getters: {
      getReportes (state) {
          return state.reportes.reverse()
      }
  }
})
