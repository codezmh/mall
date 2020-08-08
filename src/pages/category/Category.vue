<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <category-menu :list="list"
                @itemClick="menuClick"/>

      <scroll id="tab-content"
              ref="scroll"
              :probetype="3">
        <div>
          <tab-content-category :subcategories="showSubcategory"/>
          <tab-control :title="title" 
          @itemClick="tabClick"/>
          <goods-list :goods="showCategroyDetail"></goods-list>
        </div>
      </scroll> 
    </div>
  </div>
</template>

<script>
import CategoryMenu from './childcompoes/CategoryMenu'
import TabContentCategory from './childcompoes/TabContentCategory'


import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {POP,NEW,SELL} from 'common/const'
import {getCategoryData, getSubCategroyData, getCategoryDetail} from 'network/category'
export default {
  name: "Catagory",
  data() {
    return {
      list:[],
      currentIndex: -1,
      //存储分类数据
       categoryData: {
      },
      title:['综合','新品','销量'],
      currentType:'pop',
      saveY:0,
    }
  },
  components: {
    CategoryMenu,
    TabContentCategory,

    NavBar,
    Scroll,
    TabControl,
    GoodsList
  },
  
  created() {
    //1.请求分类数据
    this._getCategoryData();

    //监听图片加载完成
    this.$bus.$on('imgLoad',() => {
      this.$refs.scroll. reFresh();
    })

  },
  computed: {
    showSubcategory() {
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategroyDetail() {
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    }
  },
  methods: {
    _getCategoryData() {
		   getCategoryData().then(res => {
		      // 1.获取分类数据
		      this.list = res.data.category.list
			    console.log(res);
			    // 2.初始化每个类别的子数据
          for (let i = 0; i < this.list.length; i++) {
            this.categoryData[i] = {
              //分类数据的子分类项
              subcategories: {},
              //分类数据的详细信息
              categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }
          // 3.请求第一个分类的数据
          this._getSubCategroyData(0);
        })
      },
      _getSubCategroyData(index) {
        this.currentIndex = index;
        //console.log( this.currentIndex);
		    const mailKey = this.list[index].maitKey;
        getSubCategroyData(mailKey).then(res => {
          //获取分类的信息
          this.categoryData[this.currentIndex].subcategories = res.data
          //将所有的分类信息进行合并
          this.categoryData = {...this.categoryData}
          //console.log(this.categoryData);
          this._getCategoryDetail(POP)
          this._getCategoryDetail(SELL)
          this._getCategoryDetail(NEW)
        })
      },
      _getCategoryDetail(type) {
          // 1.获取请求的miniWallkey
          const miniWallkey = this.list[this.currentIndex].miniWallkey;
          //2.发送数据请求
           getCategoryDetail(miniWallkey,type).then(res =>{
          // 3.将获取的数据保存下来
		      this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
           })
      },
      /**
       * 事件响应相关的方法
       */
      menuClick(index) {
        //console.log(index);
        // console.log(typeof index);
        this._getSubCategroyData(index)
      },
      tabClick(index) {
        // console.log(index);
        switch(index) {
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
      }
    },
    activated () {
    //回来时立即跳转到离开时记录的位置
    // console.log('活跃')
    //先让页面刷新
    this.$refs.scroll.reFresh();
    this.$refs.scroll.goTop(0,this.saveY,0);
    },
    deactivated () {
      //记录离开时的位置
      this.saveY = this.$refs.scroll.getPositionY();
      //console.log(this.saveY) ;
    },

}
</script>
<style scoped>
  #category{
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .content {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }

  #tab-content {
    height: 100%;
    flex: 1;
  }
</style>