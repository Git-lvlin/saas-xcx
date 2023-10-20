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
        if (history.length >= 20) {
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
})
