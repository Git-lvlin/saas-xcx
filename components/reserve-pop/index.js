const App = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    doctorInfo: {
      type: Object,
      value: {},
    },
    active: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    radio: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        // popVisible: false,
        radio: null
      })
      this.triggerEvent('close')
    },
  
    radioChange(e) {
      this.setData({
        radio: e.detail
      })
    },
  
    tabChange(e) {
      this.setData({
        radio: null,
        active: e.detail.index
      })
    },
    submit() {

      if (!App.checkLogin()) {
        return 
      }
  
      const { doctorInfo, active, radio } = this.data
      if (radio === null) {
        return
      }
      wx.navigateTo({
        url: '/pages/reserve/patientInformation',
        success(res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            clerk_id: doctorInfo.doctor.clerk_id,
            appointment_date: doctorInfo.registration_day[active].date,
            section: `${doctorInfo.registration_day[active].work_plan[radio].start}-${doctorInfo.registration_day[active].work_plan[radio].end}`,
            pay_price: doctorInfo.doctor.copay
          })
        }
      })
    },
    navigationTo(e) {
      const { url } = e.currentTarget.dataset
      App.navigationTo(url)
    },
  }
})
