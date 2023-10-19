import Dialog from '@vant/weapp/dialog/dialog';

const App = getApp();

Page({

  data: {
    // 页面参数
    //options: {},
    // 页面元素
    items: [],
    scrollTop: 0,
    storeList: [],
    imgUrls: [
      '../../images/banner.png',
      '../../images/banner.png',
      '../../images/banner.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    navBarHeight: 0,
    bannerData: {},
    navBarData: {},
    goodsData: {},
    setting: {}
  },

  properties: {
    diyItems: Object
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;

    // 加载页面数据
    this.getPageData()
    this.getStoreList()
    
    //wx.hideTabBar()
    // if (wx.getStorageSync('referee_id_Login') == 1) {
    //   wx.reLaunch({
    //     url: '/pages/invite/index',
    //   })
    // } else if (wx.getStorageSync('referee_id_Login') == 2) {
    //   wx.reLaunch({
    //     url: '/pages/inviteAffirm/index',
    //   })
    // }

    // 当前页面参数
    // this.setData({
    //   options
    // });

    


    // wx.login({
    //   success(res) {
    //     console.log(res.code)
    //   }
    // })

    //获取状态栏高度
    const systemInfo = wx.getSystemInfoSync();
    const navBarHeight = systemInfo.statusBarHeight + 44; // 44px 是微信小程序导航栏的默认高度
    this.setData({
      navBarHeight: navBarHeight
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  

    // 更新购物车角标
    App.setCartTabBadge();
    // if (typeof this.getTabBar === 'function' &&
    //     this.getTabBar()) {
    //     this.getTabBar().setData({
    //       selected: 0
    //     })
    //   }
  },

  /**
   * 加载页面数据
   */
  getPageData(callback) {
    let _this = this;
    App._get('page/index', {
      page_id: 0
    }, result => {
      // 设置顶部导航栏栏
      _this.setPageBar(result.data.page);
      
      // 回调函数
      typeof callback === 'function' && callback();

      result.data.items.forEach(item => {
        if (item.type === 'navBarLeft') {
          item.data.forEach(it => {
            if (/\[换行\]/.test(it.text)) {
              const arr = it.text.split('[换行\]')
              const [title,...rest] = arr
              it.title = title
              it.textArr = rest
            }
          })
        }

        if (item.type === 'notice') {
          if (/\[换行\]/.test(item.params.text)) {
            const arr = item.params.text.split('[换行\]')
            item.textArr = arr
          }
        }

        if (item.type === 'banner') {
          this.setData({
            bannerData: item
          })
        }

        if (item.type === 'navBar') {
          this.setData({
            navBarData: item
          })
        }

        if (item.type === 'goods') {
          this.setData({
            goodsData: item
          })
        }
      })

      const popup_id = wx.getStorageSync('popup_id')
      const setting = result.data.setting

      if (setting.popup_id === popup_id) {
        setting.popup_mode = 0
      }
      wx.setStorageSync('popup_id',setting.popup_id)

      // if (setting.popup_mode === 1) {
      //   Dialog.alert({
      //     title: setting.popup_title,
      //     message: setting.popup_body,
      //     confirmButtonText: '知道了',
      //     'confirm-button-color': '#000'
      //     // overlayStyle: "z-index:9999"
      //   })
      // }

      

      _this.setData(result.data);
    });
  },

  /*
  请求店铺数据*/
  getStoreList() {
    let _this = this;

    wx.getLocation({
      isHighAccuracy: true,
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        App.globalData.coordinate = { longitude: res.longitude, latitude: res.latitude };
        App._get('shop/nearby', {
          longitude: res.longitude,
          latitude: res.latitude
        }, reponse => {
          // _this.data.storeList = reponse.data.list
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
      path: "/pages/index/index?" + App.getShareUrlParams(),
      imageUrl: "../../images/cover.png"
    };
  },

  /**
   * 分享到朋友圈
   * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
   * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
   */
  // onShareTimeline() {
  //   const _this = this;
  //   return {
  //     title: _this.data.page.params.share_title,
  //     path: "/pages/index/index?" + App.getShareUrlParams()
  //   };
  // },

  // 导航去水店
  readyNavigator(e) {
    let storeInfo = App.globalData.storeList.find(item => item.shop_id === e.currentTarget.dataset.id);
    wx.openLocation({
      name: storeInfo.shop_name,
      latitude: Number(storeInfo.latitude),
      longitude: Number(storeInfo.longitude),
      scale: 18
    })
  },

  // 查看钉图
  navigateToNailMapPage() {
    wx.navigateTo({
      url: './nail_picture/nail_picture',
    })
  },

  // 跳转水店详情页
  checkoutStoreInformation(e) {
    let id = e.currentTarget.dataset.id;
    App.globalData.storeInfo = this.data.storeList.find(item => item.shop_id === id)
    wx.navigateTo({
      url: "./storeInformation/index"
    })
  },

  navigationTo(e) {
    const { url } = e.currentTarget.dataset
    if (!url) {
      return
    }
    App.navigationTo(url)
  },
});