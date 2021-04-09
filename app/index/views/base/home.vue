<template>

    <div  id="home-container">
        <j-header ></j-header>
        <!-- set progressbar -->
        <router-view>
        </router-view>
    </div>
</template>

<script>
    var header = require('./Head.vue');
    import niceScroll from 'niceScroll';
    import base from 'config'
    module.exports ={
        created:function(){

        },

        data:function(){
            return{
            }
        },
        components:{
            'j-header':header
        }
    }
</script>
<style>
    @media screen and (min-width:1024px) {
        #home-container{width:100%}
    }
    @media screen  and (max-width:1024px) {
        #home-container{width:1024px}
    }
</style>