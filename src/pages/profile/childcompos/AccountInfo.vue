<template>
  <div class='account-info'>
    <div class="account-item">
      <div class="banance">0.00<span>元</span></div>
      <span>我的余额</span>
    </div>
    <div class="account-item">
      <div class="banance">0<span>个</span></div>
      <span>我的优惠</span>
    </div>
    <div class="account-item">
      <div class="banance">0<span>分</span></div>
      <span>我的积分</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountInfo',
  data(){
    return {}
  },
}
</script>
<style scoped>
  .account-info{
    display: flex;
  }
  .account-item{
    flex: 1;
    padding: 15px 10px;
    text-align: center;
    background-color: #fff;
    border-right: 1px solid #ccc;
  }
  .account-item:last-of-type{
    border-right: none;
  }
  .banance{
    font-size: 24px;
    color:#ff5f3e;
    font-weight: 600;
  }
  .banance span{
     color: #666;
     font-size: 13px;
     font-weight: normal;
  }
  .account-item span{
    font-size: 13px;
  }
</style>
