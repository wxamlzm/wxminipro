// index.js
// 获取应用实例
const app = getApp()
// 引入qqmap模块
// const QQMapWX = require("../../libs/qqmap-wx-jssdk.min");
// var qqmapskd = new QQMapWX({
// 	key: 'AONBZ-GGVER-T37WR-WFDOG-SWBG5-MQF3E',

// });

Page({
	data: {
		cid: 1, // 保存当前导航选中项的类别id
		movies: [], // 保存当前正在显示的电影列表
		cityname: '未选择'
	},
	// 切换城市时触发
	changeCity(){

	},
	// 切换选项卡的时候触发
	tapnav(event) {
		let id = event.target.dataset.id;

		this.setData({
			cid: id
		});

		// 判断缓存中是否已经存在当前需要访问的数据
		wx.getStorage({
			key: id,
			success: res => {
				this.setData({movies: res.data})
			},
			fail: res => {
				// 发送http请求，访问当前类别下的首页电影数据
				this.loadmovies(id, 0).then(movieList => {
					// 替换当前的列表
					this.setData({movies:movieList});
					// 同时将对应类别的 首页电影数据 存入缓存
					wx.setStorage({
						key: id,
						data: movieList
					});
				})
			}
		});
	},
	/**
	 * 异步加载电影列表
	 * @param {number} cid 类别ID
	 * @param {number} offset 查询起始条目的下标位置
	 * @return Promise 返回查询到的电影列表数组
	 */
	loadmovies(cid, offset){
		return new Promise((resolve, reject) => {
			// 显示等待框
			wx.showLoading({
				title: '加载中...',
				mask: true
			}),
			wx.request({
			  url: 'https://api.tedu.cn/index.php',
			  data: {cid, offset},
			  method: 'GET',
			  success: res => {
				//   成功的回调
				resolve(res.data);
				//   隐藏等待框
				wx.hideLoading();
			  }
			})
		})
	},
	// 生命周期方法，页面初始化加载时执行
	onLoad() {
		// 发送http请求，加载1类别下的首页电影数据
		this.loadmovies(1,0).then(movieList => {
			this.setData({movies:movieList});
		});
		let qqmapsdk = getApp().globalData.qqmapsdk;
		// 加载当前位置，通过qqmapsdk获取城市名称
		qqmapsdk.reverseGeocoder({
			success: res => {
				// 接收到回调参数，改变界面ui
				let cityname = res.result.address_component.city;
				this.setData({cityname});
				getApp().globalData.cityname = cityname;
			}
		});

	},
	onShow(){
		// 从globaldata中获取cityname，更新左上角即可
		let cityname = getApp().globalData.cityname;
		this.setData({cityname});
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
	},
	// 当下拉刷新后将自动调用该方法
	onPullDownRefresh() {
		// 发送请求加载当前类别下的第一页数据
		let cid = this.data.cid;
		let offset = 0;

		this.loadmovies(cid, offset).then(movieList => {
			// 替换当前列表
			this.setData({movies:movieList});
			// 覆盖更新缓存
			wx.setStorage({
				key: `${cid}`,
				data: movieList
			})
			// 停止下拉刷新
			wx.stopPullDownRefresh();
		});
	}
})