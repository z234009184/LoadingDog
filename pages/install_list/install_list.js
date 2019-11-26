// pages/install_list/install_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    installation: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const carBrandId = options.carBrandId; // 33
    const carTypeId = options.carTypeId; // 471
    this.setData({
      carBrandId: carBrandId,
      carTypeId: carTypeId
    });

    this.queryInstallationByCarBrandAndTypeId(carBrandId, carTypeId);
  },

// 10、根据车辆品牌和车型查询安装图信息
  queryInstallationByCarBrandAndTypeId: function (carBrandId, carTypeId) {
    wx.request({
      url: wx.ld_api.queryInstallationByCarBrandAndTypeId,
      data: {
        carBrandId: carBrandId,
        carTypeId: carTypeId
      },
      success: (res) => {
        console.log(res);
        this.setData({
          installation: res.data.data.installation,
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },

// 点击安装 去支付
  onClickInstall: function() {
    // 先支付
    wx.navigateTo({
      url: `../install_detail/install_detail?installId=${this.data.installation.id}`,
    })
  },

// 点击创建
  onClickCreate: function() {
    this.addInstallation(this.data.carBrandId, this.data.carTypeId);
  },

  // 7、添加安装图信息
  addInstallation: function (carBrandId, carTypeId) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '请稍等',
    });
    wx.request({
      url: wx.ld_api.addInstallation,
      data: {
        userId: wx.user.userId,
        carBrandId: carBrandId,
        carTypeId: carTypeId
      },
      success: (res) => {
        console.log(res);
        wx.navigateTo({
          url: '../create/create?installId=' + res.data.data.installId + '&stepNumber=1',
        })
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
    })
  },

  
})