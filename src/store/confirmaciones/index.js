/* eslint-disable */
import axios from 'axios'
import router from '../../router'

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
      loadConfirmaciones ({commit}) {
          axios.post('http://localhost/Qchao/conexiones/administracion/getConfirmaciones.php').then(response => {
              let confirmaciones = response.data.confirmaciones
              if (response.data.status.includes('OK')) {
                  commit('setConfirmaciones', confirmaciones)
                  console.log('confirmaciones', confirmaciones)
              }
          }).catch(error => {
              console.log(error)
          })
      },
      confirmarTaller ({commit}, idTaller) {
          let formData = new FormData ()
          formData.set('idTaller', idTaller)
          axios.post('http://localhost/Qchao/conexiones/administracion/confirmarTaller.php', formData).then(response => {
              let confirmaciones = response.data.confirmaciones
              if (response.data.status.includes('OK')) {
                  alert('Taller verificado!')
                  commit('quitarConfirmado', idTaller)
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
