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
        value: []
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
        scrollHeight: systemInfo.windowHeight - 180// swiper高度 259
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