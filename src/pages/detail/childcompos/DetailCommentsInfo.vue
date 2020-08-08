<template>
  <div class='comment' v-if="Object.keys(commentsInfo).length !==0">
    <div class="header">
      <span class="usercontent">用户评价</span>
      <span class="know-more">更多</span>
    </div>
    <div v-for="(item,index) in commentsInfo" :key="index">
      <div class="user-info">
        <img :src="item.user.avatar" alt="">
        <span>{{item.user.uname}}</span>
      </div>

      <div class="comments-info">
        <p>{{item.content}}</p>
        <div class="other-info">
          <span class="date">{{item.created | showDate}}</span>
          <span>{{item.style}}</span>
        </div>
      </div>
      <div class="img-info">
        <img :src="inner" v-for="(inner,indey) in item.images" :key="indey" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
  name: 'DetailCommentsInfo',
  props:{
    commentsInfo:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {}
  },
  filters: {
    showDate(value) {
      //1.将传进来的数据转化为date对象
      const date = new Date(value * 1000);
      //2.将传进来的数据转化为自己的格式
      return formatDate(date , 'yyyy-MM-dd hh:mm:ss');
    }
  }
}
</script>
<style scoped>
  .comment{
     padding: 15px 15px;
     font-size: 14px;
     border-bottom: 5px solid #f2f5f8;
  }
  .comment .header{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
    padding: 0 0 10px;
    font-size: 15px;
    color:#222;
  }
  .comment .header .usercontent{
    float: left;
  }
  .comment .header .know-more{
    float: right;
    margin-right: 10px;
  }

  .user-info{
    padding: 10px 0 5px;
  }
  .user-info img{
    width:50px;
    height: 50px;
    border-radius: 50%;
  }
  .user-info span{
    color:#222;
    font-size: 16px;
    position: relative;
    top:-17px;
    padding-left:10px;
  }
  .comments-info{
    padding: 5px 0 10px;
  }
  .comments-info p{
    font-size:14px;
    line-height: 20px;
    padding-bottom:5px;
    color: rgb(68, 67, 67);
  }
  .comments-info .other-info{
    font-size:13px;
  }
  .comments-info .other-info .date{
    padding-right: 8px;
  }
  .img-info img{
    width:70px;
    height:70px;
    margin-right: 5px;
  }
</style>
