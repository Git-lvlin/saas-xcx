const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    // 分类列表
    dateList: ['肿瘤营养','乳腺癌','肺癌','HIV专区','肝病','胃癌','免疫治疗','血液肿瘤','食道癌'],

    historySearch: [],
    searchLoading: false,
    searchLoadingComplete: false,
    page: 1,
    doctor: {},
    scrollHeight: 0,
    scrollTop: 0,
    // 是否已搜索 
    isSearch: false,
    searchText: "",
    doctorSearch: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setListHeight()
    this.getDoctorList('')
  },

  onShow() {
    this.getHistorySearch();
  },

  //搜索
  onSearch({ detail }) {
    this.setData({
      isSearch: true,
      searchText: detail
    })
    
    // 获取已经存在的搜索历史
    let history = wx.getStorageSync('historySearch') || [];
    
    // 将新的搜索内容添加到历史列表中
    history.push({ keyword:detail });

    // 存储更新后的搜索历史
    wx.setStorageSync('historySearch', history);
  },

  //搜索结果
  onReceiveDoctor(e) {
    console.log(e.detail.doctor);  // 这里就可以获取到doctor数据了
    this.setData({
      doctorSearch: e.detail.doctor.data
    })
  },


  //取消
  onCancel(){
    this.setData({
      isSearch: false,
      searchText: '',
      doctorSearch: []
    })
    this.getHistorySearch();
  },

  // 历史搜索
  getHistorySearch() {
    this.setData({
      historySearch:wx.getStorageSync('historySearch')
    });
  },

  // 清空历史记录
  clearSearchHistory() {
    this.setData({
      historySearch: [],
    });
    wx.removeStorageSync('historySearch');
  },

  // 点击搜索推荐
  onSearchLabel({
    currentTarget,
  }) {
    const {
      keyword,
    } = currentTarget.dataset;
    this.setData({
      searchText: keyword,
      isSearch: true
    })
  },

  //计算高度
  setListHeight() {
    let systemInfo = wx.getSystemInfoSync(),
      scrollHeight = systemInfo.windowHeight - 200; // swiper高度
    this.setData({
      scrollHeight
    });
  },

  //列表数据
  getDoctorList(isPage, page) {
    let _this = this;
    _this.setData({
      searchLoading: true,
    });
    App._get('article/hot', {
      page: page || 1,
      tag: '健康科普',
      listRows: 6
    }, function (result) {
      let resList = result.data.list
      let dataList = _this.data.doctor;
      if (isPage == true) {
        _this.setData({
          'doctor.data': dataList.data.concat(resList.data),
          searchLoading: false,
        });
      } else {
        _this.setData({
          doctor: resList,
          searchLoading: false,
        });
      }
      if (_this.data.page >= _this.data.doctor.last_page) {
        _this.setData({
          searchLoadingComplete: true
        });
      }
    });
  },

  // 监听滚动到底部
  handleScrollBottom() {
    if (this.data.page >= this.data.doctor.last_page) {
      this.setData({
        searchLoadingComplete: true
      });
      return false;
    }
    this.getDoctorList(true, ++this.data.page);
  },

  //跳转详情
  navigationTo(e) {
    const { url } = e.currentTarget.dataset
    App.navigationTo(url)
  },

})
