// pages/driver/index.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnBackData: [],
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
    this.getReturnbackData();
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

  /*
    获取商铺退桶记录
  */
 getReturnbackData() {
   let _this = this;
   App._get(
     "asset/recivePageList", 
   {wxapp_id: App.getWxappId()},
   function(res) {
     console.log(res)
    _this.setData({
      returnBackData: res.data.data
     })
   }
   )
 },

 /*
 确认收桶 */
 confirmReturn(e){
   console.log(e.target.dataset)
   let _this = this;

   let queryStr = "&token=" + wx.getStorageSync('token');
   queryStr += "&wxapp_id=" + App.getWxappId();

   let params = {};
   let temp = this.data.returnBackData.find(item => {
     return item.asset_log_id === item.asset_log_id
   })

   params.asset_log_id = temp.asset_log_id;
   params.items = temp.attach.items.map(item => {
     return {
      type: item.type,
      category_id: item.category_id,
      amount: item.category_id
     }
   })

   wx.request({
     url: App.api_root + "asset/recive" + queryStr,
     method: "POST",
     data: params,
     success: function(res){
      App.showSuccess('收桶成功')
      _this.getReturnbackData();
     }
   })
 }

 
})