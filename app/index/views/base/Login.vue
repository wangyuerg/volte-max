<template id="login">
    <div>

        <div class="header">
            <div  class="logo-login"><img src="../../images/mobilelogo.png" /></div>
            <div class="name">VoLTE MAX应用系统</div>
        </div>

        <div class="main-wrap row">
            <div class="main">
                <div class="ball">
                    <span class="float1"></span>
                    <span class="float2"></span>
                    <span class="float3"></span>
                    <span class="float4"></span>
                    <span class="float5"></span>
                    <span class="float6"></span>
                </div>
                <div class="form-box">
                    <span class="shadow"></span>
                    <span class="tree1"></span>
                    <span class="tree2"></span>
                    <span class="tree3"></span>
                    <div class="form">
                        <h2 class="login-tit">用户登录</h2>
                        <div class="ued-input-ico ued-ico-lf inp-box1">
                            <input class="ued-input" id='name' type="text" v-model="username" placeholder="请输入用户名" @keyup.enter="checkLogin">
                            <i class="ued-ico ued-ico-user"></i>
                        </div>
                        <div class="ued-input-ico ued-ico-lf inp-box2">
                            <input class="ued-input" id="pwd" type="password" v-model="password" placeholder="请输入密码" @keyup.enter="checkLogin">
                            <i class="ued-ico ued-ico-user"></i>
                        </div>
                        <!--<div class="password-wrap clearfix">
                            <p class="remember f-l">
                                记住密码
                                <span class="remember_bg"></span>
                            </p>
                            <a href="javascript:;" class="forget f-r">忘记密码?</a>
                        </div>-->
                        <a href="javascript:;" class="login-btn"  @click.prevent="login">登录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">

        </div>

    </div>
</template>

<script>
    /**
     * 登录页面
     */

    var base = require('config');
    var layer = require('layer');
    var access = require('access');

    module.exports ={

        methods:{
            /**
             * 检测登录非空
             */
            checkLogin:function(){
              if(this.username === ''){
                  $('#name').focus();
              }else if(this.password === '') {
                  $('#pwd').focus();
              }else{
                  this.login();
              }
            },
            /**
             * 登录方法
             */
            login:function(){
                var that = this;
                //检验有效性
                if(this.username === ''){
                    $('#name').focus();
                    layer.tips('请输入用户名','#name',{skin:'tip-class',tips:2,time:2500});
                    return;
                }
                if(this.password === '') {
                    $('#pwd').focus();
                    layer.tips('请输入密码','#pwd',{skin:'tip-class',tips:2,time:2500});
                    return;
                }
                //调用登录接口
                that.Api.login(that.username,that.b64Encoding(that.password))
                        .then(
                                function(response){
                                    if(response.data.status=='success'){
                                        base.saveCurrentUser(response.data.data);
                                        var accessMenu = access.getAccessMenu();
                                        if(accessMenu.length>0){
                                            that.$router.push(accessMenu[0].path);
                                        }else{
                                            that.$message.warning('该用户无访问权限');
                                        }
                                    }else{
                                        that.$message.error(response.data.msg);
                                    }
                                });

            },
            b64Encoding(input){

                // private property
                var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

                // public method for encoding
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                input = this._utf8_encode(input);
                while (i < input.length) {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    output = output +
                            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
                }
                return output;
            },
            _utf8_encode(string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }
                return utftext;
            },
            send(){
                this.$root.eventHub.$emit('wdCarousel-add', {id:new Date().getTime(),value:this.sendData,time:5000});
                this.sendData ='';
            }

    },
        data:function() {
            return {
               username:"",
                password:"",

            }
        },
        computed: {

        }
    }

