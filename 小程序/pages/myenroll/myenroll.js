function t(e) {
    a.showLoading("正在加载数据"), wx.request({
      url: o.globalData.host + "/SignUpForm/GetActives",
        method: "GET",
        dataType: "json",
        data: {
            access_token: a.getToken(),
            type: e.data.type,
            page: e.data.page,
            count: 10
        },
        success: function(o) {
            if (a.hideLoading(), -500 != o.data.sta) if (0 == o.data.sta) {
              var n = o.data.data || [], s = e.data.page, i = !1;
              10 == n.length && (i = !0);
              for (var r = 0; r < n.length; r++) n[r].right = 0, n[r].isDelShow = !1;
              e.setData({
                  enrollList: 1 == s ? n : e.data.enrollList.concat(n),
                  page: s + 1,
                  moreData: i
              });
            } else a.showFailedToast("数据加载失败，", o.data.msg); else a.login(function() {
                t(e), e.setData({
                    hasUserInfo: !0
                });
            }, function() {
                e.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(t) {
            a.showFailedToast("数据加载失败，请稍后再重试");
        }
    });
}

var a = require("../../utils/util.js"), e = require("../../tmp/tmp.js"), o = getApp();

Page({
    data: {
        page: 1,
        moreData: !1,
        enrollList: null,
        type: 0,
        currentTab: 0
    },
    onLoad: function() {
        e.enRoll(this);
        var o = this;
        e.wxLogin(this, function() {
            t(o), a.userInfo(o);
        });
    },
    onShow: function(e) {
        var o = this;
        a.checkSession(this, function() {
            t(o), a.userInfo(o), o.setData({
                toDetail: !1
            });
        });
    },
    onReachBottom: function() {
        this.data.moreData && t(this);
    },
    toCreate: function() {
        a.buttonClicked(this), wx.navigateTo({
            url: "/pages/create/create"
        });
    },
    postFormId: function(t) {
        a.postFormId(t.detail.formId);
    },
    tabChange: function(a) {
        var e = parseInt(a.currentTarget.dataset.id);
        this.setData({
            currentTab: e,
            type: e,
            page: 1,
            moreData: !0
        }), t(this);
    }
});