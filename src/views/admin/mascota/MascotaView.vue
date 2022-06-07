<template>

  <div class="card">
      <h2>Mascotas</h2>
    <!--confirm dialog start-->
     <Toast />
        <ConfirmDialog></ConfirmDialog>
        <ConfirmDialog group="positionDialog"></ConfirmDialog>

    <!--confirm dialog end-->
      <!--Modal dialog-->
      <Button label="Nueva mascota" icon="pi pi-external-link" @click="openModal" />
        <!--se agrego : a header-->
        <Dialog :header="(edit)?'Editar mascota':'Nueva mascota'" v-model:visible="displayModal" :style="{width: '50vw'}" :modal="true">
            
            <div class="grid p-fluid">
                <div class="col-12 md:col-12">
                        <InputText placeholder="Nombre Mascota" v-model="mascota.nombre"/>
                </div>
                <div class="col-12 md:col-12">
                        <InputText placeholder="Especie" v-model="mascota.especie"/>
                </div>
                <div class="col-12 md:col-12">
                        <InputText placeholder="Raza" v-model="mascota.raza"/>
                </div>
                
                <div class="col-12 md:col-12">
                        <InputText placeholder="Sexo" v-model="mascota.sexo"/>
                </div>
                <div class="col-12 md:col-12">
                        <InputText placeholder="Persona_id" v-model="mascota.persona_id"/>
                </div>

            </div>

            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" @click="guardarMascota" autofocus />
            </template>
        </Dialog>
    <!------------>
      <DataTable :value="lista_mascotas" responsiveLayout="scroll">
            <Column field="id" header="ID"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="persona_id" header="Persona_id">
            <template #body="{data}">
                      <Button icon="pi pi-eye" class="p-button-rounded" @click="mostrarMascota(data)" />  
            </template>
            </Column>

            <Column header="Acciones">
            <template #body="{data}">
                      <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning" @click="editarMascota(data)" /> 
                      <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="eliminar(data)" />   
            </template>
            </Column>

            
           <!-- <Column field="nombre" header="Name"></Column>
            <Column field="detalle" header="detalle"></Column>
            <Column field="materias" header="Quantity"></Column>-->
        </DataTable>

{{lista_mascotas}}

  </div>

</template>

<script>
//vue 3
//todo se resume en setup no hay this
import {ref, onMounted} from 'vue';
import * as mascotaService from './../../../services/mascota.service.js'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
export default {
    setup(){

        const confirm = useConfirm();
        const toast = useToast();
        const lista_mascotas=ref();
        //ver doc la parte de cod de modal
        const displayModal=ref(false);

        const mascota=ref({
            nombre:"",
            especie:"",
            raza:"",
            sexo:"",
            fechaNacimiento:"2000-12-23",
            pelaje:"azulado",
            persona_id:"",
        });
        const edit=ref(false);
        const idEditar=ref();
        onMounted(async ()=>{
            //data es una variable del response
           // mascotaService.listar().then(res=>lista_mascotas.value=res.data);
            //con async
            //const {data}=await mascotaService.listar();
            //lista_mascotas.value=data;
            listarMascota();
        });
        const openModal = () => {
            displayModal.value = true;
        };
        const closeModal = () => {
            displayModal.value = false;
        }
        const listarMascota = async () => {
            const {data}=await mascotaService.listar();
            lista_mascotas.value=data;
         }
         const guardarMascota = async () => {
             if(edit.value){
                 console.log(mascota.value);
                const {data}=await mascotaService.modificar(idEditar.value, mascota.value);
             }else{
            console.log(mascota.value);
            const {data}=await mascotaService.guardar(mascota.value);
             }
            listarMascota();
            closeModal();
            idEditar.value=0;
            edit.value=false;
            mascota.value={nombre:'',especie:'',raza:'',sexo:'',fechaNacimiento:'',pelaje:''}
        }
        const editarMascota = (data) => {
            idEditar.value=data.id;
            edit.value=true;
            mascota.value=data
            displayModal.value = true;
            
        };
        
        const eliminar = (data) => {
            confirm.require({
                message: 'Esta seguro de eliminar la mascota',
                header: 'Confirmar eliminación',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: async() => {
                    await mascotaService.eliminar(data.id);
                    toast.add({severity:'info', summary:'Confirmed', detail:'Eliminado', life: 3000});
                    listarMascota();
                },
                reject: () => {
                    toast.add({severity:'error', summary:'Rejected', detail:'Cancelado', life: 3000});
                }
            });
        }
        return{
            lista_mascotas,
            displayModal,
            openModal,
            closeModal,
            guardarMascota,
            mascota,
            editarMascota,
            edit, 
            idEditar,
            eliminar
        };
    }
}
</script>


<style>

</style>