</script>
<style scoped>

    .header {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        height: 76px;
        background-color: #fff;
    }
    .header .logo-login {
        float:left;
        top: 0;
        left: 40px;
        line-height: 76px;
        font-size: 30px;
        color: #333;
    }

    .header .name{
        float:left;
        margin-top: 30px;
        height: 26px;
        border-left:1px solid #dddddd;
        font-size:28px;
        color: #666;
        line-height:32px;
        padding: 0 10px 0 10px;
    }

    .main-wrap {
        position: absolute;
        z-index: 2;
        top: 76px;
        right: 0;
        bottom: 242px;
        left: 0;
        background: #ECF6FF url(../../images/bg.jpg) no-repeat top center;
        background-position: 100% 100%;
    }
    .main {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        margin-left: -640px;
        width: 1280px;
    }
    .ball {
        position: absolute;
        z-index: 2;
        bottom: -110px;
        left: 70px;
        width: 490px;
        height: 422px;
        background: url(../../images/ball.png) no-repeat;
    }
    .ball .float1 {
        position: absolute;
        top: 284px;
        left: 21px;
        width: 228px;
        height: 123px;
        background: url(../../images/float1.png) no-repeat;
        animation: first 5s linear infinite alternate;
        /* Firefox: */
        -moz-animation: first 5s linear infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: first 5s linear infinite alternate;
        /* Opera: */
        -o-animation: first 5s linear infinite alternate;
    }
    .ball .float2 {
        position: absolute;
        top: 296px;
        left: 398px;
        width: 62px;
        height: 63px;
        background: url(../../images/float2.png) no-repeat;
        /* Firefox: */
        -moz-animation: second 5s linear infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: second 5s linear infinite alternate;
        /* Opera: */
        -o-animation: second 5s linear infinite alternate;
        animation: second 5s linear infinite alternate;

        -moz-transform-origin: -140px -175px;
        -webkit-transform-origin: -140px -175px;
        -o-transform-origin: -140px -175px;
        transform-origin: -140px -175px;
    }
    .ball .float3 {
        position: absolute;
        top: 182px;
        left: 408px;
        width: 75px;
        height: 75px;
        background: url(../../images/float3.png) no-repeat;
        /* Firefox: */
        -moz-animation: second 5s linear infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: second 5s linear infinite alternate;
        /* Opera: */
        -o-animation: second 5s linear infinite alternate;
        animation: second 5s linear infinite alternate;

        -moz-transform-origin: -180px -30px;
        -webkit-transform-origin: -180px -30px;
        -o-transform-origin: -180px -30px;
        transform-origin: -180px -30px;
    }
    .ball .float4 {
        position: absolute;
        top: 64px;
        left: 358px;
        width: 103px;
        height: 103px;
        background: url(../../images/float4.png) no-repeat;
        /* Firefox: */
        -moz-animation: second 5s linear infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: second 5s linear infinite alternate;
        /* Opera: */
        -o-animation: second 5s linear infinite alternate;
        animation: second 5s linear infinite alternate;

        -moz-transform-origin: -140px 80px;
        -webkit-transform-origin: -140px 80px;
        -o-transform-origin: -140px 80px;
        transform-origin: -140px 80px;
    }
    .ball .float5 {
        position: absolute;
        top: 24px;
        left: 124px;
        width: 36px;
        height: 36px;
        background: url(../../images/float5.png) no-repeat;
        /* Firefox: */
        -moz-animation: second 5s linear infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: second 5s linear infinite alternate;
        /* Opera: */
        -o-animation: second 5s linear infinite alternate;
        animation: second 5s linear infinite alternate;

        -moz-transform-origin: 120px 160px;
        -webkit-transform-origin: 120px 160px;
        -o-transform-origin: 120px 160px;
        transform-origin: 120px 160px;
    }
    .ball .float6 {
        position: absolute;
        top: 102px;
        left: 40px;
        width: 64px;
        height: 64px;
        background: url(../../images/float6.png) no-repeat;
        /* Firefox: */
        -moz-animation: second 5s linear infinite alternate;
        /* Safari 和 Chrome: */
        -webkit-animation: second 5s linear infinite alternate;
        /* Opera: */
        -o-animation: second 5s linear infinite alternate;
        animation: second 5s linear infinite alternate;

        -moz-transform-origin: 195px 60px;
        -webkit-transform-origin: 195px 60px;
        -o-transform-origin: 195px 60px;
        transform-origin: 195px 60px;
    }
    @-moz-keyframes first /* Firefox */
    {
        0%   {left:21px;}
        50%  {left:160px;}
        100% {left:21px;}
    }
    @-webkit-keyframes first /* Safari 和 Chrome */
    {
        0%   {left:21px;}
        50%  {left:160px;}
        100% {left:21px;}
    }

    @-o-keyframes first /* Opera */
    {
        0%   {left:21px;}
        50%  {left:160px;}
        100% {left:21px;}
    }
    @keyframes first
    {
        0%   {left:21px;}
        50%  {left:160px;}
        100% {left:21px;}
    }

    @-moz-keyframes second /* Firefox */
    {
        0%   {transform: rotate(10deg);}
        50%  {transform: rotate(-10deg);}
        100%  {transform: rotate(10deg);}
    }
    @-webkit-keyframes second /* Safari 和 Chrome */
    {
        0%   {transform: rotate(10deg);}
        50%  {transform: rotate(-10deg);}
        100%  {transform: rotate(10deg);}
    }
    @-o-keyframes second /* Opera */
    {
        0%   {transform: rotate(10deg);}
        50%  {transform: rotate(-10deg);}
        100%  {transform: rotate(10deg);}
    }
    @keyframes second
    {
        0%   {transform: rotate(10deg);}
        50%  {transform: rotate(-10deg);}
        100%  {transform: rotate(10deg);}
    }

    .form-box {
        position: absolute;
        z-index: 2;
        bottom: -110px;
        right: 100px;
        width: 462px;
        height: 494px;
        animation: thrid 1s linear;
        /* Firefox: */
        -moz-animation: thrid 1s linear;
        /* Safari 和 Chrome: */
        -webkit-animation: thrid 1s linear;
        /* Opera: */
        -o-animation: thrid 1s linear;
    }

    @-moz-keyframes thrid /* Firefox */
    {
        0%   {transform: translateY(-494px);}
        20%  {transform: translateY(0px)}
        40%  {transform: translateY(-20px)}
        60%  {transform: translateY(0px)}
        80%  {transform: translateY(-5px)}
        100%  {transform: translateY(0px)}
    }
    @-webkit-keyframes thrid /* Safari 和 Chrome */
    {
        0%   {transform: translateY(-494px);}
        20%  {transform: translateY(0px)}
        40%  {transform: translateY(-20px)}
        60%  {transform: translateY(0px)}
        80%  {transform: translateY(-5px)}
        100%  {transform: translateY(0px)}
    }
    @-o-keyframes thrid /* Opera */
    {
        0%   {transform: translateY(-494px);}
        20%  {transform: translateY(0px)}
        40%  {transform: translateY(-20px)}
        60%  {transform: translateY(0px)}
        80%  {transform: translateY(-5px)}
        100%  {transform: translateY(0px)}
    }
    @keyframes thrid
    {
        0%   {transform: translateY(-494px);}
        20%  {transform: translateY(0px)}
        40%  {transform: translateY(-20px)}
        60%  {transform: translateY(0px)}
        80%  {transform: translateY(-5px)}
        100%  {transform: translateY(0px)}
    }
    .form-box .shadow {
        position: absolute;
        z-index: 3;
        top: 475px;
        left: -30px;
        width: 530px;
        height: 36px;
        background: url(../../images/shadow.png) no-repeat;
    }
    .form-box .tree1 {
        position: absolute;
        z-index: 5;
        top: 457px;
        left: -23px;
        width: 28px;
        height: 41px;
        background: url(../../images/tree1.png) no-repeat;
    }
    .form-box .tree2 {
        position: absolute;
        z-index: 5;
        top: 384px;
        left: -70px;
        width: 16px;
        height: 24px;
        background: url(../../images/tree2.png) no-repeat;
    }
    .form-box .tree3 {
        position: absolute;
        z-index: 1;
        top: 465px;
        right: -20px;
        width: 13px;
        height: 19px;
        background: url(../../images/tree3.png) no-repeat;
    }
    .form {
        position: absolute;
        z-index: 4;
        bottom: 5px;
        left: 0;
        width: 382px;
        height: 370px;
        background-color: #fff;
        border-radius: 4px;
        padding: 50px 40px 0;
    }
    .login-tit {
        font-size: 30px;
        color: #1875cb;
        text-align: center;
        line-height: 30px;
        padding-bottom: 6px;
    }
    .ued-input {
        padding: 0 10px;
        height: 56px;
        line-height: 54px;
        font-size: 16px;
        color: #ccc;
        border-radius: 0;
        border: 1px solid #CFCFCF;
        margin-top: 24px;
    }
    .ued-ico-lf .ued-input {
        padding-left: 56px;
    }
    .ued-input-ico .ued-ico {
        position: absolute;
        width: 52px;
        height: 54px;
        top: 1px;
    }
    .inp-box1 .ued-ico {
        background: url(../../images/input_icon1.png) no-repeat;
    }
    .inp-box2 .ued-ico {
        background: url(../../images/input_icon2.png) no-repeat;
    }
    .inp-box3 .ued-ico {
        background: url(../../images/input_icon3.png) no-repeat;
    }
    .ued-input-ico img {
        position: absolute;
        top: 50%;
        right: 1px;
        width: 108px;
        height: 34px;
        margin-top: -17px;
        border-left: 1px solid #ccc;
    }
    .password-wrap {
        height: 22px;
        padding-left: 8px;
        margin-top: 20px;
    }
    .remember,
    .forget {
        font-size: 16px;
        color: #1875cb;
        line-height: 22px;
    }
    .remember:hover,
    .forget:hover {
        color: #0c61af;
    }
    .remember {
        position: relative;
        padding-left: 30px;
        cursor: pointer;
    }
    .remember_bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 22px;
        height: 22px;
        background: url(../../images/remember_bg.png) no-repeat;
        background-position: 0 0;
    }
    .act .remember_bg{
        background-position: -22px 0;
    }
    .footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 242px;
        background-color: #2083d9;
    }
    .login-btn {
        display: block;
        width: 100%;
        height: 60px;
        margin-top: 16px;
        line-height: 60px;
        text-align: center;
        font-size: 24px;
        color: #fff;
        background: -webkit-linear-gradient(rgba(23,115,201,1), rgba(33,133,219,1));
        background: -o-linear-gradient(rgba(23,115,201,1), rgba(33,133,219,1));
        background: -moz-linear-gradient(rgba(23,115,201,1), rgba(33,133,219,1));
        background: linear-gradient(rgba(23,115,201,1), rgba(33,133,219,1));
    }
    .login-btn:hover {
        background: -webkit-linear-gradient(rgba(33,133,219,1), rgba(23,115,201,1));
        background: -o-linear-gradient(rgba(33,133,219,1), rgba(23,115,201,1));
        background: -moz-linear-gradient(rgba(33,133,219,1), rgba(23,115,201,1));
        background: linear-gradient(rgba(33,133,219,1), rgba(23,115,201,1));
    }
    .login-btn:hover {
        text-decoration: none;
    }
    .form .ued-input:hover,
    .form .ued-input:focus {
        color: #333;
        border-color: #5EB0FA;
    }
    .copyright {
        position: absolute;
        bottom: 30px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: rgba(255,255,255,0.8);
        line-height: 12px;
    }
</style>