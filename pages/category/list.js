const App = getApp();
// const pageIndex = 'category/list::';
// var sliderWidth = 96;
Page({
  data: {
    sortType: 'all', // 排序类型
    sortPrice: false, // 价格从低到高
    option: {}, // 当前页面参数
    list: {}, // 商品列表数据
    no_more: false, // 没有更多数据
    isLoading: false, // 是否正在加载中
    pagination: 1, // 当前页码
    tabs: [],
    activeIndex: 0,
    scrollTop: 0,
    makeAnchorByCategory: [],
    items: [],
    options: "",
    //sliderOffset: 0,
    //sliderLeft: 0,
    active: 0,
    // 分类列表
    dateList: [],

    // 一级分类：指针
    curNav: true,
    curIndex: 0,

    // 当前的分类id 
    category_id: 0,
    searchLoading: false,
    searchLoadingComplete: false,
    page: 1,


    navBarHeight: 0,

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    let _this = this;

    // 记录option
    // _this.setData({
    //   option
    // });

    // 获取分类列表
    _this.getCategoryList();

    // this.setData({
    //   options:option
    // });

    // _this.getPageData();

    //获取状态栏高度
    const systemInfo = wx.getSystemInfoSync();
    const navBarHeight = systemInfo.statusBarHeight + 44; // 44px 是微信小程序导航栏的默认高度
    this.setData({
      navBarHeight: navBarHeight
    })
  },






  //切换导航栏
  beforeChange(e) {
    this.setData({
      active: e.detail.name,
      category_id: e.detail.name,
      curIndex: parseInt(e.detail.index),
    })
  },

  onShow() {

  },

  // handleTap: function(e) {
  //   // 在这里处理你的逻辑
  // },



  // onPullDownRefresh() {
  //   // 获取首页数据
  //   this.getGoodsList();
  // },





  /**
   * 切换排序方式
   */
  // switchSortType(e) {
  //   let _this = this,
  //     newSortType = e.currentTarget.dataset.type,
  //     newSortPrice = newSortType === 'price' ? !this.data.sortPrice : true;

  //   this.setData({
  //     list: {},
  //     isLoading: true,
  //     pagination: 1,
  //     sortType: newSortType,
  //     sortPrice: newSortPrice

  //   }, () => {
  //     // 获取商品列表
  //     _this.getGoodsList();
  //   });
  // },

  /**
   * 下拉到底加载数据
   */
  // onReachBottom(){
  //   if (this.data.pagination >= this.data.list.last_page) {
  //     this.setData({
  //       no_more: true
  //     });
  //     return false;
  //   }
  //   // 加载下一页列表
  //   let category_id = "";
  //   if(this.data.activeIndex >= 0) {
  //     if(this.data.tabs[this.data.activeIndex].title.indexOf("首页") > -1) {
  //       category_id = "";
  //     } else if(this.data.activeIndex >= 0){
  //       category_id = this.data.tabs[this.data.activeIndex].category_id;
  //     }
  //   } else {
  //     category_id = "";
  //   }
    
  //   this.getGoodsList(true, ++this.data.pagination, category_id);
  // },

  /**
   * 商品搜索
   */
  // triggerSearch() {
  //   let pages = getCurrentPages();
  //   // 判断来源页面
  //   if (pages.length > 1 &&
  //     pages[pages.length - 2].route === 'pages/search/index') {
  //     wx.navigateBack();
  //     return;
  //   }
  //   // 跳转到商品搜索
  //   wx.navigateTo({
  //     url: '../search/index',
  //   })
  // },

  /**
   * 设置分享内容
   */
  // onShareAppMessage() {
  //   // 构建分享参数
  //   return {
  //     title: "全部分类",
  //     path: "/pages/category/index?" + App.getShareUrlParams()
  //   };
  // },

  /**
   * 分享到朋友圈
   * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
   * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
   */
  // onShareTimeline() {
  //   // 构建分享参数
  //   return {
  //     title: "全部分类",
  //     path: "/pages/category/index?" + App.getShareUrlParams()
  //   };
  // },

  /**
   * 获取分类列表
   */
  getCategoryList() {

    let _this = this;
    App._get('category/index', {}, result => {
      if(result.code == 1){
        let data = result.data;
        _this.setData({
          dateList: data.list,
          templet: data.templet,
          category_id: data.list.length > 0 ? data.list[0].category_id : 0,
          notcont: !data.list.length,
          tabs: data.list.map(item => {
            return {
              category_name: item.name,
              category_id: item.category_id,
              title: item.name
            }
          })
        });
      }
    });
  },

  /**
   * 加载页面数据
   */
  // getPageData(callback) {
  //   let _this = this;
  //   App._get('page/index', {
  //     page_id: _this.data.options.page_id || 0
  //   }, result => {
  //     // 设置顶部导航栏栏
  //     _this.setData(result.data);
  //     // 回调函数
  //     typeof callback === 'function' && callback();
  //   });
  // },

  // tabClick: function (e) {
  //   let _this = this;
  //   this.setData({
  //     pagination: 1,
  //     activeIndex: e.detail.index,
  //     scrollTop: _this.data.makeAnchorByCategory[e.detail.index] - 100
  //   });
  //   let category_id = "";
  //   if(_this.data.tabs[_this.data.activeIndex].title.indexOf("首页") > -1) {
  //     category_id = "";
  //   } else {
  //     category_id = _this.data.tabs[_this.data.activeIndex].category_id;
  //   }
  //   this.getGoodsList(false, 1, category_id);
  // },
});