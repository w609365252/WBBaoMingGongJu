function o(e) {
    a.showLoading("正在获取图片");
    wx.request({
        url: n.globalData.host + "/enroll/v1/cert/qrcode",
        data: {
            eid: e.data.eid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(t) {
            a.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta && t.data.data ? e.setData({
                qrcode: t.data.data.url
            }) : a.showFailedToast("获取图片失败，请重试。", t.data.msg) : a.login(function() {
                o(e);
            }, function() {});
        },
        fail: function(o) {
            a.hideLoading(), a.showFailedToast("获取图片失败，请重试");
        }
    });
}

function e(o) {
    wx.saveImageToPhotosAlbum ? (a.showLoading("正在保存"), wx.getImageInfo({
        src: o.data.qrcode,
        success: function(e) {
            t(o, e.path);
        },
        fail: function(o) {
            a.hideLoading(), a.showModelTips("获取图片信息失败，原因:" + o.errMsg);
        }
    })) : a.showModelTips('1、点击下面的图片查看大图。2、长按或点击右上角三个点"..."保存到系统相册。');
}

function t(o, e) {
    wx.saveImageToPhotosAlbum({
        filePath: e,
        success: function(o) {
            a.hideLoading();
        },
        fail: function(n) {
            a.hideLoading();
            n.errMsg;
            wx.openSetting ? wx.showModal({
                title: "提示",
                content: "请授权报名工具访问相册，该操作仅会方便您保存图片到相册，请放心授权。",
                cancelText: "不想授权",
                confirmText: "去授权",
                confirmColor: "#12b7f5",
                success: function(n) {
                    n.confirm ? wx.openSetting({
                        complete: function(a) {
                            t(o, e);
                        }
                    }) : n.cancel && a.showModelTips('如果您不愿授权，也可以通过点击下面的图片查看大图，然后长按或点击右上角三个点"..."保存到系统相册。');
                }
            }) : a.showModelTips('如果您不愿授权，也可以通过点击下面的图片查看大图，然后长按或点击右上角三个点"..."保存到系统相册。');
        }
    });
}

var a = require("../../utils/util.js"), n = getApp();

Page({
    data: {},
    onLoad: function(e) {
        this.setData({
            eid: e.eid
        }), o(this);
    },
    onShow: function() {},
    postFormId: function(o) {
        a.postFormId(o.detail.formId);
    },
    scanCode: function() {
        wx.scanCode({
            success: function(o) {
                console.log("scanCode ==== :"), console.log(o), o.path.indexOf("pages/scanvoucher/scanvoucher") > -1 && wx.redirectTo({
                    url: "/" + o.path
                });
            }
        });
    },
    showPic: function(o) {
        var e = o.currentTarget.dataset.src;
        wx.previewImage({
            urls: [ e ]
        });
    },
    saveImages: function() {
        e(this);
    }
});