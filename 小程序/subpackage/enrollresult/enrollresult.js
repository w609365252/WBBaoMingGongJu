function t(a) {
    wx.request({
        url: i.globalData.host + "/enroll/v1/verify",
        method: "GET",
        data: {
            access_token: o.getToken(),
            info_id: a.data.info_id
        },
        success: function(e) {
            if (o.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var i = e.data.data;
                a.setData({
                    verified: i.verified,
                    comment: i.comment
                });
            } else {
                if (-1 == e.data.sta && 300 == e.data.errcode) return void o.showModelTips(e.data.msg);
                o.showFailedToast("获取数据失败", e.data.msg);
            } else o.login(function() {
                t(a);
            });
        },
        fail: function(t) {
            o.hideLoading(), o.showFailedToast("网络请求超时");
        }
    });
}

function a(t) {
    o.showLoading("正在加载数据"), wx.request({
        url: i.globalData.host + "/enroll/v1/poll",
        method: "GET",
        data: {
            access_token: o.getToken(),
            tmp_id: t.data.tmp_id
        },
        success: function(e) {
            if (-500 != e.data.sta) if (0 == e.data.sta) {
                var i = e.data.data, d = i.status;
                if (t.data.statusCount < 3 && 0 == d) return setTimeout(function() {
                    a(t);
                }, 1e3), void t.data.statusCount++;
                t.data.statusCount >= 3 ? wx.navigateBack({
                    delta: 1
                }) : (o.hideLoading(), t.setData({
                    status: d,
                    reason: i.reason,
                    verified: 0,
                    info_id: t.data.tmp_id,
                    orderId: i.order_id
                }));
            } else {
                if (-1 == e.data.sta && 300 == e.data.errcode) return void o.showModelTips(e.data.msg);
                o.showFailedToast("获取数据失败2233，", e.data.msg);
            } else o.login(function() {
                a(t);
            });
        },
        fail: function(t) {
            o.hideLoading(), o.showFailedToast("网络请求超时");
        }
    });
}

function e(t) {
    var a = t.data.eid;
    wx.request({
        url: i.globalData.host + "/enroll/v1/follow/detail",
        data: {
            eid: a,
            access_token: o.getToken()
        },
        method: "GET",
        success: function(a) {
            if (o.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                var i = a.data.data || t.data.imgInfo;
                t.setData({
                    imgInfo: i,
                    imgTypeIndex: i.title ? i.type : -1
                });
            } else o.showFailedToast("获取数据失败，", a.data.msg); else o.login(function() {
                e(t);
            });
        },
        fail: function(t) {
            o.showFailedToast("获取数据失败，" + t.errMsg);
        }
    });
}

var o = require("../../utils/util.js"), i = getApp(), d = require("../../tmp/tmp.js");

Page({
    data: {
        verified: null,
        comment: null,
        proName: i.globalData.proName,
        status: 0,
        statusCount: 0,
        adId: "4b9498696eaf30fd1ff8e16e1351708f",
        recommendId: "0e614e5d0bec8ad03d2de2395f79e050",
        appid: i.globalData.appid,
        orderId: "",
        imgTypeIndex: -1,
        imgInfo: null
    },
    onLoad: function(i) {
        console.log("options ==== :"), console.log(i);
        var s = i.tmp_id || "";
        if (this.setData({
            eid: i.eid || "",
            info_id: i.info_id || "",
            tmp_id: s
        }), s) {
            o.showLoading("正在加载数据");
            var n = this;
            setTimeout(function() {
                a(n);
            }, 1e3);
        } else this.setData({
            status: 1,
            verified: 0
        }), t(this);
        e(this), d.ads(this, this.data.recommendId, "enrollresult", function() {}, !0), 
        d.ads(this, this.data.adId, "enrollresult");
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        for (var t = getCurrentPages(), a = t.length, e = 0; e < a; e++) "pages/enroll/enroll" == t[e].route && (this.data.toDetail || t[e].backPage());
    },
    postFormId: function(t) {
        o.postFormId(t.detail.formId);
    },
    toDetail: function() {
        o.buttonClicked(this), this.setData({
            toDetail: !0
        }), wx.redirectTo({
            url: "/pages/detail/detail?eid=" + this.data.eid
        });
    },
    toBack: function() {
        o.buttonClicked(this), wx.navigateBack({
            delta: 1
        });
    },
    toVoucher: function() {
        o.buttonClicked(this), this.setData({
            toDetail: !0
        }), wx.redirectTo({
            url: "/subpackage/voucher/voucher?info_id=" + this.data.info_id
        });
    },
    showPic: function() {
        o.setStorage("qrcode", this.data.imgInfo.qrcode), wx.navigateTo({
            url: "/subpackage/qrcode/qrcode?from=2"
        });
    }
});