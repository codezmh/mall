<template>
  <div class='navbar'>
    <nav-bar class="detailnav">
      <div slot="left" class="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div class="titles-item" 
        v-for="(item,index) in titles"
        :class="{active: index === currentIndex}"
        @click="itemClick(index)">{{item}}</div>
        <h2></h2>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
export default {
  name: 'DetailNavBar',
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex: 0,
    }
  },
  components: {
    NavBar
  },
  created(){},
  mounted(){},
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick",index);
    },
    backClick() {
      this.$router.back();
    }
  }
}
</script>
<style scoped>
  .titles{
    display: flex;
    font-size: 13px;
  }
  .titles-item{
    flex:1
  }
  .active{
    color:var(--color-high-text);
  }
  .left img{
    margin-top: 12px;
  }
</style>
