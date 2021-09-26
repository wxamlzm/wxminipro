// pages/movie/movie.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movieDetail:{},
        isOpen: false  // 保存当前电影描述是否是展开状态
    },
    // 点击简介触发，展开描述
    showDes(){
        this.setData({isOpen: !this.data.isOpen});
        console.log(this.data.isOpen);
    },
    // 点击缩略图显示大图
    tapImage(event){
        // 获取当前选项中的idx
        let index = event.target.dataset.idx;
        // 需要进行大图浏览的图片组
        let urls = this.data.movieDetail.thumb;

        // 处理图片，将路径的@符号后的部分删掉，变成高清大图
        let newUrls = [];
        urls.forEach( item => {
            let url =item.substring(0, item.lastIndexOf('@'));
            newUrls.push(url);
        });

        let curr = newUrls[index];
        wx.previewImage({
          urls: newUrls,
          current: curr
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.id;
        console.log(id);
        wx.request({
          url: `https://api.tedu.cn/detail.php?id=${id}`,
          method: 'GET',
          success: res => {
              this.setData({movieDetail: res.data});
              console.log(this.data.movieDetail);
          }
        })
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