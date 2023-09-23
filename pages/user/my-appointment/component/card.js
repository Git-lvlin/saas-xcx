'use strict';
Component({
	properties: {
    active: Number
	},
	methods: {
		onCancel() {
			wx.showModal({
				title: '提示',
				content: '确认要取消预约吗？',
				confirmColor: '#408CFF',
				success: ()=> {
					console.log(11);
				}
			})
		}
	}
});