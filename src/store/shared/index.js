/* eslint-disable */
export default({
    state: {
        urlBase: 'http://192.168.0.85/QChao/',
        loading: false
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        }
    },
    actions: {
    },
    getters: {
        getLoading (state) {
            return state.loading
        },
        urlBase (state) {
            return state.urlBase
        }
    }
})
