// import router from '../../../utils/router'
// import myMorningSieveApi from '../../../apis/myMorningSieve'

Page({

    /**
     * 页面的初始数据
     */
    data: {
      earlyScreeningArr:[
        {
          id: 1,
          signCode: "***56197",
          processStr: "已报名",
          subOrderSn: "12345"
        },
        {
          id: 2,
          signCode: "***35684",
          processStr: "查看报告",
          subOrderSn: "67890"
        },
        {
          id: 3,
          signCode: "***28922",
          processStr: "已采样",
          subOrderSn: "54321"
        },
        // 可以继续添加更多数据项
      ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let that = this
        // myMorningSieveApi.getOwnerList().then(res=>{
        //     that.setData({
        //         earlyScreeningArr:res
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

    onDetail({currentTarget}){
        console.log('currentTarget',currentTarget)
        const { code,signcode} = currentTarget.dataset;
        wx.navigateTo({
			url: `/pages/user/my-report/earlyScreeningSchedule/index?code=${code}&signcode${signcode}`
		})
        // router.push({
        //   name: 'earlyScreeningSchedule',
        //   data:{
        //     code,
        //     signcode
        //   }
        // })
    }
})