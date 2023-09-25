// import myMorningSieveApi from '../../../apis/myMorningSieve'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        steps: [
            {
              text: '填写报名表',
              desc: '2023-08-12 16:00'
            },
            {
              text: '血夜采样',
              desc: '2023-08-12 16:00'
            },
            {
              text: '查看检测报告',
              desc: '2022-08-12 16:00'
            },
          ],
        active: 2,
        showSharePopup: false,
        code: '',
        signcode: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this
        this.setData({
            code:options.code,
            signcode:options.signcode,
        })
        // myMorningSieveApi.getProcess({ code:options.code }).then(res=>{
        //     that.setData({
        //         steps: res.map(item=>({ text: item.name, desc: item.timeStr })),
        //         active: res.filter(item=>item.enable == 1).length-1
        //     })
        // })
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
    showSharePopup() {
        wx.downloadFile({
            // 示例 url，并非真实存在
            url: 'https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/publicMobile/pdf/HN-HD%20-2022-01.pdf',
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
    onHideSharePopup() {
        this.setData({
            showSharePopup: false,
        })
    },
})