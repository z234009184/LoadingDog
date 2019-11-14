// pages/create/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 下一步
  onClickNext: function () {
    console.log(123);
    wx.navigateTo({
      url: '../create/create',
    })
      
  },

  // 完成
  onClickFinish: function () {

  }

})

  
  