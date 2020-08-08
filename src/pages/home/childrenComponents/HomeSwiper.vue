<template>
  <div>
    <swiper>
        <swiper-item v-for="item in banners">
          <a :href="item.link" >
            <img :src="item.image" alt="" @load="SwiperImgLoad">
          </a>
        </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'
export default {
  name: 'HomeSwiper',
  props: {
    banners:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  created(){},
  mounted(){},
  methods: {
    SwiperImgLoad() {
    //让事件只发送出去一次，因为一次就可以获取到高度
      if(!this.isLoad) {
         this.$emit('SwiperImgLoad');
         this.isLoad = true;
      }
    }
  }
}
</script>
<style scoped>
</style>
