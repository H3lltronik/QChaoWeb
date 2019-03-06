<template>
    <div>
        <b-card class="h-100 w-100">
            <h4>Personalizacion</h4>
            <b-card-text class="mt-3">
                <b-row >
                    <b-col md="5">
                        <div>
                            <div style="font-size: 16pt;">Imagen de perfil</div>
                            <b-img fluid alt="Responsive image" style="max-height: 20rem;"
                                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/68f46e97-6a91-4028-848f-1f2a6ff6716c/d53mgu0-5e5f7af6-ba42-403a-a9e7-7c4fec32fd43.jpg/v1/fill/w_783,h_1021,q_70,strp/amlito_amoroso_lopez_obrador_by_marionette2007_d53mgu0-pre.jpg"/>
                            <b-row>
                                <b-button class="mx-auto">Cambiar imagen</b-button>
                            </b-row>
                        </div>
                    </b-col>
                    <b-col md="7">
                        <b-row>
                            <b-col>
                                <b-form-group label="Nickname" class="my-3">
                                    <b-form-input ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label="Tags o gustos por los autos" class="my-3">
                                    <b-form-input ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group label="Descripcion" class="my-3">
                                    <b-form-textarea/>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-card-text>
            <b-button class="mt-2" block variant="success">Guardar cambios</b-button>
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