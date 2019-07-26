function e(t, a, o) {
    console.log(a), wx.uploadFile({
        url: s.globalData.host + "/file/v1/upload",
        filePath: a,
        name: "file",
        formData: {
            access_token: d.getStorage("accessToken"),
            type: ""
        },
        success: function(n) {
            if (-500 == n.data.sta) return console.log(555), void d.login(function() {
                e(t, a, o);
            });
            var i = n.data, s = JSON.parse(i);
            if (0 == s.sta) {
                var c = s.data.urls[0];
                1 == o ? t.setData({
                    opCertFront: c,
                    imageDialogFront: !1
                }) : t.setData({
                    opCertBack: c,
                    imageDialogBack: !1
                });
            } else d.showFailedToast(s.msg);
        },
        fail: function(e) {
            d.showFailedToast("上传图片失败，请重试");
        },
        complete: function() {
            d.hideLoading();
        }
    });
}

function t(e) {
    d.showLoading("正在加载数据"), wx.request({
        url: s.globalData.host + "/enroll/v1/auth/info",
        method: "GET",
        dataType: "json",
        data: {
            access_token: d.getToken(),
            unionid: e.data.unionid
        },
        success: function(a) {
            if (d.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                var o = a.data.data;
                e.setData({
                    opName: o.op_name,
                    certTypeIndex: o.op_cert_type || 0,
                    opCertNo: o.op_cert_no,
                    opPhone: o.op_phone,
                    verifyCode: o.op_phone ? 9999999 : 0,
                    opCertFront: o.op_cert_front,
                    opCertBack: o.op_cert_back,
                    defaultOpName: o.op_name,
                    defaultOpCertNo: o.op_cert_no,
                    defaultOpPhone: o.op_phone,
                    needPay: o.need_pay
                });
            } else d.showFailedToast("数据加载失败", a.data.msg); else d.login(function() {
                t(e);
            });
        },
        fail: function(e) {
            d.showFailedToast("数据加载失败");
        }
    });
}

function a(e) {
    d.showLoading("正在加载数据");
    var t = Number(e.data.verifyCode);
    wx.request({
        url: s.globalData.host + "/enroll/v3/auth/apply",
        method: "POST",
        dataType: "json",
        data: {
            access_token: d.getToken(),
            op_name: e.data.opName,
            op_cert_type: e.data.certTypeIndex,
            op_cert_no: e.data.opCertNo,
            op_phone: e.data.opPhone,
            op_cert_front: e.data.opCertFront,
            op_cert_back: e.data.opCertBack,
            type: parseInt(e.data.type),
            commit: 1,
            code: t
        },
        success: function(t) {
            if (d.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                var n = t.data.data;
                n && n.appId ? wx.requestPayment({
                    timeStamp: n.timeStamp + "",
                    nonceStr: n.nonceStr,
                    package: n.package,
                    signType: "MD5",
                    paySign: n.paySign,
                    success: function(e) {
                        console.log(e), "requestPayment:ok" == e.errMsg && o();
                    },
                    fail: function(e) {
                        console.log(e);
                        var t = getCurrentPages();
                        console.log("pages ==== :"), console.log(t), wx.showToast({
                            title: "支付失败",
                            icon: "warn",
                            success: function() {}
                        });
                    }
                }) : o();
            } else d.showFailedToast("数据加载失败", t.data.msg); else d.login(function() {
                a(e);
            });
        },
        fail: function(e) {
            d.showFailedToast("数据加载失败");
        }
    });
}

function o() {
    d.showToast("提交成功"), setTimeout(function() {
        for (var e = getCurrentPages(), t = e.length, a = !1, o = 0; o < t; o++) e[o].route.indexOf("subpackage/authentication/authentication") >= 0 && (a = !0);
        a ? wx.navigateBack({
            delta: 1
        }) : wx.redirectTo({
            url: "/subpackage/authentication/authentication"
        });
    }, 3e3);
}

