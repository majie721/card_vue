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
    }

}

export default api;