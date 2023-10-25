const App = getApp()

Page({
	data: {
		goodList: {},
		isLoading: true,
		category_id: '',
	},

	onLoad(options) {
		this.setData({
		  category_id: options.category_id
		})
		if(options.name) {
			wx.setNavigationBarTitle({
				title: options.name,
			});
		}
	},
})