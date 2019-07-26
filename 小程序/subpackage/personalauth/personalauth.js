function t(a, e, n) {
    console.log(e), wx.uploadFile({
        url: o.globalData.host + "/file/v1/upload",
        filePath: e,
        name: "file",
        formData: {
            access_token: i.getStorage("accessToken"),
            type: ""
        },
        success: function(o) {
            if (-500 == o.data.sta) return console.log(555), void i.login(function() {
                t(a, e, n);
            });
            var s = o.data, c = JSON.parse(s);
            if (0 == c.sta) {
                var r = c.data.urls[0];
                1 == n ? a.setData({
                    certFront: r,
                    imageDialogFront: !1
                }) : a.setData({
                    certBack: r,
                    imageDialogBack: !1
                });
            } else i.showFailedToast(c.msg);
        },
        fail: function(t) {
            i.showFailedToast("上传图片失败，请重试");
        },
        complete: function() {
            i.hideLoading();
        }
    });
}

function a(t) {
    i.showLoading("正在加载数据"), wx.request({
        url: o.globalData.host + "/enroll/v1/identity",
        method: "GET",
        dataType: "json",
        data: {
            access_token: i.getToken()
        },
        success: function(e) {
            if (i.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var o = e.data.data;
                t.setData({
                    certFront: o.cert_front || "",
                    certBack: o.cert_back || "",
                    status: o.status || 0,
                    reason: o.reason || ""
                });
            } else i.showFailedToast("数据加载失败", e.data.msg); else i.login(function() {
                a(t);
            });
        },
        fail: function(t) {
            i.showFailedToast("数据加载失败");
        }
    });
}

function e(t) {
    i.showLoading("正在加载数据"), wx.request({
        url: o.globalData.host + "/enroll/v1/identity",
        method: "POST",
        dataType: "json",
        data: {
            access_token: i.getToken(),
            cert_front: t.data.certFront,
            cert_back: t.data.certBack
        },
        success: function(a) {
            i.hideLoading(), -500 != a.data.sta ? 0 == a.data.sta ? t.setData({
                reviewBox: !0
            }) : i.showFailedToast("数据加载失败", a.data.msg) : i.login(function() {
                e(t);
            });
        },
        fail: function(t) {
            i.showFailedToast("数据加载失败");
        }
    });
}

var o = getApp(), i = require("../../utils/util.js");

Page({
    data: {
        imageDialogShow: !1,
        certBack: "",
        certFront: ""
    },
    onLoad: function(t) {
        a(this);
    },
    onShow: function() {},
    changeCardType: function(t) {
        this.setData({
            cardTypeIndex: t.detail.value
        });
    },
    postFormId: function(t) {
        i.postFormId(t.detail.value);
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
    openDialogImage: function(t) {
        1 == t.currentTarget.dataset.type ? this.openDialogFront() : this.openDialogBack();
    },
    chooseImage: function(a) {
        i.buttonClicked(this);
        var e = a.currentTarget.dataset.type, o = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var n = a.tempFilePaths[0];
                i.showLoading("上传中..."), t(o, n, e);
            },
            fail: function() {
                i.hideLoading();
            }
        });
    },
    showPic: function(t) {
        var a = this.data.certFront;
        2 == t.currentTarget.dataset.type && (a = this.data.certBack), wx.previewImage({
            urls: [ a ]
        });
    },
    submitInfo: function() {
        console.log(this.data.certFront, this.data), i.isTextEmpty(this.data.certFront) ? i.showModelTips("请上传证件照正面") : i.isTextEmpty(this.data.certBack) ? i.showModelTips("请上传证件照背面") : e(this);
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});