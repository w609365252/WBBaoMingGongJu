function o(o) {
    wx.saveImageToPhotosAlbum ? (i.showLoading("正在保存"), wx.getImageInfo({
        src: o.data.imageUrl,
        success: function(i) {
            e(o, i.path), o.setData({
                qrcodeDialog: !1
            });
        },
        fail: function(o) {
            i.hideLoading(), i.showModelTips("获取图片信息失败，原因:" + o.errMsg);
        }
    })) : i.showModelTips('1、点击下面的图片查看大图。2、长按或点击右上角三个点"..."保存到系统相册。3、分享给好友或群。');
}

function e(o, a) {
    wx.saveImageToPhotosAlbum({
        filePath: a,
        success: function(o) {
            i.hideLoading();
        },
        fail: function(t) {
            i.hideLoading();
            var n = t.errMsg;
            wx.openSetting && n.indexOf("cancel") < 0 ? wx.showModal({
                title: "提示",
                content: "请授权报名工具访问相册，该操作仅会方便您保存图片到相册，请放心授权。",
                cancelText: "不想授权",
                confirmText: "去授权",
                confirmColor: "#12b7f5",
                success: function(t) {
                    t.confirm ? wx.openSetting({
                        complete: function(i) {
                            e(o, a);
                        }
                    }) : t.cancel && i.showModelTips('如果您不愿授权，也可以通过点击下面的图片查看大图，然后长按或点击右上角三个点"..."保存到系统相册。');
                }
            }) : i.showModelTips('如果您不愿授权，也可以通过点击下面的图片查看大图，然后长按或点击右上角三个点"..."保存到系统相册。');
        }
    });
}

var i = require("../../utils/util.js"), a = require("../../tmp/tmp.js"), t = getApp();

Page({
    data: {
        huomaDialog: !1,
        huoma: t.globalData.huoma
    },
    onLoad: function(o) {
        var e = i.getStorage("qrcode") || "error";
        this.setData({
            qrcode: e,
            imageUrl: e,
            from: o.from || 1
        }), i.showLoading("加载中..."), a.huoma(this);
    },
    onShow: function() {},
    loadSuccess: function() {
        i.hideLoading();
    },
    loadError: function() {
        i.hideLoading(), i.showModelTips("二维码图片加载失败");
    },
    huomaDialog: function() {
        this.setData({
            huomaDialog: !0
        });
    },
    downloadQrcode: function() {
        o(this);
    },
    showPic: function(o) {
        var e = this.data.qrcode;
        wx.previewImage({
            urls: [ e ]
        });
    }
});