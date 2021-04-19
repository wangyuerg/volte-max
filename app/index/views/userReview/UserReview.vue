<template>
    <div>
        <div class="content">
            <wd-carousel :data="wdData" v-if="wdInit"></wd-carousel>
            <!--上部分-->
            <div class="content-t">
                <!--查询-->
                <div class="search">
                    <form method="" class="ued-form">
                        <table width="100%">
                            <tr>
                                <th>手机号/IMSI</th>
                                <td width="17%"><input class="ued-input" id="txt-input" type="text" v-model.trim="searchCondition.keyword" placeholder="请输入..."></td>
                                <th>开始时间</th>
                                <td width="17%">
                                    <input  class="j-timepicker Wdate" id="start-time-input" readonly/>
                                </td>
                                <th>结束时间</th>
                                <td width="17%">
                                    <input  class="j-timepicker Wdate" id="end-time-input" readonly />
                                </td>
                                <td width="9%"><button type="button" class="ued-btn" @click="search"><i class="ued-ico ico-search"></i>查询</button></td>
                                <td>
                                    <button type="button" class="ued-btn ued-btn-pill" id="deploy" @click="openSettings"><i class="ued-ico ico-set"></i>配置</button>
                                    <button type="button" class="ued-btn ued-btn-pill" id="export" @click="exportTable"><i class="ued-ico ico-export"></i>导出</button>
                                </td>
                            </tr>
                        </table>
                    </form>
                </div>
                <!--色块-->
                <ul class="result-list">
                    <li>
                        <a href="javascript:;">
                            <div class="result-box thsl">
                                <div class="result-box-bor">
                                    <div class="result-icon"></div>
                                    <div class="result-txt">
                                        <h4>通话数量</h4>
                                        <div class="num">{{phoneCount}}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <div class="result-box zcthsl">
                                <div class="result-box-bor">
                                    <div class="result-icon"></div>
                                    <div class="result-txt">
                                        <h4>质差通话数量</h4>
                                        <div class="num">{{badPhoneCount}}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <div class="result-box pjf">
                                <div class="result-box-bor">
                                    <div class="result-icon"></div>
                                    <div class="result-txt">
                                        <h4>平均MOS分</h4>
                                        <div class="num">{{MOSscore}}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <div class="result-box zdxh">
                                <div class="result-box-bor">
                                    <div class="result-icon"></div>
                                    <div class="result-txt">
                                        <h4>终端型号</h4>
                                        <div class="num fixOver">{{model}}</div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <!--表格-->
                <div class="table-index-new table-scroll-index">
                    <table cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                            <th class="first-head-th" v-show="tableHead.length>0"></th>
                            <th v-for="(item,index) in tableHead"
                                class="table-header"
                                :style="tableWidth(item)">
                                <span>{{item}}</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody style="height: 243px;">
                        <tr  v-for="(record,index) in tableInfo"
                             :class="record.id==tableActiveId ? 'active level1-tr' : ' level1-tr'">
                            <th class="first-body-th" :class="'level'+(record.color!=1&&record.color!=2&&record.color!=3 ? '-other' : record.color)">
                            </th>
                            <td v-for="(item,index2) in tableHead"
                                class="table-body-item"
                                :style="tableWidth(item)"
                                @click="showCharts(record.id,record['开始时间'],record['结束时间'],record['对端号码'])">
                                <span :title="item === '对端号码' ? encryptionCode(record[item]): record[item]">{{item === '对端号码' ? encryptionCode(record[item]): record[item]}}</span>
                            </td>
                        </tr>
                        <div class="table-no-info" v-if="tableInfo.length==0&&tableHead.length>0">
                            没有符合查询条件的记录
                        </div>
                        <tr class="fix-table-pd" style="width:100%;height:20px;"  v-if="tableInfo.length>0"></tr>
                        </tbody>
                    </table>
                    <!--<table>-->
                        <!--<div>-->
                            <!--<thead>-->
                            <!--<tr>-->
                                <!--<th class="first-head-th" v-show="tableHead.length>0"></th>-->
                                <!--<th v-for="(item,index) in tableHead" class="table-header item-common">-->
                                    <!--<span>{{tableHead.length==(index+1)?item+'&nbsp;&nbsp;&nbsp;':item}}</span>-->
                                <!--</th>-->
                            <!--</tr>-->
                            <!--</thead>-->
                        <!--</div>-->
                        <!--<div class="table-body" style="height: 295px;">-->
                           <!--<tbody>-->
                           <!--<tr  v-for="(record,index) in tableInfo"-->
                                <!--:class="record.id==tableActiveId ? 'active level1-tr' : ' level1-tr'"-->
                                <!--style="cursor: pointer;">-->
                               <!--<th class="first-body-th">-->
                                   <!--<span :class="'level'+(record.color!=1&&record.color!=2&&record.color!=3 ? '-other' : record.color)"></span>-->
                               <!--</th>-->
                               <!--<td v-for="(item,index2) in tableHead"-->
                                   <!--class="table-body-item item-common"-->
                                   <!--@click="showCharts(record.id,record['开始时间'],record['结束时间'],record['对端号码'])">-->
                                   <!--<span :title="item === '对端号码' ? encryptionCode(record[item]): record[item]">{{item === '对端号码' ? encryptionCode(record[item]): record[item]}}</span>-->
                               <!--</td>-->
                           <!--</tr>-->
                           <!--<div class="table-no-info" v-if="tableInfo.length==0&&tableHead.length>0">-->
                               <!--没有符合查询条件的记录-->
                           <!--</div>-->
                           <!--<tr class="fix-table-pd" style="width:100%;height:20px;"  v-if="tableInfo.length>0"></tr>-->
                           <!--</tbody>-->
                       <!--</div>-->
                    <!--</table>-->
                </div>
            </div>
            <div id='labelText' style='top: 0;position: absolute;white-space:nowrap;display:block;visibility: collapse;'></div>
            <div id='labelContent' style='top: 0;position: absolute;white-space:nowrap;display:block;visibility: collapse;'></div>

            <!--下部分-->
            <div class="content-b">
                <!--左侧-->
                <div class="content-b-l">
                    <j-left :fragData.sync="fragData"
                            :playControll.sync="playControll"
                            :indexData.sync="indexData"
                            :levelData.sync="levelData"
                            :sessionId.sync="currentSessionId"></j-left>
                </div>
                <!--右侧-->
                <div class="content-b-r">
                    <gis-map :styleObject="mapStyleOption" :mapOption="mapOption" :points="mapPoints"></gis-map>
                </div>
            </div>

        </div>

        <!--配置弹出 -->
        <div id="layer-deploy" >
            <div v-nicescroll="niceScrollOption" class="j-container ">
            <form method="" >
                <div class="layer-pd">
                    <div class="layer-box-t">
                        <div class="tit">基础信息</div>
                        <div class="check-box">
                            <input id="checkall0" type="checkbox" @click="fullClick(0)">
                            <label for="checkall0">全选</label>
                        </div>
                    </div>
                    <div class="layer-box-c" id="checkall0-area">
                        <ul class="clearfix">
                            <li v-for="(item, index) in settingOptions" v-if="item.columnOption!=2&&item.qualityFlag==0">
                                <div class="check-box">
                                    <input :id="item.columnCode" type="checkbox" class="myinput" >
                                    <label :for="item.columnCode">{{item.columnName}}</label>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div class="layer-box mt20" id="layer-zlzb">
                        <div class="layer-box-t">
                            <div class="tit">质量指标</div>
                            <div class="check-box">
                                <input id="checkall1" type="checkbox" @click="fullClick(1)">
                                <label for="checkall1">全选</label>
                            </div>
                        </div>
                        <div class="layer-box-c" id="checkall1-area">
                            <ul class="clearfix">
                                <li v-for="(item, index) in settingOptions" v-if="item.columnOption!=2&&item.qualityFlag==1">
                                    <div class="check-box">
                                        <input :id="item.columnCode" type="checkbox" class="myinput">
                                        <label :for="item.columnCode">{{item.columnName}}</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        </div>

        <event-window :eid="eventsWindow[0].eid"
                      :eline="eventsWindow[0].eline"
                      :sessionStartTime="eventsWindow[0].sessionStartTime"
                      :sessionEndTime="eventsWindow[0].sessionEndTime"
                      :destMsisdn="eventsWindow[0].destMsisdn"
                      :esessionId="currentSessionId"
                      v-if="isLayerOpen"
                      @closeEvent="closeEvent"></event-window>
        <search-limit :keyword="searchCondition.keyword" :isOpen.sync="isOpen" ></search-limit>
    </div>

