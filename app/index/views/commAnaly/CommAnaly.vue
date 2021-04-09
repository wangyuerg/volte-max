<template>
    <div class="content">
        <!--<xlsx-input style="width:200px" :inputId="xlsxInputId" :inputStyle="inputStyle"/>-->
        <!-- 上部分地图 -->
        <div   class="content-map">
            <div class="map-main">
                <gis-map :styleObject="mapStyleOption" :mapOption="mapOption"   ></gis-map>
            </div>
            <!-- 城市选择部分 -->
            <div class="map-top clearfix">
                <div class="ued-select f-l">
                    <el-select   @change="handleCityChange" size="large" v-model="cityName" placeholder="请选择" class="el-select-default" popper-class="el-dp-default">
                        <el-option

                                v-for="item in cityOptions"
                                :label="item.cityName"
                                :value="item.cityName">
                        </el-option>
                    </el-select>
                </div>

                <!--<div class="hot-box f-l">
                    <div class="hot-ctrl">
                        热力图
                        <el-switch
                                v-model="switchValue"
                                on-text=""
                                off-text=""
                                on-color="#4cd964"
                                off-color="#f6f6f6"
                        >
                        </el-switch>
                    </div>
                </div>-->
            </div>

            <!-- 返回全网 -->
          <!--  <div class="map-return" @click="backhandler"></div>-->

            <!-- 数据时间 -->
            <div class="date-time"  >
                数据时间：{{dataTime}}
            </div>

            <!-- 指标区域 -->
            <div class="map-dot">
                <ul>
                    <li class="map-dot-list">
                        <span class="map-dot-icon map-dot-icon1"></span>
                        <span class="dot-char"> {{cashCondition.redMin}}</span>-<span class="dot-char">{{cashCondition.redMax}}</span>
                    </li>
                    <li class="map-dot-list bggray">
                        <span class="map-dot-icon map-dot-icon2"></span>
                        <span class="dot-char">{{cashCondition.yellowMin}}</span>-<span class="dot-char">{{cashCondition.yellowMax}}</span>

                    </li>
                    <li class="map-dot-list">
                        <span class="map-dot-icon map-dot-icon3"></span>
                        <span class="dot-char">{{cashCondition.greenMin}}</span>-<span class="dot-char">{{cashCondition.greenMax}}</span>

                    </li>
                </ul>
            </div>

            <!-- 弹窗触发按钮 -->
            <div class="map-bottom">
				<span class="map-open" id="xqgl" @click="filterPop">
					<i class="open-icon open-icon1"></i>
					小区过滤
				</span>
				<span class="map-open" id="color" @click="colorPop">
					<i class="open-icon open-icon2"></i>
					配置
				</span>
				 <!--
                <span class="map-open" id="eci-search" @click="eciSearch" >
					<i class="ued-ico ico-search"></i>
					搜索
				</span>
				 -->
            </div>
        </div>

        <div style="position: relative;">
            <button class="el-button el-button--grey-el" @click="exportTable" ><i class="el-icon-upload2"></i>导出</button>
            <el-tabs class='dark-tabs' v-model="tabActiveName" @tab-click="handleClick">
                <!-- <el-tab-pane label="城市排名" name="first"  >
                     &lt;!&ndash;表格&ndash;&gt;
                     <div class="result-table" id="tb-1"  v-stickysort="stickySortOption"></div>

                 </el-tab-pane>-->
                <el-tab-pane label="质差小区" name="second" >

                    <div class="table-index-new table-scroll-index"  id="tb-2" style="height: 335px;">
                        <table>
                            <thead>
                            <tr>
                                <th class="first-head-th"></th>
                                <th v-for="(item,index) in commHead"
                                    class="table-header"
                                    :style="tableWidth(item)">
                                    <span :title="item.title">{{item.title}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody style="height: 286px;">
                            <div class="table-no-info" v-if="commBody.length==0">
                                没有符合查询条件的记录
                            </div>
                            <tr v-for="record in commBody"
                                style="min-height: 55px;"
                                @dblclick.prevent="openDetail($event,record.ECI)"
                                @click.prevent="moveAreaInMap($event,record.ECI,record.Location_longitude,record.Location_latitude)">
                                <th class="first-body-th"
                                    :class="'level'+(record.color!=1&&record.color!=2&&record.color!=3?'-other':record.color)"></th>
                                <td v-for="i in commHead"
                                    :style="tableWidth(i)">
                                    <span :title="record[i.field]">{{record[i.field]}}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id='labelText1' style='top: 0;position: absolute;white-space:nowrap;display:block;visibility: collapse;'></div>
                    <div id='labelContent1' style='top: 0;position: absolute;white-space:nowrap;display:block;visibility: collapse;'></div>
                    <div class="dark-el block">
                        <el-pagination  style="float:right;padding-top:10px" v-show="commTotalSize>0"
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="commCurrentPage"
                                        :page-sizes="[5,10,20]"
                                        :page-size="commPageSize"
                                        layout="sizes, prev, pager, next"
                                        :total="commTotalSize">
                        </el-pagination>
                    </div>

                </el-tab-pane>

            </el-tabs>
        </div>



        <!--小区过滤弹层-->
        <div class="hidde" id="xqgl-open">
            <div class="xqgl-form">
                <table>
                    <tbody>
                        <tr class="dark-el">
                            <th>开始时间</th>
                            <td>
                                <el-date-picker v-if="condition.isDateSwitch"
                                                v-model="condition.starttime"
                                                type="datetime"
                                                placeholder="选择开始时间"
                                                format="yyyy-MM-dd"
                                >
                                </el-date-picker>

                                <el-date-picker v-if="!condition.isDateSwitch"
                                                v-model="condition.starttime"
                                                type="datetime"
                                                placeholder="选择开始时间"
                                                format="yyyy-MM-dd HH"
                                >
                                </el-date-picker>
                            </td>
                            <td>
                                <el-switch
                                        v-model="condition.isDateSwitch"
                                        on-text="日"
                                        off-text="时"
                                        on-color="#1E7fd5"
                                        off-color="#1E7fd5"
                                ></el-switch>
                            </td>
                        </tr>
                        <tr class="dark-el">
                            <th>结束时间</th>
                            <td>
                                <el-date-picker v-if="condition.isDateSwitch"
                                                v-model="condition.endtime"
                                                type="datetime"
                                                placeholder="选择结束时间" format="yyyy-MM-dd"
                                >
                                </el-date-picker>
                                <el-date-picker v-if="!condition.isDateSwitch"
                                                v-model="condition.endtime"
                                                type="datetime"
                                                placeholder="选择结束时间"
                                                format="yyyy-MM-dd HH"
                                >
                                </el-date-picker>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>质差通话时长占比 >&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <td><input type="text" class="txt-inp f-l short" v-model="condition.percent"></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>通话总时长(s) >&nbsp;&nbsp;&nbsp;&nbsp;</th>
                            <td><input type="text" class="txt-inp f-l short" v-model="condition.callTime"></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>城市</th>
                            <td><span class="txt-inp f-l short">{{cityName}}</span></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>区县</th>
                            <td>
                                <el-select style="width: 193px;position: relative;" v-model="district" multiple placeholder="请选择"
                                           class="dark-el el-select-mlti dist-select" popper-class="dark-el dist-select">
                                    <el-option
                                            v-for="item in districtOptions"
                                            :label="item.districtName"
                                            :value="item.districtNo">
                                    </el-option>
                                </el-select>
                            </td>
                            <td></td>
                        </tr>


                    </tbody>
                </table>
               <!-- <div class="inp-box clearfix dark-el">

                    <p class="inp-tit  mg-r10">开始时间</p>

                    <el-date-picker v-if="condition.isDateSwitch"
                            v-model="condition.starttime"
                            type="datetime"
                            placeholder="选择开始时间"
                            format="yyyy-MM-dd"
                          >
                    </el-date-picker>

                    <el-date-picker v-if="!condition.isDateSwitch"
                            v-model="condition.starttime"
                            type="datetime"
                            placeholder="选择开始时间"
                            format="yyyy-MM-dd HH"
                            >
                    </el-date-picker>
                    <el-switch
                            v-model="condition.isDateSwitch"
                            on-text="日"
                            off-text="时"
                            on-color="#1E7fd5"
                            off-color="#1E7fd5"
                    ></el-switch>
                </div>
                <div class="inp-box clearfix dark-el">
                    <p class="inp-tit  mg-r10">结束时间</p>
                    <el-date-picker v-if="condition.isDateSwitch"
                            v-model="condition.endtime"
                            type="datetime"
                            placeholder="选择结束时间" format="yyyy-MM-dd"
                         >
                    </el-date-picker>
                    <el-date-picker v-if="!condition.isDateSwitch"
                            v-model="condition.endtime"
                            type="datetime"
                            placeholder="选择结束时间"
                            format="yyyy-MM-dd HH"
                        >
                    </el-date-picker>
                </div>
                <div>

                </div>
                <div class="inp-box clearfix">
                    <p class="inp-tit f-l">质差通话时长占比 ></p>
                    <input type="text" class="txt-inp f-l short" v-model="condition.percent">
                </div>-->
            </div>
        </div>

        <!-- 颜色配置弹层 -->
        <div class="hidde" id="color-open">
            <div class="color-txt">小区质差通话时长占比</div>
            <div class="color-form">

               <div class="inp-box clearfix">
                    <p class="color-icon f-l">
                        <span class="color-dot color-dot1"></span>
                    </p>
                    <input type="text" class="color-inp f-l" v-model.number="condition.greenMin" number>
                    <div class="line-wrap  f-l">
                        <span class="inp-line"></span>
                    </div>
                    <input type="text" class="color-inp f-l" v-model="condition.greenMax">
                </div>
                <div class="inp-box clearfix">
                    <p class="color-icon f-l">
                        <span class="color-dot color-dot2"></span>
                    </p>
                    <input type="text" class="color-inp f-l" v-model="condition.yellowMin">
                    <div class="line-wrap  f-l">
                        <span class="inp-line"></span>
                    </div>
                    <input type="text" class="color-inp f-l" v-model="condition.yellowMax">
                </div>
                <div class="inp-box clearfix">
                    <p class="color-icon f-l">
                        <span class="color-dot color-dot3"></span>
                    </p>
                    <input type="text" class="color-inp f-l" v-model="condition.redMin">
                    <div class="line-wrap f-l">
                        <span class="inp-line"></span>
                    </div>
                    <input type="text" class="color-inp f-l" v-model="condition.redMax">
                </div>
            </div>
        </div>

        <!--ECI查询弹框 -->
        <div class="hidde" id="eci-search-open">
            <div class="eci-form">
                <el-row>
                    <el-col :span=6 class="eci-search-text">
                        <span>ECI查询</span>
                    </el-col>
                    <el-col :span=18>

                    </el-col>
                </el-row>

            </div>

</div>

<ca-popup v-if="isLayerOpen" :start="cashCondition.starttime" :end="cashCondition.endtime" :eci="currentECI" :timetype="cashCondition.timeType"></ca-popup>
</div>
</template>

<script>
    /**
     * 小区分析模块
     */
    import '../../util.js'
    var base = require('config');
    var niceScroll =  require('../../directives/NiceScroll.js');
    var Echarts = require('../../directives/charts.js');
    var stickySort = require('../../directives/stickySort.js');
    var layer = require('layer');
    var echarts = require('echarts');
    import CApopup from './CommAnaly-popup.vue';
    import Map from  './CommAnaly-Map.vue';


    export default {
        created:function(){
            var that = this;
            var currentUser  = base.getCurrentUser();
            //获取所有城市
            that.Api.getCitys()
                    .then(function(response){
                        console.log(response.data)
                        if(response.data.status ==='success'){
                            that.cityOptions = response.data.data;
                            //默认杭州
                            that.cityValue = _.find(that.cityOptions,{cityName:'杭州'}).cityNo;
                            that.cityName = _.find(that.cityOptions,{cityName:'杭州'}).cityName;
                        }
                    });

            //初始化时获取颜色配置信息
            that.Api.ca_get_colorConfig(currentUser.userId).
                    then(function(response){
                        if(response.data.status ==='success'){
                            that.cashCondition.greenMin = response.data.data.greenMin;
                            that.cashCondition.greenMax = response.data.data.greenMax;
                            that.cashCondition.yellowMin = response.data.data.yellowMin;
                            that.cashCondition.yellowMax = response.data.data.yellowMax;
                            that.cashCondition.redMin = response.data.data.redMin;
                            that.cashCondition.redMax = response.data.data.redMax;

                            /*that.Api.ca_formQuality(that.commCurrentPage,that.commPageSize,
                                    {
                                        'local_city':that.cityValue,
                                        'greenMin':that.cashCondition.greenMin,
                                        'greenMax':that.cashCondition.greenMax,
                                        'yellowMin':that.cashCondition.yellowMin,
                                        'yellowMax':that.cashCondition.yellowMax,
                                        'redMin':that.cashCondition.redMin,
                                        'redMax':that.cashCondition.redMax,
                                        'Start_Time':that.cashCondition.starttime,
                                        'End_Time':that.cashCondition.endtime,
                                        'timeType':that.cashCondition.timeType,
                                        'Worse_Quality_time_rate':that.cashCondition.percent
                                    }
                            ).then(function(response){
                                        if(response.data.status === 'success'){
                                            that.commTotalSize = response.data.data.count;
                                            that.commBody = response.data.data.list;

                                        }
                                    });*/


                        }

                    });
            //开启commMapControl监听
            that.$root.eventHub.$on('commMapControl', function(option){
                if(option.type=='initOver'){
                    console.log('map init over...')
                        that.alertArea();
                }
            });

                // 表格tab
                $('.tab-list').click(function(){
                    var index = $(this).index();

                    $(this).addClass('current').siblings().removeClass('current');
                    $('.stick-wrap').eq(index).addClass('z-ind').siblings().removeClass('z-ind');

                });

                // 返回全局
                $('.map-return').mouseover(function() {
                    $(this).addClass('map-return-hover');
                    $(this).stop().animate({'width': '87px'},300);
                }).mouseout(function(){
                    $(this).removeClass('map-return-hover');
                    $(this).stop().animate({'width': '29px'},300);
                });





                $('.zcxq').on('click',function(){
                    $('#zz').show();
                    $('.layer').show();
                    $('body').css('overflow','hidden');
                    myChart1.resize();
                });
                $('.layer-close').on('click',function(){
                    $('#zz').hide();
                    $('.layer').hide();
                    $('body').css('overflow','auto');
                });

                //质差小区弹层tab切换
                $('.tab-list2').click(function(){
                    var index = $(this).index();

                    $(this).addClass('on').siblings().removeClass('on');
                    $('.chart2-box').eq(index).addClass('act').siblings().removeClass('act');
                    myChart1.resize();
                    myChart21.resize();
                    myChart22.resize();
                    myChart31.resize();
                    myChart32.resize();

                });

                //弹层tab内tab
                $('.zcxq-chart').on('click', '.chart2-btn', function() {
                    var index = $(this).index();

                    $(this).addClass('current').siblings().removeClass('current');
                    $('.chart2').eq(index).addClass('show').siblings().removeClass('show');
                    myChart21.resize();
                    myChart22.resize();
                });

        },
        directives: {
            "echarts":Echarts,
            "stickysort":stickySort,
            "nicescroll":niceScroll
        },
        components:{
            'gisMap':Map,
            'caPopup':CApopup
        },
        data:function(){
            var that = this;
            return{
                isLayerOpen:false,//弹框打开状态
                switchValue:false,//热力图开关状态
                //地图属性配置
                mapOption:{
                    host:base.webHost,
                    useLink:base.webHost+'/GisMap/map2.html',
                    appCode:'VoLTEDemo_Wp27Fb',
                    level:8,
                    districtName:'杭州'
                },
                //地图样式设置
                mapStyleOption:{
                    width:'100%',
                    height:'100%'
                },
                //标签页初始显示
                tabActiveName:'second',
                //niceScroll样式属性
                niceScrollOption:{
                    styler:'fb',
                    cursorcolor:"#0c151f",
                    background: '#192a3e',
                    cursorwidth: '6',
                    cursorborder:"2px solid #192a3e",
                    cursorborderradius: '12px',
                    cursoropacitymin :1,
                    spacebarenabled:false,
                    zindex: '9999999999999'
                },
                //查询条件
                condition:{
                    isDateSwitch:true,
                    timeType:'date',
                    timeFormat:'yyyy-MM-dd',
                    starttime:'',
                    endtime:'',
                    percent:10,
                    callTime:0,
                    greenMin:0,
                    greenMax:100,
                    yellowMin:0,
                    yellowMax:100,
                    redMin:0,
                    redMax:100
                },
                //查询条件缓存
                cashCondition:{
                    isDateSwitch:true,
                    timeType:'date',
                    timeFormat:'yyyy-MM-dd',
                    starttime:'',
                    endtime:'',
                    percent:10,
                    callTime:0,
                    greenMin:0,
                    greenMax:100,
                    yellowMin:0,
                    yellowMax:100,
                    redMin:0,
                    redMax:100
                },
                //stickySort插件属性设置
                stickySortOption:{
                    isFirst:'init',
                    tab:'on',
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
                //stickySort插件属性设置
                stickySortOption2:{
                    isFirst:'ready',
                    tab:'off',
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
                        zindex: '101'
                    }
                },
                //城市下拉框值
                cityValue: 0,
                cityName: '',
                //城市下拉框选项范围
                cityOptions: [],
                district:[],
                districtOptions:[],
                dots:[],
                //表格表头
                commHead:[
                    {field:'ECI',title:'小区ECI',width:80},
                    {field:'cell_Name',title:'小区名称',width:250},
                    {field:'local_city',title:'城市',width:80},
                    {field:'Start_Time',title:'开始时间',width:150},
                    {field:'End_Time',title:'结束时间',width:150},
                    {field:'pci',title:'PCI',width:100},
                    {field:'Freq',title:'频点',width:100},
                    {field:'Freq_band',title:'频段',width:100},
                    {field:'call_num',title:'通话总次数',width:140},
                    {field:'call_time',title:'通话时长（s）',width:140},
                    {field:'Worse_Quality_time',title:'质差总时长（s）',width:140},
                    {field:'Worse_Quality_time_rate',title:'质差时长占比',width:140},
                    {field:'Worse_Quality_call_num',title:'质差通话次数',width:140},
                    {field:'Worse_Quality_call_num_rate',title:'质差通话比例（%）',width:140},
                    {field:'single_pass_call_num',title:'单通通话次数',width:100},
                    {field:'single_pass_call_num_rate',title:'单通率（%）',width:60},
                    {field:'rtp_packet_loss_num_UL_rate',title:'上行丢包率（%）',width:140},
                    {field:'rtp_packet_loss_num_DL_rate',title:'下行丢包率（%）',width:140},
                    // {field:'RTP_Interarrival_jitter_AVG_UL_avg',title:'上行抖动',width:140},
                    // {field:'RTP_Interarrival_jitter_AVG_DL_avg',title:'下行抖动',width:140},
                    // {field:'RTCP_ring_delay_avg',title:'平均环路时延',width:170},
                    {field: 'RTCP_ring_delay_UL', title: '上行环路时延（ms）', width:140},
                    {field: 'RTCP_ring_delay_DL', title: '下行环路时延（ms）', width:140},
                    {field:'slice_total_count'                         ,title:'切片总数'                        ,width:120 },
                    {field:'slice_total_count_UL'                      ,title:'上行切片数'                      ,width:120 },
                    {field:'slice_total_count_DL'                      ,title:'下行切片数'                      ,width:120 },
                    {field:'Worse_Quality_slice_count'                 ,title:'质差切片数'                      ,width:120 },
                    {field:'Worse_Quality_slice_count_UL'              ,title:'上行质差切片数'                  ,width:160 },
                    {field:'Worse_Quality_slice_count_DL'              ,title:'下行质差切片数'                  ,width:160 },
                    {field:'cause_step_1_num_ul_rate'                  ,title:'源端问题上行质差切片比例（%）'   ,width:240 },
                    {field:'cause_step_1_num_dl_rate'                  ,title:'源端问题下行质差切片比例（%）'   ,width:240 },
                    {field:'radio_problem_slice_num'                   ,title:'无线问题质差切片数'              ,width:200 },
                    {field:'radio_problem_slice_num_rate'              ,title:'无线问题质差切片比例(%)'         ,width:240 },
                    {field:'radio_problem_mr_num'                      ,title:'质差切片关联MR数'                ,width:200 },
                    {field:'Cause_Radio_RSRP_DL_slice_num_rate'        ,title:'下行覆盖问题比例（%）'           ,width:220 },
                    {field:'Cause_Radio_RSRQ_DL_slice_num_rate'        ,title:'下行干扰问题比例（%）'           ,width:220 },
                    {field:'Cause_Radio_RSRP_UL_slice_num_rate'        ,title:'上行覆盖问题比例（%）'           ,width:220 },
                    {field:'Cause_Radio_RSRQ_UL_slice_num_rate'        ,title:'上行干扰问题比例（%）'           ,width:220 },
                    {field:'cause_ul_dl_unbalance_slice_num_rate'      ,title:'上下行链路不平衡问题比例（%）'   ,width:240 },
                    {field:'cause_neighbour_cell_loss_slice_num_rate'  ,title:'邻区漏配问题比例比例（%）'       ,width:200 },
                    {field:'cause_overlap_coverage_slice_num_rate'     ,title:'重叠覆盖问题比例（%）'           ,width:200 },
                    {field:'cause_null_main_coverage_slice_num_rate'   ,title:'无主覆盖问题比例比例（%）'       ,width:200 },
                    {field:'cause_mod3_conflict_slice_num_rate'        ,title:'模3干扰问题比例（%）'            ,width:200 }

                ],
                //表格数据
                commBody:[],
                //loading状态
                commLoading:false,
                //分页数据总数
                commTotalSize:0,
                //分页当前页数
                commCurrentPage: 1,
                //分页每页记录数
                commPageSize:5,
                //当前ECI id
                currentECI:-1
            }
        },
        methods:{
            tableWidth (item) {
                const itemTitle = item.title;
                let itemContent = ''
                $("#labelText1").css({
                    "font-size": "12px",
                    "font-family": "Microsoft YaHei"
                }).html('<span>'+ itemTitle + '</span');
                if (this.commBody.length > 0 && !['', null, undefined].includes(this.commBody[0][item.field])) {
                    itemContent = this.commBody[0][item.field].toString();
                }
                $("#labelContent1").css({
                    "font-size": "12px",
                    "font-family": "Microsoft YaHei"
                }).html('<span>'+ itemContent + '</span');
                const titleWidth = $("#labelText1").find("span").eq(0).width();
                const contentWidth = $("#labelContent1").find("span").eq(0).width();
                const result = (titleWidth < contentWidth ? contentWidth : titleWidth) + 20
                return 'width: ' + result.toString() + 'px;'
            },
            /**
             * 过滤弹框点击
             */
            filterPop(){
                var that = this;
                this.condition.isDateSwitch = this.cashCondition.isDateSwitch;
                this.condition.timeType = this.cashCondition.timeType;
                this.condition.timeFormat = this.cashCondition.timeFormat;
                this.condition.starttime = this.cashCondition.starttime;
                this.condition.endtime = this.cashCondition.endtime;
                this.condition.percent = this.cashCondition.percent;
                this.condition.callTime = this.cashCondition.callTime;

                    layer.open({
                        type: 1,
                        zIndex:102,
                        title: '<span class="lay-icon"></span>'+'小区过滤设置',
                        area:'520px',
                        skin: 'demo-class',
                        content: $('#xqgl-open'),
                        btn:['确定','取消'],
                        yes:function(index){
                            var searchCondition = {
                                'timeType':that.condition.timeType,
                                'Start_Time':that.condition.starttime,
                                'End_Time':that.condition.endtime
                            };
                            //条件有效性检验
                            if(that.condition.starttime instanceof Date && that.condition.endtime instanceof Date){
                                if(searchCondition.timeType ==='date'){
                                    searchCondition.Start_Time = searchCondition.Start_Time==''?'':searchCondition.Start_Time.format('yyyy-MM-dd')+" 00:00:00";
                                    searchCondition.End_Time = searchCondition.End_Time==''?'':searchCondition.End_Time.format('yyyy-MM-dd')+" 00:00:00";
                                }else if(searchCondition.timeType ==='datetime'){
                                    searchCondition.Start_Time = searchCondition.Start_Time==''?'':searchCondition.Start_Time.format('yyyy-MM-dd HH')+":00:00";
                                    searchCondition.End_Time = searchCondition.End_Time==''?'':searchCondition.End_Time.format('yyyy-MM-dd HH')+":00:00";
                                }

                                if(new Date(searchCondition.Start_Time).getTime()>new Date(searchCondition.End_Time).getTime()){
                                    that.$message({
                                        showClose: true,
                                        message: '开始时间不能超过结束时间',
                                        type: 'warning'
                                    });
                                    return;
                                }
                                if(that.district.length<=0){
                                    that.$message({
                                        showClose: true,
                                        message: '请至少选择一个区县',
                                        type: 'warning'
                                    });
                                    return;
                                }
                            }

                            that.cashCondition.isDateSwitch = that.condition.isDateSwitch;
                            that.cashCondition.timeType = that.condition.timeType;
                            that.cashCondition.timeFormat = that.condition.timeFormat;
                            that.cashCondition.starttime = that.condition.starttime;
                            that.cashCondition.endtime = that.condition.endtime;
                            that.cashCondition.percent = that.condition.percent;
                            that.cashCondition.callTime = that.condition.callTime;

                            that.Api.ca_formQuality(1,that.commPageSize,
                                    {
                                        'local_city':that.cityValue,
                                        'district':that.district.join(','),
                                        'greenMin':that.cashCondition.greenMin,
                                        'greenMax':that.cashCondition.greenMax,
                                        'yellowMin':that.cashCondition.yellowMin,
                                        'yellowMax':that.cashCondition.yellowMax,
                                        'redMin':that.cashCondition.redMin,
                                        'redMax':that.cashCondition.redMax,
                                        'Start_Time':that.cashCondition.starttime,
                                        'End_Time':that.cashCondition.endtime,
                                        'timeType':that.cashCondition.timeType,
                                        'Worse_Quality_time_rate':that.cashCondition.percent,
                                        'call_time':that.cashCondition.callTime
                                    }
                            ).then(function(response){
                                if(response.data.status === 'success'){
                                    that.commTotalSize = response.data.data.count;
                                    that.commBody = response.data.data.list;
                                    that.commPoints();
                                }
                            });
                            that.alertArea();

                            layer.close(index);
                        },
                        btn2:function(){

                        },
                        cancel: function(){

                        }
                    });
            },
            //颜色配置弹框
            colorPop(){
                var that = this;
                that.condition.greenMin = that.cashCondition.greenMin;
                that.condition.greenMax = that.cashCondition.greenMax;
                that.condition.yellowMin = that.cashCondition.yellowMin;
                that.condition.yellowMax = that.cashCondition.yellowMax;
                that.condition.redMin = that.cashCondition.redMin;
                that.condition.redMax = that.cashCondition.redMax;


                layer.open({
                    type: 1,
                    zIndex:102,
                    title: '<span class="lay-icon"></span>'+'颜色配置',
                    area:'520px',
                    skin: 'demo-class',
                    content: $('#color-open'),
                    btn:['确定','取消'],
                    yes:function(index){
                        that.Api.ca_update_colorConfig(base.getCurrentUser().userId,
                                that.condition.greenMin,
                                that.condition.greenMax,
                                that.condition.yellowMin,
                                that.condition.yellowMax,
                                that.condition.redMin,
                                that.condition.redMax
                        ).then(function(response){
                            if(response.data.status ==='success'){
                                that.cashCondition.greenMin = that.condition.greenMin;
                                that.cashCondition.greenMax = that.condition.greenMax;
                                that.cashCondition.yellowMin = that.condition.yellowMin;
                                that.cashCondition.yellowMax = that.condition.yellowMax;
                                that.cashCondition.redMin = that.condition.redMin;
                                that.cashCondition.redMax = that.condition.redMax;
                                that.Api.ca_formQuality(1,that.commPageSize,
                                        {
                                            'local_city':that.cityValue,
                                            'district':that.district.join(','),
                                            'greenMin':that.cashCondition.greenMin,
                                            'greenMax':that.cashCondition.greenMax,
                                            'yellowMin':that.cashCondition.yellowMin,
                                            'yellowMax':that.cashCondition.yellowMax,
                                            'redMin':that.cashCondition.redMin,
                                            'redMax':that.cashCondition.redMax,
                                            'Start_Time':that.cashCondition.starttime,
                                            'End_Time':that.cashCondition.endtime,
                                            'timeType':that.cashCondition.timeType,
                                            'Worse_Quality_time_rate':that.cashCondition.percent,
                                            'call_time':that.cashCondition.callTime
                                        }
                                ).then(function(response){
                                    if(response.data.status === 'success'){
                                        that.commTotalSize = response.data.data.count;
                                        that.commBody = response.data.data.list;
                                        that.commPoints();
                                    }
                                });
                                that.alertArea();
                                layer.close(index);
                            }
                        })
                    },
                    btn2:function(){

                    },
                    cancel: function(){

                    }
                });
            },
            //城市值变化调用方法
            handleCityChange(val){
                var that= this;
                that.district = [];
                console.log(val)
                console.log(_.find(that.cityOptions,{cityName:val}))
                var cityNo = _.find(that.cityOptions,{cityName:val}).cityNo;
                that.cityValue = _.find(that.cityOptions,{cityName:val}).cityNo;
                that.Api.getDistrictsByCity(cityNo)
                        .then(function(response){
                            if(response.data.status == 'success'){
                                that.districtOptions = response.data.data;
                                console.log(response.data)
                            }
                        });
                //城市值变化事件广播
                that.$root.eventHub.$emit('commMapControl', {
                    type:'cityChange',
                    data: val
                });
            },

            handleCityChange2(val){
                var that= this;
                that.Api.ca_formQuality(that.commCurrentPage,that.commPageSize,
                        {
                            'local_city':that.cityValue,
                            'greenMin':that.cashCondition.greenMin,
                            'greenMax':that.cashCondition.greenMax,
                            'yellowMin':that.cashCondition.yellowMin,
                            'yellowMax':that.cashCondition.yellowMax,
                            'redMin':that.cashCondition.redMin,
                            'redMax':that.cashCondition.redMax,
                            'Start_Time':that.cashCondition.starttime,
                            'End_Time':that.cashCondition.endtime,
                            'timeType':that.cashCondition.timeType,
                            'Worse_Quality_time_rate':that.cashCondition.percent,
                            'call_time':that.cashCondition.callTime
                        })
                        .then(function(response){
                            if(response.data.status === 'success'){
                                that.commTotalSize = response.data.data.count;
                                that.commBody = response.data.data.list;
                                $('#tb-2').find('.sticky-wrap').getNiceScroll().resize();
                            }
                        });
                //城市值变化事件广播
                that.$root.eventHub.$emit('commMapControl', {
                    type:'cityChange',
                    data: val
                });
                that.alertArea();
                that.commPoints();
            },
            /**
             *标签页切换点击方法
             */
            handleClick(tab, event) {
                    if(tab.name=='first'){
                        setTimeout(function(){
                            $('#tb-1').find('.sticky-wrap').resize();
                            $('#tb-2').find('.sticky-wrap').resize();
                        },0);
                    }else if(tab.name=='second'){
                        if(this.stickySortOption2.isFirst =='init'){
                            this.stickySortOption2.isFirst = 'ready';
                        }else{
                            setTimeout(function(){
                                $('#tb-2').find('.sticky-wrap').resize();
                                $('#tb-2').find('.sticky-wrap').getNiceScroll().resize();
                            },0);
                        }

                    }
            },
            /**
             * 分页pagesize值变化回调方法
             * @param val 变化后的每页条数
             */
            handleSizeChange(val) {
                var that = this;
                this.commPageSize = val;
                that.Api.ca_formQuality(that.commCurrentPage,that.commPageSize,
                        {
                            'local_city':that.cityValue,
                            'greenMin':that.cashCondition.greenMin,
                            'greenMax':that.cashCondition.greenMax,
                            'yellowMin':that.cashCondition.yellowMin,
                            'yellowMax':that.cashCondition.yellowMax,
                            'redMin':that.cashCondition.redMin,
                            'redMax':that.cashCondition.redMax,
                            'Start_Time':that.cashCondition.starttime,
                            'End_Time':that.cashCondition.endtime,
                            'timeType':that.cashCondition.timeType,
                            'Worse_Quality_time_rate':that.cashCondition.percent,
                            'call_time': that.cashCondition.callTime,
                            'district':that.district.join(',')
                        })
                        .then(function(response){
                            if(response.data.status === 'success'){
                                that.commTotalSize = response.data.data.count;
                                that.commBody = response.data.data.list;
                                $('#tb-2').find('.sticky-wrap').getNiceScroll().resize();
                            }
                        });

            },
            /**
             * 分页：当前页数变化回调方法
             * @param val 当前所在页数
             */
            handleCurrentChange(val) {
                var that = this;
                this.commCurrentPage = val;
                that.Api.ca_formQuality(that.commCurrentPage,that.commPageSize,
                            {
                                'local_city':that.cityValue,
                                'greenMin':that.cashCondition.greenMin,
                                'greenMax':that.cashCondition.greenMax,
                                'yellowMin':that.cashCondition.yellowMin,
                                'yellowMax':that.cashCondition.yellowMax,
                                'redMin':that.cashCondition.redMin,
                                'redMax':that.cashCondition.redMax,
                                'Start_Time':that.cashCondition.starttime,
                                'End_Time':that.cashCondition.endtime,
                                'timeType':that.cashCondition.timeType,
                                'Worse_Quality_time_rate':that.cashCondition.percent,
                                'call_time': that.cashCondition.callTime,
                                'district':that.district.join(',')
                            })
                            .then(function(response){
                                if(response.data.status === 'success'){
                                    that.commTotalSize = response.data.data.count;
                                    that.commBody = response.data.data.list;
                                    $('#tb-2').find('.sticky-wrap').getNiceScroll().resize();
                                }
                            });

            },
            /**
             * 点击搜素按钮，弹出ECI搜索
             */
            eciSearch(){
                var that = this;
                if(that.commTotalSize <=0 ){
                    layer.tips('无质差小区数据','#eci-search',{skin:'tip-class',tips:1,time:2500});
                    return;
                }
                if(that.dots <=0 ){
                    layer.tips('地图无打点数据','#eci-search',{skin:'tip-class',tips:1,time:2500});
                    return;
                }

                layer.open({
                    type: 1,
                    zIndex:102,
                    title: '<span class="lay-icon"></span>'+'ECI查询',
                    area:'520px',
                    skin: 'demo-class',
                    content: $('#eci-search-open'),
                    btn:['确定','取消'],
                    yes:function(index){

                    },
                    btn2:function(){

                    },
                    cancel: function(){

                    }
                });
            },
            /**
             * 双击打开ECI详情窗口
             */
            openDetail(e,id){
                this.currentECI = id;
                this.isLayerOpen = true;
            },
            /**
             * 单击表格记录方法
             * @param e event
             * @param id ECI_UD
             * @param x 小区所在经度
             * @param y 小区所在纬度
             */
            moveAreaInMap(e,id,x,y){
                var that  = this;
                if (!([undefined, null, ''].includes(x) || [undefined, null, ''].includes(y))) {
                    setTimeout(function(){
                        if( id && x && y){
                            that.$root.eventHub.$emit('commMapControl', {
                                type:'showCommPoint',
                                data:{
                                    'id':id,
                                    'x':x,
                                    'y':y
                                }
                            });
                            $("body").getNiceScroll(0).doScrollTop(80, 500);
                        }
                    },300);
                } else {
                    that.$message.warning('该小区没有经纬度')
                }
            },
            /**
             * 判断是否是0-100的数
             * @param val
             * @returns {boolean}
             */
            numberCheck(val){
                if(val!=''&&!/^\d+(?:\.\d{1,2})?$/.test(val)||val<0||val>100){
                  return false;
                }else{
                    return true;
                }
            },
            /**
             * 小区打点
             */
            commPoints(){
                var that = this;
                that.Api.ca_cell_dot({
                    'local_city':that.cityValue,
                    'district':that.district.join(','),
                    'Start_Time':that.cashCondition.starttime,
                    'End_Time':that.cashCondition.endtime,
                    'timeType':that.cashCondition.timeType,
                    'greenMin':that.cashCondition.greenMin,
                    'greenMax':that.cashCondition.greenMax,
                    'yellowMin':that.cashCondition.yellowMin,
                    'yellowMax':that.cashCondition.yellowMax,
                    'redMin':that.cashCondition.redMin,
                    'redMax':that.cashCondition.redMax,
                    'Worse_Quality_time_rate':that.cashCondition.percent,
                    'call_time':that.cashCondition.callTime
                }).then(function(response){
                    that.dots = response.data.data;
                    that.$root.eventHub.$emit('commMapControl', {
                        type:'commPoints',
                        data: $.map(response.data.data,function(item){
                            if (!([undefined, null, ''].includes(item.Location_longitude) || [undefined, null, ''].includes(item.Location_latitude))) {
                                return {
                                    'x':item.Location_longitude,
                                    'y':item.Location_latitude,
                                    'color':item.color,
                                    'id':item.ECI,
                                    'pci':item.pci,
                                    'Freq':item.Freq,
                                    'cell_Name':item.cell_Name,
                                    'Worse_Quality_time_rate':item.Worse_Quality_time_rate,
                                    'Worse_Quality_time_rate_UL':item.Worse_Quality_time_rate_UL,
                                    'Worse_Quality_time_rate_DL':item.Worse_Quality_time_rate_DL,
                                    'Worse_Quality_call_num_rate':item.Worse_Quality_call_num_rate,
                                    'single_pass_call_num_rate':item.single_pass_call_num_rate,
                                    'Worse_MOS_call_num_rate':item.Worse_MOS_call_num_rate,
                                    'MOS_UL':item.MOS_UL,
                                    'MOS_DL':item.MOS_DL,
                                    'rtp_packet_loss_num_UL_rate':item.rtp_packet_loss_num_UL_rate,
                                    'rtp_packet_loss_num_DL_rate':item.rtp_packet_loss_num_DL_rate,
                                    'RTCP_ring_delay_UL':item.RTCP_ring_delay_UL,
                                    'RTCP_ring_delay_DL':item.RTCP_ring_delay_DL,
                                    'cause_step_1_num_ul_rate':item.cause_step_1_num_ul_rate,
                                    'cause_step_1_num_dl_rate':item.cause_step_1_num_dl_rate,
                                    'radio_problem_slice_num_rate':item.radio_problem_slice_num_rate
                                }
                            }
                          })
                    })
                })
            },
            /**
             * 热力图打开调用打点
             */
            alertArea(){
                var that = this;
                if(that.switchValue){
                    that.Api.ca_qualitative_thermodynamic({
                        'local_city':that.cityValue,
                        'Start_Time':that.cashCondition.starttime,
                        'End_Time':that.cashCondition.endtime,
                        'timeType':that.cashCondition.timeType
                    }).then(function(response){
                        if(response.data.status==='success'){
                            that.$root.eventHub.$emit('commMapControl', {
                                type:'alertArea',
                                data: $.map(response.data.data,function(item){
                                    if (!([undefined, null, ''].includes(item.Location_longitude) || [undefined, null, ''].includes(item.Location_latitude))) {
                                        return {'x':item.Location_longitude,'y':item.Location_latitude,'id':''+item.Location_longitude+item.Location_latitude+item.slice_xdr_id}
                                    }
                                })
                            })
                        }
                    })
                }
            },
            /**
             * 关闭热力图
             */
            clearHeat(){
                this.$root.eventHub.$emit('commMapControl', {
                    type:'clearHeat',
                    data: null
                })
            },
            /**
             * 返回按钮点击
             */
            backhandler(){
                var that = this;
                that.cashCondition.starttime="";
                that.cashCondition.endtime="";
                that.cashCondition.timeType='datetime';
                that.cashCondition.timeFormat='yyyy-MM-dd HH';
                that.cashCondition.percent =10;
                that.Api.ca_formQuality(1,that.commPageSize,
                        {
                            'local_city':that.cityValue,
                            'greenMin':that.cashCondition.greenMin,
                            'greenMax':that.cashCondition.greenMax,
                            'yellowMin':that.cashCondition.yellowMin,
                            'yellowMax':that.cashCondition.yellowMax,
                            'redMin':that.cashCondition.redMin,
                            'redMax':that.cashCondition.redMax,
                            'Start_Time':that.cashCondition.starttime,
                            'End_Time':that.cashCondition.endtime,
                            'timeType':that.cashCondition.timeType,
                            'Worse_Quality_time_rate':that.cashCondition.percent,
                            'call_time':that.cashCondition.callTime
                        }
                ).then(function(response){
                    if(response.data.status === 'success'){
                        that.commTotalSize = response.data.data.count;
                        that.commBody = response.data.data.list;
                    }
                });
                that.alertArea();
                that.commPoints();
            },
            exportTable(){
                var that = this;
                if(that.commBody.length === 0 || that.commTotalSize <= 0){
                    that.$message.warning('无数据可以导出')
                    return;
                }
                that.Api.ca_formQuality_export( {
                    'local_city':that.cityValue,
                    'Start_Time':that.cashCondition.starttime,
                    'End_Time':that.cashCondition.endtime,
                    'timeType':that.cashCondition.timeType,
                    'Worse_Quality_time_rate':that.cashCondition.percent,
                    'call_time': that.cashCondition.callTime,
                    'district':that.district.join(',')
                })
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
                // var elemIF = document.createElement("iframe");
                // var startTime = that.cashCondition.starttime?((that.cashCondition.timeType == 'date'?new Date(that.cashCondition.starttime).format('yyyy-MM-dd'):new Date(that.cashCondition.starttime).format('yyyy-MM-dd HH'))) :'';
                // var endTime = that.cashCondition.endtime?((that.cashCondition.timeType == 'date'?new Date(that.cashCondition.endtime).format('yyyy-MM-dd'):new Date(that.cashCondition.endtime).format('yyyy-MM-dd HH'))) :'';
                // console.log({
                //     'local_city':that.cityValue,
                //     'district':that.district.join(','),
                //     'Start_Time':startTime,
                //     'End_Time':endTime,
                //     'Time_Type':that.cashCondition.timeType,
                //     'Worse_Quality_time_rate':that.cashCondition.percent,
                // })
                // elemIF.src =  base.serviceUrl+'/export/cell/info/'+encodeURI(JSON.stringify( {
                //             'local_city':that.cityValue,
                //             'district':that.district.join(','),
                //             'Start_Time':startTime,
                //             'End_Time':endTime,
                //             'Time_Type':that.cashCondition.timeType,
                //             'Worse_Quality_time_rate':that.cashCondition.percent,
                //             'call_time':that.cashCondition.callTime
                //         }))+'/'+base.defaultHeader()['x-token'];
                // elemIF.style.display = "none";
                // document.body.appendChild(elemIF);

            }
        },
        computed:{
          dataTime:function(){
              var _start = '';
              var _end = '';
              if(this.cashCondition.timeType ==='date'){
                  _start = this.cashCondition.starttime instanceof Date?this.cashCondition.starttime.format('yyyy/MM/dd'):new Date(new Date().getTime()-24*60*60*1000).format('yyyy/MM/dd');
                  _end = this.cashCondition.endtime instanceof Date?this.cashCondition.endtime.format('yyyy/MM/dd'):new Date().format('yyyy/MM/dd');
              }else if(this.cashCondition.timeType ==='datetime'){
                  _start = this.cashCondition.starttime instanceof Date?this.cashCondition.starttime.format('yyyy/MM/dd HH'):new Date(new Date().getTime()-24*60*60*1000).format('yyyy/MM/dd')+' 00';
                  _end = this.cashCondition.endtime instanceof Date?this.cashCondition.endtime.format('yyyy/MM/dd HH'):new Date().format('yyyy/MM/dd')+' 00';
              }
              return _start + ' - ' + _end;
          }
        },
        watch:{
            'condition.isDateSwitch':{
                handler:function(curVal,oldVal){
                    this.condition.timeType =  curVal?'date':'datetime';
                    this.condition.timeFormat = curVal?'yyyy-MM-dd':'yyyy-MM-dd HH';
                }
            },
            'condition.percent':{
                handler:function(curVal,oldVal){
                    if(!this.numberCheck(curVal)){
                        this.condition.percent = oldVal;
                    }
                }
            },
            'condition.greenMin':{
                handler:function(curVal,oldVal){
                    if(!this.numberCheck(curVal)){
                      this.condition.greenMin = oldVal;
                   }
                }
            },
            'condition.greenMax':{
                handler:function(curVal,oldVal){
                    if(!this.numberCheck(curVal)){
                        this.condition.greenMax = oldVal;
                    }
                }
            },
            'condition.yellowMin':{
                handler:function(curVal,oldVal){
                    if(!this.numberCheck(curVal)){
                        this.condition.yellowMin = oldVal;
                    }
                }
            },
            'condition.yellowMax':{
                handler:function(curVal,oldVal){
                    if(!this.numberCheck(curVal)){
                        this.condition.yellowMax = oldVal;
                    }
                }
            },
            'condition.redMin':{
                handler:function(curVal,oldVal){
                    if(!this.numberCheck(curVal)){
                        this.condition.redMin = oldVal;
                    }
                }
            },
            'condition.redMax':{
                handler:function(curVal,oldVal){
                    if(!this.numberCheck(curVal)){
                        this.condition.redMax = oldVal;
                    }
                }
            },
            switchValue:{
                handler:function(curVal,oldVal){
                    if(curVal){
                        this.alertArea();
                    }else{
                        this.clearHeat();
                    }
                }
            }
        },
        beforeDestroy(){
            this.$root.eventHub.$off('mapControl');
        }

    }
</script>
<style>
    #tb-2.result-table .sticky-wrap{
        height:350px
    }

    .el-select-dropdown.dark-el.dist-select{
        width: 193px;
    }
    .dist-select>.el-select__tags{
        max-width:155px!important;
    }
