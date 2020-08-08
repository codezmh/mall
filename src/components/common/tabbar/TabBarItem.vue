<template>
     <!-- 监听点击 -->
    <div class="tabbar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <!-- 将插槽包装，避免替换的时候修改其他东西，通过动态绑定类来改变文字颜色 -->
        <div :style="isActiveStyle"><slot name="item-text"></slot></div>
        <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
        <div>首页</div> -->
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
      path:String,
      //获取颜色
      activeColor:{
          type:String,
          default:'red'
      }
  },
  data(){
    return {
        // isActive:true,
    }
  },
  computed: {
      isActive() {
          return this.$route.path.indexOf(this.path) !== -1;//拿到处于活跃状态的path，判断是否和我的路径一致，不等于-1表示找到
      },
      isActiveStyle() {
          return this.isActive ? {color: this.activeColor} : {};
      }
  },
  methods: {
      itemClick() {
        //   console.log('itemclick');
          this.$router.push(this.path);
      }
  }
}
</script>
<style scoped>
 .tabbar-item{
    flex:1;
    text-align: center;
    height:49px;
    font-size:14px;
  }
  .tabbar-item img{
    width:24px;
    height: 24px;
    margin-top:3px;
    /* 去除图片默认样式 */
    vertical-align: middle;
    margin-bottom:2px;
  }
</style>
