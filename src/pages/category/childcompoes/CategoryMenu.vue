<template>
<scroll class="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item" :class="{active:currentIndex === index}" 
      @click="itemClick(index)"
      v-for="(item,index) in list">{{item.title}}</div>
    </div>
</scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'CategoryMenu',
  data(){
    return {
      currentIndex:0,
    }
  },
  components: {
    Scroll
  },
  props: {
    list:{
      type:Array,
      default() {
        return {}
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // console.log(index);
      this.$emit('itemClick',index);
    }
  }
}
</script>
<style scoped>
  .tab-menu{
    font-size:16px;
    background-color: #f6f6f6;
    height:100%;
    width:100px;
  }
  .menu-list-item{
    text-align: center;
    height: 45px;
    line-height: 45px;
  }

  .menu-list-item.active{
    background-color: #fff;
    color: var(--color-high-text);
    border-left:2px solid var(--color-high-text);
    font-weight: 700;
  }
</style>
