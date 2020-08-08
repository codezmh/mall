<template>
  <div class='detail'>
    <detail-nav-bar class="nav-bar" @itemClick="navbarClick"
    ref ="navbar" ></detail-nav-bar>
    <scroll class="content" ref="scroll" 
    :probetype="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shops="shops"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad"/>
      <detail-params-info ref="params" :goods-params="goodsparams"/>
      <detail-comments-info ref="comments" :comments-info="commentsInfo"/>
      <goods-list ref="recommends" :goods="recommendData"/>
    </scroll>
   <detail-bottom-bar @addToCart="addCart"/>
   <back-top @click.native="backtopClick" v-show="isShowBack"/>

   <!-- <toasts :message=" message" :show="isShow"/> -->
  </div>
</template>

<script>
import DetailNavBar from './childcompos/DetailNavBar'
import DetailSwiper from './childcompos/DetailSwiper'
import DetailBaseInfo from './childcompos/DetailBaseInfo'
import DetailShopInfo from './childcompos/DetailShopInfo'
import DetailGoodsInfo from './childcompos/DetailGoodsInfo'
import DetailParamsInfo from './childcompos/DetailParamsInfo'
import DetailCommentsInfo from './childcompos/DetailCommentsInfo'
import DetailBottomBar from './childcompos/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'


