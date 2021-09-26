// 引入qqmap模块
const QQMapWX = require("../../libs/qqmap-wx-jssdk.min");
var qqmapskd = new QQMapWX({
	key: 'AONBZ-GGVER-T37WR-WFDOG-SWBG5-MQF3E',

});

// pages/citylist/citylist.js
const citymap = require('../../libs/map');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        citymap:citymap, // 将加载到的静态数据存入data
        scrollIndex: 'A',
        cityname: '定位中...',
        loced: false     // 用于保存是否已经完成定位
    },
    // 点击重新定位获取城市名称
    tapCityName(){
        if(!this.data.loced){
            // 如果未定位成功则重新定位
            this.loadLocation();
        }else{
            // 如果定位成功，选中当前城市，返回上一页
            let cn = this.data.cityname;
            getApp().globalData.cityname = cn;
            wx.navigateBack();
        }

    },
    // 弹除定位授权对话框
    showLocAuthDialog(){
        wx.showModal({
            title: '',
            content: '尚未拥有定位权限，是否前往位置授权页面重新授权?',
            success: res => {
                if(res.confirm){
                    wx.openSetting({
                        success: openSettingRes => {
                            console.log(openSettingRes);
                            // 若发现用户已经授予权限，则重新定位
                            if(openSettingRes.authSetting[`scope.userLocation`]){
                                this.loadLocation();
                            }
                        }
                    })
                }
            }
        });
    },
    // 获取当前位置
    loadLocation(){
		// 加载当前位置，通过qqmapsdk获取城市名称
		qqmapskd.reverseGeocoder({
			success: res => {
				// 接收到回调参数，改变界面ui
				let cityname = res.result.address_component.city;
				this.setData({cityname, loced:true});
                getApp().globalData.cityname = cityname;
            },
            fail: err => {
                console.warn(err);
                if(err.status == 1000){
                    this.setData({cityname: '定位失败，点击重试'});
                    // 弹出对话框提醒用户需要重新授予权限
                    this.showLocAuthDialog();
                }
            }
		});
    },
    // 点击城市列表项时
    tapItem(event){
        // currentTarget当前绑定该事件的事件源 view
        // view 上有data-city， 所以可以直接获取绑定的城市名
        let city = event.currentTarget.dataset.city;
        console.log(city);
        getApp().globalData.cityname = city;
        wx.navigateBack();
    },
    // 触摸导航栏的空方法，防止穿透
    touchmove(){

    },
    // 点击导航栏时触发
    tapRightNav(event){
        let letter = event.target.dataset.letter;
        this.setData({scrollIndex: letter});
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 加载当前位置，更新城市名称
        this.loadLocation();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})