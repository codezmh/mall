<template>
  <div class='toasts' v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data(){
    return {}
  },
  props:{
    // message:{
    //   type:String,
    //   default:''
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data() {
    return {
      message:'',
      isShow: false
    }
  },
  methods: {
    showMessage(message="默认文字", time= 2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message ='';
      }, time)
    }
  }
}
</script>
<style scoped>
  .toasts{
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,.7);
    color:#fff;
    padding: 8px 10px;
    border-radius: 5px;
    z-index:999;
  }
</style>
