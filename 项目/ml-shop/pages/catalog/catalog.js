// 分类
const util = require('../../utils/utils');
const api = require('../../config/api');

Page({
  data:{
    categoryList : [],// 左侧分类数据
    currentCategory : {}, // 当前选中的分类
    currentSubCategoryList : {}, // 左侧的子分类
    goodsCount : 0,// 商品数量
  },
  // 获取一级分类和商品数量
  getCatalog(){
    wx.showLoading({
      title: '加载中...',
    });

    util.request(api.CatalogList).then(res=>{
      // console.log(res);
      this.setData({
        categoryList : res.data.categoryList,
        currentCategory : res.data.currentCategory,
        currentSubCategoryList : res.data.currentSubCategory
      });
      wx.hideLoading();
    });

    util.request(api.GoodsCount).then(res=>{
      this.setData({
        goodsCount : res.data.goodsCount
      })
    })
  },
  // 点击一级分类，
  switchCate(e){
    let id = e.currentTarget.dataset.id;
    this.getCurrentCategory(id);
  },
  // 根据分类ID获取二级分类
  getCurrentCategory(id){
    util.request(api.CatalogCurrent,{
      id:id
    }).then(res=>{
      // console.log(res);
      this.setData({
        currentCategory : res.data.currentCategory,
        currentSubCategoryList : res.data.currentSubCategory
      });
    });
  }, 
  // 生命周期函数
  onLoad(){
    this.getCatalog();
  },
  // 下拉刷新
  onPullDownRefresh(){
    console.log(123);
    wx.showNavigationBarLoading(); // 在标题中显示加载
    this.getCatalog();// 重新获取数据
    wx.hideNavigationBarLoading(); // 完成，停止加载
    wx.stopPullDownRefresh();// 停止下拉刷新
  }
})