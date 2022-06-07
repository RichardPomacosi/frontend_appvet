import { http } from "./http";
export function listar(){
    return http().get("/mascota");

}
export function guardar(datos){
    return http().post("/mascota",datos);
}
export function modificar(id,datos){
    return http().put("/mascota/"+id,datos);
}
export function mostrar(id){
    return http().get("/mascota/"+id);
}
export function eliminar(id){
    return http().delete("/mascota/"+id);
}