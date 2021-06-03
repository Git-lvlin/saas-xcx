// pages/user/cash-pledge/reback-pledge.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accounts: ['微信', '银行卡', '支付宝'],
    accountIndex: 0,
    selectedShopId: '',
    shopName: '请选择门店',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getShopList();
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
    this.setData({
      shopName: App.globalData.shopInfo.shop_name
    })
      console.log(App.globalData.shopInfo)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取门店列表
   */
  getShopList() {
    let _this = this;
    _this.setData({
      isLoading: true
    });
    App._get('shop/lists', {
      longitude: App.globalData.coordinate.longitude ||  23.020893,
      latitude: App.globalData.coordinate.latitude || 113.751884,
    }, (result) => {
      console.log(result.data.list)
      _this.setData({
        shopList: result.data.list,
        isLoading: false
      });
    });
  },

  /*
  * 退桶申请
  */
  toApplyReturnCanBucket() {
    let url = 'user.Deposit/refundApply';
    url+='?wxapp_id='+App.getWxappId();
    url+='&token='+wx.getStorageSync('token')
    App._post_form(
      url, 
      {
        deposit_id: '',
        shop_id: App.globalData.shopInfo.shop_id},
        function(res) {
          App.showSuccess('申请成功')
        }
      )
  }
})