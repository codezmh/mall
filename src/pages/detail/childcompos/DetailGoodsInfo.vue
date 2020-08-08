<template>
<!-- 判断对象的长度是否等于0，进而执行后续操作 -->
  <div v-if="Object.keys(detailInfo).length !== 0" class='goods-info'>
    <div class="info-desc clear-fix">
      <div class="start-line"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end-line"></div>
      <div v-for="item in detailInfo.detailImage">
        <div class="info-key">{{item.key}}</div>
        <div class="info-list">
        <!-- 遍历对象中传过来的图片和索引,并监听图片加载完成的事件 -->
          <img v-for="(inner, index) in item.list" :key="index" :src="inner" @load="imgLoad" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return {
       count:0,
       imageslength:0
    }
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
    //1.第一种解决思路，在监听图片的加载完成事件的同时，监听到图片的长度，最后只调用一次监听函数发射给父组件
    //imgLoad() {
    //      // 判断, 所有的图片都加载完了, 那么进行一次回调就可以了。如果每次加载一张图片发射一次，会影响性能
    //      if(++this.count === this.imageslength) {
    //       // console.log(1);
    //       this.$emit('imgLoad')
    //      }
    //   }
    // },
    // watch: {
    //   detailInfo() {
    //     //监听对象，获取对象中图片的长度
    //     // console.log(this.detailInfo.detailImage[0].list.length);
    //     this.imageslength = this.detailInfo.detailImage[0].list.length
    //   }

    //2.发送事件给父组件，在父组件监听事件时使用防抖函数
    imgLoad() {
      //console.log('--------');
      this.$emit("imgLoad");
    }
  }
}
</script>
<style scoped>
  .goods-info{
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc{
    padding: 0 15px;
  }
  .info-desc .start-line, .info-desc .end-line{
    width:90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start-line{
    float:left
  }
  .info-desc .end-line{
    float:right;
  }
  /* 在start的前面和end的后面加上一个标记符号 */
  .info-desc .start-line::before, .info-desc .end-line::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end-line::after {
    right: 0;
  }
  .info-desc .desc{
    padding: 15px 0;
    font-size:14px;

  }
  .info-key{
    padding:10px 0 15px;
    font-size:15px;
    color: #333;
  }
  .info-list img{
    width:100%;
  }
</style>
