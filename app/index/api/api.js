'use strict'

import Vue from 'vue'
import base from '../config.vue'

import VueResource from 'vue-resource'
import axios from 'axios'
Vue.use(VueResource);

import '../util.js'
import layer from 'layer'

import NProgress from 'nprogress'


NProgress.configure({
    template: '<div class="bar mytopbar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
    showSpinner: false
});
window.NProgress = NProgress
require('nprogress/nprogress.css')

const VueResourceNProgress = require('vue-resource-nprogress');
//const VueResourceProgressBarInterceptor = require('vue-resource-progressbar-interceptor');

Vue.use(VueResourceNProgress);
/*Vue.use(VueResourceProgressBarInterceptor ,{
    latencyThreshold: 100, // Number of ms before progressbar starts showing, 100 is default
});*/

const api = {
    install(vue,app){
        var httpRequest = function(type,url,data,header,isShowNotice = true){
            var defaultHeader = header || {headers:base.defaultHeader()}
            type = type.toLowerCase();
            var response;
            if(type === 'get' || type === 'head' || type === 'delete' || type === 'jsonp' ){
                response = Vue.http[type](url,defaultHeader);
            }else{
                response = Vue.http[type](url,data,defaultHeader);
            }
            var promise = new Promise(function(resolve,reject){
                response.then(
                    function(response){
                        if(response.data.status==='success'){
                            resolve(response);
                        }else if(response.data.status === '10000'){
                            if (isShowNotice) {
                                app.$root.eventHub.$emit('httpWarning', {
                                    type:10000,
                                    message:response.data.msg
                                });
                            }
                            reject(response);
                        }else if(response.data.status === '10001'){
                            if (isShowNotice) {
                                app.$root.eventHub.$emit('httpWarning', {
                                    type:10001,
                                    message:response.data.msg
                                });
                            }
                            reject(response);
                        }
                        else{
                            reject(response);
                        }
                    },function(response){
                        reject(response);
                    });
            });
            return promise;
        };

        var httpRequestAll = function(httpRequestArr){
            var promise = new Promise(function(resolve,reject) {

                var isArray = Array.isArray(httpRequestArr),
                    flag = true,
                    n = 0;
                var d = isArray ? [] : {};

                var arrived = function () {
                    if (n === httpRequestArr.length) {
                        if (flag) {
                            resolve(d);
                        } else {
                            reject(d);
                        }
                    }
                };
                for (var key in httpRequestArr) {
                    var run = function (k) {
                        httpRequestArr[k].then(
                            function (res) {
                                d[k] = res;
                                n++;
                                arrived();
                            },
                            function (res) {
                                d[k] = res;
                                n++;
                                flag = false;
                                arrived()
                            }
                        )
                    };
                    run(key);
                }


            });



            return promise;
        };

        Vue.prototype.Api = {
            //????????????
            login: (username,password) => {
                /* return Vue.http.get(base.serviceUrl+'/user/login/'+username+'/'+password);*/
                return Vue.http.post(base.serviceUrl+'/user/login',JSON.stringify({"username":username,"password":password}));
            },
            getUsers:(option) => {
                return httpRequest('post',base.serviceUrl+'/user/get/all',JSON.stringify(option));
            },
            addUser:(user)=>{
                return httpRequest('post',base.serviceUrl+'/user/register', JSON.stringify(user))
            },
            updateUser:(user)=>{
                return httpRequest('put',base.serviceUrl+'/user/change/info',JSON.stringify(user))
            },
            delUser:(id)=>{
                return httpRequest('get',base.serviceUrl+'/user/detele/'+id);
            },
            getApprovers:(option)=>{
                return httpRequest('post',base.serviceUrl+'/playback/vault/auditor/display/vague',JSON.stringify(option));
            },
            addApprover:(user)=>{
                return httpRequest('post',base.serviceUrl+'/user/auditor/add', JSON.stringify(user))
            },
            updateApprover:(user)=>{
                return httpRequest('put',base.serviceUrl+'/user/auditor/change', JSON.stringify(user))
            },
            delApprover:(id)=>{
                return httpRequest('get',base.serviceUrl+'/user/auditor/delete/'+id);
            },
            /**
             * ??????????????????
             */
            //????????????????????????
            pb_getPrivileged:(param)=>{
                return httpRequest('post',base.serviceUrl+'/playback/vault/get/privileged', JSON.stringify(param))
            },
            //????????????????????????
            pb_getAuthConfirm:(param)=>{
                return httpRequest('post',base.serviceUrl+'/playback/vault/auth/confirm', JSON.stringify(param))
            },
            //????????????????????????
            pb_smsAuth: (param) =>{
                return httpRequest('post',base.serviceUrl+'/playback/vault/SMS/authentication', JSON.stringify(param))
            },
            //??????????????????
            pb_orderAuth: (param) =>{
                return httpRequest('post',base.serviceUrl+'/playback/vault/workorder/authentication', JSON.stringify(param))
            },
            //??????????????????????????????
            pb_getPersonalConf: (username) =>{
                return httpRequest('get',base.serviceUrl+'/playback/get/personal/configure/'+username);
            },
            //?????????????????????????????????????????????
            pb_getLasttime: () => {
                return httpRequest('get',base.serviceUrl+'/playback/get/lasttime');
            },
            //??????????????????????????????
            pb_updatePersonalConf: (username,column) =>{
                return httpRequest('post',base.serviceUrl+'/playback/update/personal/configure',
                    JSON.stringify({
                        "username":username,
                        "column":column})
                )
            },
            //????????????????????????
            pb_search:(username,phoneNo,start,end) =>{
                return httpRequest('post',base.serviceUrl+'/playback/Result/display',
                    JSON.stringify({
                        "username":username,
                        "phoneNo":phoneNo,
                        "Session_Start_Time":start,
                        "Session_End_Time":end
                    }))
            },
            /**
             * ?????????????????????????????????
             * @param username ??????????????????
             * @param phoneNo ???????????????????????????
             * @param start ???????????????
             * @param end ????????????
             * @returns {Promise<AxiosResponse<T>>}
             */
            pb_search_export: (username,phoneNo,start,end) => {
                return axios({
                    method: 'post',
                    headers: {
                        'Content-type':'application/json',
                        "x-token":sessionStorage.getItem('token'),
                        'X-Requested-With':'XMLHttpRequest'
                    },
                    responseType: 'blob',
                    url: base.serviceUrl+'/playback/export/result/display',
                    data: {
                        "username":username,
                        "phoneNo":phoneNo,
                        "Session_Start_Time":start,
                        "Session_End_Time":end
                    }
                })
            },
            /**
             * ????????????ID??????????????????
             * @param id display?????????id
             * @param start ????????????
             * @param end ????????????
             * @param destMsisdn ???????????????
             * @returns {Promise<any>}
             */
            pb_getSessionById:(id, start, end, destMsisdn) =>{
                var promise = new Promise(function(resolve,reject){
                    var response = {
                        data: {
                            message: '',
                            status: '',
                            data: {
                                index: {},
                                level: {},
                                maps: {},
                                slice: {}
                            }
                        }
                    }
                    httpRequestAll([
                        httpRequest('post',base.serviceUrl+'/playback/get/sessioninfo/index/byid',JSON.stringify({"id":id, "Session_Start_Time":start, "Session_End_Time":end }), {headers:base.defaultHeader()}, false),
                        httpRequest('post',base.serviceUrl+'/playback/get/sessioninfo/level/byid',JSON.stringify({"id":id, "Session_Start_Time":start, "Session_End_Time":end, "dest_msisdn": destMsisdn }), {headers:base.defaultHeader()}, false),
                        httpRequest('post',base.serviceUrl+'/playback/get/sessioninfo/maps/byid',JSON.stringify({"id":id, "Session_Start_Time":start, "Session_End_Time":end, "dest_msisdn": destMsisdn }), {headers:base.defaultHeader()}, false),
                        httpRequest('post',base.serviceUrl+'/playback/get/sessioninfo/slice/byid',JSON.stringify({"id":id, "Session_Start_Time":start,"Session_End_Time":end }), {headers:base.defaultHeader()}, false)
                    ]).then(function(results){
                        response.data.status = 'success';
                        response.data.data.index = results[0].data.data.index;
                        response.data.data.level = results[1].data.data.level;
                        response.data.data.maps = results[2].data.data.maps;
                        response.data.data.slice = results[3].data.data.slice;
                        resolve(response);
                    }).then(function(results){
                        response.data.status = 'fail';
                        reject(results)
                    }).catch(err => {
                        response.data.status = 'fail';
                        response.data.message = '';
                        if (Array.isArray(err)) {
                            err.forEach(item => {
                                if (item.data.status !== 'success') {
                                    response.data.message = response.data.message + item.data.msg + ';'
                                }
                            })
                        } else {
                            response.data.message = err
                        }
                        resolve(response)
                    });
                });
                return promise;


                //return httpRequest('post',base.serviceUrl+'/playback/get/sessioninfo/byid',JSON.stringify({"id":id }))
            },
            //????????????????????????
            pb_getSliceDetail:(id,line,sessionId,startTime,endTime,destMsisdn) =>{
                return httpRequest('post',base.serviceUrl+'/playback/get/slice/detail',JSON.stringify({
                    "id": id,
                    "line": line,
                    "XDR_ID": sessionId,
                    "Session_Start_Time": startTime,
                    "Session_End_Time": endTime,
                    "dest_msisdn": destMsisdn
                }))
            },
            /**
             *??????????????????
             */
            //??????????????????
            ca_formQuality:(pageNum,pageSize,searchCondition)=>{
                if(searchCondition.timeType ==='date'){
                    searchCondition.Start_Time = searchCondition.Start_Time instanceof Date?searchCondition.Start_Time.format('yyyy-MM-dd'):"";
                    searchCondition.End_Time = searchCondition.End_Time instanceof Date?searchCondition.End_Time.format('yyyy-MM-dd'):"";
                }else if(searchCondition.timeType ==='datetime'){
                    searchCondition.Start_Time = searchCondition.Start_Time instanceof Date?searchCondition.Start_Time.format('yyyy-MM-dd HH'):"";
                    searchCondition.End_Time = searchCondition.End_Time instanceof Date?searchCondition.End_Time.format('yyyy-MM-dd HH'):"";
                }

                return httpRequest('post',base.serviceUrl+'/analys/form/quality/community',JSON.stringify({
                    'page_Num':pageNum,
                    'page_Size':pageSize,
                    'greenMin':searchCondition?searchCondition.greenMin:'',
                    'greenMax':searchCondition?searchCondition.greenMax:'',
                    'yellowMin':searchCondition?searchCondition.yellowMin:'',
                    'yellowMax':searchCondition?searchCondition.yellowMax:'',
                    'redMin':searchCondition?searchCondition.redMin:'',
                    'redMax':searchCondition?searchCondition.redMax:'',
                    "Start_Time":searchCondition?searchCondition.Start_Time:'',
                    'End_Time':searchCondition?searchCondition.End_Time:'',
                    'Time_Type':searchCondition?searchCondition.timeType:'',
                    'Worse_Quality_time_rate':searchCondition? parseInt(searchCondition.Worse_Quality_time_rate):10,
                    'call_time':searchCondition? searchCondition.call_time:0,
                    'local_city':searchCondition?searchCondition.local_city:'',
                    'district':searchCondition?searchCondition.district:''

                }))
            },
            //??????????????????
            ca_formQuality_export:(searchCondition)=>{

                if(searchCondition.timeType ==='date'){
                    searchCondition.Start_Time = searchCondition.Start_Time instanceof Date?searchCondition.Start_Time.format('yyyy-MM-dd'):"";
                    searchCondition.End_Time = searchCondition.End_Time instanceof Date?searchCondition.End_Time.format('yyyy-MM-dd'):"";
                }else if(searchCondition.timeType ==='datetime'){
                    searchCondition.Start_Time = searchCondition.Start_Time instanceof Date?searchCondition.Start_Time.format('yyyy-MM-dd HH'):"";
                    searchCondition.End_Time = searchCondition.End_Time instanceof Date?searchCondition.End_Time.format('yyyy-MM-dd HH'):"";
                }
                return axios({
                    method: 'post',
                    headers: {
                        'Content-type':'application/json',
                        'x-token':sessionStorage.getItem('token'),
                        'X-Requested-With':'XMLHttpRequest'
                    },
                    responseType: 'blob',
                    url: base.serviceUrl+'/analys/export/cell/info',
                    data: {
                        'Start_Time': searchCondition?searchCondition.Start_Time:'',
                        'End_Time': searchCondition?searchCondition.End_Time:'',
                        'Time_Type': searchCondition?searchCondition.timeType:'',
                        'Worse_Quality_time_rate': searchCondition? parseInt(searchCondition.Worse_Quality_time_rate):10,
                        'local_city': searchCondition?searchCondition.local_city:'',
                        'district': searchCondition?searchCondition.district:'',
                        'call_time': searchCondition? searchCondition.call_time:0
                    }
                })
            },
            //????????????????????????
            ca_get_colorConfig:(userid)=>{
                return httpRequest('get',base.serviceUrl+'/analys/get/personal/conf/'+userid);
            },
            //????????????????????????
            ca_update_colorConfig:(userId,greenMin,greenMax,yellowMin,yellowMax,redMin,redMax)=>{
                return httpRequest('post',base.serviceUrl+'/analys/change/personal/conf',
                    JSON.stringify({
                        "userId":userId,
                        "greenMin":greenMin,
                        "greenMax":greenMax,
                        "yellowMin":yellowMin,
                        "yellowMax":yellowMax,
                        "redMin":redMin,
                        "redMax":redMax
                    }))
            },
            //??????ECI??????????????????
            ca_qualitative_analysis:(start,end,timetype,eci)=>{
                if(timetype ==='date'){
                    start = start==''?'':start.format('yyyy-MM-dd');
                    end = end==''?'':end.format('yyyy-MM-dd');
                }else if(timetype ==='datetime'){
                    start = start==''?'':start.format('yyyy-MM-dd HH');
                    end = end==''?'':end.format('yyyy-MM-dd HH');
                }
                    return httpRequest('post',base.serviceUrl+'/analys/get/qualitative/analysis',
                    JSON.stringify({
                        "End_Time": end,
                        "Start_Time": start,
                        "Time_Type": timetype,
                        "ECI":eci
                    }))
            },
            ca_qualitative_thermodynamic:(searchCondition)=>{
                if(searchCondition.timeType ==='date'){
                    searchCondition.Start_Time = searchCondition.Start_Time instanceof Date?searchCondition.Start_Time.format('yyyy-MM-dd'):"";
                    searchCondition.End_Time = searchCondition.End_Time instanceof Date?searchCondition.End_Time.format('yyyy-MM-dd'):"";
                }else if(searchCondition.timeType ==='datetime'){
                    searchCondition.Start_Time = searchCondition.Start_Time instanceof Date?searchCondition.Start_Time.format('yyyy-MM-dd HH'):"";
                    searchCondition.End_Time = searchCondition.End_Time instanceof Date?searchCondition.End_Time.format('yyyy-MM-dd HH'):"";
                }
                return httpRequest('post',base.serviceUrl+'/analys/get/qualitative/thermodynamic/chart',JSON.stringify({
                    "Start_Time":searchCondition?searchCondition.Start_Time:'',
                    'End_Time':searchCondition?searchCondition.End_Time:'',
                    'Time_Type':searchCondition?searchCondition.timeType:'',
                    'local_city':searchCondition?searchCondition.local_city:''

                }))
            },
            ca_cell_dot:(searchCondition)=>{
                if(searchCondition.timeType ==='date'){
                    searchCondition.Start_Time = searchCondition.Start_Time instanceof Date?searchCondition.Start_Time.format('yyyy-MM-dd'):"";
                    searchCondition.End_Time = searchCondition.End_Time instanceof Date?searchCondition.End_Time.format('yyyy-MM-dd'):"";
                }else if(searchCondition.timeType ==='datetime'){
                    searchCondition.Start_Time = searchCondition.Start_Time instanceof Date?searchCondition.Start_Time.format('yyyy-MM-dd HH'):"";
                    searchCondition.End_Time = searchCondition.End_Time instanceof Date?searchCondition.End_Time.format('yyyy-MM-dd HH'):"";
                }
                return httpRequest('post',base.serviceUrl+'/analys/get/cell/dot',JSON.stringify({
                    "Start_Time":searchCondition?searchCondition.Start_Time:'',
                    'End_Time':searchCondition?searchCondition.End_Time:'',
                    'Time_Type':searchCondition?searchCondition.timeType:'',
                    'local_city':searchCondition?searchCondition.local_city:'',
                    'district':searchCondition?searchCondition.district:'',
                    'greenMin':searchCondition?searchCondition.greenMin:'',
                    'greenMax':searchCondition?searchCondition.greenMax:'',
                    'yellowMin':searchCondition?searchCondition.yellowMin:'',
                    'yellowMax':searchCondition?searchCondition.yellowMax:'',
                    'redMin':searchCondition?searchCondition.redMin:'',
                    'redMax':searchCondition?searchCondition.redMax:'',
                    'Worse_Quality_time_rate':searchCondition? parseInt(searchCondition.Worse_Quality_time_rate):10,
                    'call_time':searchCondition? searchCondition.call_time:0,
                }))
            },
            /**
             * ???????????? indexSearh ??????
             */
            //??????????????????
            is_add_template:(username,templateName,json)=>{
                return httpRequest('post',base.serviceUrl+'/query/add/template',JSON.stringify({
                    "username":username,
                    'templateName':templateName,
                    'sqlJson':json
                }))
            },
            //??????????????????
            is_get_template:(username)=>{
                return httpRequest('get',base.serviceUrl+'/query/get/template/'+username);
            },
            //??????????????????
            is_del_template:(ids)=>{
                return httpRequest('post',base.serviceUrl+'/query/delete/template',JSON.stringify(ids), {headers:base.defaultHeader(),
                    contentType:"application/json"});
            },
            //??????????????????
            is_search:(pageNum,pageSize,json)=>{
                return httpRequest('post',base.serviceUrl+'/query/search/index/info',JSON.stringify({
                    'page_Num':pageNum,
                    'page_Size':pageSize,
                    'sqlJson':json
                }))
            },
            /**
             * ??????????????????????????????
             * @param pageNum ??????
             * @param count ?????????????????????
             * @param json ?????????????????????
             * @returns {Promise<AxiosResponse<T>>}
             */
            is_search_export: (pageNum,count,json) => {
                return axios({
                    method: 'post',
                    headers: {
                        'Content-type':'application/json',
                        "x-token":sessionStorage.getItem('token'),
                        'X-Requested-With':'XMLHttpRequest'
                    },
                    responseType: 'blob',
                    url: base.serviceUrl+'/query/export/index/info',
                    data: {
                        'page_Num':pageNum,
                        'page_Size':count,
                        'sqlJson':json
                    }
                })
            },
            getCitys:()=>{
                return httpRequest('post',base.serviceUrl+'/analys/get/city',{})
            },
            getDistrictsByCity:(cityNo)=>{
                return httpRequest('post',base.serviceUrl+'/analys/get/district',JSON.stringify({cityNo:cityNo}))
            }


        }
    }
};
const httpWarningHandler = {
    install(vue,app){
        var m = {
            lastType:'',
            lastModal:null
        };
        app.$root.eventHub.$on('httpWarning', function(option){
                m.lastType = option.type;
                if(option.type == 10000){
                    if(app.$route.name != 'login' && app.$route.name != 'void'){
                        var modal = app.$message({
                            message: option.message,
                            type: 'warning'
                        });
                        if(m.lastModal){
                            m.lastModal.close();
                            m.lastModal = modal;
                        }
                        base.clearCurrentUser();
                        app.$router.push('/login');
                    }
                }else{
                    var modal = app.$message({
                        message: option.message,
                        type: 'warning'
                    });
                    if(m.lastModal){
                        m.lastModal.close();
                        m.lastModal = modal;
                    }
                }

        });
    }
};
export {api,httpWarningHandler}
