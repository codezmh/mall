import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
  //在mutation中所做的操作比较单一一点,一些比较复杂的操作需要通过action完成
  //需要传入state和商品对象
  //对任务进行分部
  [ADD_COUNTER](state, payload) {
    payload.count ++ ;
  },
  [ADD_TO_CART](state, payload) {
    payload.count = 1;
    state.cartList.push(payload)
  }
  
}