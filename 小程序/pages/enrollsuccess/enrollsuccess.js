function t(a) {
    wx.request({
        url: o.globalData.host + "/enroll/v1/poll",
        method: "GET",
        data: {
            access_token: e.getToken(),
            tmp_id: a.data.tmp_id
        },
        success: function(i) {
            if (-500 != i.data.sta) if (0 == i.data.sta) {
                var o = i.data.data, d = o.status;
                if (a.data.statusCount < 3 && 0 == d) return setTimeout(function() {
                    t(a);
                }, 1e3), void a.data.statusCount++;
                a.data.statusCount >= 3 ? wx.navigateBack({
                    delta: 1
                }) : (e.hideLoading(), a.setData({
                    status: d,
                    reason: o.reason,
                    info_id: a.data.tmp_id,
                    orderId: o.order_id
                }), console.log("data ==== : "), console.log(a.data));
            } else {
                if (-1 == i.data.sta && 300 == i.data.errcode) return void e.showModelTips(i.data.msg);
                e.showFailedToast("获取数据失败", i.data.msg);
            } else e.login(function() {
                t(a);
            });
        },
        fail: function(t) {
            e.hideLoading(), e.showFailedToast("网络请求超时");
        }
    });
}

function a(t) {
    var i = t.data.eid;
    wx.request({
        url: o.globalData.host + "/enroll/v1/follow/detail",
        data: {
            eid: i,
            access_token: e.getToken()
        },
        method: "GET",
        success: function(i) {
            if (e.hideLoading(), -500 != i.data.sta) if (0 == i.data.sta) {
                var o = i.data.data || t.data.imgInfo;
                t.setData({
                    imgInfo: o,
                    imgTypeIndex: o.title ? o.type : -1
                });
            } else e.showFailedToast("获取数据失败，", i.data.msg); else e.login(function() {
                a(t);
            });
        },
        fail: function(t) {
            e.showFailedToast("获取数据失败，" + t.errMsg);
        }
    });
}

var e = require("../../utils/util.js"), i = require("../../tmp/tmp.js"), o = getApp();

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
    onLoad: function(d) {
        console.log("waitVerified: ====", this.data.waitVerified);
        var s = d.tmp_id || "";
        if (this.setData({
            eid: d.eid || "",
            info_id: d.info_id || "",
            tmp_id: s,
            waitVerified: o.globalData.waitVerified
        }), s) {
            e.showLoading("正在加载数据");
            var n = this;
            setTimeout(function() {
                t(n);
            }, 1e3);
        } else this.setData({
            status: 1
        });
        a(this), i.ads(this, this.data.recommendId, "enrollsuccess", function() {}, !0), 
        i.ads(this, this.data.adId, "enrollsuccess");
    },
    formSubmit: function(t) {
        var a, i = t.detail.target.dataset.id;
        1 == i ? a = this.toVoucher() : 2 == i && (a = this.toDetail()), e.postFormId(t.detail.formId, a);
    },
    toDetail: function() {
        e.buttonClicked(this), wx.navigateBack({
            delta: 1
        });
    },
    toVoucher: function() {
        e.buttonClicked(this), wx.redirectTo({
            url: "/subpackage/voucher/voucher?info_id=" + this.data.info_id
        });
    },
    showPic: function() {
        e.setStorage("qrcode", this.data.imgInfo.qrcode), wx.navigateTo({
            url: "/subpackage/qrcode/qrcode?from=2"
        });
    }
});