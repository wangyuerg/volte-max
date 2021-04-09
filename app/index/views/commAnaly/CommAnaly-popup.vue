<template>
    <!-- 质差小区弹层 -->
    <!--<div id="zz"></div>-->
    <div id="capop-layer" style="display: none">
        <div class="zcxq-cont">
            <div id="zcxq-open">
                <div class="zcxq-top clearfix">
                   <p class="top-txt f-l">小区ID</p>
                    <input class="top-inp w130 f-l" placeholder="" v-model="baseInfo.eci" readonly/>
                    <p class="top-txt f-l">小区名</p>
                        <el-tooltip effect="light" popper-class="dark-el" :content="baseInfo.area" placement="bottom">
                            <input class="top-inp w150 f-l" placeholder="" v-model="baseInfo.area"  readonly/>
                        </el-tooltip>

                    <p class="top-txt f-l">时间</p>
                    <input class="top-inp w116 f-l" placeholder="" v-model="baseInfo.start" readonly/>
                    <div class="line-wrap  f-l">
                        <span class="inp-line"></span>
                    </div>
                    <input class="top-inp w116 f-l" placeholder="" v-model="baseInfo.end" readonly/>
                </div>
                <div class="zcxq-table">
                    <table>
                        <thead>
                        <tr class="bgc1">
                            <th colspan="8" class="table-title">场景指标分析</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="first-tr bgc1">
                            <td class="table-line"></td>
                            <td>通话数量</td>
                            <td>质差通话占比</td>
                            <td>质差时长占比</td>
                            <td>单通次数</td>
                            <td>上行丢包率</td>
                            <td>下行丢包率</td>
                            <td>平均码率</td>
                        </tr>
                        <tr v-for="(row,index) in netType" :class="{'bgc2':(index%2==0),'bgc1':(index%2==1)}">
                            <td class="first-td">{{row.Call_Type}}</td>
                            <td>{{row.call_num}}</td>
                            <td>{{row.Worse_Quality_call_num_rate}}</td>
                            <td>{{row.Worse_Quality_time_rate}}</td>
                            <td>{{row.single_pass_call_num}}</td>
                            <td>{{row.rtp_packet_loss_num_UL_rate}}</td>
                            <td>{{row.rtp_packet_loss_num_DL_rate}}</td>
                            <td>{{row.Codec_Rate_AVG}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="zcxq-chart">
                    <div class="chart-tab">
                        <ul class="clearfix">
                            <li class="tab-list2 f-l on" @click="tabclick(0)">质差类型分析</li>
                            <li class="tab-list2 f-l" @click="tabclick(1)">问题阶段判定</li>
                            <li class="tab-list2 f-l" @click="tabclick(2)">问题场景定位</li>
                            <li class="tab-list2 f-l" @click="tabclick(3)">无线环境分析</li>
                            <li class="tab-list2 f-l" @click="tabclick(4)">趋势分析</li>
                        </ul>
                    </div>
                    <div class="chart2-box act" id="chart1" v-echarts="option1"></div>
                    <div class="chart2-box">
                        <div class="chart2-tab clearfix" @click="chart2Switch">
                            <div class="chart2-btn chart2-btn1 current f-l">4G-4G</div>
                            <div class="chart2-btn chart2-btn2 f-l">4G-GSM/TDS</div>
                        </div>
                        <span class="chrat2-txt up-txt">上行</span>
                        <span class="chrat2-txt down-txt">下行</span>
                        <div class="chart2 show" id="chart2-1" v-echarts="option21"></div>
                        <div class="chart2" id="chart2-2" v-echarts="option22"></div>
                    </div>
                    <div class="chart2-box">
                        <div class="inner-chart3 f-l">
                            <div class="chart3-title">
                                <table>
                                    <tr>
                                        <td class="title-txt">质差切片数：<span class="big-txt">{{scene.slice_total_count}}</span></td>
                                        <td class="title-txt">无线问题切片数：<span class="big-txt">{{scene.radio_problem_slice_num}}</span></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="chart3-wrap" id="chart51" v-echarts="option51"></div>
                        </div>
                        <div class="inner-chart3 f-l">
                            <div class="chart3-title">
                                <table>
                                    <tr>
                                        <td class="title-txt">无线问题切片比例：<span class="big-txt">{{scene.radio_problem_slice_num_rate}}</span></td>
                                        <td class="title-txt">质差切片关联MR数：<span class="big-txt">{{scene.radio_problem_mr_num}}</span></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="chart3-wrap" id="chart52" v-echarts="option52"></div>
                        </div>
                    </div>
                    <div class="chart2-box clearfix">
                        <div class="inner-chart3 f-l">
                            <div class="chart3-title">
                                <!--<table>
                                    <tr>
                                        <td class="title-txt">下行覆盖问题比例：<span class="big-txt">{{cover.Cause_Radio_RSRP_DL}}%</span></td>
                                        <td class="title-txt">下行干扰问题比例：<span class="big-txt">{{cover.Cause_Radio_RSRQ_DL}}%</span></td>
                                    </tr>
                                </table>-->
                            </div>
                            <div class="ff">
                                <el-switch
                                        v-model="switch1"
                                        :width="width"
                                        on-text="上行"
                                        off-text="下行"
                                        on-color="#2ee097"
                                        off-color="#e59a3d"
                                ></el-switch>
                            </div>
                            <div class="chart3-wrap" id="chart31" v-echarts="option31"></div>
                        </div>
                        <div class="inner-chart3 f-l">
                            <div class="chart3-title">
                                <!--<table>
                                    <tr>
                                        <td class="title-txt">上行覆盖问题比例：<span class="big-txt">{{cover.Cause_Radio_RSRP_UL}}%</span></td>
                                        <td class="title-txt">上行干扰问题比例：<span class="big-txt">{{cover.Cause_Radio_RSRQ_UL}}%</span></td>
                                    </tr>
                                </table>-->
                            </div>
                            <div class="ff">
                                <el-switch
                                        v-model="switch2"
                                        :width="width"
                                        on-text="上行"
                                        off-text="下行"
                                        on-color="#1572fb"
                                        off-color="#e59a3d"
                                ></el-switch>
                            </div>
                            <div class="chart3-wrap" id="chart32" v-echarts="option32"></div>
                        </div>
                    </div>
                    <div class="chart2-box" id="chart4" v-echarts="option4"></div>
                </div>
                <div class="zcxq-bottom clearfix">
                    <div class="bottom-l f-l">
                        <span class="bottom-icon"></span>
                        问题诊断
                    </div>
                    <div class="bottom-r f-r">
                        <ul>
                            <li class="r-list">
                                <span class="list-dot"></span>
                                质差类型：{{problem.qualityProblem}}
                            </li>
                            <li class="r-list">
                                <span class="list-dot"></span>
                                问题阶段：{{problem.stepProblem}}
                            </li>
                            <li class="r-list">
                                <span class="list-dot"></span>
                                无线环境：{{problem.radioProblem}}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

     <script>
     /**
     *ECI弹框详情
     */
    var base = require('config');
    var Echarts = require('../../directives/charts.js');
    var layer = require('layer');
    var echarts = require('echarts');
   export default{
       created(){
           var that = this;
           $('#capop-layer').show();
           setTimeout(function(){
               var loading_index = layer.load(2);
               //初始化查询数据
               that.Api.ca_qualitative_analysis(that.start,that.end,that.timetype,that.eci)
                        .then(
                                function(response){
                                    layer.close(loading_index);
                                    if(response.data.status==='success'){
                                        $('#capop-layer').show();
                                        var _data = response.data.data;
                                        //开始赋值
                                        that.baseInfo.eci = _data.base.ECI;
                                        that.baseInfo.start = _data.base.Start_Time;
                                        that.baseInfo.end = _data.base.End_Time;
                                        that.baseInfo.area = _data.base.cell_Name;
                                        that.netType = _data.netType;
                                        that.option1.series[0].data=[
                                            _data.qualitative.Worse_Quality_time_ul_rate,
                                            _data.qualitative.kqi_worse_mos_time_ul_rate,
                                            _data.qualitative.kqi_lost_word_time_ul_rate,
                                            _data.qualitative.kqi_intermittently_time_ul_rate,
                                            _data.qualitative.kqi_delay_time_ul_rate,
                                            _data.qualitative.kqi_single_pass_time_ul_rate,
                                            _data.qualitative.kqi_tc_num_ul_rate
                                        ];
                                        that.option1.series[1].data=[
                                            _data.qualitative.Worse_Quality_time_dl_rate,
                                            _data.qualitative.kqi_worse_mos_time_dl_rate,
                                            _data.qualitative.kqi_lost_word_time_dl_rate,
                                            _data.qualitative.kqi_intermittently_time_dl_rate,
                                            _data.qualitative.kqi_delay_time_dl_rate,
                                            _data.qualitative.kqi_single_pass_time_dl_rate,
                                            _data.qualitative.kqi_tc_num_dl_rate
                                        ];

                                        that.option21.series[0].data[0].value = _data['4G'].cause_step_1_num_ul;
                                        that.option21.series[0].data[1].value = _data['4G'].cause_step_2_num_ul;
                                        that.option21.series[0].data[2].value = _data['4G'].cause_step_3_num_ul;
                                        that.option21.series[0].data[3].value = _data['4G'].cause_step_5_num_ul;
                                        that.option21.series[1].data[0].value = _data['4G'].cause_step_1_num_dl;
                                        that.option21.series[1].data[1].value = _data['4G'].cause_step_2_num_dl;
                                        that.option21.series[1].data[2].value = _data['4G'].cause_step_3_num_dl;
                                        that.option21.series[1].data[3].value = _data['4G'].cause_step_5_num_dl;

                                        that.option22.series[0].data[0].value = _data['GMS'].cause_step_1_num_ul;
                                        that.option22.series[0].data[1].value = _data['GMS'].cause_step_4_num_ul;
                                        that.option22.series[1].data[0].value = _data['GMS'].cause_step_1_num_dl;
                                        that.option22.series[1].data[1].value = _data['GMS'].cause_step_4_num_dl;

                                        that.ul1 = _data.MrCell.ENB_Received_Power;
                                        that.dl1 = _data.MrCell.Serving_RSRP;
                                        that.ul2 = _data.MrCell.UL_SINR;
                                        that.dl2 = _data.MrCell.Serving_RSRQ;
                                        that.option31.series[0].data = that.ul1;
                                        that.option32.series[0].data = that.ul2;
                                        /*that.cover = _data.cover;*/

                                        that.option4.series[0].data = _data.trend.ul;
                                        that.option4.series[1].data = _data.trend.dl;

                                       /* _data.scene = {
                                            slice_total_count: 1000,//切片总数
                                            radio_problem_slice_num: 2000,//无线问题质差切片数
                                            radio_problem_slice_num_rate: "43%",//无线问题质差切片比例(%)
                                            radio_problem_mr_num: 6345,//质差切片关联MR数
                                            Cause_Radio_RSRP_DL_slice_num_rate:'10%',// 下行覆盖
                                            Cause_Radio_RSRQ_DL_slice_num_rate:'20%', //下行干扰
                                            Cause_Radio_RSRP_UL_slice_num_rate: '0%',//上行覆盖
                                            Cause_Radio_RSRQ_UL_slice_num_rate: '39%',//上行干扰
                                            cause_ul_dl_unbalance_slice_num_rate: '29%',//上下行链路不平衡
                                            cause_neighbour_cell_loss_slice_num_rate: '10%',//邻区漏配
                                            cause_overlap_coverage_slice_num_rate: '20%',//重叠覆盖
                                            cause_null_main_coverage_slice_num_rate: '59%',//无主覆盖
                                            cause_mod3_conflict_slice_num_rate: '0%'//模3干扰
                                        };*/

                                        that.scene = _data.scene;
                                        console.log(_data.scene)
                                        that.option51.series[0].data = [
                                            that.rePecent( that.scene.cause_ul_dl_unbalance_slice_num_rate ),
                                            that.rePecent( that.scene.Cause_Radio_RSRQ_UL_slice_num_rate ),
                                            that.rePecent( that.scene.Cause_Radio_RSRP_UL_slice_num_rate ),
                                            that.rePecent( that.scene.Cause_Radio_RSRQ_DL_slice_num_rate ),
                                            that.rePecent( that.scene.Cause_Radio_RSRP_DL_slice_num_rate )
                                        ];

                                        that.option52.series[0].data = [
                                            that.rePecent( that.scene.cause_mod3_conflict_slice_num_rate ),
                                            that.rePecent( that.scene.cause_null_main_coverage_slice_num_rate ),
                                            that.rePecent( that.scene.cause_overlap_coverage_slice_num_rate ),
                                            that.rePecent( that.scene.cause_neighbour_cell_loss_slice_num_rate )
                                        ];

                                        that.option51.xAxis.max = that.maxFix(that.option51.series[0].data,10);
                                        that.option52.xAxis.max = that.maxFix(that.option52.series[0].data,10);

                                        that.problem = _data.problem;

                                        echarts.getInstanceByDom($('#chart1').get(0)).setOption(that.option1);
                                        echarts.getInstanceByDom($('#chart2-1').get(0)).setOption(that.option21);
                                        echarts.getInstanceByDom($('#chart2-2').get(0)).setOption(that.option22);
                                        echarts.getInstanceByDom($('#chart31').get(0)).setOption(that.option31);
                                        echarts.getInstanceByDom($('#chart32').get(0)).setOption(that.option32);
                                        echarts.getInstanceByDom($('#chart4').get(0)).setOption(that.option4);
                                        echarts.getInstanceByDom($('#chart51').get(0)).setOption(that.option51);
                                        echarts.getInstanceByDom($('#chart52').get(0)).setOption(that.option52);
                                        //赋值完毕，弹出弹框
                                        layer.open({
                                            type: 1,
                                            title: '质差小区分析',
                                            area:['910px'],
                                            scrollbar:false,
                                            resize:true,
                                            skin: 'demo-class',
                                            content: $('#capop-layer'),
                                            cancel:function(index){
                                                that.$parent.isLayerOpen = false;
                                                layer.close(index);
                                            }
                                        });

                                        setTimeout(function(){
                                            echarts.getInstanceByDom($('#chart1').get(0)).resize();
                                        },100);
                                    }
                                },
                                function(e){
                                    that.$parent.isLayerOpen = false;
                                    layer.close(loading_index);
                                }
                        );

           },100);

       },
       directives: {
           "echarts":Echarts
       },
       props:{
           start:'',
           end:'',
           timetype:'',
           eci:''

       },
       data(){
         return{
             width:64,
             //开关1
             switch1:true,
             //开关2
             switch2:true,
             //上行下行数据
             ul1:[],
             dl1:[],
             ul2:[],
             dl2:[],
             /*cover:{
                 Cause_Radio_RSRP_DL:0,
                 Cause_Radio_RSRP_UL:0,
                 Cause_Radio_RSRQ_DL:0,
                 Cause_Radio_RSRQ_UL:0
             },*/
             scene:{

             },
             problem:{
                 qualityProblem: "",
                 radioProblem: "",
                 stepProblem: ""
             },
             //横坐标1
             xAxis1:['-10', '-5', '0', '5', '10', '15','20','25'],
             //横坐标2
             xAxis2:['-19', '-17', '-15', '-13', '-11', '-9','-7','-5','-3'],
             baseInfo:{
               eci:'',
                 area:'',
               start:'',
                end:''
             },
             netType:[],
             //option均为echarts图表配置属性
             option1:{
                 backgroundColor: '#132538',
                 tooltip : {
                     trigger: 'axis',
                     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                     }
                 },
                 legend: {
                     orient: 'vertical',
                     top: 26,
                     right: 52,
                     itemWidth: 15,
                     itemHeight: 15,
                     textStyle: {
                         color: '#BABDC0'
                     },
                     data: [
                         {
                             name: '上行',
                             icon: 'rect'
                         },
                         {
                             name: '下行',
                             icon: 'rect'
                         }
                     ]
                 },
                 grid: {
                     backgroundColor: '#132538',
                     left: '3%',
                     right: '10%',
                     bottom: '10%',
                     containLabel: true
                 },
                 xAxis : [
                     {
                         type : 'category',
                         axisLine: {
                             lineStyle: {
                                 color: '#04D180'
                             }
                         },
                         axisTick: {
                             show: false
                         },
                         axisLabel: {
                             textStyle: {
                                 color: '#BABDC0'
                             }
                         },
                         data : ['质差事件','MOS差', '吞字', '断续', '拖沓', '单通', 'TC次数']
                     }
                 ],
                 yAxis : [
                     {
                         name: '时长占比',
                         nameTextStyle: {
                             color: '#BABDC0',
                             fontSize: 14
                         },
                         type : 'value',
                         splitLine: {
                             show: false
                         },
                         axisLine: {
                             lineStyle: {
                                 color: '#04D180'
                             }
                         },
                         axisTick: {
                             show: false
                         },
                         axisLabel: {
                             formatter: '{value} %',
                             textStyle: {
                                 color: '#BABDC0'
                             }
                         }
                     }
                 ],
                 series : [
                     {
                         name: '上行',
                         type: 'bar',
                         barWidth: 28,
                         barGap: 0,
                         itemStyle: {
                             normal: {
                                 color: '#02E98A'
                             }
                         },
                         data: [0, 0, 0, 0, 0, 0,0]
                     },
                     {
                         name: '下行',
                         type: 'bar',
                         barWidth: 28,
                         barGap: 0,
                         itemStyle: {
                             normal: {
                                 color: '#E59A3D'
                             }
                         },
                         data: [0, 0, 0, 0, 0, 0,0]
                     }
                 ]
             },
             option21: {
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 top: 74,
                 right: 20,
                 itemWidth: 15,
                 itemHeight: 15,
                 icon: 'rect',
                 textStyle: {
                     color: '#BABDC0'
                 },
                 orient: 'vertical',
                 data:['源端-源端SBC','源端SBC-对端','对端SBC-对端','源端SBC-对端SBC']
             },
             calculable : true,
             series : [
                 {
                     name:'上行',
                     type:'pie',
                     center : ['25%', '45%'],
                     radius: 70,
                     formatter: '上行',
                     label: {
                         normal: {
                             show: false
                         },
                         emphasis: {
                             show: true
                         }
                     },
                     lableLine: {
                         normal: {
                             show: false
                         },
                         emphasis: {
                             show: true
                         }
                     },
                     data:[
                         {
                             value:0,
                             name:'源端-源端SBC',
                             itemStyle:{
                                 normal:{
                                     color: '#0051A0',
                                 }
                             }
                         },
                         {
                             value:0,
                             name:'源端SBC-对端',
                             itemStyle:{
                                 normal:{
                                     color: '#00A2DB',
                                 }
                             }
                         },
                         {
                             value:0,
                             name:'对端SBC-对端',
                             itemStyle:{
                                 normal:{
                                     color: '#01D0DD',
                                 }
                             }
                         },
                         {
                             value:0,
                             name:'源端SBC-对端SBC',
                             itemStyle:{
                                 normal:{
                                     color: '#00D399',
                                 }
                             }
                         }
                     ]
                 },
                 {
                     name:'下行',
                     type:'pie',
                     label: {
                         normal: {
                             show: false
                         },
                         emphasis: {
                             show: true
                         }
                     },
                     center : ['60%', '45%'],
                     radius: 70,
                     data:[
                         {
                             value:0,
                             name:'源端-源端SBC',
                             itemStyle:{
                                 normal:{
                                     color: '#0051A0',
                                 }
                             }
                         },

                         {value:0,
                             name:'源端SBC-对端',
                             itemStyle:{
                                 normal:{
                                     color: '#00A2DB',
                                 }
                             }
                         },
                         {
                             value:0,
                             name:'对端SBC-对端',
                             itemStyle:{
                                 normal:{
                                     color: '#01D0DD',
                                 }
                             }
                         },
                         {
                             value:0,
                             name:'源端SBC-对端SBC',
                             itemStyle:{
                                 normal:{
                                     color: '#00D399',
                                 }
                             }
                         }
                     ]
                 }
             ]
         },
             option22: {
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             legend: {
                 top: 74,
                 right: 20,
                 itemWidth: 15,
                 itemHeight: 15,
                 icon: 'rect',
                 textStyle: {
                     color: '#BABDC0'
                 },
                 orient: 'vertical',
                 data:['源端-源端SBC','源端SBC-IM-MGW']
             },
             calculable : true,
             series : [
                 {
                     name:'上行',
                     type:'pie',
                     center : ['25%', '45%'],
                     radius: 70,
                     label: {
                         normal: {
                             show: false
                         },
                         emphasis: {
                             show: true
                         }
                     },
                     lableLine: {
                         normal: {
                             show: false
                         },
                         emphasis: {
                             show: true
                         }
                     },
                     data:[
                         {
                             value:0,
                             name:'源端-源端SBC',
                             itemStyle:{
                                 normal:{
                                     color: '#9951A0',
                                 }
                             }
                         },
                         {
                             value:0,
                             name:'源端SBC-IM-MGW',
                             itemStyle:{
                                 normal:{
                                     color: '#99A2DB',
                                 }
                             }
                         }
                     ]
                 },
                 {
                     name:'下行',
                     type:'pie',
                     label: {
                         normal: {
                             show: false
                         },
                         emphasis: {
                             show: true
                         }
                     },
                     center : ['60%', '45%'],
                     radius: 70,
                     data:[
                         {
                             value:0,
                             name:'源端-源端SBC',
                             itemStyle:{
                                 normal:{
                                     color: '#9951A0',
                                 }
                             }
                         },

                         {value:0,
                             name:'源端SBC-IM-MGW',
                             itemStyle:{
                                 normal:{
                                     color: '#99A2DB',
                                 }
                             }
                         }
                     ]
                 }
             ]
         },
             option31: {
             backgroundColor: '#132538',
             tooltip : {
                 trigger: 'axis',
                 axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                 }
             },
            /* legend: {
                 bottom: 10,
                 left: 160,
                 itemWidth: 15,
                 itemHeight: 15,
                 textStyle: {
                     color: '#BABDC0'
                 },
                 data: [
                     {
                         name: '下行电平',
                         icon: 'rect'
                     },
                     {
                         name: '上行电平',
                         icon: 'rect'
                     }
                 ]
             },*/
             grid: {
                 backgroundColor: '#132538',
                 top: '4%',
                 left: '3%',
                 right: '3%',
                 bottom: '1%',
                 containLabel: true
             },
             xAxis : [
                 {
                     type : 'category',
                     axisLine: {
                         lineStyle: {
                             color: '#04D180'
                         }
                     },
                     axisTick: {
                         show: false
                     },
                     axisLabel: {
                         textStyle: {
                             color: '#BABDC0'
                         },
                         rotate: 45,
                         interval: 0,
                     },
                     data : ['-135', '-125', '-115', '-105', '-95', '-85','-75','-65','-55','-45']
                 }
             ],
             yAxis : [
                 {
                     type : 'value',
                     splitLine: {
                         show: false
                     },
                     axisLine: {
                         lineStyle: {
                             color: '#04D180'
                         }
                     },
                     axisTick: {
                         show: false
                     },
                     axisLabel: {
                         textStyle: {
                             color: '#BABDC0'
                         }
                     }
                 }
             ],
             series : [
                 {
                     name: '上行电平',
                     type: 'bar',
                     barWidth: 12,
                     barGap: 0,
                     itemStyle: {
                         normal: {
                             color: '#02E98A'
                         }
                     },
                     data: [15, 14, 9, 8, 6, 4, 15, 8, 6, 3]
                 }/*,
                 {
                     show:false,
                     name: '上行电平',
                     type: 'bar',
                     barWidth: 12,
                     barGap: 0,
                     itemStyle: {
                         normal: {
                             color: '#E59A3D'
                         }
                     },
                     data: [28, 27, 15, 8, 6, 3, 9, 8, 6, 4]
                 }*/
             ]
         },
             option32: {
             backgroundColor: '#132538',
             tooltip : {
                 trigger: 'axis',
                 axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                 }
             },
             /*legend: {
                 bottom: 10,
                 left: 160,
                 itemWidth: 15,
                 itemHeight: 15,
                 textStyle: {
                     color: '#BABDC0'
                 },
                 data: [
                     {
                         name: '下行质量',
                         icon: 'rect'
                     },
                     {
                         name: '上行质量',
                         icon: 'rect'
                     }
                 ]
             },*/
             grid: {
                 backgroundColor: '#132538',
                 top: '4%',
                 left: '3%',
                 right: '3%',
                 bottom: '1%',
                 containLabel: true
             },
             xAxis : [
                 {
                     type : 'category',
                     axisLine: {
                         lineStyle: {
                             color: '#04D180'
                         }
                     },
                     axisTick: {
                         show: false
                     },
                     axisLabel: {
                         textStyle: {
                             color: '#BABDC0'
                         },
                         rotate: 45,
                         interval: 0,
                     },
                     data : ['-10', '-5', '0', '5', '10', '15','20','25']
                 }
             ],
             yAxis : [
                 {
                     type : 'value',
                     splitLine: {
                         show: false
                     },
                     axisLine: {
                         lineStyle: {
                             color: '#04D180'
                         }
                     },
                     axisTick: {
                         show: false
                     },
                     axisLabel: {
                         textStyle: {
                             color: '#BABDC0'
                         }
                     }
                 }
             ],
             series : [
                 {
                     xAxisIndex:0,
                     name: '上行SINR',
                     type: 'bar',
                     barWidth: 12,
                     barGap: 0,
                     itemStyle: {
                         normal: {
                             color: '#1572FB'
                         }
                     },
                     data: [15, 14, 9, 8, 6, 4, 15, 8, 6, 3,1,1,1]
                 },
                /* {
                     name: '上行质量',
                     type: 'bar',
                     barWidth: 12,
                     barGap: 0,
                     itemStyle: {
                         normal: {
                             color: '#E59A3D'
                         }
                     },
                     data: [28, 27, 15, 8, 6, 3, 9, 8, 6, 4]
                 }*/
             ]
         },
             option4: {
                 backgroundColor: '#132538',
                 tooltip : {
                     trigger: 'axis',
                     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                     }
                 },
                 legend: {
                     top: 10,
                     right: 20,
                     itemWidth: 15,
                     itemHeight: 15,
                     textStyle: {
                         color: '#BABDC0'
                     },
                     data: [
                         {
                             name: '下行',
                             icon: 'rect'
                         },
                         {
                             name: '上行',
                             icon: 'rect'
                         }
                     ]
                 },
                 grid: {
                     backgroundColor: '#132538',
                     top: '15%',
                     left: '3%',
                     right: '3%',
                     bottom: '3%',
                     containLabel: true
                 },
                 xAxis : [
                     {
                         type : 'category',
                         axisLine: {
                             lineStyle: {
                                 color: '#04D180'
                             }
                         },
                         axisTick: {
                             show: false
                         },
                         axisLabel: {
                             textStyle: {
                                 color: '#BABDC0'
                             },
                             rotate: 45,
                             interval: 0,
                         },
                         data : ['00', '01', '02', '03', '04', '05','06','07','08','09',
                                 '10', '11', '12', '13', '14', '15','16','17','18','19','20','21','22','23'
                         ]
                     }
                 ],
                 yAxis : [
                     {
                         name:'质差时长占比',
                         type : 'value',
                         splitLine: {
                             show: false
                         },
                         axisLine: {
                             lineStyle: {
                                 color: '#04D180'
                             }
                         },
                         axisTick: {
                             show: false
                         },
                         axisLabel: {
                             formatter: '{value}% ',
                             textStyle: {
                                 color: '#BABDC0'
                             }
                         }
                     }
                 ],
                 series : [
                     {
                         name: '上行',
                         type: 'bar',
                         barWidth: 12,
                         barGap: 0,
                         itemStyle: {
                             normal: {
                                 color: '#02E98A'
                             }
                         },
                         data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                     },
                     {
                         name: '下行',
                         type: 'bar',
                         barWidth: 12,
                         barGap: 0,
                         itemStyle: {
                             normal: {
                                 color: '#E59A3D'
                             }
                         },
                         data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                     }
                 ]
             },
             option51:{
                 backgroundColor: '#132538',
                 tooltip : {
                     trigger: 'axis',
                     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                     },
                     formatter:'{b}：{c}%'
                 },
                 grid: {
                     backgroundColor: '#132538',
                     top: '4%',
                     left: '3%',
                     right: '5%',
                     bottom: '2%',
                     containLabel: true
                 },
                 yAxis: {
                     data:['上下行链路不平衡','上行干扰','上行覆盖','下行干扰','下行覆盖'],
                     type : 'category',
                     axisTick: {show: false},
                     axisLine: {
                         lineStyle: {
                             color: '#04D180'
                         }
                     },
                     axisLabel: {
                         textStyle: {
                             color: '#BABDC0'
                         }
                     }

                 },
                 xAxis: {
                     type : 'value',
                     axisLine: {
                         lineStyle: {
                             color: '#04D180'
                         }
                     },
                     axisTick: {
                         show: false
                     },
                     axisLabel: {
                         textStyle: {
                             color: '#BABDC0'
                         },
                         formatter:'{value}%'
                     },
                     splitLine: {show: false}
                 },
                 series: [
                     {
                         type: 'bar',
                         barWidth:20,
                         itemStyle: {
                             normal: {
                                 color: '#E59A3D',
                                 label:{
                                     show:true,
                                     position:'right',
                                     formatter:function(a){
                                         return a.value + '%';
                                     }
                                 }
                             }
                     },
                     silent: true,
                         barGap: '-100%', // Make series be overlap
                         data: []
                     }]
             },
             option52:{
                 backgroundColor: '#132538',
                 tooltip : {
                     trigger: 'axis',
                     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                     },
                     formatter:'{b}：{c}%'
                 },
                 grid: {
                     backgroundColor: '#132538',
                     top: '4%',
                     left: '3%',
                     right: '5%',
                     bottom: '2%',
                     containLabel: true
                 },
                 yAxis: {
                     data:['模3干扰','无主覆盖','重叠覆盖','      邻区漏配'],
                     type : 'category',
                     axisTick: {show: false},
                     axisLine: {
                         lineStyle: {
                             color: '#04D180'
                         }
                     },
                     axisLabel: {
                         textStyle: {
                             color: '#BABDC0'
                         }
                     }

                 },
                 xAxis: {
                     type : 'value',
                     axisLine: {
                         lineStyle: {
                             color: '#04D180'
                         }
                     },
                     axisTick: {
                         show: false
                     },
                     axisLabel: {
                         textStyle: {
                             color: '#BABDC0'
                         },
                         formatter:'{value}%'
                     },
                     splitLine: {show: false}
                 },
                 series: [
                     {
                         type: 'bar',
                         barWidth:20,
                         itemStyle: {
                             normal: {
                                 color: '#E59A3D',
                                 label:{
                                     show:true,
                                     position:'right',
                                     formatter:function(a){
                                         return a.value + '%';
                                     }
                                 }
                             }
                         },
                         silent: true,
                         barGap: '-100%', // Make series be overlap
                         data: []
                     }]
             }

         }
       },
       methods:{
            tabclick(index){
                $('.tab-list2').removeClass('on');
                $('.tab-list2').eq(index).addClass('on');
                $('.chart2-box').removeClass('act');
                $('.chart2-box').eq(index).addClass('act');
                echarts.getInstanceByDom($('#chart1').get(0)).resize();
                echarts.getInstanceByDom($('#chart2-1').get(0)).resize();
                echarts.getInstanceByDom($('#chart2-2').get(0)).resize();
                echarts.getInstanceByDom($('#chart31').get(0)).resize();
                echarts.getInstanceByDom($('#chart32').get(0)).resize();
                echarts.getInstanceByDom($('#chart4').get(0)).resize();
                echarts.getInstanceByDom($('#chart51').get(0)).resize();
                echarts.getInstanceByDom($('#chart52').get(0)).resize();
            },
           chart2Switch(){
               $('.chart2-btn').each(function(index){
                   if($(this).hasClass('current')){
                       $(this).removeClass('current');
                       $('.chart2').eq(index).removeClass('show');
                   }else{
                       $(this).addClass('current');
                       $('.chart2').eq(index).addClass('show');
                   }
               });
               echarts.getInstanceByDom($('#chart2-1').get(0)).resize();
               echarts.getInstanceByDom($('#chart2-2').get(0)).resize();
           },
           rePecent(str){
               return Number( (''+str).replace('%','') );
           },
           maxFix(arr,temp){
               var _max = Math.max.apply(Math,arr);
               if((_max + temp)>=100){
                   return 100;
               }else{
                   var _fixMax = Number((''+(_max + temp)).substr(0,1) + '0');
                   if((_fixMax -_max) < 5){
                       _fixMax += 10;
                   }
                   return _fixMax;
               }
           }

       },
       watch:{
           switch1:{
               handler:function(curVal,oldVal){
                   var that = this;
                   if(curVal){
                      this.option31.series[0].name = '上行电平';
                       this.option31.series[0].itemStyle.normal.color = '#02E98A';
                       this.option31.series[0].data = this.ul1;
                      //this.option31.xAxis[1].show = false;
                   }else{
                       this.option31.series[0].name = '下行电平';
                       this.option31.series[0].itemStyle.normal.color = '#E59A3D';
                       this.option31.series[0].data = this.dl1;
                       //this.option31.xAxis[1].show = true;
                   }
                   setTimeout(function(){
                       echarts.getInstanceByDom($('#chart31').get(0)).setOption(that.option31);
                   },0);

               }
           },
           switch2:{
               handler:function(curVal,oldVal){
                   var that = this;
                   if(curVal){
                       this.option32.series[0].name = '上行SINR';
                       this.option32.series[0].itemStyle.normal.color = '#1572fb';
                       this.option32.xAxis[0].data = that.xAxis1;
                       this.option32.series[0].data = this.ul2;
                       //this.option31.xAxis[1].show = false;
                   }else{
                       this.option32.series[0].name = '下行RSRQ';
                       this.option32.series[0].itemStyle.normal.color = '#E59A3D';
                       this.option32.xAxis[0].data = that.xAxis2;
                       this.option32.series[0].data = this.dl2;
                       //this.option31.xAxis[1].show = true;
                   }
                   setTimeout(function(){
                       echarts.getInstanceByDom($('#chart32').get(0)).setOption(that.option32);
                   },0);

               }
           }
       }
   }
