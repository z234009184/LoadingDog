//app.js

const domain = 'http://101.201.66.75:8083/edog/';

App({
  globalData: {

  },
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

    this.registerAPI();

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule;
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },

  // 服务器API
  registerAPI: function() {
    wx.ld_api = {};
    wx.ld_api.getWxOpenIdAndSessionKey = domain + 'getWxOpenIdAndSessionKey.shtml'; // code
    wx.ld_api.saveWxUserInfo = domain + 'saveWxUserInfo.shtml';
    wx.ld_api.queryUserInfoById = domain + 'queryUserInfoById.shtml';
    wx.ld_api.queryAllCarBrand = domain + 'queryAllCarBrand.shtml';
    wx.ld_api.queryCarTypeByBrandId = domain + 'queryCarTypeByBrandId.shtml';
    wx.ld_api.addInstallation = domain + 'addInstallation.shtml';
    wx.ld_api.addInstallStep = domain + 'addInstallStep.shtml';
    wx.ld_api.addInstallImage = domain + 'addInstallImage.shtml';
    wx.ld_api.queryInstallationByCarBrandAndTypeId = domain + 'queryInstallationByCarBrandAndTypeId.shtml';
    wx.ld_api.queryInstallStepAndImageInfo = domain + 'queryInstallStepAndImageInfo';
    wx.ld_api.queryInstallationByUserIdWithPage = domain + 'queryInstallationByUserIdWithPage';
    wx.ld_api.queryAccountDetailByUserId = domain + 'queryAccountDetailByUserId.shtml';
    wx.ld_api.queryPurchaseRecordByUserId = domain + 'queryPurchaseRecordByUserId.shtml';
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})