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
}