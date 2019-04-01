/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';

import Register from './components/register.vue';
import MainPage from './components/mainPage.vue';
import MainForum from './components/Forum/mainForum.vue';
import MainEvents from './components/Eventos/eventsMain.vue';
import MenuConfig from './components/Configuracion/configBase.vue';
import VerPerfil from './components/Perfil/verPerfil.vue';
import CrearEventos from './components/Contenidos/eventos/crearEvento.vue';
import CrearTaller from './components/Contenidos/talleres/crearTaller.vue';
import MainTalleres from './components/Contenidos/talleres/talleresMain.vue';
import MainMensajes from './components/Contenidos/mensajes/mensajesMain.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/forum',
      name: 'Foro',
      component: MainForum,
    },
    {
      path: '/events',
      name: 'Eventos',
      component: MainEvents,
    },
    {
      path: '/configuracionPerfil',
      name: 'Configuracion',
      component: MenuConfig,
    },
    {
      path: '/perfil/:idPerfil',
      name: 'Ver Perfil',
      component: VerPerfil,
    },
    {
      path: '/crearEventos',
      name: 'Crear eventos',
      component: CrearEventos,
    },
    {
      path: '/crearTaller',
      name: 'Crear Talleres',
      component: CrearTaller,
    },
    {
      path: '/soporte',
      name: 'Soporte',
      component: MainTalleres,
    },
    {
      path: '/mensajes',
      name: 'Mensajes',
      component: MainMensajes,
    },
  ],
});
