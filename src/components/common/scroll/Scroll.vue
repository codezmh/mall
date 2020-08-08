<template>
  <div class='wrapper' ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
//导入better-scroll
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props:{
    probetype:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      bscroll:null
    }
  },
  components: {},
  created(){},
  //创建组件完之后使用
  mounted(){
    this.bscroll = new BScroll(this.$refs.wrapper,{
      //动态传入probeType和pullUpLoad决定是否进行位置侦测和上拉加载更多
      probeType: this.probetype,
      pullUpLoad:this.pullUpLoad,
      // pullUpLoad:true,
      //里面的div实现点击需要添加click为true
      click:true,
      // mouseWheel: false
    })
    //获取滚动的位置
    if(this.probetype ===2 || this.probetype === 3) {
      this.bscroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
    };
    //监听滚动到底部
    if(this.pullUpLoad) {
      this.bscroll.on('pullingUp',() => {
      // console.log('上拉加载更多');
      //将该事件发送给调用的组件，决定是否需要 
      this.$emit('pullingUp')
    })

    }
  },
  methods: {
    //回到顶部
    goTop(x , y, time=300) {
      //判断bscroll对象是否存在值
      this.bscroll && this.bscroll.scrollTo(x,y,time);
    },
    //刷新
    reFresh() {
      //console.log('------');
      this.bscroll && this.bscroll.refresh();
    },
    //结束向上加载
    finishPullUp() {
      this.bscroll.finishPullUp();
    },
    getPositionY() {
      return this.bscroll ? this.bscroll.y : 0;
    }
  }
}
</script>
<style scoped>
</style>
