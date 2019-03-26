/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
// Es bien culero tener que incluir icono por icono, que feo
import Settings from 'vue-material-design-icons/Settings.vue'
import Account from 'vue-material-design-icons/Account.vue'
import Message from 'vue-material-design-icons/Message.vue'
import AlertBox from 'vue-material-design-icons/AlertBox.vue'
import ThumbUp from 'vue-material-design-icons/ThumbUp.vue'
import Comment from 'vue-material-design-icons/Comment.vue'
import Crosshairs from 'vue-material-design-icons/Crosshairs.vue'
import ClockOutline from 'vue-material-design-icons/ClockOutline.vue'
import TicketConfirmation from 'vue-material-design-icons/TicketConfirmation.vue'
import StarOutline from 'vue-material-design-icons/StarOutline.vue'

// Custom components
import ShitpostBase from './components/shitpostBase.vue';
import EventBase from './components/Eventos/eventBase.vue';
import LeftAside from './components/leftAside.vue';
import RightAside from './components/rightAside.vue';
import NavBar from './components/Common/navBar.vue';
import GeneralConfig from './components/Configuracion/configGeneral.vue';
import AnunciosConfig from './components/Configuracion/configAnuncios.vue';
import PersonalizacionConfig from './components/Configuracion/configPersonalizacion.vue';
import SeguridadConfig from './components/Configuracion/configSeguridad.vue';
import Comentario from './components/Contenidos/comentario.vue';

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-material-design-icons/styles.css';
import router from './router';
import { store } from './store'


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

//Componentes
Vue.component('shitpost-base', ShitpostBase);
Vue.component('left-aside', LeftAside);
Vue.component('right-aside', RightAside);
Vue.component('navbar-component', NavBar);
Vue.component('event-base', EventBase);
Vue.component('general-config', GeneralConfig);
Vue.component('anuncios-config', AnunciosConfig);
Vue.component('personalizacion-config', PersonalizacionConfig);
Vue.component('seguridad-config', SeguridadConfig);
Vue.component('comentario', Comentario);

//Iconos
Vue.component('menu-icon', Settings);
Vue.component('account-icon', Account);
Vue.component('message-icon', Message);
Vue.component('alertbox-icon', AlertBox);
Vue.component('thumbup-icon', ThumbUp);
Vue.component('comment-icon', Comment);
Vue.component('crosshairs-icon', Crosshairs);
Vue.component('clockoutline-icon', ClockOutline);
Vue.component('ticketconfirmation-icon', TicketConfirmation);
Vue.component('staroutline-icon', StarOutline);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
