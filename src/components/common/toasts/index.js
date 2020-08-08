import Toast from './Toast'

const obj ={};

obj.install = function(Vue) {
  //console.log('执行了obj的安装',Vue);
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);

  //2.new的方式，根据组件构造器创建一个组件对象
  const toast = new toastConstructor();

  //3.将创建的组件对象手动挂载到一个元素上
  toast.$mount(document.createElement('div'));

  //4.toast的$el就是div
  document.body.appendChild(toast.$el);
  //将通过组件构造器创建的组件对象添加到Vue原型
  Vue.prototype.$toast = toast;

}
export default obj;