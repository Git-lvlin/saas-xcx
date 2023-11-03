Component({
  use: [
    'systemInfo',
    'homeData',
  ],
  
  properties: {
    showHomePopup: {
      type: Boolean,
      value: false
    },
    child: {
      type: Array,
      value: []
    },
    className: {
      type: String,
      value: ''
    },
    classificationHeight: {
      type: Number,
      value: 0,
    },
    barHeight: {
      type: Number,
      value: 0,
    },
  },

  data: {
  },
  attached(){
   var systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo.windowHeight);
    var windowWidth = wx.getSystemInfoSync().windowWidth;
    const windowHeight=systemInfo.windowHeight* 750 / windowWidth
    const popupHeight=windowHeight-(this.data.classificationHeight+this.data.barHeight)
    this.setData({
      popupHeight: popupHeight
    })
  },

  methods: {
    onCloseClass() {
      this.triggerEvent('onShowHomePopup', { showHomePopup: false });
    },
    
  // 点击二级分类
  onSecondClass({
    currentTarget,
  }) {
    const {
      data,
    } = currentTarget.dataset;
    wx.navigateTo({
      url: `/subpages/classGood/index?name=${data.name}&category_id=${data.category_id}`
    })
    },
  }

})
