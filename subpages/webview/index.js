Page({
  optionsInfo: {},

  data: {
    link: "",
  },

  onLoad(options) {
    if (!options.url) {
      wx.navigateBack({
       delta: 1 
      })
     return;
    }
    let link = options.url.includes('%') ? decodeURIComponent(options.url) : options.url;
    if (options.encode) {
      link = decodeURIComponent(link)
    }
    console.log('link', link);
    this.setData({
      link,
    });
    this.optionsInfo = {
      ...options,
      link
    };
    
  },

  onShow() {

  },

  onHide() {

  },


  handlePostMsg(event) {
  console.log("🚀 ~ file: index.js ~ line 21 ~ handlePostMsg ~ event", event)
    
  }
})