// pages/sale-men/task-flow.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gallery: false,
    task_object: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({task_object: options.task})
  },

  close: function() {
    this.setData({
        gallery: false,
    });
},

open: function () {
    this.setData({
        gallery: true
    });
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

  },

  previewImage: function() {
    wx.previewImage({
      current: 'https://file.wsd168.com/upload/CustomPicture/2021-05-29/6375790580712102591bogpfnj.png',
      urls: ['https://file.wsd168.com/upload/CustomPicture/2021-05-29/6375790580712102591bogpfnj.png']
    })
  },
})