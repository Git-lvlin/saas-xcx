const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,

    historySearch: [],
    searchLoading: false,
    searchLoadingComplete: false,
    page: 1,
    doctor: {},
    scrollHeight: 0,
    // 是否已搜索 
    isSearch: false,
    searchText: "",
    doctorSearch: [],
    showScrollView: false
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

  onChange({ detail }){
    if(detail){
      this.setData({
        searchText: detail
      })
    }else{
      this.onCancel()
    }
  },
  //搜索
  onSearch() {
    const { searchText } = this.data
    if(searchText){
      this.setData({
        isSearch: true,
        searchText: searchText,
        showScrollView: true
      })
      
      // 获取已经存在的搜索历史
      let history = wx.getStorageSync('historySearch') || [];
      
      // 检查搜索内容是否已经存在于历史列表中
      let exists = history.some(item => item.keyword === searchText);
      
      // 如果不存在，则将新的搜索内容添加到历史列表中
      if (!exists) {
        // 检查历史列表的长度
        if (history.length >= 10) {
          // 移除最早的搜索历史
          history.pop();
        }
        
        // 添加新的搜索历史到最前面
        history.unshift({ keyword:searchText });
      }

      // 存储更新后的搜索历史
      wx.setStorageSync('historySearch', history);
    }
  },



  //搜索结果
  onReceiveDoctor(e) {
    this.setData({
      doctorSearch: e.detail.doctor.data,
      showScrollView: e.detail.doctor.data.length > 0
    })
  },


  //取消
  onCancel(){
    this.setData({
      isSearch: false,
      searchText: '',
      doctorSearch: [],
      showScrollView: false
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
      isSearch: true,
      showScrollView: true
    })
  },

  //计算高度
  setListHeight() {
    let systemInfo = wx.getSystemInfoSync(),
      scrollHeight = systemInfo.windowHeight - 230; // swiper高度
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
