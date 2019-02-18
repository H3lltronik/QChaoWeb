import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router'

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
