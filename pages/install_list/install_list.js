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

    return;

    console.log(options);
    const carBrandId = options.carBrandId;
    const carTypeId = options.carTypeId;
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

  },

// 点击创建
  onClickCreate: function() {
    wx.navigateTo({
      url: '../create/create',
    })
  }

  
})