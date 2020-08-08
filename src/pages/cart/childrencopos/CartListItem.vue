<template>
  <div class='cart-list-item'>
    <div class="item-selector">
      <!-- 设置商品的选中或者不选中需要到商品模型中设置 -->
      <!-- 当点击按钮时商品切换选中状态,监听组件的点击需要添加修饰符native -->
      <CheckButton :is-checked="product.checked" @click.native="buttonClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{product.price}}</div>
        <div class="item-count right">×{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/common/checkbutton/CheckButton'
export default {
  name: 'CartListItem',
  data(){
    return {}
  },
  props: {
    product:{
      type:Object,
    }
  },
  components: {
    CheckButton
  },
  methods: {
    //对商品中的checked属性进行取反操作
    buttonClick() {
      this.product.checked = !this.product.checked;
    }
  }
}
</script>
<style scoped>
  .cart-list-item{
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector {
    width: 20px;
    display: flex;
/* 弹性盒子flex 元素位于容器的中心 
设置弹性盒子元素在垂直方向上（纵轴）的对齐方式。*/
    align-items: center;
    /* 弹性盒子flex 元素位于容器的中心 
设置弹性盒子元素在主轴（横轴）的对齐方式*/
    justify-content: center;
  }

  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 8px;
    position: absolute;
    bottom: 8px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  } 
</style>
