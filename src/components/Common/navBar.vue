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
                    <b-form-input size="sm" type="text" placeholder="Search" />
                    <b-button size="sm" type="submit">Buscar</b-button>
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
                <b-nav-item>Tendencias</b-nav-item>

                <b-nav-item v-if="tipoUsuario == 1" @click="goToRouter('events')">Eventos</b-nav-item>
                <b-nav-item-dropdown text="Eventos" right >
                    <b-dropdown-item @click="goToRouter('crearEventos')" v-if="tipoUsuario != 1">
                        Crear evento
                    </b-dropdown-item>
                    <b-dropdown-item @click="goToRouter('events')">
                        Descubrir
                    </b-dropdown-item>
                </b-nav-item-dropdown>

                <b-nav-item v-if="tipoUsuario == 1" @click="goToRouter('soporte')">Soporte</b-nav-item>
                <b-nav-item-dropdown text="Soporte" right>
                    <b-dropdown-item  @click="goToRouter('crearTaller')" v-if="tipoUsuario != 1">
                        Crear soporte
                    </b-dropdown-item>
                    <b-dropdown-item  @click="goToRouter('soporte')">
                        Descubrir
                    </b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item v-if="tipoUsuario != 1" @click="goToRouter('administracion')">Administracion</b-nav-item>
                <!-- Iconos -->
                <b-nav-item>
                    <message-icon v-if="hayUsuario" @click="goToRouter('mensajes')"/>
                </b-nav-item>
                <b-nav-item>
                    <alertbox-icon v-if="hayUsuario"/>
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

        }
    },
    methods: {
        goToRouter (route) {
            this.$router.push("/"+route)
        },
        logout () {
            this.$store.dispatch('logout')
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
            let user = this.$store.getters.getUsuario
            return user.idTipoDeCuenta
        }
    }
}
</script>

<style>
</style>