</script>
<style>
    .el-tooltip__popper{
        z-index:9999999999!important;
    }
    .el-tooltip__popper.is-light.dark-el{
        color:#fff;
        border:1px #bbb solid;
        background: #22384f;
    }


</style>
<style scoped>
    .line-wrap {
        height: 38px;
        margin: 0 3px;
    }
    .inp-line {
        display: inline-block;
        width: 14px;
        height: 1px;
        background-color: #22384F;
        margin-top: 16px;
    }
    /* 质差小区弹层 */
    #zz{ display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #000; opacity: 0.80; filter: alpha(opacity=80); z-index: 10;}
    .layer{ display: none; overflow: auto; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 11;}
    .zcxq-cont {
        width: 900px;
        margin: auto;
    }
    #zcxq-open {
        padding: 20px;
        background-color: #192D43;
    }
    .gray {
        color: #BABDC0;
    }
    .zcxq-header {
        position: relative;
        background-color: #2184DA;
        height: 50px;
    }
    .zc-title {
        padding-left: 20px;
        line-height: 50px;
        font-size: 18px;
        color: #fff;
    }
    .layer-close {
        position: absolute;
        top: 50%;
        right: 20px;
        width: 28px;
        height: 28px;
        margin-top: -14px;
        background: url(../../images/layer_close.png) no-repeat;
    }
    .zcxq-top {
        margin-bottom: 10px;
    }
    .top-txt {
        width: 80px;
        height: 38px;
        line-height: 38px;
        color: #fff;
        text-align: center;
    }
    .top-inp {
        height: 38px;
        background-color: #22384F;
        border: none;
        outline: none;
        border-radius: 2px;
        color: #ccc;
        font-size: 14px;
        line-height: 38px;
    }
    .w116 {
        width: 165px;
        padding: 0 12px;
    }
    .w130 {
        width: 110px;
        padding: 0 12px;
        margin-right: 10px;
    }
    .w150 {
        width: 130px;
        padding: 0 12px;
        margin-right: 10px;
    }
    .zcxq-table {
        height: 170px;
        margin-bottom: 12px;
    }
    .zcxq-table table {
        width: 100%;
        height: 100%;
    }
    .zcxq-table .table-title {
        height: 36px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        font-weight: bold;
    }
    .table-line {
        background: url(../../images/table_line.png) no-repeat;
        background-size: 100% 100%;
    }
    .zcxq-table .first-td {
        width: 100px;
        font-size: 12px;
        text-align: left;
        padding-left: 20px;
        color: #BABDC0;
    }
    .zcxq-table tbody td {
        border: 1px solid #23405E;
        text-align: center;
        font-size: 16px;
        color: #fff;
    }
    .first-tr {
        height: 40px;
    }
    .zcxq-table .first-tr td {
        font-size: 12px;
        text-align: center;
        color: #BABDC0;
    }
    .bgc1 {
        background-color: #0C1D30;
    }
    .bgc2 {
        background-color: #1F344C;
    }
    .zcxq-chart {
        margin-bottom: 20px;
    }
    .tab-list2 {
        height: 37px;
        padding: 0 12px;
        color: #BABDC0;
        border-top: 3px solid #192D43;
        font-size: 14px;
        line-height: 37px;
        cursor: pointer;
    }
    .chart-tab .on {
        color: #fff;
        border-top-color: #17A25E;
        background-color: #132538;
    }
    .chart2-box {
        position: relative;
        height: 200px;
        display: none;
        background-color: #132538;
    }
    .act {
        display: block;
    }
    .chart2 {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: none;
    }
    .show {
        display: block;
    }
    .chart2-tab {
        position: absolute;
        z-index: 2;
        top: 14px;
        right: 10px;
    }
    .chart2-btn {
        line-height: 30px;
        background-color: #2B3B4C;
        color: #BABDC0;
        cursor: pointer;
    }
    .chart2-btn1 {
        padding: 0 6px 0 14px;
        border-radius: 15px 0 0 15px;
    }
    .chart2-btn2 {
        padding: 0 10px 0 14px;
        border-radius: 0 15px 15px 0;
    }
    .chart2-btn.current {
        background-color: #17A25E;
    }
    .chrat2-txt {
        position: absolute;
        bottom: 16px;
        color: #BABDC0;
    }
    .up-txt {
        left: 24%;
    }
    .down-txt {
        left: 59%;
    }
    .inner-chart3 {
        position: relative;
        width: 50%;
        height: 100%;
    }
    .chart3-title {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 32px;
    }
    .chart3-title table {
        width: 100%;
        height: 100%;
    }
    .chart3-title table tr{
        height: 32px;
    }
    .chart3-wrap {
        position: absolute;
        top: 34px;
        right: 0;
        bottom: 0;
        left: 0;
        height:166px;
    }
    .title-txt {
        font-size: 14px;
        color: #BABDC0;
        line-height: 28px;
        padding-left: 20px;
    }
    .big-txt {
        font-size: 18px;
        color: #07B565;
    }
    .zcxq-bottom {
        border: 1px solid #22A665;
    }
    .bottom-l {
        position: relative;
        width: 12%;
        padding-top: 48px;
        height: 76px;
        background-color: #1FA362;
        text-align: center;
        color: #fff;
        font-size: 14px;
        line-height: 14px;
    }
    .bottom-icon {
        position: absolute;
        top: 15px;
        left: 50%;
        margin-left: -15px;
        width: 30px;
        height: 23px;
        background: url(../../images/bottom_icon.png) no-repeat;
    }
    .bottom-r {
        height: 76px;
        width: 88%;
        background-color: #132538;
        padding: 8px 0;
    }
    .r-list {
        position: relative;
        padding: 0 30px;
        line-height: 22px;
        color: #fff;
        font-size: 12px;
    }
    .list-dot {
        position: absolute;
        top: 50%;
        left: 16px;
        width: 5px;
        height: 5px;
        margin-top: -3px;
        border-radius: 50%;
        background-color: #364556;
    }
    /* 地图模块下方tab切换 */
    .content-t {
        border: none;
        background-color: #1A1F28;
    }
    .tab {
        position: relative;
    }
    .tab-hd {
        border-bottom: none;
        height: 40px;
    }
    .tab-cont {
        position: relative;
        padding: 0;
        height: 347px;
    }
    .tab .tab-items li.current {
        background-color: #17A25E;
        color: #fff;
    }
    .stick-wrap {
        position: absolute;
        z-index: 1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .z-ind {
        z-index: 2;
    }
    .tab-items li {
        padding: 0 22px;
        height: 40px;
        line-height: 40px;
        float: left;
        font-size: 14px;
        cursor: pointer;
    }
    .tab .tab-items li {
        color: #fff;
    }
    .tab .tab-items li:hover {
        border-bottom: none;
        height: 40px;
    }
    .tab-tool {
        position: absolute;
        width: 90px;
        height: 38px;
        border-radius: 19px;
        background-color: #303030;
        top: -4px;
        right: 20px;
    }
    .tab-tool a {
        display: block;
        text-align: center;
        color: #fff;
        font-size: 14px;
        line-height: 38px;
    }
    .tab-tool a:hover {
        color: #fff;
        text-decoration: none;
    }
    .tab-tool:hover {
        background-color: #17A25E;
    }
    .dc-icon {
        display: inline-block;
        width: 16px;
        height: 16px;
        background: url(../../images/excel.png) no-repeat;
        vertical-align: middle;
        margin-right: 6px;
    }


    /* 分页 */
    .page-l {
        padding-left: 18px;
        font-size: 14px;
        color: #F1F7FC;
        line-height: 32px;
    }
    .page-l input {
        vertical-align: middle;
        width: 46px;
        height: 30px;
        background-color: #181819;
        border: 0;
        outline: 0;
        text-align: center;
        margin: 0 4px;
        border-radius: 2px;
        color: #F1F7FC;
        line-height: 30px;
    }
    .page-wrap {
        padding: 10px 0;
    }
    .ued-page a {
        background: #1A3048;
        border: 1px solid #192B40;
        color: #fff;
    }

    .ff{
        position: absolute;
        z-index:20;
        right:10px;
        top:26px;
    }
    .ff .el-switch{
        font-size: 12px;
        line-height: 14px;
        height: 14px;
    }
    .ff .el-switch__core,.ff .el-switch__label{
        height:20px;
    }
    .ff .el-switch__label,.ff .el-switch__label *{
        font-size: 12px;
    }
</style>