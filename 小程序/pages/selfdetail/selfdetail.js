function e(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

function t(e) {
    o.showLoading("正在加载数据"), wx.request({
      url: n.globalData.host + "/SignUpForm/user_detail",
        method: "GET",
        data: {
            access_token: o.getToken(),
            eid: e.data.eid,
            info_id: e.data.info_id
        },
        success: function(t) {
            if (o.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                for (var a = t.data.data, i = a.req_info, n = i.length, d = a.info, s = a.req_info, l = 0; l < n; l++) i[l].field_key || (i[l].field_key = l + 1);
                for (l = 0; l < d.length; l++) d[l].field_key || (d[l].field_key = l + 1);
                for (l = 0; l < n; l++) for (var f = i[l], r = 0; r < d.length; r++) f.field_key ? f.field_key == d[r].field_key && ("string" == typeof d[r].field_value ? f.field_value = o.trim(d[r].field_value) : (console.log("  =====  item :"), 
                console.log(d[r].field_value), console.log(f), f.field_value = d[r].field_value)) : f.field_name == d[r].field_name && ("string" == typeof d[r].field_value ? f.field_value = o.trim(d[r].field_value) : f.field_value = d[r].field_value);
                console.log(s), e.setData({
                    formItems: s,
                    comment: a.comment||'',
                  verified: a.verified || '',
                    goods: a.items || [],
                  refunded: a.refunded || '',
                  charge: a.charge || ''
                });
            } else o.showFailedToast("获取数据失败，", t.data.msg); else o.login(function() {
                enroll(e);
            });
        },
        fail: function(e) {
            o.hideLoading(), o.showFailedToast("网络请求超时");
        }
    });
}

function a(e) {
    o.showLoading("正在删除报名"), wx.request({
      url: n.globalData.host + "/SignUpForm/exit",
        method: "POST",
        data: {
            access_token: o.getToken(),
            eid: e.data.eid,
            info_id: e.data.info_id
        },
        success: function(t) {
            if (o.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                t.data.data;
                var a = e.data.can_quit;
                o.showToast(0 == a ? "申请已提交" : "删除报名成功"), o.setStorage("refresh", !0), wx.navigateBack({
                    delta: 1
                });
            } else {
                if (-1 == t.data.sta && 300 == t.data.errcode) return void o.showModelTips(t.data.msg);
                o.showFailedToast("删除报名失败，", t.data.msg);
            } else o.login(function() {
                enroll(e);
            });
        },
        fail: function(e) {
            o.hideLoading(), o.showFailedToast("网络请求超时");
        }
    });
}

function i(e, t) {
    o.showLoading("正在提交数据"), wx.request({
        url: n.globalData.host + "/enroll/v1/verify",
        method: "POST",
        data: {
            access_token: o.getToken(),
            verified: t,
            info_id: e.data.info_id,
            comment: e.data.comment
        },
        success: function(a) {
            if (o.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                a.data.data;
                1 == t && o.showToast("通过审核"), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            } else {
                if (-1 == a.data.sta && 300 == a.data.errcode) return void o.showModelTips(a.data.msg);
                o.showFailedToast("审核失败，", a.data.msg);
            } else o.login(function() {
                i(e, t);
            });
        },
        fail: function(e) {
            o.hideLoading(), o.showFailedToast("网络请求超时");
        }
    });
}

var o = require("../../utils/util.js"), n = getApp();

Page({
    data: {
        formItems: [],
        confirm: {
            title: "温馨提示",
            body: "如果删除报名，已付的报名费会自动原路退回：\n1. 如果用微信零钱支付的报名费用，系统会立即退还到对方的微信钱包。\n2. 如果用银行卡支付的报名费用，系统24小时内会退还到对方的银行卡。"
        },
        comment: ""
    },
    onLoad: function(a) {
        var i;
        console.log("================== onload"), console.log(a), this.setData((i = {
            eid: a.eid,
            info_id: a.info_id,
            type: a.type,
            isOwner: 1 == a.is_owner ? 1 : 0
        }, e(i, "info_id", a.info_id || ""), e(i, "fee", a.fee), e(i, "status", a.status), 
        e(i, "verify", a.verify), e(i, "verified", a.verified), e(i, "can_quit", a.can_quit), 
        i)), t(this);
    },
    onShow: function(e) {},
    showPic: function(e) {
        wx.previewImage({
            urls: [ e.currentTarget.dataset.src ]
        });
    },
    postFormId: function(e) {
        o.postFormId(e.detail.formId);
    },
    closeCanQuit: function() {
        this.setData({
            noCanQuit: !1
        });
    },
    makeCall: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.phone
        });
    },
    deleteEnroll: function(e) {
        o.buttonClicked(this);
        var t = this, i = this.data.can_quit;
        this.data.fee > 0 ? 2 == this.data.status && 1 == this.data.verified ? this.setData({
            confirm: {
                title: "确定取消报名吗？",
                body: "“取消报名”将会发送通知给发起者，发起者同意后，即可取消报名。如果是付费报名，费用会自动原路退回。"
            },
            confirmDialog: !0
        }) : this.setData({
            confirm: {
                title: "温馨提示",
                body: "如果删除报名，已付的报名费会自动原路退回：\n1. 如果用微信零钱支付的报名费用，系统会立即退还到对方的微信钱包。\n2. 如果用银行卡支付的报名费用，系统24小时内会退还到对方的银行卡。"
            },
            confirmDialog: !0
        }) : 0 == i ? this.setData({
            confirm: {
                title: "确定取消报名吗？",
                body: "“取消报名”将会发送通知给发起者，发起者同意后，即可取消报名。"
            },
            confirmDialog: !0
        }) : wx.showModal({
            title: "提示",
            content: "你确定要取消报名吗？",
            success: function(e) {
                e.confirm && a(t);
            }
        });
    },
    closeConfirmDialog: function() {
        this.setData({
            confirmDialog: !1
        });
    },
    confirmOk: function() {
        a(this);
    },
    review: function(e) {
        var t = this;
        1 == e.currentTarget.dataset.type ? wx.showModal({
            title: "确认审核结果",
            content: "审核通过后，报名用户将会收到成功提醒，请确认是否通过。",
            confirmColor: "#00a8f3",
            success: function(e) {
                e.confirm && i(t, 1);
            }
        }) : wx.navigateTo({
            url: "/subpackage/refuse/refuse?info_id=" + this.data.info_id + "&type=" + t.data.type
        });
    },
    toVoucherDetail: function(e) {
        o.buttonClicked(this), wx.navigateTo({
            url: "/subpackage/voucher/voucher?info_id=" + this.data.info_id
        });
    },
    showGoodPic: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.goods[t].pics;
        wx.previewImage({
            urls: a
        });
    },
    contactCallback: function(e) {
        o.contactCallback(e), this.setData({
            confirmDialog: !1
        });
    }
});