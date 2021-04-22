const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {}, // 用户信息
    orderCount: {}, // 订单数量
    userHeaderBGC: '',
    shop_list: [], // 大于0时是店主
    currentShop: '',
    role: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

    var titleTextColor = wx.getStorageSync('titleTextColor')
    var titleBackgroundColor = wx.getStorageSync('titleBackgroundColor')

    if (titleTextColor && titleBackgroundColor) {
      // 设置navbar标题、颜色
      wx.setNavigationBarColor({
        frontColor: titleTextColor,
        backgroundColor: titleBackgroundColor
      })
    }

    let _this = this;
    _this.setData({
      isLogin: App.checkIsLogin(),
      userHeaderBGC: titleBackgroundColor
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {


    // 获取当前用户信息
    this.getUserDetail();

    // 更新购物车角标
    App.setCartTabBadge()

    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
  },

  /**
   * 获取当前用户信息
   */
  getUserDetail() {
    //let role = this.data.shop_list.length && this.data.shop_list[0].clerk_role.value || 0;
    let _this = this;
    App._get('user.index/detail', {}, function (result) {


      /*
      result.data = {
        menus: {},
        orderCount: {},
        setting: {},
        shop_list: [],
        userInfo: {},
        warehouse_list: []
      }
      */



      _this.setData({
        role: (result.data.shop_list.length && result.data.shop_list[0].clerk_role.value) || 0
      });


      switch (String(_this.data.role)) {
        case '0':
          delete result.data.menus.shopkeeper_order
          delete result.data.menus.storehouse_order
          break;

        case '1':
          delete result.data.menus.coupon;
          delete result.data.menus.my_coupon;
          delete result.data.menus.sharing_order;
          delete result.data.menus.storehouse_order
          break;

        case '2':
          delete result.data.menus.address;
          delete result.data.menus.coupon;
          delete result.data.menus.my_coupon;
          delete result.data.menus.sharing_order;
          delete result.data.menus.storehouse_order
          break;

        case '3':
          delete result.data.menus.address;
          delete result.data.menus.coupon;
          delete result.data.menus.my_coupon;
          delete result.data.menus.sharing_order;
          break;
      }

      _this.setData(result.data);

      // if (_this.data.role > 0) {
      //   wx.setTabBarItem({
      //     index: 1,
      //     text: '水厂',
      //     iconPath: '/images/pintuan.png',
      //     selectedIconPath: '/images/pintuan-active.png'
      //   })
      // }

      _this.saveUserRole();
    });
  },

  /**
   * 订单导航跳转
   */
  onTargetOrder(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    let urls = {
      all: '/pages/order/index?type=all',
      payment: '/pages/order/index?type=payment',
      received: '/pages/order/index?type=received',
      refund: '/pages/order/refund/index',
    };
    // 转跳指定的页面
    wx.navigateTo({
      url: urls[e.currentTarget.dataset.type]
    })
  },

  /**
   * 菜单列表导航跳转
   */
  onTargetMenus(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '/' + e.currentTarget.dataset.url
    })
  },

  /**
   * 跳转我的钱包页面
   */
  onTargetWallet(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: './wallet/index'
    })
  },

  /**
   * 跳转积分明细页
   */
  onTargetPoints(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '../points/log/index'
    });
  },

  /**
   * 跳转分销页
   */
  onTargetTroupe(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '../troupe/index/index'
    });
  },

  onTargetDealer(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '../dealer/index/index'
    });
  },

  // 跳转到我的优惠券
  onTargetMyCoupon(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: './coupon/coupon'
    });
  },

  // 跳转到拼团订单
  onTargetMyPintuan(e) {
    let _this = this;
    if (!_this.onCheckLogin()) {
      return false;
    }
    wx.navigateTo({
      url: '../sharing/order/index'
    });
  },

  // 保存用户角色
  saveUserRole() {
    wx.setStorageSync('role', this.data.role)
  },

  /**
   * 跳转到登录页
   */
  onLogin() {
    App.doLogin();
  },

  /**
   * 用户登出
   */
  onLogout() {
    this.setData({
      currentShop: '',
      shop_list: [],
      role: '0'
    })
    App.doLogout();
  },

  /**
   * 验证是否已登录
   */
  onCheckLogin() {
    let _this = this;
    if (!_this.data.isLogin) {
      App.showError('很抱歉，您还没有登录');
      return false;
    }
    return true;
  },

  /**
   * 授权登录
   */
  /*getUserInfo(e) {
    let _this = this;
    App.getUserInfo(e, () => {
      // App.showError('更新成功');
    });
  },*/
})