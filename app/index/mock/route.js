import config from '../config.vue'

const base = `${config.host}/voltemax-service/cxf/jaxrs`
// 用户
// const login = `${base}/user/login` // 用户登陆
// const getAllUser = `${base}/user/get/all` // 系统用户-模糊查询用户信息
// const addUser = `${base}/user/register`// 系统用户-新增用户
// const changeUser = `${base}/user/change/info`// 系统用户-修改用户
// const deleteUser = `${base}/user/delete.*`// 系统用户-删除用户

export default {
    // 用户登陆
    login: `${base}/user/login`, // key为该json文件在resvolte的index.js下向外暴露的名字，value为请求的url
    getAllUser: `${base}/user/get/all`, // 系统用户-模糊查询用户信息
    addUser: `${base}/user/register`, // 系统用户-新增用户
    changeUser: `${base}/user/change/info`, // 系统用户-修改用户 
    deleteUser: `${base}/user/delete.*`, // 系统用户-删除用户
    // 用户回放
    getChartDotDetail: `${base}/playback/get/slice/detail`, // 获取折线图某个点的信息，展开弹窗
    getChartData:  `${base}/playback/get/sessioninfo/slice/byid`, // 单击表格中某一项获取折线图数据
    getMapData: `${base}/playback/get/sessioninfo/maps/byid`, // 单击某一项获得用户回放地图数据
    getLevel: `${base}/playback/get/sessioninfo/level/byid`, // 单击某一项获得电平数据
    getIndex: `${base}/playback/get/sessioninfo/index/byid`, // 单击某一项获得指标统计信息
    getComfirm: `${base}/playback/vault/auth/confirm`, // 获得金库确认数据
    getPaybackTable: `${base}/playback/Result/display`, // 查询表格的信息
    getConfig: new RegExp(base+"/playback/get/personal/configure.*","g"),// 查询个人配置
    getLegal: `${base}/playback/vault/get/privileged`, // 获得用户五分钟内认证通过的数据
    getAllVague: `${base}/playback/vault/auditor/display/vague`, // 申请认证时的管理员
    getLastTime: `${base}/playback/get/lasttime`, //查询数据库中最新时间
    // 小区分析
    getCity: `${base}/analys/get/city`, // 获得小区分析城市
    getColorConf: `${base}/analys/get/personal/conf/1`, // 获得颜色设置
    getDistrict: `${base}/analys/get/district`, // 获得区域列表
    getCommunityData: `${base}/analys/form/quality/community`, // 获得小区数据
    // 指标查询
    getTemplate: new RegExp(base+"/query/get/template.*","g") // 获得模版
}