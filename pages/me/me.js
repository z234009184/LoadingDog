// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: null,
    nickName: null,
    balance: 0,
    income: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: wx.user.avatarUrl,
      nickName: wx.user.nickName
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.queryUserInfoById();
  },

// 获取用户信息
  queryUserInfoById: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: wx.ld_api.queryUserInfoById,
      data: {
        userId: wx.user.userId
      },
      success: (res) => {
        console.log(res);
        this.setData({
          balance: res.data.data.userInfo.balance,
          income: res.data.data.userInfo.income
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },

  // 提现
  onClickWithdraw: function() {
    wx.navigateTo({
      url: '../withdraw/withdraw',
    });
      
  }

})