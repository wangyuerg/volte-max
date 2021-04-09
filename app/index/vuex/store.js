import Vue from 'vue'
import Vuex from 'vuex'
import rootMutations from './mutations'
import rootActions from './actions'

Vue.use(Vuex);

//服务器IP
const host = "http://58.210.190.62:9090";
//服务器资源路径
const resUrl = "http://58.210.190.62:9090/resource/";
//服务器后端接口路径
const serviceUrl = host+"/voltemax-service/cxf/jaxrs";

const state = {
    host,
    resUrl,
    serviceUrl,
    currentUser:null
};



export default new Vuex.Store({
    state,
    mutations:rootMutations,
    actions:rootActions
})