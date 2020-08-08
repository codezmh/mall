import {debounce} from './utils'

export const imgageListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newrefresh: null,
    }
  },
  mounted () {
    this.newrefresh = debounce(this.$refs.scroll.reFresh,100);
    this.itemImgListener = () =>{
      this.newrefresh()
    };
    this.$bus.$on('imgLoad',this.itemImgListener);
    // console.log('我是混入中的内容')
  }
}

import BackTop from "components/common/backtop/BackTop"
export const backTopMixin = {
  data() {
    return {
      isShowBack:false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backtopClick() {
      //console.log(this.$refs.scroll);
      this.$refs.scroll.goTop(0,0,500);
      // console.log( this.$refs.scroll);
    },
    listenShowBackTop(position){
      this.isShowBack = (-position.y) > 2000;
    },
  }
}