// pages/install_detail/install_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    installId: null,
    listMap: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      installId: options.installId,
      domainImage: wx.ld_api.domainImage
    });

    this.queryInstallStepAndImageInfo(options.installId);
  },

  queryInstallStepAndImageInfo: function (installId) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: wx.ld_api.queryInstallStepAndImageInfo,
      data: {
        installId: installId
      },
      success: (res) => {
        console.log(res);
        this.setData({
          listMap: res.data.data.listMap
        })
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
    })

  },

  onClickImg: function (e) {
    console.log(e);
    const current = e.currentTarget.dataset.src;
    const imginfos = e.currentTarget.dataset.imginfos;


    var urls = [];
    for (var i = 0; i<imginfos.length; i++) {
      urls.push(wx.ld_api.domainImage + imginfos[i].imageUrl);
    }

    console.log(current);
    console.log(urls);

    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })

  }

  
})