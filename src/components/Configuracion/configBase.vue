<template>
    <div>
        <navbar-component></navbar-component>
        <b-container fluid class="mt-5">
            <b-row>
                <b-col md="10" class="mt-4">
                    <b-row>
                        <b-col md="2">
                            <b-list-group >
                                <b-list-group-item button @click="configTab = 0" style="height: 8rem;">General</b-list-group-item>
                                <b-list-group-item button @click="configTab = 1" style="height: 8rem;">Seguridad</b-list-group-item>
                                <b-list-group-item button @click="configTab = 2" style="height: 8rem;">Anuncios</b-list-group-item>
                                <b-list-group-item button @click="configTab = 3" style="height: 8rem;">Personalizacion</b-list-group-item>
                            </b-list-group>
                        </b-col>
                        <b-col md="10">
                            <general-config v-if="configTab === 0" ></general-config>
                            <seguridad-config v-if="configTab === 1" ></seguridad-config>
                            <anuncios-config v-if="configTab === 2" ></anuncios-config>
                            <personalizacion-config v-if="configTab === 3" ></personalizacion-config>
                        </b-col>
                    </b-row>
                    <b-row>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    data () {
        return {
            configTab: 0,
        }
    }
}
</script>

<style>
    
</style>