import Vue from 'vue'
import MainCss from './MainCss.vue'
import Head from './views/base/Head.vue'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

import Config from 'config'
import App from './app.vue'
import './util.js'
import 'niceScroll'
import layer from 'layer'
import access from './access.vue'

require('gui.css');
require('gui');

import Element from 'element-ui'
Vue.use(Element);

import {api,httpWarningHandler} from 'Api'




// install router
Vue.use(VueRouter);
//Vue.http.options.emulateJSON = true;

//import 业务组件,并做懒加载处理
const Login = require('./views/base/Login.vue');
const Home = require('./views/base/home.vue');
const UserReview = require('./views/userReview/UserReview.vue');
//const IndexAnaly = require('./views/IndexAnaly.vue');
const CommAnaly = require('./views/commAnaly/CommAnaly.vue');
const IndexSearch = require('./views/indexSearch/IndexSearch.vue');


const routes = [
    {
        path: '/',
        name:'void',
        redirect: '/login'
    },
    {
        name:'login',
        path: '/login',
        component: Login
    },
    {
        name:'manage',
        path: '/manage',
        component:require('./views/base/Manage.vue'),
        children:[
            {path:'users',name:'manage.users',component:require('./views/base/manage/users.vue')},
            {path:'approvers',name:'manage.approvers',component:require('./views/base/manage/approvers.vue')}
        ]
    },
    {
        path:'/home',
        component:Home,
        children:[
            {path:'',component:UserReview},
            {path:'userreview',name:'home.userreview',component:UserReview},
            {path:'commanaly',name:'home.commanaly',component:CommAnaly},
            {path:'indexsearch',name:'home.indexsearch',component:IndexSearch}
        ]
    }
];
// routing
const router = new VueRouter({
    routes: routes
});
router.beforeEach(function(to, from, next){

    //总页面滚动条控制
    // setTimeout(function(){
    //     if(to.path.indexOf('/home')>=0||to.path.indexOf('/manage')>0){
    //         $('body').getNiceScroll().remove();
    //         $('body').niceScroll({
    //             styler:'fb',
    //             cursorcolor:"#0c151f",
    //             background: '#192a3e',
    //             cursorwidth: '6',
    //             cursorborder:"3px solid rgba(19,88,148,0)",
    //             cursorborderradius: '12px',
    //             cursoropacitymin :1,
    //             spacebarenabled:false,
    //             preservenativescrolling:true,
    //             zindex: '9999999999999'}).show().resize();
    //     }else{
    //         $('body').getNiceScroll().show().resize();
    //     }
    // },0);
    //跳转前强制关闭所有弹窗
    layer.closeAll();

    //route change event
    if(app){
        app.$root.eventHub.$emit('routeChange', to);
    }


    if(to.path!='/login'&&Config.getCurrentUser()== null){
        //用户未登录
        router.push('/login');
        next();
    }else if(to.path == '/login') {
        next();
    }else{
        //用户登录后，查看权限列表
        var accessMenu = access.getAccessMenu();
        if(accessMenu.some(function(item){return item.path == to.path;})){
            next();
        }

    }

   /* //跳转路径检测
    if(to.path!='/login'&&Config.getCurrentUser()== null){
        router.push('/login');
        next();
    }else if(to.path=='/manage'&&Config.getCurrentUser().roleId == "1"){
        next();
    }else{
        next();
    }*/

});



//init
const app = new Vue({
    router: router,
    render: function (h) {
        return h(App);
    },data: {
        eventHub: new Vue()//整个应用的事件主线
    }
});
//为app加载API
Vue.use(api,app);
//为app加载API异常处理
Vue.use(httpWarningHandler,app);
//将应用挂在到App
app.$mount('#app');




Vue.config.debug = true;//开启错误提示



//设置接口拦截器
Vue.http.interceptors.push((request, next) => {
    // ...
    // 请求发送前的处理逻辑
    // ...
    next((response) => {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        if(response.status === 404){
            app.$root.eventHub.$emit('httpWarning', {
                type:404,
                message:'未找到查询接口'
            });
        }else if(response.status === 500){
            app.$root.eventHub.$emit('httpWarning', {
                type:500,
                message:'服务器出错'
            });
        }

        return response
    })
});

Vue.component("my-item-zh",{
    functional:true,
    render:function(h,ctx){
        var item = ctx.props.item;
        return h('li',ctx.data,[
            h('div',{attrs:{class:'my-item-zh__title'}},[item.userName || item.auditorNameCn])

        ]);
    },
    props:{
        item:{type:Object,required:true}
    }
});
Vue.filter('mapAdaptor', function (value,array,key,out) {
    var result = "";
    for(var i = 0 ; i <array.length;i++){
        if(value == array[i][key]){
            result = array[i][out];
        }
    }
    return result;
});
