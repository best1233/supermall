import { request } from './request';

/**
 * 获取商品的详情
 * @param {String} iid 商品的iid
 */
export async function getDetail(iid) {
	const resp = await request({
		url: '/detail',
		params: {
			iid
		}
	});
	return resp.result;
}

/**
 * 获取推荐数据
 */
export async function getRecommend() {
	const resp = await request({
		url:'/recommend'
	});
	return resp.data.list;
}

// 把后台返回的杂乱无章的数据整合成一个对象,用于前端展示
/**
 * 商品基本信息类
 */
export class Goods {
	constructor(itemInfo,columns,services) {
		this.title = itemInfo.title;
		this.desc = itemInfo.desc; // 商品描述，用于购物车展示
		this.oldPrice = itemInfo.oldPrice; // 原价
		this.newPrice = itemInfo.price; // 折扣价
		this.realPrice = itemInfo.lowNowPrice; // 最低价格，没有单位，用于购物车计算
		this.discountDesc = itemInfo.discountDesc;
		this.discountBgColor = itemInfo.discountBgColor;
		this.columns = columns;
		this.services = services;
	}
}
/**
 * 商品店铺信息类
 */
export class Shop {
	constructor(shopInfo) {
		this.logo = shopInfo.shopLogo;
		this.name = shopInfo.name;
		this.fans = shopInfo.cFans; //粉丝数量
		this.sells = shopInfo.cSells; // 总销量 
		this.goodsCount = shopInfo.cGoods;
		this.score = shopInfo.score;
	}
}
/**
 * 商品参数信息类
 */
export class GoodsParams {
	constructor(info,rule) {
		// 注意: info.images可能没有值(某些商品有值，某些没有值)
		this.image = info.images ? info.images[0] : ''
		this.infos = info.set;
		this.sizes = rule.tables;
	}
}