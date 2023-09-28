// pages/user/userInfo/index.ts
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    nickName: '',
    genderShow: false,
    genderColumns: [
        { text:'男',value:1 },
        { text:'女', value:2 }
    ], // 1,2
    mobile: '',
    avatarUrl: '',
    gender: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel) {
      eventChannel.on('userInfo', (data) => {
        console.log('data',data)
        this.setData({
            userInfo: data,
            nickName: data.nickName,
            mobile: data.mobile,
            avatarUrl: data.avatarUrl,
            gender: {
                text: data.gender.name,
                value: data.gender.value
            },
        })
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
  onChange(e) {
    const { type } = e.currentTarget.dataset
    this.setData({
      [type]: e.detail
    })
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
      console.log('detail',detail)
    this.setData({
      gender: detail.value,
    })
    this.genderShowClose()
  },
  onChooseAvatar(e) {
    console.log('e',e)
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  },

  //保存
  submit() {
    const { nickName, gender } =this.data
    let query = '';
    query += '&wxapp_id=' + App.getWxappId();
    query += '&token=' + wx.getStorageSync('token');
    console.log('query',query)
    wx.uploadFile({
        url: 'https://dev.quantianxia.xin/index.php?s=/api/upload/image' + query,
        filePath: this.data.avatarUrl,
        name: 'iFile',
        success(res) {
            console.log('res',res)
        },
        fail(err) {
            console.log('err',err)
        }
      })

    const params={
        nickName, 
        gender: gender.value
    }
    console.log('params',params)
    // App._get('user/info', params, function (result) {
    //     console.log('result',result)
    //     if(result.code==1){
    //         wx.navigateBack({
    //             delta: 1 
    //         })
    //     }
    // });
  }

})