function n(e) {
    d.showLoading("正在获取验证码..."), wx.request({
        url: s.globalData.host + "/enroll/v1/code",
        data: {
            phone: e.data.opPhone,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(t) {
            d.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? i(e) : d.showFailedToast("获取验证码失败，请重试。", t.data.msg) : d.login(function() {
                n(e);
            });
        },
        fail: function(e) {
            d.hideLoading(), d.showFailedToast("获取验证码失败，请重试");
        }
    });
}

function i(e) {
    var t = e.data.verifyCodeCountdownNum - 1;
    t > 0 ? (e.setData({
        verifyCodeCountdownNum: t,
        verifyCodeText: t + "后重新获取"
    }), setTimeout(function() {
        i(e);
    }, 1e3)) : e.setData({
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码"
    });
}

var s = getApp(), d = require("../../utils/util.js");

Page({
    data: {
        imageDialogShow: !1,
        cardType: [ "身份证", "港澳居民来往内地通行证", "台湾居民来往大陆通行证", "护照" ],
        cardTypeIndex: 0,
        type: 2,
        needPay: !0,
        verifyCode: "",
        verifyCodeEmpty: !0,
        verifyCodeCountdownNum: 60,
        verifyCodeText: "获取验证码",
        phone: "",
        phoneEmpty: !0,
        noAuthPhone: null
    },
    onLoad: function(e) {
        this.setData({
            unionid: e.unionid || "",
            type: e.type || 2
        }), t(this);
    },
    onShow: function() {
        d.getContactUserInfo(this);
    },
    changeCardType: function(e) {
        this.setData({
            cardTypeIndex: e.detail.value
        });
    },
    postFormId: function(e) {
        d.postFormId(e.detail.value);
    },
    inputOpName: function(e) {
        this.setData({
            opName: e.detail.value
        });
    },
    clearOpName: function() {
        this.setData({
            opName: "",
            defaultOpName: ""
        });
    },
    inputOpCertNo: function(e) {
        this.setData({
            opCertNo: e.detail.value
        });
    },
    clearOpCertNo: function() {
        this.setData({
            opCertNo: "",
            defaultOpCertNo: ""
        });
    },
    inputOpPhone: function(e) {
        var t = e.detail.value, a = d.getStorage("phone");
        this.setData({
            opPhone: e.detail.value,
            noAuthPhone: t != a,
            showVerifyCode: t.length > 0 && t != this.data.originPhone,
            verifyCode: t == a ? "9999999" : ""
        }), console.log("====== data :"), console.log(this.data);
    },
    clearOpPhone: function() {
        this.setData({
            opPhone: "",
            defaultOpPhone: "",
            phoneEmpty: !0,
            noAuthPhone: !1,
            showVerifyCode: !1
        });
    },
    getPhoneNumber: function(e) {
        var t = e.detail.iv, a = e.detail.encryptedData, o = this;
        e.detail.errMsg.indexOf("fail") > 0 ? (console.log("fail   "), o.setData({
            noAuthPhone: !0
        })) : (d.showLoading("正在获取手机号"), wx.request({
            url: s.globalData.host + "/common/decrypt",
            data: {
                encrypted_data: a,
                iv: t,
                access_token: wx.getStorageSync("accessToken")
            },
            method: "POST",
            success: function(t) {
                if (console.log("======== 解密手机号： "), console.log(t), d.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                    var a = t.data.data.phoneNumber;
                    o.setData({
                        opPhone: a,
                        defaultOpPhone: a,
                        verifyCode: "9999999"
                    }), d.setStorage("phone", a);
                } else o.setData({
                    noAuthPhone: !0
                }); else d.login(function() {
                    o.getPhoneNumber(e);
                });
            },
            fail: function(e) {
                d.hideLoading(), d.showFailedToast("获取验证码失败，请重试");
            }
        }));
    },
    getVerifyCode: function(e) {
        var t = this.data.opPhone;
        d.isTextEmpty(t) ? d.showModelTips("请补充发起人手机号信息") : (this.setData({
            opPhone: t
        }), n(this));
    },
    inputVerifyCode: function(e) {
        this.setData({
            verifyCode: e.detail.value,
            verifyCodeEmpty: 0 == e.detail.value.length
        });
    },
    clearVerifyCode: function() {
        this.setData({
            verifyCode: "",
            verifyCodeEmpty: !0
        });
    },
    openDialogFront: function() {
        this.setData({
            imageDialogFront: !0
        });
    },
    openDialogBack: function() {
        this.setData({
            imageDialogBack: !0
        });
    },
    closeImageDialog: function() {
        this.setData({
            imageDialogFront: !1,
            imageDialogBack: !1
        });
    },
    clearLogo: function() {
        this.setData({
            licensePic: ""
        });
    },
    openDialogImage: function(e) {
        1 == e.currentTarget.dataset.type ? this.openDialogFront() : this.openDialogBack();
    },
    chooseImage: function(t) {
        d.buttonClicked(this);
        var a = t.currentTarget.dataset.type, o = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var n = t.tempFilePaths[0];
                d.showLoading("上传中..."), e(o, n, a);
            },
            fail: function() {
                d.hideLoading();
            }
        });
    },
    showPic: function(e) {
        var t = this.data.opCertFront;
        2 == e.currentTarget.dataset.type && (t = this.data.opCertBack), wx.previewImage({
            urls: [ t ]
        });
    },
    submitInfo: function() {
        d.isTextEmpty(this.data.opName) ? d.showModelTips("请输入真实姓名") : d.isTextEmpty(this.data.opCertNo) ? d.showModelTips("请输入证件号码") : d.isTextEmpty(this.data.opPhone) ? d.showModelTips("请补充发起人手机号信息") : d.isTextEmpty(this.data.opCertFront) ? d.showModelTips("请上传证件照正面") : d.isTextEmpty(this.data.opCertBack) ? d.showModelTips("请上传证件照背面") : a(this);
    }
});