import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import store from '@/store'


const routes = [
  {
    path: '/',
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
  if(to.meta.requireAuth){
    if(store.state.auth!=null){
      next();
    }else
    next("/login")
  }
  else
  next();
});
export default router
