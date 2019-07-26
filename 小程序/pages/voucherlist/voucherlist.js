function a(o) {
    t.showLoading("正在加载数据"), wx.request({
        url: e.globalData.host + "/enroll/v1/cert/list",
        method: "GET",
        dataType: "json",
        data: {
            access_token: t.getToken(),
            page: o.data.page,
            count: o.data.size
        },
        success: function(e) {
            if (t.hideLoading(), -500 != e.data.sta) if (0 == e.data.sta) {
                var n = e.data.data, i = o.data.page, s = !1;
                n.length == o.data.size && (s = !0), o.setData({
                    voucher: 1 == i ? n : o.data.voucher.concat(n),
                    page: i + 1,
                    moreData: s
                }), console.log(o.data);
            } else t.showFailedToast("数据加载失败", e.data.msg); else t.login(function() {
                a(o);
            });
        },
        fail: function(a) {
            console.log(a);
        }
    });
}

var t = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        page: 1,
        size: 20,
        moreData: !0,
        voucher: []
    },
    onLoad: function(t) {
        a(this);
    },
    onShow: function() {},
    onReachBottom: function() {
        this.data.moreData && a(this);
    },
    toVoucherDetail: function(a) {
        t.buttonClicked(this);
        var e = a.currentTarget.dataset.infoid;
        wx.navigateTo({
            url: "/subpackage/voucher/voucher?info_id=" + e
        });
    }
});