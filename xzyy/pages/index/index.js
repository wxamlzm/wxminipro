// index.js
// 获取应用实例
const app = getApp()

Page({
	data: {
		cid: 1, // 保存当前导航选中项的类别id
		movies: [] // 保存当前正在显示的电影列表
	},
	tapnav(event) {
		let id = event.target.dataset.id;
		this.setData({
			cid: id
		});
		// 发送http请求，访问当前类别下的首页电影数据
		this.loadmovies(id, 0).then(movieList => this.setData({movies:movieList}))
	},
	/**
	 * 异步加载电影列表
	 * @param {number} cid 类别ID
	 * @param {number} offset 查询起始条目的下标位置
	 * @return Promise 返回查询到的电影列表数组
	 */
	loadmovies(cid, offset){
		return new Promise((resolve, reject) => {
			wx.request({
			  url: 'https://api.tedu.cn/index.php',
			  data: {cid, offset},
			  method: 'GET',
			  success: (res) => resolve(res.data)
			})
		})
	},
	// 生命周期方法，页面初始化加载时执行
	onLoad() {
		// 发送http请求，加载1类别下的首页电影数据
		this.loadmovies(1,0).then(movieList => this.setData({movies:movieList}))
	},

	// 当页面触底时执行该方法
	onReachBottom() {
		console.log('reach');
		// 整理参数：cid， offect， 发送http请求，并获取响应，增加列表
		let cid = this.data.cid;
		let offset = this.data.movies.length;

		this.loadmovies(cid, offset).then( movieList => {
			let movies = this.data.movies;
			movies.push(...movieList);
			this.setData({movies})
		})
	}
})