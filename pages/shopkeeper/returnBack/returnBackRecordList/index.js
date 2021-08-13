// pages/shopkeeper/returnBack/returnBackRecordList/index.js
const App = getApp();
Page({

 /**
   * 页面的初始数据
   */
  data: {
    dataType: '0', // 列表类型
    list: [], // 订单列表
    scrollHeight: null, // 列表容器高度
    no_more: false, // 没有更多数据
    isLoading: true, // 是否正在加载中
    recordData: [],
    page: 1, // 当前页码
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
   this.getRecordList();
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

  /**
   * 切换标签
   */
  bindHeaderTap(e) {
    this.setData({
      dataType: e.currentTarget.dataset.type,
      list: {},
      isLoading: true,
      page: 1,
      no_more: false,
    });
    this.getRecordList();
  },

  /**/
  removeRecord(e) {
    let _this = this;
    let id = e.currentTarget.dataset.id;
    
    if(id === "" || id === undefined || id === null) {
      return;
    }
    let query = "&token=" + wx.getStorageSync('token');
    query+="&wxapp_id=" + App.getWxappId()
    let fullUrl = App.api_root + 'asset/delete' + query;
    wx.request({
      url: fullUrl,
      method: "POST",
      data: {
        asset_log_id: id,
      },
      success(res) {
        console.log(res)
        if(res.data.code === 1) {
          App.showSuccess('删除成功')
        } else {
          App.showSuccess(res.data.msg)
        }
        App.showSuccess(res.data.msg)
        let temp = _this.data.recordData.filter(item => item.asset_log_id !== id)
        _this.setData({
          recordData: temp
        })
        _this.getRecordList();
      }
    })
  },

  /**/
  getRecordList() {
    let _this = this;
    let fullUrl = App.api_root + "asset/pageList";
    wx.request({
      url: fullUrl,
      data: {
        token: wx.getStorageSync('token'),
        wxapp_id: App.getWxappId(),
        shop_id: App.globalData.shop_id,
        status: this.data.dataType,
      },
      method: "GET",
      success(res) {
    
        _this.setData({
          recordData: res.data.data.data
        })
       
      },
      fail(err) {
        console.error(err)
      }
    })
  }
})