<template>
  <div class='goods-item' @click="itemClick">
    <img v-lazy="showImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsitem:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return {}
  },
  computed: {
    showImg() {
      //判断传过来的数据中是否含有image
     	return this.goodsitem.img || this.goodsitem.image || this.goodsitem.show.img
    }
  },
  methods: {
    imgLoad() {
      //$bus事件总线，将图片加载完成的事件发射出去，在home主页监听;
      //但是默认没有$bus这个对象，所以需要在main.js中给Vue的原型添加这个对象
      this.$bus.$emit('imgLoad')
    },
    itemClick() {
      this.$router.push({
        path:'/detail',
        query:{
          id: this.goodsitem.iid
        }
      })
      // console.log('跳转到详情页');
    }
  }
}
</script>
<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods-item img{
    width:100%;
    border-radius: 5px;
  }
  .goods-info{
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    bottom:5px;
    overflow: hidden;
    text-align: center;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;

  }

  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }
  .goods-info .collect::before{
    content: "";
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
