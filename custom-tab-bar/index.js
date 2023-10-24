const App = getApp();


Component({

  properties: {

  },

  data: {
    pagePath: "",
    selectedIndex: 0,
    // animationPath: `${IMG_CDN}miniprogram/home/intensiveNew.zip`,
    canvasLoaded: false,
    tabList: [
      {
        index: 0,
        "pagePath": "/pages/index/index",
        "text": "首页",
        "iconPath": "/images/tabbar1.png",
        "selectedIconPath": "/images/tabbar1_s.png"
      }, {
        index: 2,
        "pagePath": "",
        "text": "在线咨询",
        "iconPath": "/images/tabbar4.png",
        "selectedIconPath": "/images/tabbar4_s.png",
        type: 'contact',
      }, {
        index: 1,
        "pagePath": "/pages/category/list",
        "text": "健康推荐",
        "iconPath": "/images/tabbar2.png",
        "selectedIconPath": "/images/tabbar2_s.png"
      },
      {
        index: 3,
        "pagePath": "/pages/user/index",
        "text": "个人中心",
        "iconPath": "/images/tabbar3.png",
        "selectedIconPath": "/images/tabbar3_s.png"
      }
    ]
  },

  attached() {
    // this.drawCanvas();
  },

  ready() {
    const tabList = this.data.tabList;
    const pages = getCurrentPages();
    const currPage = pages[pages.length - 1].route
    const tabIndex = tabList.findIndex(item => `/${currPage}` === item.pagePath);
    if (tabIndex < 0) return;
    this.setData({
      selectedIndex: tabList[tabIndex].index
    })
  },

  methods: {
    // drawCanvas() {
    //   const that = this;
    //   // 集约动图
    //   const canvasContext = wx.createCanvasContext("canvasIcon", this);
    //   // 指定canvas大小
    //   canvasContext.canvas = {
    //     width: 90,
    //     height: 90,
    //   };
    //   // 如果同时指定 animationData 和 path， 优先取 animationData
    //   const ani = lottie.loadAnimation({
    //     renderer: "canvas", // 只支持canvas
    //     loop: true,
    //     autoplay: true,
    //     // animationData: animationData,
    //     path: this.data.animationPath,
    //     rendererSettings: {
    //       context: canvasContext,
    //       clearCanvas: true,
    //     },
    //   });
    //   ani.addEventListener("DOMLoaded", (res) => {
    //     that.setData({
    //       canvasLoaded: true
    //     })
    //   });
    // },

    consultAdd() {
      App._post_form('registration.registration/consultAdd')
    },

    onToPath(event) {
      const url = event.currentTarget.dataset.path;
      const pages = getCurrentPages();
      const currPage = pages[pages.length - 1].route
      // console.log('currpage', currPage)
      // console.log('url', url)
      // this.setData({
      //   selectedIndex: index,
      // })
      if (url === `/${currPage}`) return;
      if (url === '/pages/intensive/index') {
        wx.switchTab({ url })
      }
      wx.switchTab({
        url,
      });
    }
  }
})
