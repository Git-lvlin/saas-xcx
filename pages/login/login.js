const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    mobile_acquired: false,
    userinfo_acquired: false,
    options: {
    },
    show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    console.log('onLoad1', typeof(_this.data), _this.data)
    _this.setData({
      options: options,
      isLogin: App.checkIsLogin(),
      mobile_acquired: App.checkMobileAcquired(),
      userinfo_acquired: App.checkUserinfoAcquired(),
    });
    console.log('onLoad2', typeof(_this.data), _this.data)
  },

  getPhoneNumber(e) {
    let _this = this;
    //同意授权
    App.getPhoneNumber(e, (res) => {
      if(res.data.userinfo_acquired){
        // 跳转回原页面
        _this.onNavigateBack(1);
      }else{
        this.setData({
          show: true
        });
      }
    });
  },

  /**
   * 授权登录
   */
  getUserInfo(e) {
    if (!App.checkMobileAcquired()) {
      App.showError('请先授权微信绑定的手机号');
      return;
    }
    let _this = this;
    App.getUserInfo(e, () => {
      // 跳转回原页面
      _this.onNavigateBack(1);
    });
  },

  /**
   * 暂不登录
   */
  onNotLogin() {
    let _this = this;
    // 跳转回原页面
    wx.navigateBack({
      delta: Number(_this.data.options.delta || 1)
    });
  },

  /**
   * 授权成功 跳转回原页面
   */
  onNavigateBack(delta) {
    let _this = this;
    _this.setData({
      options: _this.data.options,
      isLogin: App.checkIsLogin(),
      mobile_acquired: App.checkMobileAcquired(),
    });
    console.log('this.data', this.data)
    if (App.checkIsLogin() && App.checkMobileAcquired()) {
      wx.navigateBack({
        delta: Number(delta || 1)
      });
    }
  },

})
