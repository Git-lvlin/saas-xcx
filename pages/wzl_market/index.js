const App = getApp();
const pageIndex = 'category/list::';
var sliderWidth = 96;

Page({
  data: {
    scrollHeight: null,

    showView: false, // 列表显示方式

    sortType: 'all', // 排序类型
    sortPrice: false, // 价格从低到高

    option: {}, // 当前页面参数
    list: {}, // 商品列表数据

    no_more: false, // 没有更多数据
    isLoading: true, // 是否正在加载中

    page: 1, // 当前页码

    
    tabs: ['桶装水专区', "周边产品", "积分专区"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    selected: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    let _this = this;
    // 设置商品列表高度
    _this.setListHeight();
    // 记录option
    _this.setData({
      option
    });
    // 设置列表显示方式
    _this.setShowView();
    // 获取商品列表
    _this.getGoodsList();

    //获取分类列表
   //_this.getCateoryList();



    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          sliderLeft: (res.windowWidth / _this.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / _this.data.tabs.length * _this.data.activeIndex
        });
      }
    });
  },

  onShow(){
    if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
  },

  abClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  /**
   * 设置默认列表显示方式
   */
  setShowView() {
    let _this = this;
    _this.setData({
      showView: wx.getStorageSync(pageIndex + 'showView') || false
    });
  },

  /**
   * 获取商品列表
   * @param {bool} isPage 是否分页
   * @param {number} page 指定的页码
   */
  getGoodsList(isPage, page) {
    let _this = this;
    App._get('warehouse.goods/lists', {
      status: 10,
      wxapp_id: App.getWxappId(),
      page: page || 1,
      sortType: this.data.sortType,
      sortPrice: this.data.sortPrice ? 1 : 0,
      category_id: Number(_this.data.activeIndex) + 1,
      search: this.data.option.search || '',
    }, result => {
      console.log(result)
      let resList = result.data.list,
        dataList = _this.data.list;
      if (isPage == true) {
        _this.setData({
          'list.data': dataList.data.concat(resList.data),
          isLoading: false,
        });
      } else {
        _this.setData({
          list: resList,
          isLoading: false,
        });
      }
    });
  },

  //获取分类列表
  getCateoryList(){
    App._get({
      url: 'warehouse.category/index',
      wxapp_id: App.getWxappId(),
      success(res) {
        console.log(res)
      },
    })
  },

  /**
   * 设置商品列表高度
   */
  setListHeight() {
    let _this = this;
    wx.getSystemInfo({
      success: res => {
        _this.setData({
          scrollHeight: res.windowHeight - 90,
        });
      }
    });
  },

  /**
   * 切换排序方式
   */
  switchSortType(e) {
    let _this = this,
      newSortType = e.currentTarget.dataset.type,
      newSortPrice = newSortType === 'price' ? !this.data.sortPrice : true;

    this.setData({
      list: {},
      isLoading: true,
      page: 1,
      sortType: newSortType,
      sortPrice: newSortPrice
    }, () => {
      // 获取商品列表
      _this.getGoodsList();
    });
  },

  /**
   * 切换列表显示方式
   */
  onChangeShowState() {
    let _this = this,
      showView = !_this.data.showView;
    wx.setStorageSync(pageIndex + 'showView', showView);
    _this.setData({
      showView
    });
  },

  /**
   * 下拉到底加载数据
   */
  bindDownLoad() {
    // 已经是最后一页
    if (this.data.page >= this.data.list.last_page) {
      this.setData({
        no_more: true
      });
      return false;
    }
    // 加载下一页列表
    this.getGoodsList(true, ++this.data.page);
  },

  /**
   * 商品搜索
   */
  triggerSearch() {
    let pages = getCurrentPages();
    // 判断来源页面
    if (pages.length > 1 &&
      pages[pages.length - 2].route === 'pages/search/index') {
      wx.navigateBack();
      return;
    }
    // 跳转到商品搜索
    wx.navigateTo({
      url: '../search/index',
    })
  },

  /**
   * 设置分享内容
   */
  onShareAppMessage() {
    // 构建分享参数
    return {
      title: "全部分类",
      path: "/pages/category/index?" + App.getShareUrlParams()
    };
  },

  /**
   * 分享到朋友圈
   * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
   * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
   */
  onShareTimeline() {
    // 构建分享参数
    return {
      title: "全部分类",
      path: "/pages/category/index?" + App.getShareUrlParams()
    };
  },

  /**
   * 获取分类列表
   */
  // getCategoryList() {
  //   let _this = this;
  //   App._get('category/index', {}, result => {
  //     let data = result.data;
  //     _this.setData({
  //       list: data.list,
  //       templet: data.templet,
  //       curNav: data.list.length > 0 ? data.list[0].category_id : true,
  //       notcont: !data.list.length,
  //       tabs: data.list.map(item => item.name)
  //     });
  //   });
  // },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    switch (Number(this.data.activeIndex)) {
      case 0:
        this.getGoodsList();
        break;
      case 1:
        this.getGoodsList();
        break;
      case 2:
        this.getGoodsList();
        break;
    }
  },

  // addCard(e) {
  //   let _this = this
  //   var goods_id = e.currentTarget.dataset.goods_id
  //   var goods_num = 1
  //   var spec_sku_id = e.currentTarget.dataset.spec_sku_id
  //   console.log('addCard', goods_id, spec_sku_id)
  //   // return
  //   App._post_form('cart/add', {
  //     goods_id: goods_id,
  //     goods_num: goods_num,
  //     goods_sku_id: spec_sku_id,
  //   }, (result) => {
  //     App.showSuccess(result.msg);
  //     // _this.setData(result.data);
  //     // 记录购物车商品数量
  //     App.setCartTotalNum(result.data.cart_total_num)
  //     App.setCartTabBadge()
  //   });
  // },
});