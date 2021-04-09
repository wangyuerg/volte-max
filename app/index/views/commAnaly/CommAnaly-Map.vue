<template>
    <div class="abs">
        <div :style="[styleObject]" :show="mapInitOver">
            <iframe  name="gisMap" :style="[styleObject]" :src="mapOption.useLink"></iframe>
        </div>
    </div>
</template>

<script>
    export default{
        created:function(){
            var that = this;
            setTimeout(function(){

                gisMap.window.apis.init(that.styleObject,that.mapOption,function(){
                    //Here:地图初始化成功后的回调方法
                    that.mapInitOver = true;
                    that.$root.eventHub.$emit('commMapControl', {
                        type:'initOver',
                        data: true
                    });
                    //此处为callback函数中，gisMap.window.apis || window.apis
                    var apis_ = gisMap.window.apis || window.apis;
                    apis_.afterinit();

                    //添加播放器事件监听处理
                    that.$root.eventHub.$on('commMapControl', function(option){
                       switch (option.type){
                           case 'cityChange':
                               apis_.cityChange(option.data);
                               break;
                           case 'showCommPoint':
                               apis_.showCommPoint(option.data.id,option.data.x,option.data.y);
                               break;
                           case 'alertArea':
                               apis_.showAlertPoint(option.data);
                               break;
                           case 'clearHeat':
                               apis_.clearHeat();
                               break;
                           case 'commPoints':
                               apis_.showCommPoints(option.data);
                       }
                    });
                },that.openEvent);
            },1500);
        },
        props:{
            styleObject:{
                width:'100%',
                height:'100%'
            }
            ,
            mapOption:Object
        },
        data:function(){
            return{
                mapInitOver:false
            }
        },
        methods:{
            openEvent(id){
                this.$parent.currentECI = id;
                this.$parent.isLayerOpen = true;
            }
        },
        beforeDestroy(){
            this.$root.eventHub.$off('commMapControl');
        }
    }
</script>

<style scoped>
    div,iframe{
        padding: 0;
        margin: 0;
        border: 0;
    }
    .abs{
        width:100%;
        height:100%;
        margin:auto;

    }

</style>