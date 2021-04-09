<template>
    <div class="pd abs">
        <div :style="[styleObject]" :show="initOver">
            <div class="tab">
                <span :class="{'on':isSrcOn}" @click.self="switchOn">源端</span><span :class="{'on':!isSrcOn}" @click.self="switchOn">对端</span>
            </div>
            <iframe id="gisMap"  name="gisMap" :style="[styleObject]" :src="mapOption.useLink"></iframe>
        </div>
    </div>
</template>
<script>
    /**
     * 用户回放地图组件模块
     * 引入外部地图模块
     * 外部模块在GisMap文件夹下
     * 外部模块当该组件创建时才会初始化，按需，减少包大小
     */
    export default{
        created:function(){
            var that = this;

            setTimeout(function(){
               /* var messenger = new Messenger('gisMap', 'MessengerDemo');
                var iframe = document.getElementById('gisMap');
                messenger.listen(function (msg) {

                });
                messenger.addTarget(iframe.contentWindow, 'map');
                setTimeout(function(){
                     messenger.exec('init',that.styleObject,that.mapOption,that.openEvent)
                },200);*/
                    //初始化地图
                gisMap.window.apis.init(that.styleObject,that.mapOption,function(){
                    //Here:地图初始化成功后的回调方法
                    that.initOver = true;
                    //此处为callback函数中，gisMap.window.apis || window.apis
                    var apis_ = gisMap.window.apis || window.apis;
                    //初始化地图完毕后，调用外部模块afterinit（）方法，通知外部模块初始完毕
                    apis_.afterinit();
                    //更新点
                    apis_.updatePoints(that.points,that.isSrcOn);

                    //添加播放器事件监听处理
                    that.$root.eventHub.$on('mapControl', function(option){
                        if(option.status == 'init-playing'||option.status == 'playing'||option.status == 'stop' || option.status == 'over'){
                            apis_.asyncMapTimer(option);
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
            mapOption:Object,
            points:{
                type:Object,
                require:true
            }
        },
        data:function(){
            return{
                isSrcOn:true,
                initOver:false,
                timer:null
            }

        },
        watch:{
            points:{
                handler:function(curVal,oldVal){
                    if(this.initOver){
                        gisMap.window.apis.updatePoints(curVal,this.isSrcOn);
                    }
                },
                deep:true
            },
            isSrcOn:{
                handler:function(curVal,oldVal){
                    if(this.initOver) {
                        gisMap.window.apis.updatePoints(this.points, curVal);
                    }
                },
                deep:true
            }
        },
        methods:{
            openEvent(eid,eline){
                this.$parent.eventsWindow = [{
                    eid:eid,
                    eline:eline
                }];
                this.$parent.isLayerOpen = true;
            },
            switchOn(){
                this.isSrcOn = !this.isSrcOn;
            }
        },
        beforeDestroy(){
            //组件摧毁时，注销对mapControl的监听
            this.$root.eventHub.$off('mapControl');
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
        width:98%;
        height:98%;
        margin:auto;
        padding-top:0.5%;
    }

</style>