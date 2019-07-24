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
import MiSoporte from './components/Contenidos/talleres/misTalleres.vue';
import VerificarTaller from './components/Contenidos/talleres/verificarTaller.vue';
import MainTalleres from './components/Contenidos/talleres/talleresMain.vue';
import MainMensajes from './components/Contenidos/mensajes/mensajesMain.vue';
import MainConfirmaciones from './components/Administracion/confirmaciones.vue';
import AdminNotificaciones from './components/Administracion/notificaciones.vue';
import AdminReportes from './components/Administracion/reportes/reportesMain.vue';
import AdminBloqueos from './components/Administracion/bloqueos/bloqueosMain.vue';
import UserNotificaciones from './components/Notificaciones/notificacionesMain.vue';
import EditarEvento from './components/Eventos/editarEvento.vue';
import EditarTaller from './components/Contenidos/talleres/editarTaller.vue';
import MisEventos from './components/Eventos/misEventos.vue';
import Busqueda from './components/Contenidos/busqueda.vue';

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
    {
      path: '/mensajes/:idChat',
      name: 'Mensajes',
      component: MainMensajes,
    },
    {
      path: '/miSoporte',
      name: 'Mi Soporte',
      component: MiSoporte,
    },
    {
      path: '/verificarTaller/:idTaller',
      name: 'Mi Soporte',
      component: VerificarTaller,
    },
    {
      path: '/administracion/confirmaciones',
      name: 'Confirmaciones',
      component: MainConfirmaciones,
    },
    {
      path: '/administracion/confirmaciones/:idVerificacion',
      name: 'Confirmaciones',
      component: MainConfirmaciones,
    },
    {
      path: '/administracion/notificaciones',
      name: 'Administrador Notificaciones',
      component: AdminNotificaciones,
    },
    {
      path: '/administracion/reportes',
      name: 'Administrador Reportes',
      component: AdminReportes,
    },
    {
      path: '/administracion/reportes/:idReporte',
      name: 'Administrador Reportes',
      component: AdminReportes,
    },
    {
      path: '/administracion/bloqueos',
      name: 'Administrador Bloqueos',
      component: AdminBloqueos,
    },
    {
      path: '/notificaciones',
      name: 'Notificaciones Usuario',
      component: UserNotificaciones,
    },
    {
      path: '/busqueda/:tags',
      name: 'Busqueda de contenido',
      component: Busqueda,
    },
    {
      path: '/editarEvento/',
      name: 'Editar evento',
      component: EditarEvento,
    },
    {
      path: '/misEventos/',
      name: 'Eventos',
      component: MisEventos,
    },
    {
      path: '/editarTaller/',
      name: 'Editar taller',
      component: EditarTaller,
    },
  ],
});
