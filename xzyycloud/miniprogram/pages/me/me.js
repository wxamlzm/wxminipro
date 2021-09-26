// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      nickName: '点击登录',
      avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
      isLogin: false
  },
  // 注册用户
  regist(userInfo){
    let db = wx.cloud.database();
    // 
    db.collection('users')
      .add({data:userInfo})
      .then(res => console.log(res));
  },
  // 点击登录
  tapLogin(){
    if(this.data.isLogin){return;}
    // 获取用户信息
    wx.getUserProfile({
      desc: '您的信息将用于完善会员系统',
      success: res => {
        console.log(res);

        wx.cloud
          // 调用云函数，获取用户的openid
          .callFunction({name: 'getOpenid'})
          .then(getOpenidRes => {
            console.log(getOpenidRes);
            let openid = getOpenidRes.result.openid;
            // 将openid存入globaldata，以作为其他功能使用
            getApp().globalData.openid = openid;

            // 判断当前openid是否已经注册
            // 若第一次登录则执行云函数，新增到云数据库
            let db = wx.cloud.database();

            db.collection('users')
              .where({"_openid": openid})
              .get()
              .then(queryRes => {
                console.log('queryRes',queryRes)
                if(queryRes.data.length > 0){
                  // 若找到了数据，更新最新的头像与昵称
                  this.setData({
                      nickName:queryRes.data[0].nickName,
                      avatar: queryRes.data[0].avatarUrl,
                      isLogin: true // 已经登录
                  });
                }else{
                  // 若第一次登录则执行注册，新增到云数据库
                  this.regist(res.userInfo);
                }
              })
          })
      },
    })
  },
  // 点击头像后执行
  tapAvatar(){
    if(!this.data.isLogin){return;} // 没有登录直接返回
    // 选择图片
    wx.chooseImage({
      count: 1, //最多选1张图
      success: res => {
        console.log(res);
        // 选中的文件路径
        let path = res.tempFilePaths[0];
        this.setData({
            avatar: path
        })
        // 将选择的图片，上传到服务器，获取访问连接
        // 然后将访问连接存入users云数据库集合中更新
        this.upload(path);
      }
    })
  },
  /**
   * 
   */
  upload(path){
    // 通过path 生成一个新的cloudPath 用于存入云存储空间
    let ext = path.substring(path.lastIndexOf('.'));
    let cloudPath = `img_${Math.random() + ext}`;

    wx.cloud.uploadFile({
      filePath: path,
      cloudPath: cloudPath,
      success: res => {
        console.log(res);
        let fileID = res.fileID;
        // 然后将访问连接存入users云数据库集合中
        let openid = getApp().globalData.openid;
        let db = wx.cloud.database();

        db.collection('users')
          .where({_openid: openid})
          .update({data:{avatarUrl: fileID}})
          .then(updateRes => {
            console.log(updateRes);
          })
      }
    })
  },
  // tapTestCloudFunction(){
  //   console.log('云函数');
  //   wx.cloud.callFunction({
  //     name: 'add', //目标云函数名称 add
  //     data: {
  //       a: 100, b: 50  // 传递参数
  //     }
  //   }).then(res => console.log(res))
  // },
  // 触发双击事件
  doubletapEvent(){
    console.log('么么哒');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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