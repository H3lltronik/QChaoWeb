<template>
    <div>
        <b-card class="h-100 w-100">
            <h4>Cuenta</h4>
            <b-card-text class="mt-3">
                <b-form-group :label="aux[1]" v-for="(aux, index) in cuenta" :key="index" class="my-3">
                    <b-form-input :v-model="aux[0]"></b-form-input>
                </b-form-group>
                <b-button variant="danger">Borrar cuenta</b-button>
            </b-card-text>
            <b-button class="mt-2">Guardar cambios</b-button>
        </b-card>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cuenta: {
                nombre: ['','Nombre de cuenta'],
                correo: ['','Correo'],
                password: ['','Nueva contraseña'],
                confirmarPass: ['','Confirmar contraseña'],
                telefono: ['','Agregar telefono'],
            }
        }
    }
}
</script>

<style lang="">
    
</style>