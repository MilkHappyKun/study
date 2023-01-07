// 商品详情页面
const util = require('../../utils/utils');
const api = require('../../config/api')

Page({
  data : {
    id : 0, //请求商品id
    goods : {},// 商品数据
    relatedGoods:[],// 大家都在看
    attribute : [],// 商品的参数
    issueList : [], // 常见问题数据
    comment : [],// 评论
    brand : {},// 制造商信息
    specificationList : [],// 规格信息
    productList : [],// 一个商品对应的不同产品
    checkedSpecPrice : 0,// 商品价格
    checkedSpecText:'规格数量选择',// 商品基本信息下面的标准文字
    content :"",// 详情的富文 
    number:1,// 商品的数量
    openAttr: false,// 规格弹出层
    cartGoodsCount: 0,// 购物车中商品数量
    tmpSpecText:'请选择规格数量',// 规格数量信息
  },
  // 点击-1
  cutNumber(){
    this.setData({
      number: (this.data.number -1 > 1) ? this.data.number - 1 : 1
    });
  },
  // 点击+1
  addNumber(){
    this.setData({
      number: this.data.number + 1
    })
  },
  // 点击不同的规格
  clickSkuValue(event){
    let specName = event.currentTarget.dataset.name;
    let specValueId = event.currentTarget.dataset.valueId;
    let _specificationList = this.data.specificationList;
    for (let i = 0; i < _specificationList.length; i++) {
      if (_specificationList[i].name === specName) {
        for (let j = 0; j < _specificationList[i].valueList.length; j++) {
          if (_specificationList[i].valueList[j].id == specValueId) {
            //如果已经选中，则反选
            if (_specificationList[i].valueList[j].checked) {
              _specificationList[i].valueList[j].checked = false;
            } else {
              _specificationList[i].valueList[j].checked = true;
            }
          } else {
            _specificationList[i].valueList[j].checked = false;
          }
        }
      }
    }
    this.setData({
      specificationList: _specificationList,
    });
    // 重新改变规格信息
    this.changeSpecInfo();
  },
  // 判断规格是否选择完整
  isCheckedAllSpec(){
    return !this.getCheckedSpecValue().some((data)=>{
      if(data.valueId == 0){
        return true;
      }
    });
  },
  // 规格变化时，重新计算价格及显示信息
  changeSpecInfo(){
    let checkedNameValue = this.getCheckedSpecValue();
    // console.log(checkedNameValue);
    // 设置选择的信息
    let checkedValue = checkedNameValue.filter((data)=>{
      if(data.valueId != 0){
        return true;
      }else {
        return false;
      }
    }).map((data)=>{
      return data.valueText;
    });
    if(checkedValue.length > 0){
      this.setData({
        tmpSpecText : checkedValue.join(' ')
      });
    }else{
      this.setData({
        tmpSpecText: "请选择规格数量"
      });
    }
    // 设置商品基本信息下面的状态
    if(this.isCheckedAllSpec()){
      this.setData({
        checkedSpecText: this.data.tmpSpecText
      })
    }
  },
  // 获取选中的规格信息
  getCheckedSpecValue(){
    let checkedValues = [];
    let _specificationList = this.data.specificationList;
    for(let i = 0; i < _specificationList.length; i++){
      let _checkedObj = {
        name: _specificationList[i].name,
        valueId : 0,
        valueText: ''
      };
      for(let j = 0; j < _specificationList[i].valueList.length; j++){
        if(_specificationList[i].valueList[j].checked){
          _checkedObj.valueId = _specificationList[i].valueList[j].id;
          _checkedObj.valueText = _specificationList[i].valueList[j].value;
        }
      }
      checkedValues.push(_checkedObj);
    }
    return checkedValues;
  },
  // 点击X关闭规格弹出层
  closeAttr(){
    if(this.data.openAttr == true){
      this.setData({
        openAttr: false
      });
    }
  },
  // 点击规格显示弹出层
  switchAttrPop(){
    if(this.data.openAttr == false){
      this.setData({
        openAttr: true
      });
    }
  },
  // 获取大家都在看的相关商品
  getGoodsRelated(){
    util.request(api.GoodsRelated,{ id : this.data.id }).then(res =>{
      if(res.errno === 0){
        // console.log(res);
        this.setData({
          relatedGoods : res.data.goodsList,
        });
      }
    })
  },
  // 获取商品信息
  getGoodsInfo(){
    util.request( api.GoodsDetail , {id : this.data.id }).then(res => {
      if(res.errno === 0){
        // console.log(res);
        this.setData({
          goods: res.data.info,
          attribute: res.data.attribute,
          issueList: res.data.issue,
          comment: res.data.comment,
          brand: res.data.brand,
          specificationList: res.data.specificationList,
          productList: res.data.productList,
          checkedSpecPrice: res.data.info.retailPrice,
          content : res.data.info.detail.replace(/\<img/gi,'<img class="diy-img" '),
          
        });
        this.getGoodsRelated();
      }
    })
  },
  // 生命周期
  onLoad(options){
    if(options.id){
      this.setData({
        id: parseInt(options.id),
      });
      this.getGoodsInfo();
    }
  }
})