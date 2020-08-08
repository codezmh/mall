<template>
  <div class='shop-info'>
    <div class="shop-top">
      <img :src="shops.logo" alt="">
      <span>{{shops.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shops.sells | sellCountFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shops.GoodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item,index) in shops.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more':item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props:{
    shops:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  filters: {
      sellCountFilter: function (value) {
        if (value < 10000) return value;
        return (value/10000).toFixed(1) + '万'
      }
  },
  data(){
    return {}
  }
}
</script>
<style scoped>
  .shop-info{
    padding:25px 8px;
    border-bottom: 5px solid #f2f5f8;
  }
  .shop-top {
    line-height: 45px;
    /* 让元素垂直中心对齐 */
    display: flex;
    /* 居中对齐弹性盒的各项 <div> 元素： */
    align-items: center;
  }
  .shop-top img{
    width:45px;
    height: 45px;
    border-radius: 50%;
    border:1px solid rgba(0,0,0,.1)
  }
  .shop-top span{
    font-size: 16px;
    margin-left: 10px;
    vertical-align: center;
  }

  .shop-middle{
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .shop-middle-item{
    flex:1
  }
  .shop-middle-left{
    display: flex;
    /* justify-content: space-evenly可以使每个元素之间和元素距离边距的距离都相等 */
    justify-content: space-evenly;
    color: #333;
    text-align: center;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  .sells-count,.goods-count{
    font-size: 18px;
  }
  .sells-text,.goods-text{
    margin-top: 10px;
    font-size: 13px;
  }
  .shop-middle-right{
    font-size: 13px;
    color: #333;
  }
   .shop-middle-right table {
    width: 120px;
    margin-left: 30px;
  }
  .shop-middle-right table td {
    padding: 10px 0;
  }
  .shop-middle-right .score{
     color: #5ea732;
  }
   .shop-middle-right .score-better{
    color: #f13e3a;
  }
  .shop-middle-right .better span{
    background-color:#5ea732 ;
    color: #ffff;
  }
  .shop-middle-right .better-more span{
    background-color:#f13e3a ;
  }
   .shop-bottom {
    text-align: center;
    margin-top: 10px;
  }

  .enter-shop {
    /* 变成行内块元素 */
    display: inline-block;
    font-size: 14px;
    background-color: #f5f6f8;
    width: 150px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 10px;
  }
</style>
