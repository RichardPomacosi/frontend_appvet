import { createStore } from 'vuex'
//este archivo se refiere a vuex
export default createStore({
  state: {//se guarda la variable de forma global
    contador:0,
    auth:null
  },
  mutations: {
    //modifica estado
    aumentar(state){
      state.contador++
    },
    actualizarAuth(state, usuario_token){
      state.auth=usuario_token;
    }
  },
  actions: {
    //ejecuta mutacion
    aumentarEjucuar(context){ //context son los diferentes metodos que se puede utilizar para ejecutar una funcion o un getter o state
      context.commit("aumentar")  //commit ejecuta una accion
      //esta accion se ejecuta con un dispatch
    },
    login(context,u){
      context.commit("actualizarAuth",u)
    }
  },
  getters: {
    obtenerContador(state){
      return state.contador
    }
  }
})
