function t(i) {
    e.showLoading("正在加载数据"), wx.request({
        url: n.globalData.host + "/enroll/v1/auth/info",
        method: "GET",
        dataType: "json",
        data: {
            access_token: e.getToken(),
            unionid: i.data.unionid
        },
        success: function(n) {
            if (e.hideLoading(), -500 != n.data.sta) if (0 == n.data.sta) {
                var o = n.data.data;
                o.certType = a(o.op_cert_type), i.setData({
                    info: o
                });
            } else e.showFailedToast("数据加载失败", n.data.msg); else e.login(function() {
                t(i);
            });
        },
        fail: function(t) {
            e.showFailedToast("数据加载失败");
        }
    });
}

function a(t) {
    var a = "身份证";
    return 1 == t && (a = "港澳居民来往内地通行证 "), 2 == t && (a = "台湾居民来往大陆通行证"), 3 == t && (a = "护照"), 
    a;
}

var n = getApp(), e = require("../../utils/util.js");

Page({
    data: {},
    onLoad: function(a) {
        this.setData({
            unionid: a.unionid
        }), t(this);
    },
    onShow: function() {},
    showPic: function(t) {
        var a = t.currentTarget.dataset.src;
        wx.previewImage({
            urls: [ a ]
        });
    }
});