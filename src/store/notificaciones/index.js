/* eslint-disable */
import axios from 'axios'
import * as firebase from 'firebase'
import router from '../../router'

export default({
  state: {
      adminNotificaciones: [
          {
              idNotificacion: '1',
              mensaje: 'Reporte: <i>Porque si</i>',
              idReporte: '26',
              tipo: 'reporte'
          },
          {
              idNotificacion: '2',
              mensaje: 'Confirmacion: <i>Porque si</i>',
              idVerificacion: '10',
              tipo: 'verificacion'
          },
      ],
      usuarioNotificaciones: [
      ]
  },
  mutations: {
      setUsuarioNotificaciones (state, payload) {
          state.usuarioNotificaciones = payload
      },
      setAdminNotificaciones (state, payload) {
          state.adminNotificaciones = payload
      }
  },
  actions: {
      loadUserNotificaciones ({commit, getters}) {
          let user = getters.getUsuario
          if (!user) {
              return
          }
          firebase.database().ref('notificacionesUsuario/' + user.idUsuario).on('value', snapshot =>{
              let returnArr = []; // Contiene los mensajes ya que mensajes es un arreglo
              snapshot.forEach(childSnapshot => {
                  let item = childSnapshot.val();
                  item.key = childSnapshot.key;
                  returnArr.push(item);
              });
              commit('setUsuarioNotificaciones', returnArr)
          })
      },
      loadAdminNotificaciones ({commit, getters}) {
          let user = getters.getUsuario
          if (!user) {
              return
          }
          firebase.database().ref('notificacionesAdmin/').on('value', snapshot =>{
              let returnArr = []; // Contiene los mensajes ya que mensajes es un arreglo
              snapshot.forEach(childSnapshot => {
                  let item = childSnapshot.val();
                  item.key = childSnapshot.key;
                  returnArr.push(item);
              });
              commit('setAdminNotificaciones', returnArr)
          })
      }
  },
  getters: {
      getAdminNotificaciones (state) {
          return state.adminNotificaciones
      },
      getUsuarioNotificaciones (state) {
          return state.usuarioNotificaciones.reverse()
      }
  }
})