import {imgageListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'

import {getDetails, Goods, Shop, GoodsParams , getRecomends} from 'network/detail'
import {mapActions} from 'vuex'
export default {
  name: 'Detail',
  //inject:['reload'],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shops:{},
      detailInfo:{},
      goodsparams:{},
      commentsInfo:[],
      recommendData:[],
      themePositionYs:[],
      getThemsY:null,
      positionY:0,
      currentIndex:0,
      //message:'',
      //isShow:false
    }
  },
  mixins: [imgageListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentsInfo,
    DetailBottomBar,

    Scroll,
    GoodsList
  },
  // watch: {
  //   '$route' (to, from) {
  //     if(to.query.id != from.query.id) {
  //       console.log(to.query.id);
  //       to.query.id ? (this.iid = to.query.id,this.init()) :{}
        
  //     }
  //   }
  // },
  created(){
    //获取传递过来的id值
    if(this.$route.query) {
      this.iid = this.$route.query.id;
      //this.init();
      //2.发送网络请求
      getDetails(this.iid).then(res => {
      //console.log(res);
      const data = res.result;
      //获取到轮播图片并保存
      this.topImages = data.itemInfo.topImages;
      //3.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //4.获取店铺信息
      this.shops = new Shop(data.shopInfo);
      //5.获取详情页的商品信息
      this.detailInfo = data.detailInfo;

      //6.获取详情页的参数信息
      this.goodsparams = new GoodsParams(data.itemParams.info, data.itemParams.rule);

      //7.获取详情页的评论信息
      if(data.rate.cRate !== 0) {
        this.commentsInfo = data.rate.list;
      }

      /*
      this.themePositionYs = [];
      this.themePositionYs.push(0);
      this.themePositionYs.push(this.$refs.params.$el.offsetTop);
      this.themePositionYs.push(this.$refs.comments.$el.offsetTop);
      this.themePositionYs.push(this.$refs.recommends.$el.offsetTop);
      console.log(this.themePositionYs);


      this.$nextTick(() =>{
        //根据最新的数据，将DOM渲染完了，但是这里面的图片还没有加载完，所以获取到的值没有把图片包含在内
        //大部分获取到的值部队都是因为图片没有加载完成
        this.themePositionYs = [];
        this.themePositionYs.push(0);
        this.themePositionYs.push(this.$refs.params.$el.offsetTop);
        this.themePositionYs.push(this.$refs.comments.$el.offsetTop);
        this.themePositionYs.push(this.$refs.recommends.$el.offsetTop);
        console.log(this.themePositionYs);
      })
      */
      });

      //通过ref指向拿到组件对应的元素获取offsetTop的值
      //获取不到，因为组件还没挂载
    }
    
    //请求推荐的数据
    getRecomends().then(res => {
      // console.log(res);
      this.recommendData = res.data.list;
    })

    //4.获取theme的Y值(给赋值操作进行防抖操作)
    this.getThemsY = debounce(() => {
      this.themePositionYs = [];
      this.themePositionYs.push(0);
      this.themePositionYs.push(this.$refs.params.$el.offsetTop);
      this.themePositionYs.push(this.$refs.comments.$el.offsetTop);
      this.themePositionYs.push(this.$refs.recommends.$el.offsetTop);
      this.themePositionYs.push(Number.MAX_VALUE);
    } , 200)
  },
  mounted () {
      // 没有数据时根组件还没有渲染
      // this.themePositionYs = [];
      // this.themePositionYs.push(0);
      // this.themePositionYs.push(this.$refs.params.$el.offsetTop);
      // this.themePositionYs.push(this.$refs.comments.$el.offsetTop);
      // this.themePositionYs.push(this.$refs.recommends.$el.offsetTop);
      // console.log(this.themePositionYs);
      // console.log(this.$refs.params);
  },
  //取消全局监听事件，因为这里也使用goodsListItem组件
  destroyed () {
    this.$bus.$off('imgLoad',this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCartList']),
    imageLoad() {
      // this.$refs.scroll.reFresh();
      //console.log('---------');
      //对监听进行防抖函数包装
      this.newrefresh();

      //在这里获取offsetTop的值,每次加载都会获取一个，所以可以使用防抖函数
      this.getThemsY();
    },
    navbarClick(index) {
      //动态获取到各个主题的offsetTop值push到数组里面
      this.$refs.scroll.goTop(0, -this.themePositionYs[index], 300)
    },
    contentScroll(position) {
      //获取到滚动的位置的y值
      this.positionY = -position.y;
      // console.log(this.positionY)
      
      this.listenShowBackTop(position);
      //2.将获取到的y值与themePositionYs比较
      //给主题所对应的Y值push一个js中的最大值来作为判断条件: Number.MAX_VALUE获取最大值
      const length = this.themePositionYs.length;
      for(let i= 0; i < length - 1; i++) {
        if(this.currentIndex !==i && (this.positionY >= this.themePositionYs[i] && this.positionY < this.themePositionYs[i+1]) ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }
      


      //为了避免多次获取值，所以使用一个currentIndex用来记录i值，当i和currentIndex的值不相等时，才记录这个i,赋值给currentIndex，在传入navbar里面 
      //这里的if判断条件过于复杂，影响代码执行效率，采用一种比较hack的做法进行改良
      /*const length = this.themePositionYs.length;
      for(let i= 0; i < length; i++) {
        if(this.currentIndex !== i && ((this.positionY >= this.themePositionYs[i] && this.positionY < this.themePositionYs[i+1]) || 
        (i === length - 1 && this.positionY >= this.themePositionYs[i]))) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.navbar.currentIndex = this.currentIndex;
        }
      }
      */
    },

    addCart() {
      //1.获取购物车页面要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.desc = this.goods.desc;
      product.title = this.goods.title;
      product.price = this.goods.realprice;
      product.id = this.iid;
      
      this.addCartList(product).then( res => {
        // console.log(res);
        // this.isShow = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.isShow = false;
        //   this.message = ''
        // }, 2000)
       this.$toast.showMessage(res, 2000);
      })
      //2.将商品添加到购物车页面
      // this.$store.commit('addCartList',product);
      //dispatch函数可以返回promise
      // this.$store.dispatch('addCartList',product).then( res => {
      //   console.log(res);
      // })
    }
  }
}
</script>
<style scoped>
  .detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
    /* 使用calc来设置内容区高度，原生的滚动还有效 */
    /* height: calc(100% - 44px -58px); */
  }
  .nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
