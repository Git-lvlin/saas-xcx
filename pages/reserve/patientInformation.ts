import PayTypeEnum from '../../utils/enum/order/PayType';

const App = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    genderColumns: ['男', '女'], // 1,2
    genderShow: false,
    patient_type: '成人、儿童',
    patient_name: '',
    patient_phone: '',
    patient_id_type: '居民身份证',
    patient_id_num: '',
    gender: '',
    // province_id: '',
    // city_id: '',
    // region_id: '',
    // province_name: '',
    // city_name: '',
    // region_name: '',
    patient_address: '',
    remark: '',
    region: {},
    tmplIds: [],
    shopInfo: {}
  },
  info: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel) {
      eventChannel.on('acceptDataFromOpenerPage', (data) => {
        console.log('data',data);
        this.info = data;
      })
    }
    App._get('wxapp.submsg/setting', {}, (res) => {
      if (res.code === 1) {
        this.setData({
          tmplIds: [res.data.setting.registration.expiration_reminder.template_id]
        })
      }
    });
    App._get('shop/lists', {}, (res) => {
      if (res.code === 1) {
        this.setData({
          shopInfo: res.data.list[0]
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  genderShowOpen() {
    this.setData({
      genderShow: true
    })
  },
  genderShowClose() {
    this.setData({
      genderShow: false
    })
  },
  genderConfirm({ detail }) {
    this.setData({
      gender: detail.value
    })
    this.genderShowClose()
  },
  checkPhone() {
    if (!/1\d{10}/.test(this.data.patient_phone)) {
      throw new Error("请输入正确11位手机号")
    }
  },
  checkName() {
    if (this.data.patient_name.trim().length < 2) {
      throw new Error("请输入真实姓名")
    }

  },
  checkIdNum() {
    if (this.data.patient_id_num.length !== 18) {
      throw new Error("请输入18位身份证号码")
    }

  },
  checkGender() {
    if (!this.data.gender) {
      throw new Error("请选择性别")
    }
  },
  checkRegion() {
    if (!this.data.region.value) {
      throw new Error("请选择所在地区")
    }
  },
  checkAddress() {
    if (!this.data.patient_address.trim()) {
      throw new Error("请填写详细地址")
    }
  },
  onChange(e) {
    const { type } = e.currentTarget.dataset
    this.setData({
      [type]: e.detail
    })
  },
  regionChange(e) {
    this.setData({
      region: e.detail
    })
  },
  getDetail() {
    App._get('registration.Patient/page', { default: 1 }, res => {
      if (res.code === 1 && res.data.data.length) {
        const data = res.data.data[0]
        this.setData({
          ...data,
          gender: { 1: '男', 2: '女' }[data.patient_gender],
          region: {
            code: [data.patient_province_id, data.patient_city_id, data.patient_region_id],
            value: [data.patient_province_name, data.patient_city_name, data.patient_region_name],
          }
        })
      }
    })
  },
  getSubmitData() {
    const { patient_type, patient_name, patient_phone, patient_id_type, patient_id_num, gender, patient_address, region } = this.data
    return {
      patient_type,
      patient_name,
      patient_phone,
      patient_id_type,
      patient_id_num,
      patient_gender: { '男': 1, '女': 2 }[gender],
      patient_province_id: region.code[0],
      patient_city_id: region.code[1],
      patient_region_id: region.code[2],
      patient_province_name: region.value[0],
      patient_city_name: region.value[1],
      patient_region_name: region.value[2],
      patient_address,
      pay_type: PayTypeEnum.BALANCE.value,
      ...this.info
      // clerk_id: this.info.clerk_id,
      // appointment_date: this.info.appointment_date,
      // section: this.info.section,
      // pay_price: this.info.pay_price,
    }
  },
  subscribeMessage(cb) {
    wx.requestSubscribeMessage({
      tmplIds: this.data.tmplIds,
      complete: res => {
        console.log('res',res);
        cb && cb()
      }
    })
  },
  pay(params) {
    App._get('registration.Registration/pay', params, res => {
      if (res.code === 1) {
        this.subscribeMessage(() => {
          wx.reLaunch({url:'/pages/user/my-appointment/index'})
        })
        App.showSuccess(res.msg.success);
      }
    })
  },
  createOrder() {
    App._get('registration.Registration/createOrder', this.getSubmitData(), res => {
      if (res.code === 1) {
        // 发起微信支付
        if (res.data.pay_type == PayTypeEnum.WECHAT.value) {
          App.wxPayment({
            payment: res.data.payment,
            success: res => {
              this.subscribeMessage(()=>{
                wx.reLaunch({url:'/pages/user/my-appointment/index'})
              })
              
            },
            fail: res => {
              // App.showError(res.errMsg);
            },
          });
        }
        // 余额支付
        if (res.data.pay_type == PayTypeEnum.BALANCE.value) {
          this.pay({ order_id: res.data.order_id, pay_type: PayTypeEnum.BALANCE.value })
        }

      }
    })
  },
  submit() {
    try {
      this.checkName()
      this.checkIdNum()
      this.checkGender()
      this.checkRegion()
      this.checkAddress()
      this.checkPhone()
      App._get('registration.Patient/save', this.getSubmitData(), res => {
        if (res.code === 1) {
          this.createOrder()
        }
      })
    } catch (error) {
      App.showError(error.message)
    }
  },
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.shopInfo.phone
    });
  }
})