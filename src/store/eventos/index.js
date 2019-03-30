/* eslint-disable */
export default({
  state: {
    eventos: [],
  },
  mutations: {
    setEventos (state, eventos) {

    }
  },
  actions: {
    crearEvento ({commit}, payload) {
      let formData = new FormData ()
      formData.append('idUsuario', payload.idUsuario)
      formData.append('imagenes', JSON.stringify(payload.imagenes))
      formData.append('nombre', payload.nombre)
      formData.append('descripcion', payload.descripcion)
      formData.append('domicilio', payload.domicilio)
      formData.append('fecha', payload.fecha)
      formData.append('entrada', payload.entrada)
      formData.append('ciudad', payload.ciudad)
      formData.append('tags', JSON.stringify(payload.tags))

    }
  },
  getters: {
  }
})
