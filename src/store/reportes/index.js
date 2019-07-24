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
      loadReportes ({commit, getters}) {
          let urlBase = getters.getUrlBase
          axios.post(urlBase + 'conexiones/administracion/reportes/getAllReportes.php').then(response => {
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
      generarReporte ({commit, getters}, payload) {
          let urlBase = getters.getUrlBase
          let formData = new FormData ()
          formData.set('mensaje', payload.mensaje)
          formData.set('contenido', JSON.stringify(payload.contenido))
          formData.set('idUsuario', payload.idUsuario)
          formData.set('tipo', payload.tipo)
          axios.post(urlBase + 'conexiones/administracion/reportes/generarReporte.php', formData).then(response => {
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
      borrarReporte ({commit, getters}, idReporte) {
          let urlBase = getters.getUrlBase
          let formData = new FormData ()
          formData.set('idReporte', idReporte)
          axios.post(urlBase + 'conexiones/administracion/reportes/borrarReporte.php', formData).then(response => {
              let data = response.data
              if (data.status.includes('OK')) {
                //   alert('Se ha eliminado el reporte')
                  commit('quitarReporte', idReporte)

                  // Obtenemos de firebase la id de la notificacion de esta solicidtus de reporte para borrarla
                  firebase.database().ref('notificacionesAdmin/').orderByChild("idReporte").equalTo(idReporte).once('value', snapshot => {
                      let returnArr = []; // Array para obtener el resultado de firebase aunque sea solo un elemento
                      snapshot.forEach(childSnapshot => {
                          let item = childSnapshot.val();
                          item.key = childSnapshot.key;
                          returnArr.push(item);
                      });
                      if (returnArr[0].idNotificacion != null)
                      // Esto es para poder borrar la notificacion de la confirmacion
                      firebase.database().ref('notificacionesAdmin/' + returnArr[0].idNotificacion).remove().then(res => {
                      })
                  })

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
