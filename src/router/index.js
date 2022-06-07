import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import store from '@/store'
import {Buffer} from 'buffer'
import App from './../App.vue'
import MascotaView from '../views/admin/mascota/MascotaView.vue'

const routes = [
  {
    path:'/',
    name: 'app',
    component: App,
    children:[
      {
        //ruta base
        path: '/admin',
        name: 'home',
        component: HomeView,
        meta:{requireAuth:true}//guard
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta:{requireAuth:true}
      },
      {
        path:'/mascota',
        name:'mascota',
        component: MascotaView,
        meta:{requireAuth:true}
      }
     
    ]
  },
  //sacamos el login en una ventana sin el template
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'Login', //no es necesario
    component: LoginView
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//roter.beforeEach //antes de antrar a la pagina verificar login
//guard: protege las url
router.beforeEach((to,from, next)=>{//to: tiene varias posibilidades que se puede ver con inspeccionar
  console.log(to)
  let authJson=null;
  if(to.meta.requireAuth){
    if(store.state.auth!=null){
      next();
    }//aqui se puede colocar la sesion del local storage
    try{
      let auth=localStorage.getItem('auth');
      authJson=JSON.parse(Buffer.from(auth, 'base64').toString('ascii'));
    }catch(error){
      next ("/login")
    }
  
    if(authJson.Token_de_acceso){
      next()
    }else
    next("/login")
   
  }
  else
  next();
});
export default router
