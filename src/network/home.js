import {request} from './request'

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}

export function getHomeData(type , page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}



// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
// function test() {
//   const names = ['why', 'aaa']
// }
//
// test()
//
// test()


let totalnums = [];
const num1 = [10,20,30];
const num2 = [20,40,60];


//将一个数组的值push到另一个数组
// for(let i of num1){
//   totalnums.push(i)
// }

totalnums.push(...num1)