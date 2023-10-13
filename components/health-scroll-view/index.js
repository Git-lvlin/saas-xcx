const App = getApp()
Component({
  properties: {
    //分类查询
    category_id: {
      type: Number,
      observer: function(newVal, oldVal) {
      this.setData({
        page: 1,
        searchLoadingComplete: false,
        searchLoading: false,
      });
        this.getDoctorList('');
      }
    },
    //搜索查询
    searchText: {
      type: String,
      observer: function(newVal, oldVal) {
          this.getDoctorList('');
        }
    }
  },
  data: {
    searchLoading: false,
    searchLoadingComplete: false,
    page: 1,
    doctor: {}
  },
  attached(){
    this.setListHeight()
    this.getDoctorList('')
  },
  methods: {
    //计算高度
    setListHeight() {
      let systemInfo = wx.getSystemInfoSync(),
        scrollHeight = systemInfo.windowHeight - 100; // swiper高度
      this.setData({
        scrollHeight
      });
    },

    getDoctorList(isPage, page) {
      let _this = this;
      _this.setData({
        searchLoading: true,
      });
      App._get('article/lists', {
        page: page || 1,
        category_id: _this.data.category_id,
        kwd: _this.data.searchText
      }, function (result) {
        let resList = result.data.list
        let dataList = _this.data.doctor;
        if (isPage == true) {//上拉更新追加数据
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
        //第一次就渲染完展示没有更多了
        if (_this.data.page >= _this.data.doctor.last_page) {
          _this.setData({
            searchLoadingComplete: true
          });
        }
        //数据回调
        _this.triggerEvent('sendDoctor', { doctor: _this.data.doctor });

        //没有数据调整高度
        if(!resList.data.length){
          _this.setData({
            scrollHeight: 100
          });
        }else{
          _this.setListHeight()
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
  },
})
