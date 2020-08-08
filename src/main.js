import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toasts'

Vue.config.productionTip = false;

//添加事件总线对象
Vue.prototype.$bus = new Vue();
//安装toast插件
Vue.use(toast);
//安装图片懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/lazyload/lazyLoad.jpg'),
  error: require('./assets/img/common/lazyload/err.jpg')
});

//解决移动端的300ms延迟
FastClick.attach(document.body);
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
