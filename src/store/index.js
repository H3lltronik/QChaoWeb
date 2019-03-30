/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import User from './user'
import Shitpost from './shitpost'
import Shared from './shared'
import Eventos from './eventos'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        user: User,
        shitpost: Shitpost,
        shared: Shared,
        eventos: Eventos,
    }
})
