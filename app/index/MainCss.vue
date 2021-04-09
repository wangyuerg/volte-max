<style>
    /**
    *导入公用CSS
    **/
    @import './directives/bootstrap-select/bootstrap-3.3.4.css';
    @import './directives/layer/skin/layer.css';
    @import './directives/laydate-master/need/laydate.css';
    @import './directives/laydate-master/skins/molv/laydate.css';
    @import './animate.css';
    /*html,body{
        overflow-y: hidden;
        height:100%;
    }
    #app,#app-container{
        overflow-y: hidden;
        height:100%;
    }*/
    /*topprogress设置*/
    #nprogress .mytopbar.bar{
        background: rgba(231,142,35,0.7);
        height: 5px;
    }

    .nicescroll-rails{
        -webkit-box-sizing: content-box !important;
        -moz-box-sizing: content-box !important;
        box-sizing: content-box !important;
    }
    .nicescroll-rails div{
        -webkit-box-sizing: content-box !important;
        -moz-box-sizing: content-box !important;
        box-sizing: content-box !important;
    }




    /**
    * index.css
    */
    .welcome{ padding-right: 10%; height: 26px; background: #135894; color: rgba(255,255,255,0.6); line-height: 26px; text-align: right;}
    .welcome a{ color: rgba(255,255,255,0.6);}
    .welcome a:hover{ text-decoration: none; }

    .top{overflow: hidden; padding: 0 0 0 7%; height: 46px; background: url(./images/bg_top.png) repeat-x; }
    .logo{ float: left; width: 300px; height: 46px; background: url(./images/logo.png) no-repeat;}
    .ued-nav{ margin-left: 65px; width: auto; height: 46px; background: none;}
    .ued-nav .ued-menu{ height: 46px; }
    .ued-nav .ued-menu a{ padding: 0 20px; height: 46px; line-height: 46px; }
    .ued-nav .ued-menu a:hover{ background: none; }
    .ued-nav .ued-menu.on a{ background: url(./images/nav_on.png) no-repeat bottom center; }

    .content{ padding:5px 1.5% 1.5% 1.5%; background: #181819; }
    .content-t{ overflow: hidden;background: rgba(28,36,50,0.6); border: 1px solid #163c5e;}
    .search{ padding: 25px 0;
        background: -webkit-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -o-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -moz-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
    }
    .search .ued-form table th,.search .ued-form table td{ padding: 5px;  white-space: nowrap;}
    .search .ued-form table th{ width: 8%; color: #b6bfc9; font-size: 14px; text-align: right; }
    .search .ued-input{ height: 34px; border-color: #485869; background: none; color: #7b838d; line-height: 34px;}
    .search .calendar-inputWrap{ display: inline-block; border: 0; width:100%}
    .search .Wdate{ height: 34px; border-color: #485869; background: url(./images/datePicker.png) no-repeat right; color:#ddd}
    .search .ued-btn{ padding: 0 5%; height: 38px; line-height: 38px; background-color: #17a25e; border-color: #17a25e; }
    .search .ued-btn-pill{ margin: 0 2px; background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0);}
    .ico-search{ background: url(./images/search.png) no-repeat; }
    .ico-set{ background: url(./images/set.png) no-repeat;}
    .ico-export{ background: url(./images/export.png) no-repeat;}
    .ico-play{ background: url(./images/play.png) no-repeat; }
    .ico-stop{ background: url(./images/suspend.png) no-repeat; }
    .play.forbidden{cursor:not-allowed;}

    .result-list{ padding: 20px 0; }
    .result-list li{ overflow: hidden; display: inline-block; width: 24.5%;}
    .result-list li a{ display: block; }
    .result-box{ padding: 0 5%; }
    .result-box-bor{ height: 90px; border: 1px solid #02e98a; background: #0d3713;overflow: hidden; white-space: nowrap;}
    .result-icon{ display: inline-block; vertical-align: top; width: 40%; height: 100%;}
    .result-txt{ display: inline-block; vertical-align: top; padding-left: 5%; height: 100%;}
    .result-txt h4{ font-size: 16px; color: #17a25e; line-height: 30px;}
    .result-txt .num{ font-size: 40px; color: #fff; line-height: 40px;}
    .thsl .result-icon{ background: #17a25e url(./images/icon_thsl.png) no-repeat right bottom; }
    .zcthsl .result-icon{ background: #17a25e url(./images/icon_zcthsl.png) no-repeat right bottom;}
    .pjf .result-icon{ background: #17a25e url(./images/icon_pjf.png) no-repeat right bottom;}
    .zdxh .result-icon{ background: #17a25e url(./images/icon_zdxh.png) no-repeat right bottom;}
    .zdxh .num{ font-size: 20px; }

    .table-index-new { overflow-x: auto;overflow-y: hidden;font-size: 14px;}
    ::-webkit-scrollbar {/*滚动条整体样式*/
        width: 10px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px #868686;
        background: #868686;
    }
    ::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px #868686;
        border-radius: 10px;
        background: #EDEDED;
    }
    .table-index-new .first-head-th{
        width: 0;
    }
    .table-index-new .first-body-th{
        width: 0;
    }
    .table-index-new .table-body { overflow-x: hidden; overflow-y: auto; }
    /*.table-index-new .item-common {*/
        /*border-top: 1px solid #163c5e;*/
        /*text-align: center;*/
    /*}*/
    .table-index-new table {table-layout: fixed;}
    /*.table-index-new .first-head-th { width: 4px; }*/
    .table-index-new .table-header {
        text-align: center;
        padding: 10px 5px;
        color: #b6bfc9;
        background: -webkit-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -o-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -moz-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
    }
    .table-index-new th,.table-index-new td{
        padding: 10px 5px;
        color: rgba(255,255,255,0.5);
        border-top: 1px solid #163c5e;
        /*white-space: nowrap;*/
        text-align: center;
    }
    .table-scroll-index .table-body-item {
        /*white-space: normal!important;*/
        word-break: break-all;
        color: rgba(255,255,255,0.5);
    }
    .table-scroll-index table {
        font-size: 12px;
        border-spacing: 0;
        border-collapse: collapse;
    }
    .table-scroll-index tbody {
        display: block;
        overflow-y: auto;
    }
    .table-scroll-index thead tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }
    .table-scroll-index tbody tr {
        cursor: pointer;
        display: table;
        width: 100%;
        table-layout: fixed;
    }
    /*.table-scroll table thead {width: calc( 100% - 1em)}*/
    /*.table-index-new .item-common span {*/
        /*width: 200px;*/
        /*white-space: nowrap;*/
        /*word-break:break-all;*/
        /*display: inline-block;*/
        /*overflow: hidden;*/
        /*text-overflow: ellipsis;*/
        /*padding: 0 10px;*/
    /*}*/
    .table-index-new tbody tr.active { background-color:#163c5e }
    .index-search-table {
        overflow-x: auto;
        overflow-y: hidden;
    }
    .index-search-table table {min-width: 20%; table-layout: auto;}
    .index-search-table th,.index-search-table td{ border-top: 1px solid #163c5e; white-space: nowrap;text-align: center; }
    .index-search-table .table-header {
        padding: 15px 5px;
        color: #b6bfc9;
        background: -webkit-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -o-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -moz-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
    }
    .index-search-table .table-body-item {
        padding: 15px 5px;
        color: rgba(255,255,255,0.5);
    }
    .result-table{ height: 295px; font-size: 14px;}
    .result-table th,.result-table td{
        border-top: 1px solid #163c5e;
        white-space: nowrap;
        text-align: center;
        max-width: 129px;
    }
    .result-table th{ padding:15px 10px; color: #b6bfc9;
        background: -webkit-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -o-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -moz-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
    }
    .result-table td{ padding:15px 20px; color: rgba(255,255,255,0.5);}
    .result-table td.level{ position: relative; }
    .result-table tbody tr{cursor: pointer}
    .result-table tbody tr.active{background-color:#163c5e}
    /*.level1{ background: #e60012;  position: absolute; left: 0; top: 3px; bottom: 3px; width: 4px;}
    .level2{ background: #fff100;  position: absolute; left: 0; top: 3px; bottom: 3px; width: 4px;}
    .level3{ background: #06ae62;  position: absolute; left: 0; top: 3px; bottom: 3px; width: 4px;}*/
    /*.level-other{ background: #182c41; left: 0; top: 3px; bottom: 3px;display: inline-block;height: 50px; width: 4px;vertical-align:middle;}*/
    /*.level1{ background: #e60012; left: 0; top: 3px; bottom: 3px;display: inline-block;height: 50px; width: 4px;vertical-align:middle;}*/
    /*.level2{ background: #fff100;  left: 0; top: 3px; bottom: 3px;display: inline-block;height: 50px; width: 4px;vertical-align:middle;}*/
    /*.level3{ background: #06ae62;  left: 0; top: 3px; bottom: 3px;display: inline-block;height: 50px; width: 4px;vertical-align:middle;}*/
    .level-other{ border-left:4px solid #182c41;}
    .level1{ border-right:4px solid #e60012;}
    .level2{ border-right:4px solid #fff100;}
    .level3{ border-right:4px solid #06ae62;}

    .result-table .sticky-wrap{ overflow: auto; margin: 0; height: 295px;}
    .result-table .sticky-wrap .sticky-thead th{ background: #192e45; }

    .content-b{ margin-top: 30px; height: 535px;}
    .content-b-l{ position: relative; float: left; width: 55%; height: 535px;border: 1px solid #163c5e; background: rgba(28,36,50,0.6);}
    .content-b-r{ float: right; width: 43%; height: 535px; border: 1px solid #163c5e;}
    .content-b-r .pd{ }
    .content-b-r .tab{ position: relative;  height: 0px;  top: 10px;  float: right;right:15px}
    .content-b-r .tab span{ display: inline-block; padding: 0 20px; height: 38px; background: rgba(24,24,25,0.3); line-height:38px; font-size: 14px; color: #fff; cursor: pointer;}
    .content-b-r .tab span:first-child{ border-top-left-radius: 19px; border-bottom-left-radius: 19px; }
    .content-b-r .tab span:last-child{ border-top-right-radius: 19px; border-bottom-right-radius: 19px; }
    .content-b-r .tab span.on{ background: #17a25e; }

    .ued-btn.play{ position: absolute; right: 20px; top: 15px; padding: 0 15px; background: rgba(255,255,255,0.1); border:0;}
    .chart-opt{ position: absolute; right: 120px; top: 20px; width: 132px; height: 26px; background: url(./images/chart_opt.png) no-repeat; }
    .chart-see{ position: absolute; top: 368px; right: 20px; font-size: 14px; color: #17a25e; line-height: 30px;cursor: pointer}
    .chart-cont{ padding: 50px 0 40px; height: 310px;border-bottom:1px solid #163c5e; }
    .score{ height: 121px; }
    .score-tit{ float: left; width: 20%; height: 121px; background: #17a25e;}
    .score-tit h4{ height: 35px; background: #0d3713; color: #0ce989; font-size: 14px; text-align: center; margin-top:0px;line-height:35px}
    .score-tit p{ text-align: center; font-size: 50px; color: #fff; margin: 0}
    .score-list{ margin-left: 20%; }
    .score-list img{ vertical-align:top }
    .score-list ul{ margin: 10px 0; height: 55px; }
    .score-list li{ padding:0 1%; float: left; width: 23%; height: 55px; line-height: 55px; color: #b6bfc9;}
    .score-list-bg{ height: 55px; background: rgba(255,255,255,0.1); border-radius: 2px;font-size: 11px}
    .score li span.img-span{ display: inline-block; vertical-align: middle; margin: 0 6%; width: 30px; height: 30px; background-color: #1a1f28; border-radius: 15px; white-space: nowrap; text-overflow: ellipsis;}

    .score li span.word{font-size: 14px;vertical-align: middle;}
    .score li span.word b{ color: #fff;}
    .intensity{ position: absolute; bottom: 0; width: 100%; padding-top: 20px; height: 101px; }
    .intenchart-opt{ position: absolute; top: 0; width: 100%; height: 26px; background: url(./images/intenchart_opt.png) no-repeat center; }
    .inten-chart-one,.inten-chart-two{ width: 100%; height: 100%; }
    #inten-chart-one,#inten-chart-two{ width: 100%; height: 100%; }

    .chart-one,.chart-two{ height: 100%; width:100%; }
    #chart-one,#chart-two{ height: 100%; width:100%; }
    #layer-deploy{ display: none; background: #192d43; }
    .demo-class .layui-layer-title{ height: 50px; border-bottom: 0; line-height: 50px; color: #fff; font-size: 18px;
        background: -webkit-linear-gradient(rgba(23,115,201,1), rgba(33,133,219,1));
        background: -o-linear-gradient(rgba(23,115,201,1), rgba(33,133,219,1));
        background: -moz-linear-gradient(rgba(23,115,201,1), rgba(33,133,219,1));
        background: linear-gradient(rgba(23,115,201,1), rgba(33,133,219,1));
    }
    .layer-pd{ padding: 20px; }
    .layer-box-t{ overflow: hidden; padding: 0 20px; height: 40px; font-size: 14px; color: #fff; line-height: 40px;
        background: -webkit-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -o-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -moz-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
    }
    .layer-box-t .tit{
        width: 100px;float: left;
    }
    .check-box label{ font-size: 14px; }
    .layer-box-t .check-box{ margin: 0; width: 50px;
        float: right;padding-right: 0}
    .layer-box-t .check-box .icheckbox-blue{ float: left; margin-top: 12px; }
    .layer-box-t input{ vertical-align: middle; margin-right: 5px; }
    .layer-box-c{ border: 1px solid #173a5b; }
    .layer-box-c li{ padding-left: 2%; float: left; width: 31%; line-height: 40px; color: #b6bfc9;}
    .layer-box-c li .icheckbox-blue{ margin-top: 12px; }
    .mt20{ margin-top: 20px; }
    .demo-class.layui-layer{ background: #192d43; }
    .demo-class.layui-layer-page .layui-layer-btn{ padding-top: 0; padding-bottom: 20px; }
    .demo-class .layui-layer-btn a{ padding: 0 30px; height: 38px; background-color: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0); line-height: 38px; color: #fff; font-size: 14px;}
    .demo-class .layui-layer-btn .layui-layer-btn0{ background-color: #17a25e; border-color: #17a25e; }
    .demo-class .layui-layer-setwin{ top: 12px; }
    .demo-class .layui-layer-setwin a{ width: 28px; height: 28px; background:url(./images/layer_close.png) no-repeat; }

    .abnormal{overflow: hidden}
    .abnormal .layer-pd{ padding: 20px 0 20px 8px; overflow: hidden}
    .abnormal dl{ float: left; margin-right: 8px; width: 170px; }
    .abnormal dt{ height: 38px; line-height: 38px; font-size: 14px; color: #fff; text-align: center;
        background: -webkit-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -o-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -moz-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
    }
    .abnormal dd{ position: relative; height: 250px; border: 1px solid #173a5b; }
    .abnormal dd div{height: 250px; }
    .abnormal dd div.layer-bar{height: 25px; }
    .abnormal dd th,.abnormal dd td{ padding:3px 8px; line-height: 20px; }
    .abnormal dd th{ color: #7b838d; }
    .abnormal dd td{ color: #b6bfc9; }
    .abnormal .bx-wrapper{}
    .abnormal .bx-wrapper .bx-viewport{ left: 0; background: none; border:0; box-shadow: 0 0 0;}
    .abnormal .bx-wrapper .bx-controls-direction a{ top: 100%; margin-top: 50px; }
    .abnormal .bx-wrapper .bx-prev{ left: 0; }
    .abnormal .bx-wrapper .bx-next{ right: 0; }
    .layer-bar{ position: absolute; bottom: 0; width: 100%; height: 25px;
        background: -webkit-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -o-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: -moz-linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
        background: linear-gradient(rgba(24,117,203,0.2), rgba(19,88,148,0.2));
    }


    .disnone{ display: none; }
    .calendar_active .calendar-input{
        border: 1px solid #485869;
    }
    #layer-deploy{
        overflow:auto;height:100%
    }
    #layer-deploy .j-container{
        overflow:auto;height:100%
    }
    .layui-layer-page .layui-layer-content{
        overflow:hidden;
    }
    .tip-class.layui-layer-tips .layui-layer-content{ background-color: #111;}
    .tip-class.layui-layer-tips i.layui-layer-TipsB, .tip-class.layui-layer-tips i.layui-layer-TipsT {
        border-right-color: #111;

    }
    .tip-class.layui-layer-tips i.layui-layer-TipsL, .tip-class.layui-layer-tips i.layui-layer-TipsR{
        border-bottom-color: #111;;
    }

    .text-one-line{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .j-timepicker{
        border:1px solid #485869;
        color: #333;
        display: inline-block;
        width:100%;
        font-size:14px;
        line-height:14px;
        text-indent: 10px;
    }
    #txt-input{
        color:#eee
    }
    .temphideclass{
        position: absolute;
        top:-1000px;
        z-index: -100;
    }
    .result-txt .num.fixOver{
        font-size: 14px;
        line-height:40px;
    }
    .event-nice-scorll{
        overflow: hidden;height:250px
    }
    .table-no-info{
        color:rgba(255,255,255,0.5);
        padding-top:100px;
        width:100%;
        height:140px;
        text-align: center;
        position: absolute;
    }
    .result-table th.first-head-th{
        padding: 0;
        width: 4px;
    }
    .result-table th.first-body-th{
        padding: 0;
        width: 4px;
        height:56px;
    }

    .content-b-l *, .content-b-l * *,.socre *,.socre * *,#layer-deploy *,#layer-deploy * *{
        -webkit-box-sizing: content-box !important;
        -moz-box-sizing: content-box !important;
        box-sizing: content-box !important;
    }

    .sticky-wrap .sticky-intersect{
        display: none !important;
    }
    .mg-r10{
        margin-right:10px
    }

    .item-card .el-card__body {
        padding: 15px;
    }
    .gray-el.el-input input{
        background-color: rgba(32,160,255,.2);
        border-color: rgba(32,160,255,.3);
        line-height: 24px;
        height:24px;
        margin: 2px;
        color:#fff;
    }
    .box-card .el-card__header{
        border-bottom: 1px solid #182a3e;
        background-color:#182a3e ;
        padding: 5px 20px;
    }
    .box-card .el-card__body{
        background-color: #191e27;
        padding:10px;
    }
    .box-card .el-carousel__arrow:hover {
        background-color: rgba(255,255,255,.2);
        z-index:999999999999;
    }
    .box-card .el-carousel__arrow--left{
        left:0;
    }
    .box-card .el-carousel__arrow--right{
        right:0;
    }
    .box-card .el-carousel__item{
        padding:0 15px;
    }
    .dark-el .el-input-group__append{
        background-color: rgba(27,49,73,.2);
        border: 1px solid  #1b3149;
        border-left: 1px solid  rgba(27,49,73,.2);
    }
    .layui-layer-dialog .layui-layer-ico.layui-layer-iconull{
        display: none;
    }
    .demo-class .layui-layer-content.layui-layer-padding{
        color:#ddd;
    }

    a,a:hover, a:focus{
        text-decoration:unset!important;
    }
        /**
       *elementui
       *dark pagination
       */
    .dark-el .el-pagination{
        color:#eee;
    }
    .dark-el .el-pager li{
        background: #1b3149;
        border:0;
        margin: 0 1px;
    }
    .dark-el .el-pager li.active{
        background: #4183E1;
    }
    .dark-el .el-pagination .btn-next,.dark-el .el-pagination .btn-prev{
        background: center center no-repeat #1b3149;
        border: 0;
        color:#eee;
    }
    .dark-el .el-input__inner{
        background-color: #1b3149;
        color:#eee;
        border:0;
    }
    .dark-el .el-pager li:last-child{
        border-right:0;
    }
    /**
   * elementui
   * dark tabs
   */
    .dark-tabs .el-tabs__item.is-active{
        color:#eee;
        background-color: #17A25E;
    }
    .dark-tabs .el-tabs__item{
        color:#eee;
    }
    .dark-tabs .el-tabs__active-bar{
        display:none;
    }
    .dark-tabs .el-tabs__header{
        border-bottom:none;
        margin: 0 0 1px;
    }
    /**
    *
    **/
    .el-select-default input{
        width:80px;
    }
    .el-select-default .el-input__inner{
        border:1px solid #fff;
        border-radius: 0%;
    }
    .el-select-default.el-select:hover .el-input__inner{
        border:1px solid #fff;
    }

    .el-select-mlti>div,.el-select-mlti>div>span{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .el-select-mlti>div .el-tag{
        margin:3px 0 3px 3px;
    }
    .el-select-mlti>div i.el-tag__close{
        display: none;
    }

    .el-select-mlti .el-input__inner,.el-select-mlti .el-input__inner:hover{
        border-radius: 0%;
    }

    .el-scrollbar__wrap{
        overflow: auto;
    }

    .dark-el.border-el{
        border:1px #465768 solid;
        width:100%;
    }
    .el-select-dropdown.dark-el{
        background-color: #192f46;
        border:1px #465768 solid;
        color:#ccc;
    }
    .dark-el.el-select-dropdown .el-select-dropdown__item{
        color:#85939f;
    }
    .dark-el.el-select-dropdown .el-select-dropdown__item.hover,
    .dark-el.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover,.dark-el .el-select-dropdown__item.hover{
        background-color: #0ac898;
        color:#fff;
    }

    .dark-el.el-select-dropdown .el-select-dropdown__list{
        padding: 3px 0 3px 0;
    }
    .dark-el.el-select-dropdown .el-select-dropdown__item.selected{
        background-color: #0ac898;
        color:#fff;
    }

    .dark-el.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
        background-color: #192f46;
        color:#fff;
    }
    .dark-el.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
        right:20px;
    }
    .dark-el.el-select .el-tag--primary{
        color:#fff;
    }
    .el-button.el-button--dark-el{
        background: #304256;
        color:#e6e7e8;
        border: 0;
    }
    .el-button.el-button--dark-el:hover{
        background:#17a35e;
        color:#fff;
    }

    .el-icon-save:before{
        content:'';
        width:14px;
        height:14px;
        vertical-align:middle;
        display: inline-block;
        background:  url(./images/save.png) no-repeat;
    }
    .dark-el.el-popover{
        border: 1px solid #1B7BD1;
        background: #192E43;
    }
    .dark-el.el-popover[x-placement^=bottom] .popper__arrow::after{
        border-bottom-color:#192E43;
    }
    .dark-el.el-popover[x-placement^=bottom] .popper__arrow{
        border-bottom-color:#1B7BD1;
    }
    .el-select-dropdown__item.hover{

    }

    /*element-ui menu dark*/
    .el-menu.dark-el{
        background-color: #182A3E;
    }
    .el-menu.dark-el .el-menu-item,
    .el-menu.dark-el .el-menu-item a,
    .el-menu.dark-el .el-submenu__title,
    .el-menu.dark-el .el-submenu__title a{
        color:#999;
    }
    .el-menu.dark-el .el-menu-item.is-active a {
        color:#eee;
    }
   .el-menu.dark-el .el-menu-item.is-active{
/*
       border-bottom: 1px solid rgba(25,30,39,.9);*/
   }

    .el-menu.dark-el .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover,
    .el-menu.dark-el .el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover,
    .el-menu.dark-el .el-menu-item:hover{
        background-color: rgba(25,30,39,.9);
    }


    .el-radio.dark-el{
        color: #fff;
        display: inline-block;
    }
    /*.el-radio.dark-el .el-radio__input.is-checked .el-radio__inner{*/
        /*border-color: #FFF;*/
        /*background-color: #192D43;*/
    /*}*/
    .el-radio.dark-el .el-radio__inner{
        width: 16px;
        height: 16px;
        border-color: #FFF;
        background-color: #192D43;
    }

    .el-radio.dark-el .el-radio__inner::after {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #FFF!important;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        -ms-transform: translate(-50%,-50%) scale(0);
        transform: translate(-50%,-50%) scale(0);
        transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
    }
</style>