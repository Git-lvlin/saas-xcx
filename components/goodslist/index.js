const App = getApp()

Component({
	properties: {
       //分类查询
       category_id: {
        type: Number,
        observer: function(newVal, oldVal) {
          if (newVal !== oldVal) {
            if (!this.data.isLoading) {
              this.getGoodsList('')
              this.setData({
                page: 1, // 重置页码
                'list.data': [],  //清空商品列表缓存
              });
              // this.classification()
            }
          }
        }
      },
      curIndex:{
        type: Number,
        value: 0
      },
      dateList:{
        type: Array,
        value: [],
        observer: function(newVal, oldVal) {
          let query = wx.createSelectorQuery().in(this);
          console.log()
          query.select('.classification').boundingClientRect();
          query.exec((res)=>{
            if(res?.[0]?.height){
              var windowWidth = wx.getSystemInfoSync().windowWidth;
              let info = wx.getSystemInfoSync();

              if (info.platform === 'android' || info.platform === 'devtools') {
                // Android设备需要执行的代码
                this.setData({
                  classificationHeight: (res?.[0]?.height+res?.[0]?.top)* 750 / windowWidth
                })
              } else if (info.platform === 'ios' || info.platform === 'devtools') {
                // iOS设备需要执行的代码
                this.setData({
                  classificationHeight: ((res?.[0]?.height+res?.[0]?.top)-(this.data.navBarHeight-44))* 750 / windowWidth
                })
              }
              
            }
          });
        }
      },
      elementHeight:{
        type: Number,
        value: 0
      },
      navBarHeight:{
        type: Number,
        value: 0
      }
  },
  data: {
    scrollHeight: 0,
    sortType: 'all', // 排序类型
    sortPrice: false, // 价格从低到高
    list: {}, // 商品列表数据
    isLoading: false, // 是否正在加载中
    tabs: [],

    searchLoadingComplete: false, //没有更多了
    page: 1, //当前页码

    showHomePopup: false,//分类弹窗

    classificationHeight: 0
  },
  attached(){
    // 设置商品列表高度
    this.setListHeight();
  },
  methods: {
    //计算高度
   setListHeight() {
      let systemInfo = wx.getSystemInfoSync()
      this.setData({
        scrollHeight: systemInfo.windowHeight - this.data.elementHeight// swiper高度 259
      });

    },

    getGoodsList(isPage, page) {  
      let _this = this;
      _this.setData({
        isLoading: true,
      });
      App._get("goods/lists", {
        page: page || 1,
        listRows: 5,
        sortType: _this.data.sortType,
        sortPrice: _this.data.sortPrice ? 1 : 0,
        category_id: _this.data.category_id || "",
      }, result => {
        if(result.code == 1){
          let resList = result.data.list,
              dataList = _this.data.list;
            if (isPage == true) {
              _this.setData({
                'list.data': dataList.data.concat(resList.data),
                isLoading: false,
              });
            } else {
              _this.setData({
                list: resList,
                isLoading: false,
              });
            }
            _this.setListHeight()
        }
      });
    },

    // 监听滚动到底部
    handleScrollBottom() {
      if (this.data.page >= this.data.list.last_page) {
        this.setData({
          searchLoadingComplete: true
        });
        return false;
      }
      this.getGoodsList(true, ++this.data.page);
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

    // 打开二级分类弹窗
    onOpenClass() {
      this.setData({
        showHomePopup: true
      })
    },

    //回调关闭弹窗
    onShowHomePopup(){
      this.setData({
        showHomePopup: false
      })
    },
  }
});