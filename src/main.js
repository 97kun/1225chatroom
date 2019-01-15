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
import {Notification} from 'element-ui';

import routes from './router/route'

Vue.use(VueAwesomeSwiper);


Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.prototype.axios = axios;


const store = new Vuex.Store({
    state: {
        city: "",
        ganmao: "",
        warm: "",
        wendu: "",
        user: JSON.parse(localStorage.getItem('user')),
        logined: JSON.parse(localStorage.getItem('user')),
    },
    getters: {
        loginstatus: state => {
            return !!state.user.uid;
        }
    },
    mutations: {
        changelogin(state) {
            state.logined = false;
            state.user = {};
        }
    }
});

let router = new Router({
    routes,
    // mode:"history"
});


new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (!!localStorage.getItem('user')) {
        next()
    } else if (to.path === "/Login" || to.path === "/Register") {
        next()
    } else {
        store.commit('changelogin');
        Notification({
            title: '警告',
            message: '请登录',
            type: 'warning'
        });
        next({path: "/First"})
    }
});