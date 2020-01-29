<template>
    <div class="background">
        <div class="transparencia">
            <div>
                <b-navbar type="dark" variant="dark" style="background-color: rgba(0,0,0,0.2) !important;">
                    <b-navbar-brand tag="h1" class="mb-0">
                        QChaoWeb!
                    </b-navbar-brand>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-item @click="goToRoute ('')" >Inicio</b-nav-item>
                    </b-navbar-nav>
                </b-navbar>
            </div>
            <div class="centrado">
                <b-card border-variant="dark" bg-variant="dark" header="Registrar"
                :title="instructions[stepCount]" v-if="!login"
                text-variant="white" class="text-center" header-border-variant="secondary">
                <!-- Step 1 -->
                <div v-if="step1" class="mt-2">
                    <b-input-group size="md" prepend="Usuario" class="mb-3">
                        <b-form-input v-model="newAccount.username" :maxLength="30"/>
                    </b-input-group>

                    <b-input-group size="md" prepend="Contraseña" class="mb-3">
                        <b-form-input v-model="newAccount.password" type="password" :maxLength="40"/>
                    </b-input-group>

                    <b-input-group size="md" prepend="Email" class="mb-3">
                        <b-form-input v-model="newAccount.email"/>
                    </b-input-group>

                    <b-input-group size="md" prepend="Nickname" class="mb-3" >
                        <b-form-input v-model="newAccount.nickname" :maxLength="30"/>

                        <b-dropdown text="Ciudad" class="mx-5" v-model="newAccount.city">
                            <b-dropdown-item v-for="(aux, index) in citys" :key="index" @click="selectCity (aux)">
                                {{aux}}
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-input-group>

                    <b-button variant="success" block @click="nextStep" :disabled="!next">
                        Siguiente paso
                    </b-button>
                    <b-card-text class="my-2">O</b-card-text>
                    <b-button variant="primary" block @click="login = true">Iniciar sesion</b-button>
                </div>
                <!-- Step 2 -->
                <div v-if="step2">
                    <div>
                        <b-button-group class="my-2">
                            <b-button @click="changeAccountType (1)">Normal</b-button>
                            <b-button @click="changeAccountType (2)">Negocios</b-button>
                        </b-button-group>

                        <b-card-text>
                            {{accountDetails[accountCounter]}}
                        </b-card-text>

                    </div>
                    <b-button variant="primary" class="my-2 mr-1" style="width: 40%;" @click="previousStep">Regresar</b-button>
                    <b-button variant="success" :disabled="!register" class="my-2" style="width: 40%;" @click="registerUser">Registrarse</b-button>
                </div>
                </b-card>

                <b-card v-if="login" border-variant="dark" bg-variant="dark" header="Iniciar"
                text-variant="white" class="text-center" header-border-variant="secondary">
                    <b-input-group size="md" prepend="Usuario" class="mb-3">
                        <b-form-input v-model="loginAccount.username" :maxLength="30"/>
                    </b-input-group>

                    <b-input-group size="md" prepend="Contraseña" class="mb-3">
                        <b-form-input v-model="loginAccount.password" type="password" :maxLength="40"/>
                    </b-input-group>

                    <b-button variant="success" block @click="loginMethod" :disabled="!loginAuth">
                        Iniciar sesion
                    </b-button>
                    <b-card-text class="my-2">O</b-card-text>
                    <b-button variant="primary" block @click="login = false">Registrar</b-button>
                </b-card>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            login: !false,
            step1: true,
            step2: false,
            readyRegister: false,
            register: false,
            next: false,
            instructions: ['Llena los campos','Selecciona un tipo de usuario'],
            stepCount: 1,
            citys: ['Guadalajara', 'El Gabacho'],
            accountDetails: ['Selecciona un plan','Cuenta Normal','Cuenta de Negocios'],
            accountCounter: 0,
            newAccount: {
                username: '',
                password: '',
                email: '',
                nickname: '',
                city: '',
                accountType: ''
            },
            loginAuth: false,
            loginAccount: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        nextStep () {
            this.step1 = false;
            this.step2 = true;
            this.stepCount = 1;
        },
        previousStep () {
            this.step1 = true;
            this.step2 = false;
            this.stepCount = 0;
        },
        changeAccountType (index) {
            this.accountCounter = index
            this.readyRegister = true
            switch (index) {
                case 1: {
                    this.newAccount.accountType = 'Normal'
                    break;
                }
                case 2: {
                    this.newAccount.accountType = 'Business'
                    break;
                }
            }
        },
        selectCity (city) {
            this.newAccount.city = city
        },
        registerUser () {
          // Username length
          if (this.newAccount.username.length > 30) { alert ("El tamaño maximo para el nickname son 30 caracteres"); }
          if (this.newAccount.password.length > 40) { alert ("El tamaño maximo para la contraseña son 40 caracteres"); }

            let urlBase = this.$store.getters.getUrlBase
            let newAccount = this.newAccount
            let type = 0;
            let formData = new FormData()

            if (newAccount.accountType == 'Normal')
                type = 1
            else if (newAccount.accountType == 'Business')
                type = 2
            else if (newAccount.accountType == 'Administrator')
                type = 3

                console.log("Newaccount", newAccount)

            formData.set('username', newAccount.username)
            formData.set('password', newAccount.password)
            formData.set('email', newAccount.email)
            formData.set('nickname', newAccount.nickname)
            formData.set('ciudad', newAccount.city)
            formData.set('tipoDeCuenta', type)
            this.axios.post(urlBase + 'conexiones/usuario/crearCuenta.php', formData).then(response => {
                alert(response.data.response)
            })
        },
        loginMethod () {
            this.$store.dispatch('loginUser', this.loginAccount)
        },
        goToRoute (route) {
            if (route !== undefined || route != '') {
                this.$router.push('/' + route)
            }
        }
    },
    created () {
    },
    computed: {
    },
    watch: {
        newAccount: {
            handler (val) {
                if (this.newAccount.username.length > 0 && this.newAccount.password.length > 0
                && this.newAccount.email.length > 0 && this.newAccount.nickname.length > 0
                && this.newAccount.city.length > 0) {
                    this.next = true;
                }else {
                    this.next = false;
                }

                if (this.newAccount.accountType != '') {
                    this.register = true
                } else {
                    this.register = false
                }

            },
            deep: true
        },
        loginAccount: {
            handler (val) {
                if (this.loginAccount.username.length > 0 && this.loginAccount.password.length > 0) {
                    this.loginAuth = true;
                } else {
                    this.loginAuth = false;
                }
            },
            deep: true
        },
    }
}
</script>

<style>
    .background {
        background-image: url("../assets/fondo-login.jpg");
        width: 100%;
        height: 100vh;
    }

    .transparencia {
        background-color: rgba(0, 0, 0, 0.500);
        width: 100%;
        height: 100vh;
    }

    .centrado {
        width: 30%;
        top: 30%;
        left: 37%;
        position: absolute;
        background-color: black;
    }

    .titulo {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: white;
        font-size: 20pt;
    }

    .card-header {
        font-size: 20pt;
    }
</style>
