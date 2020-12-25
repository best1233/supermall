import { request } from './request';

export async function getHomeMultiData() {
	const resp = await request({
		url:'/home/multidata'
	})
	return resp.data;
}

// export async function 