<template>
    <!--鉴权弹出框 -->
    <div id="search-limit-area" class="ur-sl">
        <div class="layer-pd">
            <transition name="fadeLeft">
            <!--鉴权方式 -->
            <div v-show="section == 'MODE_PICK'" class="ur-sl-section" name="MODE_PICK">
                <div class="ur-sl-section__main">
                    <el-row class="section-one">
                        <el-col :span="12">
                            <el-radio class="radio dark-el" v-model="mode.type" label="1">工单鉴权</el-radio>
                        </el-col>
                        <el-col :span="12">
                            <el-radio class="radio dark-el" v-model="mode.type" label="2">短信授权</el-radio>
                        </el-col>
                    </el-row>
                </div>
                <div class="ur-sl-section__foot">
                    <a class="ur-sl-section__foot--button btn-green" @click="toSecondSection">确定</a>
                    <a class="ur-sl-section__foot--button" @click="cancelLayer">关闭</a>
                </div>
            </div>
            </transition>
            <transition name="fadeRight">
            <!--工单鉴权 -->
            <div v-show="section == 'ORDER_CHECK'" class="ur-sl-section" name="ORDER_CHECK">
                <div class="ur-sl-section__main">
                    <el-row class="section-two">
                        <el-col :span="6" class="text-center">
                            工单号
                        </el-col>
                        <el-col :span="18">
                            <el-input class="dark-el" v-model.trim="orderCheck.sheetNo"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="ur-sl-section__foot">
                    <a class="ur-sl-section__foot--button btn-green" @click="submitAndOrder">确定</a>
                    <a class="ur-sl-section__foot--button" @click="cancelLayer">关闭</a>
                </div>
            </div>
            </transition>
            <transition name="fadeRight">
            <!--短信授权 -->
            <div v-show="section == 'MAIL_CHECK'" class="ur-sl-section" name="MAIL_CHECK">
                <div class="ur-sl-section__main section-three">
                    <el-row >
                        <el-col :span="8" >
                             用户名：
                        </el-col>
                        <el-col :span="16">
                            <el-input class="dark-el" readonly v-model="mailCheck.userName"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" >
                            审批人姓名：
                        </el-col>
                        <el-col :span="16">
                            <el-select  v-model="mailCheck.approverName"  placeholder="请选择" class="dark-el border-el" popper-class="dark-el ur-sl-select"
                                @change="selectChange">
                                <el-option
                                        v-for="item in approvers"
                                        :label="item.auditorNameCn"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" >
                            审批人移动电话：
                        </el-col>
                        <el-col :span="16">
                            <el-input class="dark-el" v-model="mailCheck.mobileNo" readonly></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" >
                            操作原因：
                        </el-col>
                        <el-col :span="16">
                            <el-input class="dark-el" v-model.trim="mailCheck.operationCause"></el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="ur-sl-section__foot">
                    <a class="ur-sl-section__foot--button btn-green" :class="{'timer-running':timer.positive}" @click="submitAndMessage" >{{timer.positive?'（'+ timer.number +'S）':'发送短信'}}</a>
                    <a class="ur-sl-section__foot--button" @click="cancelLayer">关闭</a>
                </div>
            </div>
            </transition>
        </div>
    </div>
