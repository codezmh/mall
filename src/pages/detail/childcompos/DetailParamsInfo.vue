<template>
  <div class="goods-params"  v-if="Object.keys(goodsParams).length !== 0">
    <table v-for="(item, index) in goodsParams.tables"
    class="info-size" :key="index">
      <tr v-for ="(tr, indey) in item" :key="indey">
        <td v-for ="(text,indez) in tr" :key="indez">{{text}}</td>
      </tr>
    </table>
      <table class="info-param">
      <tr v-for ="(inner,index) in goodsParams.set">
        <td class="info-param-key"> {{inner.key}}</td>
        <td class="param-value"> {{inner.value}}</td>
      </tr>
    </table>

    <div class="info-img" v-if="goodsParams.image.length !== 0">
      <img :src="goodsParams.img" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamsInfo',
  props: {
    goodsParams:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
  .goods-params {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  /* 为表格设置合并边框模型： */
   .goods-params table {
    width: 100%;
    border-collapse: collapse;
  }
  .goods-params table tr{
    height: 40px;
  }
  .goods-params table tr td{
    border-bottom:1px solid rgba(0, 0, 0,.1);
  }
  .info-param{
    border-top:1px solid rgba(0, 0, 0,.1);
  }
  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 80px;
  }
  .param-value{
    color: #f1413e
  }
  .info-img{
    width:100%;
  }
</style>
