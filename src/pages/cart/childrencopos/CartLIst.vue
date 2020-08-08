<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="item in cartlist" :key="item.iid" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'
import Scroll from 'components/common/scroll/Scroll'
import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  data(){
    return {}
  },
  computed: {
    ...mapGetters({
      cartlist:'carList'
    })
  },
  components: {
    Scroll,
    CartListItem
  },
  methods: {}
}
</script>
<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 44px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
