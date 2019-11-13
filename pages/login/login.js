// pages/login/login.js

const UserKey = 'UserKey';

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
    wx.user = {};
    // 0.默认进入登录页面
    // 1.从沙盒中取出 wx.user 
    wx.user = wx.getStorageSync(UserKey);
    // 2.取出如果wx.user.userId为空 表示从未登录过 (如果不为空 则跳转步骤7)
    if (wx.user.userId != "undefined" && wx.user.userId != null && wx.user.userId != "") {
      this.jumpHomePage();
    } 
    // 3.点击登录 先授权获取 用户信息（头像，昵称，性别，城市）
    // 4.调用wx.login 获取 code
    // 5.获取code成功后 进行 调用服务器接口登录 获取 userId 
    // 6.将用户信息 userId 存入wx.user 并存储到沙盒
    // 7.登录成功跳转到tab页首页
  },

  getUserInfo: function(evt) {
    if (evt.detail.userInfo == 'undefined' || evt.detail.userInfo == null) {
      return;
    }
    wx.showLoading({
      title: '加载中',
    });
    wx.login({
      success: (res) => {
        if (res.code) {
          // 调用开发者服务器登录
          this.login(res.code, evt.detail.userInfo);
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },

// 登录
  login: function(code, userInfo) {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: wx.ld_api.getWxOpenIdAndSessionKey,
      data: {
        code: code
      },
      success: (res) => {
        console.log(res);
        wx.user = userInfo;
        wx.user.userId = res.data.data.userId;
        wx.setStorageSync(UserKey, wx.user);
        this.jumpHomePage();
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },


// 跳转到首页
  jumpHomePage: function () {
    wx.switchTab({
      url: '/pages/index/index',
    });
  }
})