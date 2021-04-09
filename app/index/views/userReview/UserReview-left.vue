<template>
    <div>
        <button type="button" class="ued-btn ued-btn-pill play" @click.stop.prevent="play"><i class="ued-ico ico-play"></i><span id="play-tip">播放</span></button>
        <span class="chart-opt"></span>
        <span class="chart-see" @click="swicthScore">{{isScore?'查看电平强度':'收起'}}</span>
        <div class="chart-cont">
            <div class="chart-one" >
                <div id="chart-one" v-echarts="option1"></div>
            </div>
        </div>
        <div>
            <div class="score" v-show="isScore">
                <div class="score-tit">
                    <h4>综合评分</h4>
                    <p>{{indexData.score}}</p>
                </div>
                <div class="score-list">
                    <ul class="clearfix">
                        <li>
                            <div class="score-list-bg">
                                <span class="img-span"><img src="../../images/score_icon1.png" /></span><span class="word">吞字 | <b>{{indexData.lossword}}</b> </span>
                            </div>
                        </li>
                        <li>
                            <div class="score-list-bg">
                                <span class="img-span"><img src="../../images/score_icon10.png" /></span><span class="word">断续 | <b>{{indexData.disconnect}}</b></span>
                            </div>
                        </li>
                        <li>
                            <div class="score-list-bg">
                                <span class="img-span"><img src="../../images/score_icon9.png" /></span><span class="word">单通 | <b>{{indexData.singlepass}}</b></span>
                            </div>
                        </li>
                        <li>
                            <div class="score-list-bg">
                                <span class="img-span"><img src="../../images/score_icon2.png" /></span><span class="word">掉线 | <b>{{indexData.offline}}</b></span>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div class="score-list-bg">
                                <span class="img-span"><img src="../../images/score_icon4.png" /></span><span class="word">质差 | <b>{{indexData.lowquality}}</b></span>
                            </div>
                        </li>
                        <li>
                            <div class="score-list-bg">
                                <span class="img-span"><img src="../../images/score_icon6.png" /></span><span class="word">时延/抖动 | <b>{{indexData.delay}}</b></span>
                            </div>
                        </li>
                        <li>
                            <div class="score-list-bg">
                                <span class="img-span"><img src="../../images/score_icon7.png" /></span><span class="word">切换 | <b>{{indexData.changeover}}</b></span>
                            </div>
                        </li>
                        <li>
                            <div class="score-list-bg">
                                <span class="img-span"><img src="../../images/score_icon8.png" /></span><span class="word">T C | <b>{{indexData.TC}}</b></span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!--电平强度-->
            <div class="intensity vhide" v-show="!isScore">
                <span class="intenchart-opt"></span>
                <div class="inten-chart-one">
                    <div id="inten-chart-one" v-echarts2="option2"></div>
                </div>
            </div>
        </div>




    </div>
</template>

