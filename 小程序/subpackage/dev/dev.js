function a(t) {
    e.showLoading("正在加载数据"), wx.request({
        url: i.globalData.host + "/enroll/v1/list",
        method: "GET",
        dataType: "json",
        data: {
            access_token: e.getToken(),
            type: t.data.type,
            page: t.data.page,
            count: 10
        },
        success: function(s) {
            if (e.hideLoading(), -500 != s.data.sta) if (0 == s.data.sta) {
                var i = s.data.data, n = t.data.page, o = !1;
                10 == i.length && (o = !0);
                for (var d = 0; d < i.length; d++) i[d].right = 0, i[d].isDelShow = !1;
                t.setData({
                    enrollList: 1 == n ? i : t.data.enrollList.concat(i),
                    page: n + 1,
                    moreData: o
                });
            } else e.showFailedToast("数据加载失败", s.data.msg); else e.login(function() {
                a(t);
            });
        },
        fail: function(a) {
            e.showFailedToast("数据加载失败");
        }
    });
}

function t(a) {
    e.showLoading("正在加载数据");
    var s = {
        access_token: e.getToken(),
        eid: a.data.eid
    };
    1 == a.data.searchTypeIndex && (s = {
        access_token: e.getToken(),
        unionid: a.data.eid,
        type: 0,
        page: a.data.page,
        count: 20
    }), wx.request({
        url: i.globalData.host + "/enroll/v1/list",
        method: "GET",
        dataType: "json",
        data: s,
        success: function(s) {
            if (e.hideLoading(), -500 != s.data.sta) if (0 == s.data.sta) {
                var i = s.data.data, n = a.data.page;
                10 == i.length && !0;
                for (var o = 0; o < i.length; o++) i[o].right = 0, i[o].isDelShow = !1;
                n = a.data.page;
                a.setData({
                    enrollList: 1 == n ? i : a.data.enrollList.concat(i),
                    page: n + 1,
                    moreData: i.length > 15
                });
            } else e.showFailedToast("数据加载失败", s.data.msg); else e.login(function() {
                t(a);
            });
        },
        fail: function(a) {
            e.showFailedToast("数据加载失败");
        }
    });
}

var e = require("../../utils/util.js"), s = require("../../tmp/tmp.js"), i = getApp();

Page({
    data: {
        page: 1,
        moreData: !1,
        enrollList: null,
        type: 3,
        currentTab: 1,
        searchType: [ "Eid", "Unionid" ],
        searchTypeIndex: 0,
        search: !1
    },
    onLoad: function() {
        s.enRoll(this);
    },
    onShow: function(e) {
        this.data.search ? t(this) : a(this), this.setData({
            toDetail: !1
        });
    },
    onReachBottom: function() {
        this.data.moreData && (this.data.search ? t(this) : a(this));
    },
    toCreate: function() {
        e.buttonClicked(this), wx.navigateTo({
            url: "/pages/create/create"
        });
    },
    postFormId: function(a) {
        e.postFormId(a.detail.formId);
    },
    tabChange: function(t) {
        var e = parseInt(t.currentTarget.dataset.id);
        this.setData({
            currentTab: e,
            type: e + 2,
            page: 1,
            moreData: !0,
            search: !1
        }), a(this);
    },
    inputEid: function(a) {
        this.setData({
            eid: a.detail.value
        });
    },
    clearEid: function() {
        this.setData({
            eid: "",
            eidDefault: ""
        });
    },
    search: function(a) {
        "" != this.data.eid && (this.setData({
            search: !0,
            page: 1
        }), t(this));
    },
    changeSearchType: function(a) {
        this.setData({
            searchTypeIndex: a.detail.value
        });
    }
});