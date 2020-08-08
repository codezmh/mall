import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import getters from './getters'


//1.注册组件
Vue.use(Vuex);
const state = {
  cartList:[]
}

//2.创建store对象
const store =new Vuex.Store({
  state,
  mutations,
  //在mutation中进行这种判断很难获取到状态,所以在actions里面操作,但是在action里面无法实时跟踪,所以通过mutations去修改state 
  actions,
  getters,
})


//3.挂载组件
export default store;