</template>

<script>
    /**
     * 用户回放
     */
    import '../../util.js'
    var base = require('config');
    var niceScroll =  require('../../directives/NiceScroll.js');
    var Echarts = require('../../directives/charts.js');
    var stickySort = require('../../directives/stickySort.js');
    var layer = require('layer');
    var echarts = require('echarts');
    import gis from  './UserReview-Map.vue'
    import eventWindow from './UserReview-event.vue'
    import websocket from '../util/websocket.vue'

    require('../../directives/export/tableExport.js');
    require('laydate');
    //require('laydate.css');
    //require('../directives/laydate-master/skins/molv/laydate.css');


    //require('../directives/layer/skin/layer.css');
    //公司GUI框架，在配置文件将window.ued注册为全局后才可使用
    require('gui');
    setTimeout(function(){
       window.ued.init();
    },0);

    var currentUser = null;
    var defaultHeader = null;
    var baseScorllOption = null;

    module.exports ={
        created:function(){
            //组件初始化时调用
            //初始化组件全局变量
            currentUser = base.getCurrentUser();
            defaultHeader = base.defaultHeader();
            baseScorllOption = base.scorllOption();
            window.ued.initCheck();
            this.init();
        },
        components:{
            'j-left':require('./UserReview-left.vue'),
            'gisMap':gis,
            'eventWindow':eventWindow,
            'searchLimit':require('./UserReview-search-limit.vue'),
            'wdCarousel':require('./wdCarousel.vue')
        },
        directives: {
            "echarts":Echarts,
            "stickysort":stickySort,
            "nicescroll":niceScroll
        },
        methods:{
            closeEvent (openStatus) {
                this.isLayerOpen = openStatus
            },
            tableWidth (item) {
                const itemTitle = item.substring(0,item.length);
                let itemContent = ''
                $("#labelText").css({
                    "font-size": "12px",
                    "font-family": "Microsoft YaHei"
                }).html('<span>'+ itemTitle + '</span');
                if (this.tableInfo.length > 0 && !['', null, undefined].includes(this.tableInfo[0][item])) {
                    itemContent = this.tableInfo[0][item].toString();
                }
                $("#labelContent").css({
                    "font-size": "12px",
                    "font-family": "Microsoft YaHei"
                }).html('<span>'+ itemContent + '</span');
                const titleWidth = $("#labelText").find("span").eq(0).width();
                const contentWidth = $("#labelContent").find("span").eq(0).width();
                const result = (titleWidth < contentWidth ? contentWidth : titleWidth) + 20
                return 'width: ' + result.toString() + 'px;'
            },
            // 脱敏处理
            encryptionCode (value) {
                if (![undefined, '', null].includes(value)) {
                    return value.toString().slice(0,3) + '****' + value.toString().slice(11 - 4);
                } else {
                    return '';
                }
            },
            //初始化页面数据加载
            init:function(){
                var that = this;
                that.Api.pb_getPersonalConf(currentUser.userName)
                        .then(
                        function(response){
                            that.settingOptions = response.data.data;
                            setTimeout(function(){
                                window.ued.initCheck();
                            },0);
                        }
                );
                that.Api.pb_getLasttime()
                        .then(
                                function(response){
                                    if(response.data.status == 'success'){
                                        $('#start-time-input').val(new Date(response.data.data.start_time).format('yyyy-MM-dd HH:mm'));
                                        $('#end-time-input').val(new Date(response.data.data.end_time).format('yyyy-MM-dd HH:mm'));
                                        $('#start-time-input').focus(function(){
                                            laydate({elem:'#start-time-input',istime: true, format: 'YYYY-MM-DD hh:mm',istoday: false,isclear:false});
                                        });
                                        $('#end-time-input').focus(function(){
                                            laydate({elem:'#end-time-input',istime: true, format: 'YYYY-MM-DD hh:mm',istoday: false,isclear:false});
                                        });
                                    }
                                }
                        );

                that.Api.pb_getPrivileged()
                        .then(function(response){
                            if(response.data.status == 'success'){
                                that.wdData = $.map(response.data.data,function(item){
                                   item.value = '您申请的要查询的手机号码或者IMSI是<b style="color:yellow;"> '+item.phoneNo+' </b>操作，现在已经获得授权，有效期三小时。';
                                    var time = 5*60*1000 - (new Date().getTime() - new Date(item.successTime).getTime());
                                    item.time = time>0?time:0;
                                    return item;
                                });
                                that.wdInit = true;
                            }
                        });
                //从websocket 接收数据
                var wsHandle = function (data){
                    var node = JSON.parse(data);
                    var time = 5*60*1000 - (new Date().getTime() - new Date(node.successTime).getTime());//验证成功5分钟内有效
                    if(time>0){
                        node.value = '您申请的要查询的手机号码或者IMSI是<b style="color:yellow;"> '+node.phoneNo+' </b>操作，现在已经获得授权，有效期三小时。';
                        node.time = time;
                        that.$root.eventHub.$emit('wdCarousel-add', node)
                    }

                };
                websocket.connect(wsHandle,true);
            },
            //配置按钮点击
            openSettings:function(){
              var that = this;
              for(var i = 0 ; i < that.settingOptions.length;i++){
                  if(that.settingOptions[i].columnOption==1){
                      $('#'+that.settingOptions[i].columnCode).iCheck('check');
                  }
                  else if(that.settingOptions[i].columnOption==0){
                  }
              }

              //body scroller fixed
              var oldBodyScorllOption = {
                  styler:'fb',
                  cursorcolor:"#0c151f",
                  background: '#192a3e',
                  cursorwidth: '6',
                  cursorborder:"3px solid rgba(19,88,148,0)",
                  cursorborderradius: '12px',
                  cursoropacitymin :1,
                  spacebarenabled:false,
                  preservenativescrolling:true,
                  zindex: '9999999999999'
              };
              var nBodyScorllOption = {
                  styler:'fb',
                  cursorcolor:"#0c151f",
                  background: '#192a3e',
                  cursorwidth: '6',
                  cursorborder:"3px solid rgba(19,88,148,0)",
                  cursorborderradius: '12px',
                  cursoropacitymin :1,
                  spacebarenabled:false,
                  preservenativescrolling:true,
                  enablemousewheel:false,
                  zindex: '9999999999999'
              };


              $('body').niceScroll(nBodyScorllOption).hide();
              layer.open({
                  type: 1,
                  title: '配置',
                  area:['900px','600px'],
                  scrollbar:true,
                  resize:true,
                  skin: 'demo-class',
                  content: $('#layer-deploy'),
                  btn:['确定','取消'],
                  yes:function(index){
                      var loadingIndex = layer.load(2);
                   $('.myinput').each(function(){
                        if($(this).is(":checked")){
                            for(var j =0 ; j <that.settingOptions.length;j++){
                                if(that.settingOptions[j].columnCode == $(this).attr("id")){
                                    that.settingOptions[j].columnOption =1;
                                    break;
                                }
                            }
                        }else{
                            for(var j =0 ; j <that.settingOptions.length;j++){
                                if(that.settingOptions[j].columnCode == $(this).attr("id")){
                                    that.settingOptions[j].columnOption =0;
                                    break;
                                }
                            }
                        }

                    });
                      //更新个人配置信息
                      that.Api.pb_updatePersonalConf(currentUser.userName,that.settingOptions)
                          .then(function(data){
                              layer.close(loadingIndex);
                              $('body').getNiceScroll().remove();
                              $('body').niceScroll(oldBodyScorllOption).resize();
                              setTimeout(function(){$('#layer-deploy .j-container').getNiceScroll().resize();},0);
                              setTimeout(function(){that.search();},0);
                              layer.close(index);
                          },function(){
                              layer.close(loadingIndex);
                              $('body').getNiceScroll().remove();
                              $('body').niceScroll(oldBodyScorllOption).resize();
                              setTimeout(function(){$('#layer-deploy .j-container').getNiceScroll().resize();},0);
                              setTimeout(function(){that.search();},0);
                              layer.close(index);
                          });

                  },
                  btn2:function(index){
                      //取消
                      layer.close(index);
                      $('#layer-deploy .j-container').niceScroll().resize();
                      $('body').getNiceScroll().remove();
                      $('body').niceScroll(oldBodyScorllOption).resize();
                  },
                  cancel: function(index){
                      layer.close(index);
                      $('#layer-deploy .j-container').niceScroll().resize();
                      $('body').getNiceScroll().remove();
                      $('body').niceScroll(oldBodyScorllOption).resize();
                  }
              });

          },

            //搜索按钮点击
            search:function(){
                var that = this;
                var p1 =that.searchCondition.keyword;
                var p2 = $("#start-time-input").val();
                var p3 = $("#end-time-input").val();
                //有效性验证
                if(p1 == ''){
                    layer.tips('请输入手机号/IMSI','.ued-input',{skin:'tip-class',tips:3,time:2500});
                    return;
                }
                if (!/\d*$/.test(p1)) {
                    layer.tips('手机号/IMSI输入格式有误','.ued-input',{skin:'tip-class',tips:3,time:2500});
                    return;
                }
                if (p1.length != 11 && p1.length != 15) {
                    layer.tips('手机号/IMSI输入格式有误','.ued-input',{skin:'tip-class',tips:3,time:2500});
                    return;
                }
                if(p1.length == 11) {
                    if(/^1\d{10}$/.test(p1)) {
                    } else {
                        layer.tips('手机号/IMSI输入格式有误','.ued-input',{skin:'tip-class',tips:3,time:2500});
                        return;
                    }
                }
                if(p1.length == 15) {
                    if(/^460\d{12}$/.test(p1)) {
                    } else {
                        layer.tips('手机号/IMSI输入格式有误','.ued-input',{skin:'tip-class',tips:3,time:2500});
                        return;
                    }
                }

                if(p2.getDate().getTime()> p3.getDate().getTime()){
                    layer.tips('结束时间应大于或等于开始时间','#end-time-input',{skin:'tip-class',tips:3,time:2500});
                    return;
                }
                that.tableActiveId = ''

                that.searchCash = {
                    keyword:p1,
                    start:p2,
                    end:p3
                };
                var loading_index = layer.load(2);
                //检验查询权限
                that.Api.pb_getAuthConfirm({phoneNo:that.searchCash.keyword})
                    .then(
                        function(){
                            //验证成功
                            that.Api.pb_search(currentUser.userName,p1,p2,p3)
                                    .then(function(response){
                                        layer.close(loading_index);
                                        if(response.data.status == 'success'){
                                            if(that.stickySortOption.isFirst =='init'){
                                                that.stickySortOption.isFirst = 'ready';
                                            }
                                            that.clearLeft();
                                            var data_ =response.data.data;
                                            that.phoneCount = data_.total;
                                            that.badPhoneCount = data_.poor_quality;
                                            that.MOSscore =data_.mos_score_avg;
                                            that.model = data_.model;
                                            that.tableHead = data_.head;
                                            that.tableInfo = data_.info;
                                        }else{
                                            that.$notify.error({
                                                title:'错误',
                                                message:response.data.msg
                                            });
                                        }
                                    });
                        },
                        function(res){
                            layer.close(loading_index);
                            //验证失败
                            //弹出鉴权窗口
                            if(!that.isOpen['flag'])that.isOpen['flag'] = true;
                            that.isOpen['sec'] = res.data.data;
                            }
                            );



            },
            //导出表格
            exportTable:function(){
                var that = this;
                if(that.tableInfo.length <= 0){
                    that.$message.warning('无数据可以导出')
                    return;
                }
                var p1 =that.searchCondition.keyword;
                var p2 = $("#start-time-input").val();
                var p3 = $("#end-time-input").val();
                that.Api.pb_search_export(currentUser.userName,p1,p2,p3)
                    .then(res => {
                        let blob = res.data
                        let reader = new FileReader()
                        reader.readAsDataURL(blob)
                        reader.onload = (e) => {
                            let fileName = res.headers['content-disposition'].split(';')[2].split('\"')[1]
                            let a = document.createElement('a')
                            a.download = `${decodeURIComponent(fileName.replace(/\+/g,' '))}`
                            a.href = e.target.result
                            document.body.appendChild(a)
                            a.click()
                            document.body.removeChild(a)
                        }
                    })
                    .catch(err => {
                        console.log(err.message)
                    })
            },
            //全选点击
            fullClick:function(t){
                var $full = $('#checkall'+t);

                if($full.is(':checked')) {
                    $('#checkall'+t+'-area').find('.myinput').iCheck('check');
                }else{
                    $('#checkall'+t+'-area').find('.myinput').iCheck('uncheck');
                }

                $('#layer-deploy .j-container').niceScroll().resize();
            },
            /**
             * 显示图表
             * @param id display接口的id
             * @param startTime 开始时间
             * @param endTime 结束时间
             * @param destMsisdn 对端手机号
             */
            showCharts:function(id, startTime, endTime, destMsisdn){
                var that = this;
                that.tableActiveId = id;
                var loading_index = layer.load(2);
                that.Api.pb_getSessionById(id, startTime, endTime, destMsisdn)
                    .then(function(response){
                        layer.close(loading_index);
                        if(response.data.status =='success'){
                            that.currentSessionId = id;
                            //上行，下行得分处理
                            var data_ = response.data.data.slice;
                            var ul_ = data_.ul_KQI_MOS;
                            var ul_event = data_.ulEvent;
                            var dl_ = data_.dl_KQI_MOS;
                            var dl_event = data_.dlEvent;
                            //计算图片并设置
                            data_.ul_KQI_MOS = $.map(ul_,function(item,index){
                                var dt = ul_event[index]==''?[]:ul_event[index].substring(1).split('-');
                                if(dt.length == 0 ){
                                    return{
                                        value:item
                                    }
                                }else if(dt.length == 1){
                                    return{
                                        value:item,
                                        symbol:'image://'+base.resUrl+'images/icon/'+dt[0]+'_ul.png',
                                        symbolSize:[30,30]
                                    }
                                }else if(dt.length >1){
                                    return{
                                        value:item,
                                        symbol:'image://'+base.resUrl+'images/icon/'+dt[0]+'_ul_more.png',
                                        symbolSize:[42,35]
                                    }
                                }
                            });
                            data_.dl_KQI_MOS = $.map(dl_,function(item,index){
                                var dt = dl_event[index]==''?[]:dl_event[index].substring(1).split('-');
                                if(dt.length == 0 ){
                                    return{
                                        value:item
                                    }
                                }else if(dt.length == 1){
                                    return{
                                        value:item,
                                        symbol:'image://'+base.resUrl+'images/icon/'+dt[0]+'_dl.png',
                                        symbolSize:[30,30]
                                    }
                                }else if(dt.length >1){
                                    return{
                                        value:item,
                                        symbol:'image://'+base.resUrl+'images/icon/'+dt[0]+'_dl_more.png',
                                        symbolSize:[42,35]
                                    }
                                }
                            });

                            that.fragData = data_;




                            that.indexData = response.data.data.index;
                            that.levelData = response.data.data.level;
                            that.sliceData = response.data.data.slice;



                            var _p = [];
                            if(that.fragData.ul_time.length>0){
                                _p.push(that.fragData.ul_time[that.fragData.ul_time.length-1]);
                            }
                            if(that.fragData.dl_time.length>0){
                                _p.push(that.fragData.dl_time[that.fragData.dl_time.length-1]);
                            }
                            if(that.levelData.srcTime.length>0){
                                _p.push(that.levelData.srcTime[that.levelData.srcTime.length-1]);
                            }
                            if(that.levelData.destTime.length>0){
                                _p.push(that.levelData.destTime[that.levelData.destTime.length-1]);
                            }

                            that.levelData.maxX = Math.max.apply(null,_p);

                            that.clearTimerSettings();


                            //设置播放参数
                            that.playControll.total = Math.max.apply(null,that.fragData.ul_time)>Math.max.apply(null,that.fragData.dl_time)
                                ? Math.max.apply(null,that.fragData.ul_time):Math.max.apply(null,that.fragData.dl_time);
                            that.playControll.areaSize =  that.playControll.total>=60?60:that.playControll.total;
                            that.playControll.end = (that.playControll.areaSize/that.levelData.maxX)*100;
                            that.playControll.initTime = parseInt(that.playControll.areaSize/that.playControll.speed*1000);
                            //地图设置
                            that.mapPoints = response.data.data.maps;


                        } else {
                            layer.close(loading_index);
                            that.$message.error(response.data.message)
                        }
                    })
                    .catch(err => {
                        layer.close(loading_index);
                        console.log(err)
                    })
            },
            //clear left
            clearLeft :function(){
                this.fragData = {
                    "ul_slice_end_time": [],//结束时间
                            "dl_slice_end_time": [],//结束时间
                            "ul_Slice_XDR_ID": [],//上行id
                            "ul_KQI_MOS": [],//上行mos得分
                            "ulEvent": [],//上行触发事件
                            "ul_Slice_Start_Time": [],//开始时间
                            "dl_Slice_Start_Time": [],//开始时间
                            "dl_KQI_MOS": [],//下行mos得分
                            "Start_ECI_Src": [],//源端小区
                            'ul_time': [],//横坐标时间
                            'dl_time': [],//横坐标时间
                            "dlEvent": [],//下行事件
                            "End_ECI_Src": [],//对端小区
                            "dl_Slice_XDR_ID": []//下行id
                };
                this.levelData = {
                    "destServingRSRP": [],//源端RSRP
                    "srcServingRSRP": [],//对端RSRP
                    "srcMrType": [],//源端MR类型
                    "destServingRSRQ": [],//对端RSRQ
                    "destENBReceivedPower": [],//对端eNBRxPow
                    "destULSINR": [],//对端UL SINR
                    "srcENBReceivedPower": [],//源端eNBRxPow
                    "ul_time": [],
                    "dl_time":[],
                    "srcULSINR": [],//源端UL SINR
                    "measureTime": [],//时间
                    "destMrType": [],//对端MR类型
                    "srcServingRSRQ": [], //源端RSRQ
                    "srcCELLID ":[],//源端小区
                    "destCELLID ":[],//对端小区
                    "maxX":1
                };
                this.clearTimerSettings();
            },
            clearTimerSettings:function(){
                //清空播放
                if(this.playControll.timer!=null){
                    clearTimeout(this.playControll.timer);
                    this.playControll.timer = null;
                    this.playControll.status ='init';
                    this.playControll.initStatus=false;
                    this.playControll.percent = 0;
                    this.playControll.now = 0;
                }
            }
        },
        data:function() {
            var that = this;
            return {
                phoneCount:0,
                badPhoneCount:0,
                MOSscore:0,
                model:"",
                eventsWindow:[],//事件弹框对象数组
                isLayerOpen:false,//弹框是否打开状态
                //地图设置参数
                mapOption:{
                    host:base.webHost,//地图模块Host
                    useLink:base.webHost+'/GisMap/map.html',//地图模块Link webHost是地图模块存放地址
                    appCode:'VoLTEDemo_Wp27Fb',//地图模块GIS认证码
                    level:8,//初始化地图显示LEVEL
                    districtName:'杭州'//初始化时中心城市
                },
                //地图样式设置参数
                mapStyleOption:{
                    width:'100%',
                    height:'100%'
                },
                //地图点集合
                mapPoints:{
                    srcMark:[],
                    srcUp:[],
                    srcDown:[],
                    destMark:[],
                    destUp:[],
                    destDown:[]
                },
                //查询条件
                searchCondition:{
                  keyword:""
                },
                //查询条件缓存
                searchCash:{
                    keyword:"",
                    start:"",
                    end:""
                },
                //table表头数组
                tableHead:[],
                //table数据数组
                tableInfo:[],
                //当前表格活跃记录ID，即当前点击了哪一条记录
                tableActiveId:'',
                settingOptions:[],
                //niceScroller组件参数
                niceScrollOption:{
                    styler:'fb',
                    cursorcolor:"#0c151f",
                    background: '#192a3e',
                    cursorwidth: '10',
                    cursorborder:"5px solid rgba(19,88,148,0)",
                    cursorborderradius: '12px',
                    cursoropacitymin :1,
                    spacebarenabled:false,
                    zindex: '9999999999999'
                },
                //stickySort组件参数
                stickySortOption:{
                    isFirst:'init',
                    niceScroll:{
                        styler:'fb',
                        cursorcolor:"#0c151f",
                        background: '#192a3e',
                        cursorwidth: '10',
                        cursorborder:"5px solid rgba(19,88,148,0)",
                        cursorborderradius: '12px',
                        cursoropacitymin :1,
                        spacebarenabled:false,
                        enablemousewheel:false,
                        zindex: '100'
                    }
                },
                //当前切片ID
                currentSessionId:null,
                //echarts图标数据（左下第一部分）
                fragData:{
                    "ul_slice_end_time": [],//结束时间
                    "dl_slice_end_time": [],//结束时间
                    "ul_Slice_XDR_ID": [],//上行id
                    "ul_KQI_MOS": [],//上行mos得分
                    "ulEvent": [],//上行触发事件
                    "ul_Slice_Start_Time": [],//开始时间
                    "dl_Slice_Start_Time": [],//开始时间
                    "dl_KQI_MOS": [],//下行mos得分
                    "Start_ECI_Src": [],//源端小区
                    'ul_time': [],//横坐标时间
                    'dl_time': [],//横坐标时间
                    "dlEvent": [],//下行事件
                    "End_ECI_Src": [],//对端小区
                    "dl_Slice_XDR_ID": []//下行id
                },
                //指标数据
                indexData:{},
                //echarts图标数据（左下第二部分）
                levelData:{
                    "destServingRSRP": [],//源端RSRP
                    "srcServingRSRP": [],//对端RSRP
                    "srcMrType": [],//源端MR类型
                    "destServingRSRQ": [],//对端RSRQ
                    "destENBReceivedPower": [],//对端eNBRxPow
                    "destULSINR": [],//对端UL SINR
                     "srcENBReceivedPower": [],//源端eNBRxPow
                    "time": [],
                    "srcULSINR": [],//源端UL SINR
                     "measureTime": [],//时间
                    "destMrType": [],//对端MR类型
                    "srcServingRSRQ": [], //源端RSRQ
                    "srcCELLID ":[],//源端小区
                    "destCELLID ":[]//对端小区

        },
                //播放器核心参数
                playControll:{
                    start:0,
                    end:100,
                    status:'init',//不要修改
                    areaSize:60,
                    total:0,//不要修改
                    speed:20,//每秒前进20秒
                    frame:1,//帧数，不能太高
                    timer:null,//不修改
                    maptimer:null,//不修改
                    initStatus:false,//不修改
                    initTime:3000,//初始动画时间
                    allowRestart:true,//允许重播
                    now:0,//当前播放时间点
                    percent:0//当前播放百分比  0~1
                },
                isOpen:{flag:false},
                wdData:[],
                wdInit:false
            }
        },
        watch:{
            playControll:{
                handler:function(curVal,oldVal){
                    this.$root.eventHub.$emit('mapControl', curVal)
                },
                deep:true
            }
        },
        beforeDestroy(){
            websocket.destroy();
        }
    }
</script>

<style>
.content .wd-caruosel-container {
    z-index: 1!important;
}
</style>