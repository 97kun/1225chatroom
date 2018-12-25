import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import Vuex from 'vuex';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);


// 组件引入
import Index from './components/index';
import Home from './components/home';
import First from './components/first'
import Login from './components/login';
import Register from './components/register';
import  SIdentify from './components/identify';
import sidentify from './components/identify';
import Me from './components/me';
import Chatroomlist from './components/chatroomlist';
import Chatwindow from './components/chatwindow';
import Test from './components/test';
import chuanzhiceshi from './components/chuanzhiceshi'


Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(SIdentify);
Vue.use(BootstrapVue);
Vue.prototype.axios = axios;

const routes=[
    {path:"/",component:Index},
    {path:"/Test",component:Test},
    {path:"/Home",component:Home},
    {path:"/First",component:First,
        redirect:'/Login',
        meta:{
        title:"登录注册"
        },
    children:[
        {path:"/Login",component:Login},
        {path:"/Register",component:Register}
    ]},
    {path:"/Me",component:Me},
    {path:"/Chatroomlist",component:Chatroomlist},
    {path:"/Chatwindow",component:Chatwindow},
    {path:"/chuan/:id",name:"zk",component:chuanzhiceshi},
    // {path:"*",redirect: '/'}
];

const store=new Vuex.Store({
    state:{
        city:"",
        ganmao:"",
        warm:"",
        wendu:""
    }
})

let router=new Router({
    routes,
    // mode:"history"
});

Vue.component('sidentify',sidentify);

new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app');

router.beforeEach((to,from,next)=>{
    if (to.meta.title){
        document.title=to.meta.title
    }
    next()
});