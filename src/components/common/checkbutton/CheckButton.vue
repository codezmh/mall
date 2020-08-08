<template>
  <div class='check-button' :class="{active:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  data(){
    return {
    }
  },
  props:{
    isChecked:{
      type:Boolean,
      default:false
    }
  }
}
</script>
<style scoped>
  .check-button{
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
  }
  .active{
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
