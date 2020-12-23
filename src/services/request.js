import axios from "axios";

// 创建axios实例
const instance = axios.create({
  baseURL: "http://152.136.185.210:8000/api/w6",
  timeout: 5000,
});

// 配置请求和响应拦截
instance.interceptors.request.use(config => {
	return config;
},err => {
	return err;
});

instance.interceptors.response.use(response => {
	return response.data;
},err => {
	console.log('来到了response拦截failure中');
	console.log(err);
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = '请求错误';
				break;
			case 401:
				err.message = '未授权的访问'
		}
	}
})

export default instance;