</template>
<script>
    import layer from 'layer';
    import Vue from 'vue';
    import base from 'config';

    export default{
        created(){
           var that = this;
            that.Api.getApprovers({auditorNameCn:''})
                    .then(function(response){
                        if(response.data.status == 'success'){
                            that.approvers =  response.data.data;
                        }
                    });
        },
        props:{
            keyword:'',
            isOpen:null
        },
        data(){
            return{
               layerIndex:null,
                section:'MODE_PICK',
                sections:{
                    MODE_PICK:'鉴权方式',
                    ORDER_CHECK:'工单鉴权',
                    MAIL_CHECK:'短信授权'
                },
                mode:{
                    type:"1"
                },
                orderCheck:{
                    sheetNo:''
                },
                mailCheck:{
                    userName:'',
                    approverName:'',
                    operationCause:'',
                    mobileNo:''
                },
                timer:{
                  number:60,
                  positive:false,
                  instance:null
                },
                approvers:[]
            }
        },

        methods:{
            //开启短信计时
            startTimer(time){
                var that = this;
                that.timer.number = time || 60;
                that.timer.instance = setInterval(function(){
                    that.timer.number --;
                    if(that.timer.number<=0){
                        that.stopTimer();
                    }
                },1000);
                that.timer.positive = true;
            },
            //关闭短信计时
            stopTimer(){
                var that = this;
                if(that.timer.instance){
                    clearInterval(that.timer.instance);
                    that.timer.instance = null;
                }
                that.timer.number = 0;
                that.timer.positive = false;

            },
            //选择完鉴权方式后，切换到订单鉴权/短信授权
            toSecondSection(){
                var that = this;
                that.section = that.mode.type =='1' ? 'ORDER_CHECK': 'MAIL_CHECK';
            },
            //下拉框change事件
            selectChange(value){
                var that = this;
               if(value == '' || value == null) return;
                var $selected = $.map(that.approvers,function(item){
                    return item.id == value?item :null;
                })[0];
                that.mailCheck.mobileNo =  $selected.auditorMobile;

            },
            //点击确定，发起工单鉴权
            submitAndOrder(){
                var that = this;
                //有效性验证
                var $warns = [];
                if(that.orderCheck.sheetNo.length<=0){
                    $warns.push('请填写工单号');
                }
                if($warns.length>0){
                    that.$message({
                        showClose: true,
                        message: $warns.join(';')+'。',
                        type: 'warning'
                    });
                    return;
                }

                var loading_index = layer.load(2);
                that.Api.pb_orderAuth({
                            phoneNo:that.keyword,
                            sheetNo:that.orderCheck.sheetNo
                        })
                        .then(function(response){
                            layer.close(loading_index);
                            that.$message({
                                showClose: true,
                                message: response.data.msg,
                                type: 'success'
                            });
                            that.$parent.search();
                            that.cancelLayer();
                        },function(response){
                            layer.close(loading_index);
                            that.$message({
                                        showClose: true,
                                        message: response.data.msg,
                                        type: 'warning'
                                    });
                        });

            },
            //点击确定，发送短信验证
            submitAndMessage(){
                var that = this;
                //当短信定时器运行时，无法发送
                if(that.timer.positive) return;
                //有效性验证
                var $warns = [];
                if(!that.mailCheck.approverName){
                    $warns.push('请选择审批人');
                }
                if(that.mailCheck.operationCause.length<=0){
                    $warns.push('请填写操作原因');
                }else if(that.mailCheck.operationCause.length>20){
                    $warns.push('操作原因不能超过20个字');
                }
                if($warns.length>0){
                    that.$message({
                        showClose: true,
                        message: $warns.join(';')+'。',
                        type: 'warning'
                    });
                    return;
                }

                var loading_index = layer.load(2);
                that.Api.pb_smsAuth({
                    phoneNo:that.keyword,
                    operationCause:that.mailCheck.operationCause,
                    mobileNo:that.mailCheck.mobileNo
                }).then(function(response){
                    layer.close(loading_index);
                    that.startTimer(60);
                    that.$message({
                        showClose: true,
                        message: response.data.msg,
                        type: 'success'
                    });
                },function(){
                    layer.close(loading_index);
                });

            },
           openLayer(){
               var that = this;
               var bodyH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
               var offset = (bodyH-400)>(bodyH*0.2)?bodyH*0.2:((bodyH-400)>10?(bodyH-400):'10px');

               //
               if(that.isOpen['sec'] == null || that.isOpen['sec']>60){
                   that.stopTimer();
               }else{
                   that.stopTimer();
                   that.startTimer(60-that.isOpen['sec']);
               }

               that.layerIndex = layer.open({
                   type: 1,
                   zIndex:102,
                   offset:offset,
                   scrollbar:false,
                   title: '<span id="ur-sl-layer-title">'+that.sections[that.section]+'</span>',
                   area:'500px',
                   skin: 'demo-class',
                   content: $('#search-limit-area'),
                   btn:null,
                   cancel: function(index){
                       that.isOpen['flag'] = false;
                   }
               });

               that.mailCheck = {
                   userName:base.getCurrentUser()!=null?base.getCurrentUser().userName:'',
                   approverName:'',
                   operationCause:'',
                   mobileNo:''
               }


           },
            cancelLayer(){
                this.isOpen['flag'] = false;
            }
        },
        watch:{
            'isOpen.flag':{
                handler:function(curVal,oldVal){
                    var that = this;
                   if(curVal){
                       that.openLayer();
                       that.isOpen['flag'] = true;
                   }else{
                       if(that.layerIndex!=null){
                           that.section = 'MODE_PICK';
                           that.mode.type = '1';
                           layer.close(that.layerIndex);
                       }
                   }
                }
            },
            'section':{
                handler:function(curVal,oldVal){
                    var that = this;
                    $('#ur-sl-layer-title').html(that.sections[that.section]);
                    $('.ur-sl').css('height',$('.ur-sl-section[name="'+that.section+'"]').height());

                }
            }
        }
    }
</script>
<style scoped>
    #search-limit-area{
        display: none;
    }
    .ur-sl{
        width: 100%;
        min-height:154px;
    }
    .ur-sl-section{
        width: 100%;
        position: absolute;
        left:0;
        top:0;
    }
    .ur-sl-section__main{
        padding-top: 0;
        padding-bottom: 20px;
        padding: 0 10px 12px;
    }
    .ur-sl-section__foot{
        padding-top: 0;
        padding-bottom: 20px;
        text-align: right;
        padding: 0 10px 12px;
        pointer-events: auto;
    }
    .ur-sl-section__foot--button{
        padding: 0 30px;
        height: 38px;
        background-color: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0);
        line-height: 38px;
        color: #fff;
        font-size: 14px;
        margin: 0 6px;
        border-radius: 2px;
        font-weight: 400;
        cursor: pointer;
        display: inline-block;
        vertical-align: top;
    }
    .btn-green{
        background-color: #17a25e;
        border-color: #17a25e;
    }
    .ur-sl-section__foot--button.timer-running{
        background-color: rgba(23,159,93,.8);
        border-color: rgba(23,159,93,.8);
        cursor:not-allowed;
    }
    .section-one,.section-two,.section-three{
        margin:15px;
    }
    .section-two,.section-three{
        font-size: 14px;
        color:#fff;
        line-height:36px;
    }
    .el-row{
        padding: 10px 10px;
    }
    .dark-el.border-el.el-select{
        border:0;
    }

</style>
<style>

</style>