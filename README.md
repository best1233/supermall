# supermall

> 学习coderwhy的商城项目,如果觉得不错，或者对你有帮助，点一个star~ 

## 知识点总结

### 一. 划分目录结构

* 1.1 引用了两个css文件
* 1.2 vue.config.js和.editorconfig


### 二. 项目的模块划分: tabbar -> 路由映射关系
* 独立组件封装 TabBar -> TabBarItem -> MainTabBar


### 三. 首页开发

### 3.1 navbar 的封装

	* slot 

### 3.2 网络数据的请求

	* 单独在services下创建 home.js, 进行请求的单独处理

### 3.3 轮播图 

	* 对已有组件再次进行封装 HomeSwiper

### 3.4 推荐信息 

	* 一张图片也写成一个单独的组件 RecommendView

### 3.5 FeatureView
	* 独立组件封装FeatureView
		* div>a>img

### 3.6 TabBar
## 项目运行

clone项目：

```
git clone https://github.com/perfect4255/supermall.git
```

安装项目依赖：

```shell
npm install
```

项目运行：

```shell
npm run serve
```
