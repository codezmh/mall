<template>
  <div class='bottom-bar'>
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
     <!-- <sport-ball ref="ball" class="sport-ball"></sport-ball> -->
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
    addToCart() {
      this.$emit('addToCart');
    }
  }
}
</script>
<style scoped>
  .bottom-bar{
    height: 58px;
    background-color: #fff;

    position: fixed ;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
  }
   .bar-item{
     flex:1;
     display: flex;
   }
  .bar-item>div{
    flex:1;
  }
  .bar-left .icon {
    /* 转换为块元素，设置宽度和高度 */
    display:block;
    width: 22px;
    height: 22px;
    margin: 10px auto 4px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }

  .bar-left .service {
    /* 雪碧图上移显示客服图标 */
    background-position:0 -53px;
  }

  .bar-left .shop {
    background-position:0 -99px;
  }

  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 58px;
  }

  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }

  .bar-right .buy {
    background-color: #f69;
  }

  .sport-ball {
    position: absolute;
    left: 225px;
    bottom: 20px;
  }
</style>
