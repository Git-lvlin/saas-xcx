Component({
  data: {
    selected: 0,
    color: "#6e6d6b",
    selectedColor: "#fd4a5f",
    list: []
  },
  attached() {
    if(wx.getStorageSync('role') > 0){
      this.setData({list:[{
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/images/home.png",
        "selectedIconPath": "/images/home-active.png"
      },
      {
        "pagePath": "/pages/wzl_market/index",
        "text": "水厂",
        "iconPath": "/images/cate.png",
        "selectedIconPath": "/images/cate-active.png"
      },
      {
        "pagePath": "/pages/flow/index",
        "text": "购物车",
        "iconPath": "/images/flow.png",
        "selectedIconPath": "/images/flow-active.png"
      },
      {
        "pagePath": "/pages/user/index",
        "text": "我的",
        "iconPath": "/images/user.png",
        "selectedIconPath": "/images/user-active.png"
      }]})
    } else {
      this.setData({'list': [{
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/images/home.png",
        "selectedIconPath": "/images/home-active.png"
      },
      {
        "pagePath": "/pages/category/list",
        "text": "商城",
        "iconPath": "/images/cate.png",
        "selectedIconPath": "/images/cate-active.png"
      },
      {
        "pagePath": "/pages/flow/index",
        "text": "购物车",
        "iconPath": "/images/flow.png",
        "selectedIconPath": "/images/flow-active.png"
      },
      {
        "pagePath": "/pages/user/index",
        "text": "我的",
        "iconPath": "/images/user.png",
        "selectedIconPath": "/images/user-active.png"
      }]})
    }
    console.log(wx.getStorageSync('role'))
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})