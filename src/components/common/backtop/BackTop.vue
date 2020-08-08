<template>
  <div class='backtop'>
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
  }
}
</script>
<style scoped>
  .backtop{
    position: fixed;
    right:6px;
    bottom:50px;
  }
  .backtop img{
    width:45px;
    height: 45px;
  }
</style>
