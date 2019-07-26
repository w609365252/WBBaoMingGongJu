function t(a) {
    wx.request({
        url: o.globalData.host + "/enroll/v1/verify",
        method: "GET",
        data: {
            access_token: i.getToken(),
            info_id: a.data.info_id
        },
        success: function(e) {
            if (i.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var o = e.data.data;
                a.setData({
                    verified: o.verified,
                    comment: o.comment
                });
            } else {
                if (-1 == e.data.sta && 300 == e.data.errcode) return void i.showModelTips(e.data.msg);
                i.showFailedToast("获取数据失败", e.data.msg);
            } else i.login(function() {
                t(a);
            });
        },
        fail: function(t) {
            i.hideLoading(), i.showFailedToast("网络请求超时");
        }
    });
}

function a(t) {
    i.showLoading("正在加载数据"), wx.request({
        url: o.globalData.host + "/enroll/v1/poll",
        method: "GET",
        data: {
            access_token: i.getToken(),
            tmp_id: t.data.tmp_id
        },
        success: function(e) {
            if (-500 != e.data.sta) if (0 == e.data.sta) {
                var o = e.data.data, d = o.status;
                if (t.data.statusCount < 3 && 0 == d) return setTimeout(function() {
                    a(t);
                }, 1e3), void t.data.statusCount++;
                t.data.statusCount >= 3 ? wx.navigateBack({
                    delta: 1
                }) : (i.hideLoading(), t.setData({
                    status: d,
                    reason: o.reason,
                    verified: 0,
                    info_id: t.data.tmp_id,
                    orderId: o.order_id,
                    waitVerified: o.verified
                }));
            } else {
                if (-1 == e.data.sta && 300 == e.data.errcode) return void i.showModelTips(e.data.msg);
                i.showFailedToast("获取数据失败2233，", e.data.msg);
            } else i.login(function() {
                a(t);
            });
        },
        fail: function(t) {
            i.hideLoading(), i.showFailedToast("网络请求超时");
        }
    });
}

function e(t) {
    var a = t.data.eid;
    wx.request({
        url: o.globalData.host + "/enroll/v1/follow/detail",
        data: {
            eid: a,
            access_token: i.getToken()
        },
        method: "GET",
        success: function(a) {
            if (i.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                var o = a.data.data || t.data.imgInfo;
                t.setData({
                    imgInfo: o,
                    imgTypeIndex: o.title ? o.type : -1
                });
            } else i.showFailedToast("获取数据失败，", a.data.msg); else i.login(function() {
                e(t);
            });
        },
        fail: function(t) {
            i.showFailedToast("获取数据失败，" + t.errMsg);
        }
    });
}

var i = require("../../utils/util.js"), o = getApp(), d = require("../../tmp/tmp.js");

Page({
    data: {
        verified: null,
        comment: null,
        proName: o.globalData.proName,
        status: 0,
        statusCount: 0,
        adId: "4b9498696eaf30fd1ff8e16e1351708f",
        recommendId: "0e614e5d0bec8ad03d2de2395f79e050",
        appid: o.globalData.appid,
        orderId: "",
        imgTypeIndex: -1,
        imgInfo: null
    },
    onLoad: function(s) {
        console.log("options ==== :"), console.log(s);
        var n = s.tmp_id || "";
        if (this.setData({
            eid: s.eid || "",
            info_id: s.info_id || "",
            tmp_id: n,
            waitVerified: o.globalData.waitVerified
        }), n) {
            i.showLoading("正在加载数据");
            var l = this;
            setTimeout(function() {
                a(l);
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
        i.postFormId(t.detail.formId);
    },
    toDetail: function() {
        i.buttonClicked(this), this.setData({
            toDetail: !0
        }), wx.redirectTo({
            url: "/pages/detail/detail?eid=" + this.data.eid
        });
    },
    toBack: function() {
        i.buttonClicked(this), wx.navigateBack({
            delta: 1
        });
    },
    toVoucher: function() {
        i.buttonClicked(this), this.setData({
            toDetail: !0
        }), wx.redirectTo({
            url: "/subpackage/voucher/voucher?info_id=" + this.data.info_id
        });
    },
    showPic: function() {
        i.setStorage("qrcode", this.data.imgInfo.qrcode), wx.navigateTo({
            url: "/subpackage/qrcode/qrcode?from=2"
        });
    }
});