function e(a, t) {
    console.log(t), wx.uploadFile({
        url: o.globalData.host + "/file/v1/upload",
        filePath: t,
        name: "file",
        formData: {
            access_token: i.getStorage("accessToken"),
            type: ""
        },
        success: function(o) {
            if (-500 == o.data.sta) return console.log(555), void i.login(function() {
                e(a, t);
            });
            var s = o.data, n = JSON.parse(s);
            if (0 == n.sta) {
                var l = n.data.urls[0];
                a.setData({
                    licensePic: l,
                    imageDialogShow: !1
                });
            } else i.showFailedToast(n.msg);
        },
        fail: function(e) {
            i.showFailedToast("上传图片失败，请重试");
        },
        complete: function() {
            i.hideLoading();
        }
    });
}

function a(e) {
    i.showLoading("正在加载数据"), wx.request({
        url: o.globalData.host + "/enroll/v1/auth/info",
        method: "GET",
        dataType: "json",
        data: {
            access_token: i.getToken()
        },
        success: function(t) {
            if (i.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                var o = t.data.data;
                e.setData({
                    fullName: o.full_name,
                    licensePic: o.license_pic,
                    defaultFullName: o.full_name,
                    defaultLicensePic: o.license_pic
                });
            } else i.showFailedToast("数据加载失败", t.data.msg); else i.login(function() {
                a(e);
            });
        },
        fail: function(e) {
            i.showFailedToast("数据加载失败");
        }
    });
}

function t(e) {
    i.showLoading("正在加载数据"), wx.request({
        url: o.globalData.host + "/enroll/v2/auth/apply",
        method: "POST",
        dataType: "json",
        data: {
            access_token: i.getToken(),
            full_name: e.data.fullName,
            license_no: "",
            license_pic: e.data.licensePic,
            legal_person: "",
            type: parseInt(e.data.type)
        },
        success: function(a) {
            i.hideLoading(), -500 != a.data.sta ? 0 == a.data.sta ? (i.showToast("保存成功"), wx.redirectTo({
                url: "/subpackage/personalinfo/personalinfo?type=" + e.data.type
            })) : i.showFailedToast("数据加载失败", a.data.msg) : i.login(function() {
                t(e);
            });
        },
        fail: function(e) {
            i.showFailedToast("数据加载失败");
        }
    });
}

var o = getApp(), i = require("../../utils/util.js");

Page({
    data: {
        imageDialogShow: !1,
        type: 2,
        demoSrc: "https://cdn-xcxcustom.weiyoubot.cn/20190424/7055d11695b9ec1868676c03d36bd603.jpg"
    },
    onLoad: function(e) {
        this.setData({
            type: e.type
        }), a(this);
    },
    onShow: function() {
        i.getContactUserInfo(this);
    },
    postFormId: function(e) {
        i.postFormId(e.detail.value);
    },
    inputFullName: function(e) {
        this.setData({
            fullName: e.detail.value
        });
    },
    clearFullName: function() {
        this.setData({
            fullName: "",
            defaultFullName: ""
        });
    },
    inputLicenseNo: function(e) {
        this.setData({
            licenseNo: e.detail.value
        });
    },
    clearLicenseNo: function() {
        this.setData({
            licenseNo: "",
            defaultLicenseNo: ""
        });
    },
    inputLegalPerson: function(e) {
        this.setData({
            legalPerson: e.detail.value
        });
    },
    clearLegalPerson: function() {
        this.setData({
            legalPerson: "",
            defaultLegalPerson: ""
        });
    },
    openImageDialog: function() {
        this.setData({
            imageDialogShow: !0
        });
    },
    closeImageDialog: function() {
        this.setData({
            imageDialogShow: !1
        });
    },
    clearLogo: function() {
        this.setData({
            licensePic: ""
        });
    },
    chooseImage: function() {
        i.buttonClicked(this);
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var o = t.tempFilePaths[0];
                i.showLoading("上传中..."), e(a, o);
            },
            fail: function() {
                i.hideLoading();
            }
        });
    },
    showPic: function() {
        wx.previewImage({
            urls: [ this.data.licensePic ]
        });
    },
    previewDemoSrc: function() {
        wx.previewImage({
            urls: [ "https://cdn-xcxcustom.weiyoubot.cn/20190424/6c0506bae63ca8a6f7efc2ca11844b4d.jpg" ]
        });
    },
    submitInfo: function() {
        i.isTextEmpty(this.data.fullName) ? i.showModelTips("请输入公众号名称") : i.isTextEmpty(this.data.licensePic) ? i.showModelTips("请上传公众号截图") : t(this);
    }
});