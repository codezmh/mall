import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

//mapActions将actions中的方法映射到组件的methods中
export default  {
  addCartList(context, payload) {
    //查找之前数组中是否含有该商品
    //find如果找到一个item的id和传进来的商品的id相等,就会将找到的item返回
    return new Promise(resolve => {
      let oldProduct = context.state.cartList.find( item => {
        return item.id === payload.id 
      })
      if(oldProduct) {
        //如果oldProduct的值为真,就将该商品的数量加上1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('该商品的数量+1')
      }else {
        //否则说明该商品没有添加到购物车,将该商品的数量写为1,并push到存储商品的数组中
        payload.checked = true;
        context.commit(ADD_TO_CART, payload);
        resolve('添加了新的商品')
      }
    })
  }
}