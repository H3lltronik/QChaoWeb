/* eslint-disable */
import axios from 'axios'
import router from '../../router'
import * as firebase from 'firebase'

export default({
  state: {
      confirmaciones: []
  },
  mutations: {
      setConfirmaciones (state, payload) {
          state.confirmaciones = payload
      },
      quitarConfirmado (state, idTaller) {
          let index = state.confirmaciones.map(function(e) { return e.idTaller; }).indexOf(idTaller);
          state.confirmaciones.splice(index, 1)
      }
  },
  actions: {
      loadConfirmaciones ({commit, getters}) {
          let urlBase = getters.getUrlBase
          axios.post(urlBase + 'conexiones/administracion/getConfirmaciones.php').then(response => {
              let confirmaciones = response.data.confirmaciones
              if (response.data.status.includes('OK')) {
                  commit('setConfirmaciones', confirmaciones)
                  console.log('confirmaciones', confirmaciones)
              }
          }).catch(error => {
              console.log(error)
          })
      },
      confirmarTaller ({commit, getters}, payload) {
          let urlBase = getters.getUrlBase
          let formData = new FormData ()
          formData.set('idTaller', payload.idTaller)

          axios.post(urlBase + 'conexiones/administracion/confirmarTaller.php', formData).then(response => {
              let confirmaciones = response.data.confirmaciones
              if (response.data.status.includes('OK')) {
                  // Obtenemos de firebase la id de la notificacion de esta solicidtus de verificacion para borrarla
                  firebase.database().ref('notificacionesAdmin/').orderByChild("idVerificacion").equalTo(payload.idVerificacion).once('value', snapshot => {
                      let returnArr = []; // Array para obtener el resultado de firebase aunque sea solo un elemento
                      snapshot.forEach(childSnapshot => {
                          let item = childSnapshot.val();
                          item.key = childSnapshot.key;
                          returnArr.push(item);
                      });
                      if (returnArr[0].idNotificacion != null)
                      // Esto es para poder borrar la notificacion de la confirmacion
                      firebase.database().ref('notificacionesAdmin/' + returnArr[0].idNotificacion).remove().then(res => {
                          alert('Taller verificado!')
                          commit('quitarConfirmado', idTaller)
                      })
                  })
              }
          }).catch(error => {
              console.log("Error al confirmar", error)
          })
      }
  },
  getters: {
      getConfirmaciones (state) {
          return state.confirmaciones
      }
  }
})
