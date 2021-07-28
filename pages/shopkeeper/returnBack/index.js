// pages/shopkeeper/returnBack/index.js
const App  = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rangeData: [],
    index: 0,
    amount: '',
    category_id: '',
    items: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     // let a = wx.getCurrentPages();
     // console.log(a)
     let _this = this;
     App._get(
       'asset/setting', 
       {wxapp_id: 10001},
       function(res){
         console.log(res.data.category_records)
         _this.setData({
          rangeData: res.data.category_records,
          category_id: res.data.category_records[0].category_id
         })

         console.log(_this.data.rangeData)
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

  },

  /*新增一条*/
  createMore(e) {
    let _this = this;
    let values = e.detail.value;
    console.log(values)
    let temp = [];
    temp = temp.concat(this.data.items);
    temp.push({
      type: 1,
      category_id: values.category_id,
      category_name: _this.data.rangeData.find(item => item.category_id === values.category_id).category_name,
      amount: values.amount
    })
    this.setData({
      items: temp,
      amount: ""
    })
    console.log(this.data.items)
  },

  /*submit form*/
  submitForm(e) {
    let _this = this;
    let values = e.detail.value;
    let query = "?token=" + wx.getStorageSync('token');
    query+= "&wxapp_id=" + App.getWxappId()
    let params = {
      shop_id: App.globalData.shop_id || "32",
      items: _this.data.items,
    };

    App._post_form("asset/refund"+ query, params, function(res){
      App.showSuccess('提交成功')
    })
  }
})