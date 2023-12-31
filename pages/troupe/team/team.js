const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    data: {},
    dataType: 1,
    page: 1,
    no_more: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 获取我的团队列表
    this.getTeamList();
  },

  /**
   * 获取我的团队列表
   */
  getTeamList: function(isNextPage, page) {
    let _this = this;
    App._get('user.troupe.team/lists', {
      page: page || 1,
    }, function(result) {
      // 创建页面数据
      _this.setData(_this.createData(result.data, isNextPage));
    });
  },

  /**
   * 创建页面数据
   */
  createData: function(data, isNextPage) {
    data['isLoading'] = false;
    // 列表数据
    let dataList = data.list;
    if (isNextPage == true && (typeof dataList !== 'undefined')) {
      data.list.data = this.data.list.data.concat(dataList.data)
    }
    // 设置当前页面标题
    wx.setNavigationBarTitle({
      title: data.team_title
    });
    // 团队总人数
    data['team_total'] = data.list.total;

    // 设置swiper的高度
    this.setSwiperHeight();
    return data;
  },

  /**
   * 下拉到底加载数据
   */
  triggerDownLoad: function() {
    // console.log(this.data.list);
    // 已经是最后一页
    // console.log('team triggerDownLoad/ ', this.data.page, this.data.list.last_page, this.data.page >= this.data.list.last_page)
    if (this.data.page >= this.data.list.last_page) {
      this.setData({
        no_more: true
      });
      return false;
    }
    this.getTeamList(true, ++this.data.page);
  },

  /**
   * 设置swiper的高度
   */
  setSwiperHeight: function(isTap) {
    // 获取系统信息(拿到屏幕宽度)
    let systemInfo = wx.getSystemInfoSync(),
      rpx = systemInfo.windowWidth / 750, // 计算rpx
      tapHeight = isTap ? Math.floor(rpx * 82) : 0, // tap高度
      peopleHeight = Math.floor(rpx * 65), // people高度
      swiperHeight = systemInfo.windowHeight - tapHeight - peopleHeight; // swiper高度
    this.setData({
      swiperHeight
    });
  },

})
