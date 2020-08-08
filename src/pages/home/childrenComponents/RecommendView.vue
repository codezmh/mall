<template>
  <div class='recomview'>
    <div class="recomview-item" v-for="item in  recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends:{
      type:Array,
      default() {
        return []
      }
    }
  },
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
  .recomview{
    display: flex;
    width:100%;
    text-align: center;
    font-size:12px;
    padding: 15px 0 25px 0;
    border-bottom:8px solid #eee;
  }
   .recomview-item{
     flex:1;
   }
  .recomview-item img{
    width:70px;
    height:70px;
    margin-bottom: 5px;
  }
</style>
