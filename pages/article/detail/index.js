const App = getApp();

// 富文本插件
import wxParse from '../../../wxParse/wxParse.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 文章详情
    detail: {},
    str: '',
    flage: false,
    is_show_buttom_bar: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取文章详情
    this.getArticleDetail(options.article_id);
  },

  /**
   * 获取文章详情
   */
  getArticleDetail(article_id) {
    let _this = this;
    App._get('article/detail', {
      article_id
    }, function (result) {
      let detail = result.data.detail;
      // 富文本转码
      let str = ''
      if (detail.article_content.length > 0) {
        str = detail.article_content
      }
      wx.setNavigationBarTitle({
        title: detail.category.tag || '资讯详情'
      });
      _this.setData({
        detail,
        str,
        flage: detail.is_thumb_up,
        is_show_buttom_bar: detail.is_show_buttom_bar
      });
    });
  },

  /**
   * 分享当前页面
   */
  onShareAppMessage() {
    // 构建页面参数
    const params = App.getShareUrlParams({
      'article_id': this.data.detail.article_id
    });
    return {
      title: this.data.detail.article_title,
      path: "/pages/article/detail/index?" + params
    };
  },

  /**
   * 分享到朋友圈
   * 本接口为 Beta 版本，暂只在 Android 平台支持，详见分享到朋友圈 (Beta)
   * https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share-timeline.html
   */
  onShareTimeline() {
    // 构建页面参数
    const params = App.getShareUrlParams({
      'article_id': this.data.detail.article_id
    });
    return {
      title: this.data.detail.article_title,
      path: "/pages/article/detail/index?" + params
    };
  },

  onHelp() {
    App._post_form('article/thumbup', { article_id:this.data.detail.article_id }, (result) => {
      if(result.code==1){
        this.setData({
          flage: !this.data.flage
        })
      }
    });
  },
  onShare() {
    App._post_form('article/shareCallback', { article_id:this.data.detail.article_id }, function (result) {
      if(result.code==1){

      }
    });
  }

})