function a(e) {
    d.showLoading("正在加载数据"), wx.request({
        url: s.globalData.host + "/enroll/v2/homepage/info",
        method: "GET",
        dataType: "json",
        data: {
            access_token: d.getToken(),
            unionid: e.data.unionid
        },
        success: function(t) {
            if (d.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                var o = t.data.data;
                e.setData({
                    defaultName: o.name,
                    defaultWxNo: o.wx_no,
                    phoneDefault: o.phone,
                    defaultLogo: o.logo,
                    defaultSummary: o.summary,
                    name: o.name,
                    wxNo: o.wx_no,
                    phone: o.phone,
                    logo: o.logo,
                    summary: o.summary,
                    auth_type: o.auth_type,
                    auth_status: o.auth_status,
                    verifyCode: o.phone ? "9999999" : "",
                    banner: o.banner
                });
            } else d.showFailedToast("数据加载失败", t.data.msg); else d.login(function() {
                a(e);
            });
        },
        fail: function(a) {
            d.showFailedToast("数据加载失败");
        }
    });
}

function e(a) {
    d.showLoading("正在加载数据"), wx.request({
        url: s.globalData.host + "/enroll/v2/homepage/info",
        method: "POST",
        dataType: "json",
        data: {
            access_token: d.getToken(),
            unionid: a.data.unionid,
            name: a.data.name,
            wx_no: a.data.wxNo,
            phone: a.data.phone,
            code: 9999999,
            logo: a.data.logo,
            banner: a.data.banner,
            summary: a.data.summary
        },
        success: function(t) {
            d.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? (d.showToast("更新成功"), wx.navigateBack({
                delta: 1
            }), s.globalData.authInfo = {
                phone: a.data.phone,
                name: a.data.name
            }) : d.showFailedToast("数据加载失败", t.data.msg) : d.login(function() {
                e(a);
            });
        },
        fail: function(a) {
            d.showFailedToast("数据加载失败");
        }
    });
}

function t(a, e, o) {
    console.log(e), wx.uploadFile({
        url: s.globalData.host + "/file/v1/upload",
        filePath: e,
        name: "file",
        formData: {
            access_token: d.getStorage("accessToken"),
            type: ""
        },
        success: function(n) {
            if (-500 != n.data.sta) {
                var s = n.data, u = JSON.parse(s);
                if (0 == u.sta) {
                    var l = u.data.urls[0];
                    a.setData(i({}, "logo" == o ? {
                        logo: l
                    } : {
                        banner: l
                    }));
                } else d.showFailedToast(u.msg);
            } else d.login(function() {
                t(a, e);
            });
        },
        fail: function(a) {
            d.showFailedToast("上传图片失败，请重试");
        },
        complete: function() {
            d.hideLoading();
        }
    });
}

function o(a) {
    d.showLoading("正在获取验证码..."), wx.request({
        url: s.globalData.host + "/enroll/v1/code",
        data: {
            cid: a.data.cid,
            phone: a.data.phone,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(e) {
            d.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta ? n(a) : d.showFailedToast("获取验证码失败，请重试。", e.data.msg) : d.login(function() {
                o(a);
            });
        },
        fail: function(a) {
            d.hideLoading(), d.showFailedToast("获取验证码失败，请重试");
        }
    });
}

function n(a) {
    var e = a.data.verifyCodeCountdownNum - 1;
    e > 0 ? (a.setData({
        verifyCodeCountdownNum: e,
        verifyCodeText: e + "后重新获取"
    }), setTimeout(function() {
        n(a);
    }, 1e3)) : a.setData({
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码"
    });
}

var i = Object.assign || function(a) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (a[o] = t[o]);
    }
    return a;
}, s = getApp(), d = require("../../utils/util.js");

