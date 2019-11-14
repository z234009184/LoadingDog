//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 用来区分点击时候的类型 brand: 点击品牌 version: 点击车型
    type: "brand", 
    // 是否显示 索引条 eg: ‘A’ toast
    hidden: true, 
    // 品牌列表
    brandlist: [], 
    // 选中的品牌
    selectedBrand: { 
      name: '请选择品牌',
      id: null
     },
    // 车型列表
    carTypeList: [],
    // 选中的车型
    selectedVersion: { 
      carCategoryName: '请选择车型',
      id: null
     },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryAllCarBrand();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    wx.createSelectorQuery().select('.indexBar-box').boundingClientRect(function (res) {
      that.setData({
        boxTop: res.top
      })
    }).exec();
    wx.createSelectorQuery().select('.indexes').boundingClientRect(function (res) {
      that.setData({
        barTop: res.top
      })
    }).exec()
  },

  //获取文字信息
  getCur(e) {
    this.setData({
      hidden: false,
      listCur: this.data.brandlist[e.target.id].letter,
    })
  },

  setCur(e) {
    this.setData({
      hidden: true,
      listCur: this.data.listCur
    })
  },
  //滑动选择Item
  tMove(e) {
    let y = e.touches[0].clientY,
      offsettop = this.data.boxTop,
      that = this;
    //判断选择区域,只有在选择区才会生效
    if (y > offsettop) {
      let num = parseInt((y - offsettop) / 14);
      this.setData({
        listCur: that.data.brandlist[num].letter
      })
    };
  },

  //触发全部开始选择
  tStart() {
    this.setData({
      hidden: false
    })
  },

  //触发结束选择
  tEnd() {
    this.setData({
      hidden: true,
      listCurID: this.data.listCur
    })
  },
  indexSelect(e) {
    let that = this;
    let barHeight = this.data.barHeight;
    let list = this.data.brandlist;
    let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
    for (let i = 0; i < list.length; i++) {
      if (scrollY < i + 1) {
        that.setData({
          listCur: brandlist[i].letter,
          movableY: i * 20
        })
        return false
      }
    }
  },

// 点击车辆品牌
  onClickBrand(e) {
    console.log(e);
    const section = e.currentTarget.dataset.section;
    const item = e.currentTarget.dataset.item;
    const selectedBrand = this.data.brandlist[section].list[item];
    console.log(selectedBrand);
    this.setData({
      selectedBrand: selectedBrand,
      selectedVersion: {
        carCategoryName: '请选择车型',
        id: null
      }
    });
  },

// 点击车型
  onClidkVersion: function(e) {
    console.log(e);
    this.setData({
      selectedVersion: this.data.carTypeList[e.currentTarget.dataset.item]
    });
  },

  showModal(e) {
    const type = e.currentTarget.dataset.type;
    if (type == 'version') {
      if (this.data.selectedBrand.id == null) {
        wx.showToast({
          title: '请先选择品牌',
          icon: 'none'
        })
        return;
      }
      this.queryCarTypeByBrandId();
    } 
    this.setData({
      modalName: e.currentTarget.dataset.target,
      type: type
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  
  // 获取车辆品牌数据列表
  queryAllCarBrand: function() {
    wx.request({
      url: wx.ld_api.queryAllCarBrand,
      success: (res) => {
        console.log(res);
        this.setData({
          brandlist: res.data.data.brandlist,
          listCur: res.data.data.brandlist[0].letter
        });
        
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },

  // 根据品牌查询车型列表
  queryCarTypeByBrandId: function() {
    wx.request({
      url: wx.ld_api.queryCarTypeByBrandId,
      data: {
        carBrandId: this.data.selectedBrand.id
      },
      success: (res) => {
        console.log(res);
        this.setData({
          carTypeList: res.data.data.carTypeList,
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },

// 查询安装图
  onClickQuery: function() {
    if (this.data.selectedVersion.id == null) {
      wx.showToast({
        title: '请选择品牌和车型',
        icon: 'none'
      })
      return ;
    }

    const carBrandId = this.data.selectedBrand.id;
    const carTypeId = this.data.selectedVersion.id;
    wx.navigateTo({
      url: '../install_list/install_list?carBrandId=' + carBrandId + '&carTypeId=' + carTypeId,
    })
  }


})
