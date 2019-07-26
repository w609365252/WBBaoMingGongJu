var t = require("../../utils/util.js");

getApp();

Page({
    data: {
        setting: [ {
            title: "设置管理员",
            path: "/subpackage/admin/admin"
        }, {
            title: "报名关注",
            path: "/subpackage/enrollfollow/enrollfollow"
        } ]
    },
    onLoad: function(t) {
        this.setData({
            eid: t.eid
        });
    },
    postFormId: function(e) {
        t.postFormId(e.detail.formId);
    },
    toSettingItem: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data, i = a.setting, o = a.eid;
        wx.navigateTo({
            url: i[e].path + "?eid=" + o
        });
    }
});