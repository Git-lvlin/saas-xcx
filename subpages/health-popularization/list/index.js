const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warpActive: 0,
    active: 0,
    radio: null,
    selectDoctorInfo: {},
    popVisible: false,
    scrollBottom: false,
    scrollTop: 0,
    scrollHeight: 0,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏 
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    // 分类列表
    dateList: ['肿瘤营养','乳腺癌','肺癌','HIV专区','肝病','胃癌','免疫治疗','血液肿瘤','食道癌'],
    // 列表
    doctor: [],
    // 当前的分类id (0则代表首页)
    category_id: 0,

    scrollHeight: null,

    page: 1, // 当前页码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let { dateList } = this.data
    // App._get("registration.Registration/setting", {}, res => {
    //   if (res.code === 1) {
    //     dateList = dateList.concat(res.data.registration_day.map(item => {
    //       return {
    //         ...item,
    //         type: 2,
    //         p: dayjs(item.date).format('MM-DD'),
    //         b: item.quantity<1?'约满':item.week
    //       }
    //     }))
    //     this.setData({
    //       dateList
    //     })
    //   }
    this.setListHeight()
    this.getDoctorList('')
    // })
  },

    //计算高度
    setListHeight() {
      let systemInfo = wx.getSystemInfoSync(),
        rpx = systemInfo.windowWidth / 750, // 计算rpx
        tapHeight = Math.floor(rpx * 100), // tap高度
        scrollHeight = systemInfo.windowHeight - tapHeight; // swiper高度
      this.setData({
        scrollHeight
      });
    },
  
  // 监听页面滚动
    onViewScroll({ detail}) {
      this.setData({
        scrollTop: detail.scrollTop
      });
    },

  //切换导航栏
  beforeChange(e) {
    this.setData({
      active: e.detail.index
    })
    let _this = this;
    // 第一步：切换当前的分类id
    _this.setData({
      category_id: e.currentTarget.dataset.id,
      page: 1,
      searchLoadingComplete: false,
      searchLoading: false,
    });
    // 第二步：更新当前的列表
    _this.getDoctorList();
  },

   // scrollview 滚动触底
   handleScrollBottom() {
    console.log('滚动到底部了，开始加载数据...');
     // 已经是最后一页
     if (this.data.page >= this.data.doctor.last_page) {
      this.setData({
        searchLoadingComplete: true
      });
      return false;
    }
    // 加载下一页列表
    this.getDoctorList(true, ++this.data.page);
  },

   //获取列表
   getDoctorList(isPage, page) {
    let _this = this;
    _this.setData({
      searchLoading: true,
    });
    App._get('registration.Registration/doctorList', {
      page: page || 1,
      category_id: _this.data.category_id
    }, function (result) {
      let resList = result.data.list
        console.log('resList',resList)
      let  dataList = _this.data.doctor;
      if (isPage == true) {
        _this.setData({
          doctor: dataList.concat(resList),
          searchLoading: false,
        });
      } else {
        _this.setData({
          doctor: resList,
          searchLoading: false,
        });
      }
    });
  },



  submit() {

    if (!App.checkLogin()) {
      return 
    }

    const { selectDoctorInfo, active, radio } = this.data
    if (radio === null) {
      return
    }
    wx.navigateTo({
      url: '/pages/reserve/patientInformation',
      success(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          clerk_id: selectDoctorInfo.doctor.clerk_id,
          appointment_date: selectDoctorInfo.registration_day[active].date,
          section: `${selectDoctorInfo.registration_day[active].work_plan[radio].start}-${selectDoctorInfo.registration_day[active].work_plan[radio].end}`,
          pay_price: selectDoctorInfo.doctor.copay
        })
      }
    })
  },
  navigationTo(e) {
    const { url } = e.currentTarget.dataset
    App.navigationTo(url)
  },

})
