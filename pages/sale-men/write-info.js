// pages/sale-men/write-info.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    delete: true,
    multiple: 10,
    remark: '',
    task_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      task_id: options.id
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

  /*上传文件*/
  handleUploadFile() {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let query = '';
        query += '&wxapp_id=' + App.getWxappId();
        query += '&token=' + wx.getStorageSync('token');

        const tempFilePaths = res.tempFilePaths;

        wx.uploadFile({
          url: 'https://dev.quantianxia.xin/index.php?s=/api/upload/image' + query,
          filePath: tempFilePaths[0],
          name: 'iFile',
          //formData: {
          //'user': 'test'
          //},
          success(res) {
            const data = res.data;
          
            //do something
          },
          fail: function () {
            console.log(arguments)
          }
        })
      }
    })
  },

  /*上传文件 weui组件上传*/
  handleUploadFile2({detail}) {
    var that = this;
    console.log(detail)

    let query = '';
    query += '&wxapp_id=' + App.getWxappId();
    query += '&token=' + wx.getStorageSync('token');

    const tempFilePaths = detail.tempFilePaths;

    tempFilePaths.forEach((file, i) => {
      let index = that.data.files.push({url: file, loading: true})
      wx.uploadFile({
        url: 'https://dev.quantianxia.xin/index.php?s=/api/upload/image' + query,
        filePath: file,
        name: 'iFile',
        success(res) {
          let data = JSON.parse(res.data)
          that.data.files[index - 1].loading = false;
          that.data.files[index - 1].url = data.data.file_path;
          that.setData({
            files: that.data.files
          })
        }
      })
    })

  },



  /*获取文本框的值*/ 
  handleDescriptionInput(e){
    this.setData({remark: e.detail.value})
  },

  /*提交*/
  submitContent() {
    let _this = this;
    let data = this.data;
    let params = {};
    params.wxapp_id = App.getWxappId();
    params.token = wx.getStorageSync('token');
    params.task_id = data.task_id,
    params.remark = data.remark;
    params.attach = data.files.map(item => item.url).join(',')
    console.log(params)
    if(!params.token || !params.task_id || !params.remark || !params.attach) {
      App.showSuccess('请检查必填项')
      return;
    }

    App._post_form('user.task/situation', params,
    res => {
      App.showSuccess('提交成功', function() {
        wx.navigateBack({
          delta: 1,
        })
      })
    })
  }
})