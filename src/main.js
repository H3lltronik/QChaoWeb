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
// Custom components
import ShitpostBase from './components/shitpostBase.vue';
import LeftAside from './components/leftAside.vue';
import RightAside from './components/rightAside.vue';
import NavBar from './components/Common/navBar.vue';

import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vue-material-design-icons/styles.css';
import router from './router';


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

//Componentes
Vue.component('shitpost-base', ShitpostBase);
Vue.component('left-aside', LeftAside);
Vue.component('right-aside', RightAside);
Vue.component('navbar-component', NavBar);

//Iconos
Vue.component('menu-icon', Settings);
Vue.component('account-icon', Account);
Vue.component('message-icon', Message);
Vue.component('alertbox-icon', AlertBox);
Vue.component('thumbup-icon', ThumbUp);
Vue.component('comment-icon', Comment);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
