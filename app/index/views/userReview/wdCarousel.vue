<template>
    <div class="wd-caruosel-container"  :id="id" @mouseenter="stop" @mouseleave="run">
        <span class="wd-caruosel-content wd-caruosel-container__node"
              track-by="item.id"
              :index="item.index"
              v-for="item in runList"
              v-html="item.value"
              @mouseenter="spanEnter(item)"
              @mouseleave="spanLeave(item)"
        ></span>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default{
        created(){
            var vm = this;
            vm.start();
            vm.$root.eventHub.$on('wdCarousel-add', function(node){
               vm.addNode(node);
            });
            $(window).resize(function () {          //当浏览器大小变化时
                vm.containerWidth = parseInt($('#'+vm.id).css('width'));
            });
        },
        props:{
            idKey:{default:'id'},
            valueKey:{default:'value'},
            timeKey:{default:'time'},
            spanWidth:{default:600},
            data:{default:null},
            speed:{default:2}
        },
        data(){
           return{
               id:'',
               timer:null,
               timeSpeed:20,
               addList:[],
               removeList:[],
               runList:[],
               containerWidth:1000
           }
        },
        methods:{
            $findIndex(index){
                var vm = this;
                return $('#'+vm.id+' .wd-caruosel-content[index="'+index+'"]');
            },
            spanEnter(node){
            },
            spanLeave(node){
            },
            start(){
                var vm = this;
                vm.runList = vm.data;
                vm.id = 'wd-caruosel-1';
                for(var i = 0 ; i < vm.runList.length;i++){
                    Vue.set(vm.runList[i],'index',i)
                }
                Vue.nextTick(function(){
                    vm.containerWidth = parseInt($('#'+vm.id).css('width'));
                    //设置left 值
                    for(var i = 0 ; i < vm.runList.length;i++){
                        vm.$findIndex(i).css('left',vm.containerWidth + i*vm.spanWidth);
                        vm.$findIndex(i).css('width',vm.spanWidth);
                    }
                    vm.run();
                });



            },
            move(){
                var vm = this;
                var delList = [];
                for(var i = 0 ; i < vm.runList.length;i++){
                    var item = vm.runList[i];
                    vm.$findIndex(item.index).css('left',parseInt(vm.$findIndex(item.index).css('left'))-vm.speed);
                    item[vm.timeKey] = item[vm.timeKey] - vm.timeSpeed;
                    if(item.time<=0 &&  (parseInt(vm.$findIndex(item.index).css('left'))>=vm.containerWidth ||
                            parseInt(vm.$findIndex(item.index).css('left'))<=(0-vm.spanWidth))){
                        delList.push(item);
                    }
                }

                if(delList.length>0 || (parseInt(vm.$findIndex(0).css('left')+vm.spanWidth)<=0) ){
                    vm.stop();
                }


                if(delList.length>0){
                    vm.removeNodes(delList);
                }

                Vue.nextTick(function(){
                    if( vm.runList.length >0){
                        var left = parseInt(vm.$findIndex(0).css('left'));
                        if(left + vm.spanWidth<=0){
                            vm.resNode(function(){
                                vm.run();
                            });
                        }else{
                            vm.run();
                        }
                    }else{
                        vm.run();
                    }
                });





            },
            stop(){
                var vm = this;
                if(vm.timer){
                    clearInterval(vm.timer);
                    vm.timer = null;
                }

            },
            run(){
                var vm = this;
                if(!vm.timer){
                    vm.timer = setInterval(function(){
                        vm.move();
                    },vm.timeSpeed);
                }
            },
            resNode(finished){
                var vm = this;

                //获取此时最后一个结点的left值
                var lastLeft = parseInt(vm.$findIndex(vm.runList.length-1).css('left'));
                //重排Index
                for(var i = 0 ; i <vm.runList.length;i++){
                    if(vm.runList[i].index == 0){
                        vm.runList[i].index = vm.runList.length-1;
                    }else{
                        vm.runList[i].index --;
                    }
                }

                Vue.nextTick(function(){
                    if((lastLeft + vm.spanWidth)>vm.containerWidth){
                        vm.$findIndex(vm.runList.length-1).css('left',lastLeft + vm.spanWidth);
                    }else{
                        vm.$findIndex(vm.runList.length-1).css('left',vm.containerWidth);
                    }
                    finished();
                });


            },
            removeNodes(nodes){
                var vm = this;
                //根据ID删除
                for(var i = 0 ; i <vm.runList.length;i++){
                    if(
                            nodes.some(function(node){
                                return vm.runList[i][vm.idKey] == node[vm.idKey]
                            })
                    ){
                        vm.runList.splice(i,1)
                    }
                }


                //重排index
                var minIndex = null;
                for(var i = 0 ; i <vm.runList.length;i++){
                    if(minIndex == null || vm.runList[i].index<minIndex ){
                        minIndex = vm.runList[i].index;
                    }
                }
                if(minIndex !=null){
                    for(var i = 0 ; i <vm.runList.length;i++){
                        vm.runList[i].index = vm.runList[i].index - minIndex;
                    }
                }

            },
            addNode(node){
                var vm = this;
                vm.stop();
                //IDkey 存在则不覆盖
                if(vm.runList.some(function(item){return item[vm.idKey] == node[vm.idKey];})){
                    return;
                }
                //获取当前left值的情况
                //获取此时最后一个结点的left值
                var lastLeft = parseInt(vm.$findIndex(vm.runList.length-1).css('left'));
                var newLeft = (lastLeft + vm.spanWidth)>vm.containerWidth?(lastLeft + vm.spanWidth):vm.containerWidth;

                //向runList 末尾添加，并赋予Index
                var index = vm.runList.length;
                Vue.set(node,'index',index);
                vm.runList.push(node);
                Vue.nextTick(function(){
                    vm.$findIndex(vm.runList.length-1).css('width',vm.spanWidth);
                    vm.$findIndex(vm.runList.length-1).css('left',newLeft);
                    vm.run();
                });

            }
        },
        beforeDestroy(){
            this.stop();
            //组件摧毁时，注销监听
            this.$root.eventHub.$off('wdCarousel-add');
        }
    }
</script>
<style scoped>
    .wd-caruosel-container{
        background:#181819;
        position:relative;
        overflow:hidden;
        height:25px;
        line-height:25px;
        margin:0 0 5px 0;
        z-index:999999999999999999;
        width:100%;
    }
    .wd-caruosel-container__node{
        position:absolute;
        left:0;
        color:#fff;
    }

</style>