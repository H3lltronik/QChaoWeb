/* eslint-disable */
export default({
    state: {
        urlBase: 'http://localhost/QChao/',
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
