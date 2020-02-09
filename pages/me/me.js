// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: "/assets/imgs/login_avatar.png",
    nickName: "点击登录",
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

  onShow: function() {
    if (wx.user.userId == null) return ;
    this.setData({
      avatarUrl: wx.user.avatarUrl,
      nickName: wx.user.nickName
    });
    console.log(wx.user.userId);
    this.queryUserInfoById();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
        var balance = 0;
        var income = 0;
        if (res.data.data.userInfo != null && res.data.data.userInfo != "undefined") {
          balance = res.data.data.userInfo.balance || 0;
          income = res.data.data.userInfo.income || 0;
        }
        this.setData({
          balance: balance,
          income: income
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },

  // 登录
  onTapLogin: function() {
    if (wx.user.userId == null) {
      wx.navigateTo({
        url: '../login/login',
      });
      return;
    }
  },


  // 提现
  onClickWithdraw: function() {
    if (wx.user.userId == null) {
      wx.navigateTo({
        url: '../login/login',
      });
      return;
    }

    wx.navigateTo({
      url: '../withdraw/withdraw',
    });
      
  },

  onClickAccountList: function() {
    if (wx.user.userId == null) {
      wx.navigateTo({
        url: '../login/login',
      });
      return;
    }

    wx.navigateTo({
      url: '../account_list/account_list',
    });
  },

  onClickMyPublished: function () {
    if (wx.user.userId == null) {
      wx.navigateTo({
        url: '../login/login',
      });
      return;
    }

    wx.navigateTo({
      url: '../my_published/my_published',
    });
  },

  onClickMyBuyed: function () {
    if (wx.user.userId == null) {
      wx.navigateTo({
        url: '../login/login',
      });
      return;
    }

    wx.navigateTo({
      url: '../my_buyed/my_buyed',
    });
  },

})