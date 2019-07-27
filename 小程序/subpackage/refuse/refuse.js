function t(i) {
    var o = parseInt(i.data.type) || 2;
    a.showLoading("正在提交数据"), wx.request({
      url: e.globalData.host + "/SignUpForm/verify",
        method: "POST",
        data: {
            access_token: a.getToken(),
            verified: o,
            info_id: i.data.info_id,
            comment: i.data.comment
        },
        success: function(e) {
            if (a.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                e.data.data;
                a.showToast("提交成功"), setTimeout(function() {
                    wx.navigateBack({
                        delta: 2
                    });
                }, 1500);
            } else {
                if (-1 == e.data.sta && 300 == e.data.errcode) return void a.showModelTips(e.data.msg);
                a.showFailedToast("审核失败，", e.data.msg);
            } else a.login(function() {
                t(i, o);
            });
        },
        fail: function(t) {
            a.hideLoading(), a.showFailedToast("网络请求超时");
        }
    });
}

var a = require("../../utils/util.js"), e = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a, e = t.type;
        a = 1 == e ? "通过" : "不通过", this.setData({
            info_id: t.info_id || "",
            type: e,
            tips: a
        }), wx.setNavigationBarTitle({
            title: "审核" + a
        });
    },
    onShow: function() {},
    saveComment: function(e) {
        var i = e.detail.value.comment;
        console.log(i), this.setData({
            comment: i
        }), a.setStorage("verified", this.data.type), t(this);
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    }
});