function a(a, t) {
    for (var e = [], o = a.data.fee, s = a.data.singleAmount, i = Math.floor(o / s), n = o % s, d = 0; d <= i; d++) d < i ? e.push({
        text: "订单" + (d + 1) + "：￥" + s / 100,
        fee: s,
        status: 0
    }) : n > 0 && e.push({
        text: "订单" + (d + 1) + "：￥" + n / 100,
        fee: n,
        status: 0
    });
    a.setData({
        payItems: e,
        tmp_id: t ? "" : a.data.tmp_id
    }), console.log(" ======   :"), console.log(e);
}

function t(e) {
    i.showLoading("正在加载数据"), wx.request({
        url: n.globalData.host + "/enroll/v1/info_orders",
        method: "GET",
        data: {
            access_token: i.getToken(),
            tmp_id: e.data.tmp_id
        },
        success: function(o) {
            if (i.hideLoading(), -500 != o.data.sta) if (0 == o.data.sta) {
                var s = o.data.data || [];
                if (0 == s.length) return void a(e, !0);
                a(e);
                for (var n = e.data.payItems, d = n.length, l = [], u = 0; u < s.length; u++) s[u].fee == e.data.singleAmount ? l.push(1) : n[d - 1].status = 1;
                for (u = 0; u < l.length; u++) n[u].status = 1;
                e.setData({
                    payItems: n
                });
            } else i.showFailedToast("获取数据失败", o.data.msg); else i.login(function() {
                t(e);
            });
        },
        fail: function(a) {
            i.hideLoading(), i.showFailedToast("网络请求超时");
        }
    });
}

function e(a) {
    i.showLoading("正在加载数据"), wx.request({
        url: n.globalData.host + "/enroll/v1/pay",
        method: "POST",
        data: {
            access_token: i.getToken(),
            fee: a.data.payItems[a.data.payIndex].fee,
            tmp_id: a.data.tmp_id
        },
        success: function(t) {
            if (i.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                var o = t.data.data;
                wx.requestPayment({
                    timeStamp: o.timeStamp + "",
                    nonceStr: o.nonceStr,
                    package: o.package,
                    signType: "MD5",
                    paySign: o.paySign,
                    success: function(t) {
                        if (console.log(t), "requestPayment:ok" == t.errMsg) {
                            var e = a.data.payIndex, o = a.data.payItems;
                            o[e].status = 1, a.setData({
                                payItems: o,
                                paid: !0
                            });
                        }
                    },
                    fail: function(a) {
                        console.log(a), wx.showToast({
                            title: "支付失败",
                            icon: "warn"
                        });
                    }
                });
            } else i.showFailedToast("加载失败", t.data.msg); else i.login(function() {
                e(a);
            });
        },
        fail: function(a) {
            i.hideLoading(), i.showFailedToast("网络请求超时");
        }
    });
}

function o(a) {
    i.showLoading("正在退出报名"), wx.request({
        url: n.globalData.host + "/enroll/v1/abort",
        method: "POST",
        data: {
            access_token: i.getToken(),
            tmp_id: a.data.tmp_id
        },
        success: function(t) {
            i.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? i.showToast("退出报名成功") : i.showFailedToast("退出失败", t.data.msg) : i.login(function() {
                o(a);
            });
        },
        fail: function(a) {
            i.hideLoading(), i.showFailedToast("退出失败，服务器请求超时");
        }
    });
}

function s(a) {
    i.showLoading("正在加载数据"), wx.request({
        url: n.globalData.host + "/enroll/v1/join",
        method: "POST",
        data: {
            access_token: i.getToken(),
            tmp_id: a.data.tmp_id
        },
        success: function(t) {
            i.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? (a.setData({
                enrollSuccess: !0
            }), wx.redirectTo({
                url: "/pages/enrollresult/enrollresult?info_id=" + a.data.tmp_id + "&eid=" + a.data.eid
            })) : i.showFailedToast("报名失败", t.data.msg) : i.login(function() {
                s(a);
            });
        },
        fail: function(a) {
            i.hideLoading(), i.showFailedToast("报名失败，服务器请求超时");
        }
    });
}

var i = require("../../utils/util.js"), n = getApp();

require("../../tmp/tmp.js");

Page({
    data: {
        fee: 0,
        singleAmount: n.globalData.singleAmount,
        payItems: []
    },
    onLoad: function(e) {
        var o = e.tmp_id || "";
        this.setData({
            fee: parseInt(e.fee) || 0,
            tmp_id: o,
            paid: e.paid || "",
            eid: e.eid || ""
        }), this.data.paid ? t(this) : a(this);
    },
    onShow: function() {},
    onHide: function() {
        console.log("page hide ==== :");
    },
    postFormId: function(a) {
        i.postFormId(a.detail.formId);
    },
    onUnload: function() {
        if (console.log("page unload ==== :"), !this.data.enrollSuccess) for (var a = this.data.tmp_id, t = this.data.paid, e = this.data.fee, o = getCurrentPages(), s = o.length, i = 0; i < s; i++) {
            console.log(o[i]);
            var n = o[i];
            "pages/detail/detail" == n.route && (n.setData({
                tmp_id: a,
                paid: t,
                fee: e
            }), console.log(n.data), n.exitMoney());
        }
    },
    paySuccess: function() {
        for (var a = this.data.payItems, t = a.length, e = !0, o = 0; o < t; o++) 0 == a[o].status && (e = !1);
        e ? s(this) : i.showModelTips("你还有报名订单未支付，请完成所有订单支付后，点“完成”");
    },
    singlePay: function(a) {
        var t = a.currentTarget.dataset.index;
        this.data.payItems[t].fee;
        this.setData({
            payIndex: t
        }), e(this);
    },
    abort: function() {
        o(this);
    }
});