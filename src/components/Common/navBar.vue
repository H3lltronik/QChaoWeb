<template>
    <div>
        <!-- navbar es el componente de la barra de tareas que sale pegada en la parte de arriba -->
        <!-- El fixed="top" es para que se quede pegada arriba aunque baje por la pagina, siempre se muestra -->
        <b-navbar type="dark" variant="dark" fixed="top">
            <!-- navbar-bran es el componente para el logo o nombre que va en la barra de tareas de arriba -->
            <b-navbar-brand href="#" @click="goToRouter('')">QChaoWeb</b-navbar-brand>
            <!-- Los elementos del navbar se tiene que agrupar y separar por navbar-nav, en este caso
                el componente que tiene agrupado es un nav-form para la barra de busqueda-->
            <b-navbar-nav class="ml-auto">
                <b-nav-form>
                    <b-form-input size="sm" type="text" autocomplete="false" width="300" placeholder="Tags separados por espacio" v-model="tagsBuscar"/>
                    <b-button size="sm" @click="buscar">Buscar</b-button>
                </b-nav-form>
            </b-navbar-nav>
            <b-navbar-nav>
                <b-nav-item-dropdown text="Inicio" right>
                    <b-dropdown-item @click="goToRouter('forum')">
                        Foro
                    </b-dropdown-item>
                    <b-dropdown-item @click="goToRouter('')">
                        Inicio
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <!-- <b-nav-item>Tendencias</b-nav-item> -->

                <b-nav-item-dropdown text="Eventos" right >
                    <b-dropdown-item @click="goToRouter('crearEventos')" v-if="tipoUsuario != 'Normal' && hayUsuario && !bloqueado">
                        Crear evento
                    </b-dropdown-item>
                    <b-dropdown-item @click="goToRouter('events')">
                        Descubrir
                    </b-dropdown-item>
                    <b-dropdown-item  @click="goToRouter('misEventos')" v-if="tipoUsuario != 'Normal' && hayUsuario">
                        Mis eventos
                    </b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item-dropdown text="Soporte" right>
                    <b-dropdown-item  @click="goToRouter('crearTaller')" v-if="tipoUsuario != 'Normal' && hayUsuario && !bloqueado">
                        Crear soporte
                    </b-dropdown-item>
                    <b-dropdown-item  @click="goToRouter('soporte')">
                        Descubrir
                    </b-dropdown-item>
                    <b-dropdown-item  @click="goToRouter('miSoporte')" v-if="tipoUsuario != 'Normal' && hayUsuario">
                        Mi soporte
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown text="Administracion" right v-if="tipoUsuario == 'Administrador' && hayUsuario">
                    <b-dropdown-item  @click="goToRouter('administracion/notificaciones')">
                        Notificaciones
                    </b-dropdown-item>
                    <b-dropdown-item  @click="goToRouter('administracion/reportes')">
                        Reportes
                    </b-dropdown-item>
                    <b-dropdown-item  @click="goToRouter('administracion/confirmaciones')">
                        Confirmaciones
                    </b-dropdown-item>
                    <b-dropdown-item  @click="goToRouter('administracion/bloqueos')">
                        Bloqueos
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <!-- Iconos -->
                <b-nav-item>
                    <message-icon v-if="hayUsuario && !bloqueado" @click="goToRouter('mensajes')"/>
                </b-nav-item>
                <b-nav-item>
                    <alertbox-icon v-if="hayUsuario" @click="goToRouter('notificaciones')"/>
                </b-nav-item>
                <b-nav-item>
                    <account-icon @click="goToRouter('register')" v-if="!hayUsuario"/>
                    <exitrun-icon @click="logout" v-if="hayUsuario"/>
                </b-nav-item>
                <b-nav-item>
                    <menu-icon @click="goToRouter('configuracionPerfil')" v-if="hayUsuario"/>
                </b-nav-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tagsBuscar: '',
        }
    },
    methods: {
        goToRouter (route) {
            this.$router.push("/"+route)
        },
        logout () {
            this.$store.dispatch('logout')
        },
        buscar () {
            let tagsSeparados = this.tagsBuscar.split(' ')
            this.goToRouter('busqueda/' + JSON.stringify(tagsSeparados))
            // this.$store.dispatch('buscar', tagsSeparados)
        },
        separarTags (tags) {

        }
    },
    computed: {
        hayUsuario () {
            let user = this.$store.getters.getUsuario
            if (user.idUsuario)
                return true
            else
                return false
        },
        usuario () {
          return this.$store.getters.getUsuario
        },
        tipoUsuario () {
            if (!this.usuario)
                return 0
            let user = this.$store.getters.getUsuario
            return user.nombredetipo
        },
        bloqueado () {
          let bloqueoTimestamp = localStorage.getItem("bloqueoTimestamp")
          return (bloqueoTimestamp !== null)
        }
    }
}
</script>

<style>
</style>
