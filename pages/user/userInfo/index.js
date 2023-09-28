
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
    avatar_id: '',
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
  //表单事件
  onChange(e) {
    const { type } = e.currentTarget.dataset
    this.setData({
      [type]: e.detail
    })
  },
  //性别弹窗打开
  genderShowOpen() {
    this.setData({
      genderShow: true
    })
  },
  //性别弹窗关闭
  genderShowClose() {
    this.setData({
      genderShow: false
    })
  },
  //性别弹窗确认
  genderConfirm({ detail }) {
    this.setData({
      gender: detail.value,
    })
    this.genderShowClose()
  },
  //修改微信头像
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    let _this=this 
    this.setData({
      avatarUrl,
    })
    wx.uploadFile({
        url: App.api_root + 'upload/image',
        filePath: avatarUrl,
        name: 'iFile',
        formData: {
            wxapp_id: App.getWxappId(),
            token: wx.getStorageSync('token')
          },
        success(res) {
            console.log('res',res)
            if(JSON.parse(res.data).code==1){
                _this.setData({
                    avatar_id: JSON.parse(res.data).data.file_id
                })
            }
        },
        fail(err) {
            console.log('err',err)
        }
      })
  },

  //退出登录
  doLogout() {
    wx.setStorageSync('token', '');
    wx.setStorageSync('user_id', '');
    wx.removeStorageSync('invite_code');
    wx.setStorageSync('role', 0);
    App.globalData.session_key=''
    wx.navigateBack({
      delta: 1 
    })
  },

  //保存
  submit() {
    const { nickName, gender, avatar_id } =this.data

    const params={
        nickname: nickName, 
        gender: gender.value,
        avatar_id: avatar_id
    }
    console.log('params',params)
    App._post_form('user/info', params, function (result) {
        console.log('result',result)
        if(result.code==1){
            wx.navigateBack({
                delta: 1 
            })
        }
    });


  }

})