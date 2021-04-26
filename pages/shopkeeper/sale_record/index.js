// pages/shopkeeper/sale_record/sale_record.js
const App = getApp();
let sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["全部","未配送", "配送中", "已配送"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          sliderLeft: (res.windowWidth / _this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / _this.data.tabs.length * _this.data.activeIndex
        });
      }
    });

    _this.getOrder();
  },

  /* 
  tab页切换
  */
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /* 
    获取水店的订单
  */ 

  getOrder(){
    let _this = this;
    App._get(
      'shop.order/pageList',
       {
      wxapp_id: App.getWxappId(),
      token: wx.getStorageSync('token'),
      shop_id: '22',
      data_type: 'all',
      page: 1,
      listRows: 10},
      function(res){
        _this.setData({
          orderList: res.data.list.data
        })
        console.log(res)
      }
    )
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