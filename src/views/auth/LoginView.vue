<template>
<!--llamar vuex al estado-->
<h1>{{$store.getters.obtenerContador}}</h1>
<h1>{{$store.state.auth}}</h1>
<button @click="$store.dispatch('aumentarEjucuar')">Cumenta</button>
<hr>
  <h1>Ingresar</h1>
  <label for="">Ingrese Correo</label><br>
  <input type="email" v-model="usuario.email" ><br>
  <label for="">Ingrese contraseña</label><br>
  <input type="password" v-model="usuario.password"><br>

  <button @click="ingresar()">Ingresar</button>
{{datos}}
</template>

<script>
//importamos solo el metodo login
//import {login} from '../../services/auth.service'
import * as authService from '../../services/auth.service'
import{Buffer} from 'buffer'
export default {
    //datos del dom
    data(){
        return{
            datos:"",
            usuario:{email:"admin3j@gmail.com",password:"123"}
        }
    },
    methods:{
       async ingresar(){
            const res=await authService.login(this.usuario);
            this.datos=res.data
            const base64=Buffer.from(JSON.stringify(res.data)).toString('base64');
            localStorage.setItem("auth",base64)
            this.$store.dispatch('login',res.data)
            //decodificar
            //const decode= Buffer.from(base64, 'base64').toString('ascii');
        }
    }
}
</script>

<style>

</style>