</style>
<style scoped>
    .el-button--grey-el{
        z-index:999999999;
        background: #303030;
        color:#e6e7e8;
        border: 0;
        height:32px;
        border-radius: 14px;
        width: 70px;
        padding:8px 16px;
        position: relative;
        top:35px;
        cursor:pointer;
        left:95%;
    }
    .el-button--grey-el:hover{
        background:#17a35e;
        color:#fff;
    }
    .result-table{
        height:350px;
    }
    .result-table table{
        table-layout:fixed;
        margin-bottom: 20px;
    }
    .result-table .sticky-wrap .sticky-thead th{
        background: #172736;
    }
    .hidde {
        display: none;
    }
    .show {
        display: block;
    }
    /* 地图模块 */
    .content-map {
        position: relative;
        height: 740px;
        background-color: #ccc;
        border: 1px solid #153E63;
    }
    .map-top {
        position: absolute;
        top: 12px;
        left: 12px;
    }
    /* ued-drop */
    .ued-select {
    }
    .dropdown {
        width: 70px;
        height: 42px;
        border: none;
        border-radius: 2px 0 0 2px;
    }
    .dropdown .carat {
        width: 10px;
        height: 5px;
        background: #fff url(../../images/city_drop.png) no-repeat;
        right: 12px;
        top: 18px;
    }
    .dropdown.open .carat {
        background: #fff url(../../images/city_drop_open.png) no-repeat;
    }
    .dropdown .selected {
        padding: 0 12px;
        line-height: 42px;
        font-size: 14px;
        color: #333;
    }
    .dropdown li {
        color: #333;
    }
    .dropdown.open {
        border: none;
    }
    .dropdown div {
        height: 0;
        left: 0;
        right: 0;
        top: 100%;
        margin-top: 2px;
        border: none;
        border-top: none;
        box-shadow: 0 0 2px rgba(8,1,3,.2);
    }

    /* 热力图 */
    .hot-box {
        padding: 8px 0;
        background-color: #fff;
        border-radius: 0 2px 2px 0;
    }
    .hot-ctrl {
        height: 26px;
        padding: 0 12px;
        line-height: 26px;
        font-size: 14px;
        color: #333;
        border-left: 1px solid #E5E5E5;
    }
    .ctrl-btn {
        position: relative;
        display: inline-block;
        width: 35px;
        height: 18px;
        vertical-align: middle;
        margin-left: 4px;
        cursor: pointer;
    }
    .ctrl-on {
        background: url(../../images/on_bg.png) no-repeat;
    }
    .ctrl-off {
        background: url(../../images/off_bg.png) no-repeat;
    }
    .ctrl-flag {
        position: absolute;
        top: 0;
        left: 17px;
        width: 18px;
        height: 18px;
    }
    .on-flag {
        background: url(../../images/on_btn.png) no-repeat center center;
    }
    .off-flag {
        background: url(../../images/off_btn.png) no-repeat center center;
    }

    .map-return {
        position: absolute;
        top: 20px;
        left: 215px;
        width: 29px;
        height: 30px;
        background: url(../../images/map_return.png) no-repeat;
        cursor: pointer;
    }

    /* 数据时间 */
    .date-time {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 0 14px;
        line-height: 26px;
        font-size: 12px;
        color: #666;
        background-color: #fff;
        background-color: rgba(255,255,255,.8);
    }

    /* 指标区域 */
    .map-dot {
        position: absolute;
        bottom: 46px;
        right: 0;
        width: 100px;
        height: 111px;
        background-color: #fff;
    }
    .map-dot-list {
        line-height: 37px;
        font-size: 12px;
        color: #333;
        text-align: center;
    }
    .map-dot-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: middle;
        background: url(../../images/color_icon.png) no-repeat;
        margin-right: 0px;
    }
    .map-dot-icon1 {
        background-position: 0 0;
    }
    .map-dot-icon2 {
        background-position: -16px 0;
    }
    .map-dot-icon3 {
        background-position: -32px 0;
    }
    .bggray {
        background-color: #E8E4E4;
    }

    /* 弹窗按钮 */
    .map-bottom {
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .map-open {
        display: inline-block;
        height: 36px;
        border-radius: 2px;
        background-color: #323232;
        padding: 0 10px;
        line-height: 36px;
        color: #fff;
        cursor: pointer;
    }
    .map-open:hover {
        background-color: #17A25E;
    }
    .open-icon {
        display: inline-block;
        vertical-align: middle;
    }
    .open-icon1 {
        width: 16px;
        height: 16px;
        background: url(../../images/open_icon1.png) no-repeat;
    }
    .open-icon2 {
        width: 16px;
        height: 16px;
        background: url(../../images/open_icon2.png) no-repeat;
    }
    /* 小区过滤弹层 */
    .layui-layer-btn a {
        margin: 0 10px;
    }

    .lay-icon {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url(../../images/xqgl_icon.png) no-repeat;
        vertical-align: middle;
        margin-right: 8px;
    }
    .xqgl-form {
        width: 420px;
        margin: 30px auto 0;
    }
    .xqgl-form table{
        height:150px;
        border-collapse:separate; border-spacing:3px;
    }
    .xqgl-form table th{
        color:#fff;
        font-size: 14px;
    }
    .xqgl-form table .txt-inp {
        background-color: #1b3149;
        color: #fff;
        border: 0;
        width: 193px;
        position: relative;
        font-size: 14px;
        display: inline-block;
        height:36px;
        text-indent: 10px;
        line-height: 36px;
    }

    .inp-box {
        margin-bottom: 20px;
    }
    .inp-box .inp-tit {
        display: inline-block;
        font-size: 14px;
        color: #fff;
        line-height: 38px;
    }
    .inp-box div{
        display: inline-block;
        height: 38px;
    }
    .inp-box .txt-inp {
        height: 38px;
        width: 300px;
        padding-left: 20px;
        border: none;
        outline: none;
        background-color: #22384F;
        margin-left: 10px;
        color: #fff;
        border-radius: 2px;
        line-height: 38px;
    }
    .inp-box .short {
        width: 230px;
    }
    .demo-class.layui-layer-page .layui-layer-btn {
        padding-top: 10px;
    }
    /* 颜色配置弹层 */
    .color-txt {
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #BABDC1;
        font-size: 14px;
        background-color: #14273C;
    }
    .color-form {
        width: 280px;
        margin: 20px auto 0;
    }
    .color-icon {
        height: 38px;
    }
    .color-dot {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(../../images/color_icon.png) no-repeat;
        vertical-align: middle;
        margin-right: 20px;
    }
    .color-dot1 {
        background-position: 0 0;
    }
    .color-dot2 {
        background-position: -16px 0;
    }
    .color-dot1 {
        background-position: -32px 0;
    }
    .color-inp {
        height: 38px;
        width: 100px;
        background-color: #22384F;
        border-radius: 2px;
        border: none;
        outline: none;
        line-height: 38px;
        padding: 0 10px;
        color: #fff;
    }
    .line-wrap {
        height: 38px;
        margin: 0 14px;
    }
    .inp-line {
        display: inline-block;
        width: 14px;
        height: 1px;
        background-color: #22384F;
        margin-top: 16px;
    }

    .map-main{
        position: absolute;
        top: 0;
        left:0;
        height: 100%;
        width: 100%;

    }
    .map-return{
        background: url(../../images/map_return.png) no-repeat;
    }
    .map-return.map-return-hover{
        background: url(../../images/map_return_hover.png) no-repeat;
    }
    /*.level1{ background: #e60012; left: 0; top: 3px; bottom: 3px;display: inline-block;height: 50px; width: 4px;vertical-align:middle;}*/
    /*.level2{ background: #fff100;  left: 0; top: 3px; bottom: 3px;display: inline-block;height: 50px; width: 4px;vertical-align:middle;}*/
    /*.level3{ background: #06ae62;  left: 0; top: 3px; bottom: 3px;display: inline-block;height: 50px; width: 4px;vertical-align:middle;}*/
    .level1{ border-right:4px solid #e60012;}
    .level2{ border-right:4px solid #fff100;}
    .level3{ border-right:4px solid #06ae62;}

    .dot-char{
        display: inline-block;width:20px
    }
    .eci-form{
        color:#fff;
        font-size: 14px;
        margin:30px auto 10px;
    }
    .eci-search-text{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-align: center;
    }
</style>

