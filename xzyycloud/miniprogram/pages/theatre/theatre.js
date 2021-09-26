// pages/theatre/theatre.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityname: '未选择',
    theatreList: [],
    sword: ''  //搜索关键字 与 文本框双向数据绑定
  },
  getTheatreInfo(){
    let cityname = getApp().globalData.cityname;

    // 加载当前城市下的影院列表
    let qqmapsdk = getApp().globalData.qqmapsdk;
    
    qqmapsdk.search({
      keyword: this.data.sword + '影院',
      region: cityname,
      page_size: 10,
      success: res => {

        // 将res.data中所有的电影信息做一个简单处理
        res.data.forEach(item => {
          item.tel = item.tel.split(';')[0];
          item._distance = (item._distance / 1000).toFixed(2);
        })

        // 将res.data存入page.data中 用于列表渲染
        this.setData({
          theatreList: res.data
        })
        console.log(this.data.theatreList);
      }
    })
  },

  // 点击搜索影院地址
  tapSearch(){
    console.log(this.data.sword);
    this.getTheatreInfo();
  },
  // 点击获取影院地图信息
  tapItem(event){
    let index = event.currentTarget.dataset.index;
    console.log(index);
    let t = this.data.theatreList[index];
    console.log(t);
    let lat = t.location.lat;
    let lng = t.location.lng;
    console.log(lat, lng);
    // 以地图的方式查看该位置
    wx.openLocation({
      latitude: lat,
      longitude: lng,
      name: t.title,
      addree: t.address,
      scale: 12
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow(){
    let cityname = getApp().globalData.cityname;
    this.setData({cityname});
    this.getTheatreInfo();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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