var util = require("../../../utils/util.js");
// pages/movies/more-movie/more-movie.js
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
    var category = options.category;
    this.setData({
      category: category
    });
    console.log(options);
    var dataUrl = "";
    switch (category){
      case "正在热映":
        dataUrl = "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = "/v2/movie/coming_soon";
        break;
      case "top250":
        dataUrl = "/v2/movie/top250";
        break;
    }
  },
  onReady:function(){
    var that = this;
    //设置导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.category,
      success: function () {

      }
    })
  }
})