import Vue from "vue";
import Vuex from "vuex";
import api from '../request/api'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: {
            id: 0,
            name: '',
            role: '',
            token:111,
        },
    },
    mutations: {
        setUserInfo(state,info){
            state.id = info.id
            state.name = info.name
            state.role = info.role
            state.token = info.token
        }
    },
    actions: {
        async getUserInfo({commit}) {
                    // await api.getUserInfo(1).then((res)=>{
                    //    // commit('setUserInfo',res.data)
                    // }).catch(e=>{
                    //    // alert(e)
                    // });


                }
    },
    modules: {}
});
