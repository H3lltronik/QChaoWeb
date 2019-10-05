/* eslint-disable */
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import * as firebase from 'firebase'
// Es bien culero tener que incluir icono por icono, que feo
//http://materialdesignicons.com/
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
import ExitRun from 'vue-material-design-icons/ExitRun.vue'
import ContactMail from 'vue-material-design-icons/ContactMail.vue'
import Information from 'vue-material-design-icons/Information.vue'
import Computer from 'vue-material-design-icons/Laptop.vue'
import Alert from 'vue-material-design-icons/Alert.vue'
import ShieldCheck from 'vue-material-design-icons/ShieldCheck.vue'
import Check from 'vue-material-design-icons/Check.vue'
import Close from 'vue-material-design-icons/Close.vue'
import Edit from 'vue-material-design-icons/Pencil.vue'

import moment from 'moment'

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
import Comentar from './components/Contenidos/comentar.vue';
import CrearShitpost from './components/Contenidos/shitpost/nuevoShitpost.vue';
import ConfirmsComponent from './components/Administracion/confirmsComponent.vue';
import PerfilComponent from './components/Perfil/perfil.vue';
import CrearThread from './components/Forum/createThread.vue';

// Reportes
import ReporteComponent from './components/Administracion/reportes/reporte.vue';

import TallerBase from './components/Contenidos/talleres/tallerBase.vue';

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-material-design-icons/styles.css';
import router from './router';
import { store } from './store'
import { VueTags } from 'vue-tags-component';

// Milagrosa esta madre
// https://www.npmjs.com/package/browser-detect
import browser from 'browser-detect';


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.component('vue-tags', VueTags);

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
Vue.component('comentario-ver', Comentario);
Vue.component('comentario-comentar', Comentar);
Vue.component('nuevo-shitpost', CrearShitpost);
Vue.component('taller-base', TallerBase);
Vue.component('confirms-component', ConfirmsComponent);
Vue.component('reporte-component', ReporteComponent);
Vue.component('perfil-component', PerfilComponent);
Vue.component('create-thread-component', CrearThread);

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
Vue.component('exitrun-icon', ExitRun);
Vue.component('contactmail-icon', ContactMail);
Vue.component('information-icon', Information);
Vue.component('computer-icon', Computer);
Vue.component('alert-icon', Alert);
Vue.component('shieldcheck-icon', ShieldCheck);
Vue.component('check-icon', Check);
Vue.component('close-icon', Close);
Vue.component('edit-icon', Edit);

Vue.prototype.moment = moment

var config = {
  apiKey: "AIzaSyCcSRwPdU0EoscZJeR83nFRmTsCNrxWtuk",
  authDomain: "qchao-4bb0f.firebaseapp.com",
  databaseURL: "https://qchao-4bb0f.firebaseio.com",
  projectId: "qchao-4bb0f",
  storageBucket: "qchao-4bb0f.appspot.com",
  messagingSenderId: "181613745010"
};
firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    const result = browser();
    console.log("Browser ", result);
    // store.dispatch('loadTags')

    // alert(this.moment(1556359328 * 1000).format('lll'))
    // var encrypted = CryptoJS.AES.encrypt("Pito", "Madokita");
    // console.log("Encriptado", encrypted)
    // var decrypted = CryptoJS.AES.decrypt(encrypted, "Madokita");
    // console.log("Desencriptado", decrypted)
    // console.log("Hecho texto", decrypted.toString(CryptoJS.enc.Utf8))

    // console.log("Random", this.generateToken(25))

    if (typeof(Storage) !== undefined){
      if (localStorage.getItem("token")) {
        let token = JSON.parse(localStorage.getItem("token"))
        store.dispatch('autoLogin', token)
      }
    }
  },
  // methods: {
  //   generateToken(n) {
  //       var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //       var token = '';
  //       for(var i = 0; i < n; i++) {
  //           token += chars[Math.floor(Math.random() * chars.length)];
  //       }
  //       return token;
  //   }
  // },
}).$mount('#app');
