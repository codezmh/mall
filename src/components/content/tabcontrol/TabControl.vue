<template>
  <div class='tabcontrol'>
    <div v-for="(item,index) in title" 
      class="tabcontrol-item"
      :class="{active:index == curretIndex}"
      @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    title:{
      type:Array,
      default() {
        return [];
      }
    }
  },
  data(){
    return {
      curretIndex:0,
    }
  },
  methods: {
    itemClick(index) {
      this.curretIndex = index;
      this.$emit('itemClick', index)
    }
  }
}
</script>
<style scoped>
  .tabcontrol{
    display:flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size:15px;
    background-color: #fff;
  }
  .tabcontrol-item{
    flex:1;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
      border-bottom: 2px solid var(--color-tint);
      padding: 4px;
  }
</style>
