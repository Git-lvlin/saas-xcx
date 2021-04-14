const App = getApp();

Page({

  data: {
    // 页面参数
    options: {},
    // 页面元素
    items: {},
    scrollTop: 0,
    storeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (wx.getStorageSync('referee_id_Login') == 1) {
      wx.reLaunch({
        url: '/pages/invite/index',
      })
    } else if (wx.getStorageSync('referee_id_Login') == 2) {
      wx.reLaunch({
        url: '/pages/inviteAffirm/index',
      })
    }
    // 当前页面参数
    this.setData({
      options
    });
    // 加载页面数据
    this.getPageData();

    //请求店铺信息
    this.getStoreList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 更新购物车角标
    App.setCartTabBadge()
  },

  /**
   * 加载页面数据
   */
  getPageData(callback) {
    let _this = this;
    App._get('page/index', {
      page_id: _this.data.options.page_id || 0
    }, result => {
      // 设置顶部导航栏栏
      _this.setPageBar(result.data.page);
      _this.setData(result.data);
      console.log(result.data)
      // 回调函数
      typeof callback === 'function' && callback();
    });
  },

  /*
  请求店铺数据*/
  getStoreList() {
    let _this = this;

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        App._get('shop/lists', {
          longitude: res.longitude,
          latitude: res.latitude
        }, reponse => {
          // _this.data.storeList = reponse.data.list
          console.log(reponse.data.list)
          reponse.data.list.forEach(item => {
            item.distance = (item.distance / 1000).toFixed(0) + 'km'
          })
          App.globalData.storeList = reponse.data.list;
          _this.setData({
            storeList: reponse.data.list
          })
        })


      }
    })

    
  },

  /**
   * 设置顶部导航栏
   */
  setPageBar(page) {
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: page.params.title
    });

    wx.setStorageSync('titleTextColor', page.style.titleTextColor === 'white' ? '#ffffff' : '#000000');
    wx.setStorageSync('titleBackgroundColor', page.style.titleBackgroundColor);
    // 设置navbar标题、颜色
    wx.setNavigationBarColor({
      frontColor: page.style.titleTextColor === 'white' ? '#ffffff' : '#000000',
      backgroundColor: page.style.titleBackgroundColor
    })
  },

  /**
   * 下拉刷新
   */
  onPullDownRefresh() {
    // 获取首页数据
    this.getPageData(function () {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 分享当前页面
   */
  onShareAppMessage() {
    const _this = this;
    return {
      title: _this.data.page.params.share_title,
      path: "/pages/index/index?" + App.getShareUrlParams()
    };
  },

  /**
   * 分享到朋友圈
   * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
   * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
   */
  onShareTimeline() {
    const _this = this;
    return {
      title: _this.data.page.params.share_title,
      path: "/pages/index/index?" + App.getShareUrlParams()
    };
  },

  readyNavigator(e) {
    //wx.getLocation({
      //type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      //success(res) {
        //const latitude = res.latitude
       // const longitude = res.longitude
        let storeInfo = App.globalData.storeList.find(item => item.shop_id === e.currentTarget.id);
        console.log(e)
        wx.openLocation({
          name: storeInfo.shop_name,
          latitude: storeInfo.latitude,
          longitude: storeInfo.longitude,
          scale: 18
        })
   //   }
    //})
  },

  navigateToNailMapPage() {
    wx.navigateTo({
      url: '../nail_picture/nail_picture',
    })
  },

  checkoutStoreInformation(e) {
    let id  = e.currentTarget.dataset.id;
    App.globalData.storeInfo = this.data.storeList.find(item => item.shop_id === id)
    wx.navigateTo({
      url: './storeInformation/index',
    })
  }
});