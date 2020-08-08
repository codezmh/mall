import {request} from './request'


export function getDetails(iid) {
  return request({
    url:'/detail',
    params:{
      iid,
    }
  })
}

export function getRecomends() {
  return request({
    url:'/recommend'
  })
}
export class Goods{
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.bgColor = itemInfo.discountBgColor;
    this.realprice = itemInfo.lowNowPrice; 
  }
}

export class Shop{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.GoodsCount = shopInfo.cGoods;
  }
}


export class GoodsParams{
  constructor(info,rule) {
    this.image = info.images ? info.images[0] :'';
    this.set = info.set;
    this.tables = rule.tables;
  }
}