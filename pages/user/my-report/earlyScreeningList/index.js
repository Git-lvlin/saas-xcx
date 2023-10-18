const App = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
      earlyScreeningArr:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      let that = this
      const params={
     
      }
      App._post_form('external.index/index&reqCode=healthyScreenSignList', params, function (result) {
          if(result.code==1){
            that.setData({
              earlyScreeningArr:result.data
            })
          }
      });
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

    onDetail({currentTarget}){
        const { code, signcode, reporturl} = currentTarget.dataset;
        wx.navigateTo({
          url: `/pages/user/my-report/earlyScreeningSchedule/index?code=${code}&signcode=${signcode}&reporturl=${reporturl}`
        })
    }
})