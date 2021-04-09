<template>
    <div class="j-header" v-if="!abstract">
        <div class="welcome">欢迎您，{{userName}}｜<a href="javascript:;" @click="out">切换用户</a>｜<a href="javascript:;" v-if="curUser.roleId == 1" @click.prevent="manage">用户管理  | </a><a href="javascript:;" @click="out">退出</a></div>
        <div class="top">
            <span class="logo"></span>
            <div class="ued-nav">
                <ul class="clearfix">
                    <li  :class="whereIam==item.name?'ued-menu on':'ued-menu'" v-for="(item,index) in subs">
                        <router-link  v-if="item.name!=''" :to="{name:item.name}">{{item.title}}</router-link>
                        <a v-if="item.name==''">{{item.title}}</a>
                    </li>
                </ul>
            </div>
        </div>

    </div>


</template>
<script>
    /**
     * 头部模块
     */
    var access = require('access');
    var base  = require('config');
    var layer = require('layer');


    module.exports ={
        created:function(){
            var that = this;
            //开启对路由变化时间的监听
            that.$root.eventHub.$on('routeChange', function(to){
               for(var i =0 ; i <that.subs.length;i++){
                   if(that.subs[i].name!=''&&to.name!=null&&to.name.indexOf(that.subs[i].name)>=0){
                       that.whereIam = to.name;
                       break;
                   }
               }
            });
            this.curUser =  base.getCurrentUser();
            this.userName = base.getCurrentUser()!=null?base.getCurrentUser().userName:'';
            this.whereIam = this.$route.name;

            var subs = [
                {name:'home.userreview',title:'用户回放'},
                {name:'home.commanaly',title:'小区分析'},
                {name:'home.indexsearch',title:'指标查询'}
            ];
            var accessMenu = access.getAccessMenu();
            that.subs = $.map(subs,function(item){
                if(accessMenu.some(function(m){return m.name == item.name})){
                    return item;
                }else{
                    return null;
                }
            })
        },
        methods:{
           out: function(){
                base.clearCurrentUser();
               this.$router.push('/login');
            },
            manage:function(){
                this.$router.push('/manage/users');
            }
        }
        ,

        props:{
            abstract:{
                default:false
            }
        },
        data:function(){
            return{
                isLayerOpen:false,
                curUser:{
                    roleId:2
                },
                userName:'',
                subs:[],
                whereIam:''
            }
        }
    }
</script>

<style  scoped>
    .welcome{ padding-right: 10%; height: 26px; background: #135894; color: rgba(255,255,255,0.6); line-height: 26px; text-align: right;}
    .welcome a{ color: rgba(255,255,255,0.6);}
    .welcome a:hover{ text-decoration: none; }
    .top{ padding: 0 0 0 10%; height: 46px; background: url(../../images/bg_top.png) repeat-x; }
    .logo{ float: left; width: 300px; height: 46px; background: url(../../images/logo.png) no-repeat;}
    .ued-nav{ margin-left: 65px; width: auto; height: 46px; background: none;}
    .ued-nav .ued-menu{ height: 46px;  -webkit-box-sizing: content-box !important;
        -moz-box-sizing: content-box !important;
        box-sizing: content-box !important;}
    .ued-nav .ued-menu a{ padding: 0 20px; height: 46px; line-height: 46px; -webkit-box-sizing: content-box !important;
        -moz-box-sizing: content-box !important;
        box-sizing: content-box !important;}
    .ued-nav .ued-menu a:hover{ background: none; }
    .ued-nav .ued-menu.on a{ background: url(../../images/nav_on.png) no-repeat bottom center; }
    a{ text-decoration:none !important;}
    a:hover{ text-decoration:none  !important;}
</style>

