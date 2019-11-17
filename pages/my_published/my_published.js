// pages/my_published/my_published.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    installList: [],
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryInstallationByUserIdWithPage();    
  },

  // 12、根据用户ID分页获取已发布的安装图信息列表
  queryInstallationByUserIdWithPage: function () {
    wx.showNavigationBarLoading();
    wx.request({
      url: wx.ld_api.queryInstallationByUserIdWithPage,
      data: {
        userId: wx.user.userId,
        page: this.data.page,
        rows: 20
      },
      success: (res) => {
        console.log(res);
        const tempArr = res.data.data.installList;
        // 如果当前页码为第一页
        if (this.data.page == 1) {
          // this.setData({
          //   installList: [{carBrandName: '奥迪', carTypeName: '一汽-大众奥迪', createTime: '2019-12-19 13:59:00', status: 0}]
          // })
          this.data.installList.length = 0;
        }
        this.setData({
          installList: this.data.installList.concat(tempArr)
        });
        if (tempArr.length > 0) {
          this.data.page++;
        }
      },
      complete: () => {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }
    })
      
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.page = 1;
    this.queryInstallationByUserIdWithPage();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.queryInstallationByUserIdWithPage();
  },
})