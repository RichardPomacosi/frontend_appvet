
//engloba peticiones al servidor

import axios from "axios"
import {Buffer} from "buffer"
const urlbase="http://127.0.0.1:8000/api";

export function http(){
    
    let auth=localStorage.getItem('auth');
    let token=null;
    if(auth){
        const authJson=JSON.parse(Buffer.from(auth, 'base64').toString('ascii'));
        token=authJson.Token_de_acceso;
    }
    

    //interceptores
    const interceptor=axios.create({
        baseURL:urlbase,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+token
            //se puede obtener el vuew o del almacenamiento local
        },
        timeout:15000
    });
    //errores los interceptores son para captar errores
    //401, 403
    interceptor.interceptors.response.use(
        (response)=>{//si llega la respuesta
            return response;
        },
        (error)=>{
            if(error.response.status===401){//sacar del error inspeccionar
                localStorage.removeItem("auth")//eliminar token
                window.location.href="/login"
            }
          
        }
    )

    return interceptor;
}