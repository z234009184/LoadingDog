// pages/account_list/account_list.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listMap: [],
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryAccountDetailByUserId();    
  },

  // 13、用户的账户明细数据列表
  queryAccountDetailByUserId: function () {
    wx.showNavigationBarLoading();
    wx.request({
      url: wx.ld_api.queryAccountDetailByUserId,
      data: {
        userId: wx.user.userId,
        page: this.data.page,
        rows: 20
      },
      success: (res) => {
        console.log(res);
        const tempArr = res.data.data.listMap;
        // 如果当前页码为第一页
        if (this.data.page == 1) {
          this.setData({
            listMap: [{type: 1, fee: '5.00', createTime: '2019-12-19 13:59:00'}]
          })
          // this.data.listMap.length = 0;
        }
        this.setData({
          listMap: this.data.listMap.concat(tempArr)
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
    this.queryAccountDetailByUserId();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.queryAccountDetailByUserId();
  },
})