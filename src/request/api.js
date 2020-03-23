import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const api = {
    //用户信息接口
    getUserInfo(id){
        return axios.get(`/h5/user/${id}`);
    },

    // 首页数据
    homeData(){
      return axios.get('/h5/home')
    },

    //卖卡页面的数据
    productData(){
      return axios.get('/h5/products')
    },

    //商品数据
    productInfo(id){
        return axios.get(`/h5/product_info/${id}`)
    },

    //商品列表
    productList(){
        return axios.get(`/h5/product_list`)
    },

    //用户数据
    accountsData(){
        return axios.get(`/h5/accounts_data`)
    },

    //添加用户收款账号
    addUserAccount(params){
        return axios.post(`/h5/add_account`, qs.stringify(params));
    },

    //添加用户收款账号
    getQuestions(keyword){
        return axios.get(`/h5/questions/?keyword=${keyword}`);
    },

    //用户提交反馈数据
    feedBack(params){
        return axios.post('/h5/feedback',qs.stringify(params))
    },

    //用户登录
    loginData(params){
        return axios.post('/h5/login',qs.stringify(params))
    },

    //提交卡密
    submitCards(params){
        return axios.post('/h5/submit',qs.stringify(params))
    },

    //订单记录
    orders(params){
        return axios.get('/h5/orders?'+qs.stringify(params))
    },

    //订单详情
    orderDetails(params){
        return axios.get('/h5/order_details?'+qs.stringify(params))
    },

    //用户消息列表
    message(page){
        return axios.get('/h5/users_message?page='+page)
    },

    //更新已读消息
    read_message(params){
        return axios.post('/h5/users_message',qs.stringify(params))
    },

    //用户的账号信息
    userInfo(){
        return axios.post('/h5/user')
    },

    //用户的数据(余额/消息数量)
    userData(type){
        return axios.get('/h5/user_data?type='+type)
    },

    //用户的余额
    userBalance(type){
        return axios.get('/h5/user_balance?type='+type)
    },

    //用户发短信验证码
    registerSms(params){
        return axios.post('/h5/register_sms',qs.stringify(params))
    },

    //发送验证码
    sms(params){
        return axios.post('/h5/sms',qs.stringify(params))
    },

    //用户注册
    register(params){
        return axios.post('/h5/register',qs.stringify(params))
    },

    //重置密码发送验证码
    pwdSms(params){
        return axios.post('/h5/reset_password_sms',qs.stringify(params))
    },

    //重置密码
    resetPwd(params){
        return axios.post('/h5/reset_password',qs.stringify(params))
    }
}

export default api;
