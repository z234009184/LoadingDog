// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 安装id
    installId: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      installId: options.installId,
      stepNumber: parseInt(options.stepNumber)
    });
  },

  



// 8、添加安装步骤信息（文字描述）
  addInstallStep: function () {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: wx.ld_api.addInstallStep,
      data: {
        installId: this.data.installId,
        stepNumber: this.data.stepNumber,
        title: ''
      },
      success: (res) => {
        console.log(res);
        this.addInstallImage(res.data.data.stepId);
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
    })
  },

  // 9、添加安装步骤信息（图片）
  addInstallImage: function (stepId) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: wx.ld_api.addInstallImage,
      data: {
        installId: this.data.installId,
        stepId: stepId,
        imageUrl: ''
      },
      success: (res) => {
        console.log(res);
        if (res.data.code == 1) { // 添加成功
          
        }
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
    })
  },


  // 下一步
  onClickNext: function () {
    const currentStep = this.data.stepNumber + 1;
    wx.navigateTo({
      url: './create?stepNumber=' + currentStep,
    })
      
  },

  // 完成
  onClickFinish: function () {
    wx.navigateTo({
      url: '../install_detail/install_detail',
    })
  }

})

  
  