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
  },

  data: {

  },
  attached(){

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
