// 引入qqmap模块
const QQMapWX = require("./libs/qqmap-wx-jssdk.min");
var qqmapsdk = new QQMapWX({
	key: 'AONBZ-GGVER-T37WR-WFDOG-SWBG5-MQF3E',
});

// app.js
App({
  onLaunch() {
    // 初始化云环境
    wx.cloud.init({
      env: 'cloud1-8g6xqy511118a113'
    });
  },
  // 全局对象存储区
  // 在页面中：获取globalData
  // getApp().globaData
  // 存数据： getApp.globalData.userinfo = xx
  // 取数据： let u = getApp().globalData.userInfo

  globalData: {
    userInfo: null,
    cityname: '未选择',
    qqmapsdk
  }
})