<script>
    /**
     * 用户回放左下模块
     */
    import 'niceScroll'
    var base = require('config');
    var Echarts = require('../../directives/charts.js');
    var niceScroll =  require('../../directives/NiceScroll.js');
    var layer =require('layer');
    //require('../../directives/layer/skin/layer.css');
    import Vue from 'vue';
    import  Slider from '../../directives/vue-easy-slider-2.0/src/slider.vue';
    import  SliderItem from '../../directives/vue-easy-slider-2.0/src/slider-item.vue';
    import eventWindow from './UserReview-event.vue'
    var currentUser = null;
    var defaultHeader = null;
    var echarts = require('echarts');


    module.exports ={
        created:function(){
            //初始化组件时调用
            currentUser = base.getCurrentUser();
            defaultHeader = base.defaultHeader();

        },
        components: {
            Slider,
            SliderItem,
            'eventWindow':eventWindow
        },
        directives: {
            "echarts":Echarts,
            "echarts2":Echarts,
            "nicescroll":niceScroll
        },
        props:{//父组件传递参数
            fragData:null,
            playControll:null,
            indexData:null,
            levelData:null,
            sessionId:null
        },
        data:function() {
            var that = this;
            return {
                isScore:true
            }
        },
        watch:{
            playControll:{
                //检测playControll变量，当该变量发生变化时掉用
                handler:function(curVal,oldVal){
                    if(curVal.status=='init-playing'){
                        $('.play').addClass('forbidden');
                    }else{
                        $('.play').removeClass('forbidden');
                    }
                   if(curVal.status=='playing'){
                       $('#play-tip').html('暂停');
                       $('.play .ico-play').removeClass('ico-play').addClass('ico-stop');
                   }else{
                       $('#play-tip').html('播放');
                       $('.play .ico-stop').removeClass('ico-stop').addClass('ico-play');
                   };
                },
                deep:true
            },
            option1:{
                handler:function(curVal,oldVal){
                    echarts.getInstanceByDom($('#chart-one').get(0)).setOption(curVal);
                },
                deep:true
            },
            option2:{
                handler:function(curVal,oldVal){
                    echarts.getInstanceByDom($('#inten-chart-one').get(0)).setOption(curVal);
                },
                deep:true
            }
        },
        methods:{
            //1维数组变2维数组的方法（指定对象数组）
            arrUpper:function(xArr,yArr){
                if(!xArr||!yArr||xArr.length<=0||yArr.length<=0){
                    return [[]];
                }else if(xArr.length!=yArr.length){
                    new Error("Can not upper beacause two arr'length not equals!")
                }else{

                    var t = [];
                    for(var i = 0 ; i<xArr.length;i++){
                        t.push({
                            value:[xArr[i],yArr[i].value],
                            symbol:yArr[i].symbol,
                            symbolSize:yArr[i].symbolSize
                        });
                    }
                    return t;
                }
            },
            //1维数组变2维数组
            arrUpper2:function(xArr,yArr){
                if(!xArr||!yArr||xArr.length<=0||yArr.length<=0){
                    return [[]];
                }else if(xArr.length!=yArr.length){
                    new Error("Can not upper beacause two arr'length not equals!")
                }else{

                    var t = [];
                    for(var i = 0 ; i<xArr.length;i++){
                        t.push([xArr[i],yArr[i]]);
                    }
                    return t;
                }
            },
            //电频强度切换
            swicthScore:function(){
              if(this.isScore){
                  this.isScore =false;
                    setTimeout(function(){
                        echarts.getInstanceByDom($('#inten-chart-one').get(0)).resize();
                    },0);
              }else{
                  this.isScore =true;
              }
            },
            //播放、暂停核心方法，此方法会根据playcontroll设置参数初始化图表播放定时器，并动态改变
            //playControll中状态和位置值
            play:function(){
                //此方法结合算法动态改变echarts图表
                if($('.play').hasClass('forbidden'))return;
                var that = this;
                //status 状态分为 init(初始化位置，此时会触发初始化动画)
                //                init-playing(初始化动画进行中)
                //                stop(点击暂定了)
                //                over(进度条播放到末尾)

                //if 为true时开始播放 false时暂停播放
                if((that.playControll.status=='init'||that.playControll.status=='init-playing'||that.playControll.status=='stop'||that.playControll.status=='over')&&that.playControll.end<=100){
                    var _unit_run = that.playControll.speed/that.playControll.frame;//每单元时间行走的秒数
                    var _pre_unit_run =_unit_run/that.playControll.total*100;//每单元时间行走的百分比
                    var barMaxSize = that.playControll.areaSize/that.levelData.maxX*100;

                    var calculate_progress = function(p){
                        //时间进度的计算方法

                        if(that.playControll.status == 'init'){
                            that.playControll.now = 0;
                            that.playControll.percent = 0;
                        }else if(that.playControll.status=='init-playing'){
                            that.playControll.now += _unit_run;
                            that.playControll.percent += _unit_run/that.playControll.total;
                        }else if(that.playControll.status=='playing'){
                            that.playControll.now = p;
                            that.playControll.percent = p/that.playControll.total;
                        }
                        else if(that.playControll.status=='stop'){}
                        else if(that.playControll.status == 'over'){
                            that.playControll.now = that.playControll.total;
                            that.playControll.percent = 100;
                        }
                    }

                    //当设置了自动重播时，状态为over时重播
                    if(that.playControll.allowRestart&&that.playControll.status=='over'){
                        that.playControll.status ='init';
                        that.playControll.initStatus=false;
                        that.playControll.now = 0;
                        that.playControll.percent = 0;
                    }
                    //记录下上一帧数的状态
                    var _nowStatus = that.playControll.status;

                    //设置定时器
                    that.playControll.timer = setInterval(function(){
                        //获取图表对象
                        var t_chart = echarts.getInstanceByDom($('#chart-one').get(0));
                        var t_option = t_chart.getOption();

                        var t_chart2 = echarts.getInstanceByDom($('#inten-chart-one').get(0));
                        var t_option2 = t_chart2.getOption();


                        //initStatus == false 是处于初始状态，需要初始化动画
                        if(!that.playControll.initStatus){
                            //初始化动画只需触发一次，所以应在status为init时触发
                            if(_nowStatus=='init'){
                                _nowStatus='playing';
                                that.playControll.status = 'init-playing';
                                t_option.dataZoom[0].start =0;
                                t_option.dataZoom[0].end = barMaxSize;
                                t_option.animationDuration= that.playControll.initTime;
                                t_chart.clear();
                                t_chart.setOption(t_option);

                                t_option2.animationDuration= that.playControll.initTime;
                                t_option2.dataZoom[0].start = t_option.dataZoom[0].start;
                                t_option2.dataZoom[0].end = t_option.dataZoom[0].end;
                                t_chart2.clear();
                                t_chart2.setOption(t_option2);
                                //设置定时监控初始化动画结束时，修改initstatus 状态
                                setTimeout(function(){if(that.playControll.status!='init')that.playControll.initStatus=true;},(that.playControll.initTime-1000/that.playControll.frame));
                            }
                            calculate_progress();
                        }else{
                            that.playControll.status = 'playing';
                            //initStatus == true 是处于初始状态，正常动画
                            //p 为当前进度BAR 的尾部位置
                            var p = t_option.dataZoom[0].end*that.playControll.total/100;
                            if((p+_unit_run)>=that.playControll.total){
                                that.playControll.status = 'over';
                                t_option.dataZoom[0].start = 100-barMaxSize;
                                t_option.dataZoom[0].end = 100;
                                if(that.playControll.timer!=null){
                                    clearTimeout(that.playControll.timer);
                                    that.playControll.timer= null;
                                }
                                calculate_progress();
                            }else{
                                t_option.dataZoom[0].start +=_pre_unit_run;
                                t_option.dataZoom[0].end +=_pre_unit_run;
                                calculate_progress(t_option.dataZoom[0].end*that.playControll.total/100);
                            }
                            t_option.animationDuration= 1000;
                            t_chart.setOption(t_option);

                            t_option2.dataZoom[0].start = t_option.dataZoom[0].start;
                            t_option2.dataZoom[0].end = t_option.dataZoom[0].end;
                            t_chart2.setOption(t_option2);
                        }

                    },(1000/that.playControll.frame));
                }else if(that.playControll.status =='playing'){

                    if(that.playControll.timer!=null){
                        clearTimeout(that.playControll.timer);
                        that.playControll.timer= null;
                        that.playControll.status = 'stop';
                    }
                }


            }

        },
        computed:{
        option1: function(){
            //动态计算echarts图表参数
            var that = this;
            return{
                //图表点击回调方法
                clickfn:function(param){
                    if(!param.data.symbol)return;
                    var _id;
                    var _line;
                    var _sessionStartTime;
                    var _sessionEndTime;
                    if(param.seriesName=='上行'){
                        _line = 'ul';
                        _id = that.fragData.ul_Slice_XDR_ID[param.dataIndex];
                        _sessionStartTime = that.fragData.ul_Slice_Start_Time[param.dataIndex];
                        _sessionEndTime = that.fragData.ul_slice_end_time[param.dataIndex];
                    }
                    else if(param.seriesName=='下行'){
                        _line = 'dl';
                        _id = that.fragData.dl_Slice_XDR_ID[param.dataIndex];
                        _sessionStartTime = that.fragData.dl_Slice_Start_Time[param.dataIndex];
                        _sessionEndTime = that.fragData.dl_slice_end_time[param.dataIndex];
                    }

                    that.$parent.eventsWindow = [{
                        eid:_id,
                        eline:_line,
                        sessionStartTime:_sessionStartTime,
                        sessionEndTime:_sessionEndTime
                    }];
                    that.$parent.isLayerOpen = true;
                },
                //区域缩放变化回调方法
                datazoomfn:function(param){
                   var option2 =  echarts.getInstanceByDom($('#inten-chart-one').get(0)).getOption();
                    option2.dataZoom[0].start = param.start;
                    option2.dataZoom[0].end = param.end;
                    echarts.getInstanceByDom($('#inten-chart-one').get(0)).setOption(option2);
                },
                dataZoom: [
                    {
                        zoomLock:true,
                        type: 'slider',
                        height: 10,
                        xAxisIndex: [0,1],
                        bottom: 0,
                        start: that.playControll.start,
                        end: that.playControll.end,//(60/that.fragData.time[that.fragData.time.length-1])*100,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '90%',
                        handleStyle: {
                            color: "#02e98e"
                        },
                        textStyle: {
                            color: "#02e98e"
                        },
                        fillerColor:'#02e98e',
                        borderColor: "#163a38",
                        backgroundColor: '#163a38'
                    }],
                tooltip:{
                  show:true,
                    formatter:function(param){

                        if(param[0]){

                            if(param[0].seriesName == '上行'){
                                return '<div>'+
                                        '开始时间:'+that.fragData.ul_Slice_Start_Time[param[0].dataIndex]+'<br>'+
                                        '结束时间:'+that.fragData.ul_slice_end_time[param[0].dataIndex]+'<br>'+
                                        '源端小区:'+that.fragData.ul_Start_ECI_Src[param[0].dataIndex]+'<br>'+
                                        '对端小区:'+that.fragData.ul_Start_ECI_Dest[param[0].dataIndex]+'<br>'+
                                        'mos:'+that.fragData.ul_KQI_MOS[param[0].dataIndex].value+'<br>'
                                        +'</div>';
                            }else if(param[0].seriesName == '下行'){
                                return '<div>'+
                                        '开始时间:'+that.fragData.dl_Slice_Start_Time[param[0].dataIndex]+'<br>'+
                                        '结束时间:'+that.fragData.dl_slice_end_time[param[0].dataIndex]+'<br>'+
                                        '源端小区:'+that.fragData.dl_Start_ECI_Src[param[0].dataIndex]+'<br>'+
                                        '对端小区:'+that.fragData.dl_Start_ECI_Dest[param[0].dataIndex]+'<br>'+
                                        'mos:'+that.fragData.dl_KQI_MOS[param[0].dataIndex].value+'<br>'
                                        +'</div>';
                            }
                        }

                    },
                    trigger:'axis',
                    transitionDuration:0
                },
                grid:[{
                    top:15,
                    right:40,
                    left:40,
                    height:120
                },{
                    top:150,
                    right:40,
                    left:40,
                    height:120
                }],
                xAxis: [
                    {
                        min:0,
                        max:that.levelData.maxX,
                        gridIndex:0,
                        type: 'value',
                        boundaryGap: false,
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            show:false
                        },
                        splitLine:{
                            show:false
                        }
                        //max:that.playControll.areaSize
                       // data: that.fragData.time
                    },
                    {
                        min:0,
                        max:that.levelData.maxX,
                        gridIndex:1,
                        type: 'value',
                        boundaryGap: false,
                        axisLine:{
                            lineStyle:{
                                color:'#02e98e'
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#b6bfc9'
                            }
                        },
                        splitLine:{
                            show:false
                        }
                        //max:that.playControll.areaSize
                       // data:  that.fragData.time
                    }
                ],
                yAxis: [
                    {
                        gridIndex:0,
                        name: '',
                        type: 'value',
                        splitLine:{
                            show:false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#e59a3d'
                            }
                        },
                        axisTick:{
                            show:true
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#b6bfc9'
                            }
                        },
                        max: Math.ceil(Math.max.apply(null, $.map(that.fragData.dl_KQI_MOS,function(item){return item.value;}))),
                        min:0

                    },
                    {
                        gridIndex:1,
                        name: '',
                        type: 'value',
                        splitLine:{
                            show:false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#02e98e'
                            }
                        },
                        axisTick:{
                            show:true
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#b6bfc9'
                            }
                        },
                        max: Math.ceil(Math.max.apply(null, $.map(that.fragData.ul_KQI_MOS,function(item){return item.value;}))),
                        min:0
                    }
                ],

                series: [
                    {

                        yAxisIndex:0,
                        xAxisIndex:0,
                        name: '下行',
                        type: 'line',
                        symbol:'circle',
                        symbolSize:9,

                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#e59a3d',
                                lineStyle: {
                                    color: '#e59a3d'
                                },
                                areaStyle: {
                                    color: 'rgba(229, 154, 61, 0.2)'
                                }
                            }
                        },
                        data:that.arrUpper(that.fragData.dl_time,that.fragData.dl_KQI_MOS)
                    },
                    {
                        yAxisIndex:1,
                        xAxisIndex:1,
                        name: '上行',
                        type: 'line',
                        symbol:'circle',
                        symbolSize:9,

                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#02e98e',
                                lineStyle: {
                                    color: '#02e98e'
                                },
                                areaStyle: {
                                    color: 'rgba(0, 234, 158, 0.2)'
                                }
                            }
                        },
                        data:that.arrUpper(that.fragData.ul_time,that.fragData.ul_KQI_MOS)
                    }
                ]
            }
        },
        option2: function(){
            //动态计算echarts图表参数
            var that = this;
            return{
                clickfn:function(param){

                },
                dataZoom: [
                    {
                        show:false,
                        zoomLock:true,
                        type: 'slider',
                        height: 10,
                        xAxisIndex: [0,1],
                        bottom: 0,
                        start: that.option1.dataZoom[0].start,
                        end: that.option1.dataZoom[0].end,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '90%',
                        handleStyle: {
                            color: "##02e98e"
                        },
                        textStyle: {
                            color: "#02e98e"
                        },
                        fillerColor:'#02e98e',
                        borderColor: "#163a38",
                        backgroundColor: '#163a38'
                    }],
                grid:[{
                    top:8,
                    right:40,
                    left:40,
                    height:38
                },
                    {
                        top:53,
                        right:40,
                        left:40,
                        height:38
                    }
                ],
                tooltip:{
                    trigger:'axis',
                    show:true,
                    formatter:function(param){

                        if(param[0].seriesName==='源端'){
                            return '<div>'+
                                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+param[0].color+'"></span>' +
                                    '<span>'+that.levelData.srcTime[param[0].dataIndex]+'</span><br>'+
                                    '小区:'+that.levelData.srcCELLID[param[0].dataIndex]+'<br>'+
                                    '时间:'+that.levelData.srcMeasureTime[param[0].dataIndex]+'<br>'+
                                    'MR类型:'+that.levelData.srcMrType[param[0].dataIndex]+'<br>'+
                                    'RSRP:'+that.levelData.srcServingRSRP[param[0].dataIndex]+'dBm<br>'+
                                    'RSRQ:'+that.levelData.srcServingRSRQ[param[0].dataIndex]+'<br>'+
                                    'eNBRxPow:'+that.levelData.srcENBReceivedPower[param[0].dataIndex]+'<br>'+
                                    'UL SINR:'+that.levelData.srcULSINR[param[0].dataIndex]+'<br>'+
                                    '</div>'
                        }else if(param[0].seriesName==='对端'){
                            return '<div>'+
                                    '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+param[0].color+'"></span>' +
                                    '<span>'+that.levelData.destTime[param[0].dataIndex]+'</span><br>'+
                                    '小区:'+that.levelData.destCELLID[param[0].dataIndex]+'<br>'+
                                    '时间:'+that.levelData.destMeasureTime[param[0].dataIndex]+'<br>'+
                                    'MR类型:'+that.levelData.destMrType[param[0].dataIndex]+'<br>'+
                                    'RSRP:'+that.levelData.destServingRSRP[param[0].dataIndex]+'dBm<br>'+
                                    'RSRQ:'+that.levelData.destServingRSRQ[param[0].dataIndex]+'<br>'+
                                    'eNBRxPow:'+that.levelData.destENBReceivedPower[param[0].dataIndex]+'<br>'+
                                    'UL SINR:'+that.levelData.destULSINR[param[0].dataIndex]+'<br>'+
                                    '</div>'
                        }
                    }
                },
                xAxis: [
                    {
                        min:0,
                        max:that.levelData.maxX,
                        gridIndex:0,
                        type: 'value',
                        boundaryGap: false,
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            show:false
                        },
                        splitLine:{
                            show:false
                        }
                        //data: that.levelData.time
                    },
                    {
                        min:0,
                        max:that.levelData.maxX,
                        gridIndex:1,
                        type: 'value',
                        boundaryGap: false,
                        axisLine:{
                            show:false
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            show:false
                        },
                        splitLine:{
                            show:false
                        }

                        //data: that.levelData.time
                    }
                ],
                yAxis: [
                    {
                        gridIndex:0,
                        name: '',
                        type: 'value',
                        splitLine:{
                            show:false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#e59a3d'
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#b6bfc9'
                            }
                        },
                        splitNumber:2,
                        max: 'dataMax'
                    },{
                        gridIndex:1,
                        name: '',
                        type: 'value',
                        splitLine:{
                            show:false
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#02e98e'
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#b6bfc9'
                            }
                        },
                        splitNumber:2,
                        max: 'dataMax'
                    }
                ],
                series: [
                    {
                        yAxisIndex:0,
                        xAxisIndex:0,
                        name: '源端',
                        type: 'line',
                        symbol:'circle',
                        symbolSize:9,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#e59a3d',
                                lineStyle: {
                                    color: '#e59a3d'
                                }
                            }
                        },
                        //data: that.levelData.destServingRSRP
                        data:that.arrUpper2(that.levelData.srcTime,that.levelData.srcServingRSRP)
                    },
                    {
                        yAxisIndex:1,
                        xAxisIndex:1,
                        name: '对端',
                        type: 'line',
                        symbol:'circle',
                        symbolSize:9,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: '#02e98e',
                                lineStyle: {
                                    color: '#02e98e'
                                }
                            }
                        },
                        //data: that.levelData.srcServingRSRP
                        data:that.arrUpper2(that.levelData.destTime,that.levelData.destServingRSRP)
                    }
                ]
            }
        }
    }
    }
</script>
