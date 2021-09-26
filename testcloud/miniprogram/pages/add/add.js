// pages/add/add.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    /**
     * 查询多条数据
     */
    selectMul(){
        let db = wx.cloud.database();
        db.collection('testdb')
          .where({married: false})
          .get()
          .then(res=> console.log(res));
    },
    /**
     * 通过id查询一条数据
     */
    selectOne(){
        let db = wx.cloud.database();
        db.collection('testdb')   // 返回集合
          .doc('14139e12614be8ec0e8ae041373ed8d4')  // 返回记录
          .get()        // 返回promise
          .then(res => console.log(res));
    },
    /** 添加一条记录 */
    tapAdd(){
        // 获取db 
        let db = wx.cloud.database();
        // 获取collection
        // 调用add方法添加
        db.collection('testdb').add({
            data: {name: '王八', age: 13},
            success: (res) => {
                console.log(res);
            }
        });
    },
    /** 添加一条评论 */
    tapAddComment(){
        let data = {
            movieid: 1,
            name: '王小二',
            avatar: '1.jpg',
            content: '这部电影太垃圾了了，看了一半出来了!'
        };
        // 插入数据库
        let db = wx.cloud.database();
        // 获取collection

        db.collection('testdb').add({data}).then(res => console.log(res));
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