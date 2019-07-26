function t(e) {
    a.showLoading("正在加载数据"), wx.request({
        url: o.globalData.host + "/enroll/v1/list",
        method: "GET",
        dataType: "json",
        data: {
            access_token: a.getToken(),
            type: 2,
            page: e.data.page,
            count: 10
        },
        success: function(o) {
            if (a.hideLoading(), -500 != o.data.sta) if (0 == o.data.sta) {
                var n = o.data.data, i = 1;
                10 == n.length && (i = e.data.page), e.setData({
                    enrollList: n,
                    page: i
                });
            } else a.showFailedToast("数据加载失败", o.data.msg); else a.login(function() {
                t(e);
            });
        },
        fail: function(t) {
            console.log(t);
        }
    });
}

var a = require("../../utils/util.js"), e = require("../../tmp/tmp.js"), o = getApp();

Page({
    data: {
        enrollList: null,
        page: 1,
        moreData: !1,
        type: 2
    },
    onLoad: function(a) {
        t(this), e.enRoll(this);
    },
    onShow: function() {},
    onReachBottom: function() {
        this.data.moreData && t(this);
    },
    toDetail: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/detail/detail?sid=" + a
        });
    }
});