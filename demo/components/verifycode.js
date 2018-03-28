// components/verifycode/verifycode.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShow:false,
    isFocus:false,
    inputValue:'',
    src:'image/close.png',
    phone:'15200000000',
    codes:["","","","","",""]
  },
  /**
  * 组件的属性列表
  */
  properties: {
    title: {
      type: String,
      value: "请输入验证码"
    },
    content: {
      type: String,
      value: "已发送到手机号:"
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //展示
    showView({phone, inputSuccess}) {
      this.inputSuccess = inputSuccess;
      var mPhone = phone.substr(0, 3) + '****' + phone.substr(7); 
      this.setData({
        isShow: !this.data.isShow,
        phone: mPhone,
        isFocus:true,
        codes: ["", "", "", "", "", ""]
      })
    },
    /**
     * 关闭组件
     */
    closeView(){
      this.setData({
        isShow: !this.data.isShow,
        isFocus:false
      })
    },
    /**
     * 点击输入框
     */
    openKeyboard: function () {
      this.setData({
        isFocus: true
      })
    },
    /**
     * 监听键盘输入
     */
    listenKeyInput: function (e) {
      var text = e.detail.value;
      var textLength = text.length;
      var codeArray = new Array();
      for (var i = 0; i < (textLength > 6 ? 6 : textLength) ; i++ ){
        var code = text.substr(i, 1);
        codeArray[i] = (code);
      } 
      for (var i = codeArray.length; i < 6; i++) {
          codeArray.push("");
      } 
      this.setData({
        codes: codeArray
      })
      if (textLength >5 ) {
        var returnString = text.substr(0, 6);
        this.inputSuccess(returnString);
        this.setData({
          inputValue:''
        });
      }
    }
  }
  
})
