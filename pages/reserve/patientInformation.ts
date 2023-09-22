const App = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    genderColumns: ['男', '女'], // 1,2
    genderShow: false,
    type: '成人、儿童',
    name: '',
    phone: '',
    id_type: '居民身份证',
    id_num: '',
    gender: '',
    province_id: '',
    city_id: '',
    region_id: '',
    province_name: '',
    city_name: '',
    region_name: '',
    address: '',
    remark: '',
    region: {},
  },
  info: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel) {
      eventChannel.on('acceptDataFromOpenerPage', (data) => {
        this.info = data;
      })
    }
    
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
    if (!/1\d{10}/.test(this.data.phone)) {
      throw new Error("请输入正确11位手机号")
    }
  },
  checkName() {
    if (this.data.name.trim().length < 2) {
      throw new Error("请输入真实姓名")
    }

  },
  checkIdNum() {
    if (this.data.id_num.length !== 18) {
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
    if (!this.data.address.trim()) {
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
  getSubmitData() {
    const { type, name, phone, id_type, id_num, gender, address, region } = this.data
    return {
      patient_type: type,
      patient_name: name,
      patient_phone: phone,
      patient_id_type: id_type,
      patient_id_num: id_num,
      patient_gender: { '男': 1, '女': 2 }[gender],
      patient_province_id: region.code[0],
      patient_city_id: region.code[1],
      patient_region_id: region.code[2],
      patient_province_name: region.value[0],
      patient_city_name: region.value[1],
      patient_region_name: region.value[2],
      patient_address: address,
      pay_type: 20,
      ...this.info
      // clerk_id: this.info.clerk_id,
      // appointment_date: this.info.appointment_date,
      // section: this.info.section,
      // pay_price: this.info.pay_price,
    }
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
        console.log(res);
      })
    } catch (error) {
      App.showError(error.message)
    }
  }
})