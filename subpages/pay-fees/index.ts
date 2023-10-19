const App = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    disabled: true,
    loading: false,
  },

  onChange({ detail }) {
    let disabled = true;
    const numArr = detail.split('.')
    if (numArr.length > 1) {
      if (detail > 0 && /\d\.?\d*/ && numArr[1].length > 0 && numArr[1].length < 3) {
        disabled = false
      } else {
        disabled = true
      }
    } else {
      if (detail > 0) {
        disabled = false
      } else {
        disabled = true
      }
    }

    this.setData({
      disabled,
      value: detail
    })
  },

  pay() {
    const { value } = this.data
    if (value > 0) {
      this.setData({
        loading: true,
      })

      App._get('user.payOrder/create', { pay_price: value, pay_type: 20, order_type: 120 }, res => {
        if (res.code === 1) {
          App.wxPayment({
            payment: res.data.payment,
            success: res => {
              this.setData({
                value: ''
              })
              App.showSuccess("支付成功")
            },
            fail: res => {
              // App.showError(res.errMsg);
            },
          });
        }

        this.setData({
          loading: false,
        })
      })
    }
  }
})
