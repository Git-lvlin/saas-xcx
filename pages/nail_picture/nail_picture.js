// pages/index2/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coordinate: {
      latitude: '23.02801435717549',
      longitude: '113.687109842041',
    },
    markders: [{
        id: 1,
        latitude: '23.02801435717549',
        longitude: '113.687109842041',
        height: '30',
        width: '20',
        alpha: 0,
        
        label: {
          id: '1212',
          content: '万江文峰水店1',
          anchorY: -40,
          anchorX: -20,
          bgColor: '#333333',
          color: '#fff',
          padding: '5px',
          borderRadius: 4
        }
      },
      {
        id: 2,
        latitude: '23.023590779731304',
        longitude: '113.55321396801756',
        height: '30',
        width: '20',
        alpha: 0,
        label: {
          content: '万江文峰水店',
          anchorY: -40,
          anchorX: -20,
          bgColor: '#333333',
          color: '#fff',
          padding: '5px',
          borderRadius: 4
        }
      },
      {
        id: 3,
        latitude: '22.909791855443334',
        longitude: '113.54222763989256',
        height: '30',
        width: '20',
        alpha: 0,
        label: {
          content: '万江文峰水店',
          anchorY: -40,
          anchorX: -20,
          bgColor: '#333333',
          color: '#fff',
          padding: '5px',
          borderRadius: 4
        }
      },
      {
        id: 4,
        latitude: '22.866143566573864',
        longitude: '113.63149155590818',
        height: '30',
        width: '20',
        alpha: 0,
        label: {
          content: '万江文峰水店',
          anchorY: -40,
          anchorX: -20,
          bgColor: '#333333',
          color: '#fff',
          padding: '5px',
          borderRadius: 4
        }
      },
      {
        id: 5,
        latitude: '22.833872770985394',
        longitude: '113.65895737622068',
        height: '30',
        width: '20',
        alpha: 0,
        label: {
          content: '万江文峰水店',
          anchorY: -40,
          anchorX: -20,
          bgColor: '#333333',
          color: '#fff',
          padding: '5px',
          borderRadius: 4
        }
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.getLocation({
      isHighAccuracy: true,
      highAccuracyExpireTime: 4000,
      success: function (res) {
        _this.setData({
          coordinate: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindlabeltap(e){
    
    let result = this.data.markders.find(item => item.id === e.detail.markerId)
    console.log(result)
    wx.openLocation({
      latitude: Number(result.latitude),
      longitude: Number(result.longitude),
      name: result.label.content,
      address: '广东省东莞市万江区'
    })
  }
})