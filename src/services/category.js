import { request } from './request';

/**
 * 获取分类的数据
 */
export async function getCategory () {
	const resp = await request({
		url: '/category'
	});
	return resp.data.category.list;
}

/**
 * 获取每个分类的子数据
 * @param {Number} maitKey 父级分类的key值 
 */
export async function getSubCategory(maitKey) {
	const resp = await request({
		url: '/subcategory',
		params: {
			maitKey
		}
	});
	return resp.data.list;
}

/**
 * 获取每个分类的详情数据
 * @param {Number} miniWallkey 父级分类对应的miniWallKey
 * @param {String} type 商品类型
 */
export async function getCategoryDetail(miniWallkey,type) {
	const resp = await request({
		url: '/subcategory/detail',
		params: {
			miniWallkey,
			type
		}
	});
	return resp;
}