// pages/index/storeInformation/index.js
const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      information: App.globalData.storeInfo
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
  onShareAppMessage: function () {},

  // 点击导航
  navigateToStore() {
    let _this = this;
    let _info = _this.data.information;
    wx.openLocation({
      latitude: _info.latitude - 0,
      longitude: _info.longitude - 0,
      name: _info.shop_name
    })
  },
  // 拨打电话
  callShopkeeper() {
    wx.makePhoneCall({
      phoneNumber: '0769-22336699' //仅为示例，并非真实的电话号码
    })
  }
})