<template>
    <div class="my-container ">
        <j-header ></j-header>
        <div id="user-pop" class="content" >
            <el-row>
                <el-col :span="3">
                    <el-menu class="el-menu-vertical-demo dark-el" router>
                        <el-menu-item v-for="(item,index) in subs" :index="item.path" :class="{'is-route-active':item.active}" >
                            <span :class="item.icon" class="mgr10"></span>{{item.title}}
                        </el-menu-item>
                    </el-menu>
                </el-col>
                <el-col :span="21">
                    <router-view>
                    </router-view>
                </el-col>
            </el-row>



        </div>

    </div>

</template>
<script>
    import header from './Head.vue'

    module.exports = {
        created:function(){
            var that = this;
            //开启对路由变化时间的监听
            that.$root.eventHub.$on('routeChange', function(to){
                for(var i =0 ; i <that.subs.length;i++){
                    that.subs[i].active = false;
                    if(that.subs[i].name!=''&&to.name!=null&&to.name == that.subs[i].name){
                        that.subs[i].active = true;
                    }
                }
            });
            for(var i = 0 ; i < that.subs.length; i++){
                if(that.subs[i].name == that.$route.name){
                    that.subs[i].active = true;
                }
            }
        },
        components:{
            'j-header':header
        },
        data:function(){
            return {
                subs:[
                    {sort:'1',name:'manage.users',path:'/manage/users',title:'系统用户',icon:'glyphicon glyphicon-user',active:false},
                    {sort:'2',name:'manage.approvers',path:'/manage/approvers',title:'审批人员',icon:'el-icon-setting',active:false}
                ]
            }
        }
    }
</script>
<style>

</style>
<style scoped>

    @media screen and (min-width:1024px) {
       .my-container{width:100%}
    }
    @media screen  and (max-width:1024px) {
        .my-container{width:1024px}
    }

    @media screen and  (max-height:600px){
        .content{
            height:525px;
        }
    }
    @media screen and (min-height:601px) and  (max-height:768px){
        .content{
            height:693px;
        }
    }
    @media screen and (min-height:769px) and  (max-height:900px){
        .content{
            height:825px;
        }
    }
    @media screen and (min-height:901px) and  (max-height:1050px){
        .content{
            height:975px;
        }
    }
    @media screen and (min-height:1051px) and  (max-height:1080px){
        .content{
            height:995px;
        }
    }
    @media screen and (min-height:1081px) and  (max-height:1200px){
        .content{
            height:1125px;
        }
    }
    .mgr10{
        margin-right:10px
    }

    #user-pop{
        background-color: #181819;
    }
    .is-route-active{
        color:#eee!important;
        text-shadow: black 5px 3px 3px;
    }

</style>