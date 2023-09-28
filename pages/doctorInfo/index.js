// pages/doctorInfo/index.ts
let App = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
		info: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
		this.getDoctorInfo(options.clerk_id)
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
	
	getDoctorInfo (id) {
		App._get('registration.Registration/doctorDetail', {clerk_id: id}, (res)=> {
			if(res.code === 1) {
				let str = res.data.detail
				const lt = /&lt;/gim
				const gt = /&gt;/gim
				const quot = /&quot;/gim
				const img = /img/gim
				str = str.replaceAll(lt, '<')
				str = str.replaceAll(gt, '>')
				str = str.replaceAll(quot, '"')
				str = str.replaceAll(img, 'img style="width: 100%;"')
				this.setData({
					info: {
						...res.data,
						detail: str
					}
				})
			}
		})
	}

})