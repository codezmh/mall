<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view ></router-view>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  },
  // provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
  //     return {
  //       reload: this.reload                                              
  //   }
  // },
  // data() {
  //   return{
  //     isRouterAlive: true                    //控制视图是否显示的变量
  //   }
  // },
  // methods: {
  //   reload() {
  //     this.isRouterAlive = false;
  //     this.$nextTick(function () {
  //       this.isRouterAlive =true;
  //     })
  //   }
  // }
}
</script>

<style scoped>
  @import 'assets/css/base.css'
</style>
