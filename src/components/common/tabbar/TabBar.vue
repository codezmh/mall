<template>
    <div class="tabbar">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style scoped>
  .tabbar{
    display: flex;
    height:49px;
    position:fixed;
    bottom:0;
    left: 0;
    right: 0;
    background-color: #f6f6f6;
    box-shadow: 0px -1px 10px rgba(100,100,100,0.3);
  }
</style>
