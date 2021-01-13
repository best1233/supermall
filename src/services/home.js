import { request } from './request';

/**
 * 获取首页banner和recommend数据
 */
export async function getHomeMultiData() {
	const resp = await request({
		url:'/home/multidata'
	});
	return resp.data;
}

/**
 * 获取首页商品的数据	
 * @param {String} type 商品类型  
 * @param {Number} page 页码
 */
export async function getHomeGoods(type,page) {
	const resp = await request({
		url:"/home/data",
		params: {
			type,
			page
		}
	});
	return resp.data.list;
}