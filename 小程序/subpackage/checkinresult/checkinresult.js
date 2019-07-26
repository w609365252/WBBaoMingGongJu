function t(e) {
    a.showLoading("正在加载数据");
    wx.request({
        url: i.globalData.host + "/enroll/v1/cert/check",
        data: {
            eid: e.data.eid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(i) {
            if (a.hideLoading(), -500 != i.data.sta) {
                if (0 == i.data.sta) {
                    var s = i.data.data;
                    if (1e3 * s.end_time <= new Date().getTime()) {
                        var n = "免费";
                        6 == s.temp ? n = "团购" : 4 != s.temp && 5 != s.temp || (n = "按项目付费"), e.setData({
                            banner: s.banner,
                            title: s.title,
                            count: s.join_num,
                            startDate: a.formatDate(1e3 * s.start_time, "MM-dd HH:mm"),
                            endDate: a.formatDate(1e3 * s.end_time, "MM-dd HH:mm"),
                            feeText: n,
                            infos: s.infos,
                            status: 0 == s.infos.length ? 1 : 3
                        });
                    } else e.setData({
                        status: 2
                    });
                } else e.setData({
                    status: 1
                });
            } else a.login(function() {
                t(e);
            }, function() {});
        },
        fail: function(t) {
            a.hideLoading(), a.showFailedToast("加载失败，" + t.errMsg);
        }
    });
}

function e(s) {
    a.showLoading("正在核销"), wx.request({
        url: i.globalData.host + "/enroll/v1/cert/check",
        data: {
            info_id: s.data.info_id,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "POST",
        success: function(i) {
            if (a.hideLoading(), -500 != i.data.sta) {
                0 == i.data.sta ? (a.showToast("核销成功"), setTimeout(function() {
                    t(s);
                }, 2e3)) : a.showModelTips("核销失败，" + i.msg);
            } else a.login(function() {
                e(s);
            }, function() {});
        },
        fail: function(t) {
            a.hideLoading(), a.showFailedToast("加载失败，" + t.errMsg);
        }
    });
}

var a = require("../../utils/util.js"), i = getApp();

Page({
    data: {
        status: 0
    },
    onLoad: function(e) {
        var i = e.eid;
        a.isTextEmpty(i) && (i = decodeURIComponent(e.scene || "")), this.setData({
            eid: i
        }), t(this);
    },
    onShow: function() {},
    toDetail: function() {
        wx.redirectTo({
            url: "/pages/detail/detail?eid=" + this.data.eid
        });
    },
    toCert: function(t) {
        var i = t.currentTarget.dataset, s = i.id;
        1 != i.verified ? a.showModelTips("审核未通过，不可以核销，可以尝试核销其他报名。") : (this.setData({
            info_id: s
        }), e(this));
    }
});