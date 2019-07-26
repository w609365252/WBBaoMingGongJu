function e(e, a, t) {
    return a in e ? Object.defineProperty(e, a, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = t, e;
}

function a(e) {
    r.showLoading("正在加载数据"), wx.request({
      url: l.globalData.host + "/SignUpForm/user_detail",
        method: "GET",
        data: {
            access_token: r.getToken(),
            eid: e.data.eid,
            info_id: e.data.info_id
        },
        success: function(a) {
            if (r.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                var t = a.data.data;
                console.log("user_detail: ", t);
                for (var i = t.req_info, o = i.length, n = t.info, d = t.req_info, s = 0; s < o; s++) i[s].field_key || (i[s].field_key = s + 1);
                for (s = 0; s < n.length; s++) n[s].field_key || (n[s].field_key = s + 1);
                for (s = 0; s < o; s++) for (var l = i[s], f = 0; f < n.length; f++) l.field_key ? l.field_key == n[f].field_key && ("string" == typeof n[f].field_value ? l.field_value = r.trim(n[f].field_value) : (console.log("  =====  item :"), 
                console.log(n[f].field_value), console.log(l), l.field_value = n[f].field_value)) : l.field_name == n[f].field_name && ("string" == typeof n[f].field_value ? l.field_value = r.trim(n[f].field_value) : l.field_value = n[f].field_value);
                var u = t.remark;
                e.setData({
                    formItems: d,
                    comment: t.comment,
                    verified: t.verified,
                    goods: t.items || [],
                    refunded: t.refunded,
                    charge: t.charge,
                    remark: u || null,
                    defaultRemark: u,
                    remarkSaved: !!u
                });
            } else r.showFailedToast("获取数据失败，或者报名信息已经被删除"); else r.login(function() {
                enroll(e);
            });
        },
        fail: function(e) {
            r.hideLoading(), r.showFailedToast("网络请求超时");
        }
    });
}

function t(e) {
    r.showLoading("正在删除报名"), wx.request({
        url: l.globalData.host + "/enroll/v3/exit",
        method: "POST",
        data: {
            access_token: r.getToken(),
            eid: e.data.eid,
            info_id: e.data.info_id,
            kick_word: e.data.kickWord
        },
        success: function(a) {
            if (r.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                a.data.data;
                r.showToast("删除报名成功"), r.setStorage("refresh", !0), wx.navigateBack({
                    delta: 1
                });
            } else {
                if (-1 == a.data.sta && 300 == a.data.errcode) return void r.showModelTips(a.data.msg);
                r.showFailedToast("删除报名失败，", a.data.msg);
            } else r.login(function() {
                enroll(e);
            });
        },
        fail: function(e) {
            r.hideLoading(), r.showFailedToast("网络请求超时");
        }
    });
}

function i(e) {
    r.showLoading("正在退款"), wx.request({
        url: l.globalData.host + "/enroll/v2/refund",
        method: "POST",
        data: {
            access_token: r.getToken(),
            eid: e.data.eid,
            info_id: e.data.info_id
        },
        success: function(a) {
            if (r.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                a.data.data;
                r.showToast("退款成功"), r.setStorage("refresh", !0), wx.navigateBack({
                    delta: 1
                });
            } else {
                if (-1 == a.data.sta && 300 == a.data.errcode) return void r.showModelTips(a.data.msg);
                r.showFailedToast("退款失败, ", a.data.msg);
            } else r.login(function() {
                i(e);
            });
        },
        fail: function(e) {
            r.hideLoading(), r.showFailedToast("网络请求超时" + e.errMsg);
        }
    });
}

function o(e) {
    r.showLoading("正在退款"), wx.request({
        url: l.globalData.host + "/enroll/v1/super/refund",
        method: "POST",
        data: {
            access_token: r.getToken(),
            info_id: e.data.info_id
        },
        success: function(a) {
            if (r.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                a.data.data;
                r.showToast("退款成功"), r.setStorage("refresh", !0), wx.navigateBack({
                    delta: 1
                });
            } else {
                if (-1 == a.data.sta && 300 == a.data.errcode) return void r.showModelTips(a.data.msg);
                r.showFailedToast("退款失败, ", a.data.msg);
            } else r.login(function() {
                o(e);
            });
        },
        fail: function(e) {
            r.hideLoading(), r.showFailedToast("网络请求超时" + e.errMsg);
        }
    });
}

function n(e) {
    r.showLoading("正在提交数据");
    var a = e.data.remark;
    wx.request({
        url: l.globalData.host + "/enroll/v1/comment",
        method: "POST",
        data: {
            access_token: r.getToken(),
            info_id: e.data.info_id,
            remark: a
        },
        success: function(t) {
            r.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? (r.showToast("提交成功"), e.setData({
                remark: a || null,
                defaultRemark: a,
                remarkSaved: !!a
            })) : r.showFailedToast("提交数据失败，", t.data.msg) : r.login(function() {
                n(e);
            });
        },
        fail: function(e) {
            r.hideLoading(), r.showFailedToast("网络请求超时，" + e.errMsg);
        }
    });
}

var d, s = Object.assign || function(e) {
    for (var a = 1; a < arguments.length; a++) {
        var t = arguments[a];
        for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
}, r = require("../../utils/util.js"), l = getApp();

Page((d = {
    data: {
        formItems: [],
        confirm: {
            title: "确定要删除报名吗？",
            body: "如果删除报名，已付的报名费会自动原路退回：\n1. 如果用微信零钱支付的报名费用，系统会立即退还到对方的微信钱包。\n2. 如果用银行卡支付的报名费用，系统24小时内会退还到对方的银行卡。"
        },
        comment: "",
        remark: null
    },
    onLoad: function(t) {
        var i;
        console.log("options ==== userdetail :", t), this.setData((i = {
            eid: t.eid,
            info_id: t.info_id,
            isOwner: 1 == t.is_owner ? 1 : 0
        }, e(i, "info_id", t.info_id || ""), e(i, "fee", t.fee || 0), e(i, "status", t.status || 0), 
        e(i, "verify", t.verify || 0), e(i, "verified", t.verified || 0), e(i, "showDev", l.globalData.showDev), 
        i)), a(this);
    },
    onShow: function() {},
    showPic: function(e) {
        wx.previewImage({
            urls: [ e.currentTarget.dataset.src ]
        });
    },
    showGoodPic: function(e) {
        var a = e.currentTarget.dataset.index, t = this.data.goods[a].pics;
        wx.previewImage({
            urls: t
        });
    },
    inputWord: function(e) {
        this.setData({
            kickWord: e.detail.value
        });
    },
    postFormId: function(e) {
        r.postFormId(e.detail.formId);
    },
    deleteOk: function(e) {
        t(this);
    },
    deleteEnroll: function(e) {
        r.buttonClicked(this), console.log(this.data);
        this.setData({
            deleteConfirmDialog: !0
        });
    },
    closeConfirmDialog: function() {
        this.setData({
            confirmDialog: !1
        });
    },
    confirmOk: function() {
        t(this);
    },
    refund: function() {
        if (0 != this.data.verified) {
            var e = this.data.goods;
            if (e && e.length) {
                for (var a = 0, t = 0; t < e.length; t++) a += e[t].fee;
                if (0 == a) return void r.showModelTips("此用户团购费用为0，无法退款。");
            }
            var o = this;
            wx.showModal({
                title: "退款提示",
                content: "退款后，用户会在1个工作日内收到退款，报名数据会保留，你确认要退款吗？",
                success: function(e) {
                    e.confirm && i(o);
                }
            });
        } else r.showModelTips("请先审核该报名，审核处理后的报名才允许退款。");
    },
    review: function(e) {
        var a = e.currentTarget.dataset.type;
        wx.navigateTo({
            url: "/subpackage/refuse/refuse?info_id=" + this.data.info_id + "&type=" + a
        });
    },
    toVoucherDetail: function(e) {
        r.buttonClicked(this), wx.navigateTo({
            url: "/subpackage/voucher/voucher?info_id=" + this.data.info_id
        });
    },
    closeDeleteConfirmDialog: function() {
        this.setData({
            deleteConfirmDialog: !1
        });
    }
}, e(d, "showGoodPic", function(e) {
    var a = e.currentTarget.dataset.index, t = this.data.goods[a].pics;
    wx.previewImage({
        urls: t
    });
}), e(d, "addRemark", function(e) {
    e.currentTarget.dataset.id;
    var a = this.data.remark;
    this.setData(s({}, a ? {
        remark: a
    } : {
        remark: ""
    }, {
        remarkSaved: !1
    }));
}), e(d, "inputComment", function(e) {
    this.setData({
        remark: e.detail.value
    });
}), e(d, "deleteComment", function() {
    var e = this;
    wx.showModal({
        title: "提示",
        content: "确认要删除备注吗？",
        confirmColor: "#12b7f5",
        success: function(a) {
            a.confirm && (e.setData({
                remark: "",
                defaultRemark: ""
            }), n(e));
        }
    });
}), e(d, "commitComment", function() {
    n(this);
}), e(d, "refundSingle", function() {
    o(this);
}), d));