
//engloba peticiones al servidor

import axios from "axios"

const urlbase="http://127.0.0.1:8000/api";

export function http(){
    //interceptores
    const interceptor=axios.create({
        baseURL:urlbase,
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
            //'Authorization':bearer token
        },
        timeout:15000
    });
    //errores
    //401, 403

    return interceptor;
}