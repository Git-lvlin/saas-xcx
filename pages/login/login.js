const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    mobile_acquired: false,
    userinfo_acquired: false,
    show: false,
    options: {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    _this.setData({
      options: options,
      isLogin: App.checkIsLogin(),
      mobile_acquired: App.checkMobileAcquired(),
      userinfo_acquired: App.checkUserinfoAcquired(),
    });
  },

  getPhoneNumber(e) {
    console.log("🚀 ~ file: login.js:30 ~ getPhoneNumber ~ e:", e)
    let _this = this;
    //同意授权
    App.getPhoneNumber(e, (res) => {
      console.log(1,res);
      if(res.data.userinfo_acquired){
        // 跳转回原页面
        _this.onNavigateBack(1);
      }else{
        // this.setData({
        //   show: true
        // });
        wx.navigateBack()
      }
    });
  },

  /**
   * 授权登录（旧版弃用）
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
   * 授权登录（新版）
   */
  getUserProfile() {

    if (!App.checkMobileAcquired()) {
      App.showError('请先授权微信绑定的手机号');
      return;
    }

    const app = this
    // wx.canIUse('getUserProfile') && wx.getUserProfile({
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '获取用户相关信息',
      success(result) {
        console.log('用户同意了授权')
        App.getUserInfo(result, () => {
          // 跳转回原页面
          app.onNavigateBack(1)
        });
      },
      fail() {
        console.log('用户拒绝了授权')
      }
    })
  },

  /**
   * 暂不登录
   */
  onNotLogin() {
    let _this = this;
    // 跳转回原页面
    _this.onNavigateBack(_this.data.options.delta);
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
    wx.navigateBack()
  },

})
