function t(n) {
    e.showLoading("正在加载数据"), wx.request({
        url: i.globalData.host + "/enroll/v1/userinfo",
        data: {
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(i) {
            if (-500 != i.data.sta) {
                if (0 == i.data.sta) {
                    var a = i.data.data;
                    if (a) {
                        var o = a.unionid;
                        2 == a.auth_status && wx.redirectTo({
                            url: "/subpackage/authdetail/authdetail?unionid=" + o
                        });
                    }
                }
            } else e.login(function() {
                t(n);
            });
        },
        complete: function() {
            e.hideLoading();
        }
    });
}

var i = getApp(), e = require("../../utils/util.js");

Page({
    data: {
        list: [ {
            icon: "/images/ic_identification_company.png",
            title: "企业认证",
            desc: "适用于以企业名义举办活动的主办方，包括国企、民企、个体工商户等。",
            type: 2
        }, {
            icon: "/images/ic_identification_organization.png",
            title: "组织认证",
            desc: "适用于以组织机构名义举办活动的主办方，包括社会团体、公益组织、政府、俱乐部、学校、公园等",
            type: 3
        }, {
            icon: "/images/ic_identification_gzh.png",
            title: "公众号认证",
            desc: "适用于以公众号名义举办活动的主办方，拥有独立的公众号，并进行了微信官方认证。",
            type: 4
        }, {
            icon: "/images/ic_identification_person.png",
            title: "个人认证",
            desc: "适用于以个人名义举办活动的主办方。",
            type: 1
        } ]
    },
    onLoad: function(i) {
        t(this);
    },
    onShow: function() {
        e.getContactUserInfo(this);
    },
    postFormId: function(t) {
        e.postFormId(t.detail.formId);
    },
    toAuthentication: function(t) {
        e.buttonClicked(this);
        var i = t.currentTarget.dataset.index, n = this.data.list[i].type;
        2 != n && 3 != n || wx.redirectTo({
            url: "/subpackage/companyinfor/companyinfor?type=" + n
        }), 1 == n && wx.redirectTo({
            url: "/subpackage/personalinfo/personalinfo?type=1"
        }), 4 == n && wx.redirectTo({
            url: "/subpackage/subscription/subscription?type=4"
        });
    }
});