Page({
    data: {
        defaultName: "",
        defaultWxNo: "",
        phoneDefault: "",
        defaultLogo: "",
        defaultSummary: "",
        showVerifyCode: !1,
        verifyCode: "",
        verifyCodeEmpty: !0,
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码",
        phone: "",
        phoneEmpty: !0,
        noAuthPhone: null,
        banner: "/images/bg_personhome.jpg"
    },
    onLoad: function(e) {
        var t = d.getStorage("userInfo");
        this.setData({
            unionid: e.unionid,
            auth_type: e.auth_type,
            name: t.nickName,
            logo: t.avatarUrl,
            defaultName: t.nickName
        }), a(this);
    },
    onShow: function() {},
    inputName: function(a) {
        this.setData({
            name: a.detail.value
        });
    },
    clearName: function() {
        this.setData({
            name: "",
            defaultName: ""
        });
    },
    inputSummary: function(a) {
        this.setData({
            summary: a.detail.value
        });
    },
    clearSummary: function() {
        this.setData({
            summary: "",
            defaultSummary: ""
        });
    },
    inputWxNo: function(a) {
        this.setData({
            wxNo: a.detail.value
        }), console.log(this.data.wxNo);
    },
    clearWxNo: function() {
        this.setData({
            wxNo: "",
            defaultWxNo: ""
        }), console.log(555);
    },
    inputPhone: function(a) {
        var e = a.detail.value, t = d.getStorage("phone");
        this.setData({
            phone: e,
            noAuthPhone: e != t,
            verifyCode: e == t ? "9999999" : "",
            showVerifyCode: e.length > 0 && e != t
        });
    },
    clearPhone: function() {
        this.setData({
            phone: "",
            phoneDefault: "",
            phoneEmpty: !0,
            noAuthPhone: !1,
            showVerifyCode: !1
        });
    },
    clearLogo: function() {
        this.setData({
            logo: ""
        });
    },
    chooseImage: function(a) {
        d.buttonClicked(this);
        var e = a.currentTarget.dataset.type, o = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var n = a.tempFilePaths[0];
                d.showLoading("上传中..."), t(o, n, e);
            },
            fail: function() {
                d.hideLoading();
            }
        });
    },
    getPhoneNumber: function(a) {
        var e = a.detail.iv, t = a.detail.encryptedData, o = this;
        a.detail.errMsg.indexOf("fail") > 0 ? o.setData({
            noAuthPhone: !0
        }) : (d.showLoading("正在获取手机号"), wx.request({
            url: s.globalData.host + "/common/decrypt",
            data: {
                encrypted_data: t,
                iv: e,
                access_token: wx.getStorageSync("accessToken")
            },
            method: "POST",
            success: function(e) {
                if (d.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                    var t = e.data.data.phoneNumber;
                    o.setData({
                        phone: t,
                        phoneDefault: t,
                        verifyCode: "9999999"
                    }), d.setStorage("phone", t);
                } else o.setData({
                    noAuthPhone: !0
                }); else d.login(function() {
                    o.getPhoneNumber(a);
                });
            },
            fail: function(a) {
                d.hideLoading(), d.showFailedToast("获取验证码失败，请重试");
            }
        }));
    },
    getVerifyCode: function(a) {
        var e = this.data.phone;
        d.isTextEmpty(e) ? d.showModelTips("请补充发起人手机号信息") : (this.setData({
            phone: e
        }), o(this));
    },
    inputVerifyCode: function(a) {
        this.setData({
            verifyCode: a.detail.value,
            verifyCodeEmpty: 0 == a.detail.value.length
        });
    },
    clearVerifyCode: function() {
        this.setData({
            verifyCode: "",
            verifyCodeEmpty: !0
        });
    },
    editHome: function(a) {
        if (d.isTextEmpty(this.data.name)) d.showModelTips("请输入主办方名称"); else if (d.isTextEmpty(this.data.logo)) d.showModelTips("请上传主办方logo"); else if (d.isTextEmpty(this.data.phone)) d.showModelTips("请输入联系方式"); else {
            var t = this.data.wxNo;
            d.isTextEmpty(t) || s.globalData.wxReg.test(t) ? e(this) : d.showModelTips("请填写正确的微信号");
        }
    },
    noAllowEdit: function() {
        d.showModelTips("仅企业/组织认证的用户，才可以修改发起人署名，个人认证的暂不支持。");
    }
});