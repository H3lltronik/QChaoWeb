/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import User from './user'
import Shitpost from './shitpost'
import Shared from './shared'
import Eventos from './eventos'
import Talleres from './talleres'
import Chats from './chats'
import Confirmaciones from './confirmaciones'
import Notificaciones from './notificaciones'
import Reportes from './reportes'
import Bloqueos from './bloqueos'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        user: User,
        shitpost: Shitpost,
        shared: Shared,
        eventos: Eventos,
        talleres: Talleres,
        chats: Chats,
        confirmaciones: Confirmaciones,
        reportes: Reportes,
        bloqueos: Bloqueos,
        notificaciones: Notificaciones,
    }
})
