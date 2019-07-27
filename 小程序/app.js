// 120.77.208.228: 82
//http://192.168.0.119:9998
App({
    onLaunch: function(e) {},
    onShow: function(e) {
        var t = wx.getStorageSync("host");
        t && (this.globalData.host = t), console.log("onShow options ==== :"), console.log(e);
        var i = wx.getSystemInfoSync();
        this.SDKVersion = i.SDKVersion, this.globalData.systemInfo = i;
    },
    globalData: {
      host: "http://192.168.0.119:9998",
        showDev: 0,
        settingDialog: !1,
        proName: "enroll",
        version: 2,
        noticeBoard: {
            showUpgradeDialog: 0,
            title: "100个公众号关联名额",
            desc: "喜欢报名小程序的你有微信公众号吗？\n如果有，就可以马上关联！\n\n请您按照以下步骤操作：\n1. 登录微信公众号\n2. 小程序管理-添加\n3. 关联小程序\n4. 输入小程序App ID：wxfaa08012777a431e\n5. 提交关联申请后，1-2天时间内通过，关联成功。\n\n备注：\n1. 关联过程中，有任何疑问请联系小程序客服。\n2. 本次关联免费，无任何 RMB 往来。"
        },
        recommend: {
            title: "许愿送祝福",
            appid: "wx3dd29bfe3e5f0d1d"
        },
        huoma: {
            title: "微友活码",
            appid: "wxfd5b9439675c4321"
        },
        adSwiper: {
            indicatorDots: !0,
            autoplay: !0,
            interval: 5e3,
            duration: 1e3
        },
        work: function() {
            return this.host.indexOf("api") > 0;
        },
        scene: function() {
            return {
                jump: (this.work(), "c752dd95b5bd66b7a135ae3f9425be23"),
                defaultcreate: (this.work(), "bb8cfe05751093e0fbea0ea183f7f99b"),
                detail: (this.work(), "8a85adac6ef9e149469357d6c07bcdc6"),
                personal: this.work() ? "c6215955f6c305a932d92d2301b4055a" : "f5953deff76ef8b3797db24e443f1af2"
            };
        },
        singleAmount: 3e5,
        appid: "wxfaa08012777a431e",
        orderId: "",
        wxReg: /^[-_a-zA-Z0-9]{6,20}$/
    },
    login: {
        status: 0,
        cbSuccess: [],
        cbError: []
    },
    fieldType: [ {
        img: "/images/ic_type_singletext.png",
        text: "单行文本",
        type: 0
    }, {
        img: "/images/ic_type_multitext.png",
        text: "多行文本",
        type: 7
    }, {
        img: "/images/ic_type_number.png",
        text: "数字",
        type: 1
    }, {
        img: "/images/ic_type_calendar.png",
        text: "日期",
        type: 3
    }, {
        img: "/images/ic_type_time.png",
        text: "时间",
        type: 6
    }, {
        img: "/images/ic_type_phone.png",
        text: "手机号",
        type: 13
    }, {
        img: "/images/ic_type_singleselection.png",
        text: "单项选择",
        type: 4
    }, {
        img: "/images/ic_type_multiselection.png",
        text: "多项选择",
        type: 5
    }, {
        img: "/images/ic_type_dropdownlist.png",
        text: "下拉框",
        type: 10
    }, {
        img: "/images/ic_type_location.png",
        text: "地理位置",
        type: 8
    }, {
        img: "/images/ic_type_picture.png",
        text: "上传单图",
        type: 14
    }, {
        img: "/images/ic_type_severalpicture.png",
        text: "上传多图",
        type: 2
    }, {
        img: "/images/ic_type_province.png",
        text: "省/市/区",
        type: 12
    }, {
        img: "/images/ic_type_handwriting.png",
        text: "手写签名",
        type: 9
    }, {
        img: "/images/ic_type_tag.png",
        text: "标签",
        type: 11
    } ]
});