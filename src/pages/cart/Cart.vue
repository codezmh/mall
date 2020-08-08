<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list/>
    <!-- 底部的工具栏 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childrencopos/CartLIst'
import CartBottomBar from './childrencopos/CartBottomBar'

import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  data(){
    return {}
  },
  computed: {
    //数组写法
    ...mapGetters(['cartLength']),
  },
  components: {
    NavBar,   
    CartList,
    CartBottomBar

  },
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
 .cart{
    height:100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700;*/
  } 
</style>