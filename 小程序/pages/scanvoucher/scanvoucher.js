function e(a) {
    null == a.data.enroll && (t.showLoading("正在加载数据"), a.setData({
        showLoadError: 0
    })), wx.request({
        url: n.globalData.host + "/enroll/v2/cert/verify",
        data: {
            access_token: t.getToken(),
            info_id: a.data.info_id
        },
        method: "GET",
        dataType: "json",
        success: function(o) {
            if (console.log(o), t.hideLoading(), -500 != o.data.sta) if (0 == o.data.sta) {
                var n = o.data.data;
                n.startTime = t.formatDate(1e3 * n.start_time, "yyyy-MM-dd HH:mm"), n.endTime = t.formatDate(1e3 * n.end_time, "yyyy-MM-dd HH:mm"), 
                n.enrollTime = t.formatDate(1e3 * n.join_time, "yyyy-MM-dd HH:mm");
                var i = n.act_end, s = new Date().getTime() / 1e3;
                n.is_end = s > i && i > 0 ? 1 : 0;
                for (var d = n.records || [], c = 0; c < d.length; c++) d[c].date = t.formatDate(1e3 * d[c].date, "yyyy-MM-dd HH:mm:ss");
                a.setData({
                    enroll: n,
                    records: d
                });
            } else t.showFailedToast("失败了，", o.data.msg); else t.login(function() {
                e(a);
            });
        },
        fail: function(e) {
            t.hideLoading(), t.showFailedToast("请求超时");
        }
    });
}

function a(e) {
    t.showLoading("正在核销"), wx.request({
        url: n.globalData.host + "/enroll/v1/cert/cancel",
        data: {
            access_token: t.getToken(),
            info_id: e.data.info_id
        },
        method: "POST",
        dataType: "json",
        success: function(o) {
            if (console.log(o), t.hideLoading(), -500 != o.data.sta) if (0 == o.data.sta) {
                for (var n = o.data.data.records || [], i = 0; i < n.length; i++) n[i].date = t.formatDate(1e3 * n[i].date, "yyyy-MM-dd HH:mm:ss");
                var s = e.data.enroll;
                s.cert_cancel = 1, s.is_admin = 1, e.setData({
                    enroll: s,
                    records: n
                });
            } else t.showFailedToast("数据加载失败，", o.data.msg); else t.login(function() {
                a(e);
            });
        },
        fail: function(e) {
            t.hideLoading(), t.showFailedToast("请求超时");
        },
        complete: function() {
            t.hideLoading();
        }
    });
}

var t = require("../../utils/util.js"), o = require("../../tmp/tmp.js"), n = getApp();

Page({
    data: {
        enroll: null,
        records: []
    },
    onLoad: function(a) {
        var n = a.info_id || "";
        a.scene && (n = decodeURIComponent(a.scene)), this.setData({
            info_id: n
        });
        var i = this;
        o.wxLogin(this, function() {
            e(i);
        }), t.checkSession(this, function() {
            e(i);
        });
    },
    onShow: function() {},
    toDetail: function() {
        var e = this.data.enroll.eid;
        wx.navigateTo({
            url: "/pages/detail/detail?eid=" + e
        });
    },
    toVerify: function() {
        var e = this;
        wx.showModal({
            title: "核销确认",
            content: "管理员核销后，该凭证将失效，不可再次使用，请确定是否核销？",
            success: function(t) {
                t.confirm && a(e);
            }
        });
    },
    scanCode: function() {
        wx.scanCode({
            success: function(e) {
                console.log("scanCode ==== :"), console.log(e), e.path.indexOf("pages/scanvoucher/scanvoucher") > -1 && wx.redirectTo({
                    url: "/" + e.path
                });
            }
        });
    }
});