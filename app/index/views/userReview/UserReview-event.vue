<template>
    <!--异常事件弹出-->
    <div id="abnormal" class="abnormal temphideclass">
        <div class="layer-pd clearfix">
            <dl >
                <dt>事件</dt>
                <dd>
                    <div v-nicescroll="niceScrollOption1" class="event-nice-scorll">
                        <table width="100%">
                            <tr v-show="eventData.event[0].eventType!=''">
                                <th width="40%">类型</th>
                                <td>{{eventData.event[0].eventType}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].slice_start_time!=''">
                                <th width="40%">开始时间</th>
                                <td>{{eventData.event[0].slice_start_time}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].slice_end_time!=''">
                                <th width="40%">结束时间</th>
                                <td>{{eventData.event[0].slice_end_time}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].Slice_Keep_Time!=''">
                                <th width="40%">持续时间</th>
                                <td>{{eventData.event[0].Slice_Keep_Time}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].Event_Start_Time!=''">
                                <th width="40%">单通开始时间</th>
                                <td>{{eventData.event[0].Event_Start_Time}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].Event_End_Time!=''">
                                <th width="40%">单通结束时间</th>
                                <td>{{eventData.event[0].Event_End_Time}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].Event_Keep_Time!=''">
                                <th width="40%">单通持续时长</th>
                                <td>{{eventData.event[0].Event_Keep_Time}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].Change_Type!=''">
                                <th width="40%">切换类型</th>
                                <td>{{eventData.event[0].Change_Type}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].Start_ECI!=''">
                                <th width="40%">开始小区</th>
                                <td>{{eventData.event[0].Start_ECI}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].End_ECI!=''">
                                <th width="40%">结束小区</th>
                                <td>{{eventData.event[0].End_ECI}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].Seesion_End_Time!=''">
                                <th width="40%">掉线时间</th>
                                <td>{{eventData.event[0].Seesion_End_Time}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].Codec_type!=''">
                                <th width="40%">编码方式</th>
                                <td>{{eventData.event[0].Codec_type}}</td>
                            </tr>
                            <tr v-show="eventData.event[0].Codec_rate!=''">
                                <th width="40%">编码速率</th>
                                <td>{{eventData.event[0].Codec_rate}}</td>
                            </tr>
                        </table>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>指标</dt>
                <dd>
                    <div v-nicescroll="niceScrollOption2" class="event-nice-scorll">
                        <table width="100%">
                            <tr v-show="eventData.index[0].KQI_MOS!=''">
                                <th width="50%">MOS</th>
                                <td>{{eventData.index[0].KQI_MOS}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].RTP_Packet_Loss_Num!=''">
                                <th width="50%">RTP丢包数</th>
                                <td>{{eventData.index[0].RTP_Packet_Loss_Num}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].RTCP_Packet_Loss_Num!=''">
                                <th width="50%">RTCP丢包数</th>
                                <td>{{eventData.index[0].RTCP_Packet_Loss_Num}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].RTP_Consecutive_Lost_Num!=''">
                                <th width="50%">最大连续丢包数</th>
                                <td>{{eventData.index[0].RTP_Consecutive_Lost_Num}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].RTP_Max_Interval!=''">
                                <th width="50%">最大中断时长</th>
                                <td>{{eventData.index[0].RTP_Max_Interval}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].RTP_Interarrival_jitter!=''">
                                <th width="50%">RTP相对时延</th>
                                <td>{{eventData.index[0].RTP_Interarrival_jitter}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].RTCP_InterArrival_Jitter!=''">
                                <th width="50%">RTCP抖动</th>
                                <td>{{eventData.index[0].RTCP_InterArrival_Jitter}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].RTCP_RingDelay!=''">
                                <th width="50%">环路时延</th>
                                <td>{{eventData.index[0].RTCP_RingDelay}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].IntraRAT_HO_Num_Src!=''">
                                <th width="50%">源端系统内切换次数</th>
                                <td>{{eventData.index[0].IntraRAT_HO_Num_Src}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].IntraRAT_HO_Num_Dest!=''">
                                <th width="50%">对端系统内切换次数</th>
                                <td>{{eventData.index[0].IntraRAT_HO_Num_Dest}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].Codec_Rate_LastSlice!=''">
                                <th width="50%">调整前速率</th>
                                <td>{{eventData.index[0].Codec_Rate_LastSlice}}</td>
                            </tr>
                            <tr v-show="eventData.index[0].Codec_Rate_CurSlice!=''">
                                <th width="50%">调整后速率</th>
                                <td>{{eventData.index[0].Codec_Rate_CurSlice}}</td>
                            </tr>
                        </table>
                    </div>
                </dd>
            </dl>
            <dl>
                <dt>源端环境</dt>
                <dd>
                    <div class="layer-bar"></div>
                    <ul  id="slider1" >
                        <slider width="170px"
                                height="250px"
                                animation="normal"
                                :len="eventData.src.length"
                                :auto="false"
                                :indicators="false"
                                :interval="1000"
                                :speed="800" v-if="eventData.src!=''" >
                            <slider-item v-for="(item,index) in eventData.src">
                                <li>
                                    <table width="100%">
                                        <tr v-if="item.CellID!=''">
                                            <th width="50%">小区</th>
                                            <td>{{item.CellID}}</td>
                                        </tr>
                                        <tr v-if="item.Time!=''">
                                            <th width="50%">时间</th>
                                            <td>{{item.Time}}</td>
                                        </tr>
                                        <tr v-if="item.MrType!=''">
                                            <th width="50%">MR类型</th>
                                            <td>{{item.MrType}}</td>
                                        </tr>
                                        <tr v-if="item.ServingRSRP!=''">
                                            <th width="50%">RSRP</th>
                                            <td>{{item.ServingRSRP}}</td>
                                        </tr>
                                        <tr v-if="item.ServingRSRQ!=''">
                                            <th width="50%">RSRQ</th>
                                            <td>{{item.ServingRSRQ}}</td>
                                        </tr>
                                        <tr v-if="item.ENBReceivedPower!=''">
                                            <th width="50%">eNBRxPow</th>
                                            <td>{{item.ENBReceivedPower}}</td>
                                        </tr>
                                        <tr v-if="item.ULSINR!=''">
                                            <th width="50%">UL SINR</th>
                                            <td>{{item.ULSINR}}</td>
                                        </tr>


                                    </table>
                                </li>
                            </slider-item>
                        </slider>
                    </ul>
                </dd>
            </dl>
            <dl>
                <dt>对端环境</dt>
                <dd>
                    <div class="layer-bar"></div>
                    <ul  id="slider2"  >
                        <slider width="170px"
                                height="250px"
                                animation="normal"
                                :len="eventData.dest.length"
                                :auto="false"
                                :indicators="false"
                                :interval="1000"
                                :speed="800" v-if="eventData.dest!=''" >
                            <slider-item v-for="(item,index) in eventData.dest">
                                <li>
                                    <table width="100%">

                                        <tr v-show="item.CellID!=''">
                                            <th width="50%">小区</th>
                                            <td>{{item.CellID}}</td>
                                        </tr>
                                        <tr v-show="item.Time!=''">
                                            <th width="50%">时间</th>
                                            <td>{{item.Time}}</td>
                                        </tr>
                                        <tr v-show="item.MrType!=''">
                                            <th width="50%">MR类型</th>
                                            <td>{{item.MrType}}</td>
                                        </tr>
                                        <tr v-show="item.ServingRSRP!=''">
                                            <th width="50%">RSRP</th>
                                            <td>{{item.ServingRSRP}}</td>
                                        </tr>
                                        <tr v-show="item.ServingRSRQ!=''">
                                            <th width="50%">RSRQ</th>
                                            <td>{{item.ServingRSRQ}}</td>
                                        </tr>
                                        <tr v-show="item.ENBReceivedPower!=''">
                                            <th width="50%">eNBRxPow</th>
                                            <td>{{item.ENBReceivedPower}}</td>
                                        </tr>
                                        <tr v-show="item.ULSINR!=''">
                                            <th width="50%">UL SINR</th>
                                            <td>{{item.ULSINR}}</td>
                                        </tr>


                                    </table>
                                </li>
                            </slider-item>
                        </slider>
                    </ul>
                </dd>
            </dl>
            <dl >
                <dt>问题诊断</dt>
                <dd>
                    <div v-nicescroll="niceScrollOption3" class="event-nice-scorll">
                        <table width="100%" >
                            <tr v-show="eventData.cause[0].Event_Type!=''">
                                <th width="40%">问题类型</th>
                                <td>{{eventData.cause[0].Event_Type}}</td>
                            </tr>
                            <tr v-show="eventData.cause[0].Cause_Step!=''">
                                <th width="40%">异常阶段</th>
                                <td>{{eventData.cause[0].Cause_Step}}</td>
                            </tr>
                            <tr v-show="eventData.cause[0].wireless!=''">
                                <th width="40%">无线问题</th>
                                <td>{{eventData.cause[0].wireless}}</td>
                            </tr>
                        </table>
                    </div>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script>
    /**
     * 用户回放时间弹框组件部分
     */
    import 'niceScroll'
   // var base = require('config');
    var niceScroll =  require('../../directives/NiceScroll.js');
    var layer =require('layer');
    //require('../directives/layer/skin/layer.css');
    import Vue from 'vue';
    import  Slider from '../../directives/vue-easy-slider-2.0/src/slider.vue';
    import  SliderItem from '../../directives/vue-easy-slider-2.0/src/slider-item.vue';

    module.exports ={
        created (){
            var that = this;
            var loading_index = layer.load(2);
            //初始化时根据sessionid查询事件详细信息
            that.Api.pb_getSliceDetail(that.eid,that.eline,that.esessionId,that.sessionStartTime,that.sessionEndTime,that.destMsisdn)
                    .then(function(response){
                        if(response.data.status =='success'){
                            that.eventData = response.data.data;
                            console.log('hhh')
                            layer.close(loading_index);
                            that.$nextTick();

                                layer.close(loading_index);
                                layer.open({
                                    offset: '0px',
                                    type: 1,
                                    title: '异常事件',
                                    area:['910px','400px'],
                                    scrollbar:false,
                                    resize:true,
                                    skin: 'demo-class',
                                    content: $('#abnormal'),
                                    cancel:function(index){
                                        that.$parent.isLayerOpen = false;
                                        layer.close(index);
                                    }
                                });

                                if($('#abnormal').hasClass('temphideclass')){
                                    $('#abnormal').removeClass('temphideclass');
                                }




                        }else{
                            console.log('fail')
                            layer.close(loading_index);
                        }
                    },function(){
                        console.log('2')
                        layer.close(loading_index);
                    });
        },

        components: {
            Slider,
            SliderItem
        },
        directives: {
            "nicescroll":niceScroll
        },
        props:{
            eid:"",
            eline:"",
            esessionId:"",
            sessionStartTime:"",
            sessionEndTime:"",
            destMsisdn:""
        },
        computed:{
        },
        data (){
            return{
                myLayerOpen:true,//弹框是否打开状态
                // niceScroll样式配置
                niceScrollOption1:{
                    delaybind:500,
                    styler:'fb',
                    cursorcolor:"#0c151f",
                    background: '#192a3e',
                    cursorwidth: '6',
                    cursorborder:"3px solid rgba(19,88,148,0)",
                    cursorborderradius: '12px',
                    cursoropacitymin :1,
                    spacebarenabled:false,
                    zindex: '9999999999999'
                },
                // niceScroll样式配置
                niceScrollOption2:{
                    delaybind:500,
                    styler:'fb',
                    cursorcolor:"#0c151f",
                    background: '#192a3e',
                    cursorwidth: '6',
                    cursorborder:"3px solid rgba(19,88,148,0)",
                    cursorborderradius: '12px',
                    cursoropacitymin :1,
                    spacebarenabled:false,
                    zindex: '9999999999999'
                },
                // niceScroll样式配置
                niceScrollOption3:{
                    delaybind:500,
                    styler:'fb',
                    cursorcolor:"#0c151f",
                    background: '#192a3e',
                    cursorwidth: '6',
                    cursorborder:"3px solid rgba(19,88,148,0)",
                    cursorborderradius: '12px',
                    cursoropacitymin :1,
                    spacebarenabled:false,
                    zindex: '9999999999999'
                },
                //记录事件数据
                eventData:{
                        event:[{"eventType":"",
                            "slice_start_time":"",
                            "slice_end_time":"",
                            "Slice_Keep_Time":"",
                            "Event_Start_Time":"",
                            "Event_End_Time":"",
                            "Event_Keep_Time":"",
                            "Change_Type":"",
                            "Start_ECI":"",
                            "End_ECI":"",
                            "Seesion_End_Time":"",
                            "Codec_type":"",
                            "Codec_rate":""
                        }],
                        index:[
                            {
                                "KQI_MOS":"",//  						1.	MOS
                                "RTP_Packet_Loss_Num":"",//			2.	RTP丢包数
                                " RTCP_Packet_Loss_Num":"",//		3.	RTCP丢包数
                                "RTP_Consecutive_Lost_Num":"",//		4.	最大连续丢包数
                                "RTP_Max_Interval":"",//				5.	最大中断时长
                                "RTP_Interarrival_jitter":"",// 		6.	RTP包间抖动：
                                "RTCP_InterArrival_Jitter":"",//		7.	RTCP包间抖动：
                                "RTCP_RingDelay":"",//				8.	环路时延：
                                "IntraRAT_HO_Num_Src":"",//			1.	源端系统内切换次数
                                "IntraRAT_HO_Num_Dest":"",//			2.	对端系统内切换次数
                                "Codec_Rate_LastSlice":"",//			1.	调整前速率
                                "Codec_Rate_CurSlice":""//2.	调整后速率
                            }
                        ],
                        src:[],
                        dest:[],
                        cause:[{
                            "Event_Type":"",//		问题类型
                            "Cause_Step":"",//		异常阶段
                            "wireless":""//          无线问题
                        }]

                }
            }
        }
    }
</script>
