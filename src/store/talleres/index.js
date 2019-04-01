/* eslint-disable */
import axios from 'axios'
import router from '../../router'

export default({
  state: {
      talleres: []
  },
  mutations: {
      setTalleres (state, talleres) {
        state.talleres = talleres
        },
  },
  actions: {
    crearSoporte ({commit}, payload) {
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

        axios.post('http://localhost/QChao/conexiones/contenido/talleres/crearTaller.php', formData, 
        {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
            if (response.data.status.includes('OK')) {
            alert('SE HA CREADO EL TALLER')
            } else 
            alert('HUBO UN ERROR AL CREAR EL TALLER')
        }).catch(error => {
            console.log(error)
        })
    },
    cargarTalleres ({commit}) {
      axios.post('http://localhost/QChao/conexiones/contenido/talleres/getAllTalleres.php').then(response => {
        let talleres = response.data.talleres
        if (response.data.status.includes('OK')) {
          commit('setTalleres', talleres)
          console.log('talleres', talleres)
        }
      }).catch(error => {
        console.log(error)
      })
    },
  },
  getters: {
      getTalleres (state) {
          return state.talleres
      }
  }
})
