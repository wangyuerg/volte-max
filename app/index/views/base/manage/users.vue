<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <div class="myheader">
                    <div class="mywd">
                        查询条件
                    </div>

                    <el-autocomplete
                            popper-class="my-autocomplete"
                            class="myaut dark-el"
                            v-model="valueCondition"
                            custom-item="my-item-zh"
                            :fetch-suggestions="querySearch"
                            placeholder="请输入用户名"
                            @select="handleSelect"
                    >
                        <el-button slot="append" icon="search" class="dark-el" @click.prevent="search"></el-button>
                    </el-autocomplete>

                    <el-button class="dark-el my-add-btn" id="my-add-btn"   @click.prevent="addUser"><i class="el-icon-plus" > 新增</i> </el-button>

                    <div style="clear: both"></div>
                </div>
            </div>
            <div >
                <div id="i-p-Content">
                    <el-carousel   :autoplay="carouselOption.autoplay" :height="carouselOption.height" arrow="always">
                        <el-carousel-item v-for="pageIndex in Math.ceil(tableData.length/pageSize)==0?1:Math.ceil(tableData.length/pageSize)">
                            <el-row v-for="row in rowSize">
                                <el-col v-for="col in colSize" :span="6">
                                    <el-card class="item-card" v-if="tableData[(row-1)*colSize+(col-1)+(pageIndex-1)*pageSize]">
                                        <p  class="grey text-one-line">用户名:&nbsp;&nbsp;
                                            <el-tag type="success">{{tableData[(row-1)*colSize+(col-1)+(pageIndex-1)*pageSize].userName}}</el-tag>&nbsp;&nbsp;
                                            <el-tag type="primary" v-if="tableData[(row-1)*colSize+(col-1)+(pageIndex-1)*pageSize].userName!='admin'"><i class="el-icon-delete" style="color:#ccc;cursor: pointer"  @click.prevent="openDel(tableData[(row-1)*colSize+(col-1)+(pageIndex-1)*pageSize])"></i></el-tag>
                                            <el-tag type="primary"><i class="el-icon-edit" style="color:#ccc;cursor: pointer" @click.prevent="openUpdate(tableData[(row-1)*colSize+(col-1)+(pageIndex-1)*pageSize])"></i></el-tag>
                                        </p>
                                        <!-- <p class="grey">密&nbsp;&nbsp;&nbsp;码:&nbsp;&nbsp;******&nbsp;&nbsp;<el-tag type="primary"><i class="el-icon-edit" style="color:#ccc;cursor: pointer" @click.prevent="openUpdate(tableData[(row-1)*colSize+(col-1)+(pageIndex-1)*pageSize])"></i></el-tag></p>-->
                                        <p class="grey text-one-line">角色:&nbsp;&nbsp;{{tableData[(row-1)*colSize+(col-1)+(pageIndex-1)*pageSize].roleId | mapAdaptor(roles,'value','name')}}</p>
                                        <p class="grey small text-one-line">创建时间:&nbsp;&nbsp;{{tableData[(row-1)*colSize+(col-1)+(pageIndex-1)*pageSize].createTime}}</p>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-carousel-item>

                    </el-carousel>
                </div>
            </div>
        </el-card>

        <div id="user-add-pop" style="display: none">
            <el-row class="line">
                <el-col :span="6" class="text-center">用户名</el-col>
                <el-col :span="18"><el-input class="dark-el" v-model="newUser.name"></el-input></el-col>
            </el-row>
            <el-row class="line">
                <el-col :span="6" class="text-center">密码</el-col>
                <el-col :span="18"><el-input class="dark-el" v-model="newUser.password"></el-input></el-col>
            </el-row>
            <el-row class="line">
                <el-col :span="6" class="text-center">角色</el-col>
                <el-col :span="18">
                    <el-select  v-model="newUser.roleId"  placeholder="请选择" class="dark-el border-el" popper-class="dark-el manage-select" >
                        <el-option
                                v-for="item in allowRoles"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>

        </div>

        <div id="user-update-pop"  style="display: none">
            <el-row class="line">
                <el-col :span="6" class="text-center">用户名</el-col>
                <el-col :span="18">{{updateUser.name}}</el-col>
            </el-row>
            <el-row class="line">
                <el-col :span="6" class="text-center">密码</el-col>
                <el-col :span="18"><el-input class="dark-el" v-model="updateUser.password"></el-input></el-col>
            </el-row>
            <el-row class="line">
                <el-col :span="6" class="text-center">角色</el-col>
                <el-col :span="18">
                    <el-select  v-model="updateUser.roleId"  placeholder="请选择" class="dark-el border-el" popper-class="dark-el">
                        <el-option
                                v-for="item in allowRoles"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>

    import 'util'
    import layer from 'layer'
    module.exports = {
        created:function(){
            var that = this;
            that.Api.getUsers({starttime:that.timeCondition[0],endtime:that.timeCondition[1],userName:that.valueCondition})
                    .then(function(response){
                        if(response.data.status == 'success'){
                            that.tableData = $.map(response.data.data,function(item){
                                item.password = '******';
                                item.createTime = new Date(item.createTime).format('yyyy-MM-dd HH:mm:ss');
                                return item;
                            });
                            that.userArea =  that.tableData;
                        }
                    });



        },
       
        methods: {
            search(){
                var that = this;

                that.Api.getUsers({
                            starttime:that.timeCondition[0]==null?null:new Date(that.timeCondition[0]).getTime()
                            ,endtime:that.timeCondition[1] == null?null:new Date(that.timeCondition[1]).getTime()
                            ,userName:that.valueCondition})
                        .then(function(response){
                            if(response.data.status == 'success'){
                                that.tableData = $.map(response.data.data,function(item){
                                    item.password = '******';
                                    item.createTime = new Date(item.createTime).format('yyyy-MM-dd HH:mm:ss');
                                    return item;
                                });

                            }
                        });
            },
            deleteRow(index, rows) {
                rows.splice(index, 1);
            },
            querySearch(queryString, cb) {
                var userArea = this.userArea;
                var results = queryString ? userArea.filter(this.createFilter(queryString)) : userArea;
                // 调用 callback 返回建议列表的数据
                console.log(results)
                cb(results);
            },
            createFilter(queryString) {
                return function(a) {
                    return (a.userName.indexOf(queryString.toLowerCase()) >=0 );
                };
            },
            handleSelect(item) {
                this.valueCondition = item.userName;
            },
            addUser(){
                var that = this;
                that.newUser = {name:'',password:'',roleId:'2'};
                layer.open({
                    type: 1,
                    title: '用户新增',
                    area:['450px','340px'],
                    scrollbar:true,
                    zIndex:1100,
                    resize:false,
                    skin: 'demo-class',
                    content: $('#user-add-pop'),
                    btn:['确定','取消'],
                    yes:function(index){
                        if(!/^[a-zA-Z0-9@]{3,16}$/.test(that.newUser.name)){
                            that.$message({
                                showClose: true,
                                message: '用户名3-16个字符（只允许英文，数字或"@"）',
                                type: 'warning'
                            });
                            return false;
                        }
                        if(!/^[a-zA-Z0-9]{4,20}$/.test(that.newUser.password)){
                            that.$message({
                                showClose: true,
                                message: '密码4-20个数字或者英文字母',
                                type: 'warning'
                            });
                            return false;
                        }
                        that.Api.addUser({userName:that.newUser.name,password:that.newUser.password,roleId:that.newUser.roleId})
                                .then(function(response){
                                    if(response.data.status == 'success'){

                                        var _user = response.data.data;
                                        _user.password = '******';
                                        _user.createTime = new Date(_user.createTime).format('yyyy-MM-dd HH:mm:ss');
                                        var i1 = that.tableData.slice(0,that.tableData.length+1);
                                        i1.unshift(_user);
                                        that.tableData= i1;
                                        that.userArea = i1;
                                        that.newUser = {name:'',password:''}

                                        that.$message({
                                            showClose: true,
                                            message: response.data.msg,
                                            type: 'success'
                                        });
                                        layer.close(index);
                                    }else{
                                        that.$message({
                                            showClose: true,
                                            message: response.data.msg,
                                            type: 'warning'
                                        });
                                    }
                                });

                    },
                    btn2:function(index){
                        that.newUser = {name:'',password:''}
                        layer.close(index);
                    },
                    cancel: function(index){
                        that.newUser = {name:'',password:''}
                        layer.close(index);
                    }
                });
            },
            openUpdate(data){
                var that = this;
                that.updateUser.name = data.userName;
                that.updateUser.password = '';
                that.updateUser.roleId = data.roleId + '';
                layer.open({
                    type: 1,
                    title: '用户修改',
                    area:['450px','340px'],
                    scrollbar:true,
                    zIndex:1100,
                    resize:false,
                    skin: 'demo-class',
                    content: $('#user-update-pop'),
                    btn:['确定','取消'],
                    yes:function(index){
                        if(!/^[a-zA-Z0-9]{4,20}$/.test(that.updateUser.password)){
                            that.$message({
                                showClose: true,
                                message: '密码4-20个数字或者英文字母',
                                type: 'warning'
                            });
                            return false;
                        }
                        that.Api.updateUser({
                            id:data.id,
                            userName:data.userName,
                            password: that.updateUser.password,
                            roleId:that.updateUser.roleId
                        }).then(function(response){
                            if(response.data.status == 'success') {
                                that.$message({
                                    showClose: true,
                                    message: response.data.msg,
                                    type: 'success'
                                });
                                data.roleId = that.updateUser.roleId;
                                layer.close(index);
                            }else{
                                that.$message({
                                    showClose: true,
                                    message: response.data.msg,
                                    type: 'warning'
                                });
                            }
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
            openDel(data){
                console.log(data)
                var that = this;
                layer.confirm('是否要删除用户【'+data.userName+'】?', {icon: null, title:'提示' ,skin: 'demo-class'},function(index){
                    that.Api.delUser(data.id)
                            .then(function(response){
                                if(response.data.status == 'success') {

                                    for(var i = 0; i <that.tableData.length;i++){
                                        if(data.id == that.tableData[i].id){
                                            that.tableData.splice(i,1);
                                            break;
                                        }
                                    }
                                    for(var i = 0; i <that.userArea.length;i++){
                                        if(data.id == that.userArea[i].id){
                                            that.userArea.splice(i,1);
                                            break;
                                        }
                                    }

                                    that.$message({
                                        showClose: true,
                                        message: response.data.msg,
                                        type: 'success'
                                    });
                                }else{
                                    that.$message({
                                        showClose: true,
                                        message: response.data.msg,
                                        type: 'warning'
                                    });
                                }
                                layer.close(index);
                            });
                });
            }
        },
        data:function(){
            return{
                carouselOption:{
                    autoplay:false,
                    height:'450px'
                },
                timeCondition: [null,null],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                valueCondition:'',
                newUser:{
                    name:'',
                    password:'',
                    roleId:'2'
                },
                updateUser:{
                    name:'',
                    password:'',
                    roleId:null
                },
                colSize:4,
                rowSize:3,
                pageSize:12,
                tableData: [],
                userArea:[],
                roles:[
                    {name:'系统管理员',value:'1' },
                    {name:'角色1（可见用户回放）',value:'2' },
                    {name:'角色2（不可见用户回放）',value:'3' }
                ],
                allowRoles:[
                    {name:'角色1（可见用户回放）',value:'2' },
                    {name:'角色2（不可见用户回放）',value:'3' }
                ]
            }
        }
    }
</script>
<style scoped>
    .new-btn{
        background-color:#1D8CE0;
        border: 1px solid transparent;
    }
    #i-p-Content{
        height:100%;
        width:100%;
        margin: auto;
        border: 0;
        padding:15px 0;
    }
    .item-card{
        margin: 0 auto;
        width:98%;
        height:118px;
        background-color: rgba(27,49,73,.2);
        border-color: rgba(32,160,255,.2);
    }
    .item-card.item-new{
        background-color:  	#008B8B;
        border:2px rgba(18,206,102,.2) solid;
    }
    .item-card.item-new p{
        color:#ddd;
    }

    .el-row{
        margin:3px 0 ;
        padding: 0 5px 0 20px;

    }
    .grey{
        color:#ddd;
        line-height: 28px;
    }
    h5{
        color:#ddd;
    }
    p .strong{
        font-weight: bolder;
        color:#fff;

    }
    .small{
        font-size:12px;
    }
    .gray-el.el-input{
        width:110px;

    }

    .box-card{
        width:98%;
        background-color: rgba(255,255,255,0);
        margin:auto;
        border: 1px solid transparent;

    }


    .myheader{
        margin: auto;
        border: 0;
        padding:15px 0;
        clear: both;
    }
    .mywd{
        display: inline-block;
        font-size: 14px;
        margin-left:20px;
        line-height: 36px;
        color:#fff;
    }

    .mydp{
        width:40%;
        float: left;
        margin-right:5px;
    }
    .myaut{

        margin-left:8px;
        width:20%;

    }
    .my-add-btn{
        margin-right: 30px;
        border-color: rgba(32,160,255,.2);
    }
    .el-icon-plus:before{
        font-size:12px;
    }
    .dark-el.el-button{
        background-color: #1b3149;
        color:#fff;
    }

    .text-center{
        text-align: center;
    }
    .line{
        line-height: 36px;
        color:#fff;
    }
    .line .el-input{
        width:80%;
    }
    .line .el-select{
        width:80%;
    }
    .el-row{
        padding: 10px 10px;
    }
    .dark-el.border-el.el-select{
        border:0;
    }
</style>
<style>
    .el-select-dropdown.dark-el.manage-select{
        width: 255px;
    }
</style>