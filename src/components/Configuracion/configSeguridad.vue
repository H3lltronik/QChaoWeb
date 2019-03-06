<template>
    <div>
        <b-card class="h-100 w-100">
            <h4>Seguridad</h4>
            <b-card-text class="mt-3">
                <b-row >
                    <b-button variant="" block class="mx-auto mt-3">Cerrar sesion en todos los dispositivos</b-button>
                </b-row>
                <b-row>
                    <b-button variant="" block class="mx-auto mt-3">Correo de recuperacion de cuenta</b-button>
                </b-row>
                <b-row>
                     <b-input-group class="mt-3">
                        <b-form-input readonly="true"/>
                        <b-input-group-append>
                        <b-button variant="outline-success">Eliminar dispositivo</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-row>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>

<style>
    
</style>