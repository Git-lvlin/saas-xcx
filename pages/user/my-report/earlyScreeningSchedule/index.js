const App = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        steps: [],
        active: 0,
        showSharePopup: false,
        code: '',
        signcode: '',
        reporturl: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this
        this.setData({
          code:options.code,
          signcode:options.signcode,
          reporturl:options.reporturl
        })
        App._post_form('external.index/index&reqCode=healthyScreenSignProcess', { code:options.code }, function (result) {
          if(result.code==1){
            that.setData({
              steps: result.data.map(item=>({ text: item.name, desc: item.timeStr })),
              active: result.data.filter(item=>item.enable == 1).length-1,
              showSharePopup: result.data.filter(item=>item.actionUrl != '').length
            })
          }
      });
    },
    informedConsent(){

    },
    showSharePopup() {
      wx.downloadFile({
        // 示例 url，并非真实存在
        url: this.data.reporturl,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
        }
      })
    },
})