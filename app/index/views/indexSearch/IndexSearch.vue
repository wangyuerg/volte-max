<template>
    <div class="content">
        <div class="wid-fixed">
            <div class="index-top">
                <table>
                    <tbody>
                        <tr>
                            <th width="7%">时间粒度</th>
                            <td width="24%" id="day-td">
                                <el-select  v-model="dayValue" placeholder="请选择" class="dark-el border-el" popper-class="dark-el">
                                    <div v-for="item in dayValues">
                                        <el-option
                                                v-if="!item.disable"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </div>
                                </el-select>
                            </td>
                            <th width="7%">开始时间</th>
                            <td width="24%" class="dark-el" id="starttime-td">
                                <el-date-picker
                                                v-model="starttime"
                                                type="datetime"
                                                placeholder=""
                                                format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                            </td>
                            <th width="7%">结束时间</th>
                            <td width="24%" class="dark-el" id="endtime-td">
                                <el-date-picker
                                        v-model="endtime"
                                        type="datetime"
                                        placeholder=""
                                        format="yyyy-MM-dd HH:mm:ss"
                                >
                                </el-date-picker>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>网元类型</th>
                            <td id="netType-td">
                                <el-select v-model="netType" placeholder="请选择" class="dark-el border-el" popper-class="dark-el">
                                    <div v-for="item in netTypes">
                                        <el-option
                                                v-if="!item.disable"
                                                :label="item.label"
                                                :value="item.value"

                                        >
                                        </el-option>
                                    </div>

                                </el-select>
                            </td>
                            <th>网元名称</th>
                            <td id="netName-td">
                                <el-select v-show="netType=='省'" v-model="netName1" multiple placeholder="请选择" class="dark-el border-el" popper-class="dark-el">
                                    <el-option
                                            v-for="item in netNames1"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-show="netType=='地市'" v-model="netName2" multiple placeholder="请选择" class="dark-el border-el" popper-class="dark-el">
                                    <el-option
                                            v-for="item in netNames2"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-show="netType=='设备'" v-model="netName3" multiple placeholder="请选择" class="dark-el border-el" popper-class="dark-el">
                                    <el-option
                                            v-for="item in netNames3"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <xlsx-input v-show="netType=='小区'" style="width:100%" :inputId="xlsxInputId"  :inputStyle="inputStyle"/>
                                <!--<el-select v-show="netType==3" v-model="netName3" multiple placeholder="请选择" class="dark-el border-el" popper-class="dark-el">
                                    <el-option
                                            v-for="item in netNames3"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>-->
                            </td>
                            <th>指标类型</th>
                            <td id="indexType-td">
                                <el-select v-model="indexType" placeholder="请选择" class="dark-el border-el" popper-class="dark-el">
                                    <el-option
                                        v-for="item in indexTypes"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </td>
                            <td id="index-td"><el-button  type="dark-el" @click="popIndexLayer">指标选择</el-button></td>
                        </tr>
                    </tbody>
                </table>
                <div class="index-top-btns">
                    <el-button type="dark-el" icon="search" @click.prevent="search">查&nbsp;&nbsp;询</el-button>
                    <el-button type="dark-el" icon="save" @click.prevent="saveTemplate">保存模板</el-button>
                    <el-button type="dark-el" icon="circle-check" @click.prevent="chooseTemplate">选择模板</el-button>
                    <!--<el-button type="dark-el" icon="upload2" @click.prevent="exportKey">一键导出</el-button>-->
                </div>
            </div>
            <div class="index-mid">
                <div class="index-mid-left">
                    <div id='left'>{{mainTableName}}</div>
                    <div class="triangle_border_left">
                        <span></span>
                    </div>
                </div>

                <div class="index-mid-right">
                    <el-button type="grey-el" icon="save" id="save" @click.prevent="exportTable">保存</el-button>
                </div>
            </div>
            <div class="index-bottom">
                <div class="index-search-table">
                    <table>
                        <thead>
                        <tr>
                            <th class="table-header" v-for="(item,index) in mainTableHead">{{item}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-if="mainTableBody.length<=0">
                            <td class="table-body-item" :colspan="mainTableHead.length">暂无数据</td></tr>
                        <tr v-if="mainTableBody.length>0" v-for="row in mainTableBody" >
                            <td class="table-body-item" v-for="i in row">
                                <span>{{i}}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="dark-el block">
                    <el-pagination  style="float:right;padding-top:10px" v-show="commTotalSize>0"
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="commCurrentPage"
                                    :page-sizes="[10,20,40]"
                                    :page-size="commPageSize"
                                    layout="sizes, prev, pager, next"
                                    :total="commTotalSize">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!-- 选择模板弹框 -->
        <div  style="display: none" id="choosetp-layer">
            <div class="chtp-div">
                模板名称 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-select v-model="template" placeholder="请选择模板名称" class="dark-el" popper-class="my-down dark-el">
                    <el-option
                            v-for="item in templates"
                            :label="item.templateName"
                            :value="item.id">
                        <span style="float: left">{{ item.templateName }}</span>
                        <span style="float: right;" > <i class="el-icon-delete" @click.stop.prevent.self="deleteTemplate(item.id)"></i>&nbsp;&nbsp;&nbsp;&nbsp;</span>

                    </el-option>
                </el-select>

            </div>
        </div>
        <!-- 保存模板弹框 -->
        <div  style="display: none" id="savetp-layer">
            <div class="chtp-div">
                模板名称 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <el-input v-model="sTemplate" class="dark-el wid80" popper-class="dark-el" placeholder="请输入模板名称"></el-input>
            </div>
        </div>
        <!-- 指标选择弹框-->
        <div style="display: none" id="index-layer">
            <form method="" >
                <div class="layer-pd">
                    <div class="layer-box-t">
                        <div class="tit">总体指标</div>
                        <div class="check-box">
                            <input id="checkall0" type="checkbox" @click="fullClick(0)">
                            <label for="checkall0">全选</label>
                        </div>
                    </div>
                    <div class="layer-box-c" id="checkall0-area">
                        <ul class="clearfix">
                            <li v-for="(item, index) in tableHead" v-if="item.type==1">
                                <div class="check-box">
                                    <input :id="item.field" type="checkbox" class="myinput" :checked="item.check">
                                    <label :for="item.field">{{item.title}}</label>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div class="layer-box mt20" id="layer-zlzb">
                        <div class="layer-box-t">
                            <div class="tit">RTP指标</div>
                            <div class="check-box">
                                <input id="checkall1" type="checkbox" @click="fullClick(1)">
                                <label for="checkall1">全选</label>
                            </div>
                        </div>
                        <div class="layer-box-c" id="checkall1-area">
                            <ul class="clearfix">
                                <li v-for="(item, index) in tableHead" v-if="item.type==2">
                                    <div class="check-box">
                                        <input :id="item.field" type="checkbox" class="myinput" :checked="item.check">
                                        <label :for="item.field">{{item.title}}</label>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="layer-box mt20" id="layer-3">
                        <div class="layer-box-t">
                            <div class="tit">事件指标</div>
                            <div class="check-box">
                                <input id="checkall2" type="checkbox" @click="fullClick(2)">
                                <label for="checkall2">全选</label>
                            </div>
                        </div>
                        <div class="layer-box-c" id="checkall2-area">
                            <ul class="clearfix">
                                <li v-for="(item, index) in tableHead" v-if="item.type==3">
                                    <div class="check-box">
                                        <input :id="item.field" type="checkbox" class="myinput" :checked="item.check">
                                        <label :for="item.field">{{item.title}}</label>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <!--导出区域容器-->
        <div id="export-container">
            <table>
                <thead>
                    <tr>
                        <th v-for="item in exportTableHead">
                            {{item}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in exportTableBody">
                        <th v-for="i in row">{{i}}</th>
                    </tr>
                </tbody>

            </table>
        </div>
    </div>
</template>
<script>
    import '../../util.js'
    var base = require('config');
    var niceScroll =  require('../../directives/NiceScroll.js');
    var stickySort = require('../../directives/stickySort.js');
    var layer = require('layer');
    require('../../directives/export/tableExport.js');
    import xlsxInput from '../util/xlsx.vue'
    require('gui');

    var currentUser = null;
    export default{
        created:function(){
            //初始化
            var that =this;
            currentUser = base.getCurrentUser();
            setTimeout(function(){
                window.ued.init();
                window.ued.initCheck();
            },0);
            //获取模板信息
            that.Api.is_get_template(currentUser.userName)
                    .then(function(response){
                        if(response.data.status ==='success'){
                            that.templates = response.data.data;
                        }
                    })

        },
        directives: {
            "stickysort":stickySort,
            "nicescroll":niceScroll
        },
        components:{
            'xlsxInput':xlsxInput
        },
        data(){
            return{
                //导入按钮ID
                xlsxInputId:'xlsx-input',
                //导入按钮样式
                inputStyle:{border:0,width:'100px'},
                //stickySort组件属性设置
                stickySortOption:{
                    isFirst:'ready',
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
                //时间粒度值
                dayValue:'',
                //时间粒度范围
                dayValues:[
                {
                    value: '15分钟',
                    label: '15分钟',
                    disable:false
                }, {
                    value: '小时',
                    label: '小时',
                    disable:false
                }, {
                    value: '天',
                    label: '天',
                    disable:false
                }],
                //开始时间
                starttime:'',
                //结束时间
                endtime:'',
                //网元类型值
                netType:'省',
                //网元类型范围
                netTypes:[
                {
                    value: '省',
                    label: '省',
                    disable:false
                }, {
                    value: '地市',
                    label: '地市',
                    disable:false
                }, {
                    value: '设备',
                    label: '设备',
                    disable:false
                },{
                    value: '小区',
                    label: '小区',
                    disable:false
                }],
                //网元1：省值
                netName1:['浙江'],
                //网元1：省范围
                netNames1:[
                    {
                        value: '浙江',
                        label: '浙江'
                    }
                ],
                //网元2：地市值，
                netName2:[],
                //网元2：地市范围
                netNames2:[
                    {value: '杭州', label: '杭州',code:'0571'},
                    {value: '湖州', label: '湖州',code:'0572'},
                    {value: '嘉兴', label: '嘉兴',code:'0573'},
                    {value: '金华', label: '金华',code:'0579'},
                    {value: '丽水', label: '丽水',code:'0578'},
                    {value: '宁波', label: '宁波',code:'0574'},
                    {value: '绍兴', label: '绍兴',code:'0575'},
                    {value: '台州', label: '台州',code:'0576'},
                    {value: '温州', label: '温州',code:'0577'},
                    {value: '舟山', label: '舟山',code:'0580'},
                    {value: '衢州', label: '衢州',code:'0570'}
                ],
                //网元3：设备值
                netName3:[],
                //网元3：设备范围
                netNames3:[
                    {value:'HZPSBC01',label:'HZPSBC01'},
                    {value:'HZPSBC02',label:'HZPSBC02'},
                    {value:'HZPSBC03',label:'HZPSBC03'},
                    {value:'HZPSBC04',label:'HZPSBC04'},
                    {value:'HZPSBC09',label:'HZPSBC09'},
                    {value:'HZPSBC10',label:'HZPSBC10'},
                    {value:'HZPSBC11',label:'HZPSBC11'},
                    {value:'HZPSBC12',label:'HZPSBC12'},
                    {value:'HZPSBC13',label:'HZPSBC13'},
                    {value:'HZPSBC14',label:'HZPSBC14'},
                    {value:'HZISBC04',label:'HZISBC04'},
                    {value:'HZISBC05',label:'HZISBC05'},
                    {value:'HZISBC06',label:'HZISBC06'},
                    {value:'HZISBC07',label:'HZISBC07'},
                    {value:'HZISBC08',label:'HZISBC08'},
                    {value:'HZISBC09',label:'HZISBC09'},
                    {value:'HZISBC10',label:'HZISBC10'},
                    {value:'HZISBC11',label:'HZISBC11'},
                    {value:'HZISBC12',label:'HZISBC12'},
                    {value:'HZISBC13',label:'HZISBC13'}
                ],
                //指标类型值
                indexType:'',
                //指标类型范围
                indexTypes:[
                {
                    value: '全部',
                    label: '全部'
                }, {
                    value: 'VoLTE-VoLTE',
                    label: 'VoLTE-VoLTE'
                }, {
                    value: 'VoLTE-GSM/TDS',
                    label: 'VoLTE-GSM/TDS'
                }],
                //模板值
                template:'',
                //模板范围
                templates:[],
                //指标范围
                tableHead:[
                    {field:'Session_ID_Count',title:'通话数',width:80,type:1,check:false},
                    {field:'Session_Keep_Time',title:'通话时长',width:100,type:1,check:false},
                    {field:'Worse_Quality_Count',title:'质差通话数',width:120,type:1,check:false},
                    {field:'Worse_Quality_Time',title:'质差通话时长',width:140,type:1,check:false},
                    {field:'Single_Pass_Num',title:'单通次数',width:100,type:1,check:false},
                    {field:'KQI_MOS',title:'MOS',width:80,type:1,check:false},
                    {field:'Worse_Quality_Time_Rate',title:'质差时长占比',width:140,type:1,check:false},
                    {field:'Worse_Quality_Count_Rate',title:'质差通话占比',width:140,type:1,check:false},
                    {field:'Single_Pass_Num_Rate',title:'单通率',width:80,type:1,check:false},
                    {field:'KQI_MOS_Rate',title:'MOS分低的通话占比',width:180,type:1,check:false},

                    {field:'RTP_Packet_Num',title:'RTP总包数',width:120,type:2,check:false},
                    {field:'RTP_Packet_Loss_Num',title:'RTP丢包数',width:120,type:2,check:false},
                    {field:'RTP_Packet_Loss_Num_Rate',title:'RTP丢包率',width:120,type:2,check:false},
                    {field:'RTP_Interarrival_jitter',title:'RTP抖动',width:100,type:2,check:false},
                    {field:'RTCP_Expect_Packet_Num',title:'RTCP总包数',width:120,type:2,check:false},
                    {field:'RTCP_Packet_Loss_Num',title:'RTCP丢包数',width:120,type:2,check:false},
                    {field:'RTCP_Packet_Loss_Num_Rate',title:'RTCP丢包率',width:120,type:2,check:false},
                    {field:'RTCP_InterArrivalJitter',title:'RTCP抖动',width:100,type:2,check:false},
                    {field:'RTCP_RingDelay',title:'RTCP环路时延',width:120,type:2,check:false},

                    {field:'KQI_Worse_MOS_time',title:'MOS分低时长',width:120,type:3,check:false},
                    {field:'KQI_Loss_Word_time',title:'吞字时长',width:100,type:3,check:false},
                    {field:'KQI_Intermittently_time',title:'断续时长',width:100,type:3,check:false},
                    {field:'KQI_Delay_time',title:'时延时长',width:100,type:3,check:false},
                    {field:'KQI_Single_Pass_time',title:'单通时长',width:120,type:3,check:false},
                    {field:'KQI_TC_Num',title:'TC次数',width:120,type:3,check:false}/*,
                    {field:'q',title:'掉话次数',width:120,type:3,check:false}*/
                ],
                //保存模板值
                sTemplate:'',
                //查询条件缓存
                searchConditionCash:null,
                //表格表头
                mainTableHead:[''],
                //表格记录
                mainTableBody:[],
                //表格名
                mainTableName:'',
                //导出表格表头
                exportTableHead:[],
                //导出表格记录
                exportTableBody:[],
                //表格记录
                tableBody:[],
                //分页总条数
                commTotalSize:0,
                //分页当前页数
                commCurrentPage: 1,
                //分页每页记录数
                commPageSize:10
            }
        },
        methods:{
            //指标选择弹框方法
            popIndexLayer(){
                var that =this;
                var cashIndexs = that.tableHead;
                //更加tableHead中数据初始化勾选
                for(var i = 0 ; i <that.tableHead.length;i++){
                    if(that.tableHead[i].check){
                        $('#'+that.tableHead[i].field).iCheck('check');
                    }else {
                        $('#' + that.tableHead[i].field).iCheck('uncheck');
                    }
                }
                layer.open({
                    type: 1,
                    title: '指标选择',
                    area:['960px','600px'],
                    scrollbar:true,
                    resize:true,
                    skin: 'demo-class',
                    content: $('#index-layer'),
                    btn:['确定','取消'],
                    yes:function(index){
                        //获取勾选指标ID
                        var _checked = [];
                        $('#index-layer').find('.myinput').each(function(){
                            if($(this).parent().hasClass('checked')){
                                _checked.push($(this).attr('id'));
                            }
                        });
                        //将勾选的指标同步到tableHead中
                        for(var i = 0 ; i <that.tableHead.length; i ++){
                            var _flag = false;
                            for(var j = 0 ; j < _checked.length;j++){
                                if(_checked[j] === that.tableHead[i].field){
                                    _flag = true;
                                }
                            }
                            if(_flag){
                                that.tableHead[i].check = true;
                            }else{
                                that.tableHead[i].check = false;
                            }
                        }
                        layer.close(index);
                    },
                    btn2:function(index){
                        that.tableHead = cashIndexs;
                        layer.close(index);
                    },
                    cancel: function(index){
                        that.tableHead = cashIndexs;
                        layer.close(index);
                    }
                });
            },
            //选择模板点击方法
            chooseTemplate(){
                var that = this;
                layer.open({
                    type: 1,
                    title: '选择模板',
                    area:['450px','200px'],
                    scrollbar:true,
                    zIndex:1100,
                    resize:false,
                    skin: 'demo-class',
                    content: $('#choosetp-layer'),
                    btn:['确定','取消'],
                    yes:function(index){
                        if(that.template==undefined || that.template ==''){
                            that.$message({
                                message: '请选择模板',
                                type: 'warning'
                            });
                        }else{
                            that.recoverTemplate(that.template);
                            layer.close(index);
                        }

                    },
                    btn2:function(index){
                        layer.close(index);
                    },
                    cancel: function(index){
                        layer.close(index);
                    }
                });
            },
            //恢复选择的模板（点击模板时，将值render到页面组件上）
            recoverTemplate(id){
                var that = this;
                var c_template = null;
                for(var i = 0 ; i <that.templates.length;i++){
                    if(id == that.templates[i].id){
                        c_template = that.templates[i].sqlJson;
                        break;
                    }
                }

                if(c_template!=null){
                    that.dayValue = c_template.timeType;
                    that.starttime = new Date(c_template.startTime);
                    that.endtime = new Date(c_template.endTime);
                    that.netType = c_template.networkType;
                    if(that.dayValue ==='15分钟'){
                        that.netTypes[3].disable = true;
                    }else{
                        that.netTypes[3].disable = false;
                    }

                    if(that.netType ==='小区'){
                        that.dayValues[0].disable = true;
                    }else{
                        that.dayValues[0].disable = false;
                    }
                    //根据网元类型不同，赋值不同网元变量
                    switch(that.netType){
                        case '省':
                            that.netName1 = c_template.networkName;
                            that.netName2 = [];
                            that.netName3 =[];
                            that.$root.eventHub.$emit('xlsxInputValue', {
                                type:'set',
                                data: ''
                            });
                            break;
                        case '地市':
                            that.netName1 = [];
                            that.netName2 = c_template.networkName;
                            that.netName3 =[];
                            that.$root.eventHub.$emit('xlsxInputValue', {
                                type:'set',
                                data: ''
                            });
                            break;
                        case '设备':
                            that.netName1 = [];
                            that.netName2 = [];
                            that.netName3 =c_template.networkName;
                            that.$root.eventHub.$emit('xlsxInputValue', {
                                type:'set',
                                data: ''
                            });
                            break;
                        case '小区':
                            that.netName1 = [];
                            that.netName2 = [];
                            that.netName3 =[];
                            that.$root.eventHub.$emit('xlsxInputValue', {
                                type:'set',
                                data: c_template.networkName.join(',')
                            });
                            break;
                    }
                    that.indexType = c_template.indexType;
                    //指标tablehead参数赋值
                    for(var i = 0 ; i <that.tableHead.length;i++){
                        var _flag = false;
                        for(var j = 0 ; j <c_template.indexName.length;j++){
                            if(that.tableHead[i].field == c_template.indexName[j]){
                                _flag =true;
                            }
                        }
                        if(_flag){
                            $('#'+that.tableHead[i].field).iCheck('check');
                            that.tableHead[i].check = true;
                        }else{
                            $('#'+that.tableHead[i].field).iCheck('uncheck');
                            that.tableHead[i].check = false;
                        }
                    }


                }
            },
            //保存模板点击方法
            saveTemplate(){
                var that = this;
                if(!that.checkVaild(true))return;
                layer.open({
                    type: 1,
                    title: '保存模板',
                    area:['450px','200px'],
                    scrollbar:true,
                    zIndex:2000,
                    resize:false,
                    skin: 'demo-class',
                    content: $('#savetp-layer'),
                    btn:['确定','取消'],
                    yes:function(index){
                        var postData = JSON.stringify(that.getSelection());
                        if(that.sTemplate.trim() == ''){
                            that.$message({
                                message: '请填写模板名',
                                type: 'warning'
                            });
                            return;
                        }
                        that.Api.is_add_template(currentUser.userName,that.sTemplate,postData)
                                .then(function(response){
                                    if(response.data.status === 'success'){
                                        that.$message({
                                            message: '模板【'+that.sTemplate+'】添加成功',
                                            type: 'success'
                                        });
                                        that.templates.push(response.data.data);
                                        layer.close(index);
                                    }else{
                                        that.$message({
                                            message: response.data.msg,
                                            type: 'warning'
                                        });
                                    }
                                },function(e){
                                    console.log(e)
                                })

                    },
                    btn2:function(index){
                        layer.close(index);
                    },
                    cancel: function(index){
                        layer.close(index);
                    }
                });
            },
            //检验用户所选有效性，参数isCheckIndex为true时检验指标是否选择
            checkVaild(isCheckIndex){
                var that = this;
                var _flag = true;
                if(that.dayValue === ''){
                    layer.tips('请选择时间粒度','#day-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                    _flag = false;
                }
                if(that.starttime ==='' || !(that.starttime instanceof Date)){
                    layer.tips('请选择开始时间','#starttime-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                    _flag = false;
                }
                if(that.endtime ==='' || !(that.endtime instanceof Date)){
                    layer.tips('请选择结束时间','#endtime-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                    _flag = false;
                }
                if(new Date(that.starttime).getTime()>new Date(that.endtime).getTime()){
                    layer.tips('开始时间应不超过结束时间','#starttime-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                    _flag = false;
                    return;
                }
                switch (that.netType){
                    case '省':
                        if(that.netName1.length<=0){
                            layer.tips('请选择网元名称','#netName-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                            _flag = false;
                        }
                        break;
                    case '地市':
                        if(that.netName2.length<=0){
                            layer.tips('请选择网元名称','#netName-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                            _flag = false;
                        }
                        break;
                    case '设备':
                        if(that.netName3.length<=0){
                            layer.tips('请选择网元名称','#netName-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                            _flag = false;
                        }
                        break;
                    case '小区':
                        if($('#'+that.xlsxInputId).find('input').val()==null ||$('#'+that.xlsxInputId).find('input').val()==''){
                            layer.tips('请输入网元名称','#netName-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                            _flag = false;
                        }
                        break;
                }
                if(that.indexType ===''){
                    layer.tips('请选择指标类型','#indexType-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                    _flag = false;
                }
                var _iflag = false;
                if(isCheckIndex){
                    for(var i = 0 ; i <that.tableHead.length;i++){
                        if(that.tableHead[i].check){
                            _iflag = true;
                        }
                    }
                    if(!_iflag){
                        layer.tips('指标至少选择一个','#index-td',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                    }
                }else{
                    _iflag = true;
                }


                if(!_flag||!_iflag){
                    return false;
                }else{
                    return true;
                }
            },
            // 获取用户所选
            getSelection(){
                var that = this;
                var _json = {
                      "timeType":"",
                      "startTime":"",
                      "endTime":"",
                      "networkType":"",
                      "networkName":[],
                      "indexType":"",
                      "indexName":[]
                };
                _json.timeType = that.dayValue;
                _json.startTime = that.starttime instanceof Date?that.starttime.format('yyyy-MM-dd HH:mm:ss'):'';
                _json.endTime = that.endtime instanceof Date?that.endtime.format('yyyy-MM-dd HH:mm:ss'):'';
                _json.networkType = that.netType;
                switch (that.netType){
                    case '省':
                        _json.networkName = that.netName1;
                        break;
                    case '地市':
                        _json.networkName = that.netName2;
                        break;
                    case '设备':
                        _json.networkName = that.netName3;
                        break;
                    case '小区':
                        _json.networkName = $.map($('#'+that.xlsxInputId).find('input').val().split(','),function(item){return item.trim()==''?null:item;})
                        break;
                }
                _json.indexType = that.indexType;
                for(var i = 0 ; i <that.tableHead.length;i++){
                    if(that.tableHead[i].check){
                        _json.indexName.push(that.tableHead[i].field);
                    }
                }
                return _json;
            },
            //删除模板
            deleteTemplate(id){
                var that = this;
                that.Api.is_del_template([parseInt(id)])
                        .then(function(response){
                            if(response.data.status === 'success'){
                                for(var i = 0 ; i <that.templates.length;i++){
                                    if(id === that.templates[i].id){
                                        that.templates.splice(i, 1);
                                    }
                                }
                                that.$message({
                                    message: '删除模板成功',
                                    type: 'success'
                                });
                            }else{
                                that.$message({
                                    message: '删除模板失败',
                                    type: 'warning'
                                });
                            }
                        });

            },
            //全选框点击方法，参数t区分是哪个全选框
            fullClick(t){
                var $full = $('#checkall'+t);

                if($full.is(':checked')) {
                    $('#checkall'+t+'-area').find('.myinput').iCheck('check');
                }else{
                    $('#checkall'+t+'-area').find('.myinput').iCheck('uncheck');
                }
            },
            //一键导出点击方法
            exportKey(){
                var _flag = this.checkVaild(false);
                if(!_flag)return;
                var _p = this.getSelection();

                _p.indexName=[];
                try{
                    var elemIF = document.createElement("iframe");
                    elemIF.src =  base.serviceUrl+'/export/key/info/'+encodeURI(JSON.stringify(_p))+'/'+base.defaultHeader()['x-token'];
                    elemIF.style.display = "none";
                    document.body.appendChild(elemIF);
                }catch(e){

                }

            },
            //查询点击方法
            search(){
                var that = this;
                var _flag = that.checkVaild(true);
                if(!_flag)return;
                var _p = that.getSelection();
                that.searchConditionCash = _p;
                that.Api.is_search(that.commCurrentPage,that.commPageSize,JSON.stringify(_p))
                        .then(function(response){
                            if(response.data.status === 'success'){
                                that.mainTableHead = response.data.data.result.header;
                                that.mainTableBody = response.data.data.result.content;
                                that.mainTableName = response.data.data.table_name;
                                that.commTotalSize = response.data.data.count;
                            } else if (response.data.status === 'fail') {
                                that.$notify.error({
                                    title:'错误',
                                    message:response.data.msg
                                });
                            }
                        })

            },
            //页数大小切换方法
            handleSizeChange(val) {
                var that = this;
                this.commPageSize = val;

                that.Api.is_search(that.commCurrentPage,that.commPageSize,JSON.stringify(that.searchConditionCash))
                        .then(function(response){
                            if(response.data.status === 'success'){
                                that.mainTableHead = response.data.data.result.header;
                                that.mainTableBody = response.data.data.result.content;
                                that.mainTableName = response.data.data.table_name;
                                that.commTotalSize = response.data.data.count;
                                $('.index-bottom').find('.sticky-wrap').getNiceScroll().resize();
                            }
                        })
            },
            //页数变化回调方法
            handleCurrentChange(val) {
                var that = this;
                this.commCurrentPage = val;
                that.Api.is_search(that.commCurrentPage,that.commPageSize,JSON.stringify(that.searchConditionCash))
                        .then(function(response){
                            if(response.data.status === 'success'){
                                that.mainTableHead = response.data.data.result.header;
                                that.mainTableBody = response.data.data.result.content;
                                that.mainTableName = response.data.data.table_name;
                                that.commTotalSize = response.data.data.count;
                                $('.index-bottom').find('.sticky-wrap').getNiceScroll().resize();
                            }
                        })
            },
            //表格导出方法
            exportTable(){
                var that = this;
               if(that.commTotalSize<=0){
                   layer.tips('无数据可以保存','#save',{skin:'tip-class',tips:3,time:2500,tipsMore:true});
                   return;
               }
                var _p = that.getSelection();
                that.Api.is_search_export(that.commCurrentPage,that.commTotalSize,JSON.stringify(_p))
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
            }
        },
        watch:{
            dayValue:{
                handler:function(curVal,oldVal){
                    if(curVal ==='15分钟'){
                        this.netTypes[3].disable = true;
                    }else{
                        this.netTypes[3].disable = false;
                    }
                },
                deep:true
            },
            netType:{
                handler:function(curVal,oldVal){
                    if(curVal ==='小区'){
                        this.dayValues[0].disable = true;
                    }else{
                        this.dayValues[0].disable = false;
                    }
                },
                deep:true
            },
            mainTableHead:{
                handler:function(curVal,oldVal){
                    setTimeout(function(){
                        $('.index-bottom .result-table .sticky-thead thead tr').eq(0).empty()
                                .append(
                                        $('.index-bottom .result-table .sticky-wrap thead tr').eq(0).html()
                                );
                        $('.index-bottom .result-table .sticky-wrap thead tr th').each(function(index){
                            $('.index-bottom .result-table .sticky-thead thead tr th').eq(index).css('width',$(this).css('width'))
                        });
                    },0);


                },
                deep:true
            }
        }
    }
</script>
<style>
    .index-bottom .result-table .sticky-wrap{
        /*height:600px*/
    }
</style>
<style scoped>
    .content{
        height:950px!important;
    }
    @media screen and  (max-height:600px){
        .content{
            height:670px;
        }
    }
    @media screen and (min-height:601px) and  (max-height:610px){
        .content{
            height:535px;
        }
    }
    @media screen and (min-height:611px) and  (max-height:620px){
        .content{
            height:545px;
        }
    }
    @media screen and (min-height:621px) and  (max-height:630px){
        .content{
            height:555px;
        }
    }
    @media screen and (min-height:631px) and  (max-height:640px){
        .content{
            height:565px;
        }
    }
    @media screen and (min-height:641px) and  (max-height:650px){
        .content{
            height:575px;
        }
    }
    @media screen and (min-height:651px) and  (max-height:660px){
        .content{
            height:585px;
        }
    }
    @media screen and (min-height:661px) and  (max-height:670px){
        .content{
            height:595px;
        }
    }
    @media screen and (min-height:671px) and  (max-height:680px){
        .content{
            height:605px;
        }
    }
    @media screen and (min-height:681px) and  (max-height:690px){
        .content{
            height:615px;
        }
    }
    @media screen and (min-height:691px) and  (max-height:700px){
        .content{
            height:625px;
        }
    }
    @media screen and (min-height:701px) and  (max-height:710px){
        .content{
            height:635px;
        }
    }
    @media screen and (min-height:711px) and  (max-height:720px){
        .content{
            height:645px;
        }
    }
    @media screen and (min-height:721px) and  (max-height:730px){
        .content{
            height:655px;
        }
    }
    @media screen and (min-height:731px) and  (max-height:740px){
        .content{
            height:665px;
        }
    }
    @media screen and (min-height:741px) and  (max-height:750px){
        .content{
            height:675px;
        }
    }
    @media screen and (min-height:751px) and  (max-height:760px){
        .content{
            height:685px;
        }
    }
    @media screen and (min-height:761px) and  (max-height:768px){
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
    .result-table{
        height:600px;
    }
    .wid80{
        width:80%;
    }
    .dark-el .el-date-editor.el-input{
        width:100%;
        border:1px #465768 solid;
    }

    .wid-fixed{
        height:100%;
        margin: auto;
    }
    .index-top{
        padding-top:16px;
        height:200px;
        background-color: #192f46;
    }
   .index-top table{
       width:98%;
       padding-top: 20px;
   }
   .index-top tr{
       height:40px;

   }
    .index-top th{
        color:#85939f;
        text-align: center;
        padding: 5px;
    }
   .index-top td{
       color:#85939f;
       padding: 5px;
   }
   .index-top table input{
       color:#85939f;
        width:100%
   }
   .index-top-btns{
       padding-top:20px ;
       width: 98%;
       margin: auto;
       text-align: center;
   }
   .index-mid{
       padding: 0;
       margin: 24px 0 0 0;
       height:36px;
   }
    .index-mid div{
        padding: 0;
        margin:0;
    }
    .index-mid-left{
        display: inline-block;
        position: absolute;
    }
    /*.index-mid-left::after {
        content:'';
        width: 0;
        height: 0;
        border-top: 18px solid  #17a25f;
        border-right: 8px solid transparent;
        border-bottom: 18px solid  #17a25f;
        border-left:18px solid #17a25f;
        display: inline-block;
        position: absolute;
        z-index:2
    }*/


    #left{
        color:#fff;
        font-weight: bolder;
        width: 500px;
        height: 36px;
        line-height: 36px;
        text-indent: 10px;
        background:  #17a25f;
        display: inline-block;
        margin: 0;
        border:0
    }
    /*向左*/
    .triangle_border_left{
        border:0;
        width:10px;
        height:36px;
        background: #17a25f;
        display: inline-block;
        position:absolute;
        margin: 0;
        padding: 0;
        top:0;
        left:490px;
    }
    .triangle_border_left span{
        display:block;
        width:0;
        height:0;
        border-width:18px 10px 18px 0;
        border-style:solid;
        border-color:transparent #181819 transparent transparent;/*透明 黄 透明 透明 */
        position:absolute;
        left:1px;

    }
    .index-mid-right{
        display: inline-block;
        width: 28%;
        text-align: right;
        position: absolute;
        right:40px;
    }
   .index-bottom{
        height: 600px;
       background-color: #181819;
   }

    .el-button--grey-el{
        background: #303030;
        color:#e6e7e8;
        border: 0;
        height:28px;
        border-radius: 12px;
        width: 70px;
        padding:6px 12px;
    }
    .el-button--grey-el:hover{
        background:#17a35e;
        color:#fff;
    }

   /* .result-table table{
        table-layout:fixed;
    }*/

    .layer-box-c li{
      width: 20%;
        line-height: 38px;
    }
    .layer-box-t{
        height:34px;
    }
    #choosetp-layer{
        height:100%;
    }
    .chtp-div{
        color:#fff;
        width: 88%;
        height:100%;
        vertical-align: middle;
        padding: 24px 0 24px 0;
        margin: auto;
    }
    .layer-box-t .check-box{
        width:55px;
    }
    .chtp-div .dark-el.el-select{
        width:290px;
    }
    #export-container{
        position: absolute;
        top:-10000px;
        z-index:-1;
    }

</style>
<style>
    .my-down.el-select-dropdown{
        width:290px;
    }
    .dark-el .el-select__tags{
        height:30px;
        overflow: hidden;
    }
    .dark-el .el-tag .el-icon-close{
        display: none;
    }

</style>