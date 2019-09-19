<template>
  <div class="row">
    <div class="col-10">
      <div class="form-group">
        <textarea v-model="tema" placeholder="Tema..." class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
    </div>
    <div class="col-2 d-flex flex-column justify-content-between">
      <div class="row">
        <div class="input-group mb-3 d-flex justify-content-around">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input v-model="urgente" type="checkbox" aria-label="Checkbox for following text input">
            </div>
          </div>
          <input type="text" value="URGENTE" class="form-control" aria-label="URGENTE" disabled="false">
        </div>

      </div>
      <div class="row">
        <button class="btn btn-primary btn-block" @click="publicar">
          Publicar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tema: '',
      urgente: false,
    }
  },
  methods: {
    publicar () {
      let payload = {
        idUsuario: this.usuario.idUsuario,
        tema: this.tema,
        urgente: this.urgente,
        nickname: this.usuario.nickname,
        participantes: 0,
      }
      this.$store.dispatch('crearPost', payload)
    }
  },
  computed: {
    usuario () {
        let user = this.$store.getters.getUsuario
        return user
    }
  }
}
</script>

<style>

</style>
