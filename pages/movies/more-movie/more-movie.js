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