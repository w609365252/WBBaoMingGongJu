function a(i) {
    var e = "/enroll/v1/bak/enroll";
    i.data.info_id && (e = "/enroll/v1/bak/info"), o.showLoading("正在加载数据"), wx.request({
        url: t.globalData.host + e,
        method: "GET",
        data: {
            access_token: o.getToken(),
            info_id: i.data.info_id,
            eid: i.data.eid
        },
        success: function(t) {
            if (o.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                var e = t.data.data, d = e.final_word || "";
                i.data.info_id && (d = e.kick_word), i.setData({
                    comment: d
                });
            } else {
                if (-1 == t.data.sta && 300 == t.data.errcode) return void o.showModelTips(t.data.msg);
                o.showFailedToast("获取数据失败", t.data.msg);
            } else o.login(function() {
                a(i);
            });
        },
        fail: function(a) {
            o.hideLoading(), wx.reportAnalytics("fail_get_delete_reason", {
                url: e
            }), o.showFailedToast("获取数据失败", "");
        }
    });
}

var o = require("../../utils/util.js"), t = getApp();

Page({
    data: {
        verified: null,
        comment: "具体原因请联系发起人",
        proName: t.globalData.proName
    },
    onLoad: function(o) {
        this.setData({
            eid: o.eid || "",
            info_id: o.info_id || ""
        }), a(this);
    },
    onShow: function() {},
    onHide: function() {},
    postFormId: function(a) {
        o.postFormId(a.detail.formId);
    },
    toIndex: function() {
        o.toIndex();
    }
});