const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    // 分类列表
    dateList: [],

    // 当前的分类id 
    category_id: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    App._get("article/categoryByTag", { tag: '健康科普' }, res => {
      if (res.code === 1) {
        this.setData({
          dateList: res.data.categoryList,
          category_id: res.data.categoryList[0].category_id
        })
      }
    })
  },

  //切换导航栏
  beforeChange(e) {
    this.setData({
      active: e.detail.name,
      category_id: e.detail.name,
    })
  },

  navigationTo(){
    App.navigationTo('subpages/health-popularization/search/index')
  }

})
