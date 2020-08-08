<template>
  <div class='bottom-bar'>
    <div class="check-content">
      <check-button class="check-button"
      :is-checked="isSelectAll"
      @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="toCalc">
      去计算({{getCounter}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/common/checkbutton/CheckButton'

import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  data(){
    return {}
  },
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['carList']),
    totalPrice() {
      return '￥' + this.carList.filter(item => {
        return item.checked 
      }).reduce((prevalue , item) => {
        return item.price * item.count + prevalue;
      } , 0).toFixed(2)
    },
    //获取选中商品的长度
    getCounter() {
        return this.carList.filter(item => item.checked).length
     },

    isSelectAll() {
      if(this.carList.length === 0) {
        return false;
      }
      //1.使用filter函数:找到里面是否有不选中的,如果有则返回false
      // return !(this.carList.filter( item => ! item.checked).length);
      
      //2.使用find函数，找到其中一个不选中的就返回
      // return !(this.carList.find( item => !item.checked));

      //3.普通的遍历:遍历商品数组中所有商品的，如果其中有未选中状态的商品，则返回false,全选按钮不选中
      let isChecked = false;
      for(let item of this.carList) {
        if(!item.checked) {
          isChecked = false;
          return isChecked;
        }
      }
      return isChecked = true;
    }
  },
  methods: {
    //全选按钮的点击实现:如果所有的全选中，点击一下则全部不选中;如果有一个或部分不选中,则点击一下全部选中
    checkClick() {
      if(this.isSelectAll) {//让里面的商品全部不选中,即checked设置为false
        this.carList.forEach(item => item.checked = false );
      }else {
        this.carList.forEach(item => item.checked = true );
      }
      // console.log("-------");
    },
    toCalc() {
      if(this.getCounter == 0) {
        this.$toast.showMessage("请选择要计算的商品",2000)
      }
    }
  }
}
</script>
<style scoped>
  .bottom-bar{
    width: 100%;
    height: 44px;
    background-color: #eee;

    position: fixed;
    bottom: 49px;
    left: 0;
    display: flex;


    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 15px;
    color: #888;
    padding-left: 10px;
    line-height: 44px;
  }
  .check-content{
    width:60px;
    display: flex;
    align-items: center;
    position: relative;
  }
  .check-button{
    width:20px;
    height:20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 15px;
    flex:1;
  }
  .calculate{
    width:100px;
    background-color:rgb(255, 14, 14);
    color: #fff;
    text-align: center;
  }
</style>
