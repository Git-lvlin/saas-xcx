import dayjs from 'dayjs'

const App = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    radio: null,
    dateList: [
      {
        type: 1,
        p: '不限',
        b: '日期',
        date: ''
      },
    ],
    doctor: [],
    selectDoctorInfo: {},
    popVisible: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let { dateList } = this.data
    App._get("registration.Registration/setting", {}, res => {
      if (res.code === 1) {
        dateList = dateList.concat(res.data.registration_day.map(item => {
          return {
            ...item,
            type: 2,
            p: dayjs(item.date).format('MM-DD'),
            b: item.week
          }
        }))
        this.setData({
          dateList
        })
      }
      this.getDoctorList('')
    })
  },

  getDoctorList(date, cb) {
    App._get("registration.Registration/doctorList", { date }, res => {
      if (res.code === 1) {
        this.setData({
          doctor: res.data.list
        })
        cb && cb()
      }
    })
  },

  getDoctor(clerk_id, cb) {
    App._get("registration.Registration/doctor", { clerk_id }, res => {
      if (res.code === 1) {
        let active = 0
        const arr = []
        res.data.registration_day.forEach((item, index) => {
          if (item.date === this.data.dateList[this.data.active].date) {
            active = index
          }
          arr.push({ ...item, p: dayjs(item.date).format('MM-DD'), b: item.week })
        })
        this.setData({
          active,
          popVisible: true,
          selectDoctorInfo: {
            ...res.data,
            registration_day: arr,
          }
        },() => {
          this.selectComponent('#van-tabs').scrollIntoView()
        })
        cb && cb()
      }
    })
  },

  getDoctorHandle(e) {
    const { dataset } = e.currentTarget
    this.getDoctor(dataset.data.clerk_id)
  },

  beforeChange(e) {
    const { dateList } = this.data
    this.getDoctorList(dateList[e.detail.index].date, () => {
      e.detail.callback(true)
      this.setData({
        active: e.detail.index
      })
    })
  },

  onClose() {
    this.setData({
      popVisible: false,
      radio: null
    })
  },

  radioChange(e) {
    this.setData({
      radio: e.detail
    })
  },

  tabChange() {
    this.setData({
      radio: null
    })
  },

  submit() {
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
  }

})
