<template>
    <div>
    <el-popover
            ref="popover1"
            placement="bottom"
            width="360"
            trigger="click"
            popper-class="dark-el"
    >
        <div class="tags-div">
            <el-tag class="tag-cloth"
                    v-for="r in records"
                    color="#17a25f"
            >
                {{r}}
            </el-tag>&nbsp;&nbsp;
        </div>
    </el-popover>
    <el-input v-model="recordsStr" v-popover:popover1 class="dark-el border-el" :id="inputId"/></el-input>
    <div class="inline">
        <a href="javascript:;" class="file" @click="clearFile">导&nbsp;入
            <input id="mainInput"  type="file" name="xlfile" @change="handleChnage"/>
        </a>

        <iframe name="xlsxiframe" class="disnone" :src="url"></iframe>
    </div>
    </div>
</template>
<script>
    /**
     * 导入excel组件
     */
    import base from 'config';
    import layer from 'layer';
    export default{
        created(){
            var that = this;
            setTimeout(function(){
                //初始化，从外联模块中提取xlsx,reader对象
                xlsxiframe.window.apis.init();
                var helper =xlsxiframe.window.apis.getHelper();
                that.XLSX = helper.XLSX;
                that.reader = helper.reader;
                that.Papa = helper.Papa;
                that.jschardet = helper.jschardet;
                //对 xlsxInput值变化时间进行监听
                that.$root.eventHub.$on('xlsxInputValue', function(option){
                    if(option.type==='set'){
                        that.recordsStr = option.data;
                    }
                });
            },1500);
        },
        methods:{
            clearFile(){
               document.getElementById("mainInput").value = '';
            },
            handleChnage(e){
                var files = e.target.files;
                var f = files[0];
                this.readFile(f);
            },
            pasteHandle(){
            },
            readFile(file){

                var that = this;
                that.reader.onload = function (e) {
                    var data = e.target.result;
                    var records = [];
                    var wb ;
                    try{
                        //尝试解析XLS
                       wb =  that.XLSX.read(data, { type: "binary" });
                        //根据xlsxjs 解析的wb对象获取需要的数据并解析
                        //开始读取workbook信息
                        if ( wb.SheetNames && wb.SheetNames.length>0 ) {
                            //遍历worksheet
                            for (var i = 0 ; i < wb.SheetNames.length ; i++){
                                if(wb.Sheets[wb.SheetNames[i]]['!ref']){
                                    var _ref = wb.Sheets[wb.SheetNames[0]]['!ref'];
                                    var  rf = that.rangeReader(_ref);
                                    if(rf.yEnd >1&&rf.xArr.length>0){
                                        for ( var j = 2 ; j <= rf.yEnd ; j++){
                                            records.push(wb.Sheets[wb.SheetNames[i]]['A'+j].v);
                                        }
                                    }
                                }else if(wb.Sheets[wb.SheetNames[i]]['!range']){
                                    var col = wb.Sheets[wb.SheetNames[i]]['!range'].e.c;
                                    var row = wb.Sheets[wb.SheetNames[i]]['!range'].e.r;
                                    if( col <=0 || row <= 0 ){
                                        console.log('工作簿('+wb.SheetNames[i]+')无记录');
                                    }else{
                                        if(col >1){
                                            console.log('工作簿('+wb.SheetNames[i]+')第2列开始被忽略，不导入');
                                        }
                                        for ( var j = 2 ; j <= row ; j++){
                                            records.push(wb.Sheets[wb.SheetNames[i]]['A'+j].v);
                                        }
                                    }
                                }
                            }
                            that.recordsStr = records.join(',');
                        } else {
                            that.errorWarning('导入的Excel没有工作簿');
                        }
                    }catch(err){
                        //错误时尝试解析CSV
                        if(err.message == 'Unsupported file 69'){
                            records = [];
                            var encoding = that.checkEncoding( data );
                            that.Papa.parse(data, {
                                encoding: encoding,
                                complete: function(results) {
                                    if(results.data.length>1){
                                        for(var i = 1 ; i <results.data.length-1;i++){
                                            if(results.data[i][0].trim()!=''){
                                                records.push(results.data[i][0]);
                                            }
                                        }
                                        that.recordsStr = records.join(',');
                                    }
                                }
                            });
                        }


                    }



                };
                //读取文件
                that.reader.readAsBinaryString(file);

            },
            //范围读取（用于execl wb 对象中!ref的解析）
            rangeReader(ref){
                var cArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                var _r = ref.split(':');
                var s_x = _r[0].substring(0,1);
                var e_x = _r[1].substring(0,1);
                var s_y = _r[0].substring(1);
                var e_y = _r[1].substring(1);
                var ss,ee;
                for(var i = 0 ; i < cArr.length;i++){
                    if(s_x === cArr[i]){
                        ss = i;
                    }
                    if(e_x === cArr[i]){
                        ee = i;
                    }
                }
                return{
                    xArr:cArr.slice(ss,ee+1),
                    yStart:parseInt(s_y),
                    yEnd:parseInt(e_y)
                }
            },
            //检查编码，引用了 jschardet
            checkEncoding( base64Str ){
                //这种方式得到的是一种二进制串
                var str = decodeURIComponent ( base64Str);
                //要用二进制格式
                var encoding = this.jschardet.detect( str );
                encoding = encoding.encoding;
                if( encoding == "windows-1252"){    //有时会识别错误（如UTF8的中文二字）
                    encoding = "ANSI";
                }
                return encoding;
            },
            errorWarning(msg){
                layer.tips(msg,'#'+that.inputId,{skin:'tip-class',tips:2,time:2500});
            }
        },
        data(){
            return{
                url:base.webHost+'/xlsx/read.html',
                workbook:null,
                XLSX:null,
                reader:null,
                Papa:null,
                jschardet:null,
                file:null,
                recordsStr:''
            }
        },
        props:{
            inputId:'',
            inputStyle:Object
        },
        computed:{
            records(){
                if(this.recordsStr ==='')return [];
                this.recordsStr = this.recordsStr.replace(/\s+/g, ",")
                        .replace(/\s/g,',');
                var _arr = this.recordsStr.split(',');
                var _arr2 = [];
                for(var i =0 ; i <_arr.length;i++){
                    if(_arr[i] != '' && _arr[i].trim() !=''){
                        _arr2.push(_arr[i]);
                    }
                }
                return _arr2;
            }
        },
        watch:{
            records:{
                handler:function(curVal,oldVal){
                  // console.log(curVal)
                },
                deep:true
            }
        },
        beforeDestroy(){
            this.$root.eventHub.$off('xlsxInputValue');
        }
    }
</script>
<style scoped>
    .disnone{
        display: none;
    }
    .inline{
        float:right;
        width:26%;
        min-width:60px;
        vertical-align: middle;
        position: relative;
        height:100%;
        display: inline-block;
        padding: 0 ;
        border: 0;
        margin: 0;
    }

    .file {
        text-align:center;
        width:100%;
        margin:auto;
        font-size: 14px;
        position: relative;
        display: inline-block;
        background: #304256;
        border: 0;
        border-radius: 4px;
        padding:8px 14px;
        overflow: hidden;
        color: #fff;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }
    .file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }
    .file:hover {
        background: #17a35e;
        color: #fff;
        text-decoration: none;
    }
    .el-input{
        width:70%
    }
    .tags-div{
        padding: 3px 0 3px 3px;
    }
    .tag-cloth.el-tag{
        margin: 6px 0 0 5px;
    }
</style>