<template>
  <div id="home">
    <nav-bar class="homenav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
    :title="['流行','新款','精选']" 
    @itemClick="tabClick" 
    ref="tabcontrol1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" 
    :probetype="3" @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
    <home-swiper :banners="banners" @SwiperImgLoad="swiperimgload"/>
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control 
    :title="['流行','新款','精选']" 
    @itemClick="tabClick" 
    ref="tabcontrol2"/>
    <goods-list :goods="setGoods"></goods-list>
    </scroll>
    <!-- 为了方便获得scroll,直接在home里面监听事件,但是组件进行原生事件监听，需要添加修饰符native -->
    <back-top @click.native="backtopClick" v-show="isShowBack"/>
  </div>
</template>

<script>
import HomeSwiper from "./childrenComponents/HomeSwiper";
import RecommendView from "./childrenComponents/RecommendView";
import FeatureView from "./childrenComponents/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeData } from "network/home";
import {debounce} from 'common/utils'
import {imgageListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentype: "pop",
      tabOffSetTop:0,
      isTabFixed: false,
      saveY:0
    }
  },
   mixins: [imgageListenerMixin, backTopMixin],
   components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata();

    //2.请求商品数据
    this.getHomeData("pop");

    this.getHomeData("new");

    this.getHomeData("sell");

    //在created里面获取一个对象很可能是拿不到值的，值为空或者undefined
    //  this.$bus.$on('imgLoad',() =>{
    //   this.$refs.scroll.reFresh();
    //   // console.log('------');
    // })
  },
  mounted () {
  },
  computed: {
    setGoods() {
      return this.goods[this.currentype].list;
    },
  },
  methods: {
    // 事件监听的方法
    tabClick(index) {
      // console.log(index);
      // console.log(this.$refs.tabcontrol1.curretIndex);
      //写在后面break会跳出
      this.$refs.tabcontrol2.curretIndex = index;
      this.$refs.tabcontrol1.curretIndex = index;
      switch (index) {
        case 0:
          return (this.currentype = "pop");
          break;
        case 1:
          return (this.currentype = "new");
          break;
        case 2:
          return (this.currentype = "sell");
          break;
      }
    },
    //位置变化的监听
    contentScroll(position) {
      // console.log(position);
      //判断位置是否大于某个值，决定回到顶部组件是否显示
       this.listenShowBackTop(position);
     // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffSetTop;
    },
    //当轮播图片加载完成之后，获取TabControl的offset的值
    swiperimgload() {
      // console.log(this.$refs.tabcontrol1.curretIndex);
    //  console.log( this.$refs.tabcontrol2);
      this.tabOffSetTop = this.$refs.tabcontrol2.$el.offsetTop;
      // console.log(this.tabOffSetTop);

    },
    //加载更多的监听
    loadMore() {
      //console.log('上拉加载更多');
      //触发该事件响应时,调用网络请求加载更多数据,但是只能加载一次，所以每次加载完之后需要停止该事件
      this.getHomeData(this.currentype);
    },
    
    /**
     * 网络请求的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeData(type) {
      //动态获取页码，提高代码复用，取出原来的page加上一个1,根据this.goods[type]获取类型对象
      const page = this.goods[type].page + 1;
      getHomeData(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //每次加载完之后停止上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  destroyed () {
    //console.log('home 销毁了');
  },
  activated () {
    //回来时立即跳转到离开时记录的位置
    // console.log('活跃')
    //先让页面刷新
    this.$refs.scroll.reFresh();
    this.$refs.scroll.goTop(0,this.saveY,0);
  },
  deactivated () {
    //在离开前记录下当前位置
   this.saveY = this.$refs.scroll.getPositionY(); 
  //  console.log(this.saveY)

  //2.取消全局监听事件
  this.$bus.$off('imgLoad',this.itemImgListener);
  }
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.homenav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; 
  z-index: 9; */
}
/* .tabcontrol {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
/* .content{
  height:calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>
