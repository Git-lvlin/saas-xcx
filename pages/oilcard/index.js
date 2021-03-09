const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //
    page: [],

    // show
    notcont: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 当前页面参数
    this.data.options = options;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取优惠券列表
    this.getPagelist();
  },

  /**
   * 获取优惠券列表
   */
  getPagelist: function() {
    let _this = this;
    App._get('oilcard.Oilcard/page', {listRows: 2}, function(result) {
      _this.setData({
        page: result.data.data,
        notcont: !result.data.total
      });
    });
  },


  /**
   * 绑定油卡
   */
  bindOilcardPage: function() {
    wx.navigateTo({
      url: './bind?'
    })
  },

  editOilcard: function(e) {
    var oilcard_id = e.currentTarget.dataset.oilcard_id;
    var oilcard_type = e.currentTarget.dataset.oilcard_type;
    var oilcard_number = e.currentTarget.dataset.oilcard_number;
    var remark = e.currentTarget.dataset.remark;

    var query = 'oilcard_id=' + oilcard_id + '&oilcard_type=' + oilcard_type + '&oilcard_number=' + oilcard_number + '&remark=' + remark
    console.log(query)
    wx.navigateTo({
      url: './bind?' + query
    })
  },

  oilcardRecharge: function(e) {
    console.log('e ', e)
    var oilcard_id = e.currentTarget.dataset.oilcard_id;
    var oilcard_type = e.currentTarget.dataset.oilcard_type;
    var oilcard_number = e.currentTarget.dataset.oilcard_number;
    var remark = e.currentTarget.dataset.remark;

    var query = 'oilcard_id=' + oilcard_id + '&oilcard_type=' + oilcard_type + '&oilcard_number=' + oilcard_number + '&remark=' + remark
    // var query = 'oilcard_id=' + oilcard_id
    console.log(query)
    wx.navigateTo({
      url: './recharge?' + query
    })
  },
});
