<template>
  <div class="about">
    <h1>Mi perfil</h1>
    <p>{{perfil}}</p>
  </div>
</template>

<script>
import * as authService from "./../services/auth.service.js"
export default {
  data(){
    return{
      perfil:null
    }
  },
  async mounted(){
    const {data}=await authService.perfil()
    this.perfil=data
  }
}
</script>

<style>

</style>