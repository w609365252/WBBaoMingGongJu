function t(s, i, o) {
    var c = i[o];
    wx.uploadFile({
        url: a.globalData.host + "/file/v1/upload",
        filePath: c,
        name: "file",
        formData: {
            access_token: e.getStorage("accessToken")
        },
        success: function(a) {
            var c = a.data, n = JSON.parse(c);
            if (0 == n.sta) {
                var r = n.data.urls[0], d = s.data.pics;
                d.push(r), s.setData({
                    pics: d
                }), i.length - 1 > o ? t(s, i, o + 1) : e.hideLoading();
            } else e.showFailedToast(n.msg);
        },
        fail: function(t) {
            e.hideLoading(), e.showFailedToast("上传图片失败，请重试");
        }
    });
}

var a = getApp(), e = require("../../utils/util.js");

Page({
    data: {
        pics: []
    },
    onLoad: function(t) {
        var a = e.getStorage("good_pics");
        this.setData({
            pics: a
        });
    },
    onShow: function() {},
    goBack: function() {
        e.buttonClicked(this), e.setStorage("good_pics", this.data.pics), wx.navigateBack({
            delta: 1
        });
    },
    deleteImg: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.pics;
        e.splice(a, 1), this.setData({
            pics: e
        });
    },
    chooseImage: function(a) {
        e.buttonClicked(this);
        var s = this, i = a.currentTarget.dataset.url, o = (a.currentTarget.dataset.type, 
        this.data.pics);
        if (i) wx.previewImage({
            urls: o,
            current: i
        }); else {
            if (o.length > 8) return void e.showModelTips("图片最多只能上传9张");
            var c = 9 - o.length;
            wx.chooseImage({
                count: c,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(a) {
                    var i = a.tempFilePaths;
                    s.setData({
                        tempPaths: i,
                        tempIndex: 0
                    }), e.showLoading("上传中..."), t(s, i, 0);
                },
                fail: function() {
                    e.hideLoading();
                }
            });
        }
    }
});