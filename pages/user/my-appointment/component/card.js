'use strict';
const App = getApp();

Component({
	properties: {
		active: Number,
	},

	data: {
		dataSource: [],
		isRefresher: false,
		page: 1,
		currentPage: 1,
		maxPage: 1
	},

	ready: function () {
		this.getData()
	},

	methods: {
		onCancel(e) {
			wx.showModal({
				title: '提示',
				content: '确认要取消预约吗？',
				confirmColor: '#408CFF',
				success: (res)=> {
					if(res.confirm) {
						this.getCancel(e.currentTarget.id)
					}
				}
			})
		},
		getData(page = 1, isPage) {
			this.setData({
				isRefresher: true
			})
			App._get("registration.Registration/page", { page,size:20,status:this.data.active }, res => {
				if (res.code === 1) {
					if(isPage) {
						let resList = res.data.data,
        		dataList = this.data.dataSource;
						this.setData({
							dataSource: dataList.data.concat(resList),
							isRefresher: false,
							maxPage: res.data.last_page, 
							currentPage: res.data.current_page
						})
					} else {
						this.setData({
							dataSource: res.data.data,
							isRefresher: false,
							maxPage: res.data.last_page, 
							currentPage: res.data.current_page
						})
					}
				}
			})
		},

		getCancel(id) {
			App._post_form("registration.Registration/cancel", {id}, res => {
				if(res.code === 1) {
					const data = this.data.dataSource.filter(res => res.id != id)
					this.setData({
						dataSource: data
					})
				}
			})
		},

		getLowerData() {
			if(this.data.maxPage < this.data.current_page) {
				this.getData(this.data.current_page + 1, true)
			}
		}
	}
});