// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 安装id
    installId: null,
    titleValue: "",
    files: [],
    imageUrls: []
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

// 选择图片
  chooseImage: function (e) {
    wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
            // 上传图片
            this.uploadFile(res.tempFilePaths)
        }
    })
  },

  // 图片上传接口
  uploadFile: function (tempFilePaths) {
    console.log(tempFilePaths);
    wx.showLoading({
      title: '加载中',
    })
    wx.uploadFile({
      url: wx.ld_api.uploadFile, //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'upload',
      formData: {
        'upload': 'file'
      },
      success: (res) => {
        console.log(res);
        this.setData({
          files: this.data.files.concat(tempFilePaths),
          imageUrls: this.data.imageUrls.concat(res.data)
        });
        console.log(this.data.files);
        console.log(this.data.imageUrls);
      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {
        wx.hideLoading();
      }
    })


  },

  // 图片预览
  previewImage: function (e) {
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  // textArea文字变化时候调用
  onChangeText: function (e) {
    this.setData({
      titleValue: e.detail.value
    });
  },


// 8、添加安装步骤信息（文字描述）
  addInstallStep: function (success) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: wx.ld_api.addInstallStep,
      data: {
        installId: this.data.installId,
        stepNumber: this.data.stepNumber,
        title: this.data.titleValue
      },
      success: (res) => {
        console.log(res);
        success && success(res.data.data.stepId);
      },
      complete: () => {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
    })
  },

  // 9、添加安装步骤信息（图片）
  addInstallImage: function (stepId, success) {
    wx.showNavigationBarLoading();
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: wx.ld_api.addInstallImage,
      data: {
        installId: this.data.installId,
        stepId: stepId,
        imageUrl: this.data.imageUrls.join(",")
      },
      success: (res) => {
        console.log(res);
        if (res.data.code == 1) { // 添加成功
          success && success();
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
    this.addInstallStep( (stepId) => {
      this.addInstallImage(stepId, () => {
        // 添加成功
        const currentStep = this.data.stepNumber + 1;
        wx.navigateTo({
          url: `./create?stepNumber=${currentStep}&installId=${this.data.installId}`
        })

      });
    })
  },

  // 完成
  onClickFinish: function () {

    this.addInstallStep((res) => {
      this.addInstallImage(res, () => {
        // 添加成功
        wx.navigateTo({
          url: `../install_detail/install_detail?installId=${this.data.installId}`,
        })
      });
    })

    
  }

})

  
  