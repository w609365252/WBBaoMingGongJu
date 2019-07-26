function e(e, a, t) {
    var s = t;
    wx.uploadFile({
        url: o.globalData.host + "/file/v1/upload",
        filePath: s,
        name: "file",
        formData: {
            access_token: i.getStorage("accessToken"),
            type: "qrcode" == a && 0 == e.data.imgTypeIndex ? "qrcode" : ""
        },
        success: function(t) {
            i.hideLoading();
            var o = t.data, s = JSON.parse(o);
            if (0 == s.sta) {
                var n = s.data.urls[0], d = e.data.imgInfo;
                "header" == a ? d.header = n : d.qrcode = n, e.setData({
                    imgInfo: d
                });
            } else i.showFailedToast(s.msg);
        },
        fail: function(e) {
            i.hideLoading(), i.showFailedToast("上传图片失败，请重试");
        }
    });
}

function a(e) {
    var t = e.data, s = t.eid, n = t.imgInfo, d = t.imgTypeIndex, c = t.visiIndex;
    wx.request({
        url: o.globalData.host + "/enroll/v1/follow/update",
        data: {
            eid: s,
            title: n.title,
            desc: n.desc,
            type: parseInt(d),
            header: n.header,
            qrcode: n.qrcode,
            visi: parseInt(c),
            access_token: i.getToken()
        },
        method: "POST",
        success: function(t) {
            i.hideLoading(), -500 != t.data.sta ? 0 == t.data.sta ? (o.globalData.needRefresh = !0, 
            i.showToast("保存成功"), setTimeout(function() {
                wx.navigateBack({
                    delta: 1
                });
            }, 1500)) : i.showFailedToast("保存失败，", t.data.msg) : i.login(function() {
                a(e);
            });
        },
        fail: function(e) {
            i.showFailedToast("保存失败，" + e.errMsg);
        }
    });
}

function t(e) {
    var a = e.data.eid;
    wx.request({
        url: o.globalData.host + "/enroll/v1/follow/detail",
        data: {
            eid: a,
            access_token: i.getToken()
        },
        method: "GET",
        success: function(a) {
            if (i.hideLoading(), -500 != a.data.sta) if (0 == a.data.sta) {
                var o = a.data.data || e.data.imgInfo;
                e.setData({
                    imgInfo: o,
                    imgTypeIndex: o.type || 0,
                    visiIndex: o.visi
                });
            } else i.showFailedToast("获取数据失败，", a.data.msg); else i.login(function() {
                t(e);
            });
        },
        fail: function(e) {
            i.showFailedToast("获取数据失败，" + e.errMsg);
        }
    });
}

var i = require("../../utils/util.js"), o = getApp(), s = require("../../tmp/tmp.js");

Page({
    data: {
        imgType: [ "加入微信/qq群", "加个人微信/qq号", "关注公众号" ],
        imgTypeIndex: 0,
        imgInfo: {
            header: "",
            title: "",
            desc: "",
            qrcode: ""
        },
        huomaDialog: !1,
        visi: [ "报名后可见", "报名前可见" ],
        visiIndex: 0
    },
    onLoad: function(e) {
        this.setData({
            eid: e.eid
        }), t(this), s.huoma(this);
    },
    onShow: function() {},
    huomaDialog: function() {
        this.setData({
            huomaDialog: !0
        });
    },
    changeImgType: function(e) {
        this.setData({
            imgTypeIndex: e.detail.value
        });
    },
    changeVisi: function(e) {
        this.setData({
            visiIndex: e.detail.value
        });
    },
    chooseImage: function(a) {
        i.buttonClicked(this);
        var t = a.currentTarget.dataset.type, o = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                var s = a.tempFilePaths[0];
                i.showLoading("上传中..."), e(o, t, s);
            },
            fail: function() {
                i.hideLoading();
            }
        });
    },
    inputInfo: function(e) {
        var a = e.currentTarget.dataset.name, t = this.data.imgInfo, i = e.detail.value;
        t[a] = i, this.setData({
            imgInfo: t
        }), console.log(t);
    },
    clearInfo: function(e) {
        var a = e.currentTarget.dataset.name, t = this.data.imgInfo;
        t[a] = "", this.setData({
            imgInfo: t
        });
    },
    showPic: function() {
        i.setStorage("qrcode", this.data.imgInfo.qrcode), wx.navigateTo({
            url: "/subpackage/qrcode/qrcode?from=2"
        });
    },
    removeImg: function(e) {
        var a = this.data.imgInfo;
        a.qrcode = "", this.setData({
            imgInfo: a
        });
    },
    saveFollow: function(e) {
        var t = this.data.imgInfo;
        "" != t.header ? i.isTextEmpty(t.title) ? i.showModelTips("请输入名称") : i.isTextEmpty(t.desc) ? i.showModelTips("请输入描述") : i.isTextEmpty(t.qrcode) ? i.showModelTips("请上传二维码") : a(this) : i.showModelTips("请上传头像");
    },
    clearData: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "确认要清空报名关注的信息吗？",
            confirmColor: "#12b7f5",
            success: function(t) {
                t.confirm && (e.setData({
                    imgInfo: {
                        header: "",
                        title: "",
                        desc: "",
                        qrcode: ""
                    }
                }), a(e));
            }
        });
    },
    toWeiyou: function() {
        var e = "https://mp.weixin.qq.com/s/Brqdg1BSTkJXAZK2ntpWiQ";
        e = encodeURIComponent(e), wx.navigateTo({
            url: "/pages/webview/webview?url=" + e
        });
    },
    toKefu: function() {
        var e = "https://mp.weixin.qq.com/s/rrUC3gMizwrnoEFqpjgJvQ";
        e = encodeURIComponent(e), wx.navigateTo({
            url: "/pages/webview/webview?url=" + e
        });
    }
});