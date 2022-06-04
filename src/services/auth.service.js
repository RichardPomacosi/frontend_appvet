//se encarga de conectar con el servidor

//jsonplaceholder para un fetch
//las funciones creadas se debe exportar para utilizar en otros archivos
//definimos funciones para cada endpoint 
import { http } from "./http";

export function login(datos){
    return http().post('/v1/auth/login', datos);
   /* fetch("http://127.0.0.1:8000/api/v1/auth/login",datos).then(
        (res)=>{//llega la inf en una funcion
            console.log(res);
        }
    ).catch(
        (error)=>{
            console.log(error);
        }
    )*/
  /*  axios.post("http://127.0.0.1:8000/api/v1/auth/login",datos).then(
        (res)=>{//llega la inf en una funcion
            console.log(res);
        }
    ).catch(
        (error)=>{
            console.log(error);
        }
    )*/

}

export const perfil=function(){
    return http().get("/v1/auth/perfil");
    
}

export const logout=()=>{

}