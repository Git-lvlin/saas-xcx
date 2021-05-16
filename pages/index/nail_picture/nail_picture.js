// pages/index2/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coordinate: {
      latitude: '',
      longitude: '',
    },
    markders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.setData({coordinate: App.globalData.coordinate})
    let _temp = App.globalData.storeList;
    _this.setData({
      markders: _temp.map((item, i) => {
        return {
          id: item.shop_id,
          latitude: item.latitude,
          longitude: item.longitude,
          height: '30',
          width: '20',
          alpha: 0,
          label: {
            content: item.shop_name,
            anchorY: -40,
            anchorX: -20,
            bgColor: '#333333',
            color: '#fff',
            padding: '5px',
            borderRadius: 4
          }
        }
      })
    })
  },


  /**
    * 查看店铺
  */
  bindlabeltap(e) {
    App.globalData.storeInfo = App.globalData.storeList.find(item => item.shop_id === e.detail.markerId)
    wx.navigateTo({
      url: '../index/storeInformation/index',
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