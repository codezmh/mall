<template>
  <div class="goodlist">
    <goods-list-item v-for="item in goods" :goodsitem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: 'GoodsList',
  props: {
    goods:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {}
  },
  components: {
    GoodsListItem
  },
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
  .goodlist{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
