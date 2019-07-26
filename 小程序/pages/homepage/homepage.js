function a(t) {
    wx.request({
        url: n.globalData.host + "/enroll/v2/homepage/info",
        method: "GET",
        dataType: "json",
        data: {
            access_token: s.getToken(),
            unionid: t.data.unionid
        },
        success: function(o) {
            if (-500 != o.data.sta) if (0 == o.data.sta) {
                var i = o.data.data, e = "Ta的个人主页";
                i.is_owner && (e = "我的个人主页"), wx.setNavigationBarTitle && wx.setNavigationBarTitle({
                    title: e
                }), console.log("data: ", i), 1 == i.auth_type && (i.name = i.name[0] + "**"), t.setData({
                    info: i
                });
            } else s.showFailedToast("数据加载失败", o.data.msg); else s.login(function() {
                a(t), t.setData({
                    hasUserInfo: !0
                });
            }, function() {
                t.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(a) {
            s.showFailedToast("服务器API超时" + a.errMsg);
        }
    });
}

function t(a) {
    s.showLoading("正在加载数据"), wx.request({
      url: n.globalData.host + "/SignUpForm/GetActives",
        method: "GET",
        dataType: "json",
        data: {
            access_token: s.getToken(),
            type: a.data.type,
            page: a.data.page,
            count: 10,
            unionid: a.data.unionid
        },
        success: function(o) {
            if (s.hideLoading(), -500 != o.data.sta) if (0 == o.data.sta) {
                var i = o.data.data || [], e = a.data.page, n = !1;
                10 == i.length && (n = !0);
                for (var h = 0; h < i.length; h++) i[h].right = 0, i[h].isDelShow = !1;
                a.setData({
                    enrollList: 1 == e ? i : a.data.enrollList.concat(i),
                    page: e + 1,
                    moreData: n
                });
            } else s.showFailedToast("数据加载失败", o.data.msg); else s.login(function() {
                t(a), a.setData({
                    hasUserInfo: !0
                });
            }, function() {
                a.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(a) {
            s.hideLoading(), s.showFailedToast("服务器API超时" + a.errMsg);
        }
    });
}

function o(a, t) {
    s.showLoading("正在获取图片");
    wx.request({
        url: n.globalData.host + "/enroll/v1/homepage/share",
        data: {
            unionid: a.data.unionid,
            access_token: wx.getStorageSync("accessToken")
        },
        method: "GET",
        success: function(e) {
            s.hideLoading(), -500 != e.data.sta ? 0 == e.data.sta && e.data.data ? (a.setData({
                imageUrl: e.data.data.url,
                showShareDialog: !0
            }), i(a)) : s.showFailedToast("获取图片失败，请重试。", e.data.msg) : s.login(function() {
                o(a, t), a.setData({
                    hasUserInfo: !0
                });
            }, function() {
                a.setData({
                    hasUserInfo: !1
                });
            });
        },
        fail: function(a) {
            s.hideLoading(), s.showFailedToast("获取图片失败，请重试");
        }
    });
}

function i(a) {
    wx.saveImageToPhotosAlbum ? (s.showLoading("正在保存"), wx.getImageInfo({
        src: a.data.imageUrl,
        success: function(t) {
            e(a, t.path), a.setData({
                qrcodeDialog: !1
            });
        },
        fail: function(a) {
            s.hideLoading(), s.showModelTips("获取图片信息失败，原因:" + a.errMsg);
        }
    })) : s.showModelTips('1、点击下面的图片查看大图。2、长按或点击右上角三个点"..."保存到系统相册。3、分享给好友或群。');
}

function e(a, t) {
    wx.saveImageToPhotosAlbum({
        filePath: t,
        success: function(a) {
            s.hideLoading();
        },
        fail: function(o) {
            s.hideLoading();
            o.errMsg;
            wx.openSetting ? wx.showModal({
                title: "提示",
                content: "请授权报名工具访问相册，该操作仅会方便您保存图片到相册，请放心授权。",
                cancelText: "不想授权",
                confirmText: "去授权",
                confirmColor: "#12b7f5",
                success: function(o) {
                    o.confirm ? wx.openSetting({
                        complete: function(o) {
                            e(a, t);
                        }
                    }) : o.cancel && s.showModelTips('如果您不愿授权，也可以通过点击下面的图片查看大图，然后长按或点击右上角三个点"..."保存到系统相册。');
                }
            }) : s.showModelTips('如果您不愿授权，也可以通过点击下面的图片查看大图，然后长按或点击右上角三个点"..."保存到系统相册。');
        }
    });
}

var n = getApp(), s = require("../../utils/util.js"), h = require("../../tmp/tmp.js");

Page({
    data: {
        page: 1,
        type: 6,
        shareDialogHide: !0,
        shareDialogAnimate: !1,
        moreData: !1,
        enrollList: null,
        info: {}
    },
    onLoad: function(o) {
        var i = o.unionid;
        s.isTextEmpty(i) && (i = decodeURIComponent(o.scene)), this.setData({
            unionid: i
        }), h.enRoll(this);
        var e = this;
        h.wxLogin(this, function() {
            a(e), t(e);
        });
    },
    onShow: function() {
        var o = this;
        s.checkSession(this, function() {
            o.data.unionid && a(o), t(o), o.setData({
                toDetail: !1
            });
        });
    },
    onReachBottom: function() {
        this.data.moreData && t(this);
    },
    getEnrollList: function() {
        this.setData({
            page: 1
        }), t(this);
    },
    postFormId: function(a) {
        s.postFormId(a.detail.formId);
    },
    showPath: function() {
        this.setData({
            pathDialog: !0
        }), this.closeShareDialog();
    },
    showWxDialog: function() {
        this.setData({
            wxDialog: !0
        });
    },
    closeWxDialog: function() {
        this.setData({
            wxDialog: !1
        });
    },
    copyWx: function() {
        this.closeWxDialog();
        var a = this.data.info.wx_no;
        wx.setClipboardData({
            data: a,
            success: function(a) {
                s.showToast("复制成功");
            }
        });
    },
    tellPhone: function() {
        var a = this.data.info.phone + "";
        wx.showModal({
            title: "拨打电话",
            content: a,
            success: function(t) {
                t.confirm && wx.makePhoneCall({
                    phoneNumber: a
                });
            }
        });
    },
    toIndex: function() {
        s.buttonClicked(this), s.toIndex();
    },
    toEdit: function() {
        wx.navigateTo({
            url: "/subpackage/edithome/edithome?auth_type=" + this.data.auth_type + "&unionid=" + this.data.unionid
        });
    },
    showShareDialog: function() {
        this.setData({
            shareDialogAnimate: !0,
            shareDialogHide: !1
        });
    },
    closeShareDialog: function() {
        this.setData({
            shareDialogAnimate: !1
        });
        var a = this;
        setTimeout(function() {
            a.setData({
                shareDialogHide: !0
            });
        }, 300);
    },
    shareWxCircle: function(a) {
        s.buttonClicked(this);
        this.setData({
            shareDialogHide: !0,
            shareFriends: !0
        }), o(this, 1);
    },
    toAuthType: function() {
        0 != this.data.info.is_owner ? wx.navigateTo({
            url: "/subpackage/authentication/authentication?status=" + this.data.info.auth_status
        }) : wx.navigateTo({
            url: "/subpackage/authinfo/authinfo?unionid=" + this.data.unionid + "&auth_type=" + this.data.info.auth_type
        });
    },
    closeDialog: function() {
        this.setData({
            showShareDialog: !1
        });
    },
    showQrcode: function(a) {
        var t = a.currentTarget.dataset.pic;
        wx.previewImage({
            urls: [ t ]
        });
    },
    closePathDialog: function() {
        this.setData({
            pathDialog: !1
        });
    },
    copyPath: function() {
        this.closePathDialog();
        var a = "/pages/homepage/homepage?unionid=" + this.data.unionid;
        wx.setClipboardData({
            data: a,
            success: function(a) {
                s.showToast("复制成功");
            }
        });
    }
});