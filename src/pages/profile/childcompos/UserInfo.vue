<template>
  <div class='user-info'>
    <div class="img-logo">
      <img src="~assets/img/profile/avatar.svg" alt="">
    </div>
    <div class="info">
      <div class="login">登录/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
     <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data(){
    return {}
  },
}
</script>
<style scoped>
  .user-info{
    display: flex;
    background-color: var(--color-tint);
    height: 85px;
    padding: 5px 15px;
  }
  .img-logo img{
    width:70px;
    height:70px;
  }
  .info{
    color: #fff;
    padding-left: 15px;
    flex: 1;
  }
  .info .login{
    margin-top: 16px;
  }
  .phone img{
    width: 20px;
    height: 30px;
    vertical-align: middle;
    margin-left: -5px;
  }
  .phone span{
    font-size: 12px;
  }
  .arrow{
    width:30px;
    line-height: 100px;
  }
  .arrow img{
    width:80%;
  }
</style>
