function e(a, t) {
    console.log(t), wx.uploadFile({
        url: i.globalData.host + "/file/v1/upload",
        filePath: t,
        name: "file",
        formData: {
            access_token: l.getStorage("accessToken"),
            type: ""
        },
        success: function(i) {
            if (-500 == i.data.sta) return console.log(555), void l.login(function() {
                e(a, t);
            });
            var s = i.data, o = JSON.parse(s);
            if (0 == o.sta) {
                var n = o.data.urls[0];
                a.setData({
                    licensePic: n,
                    imageDialogShow: !1
                });
            } else l.showFailedToast(o.msg);
        },
        fail: function(e) {
            l.showFailedToast("上传图片失败，请重试");
        },
        complete: function() {
            l.hideLoading();
        }
    });
}

function a(e) {
    l.showLoading("正在加载数据"), wx.request({
        url: i.globalData.host + "/enroll/v1/auth/info",
        method: "GET",
        dataType: "json",
        data: {
            access_token: l.getToken()
        },
        success: function(t) {
            if (l.hideLoading(), -500 != t.data.sta) if (0 == t.data.sta) {
                var i = t.data.data;
                e.setData({
                    fullName: i.full_name,
                    licenseNo: i.license_no,
                    licensePic: i.license_pic,
                    legalPerson: i.legal_person,
                    defaultFullName: i.full_name,
                    defaultLicenseNo: i.license_no,
                    defaultLicensePic: i.license_pic,
                    defaultLegalPerson: i.legal_person
                });
            } else l.showFailedToast("数据加载失败", t.data.msg); else l.login(function() {
                a(e);
            });
        },
        fail: function(e) {
            l.showFailedToast("数据加载失败");
        }
    });
}

function t(e) {
    l.showLoading("正在加载数据"), wx.request({
        url: i.globalData.host + "/enroll/v2/auth/apply",
        method: "POST",
        dataType: "json",
        data: {
            access_token: l.getToken(),
            full_name: e.data.fullName,
            license_no: e.data.licenseNo,
            license_pic: e.data.licensePic,
            legal_person: e.data.legalPerson,
            type: parseInt(e.data.type)
        },
        success: function(a) {
            l.hideLoading(), -500 != a.data.sta ? 0 == a.data.sta ? (l.showToast("保存成功"), wx.redirectTo({
                url: "/subpackage/personalinfo/personalinfo?type=" + e.data.type
            })) : l.showFailedToast("数据加载失败", a.data.msg) : l.login(function() {
                t(e);
            });
        },
        fail: function(e) {
            l.showFailedToast("数据加载失败");
        }
    });
}

var i = getApp(), l = require("../../utils/util.js");

Page({
    data: {
        imageDialogShow: !1,
        type: 2,
        labelName: "企业全称",
        labelNo: "统一社会信用代码",
        labelPerson: "法定代表人姓名",
        labelPic: "营业执照/单位登记证书/法人证"
    },
    onLoad: function(e) {
        3 == e.type && (this.setData({
            labelName: "组织机构名称",
            labelNo: "统一社会信用代码",
            labelPerson: "负责人姓名",
            labelPic: "营业执照/单位登记证书/法人证"
        }), wx.setNavigationBarTitle && wx.setNavigationBarTitle({
            title: "申请组织认证"
        })), this.setData({
            type: e.type
        }), a(this);
    },
    onShow: function() {
        l.getContactUserInfo(this);
    },
    postFormId: function(e) {
        l.postFormId(e.detail.value);
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
        l.buttonClicked(this);
        var a = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                var i = t.tempFilePaths[0];
                l.showLoading("上传中..."), e(a, i);
            },
            fail: function() {
                l.hideLoading();
            }
        });
    },
    showPic: function() {
        wx.previewImage({
            urls: [ this.data.licensePic ]
        });
    },
    submitInfo: function() {
        l.isTextEmpty(this.data.fullName) ? l.showModelTips("请输入" + this.data.labelName) : l.isTextEmpty(this.data.licenseNo) ? l.showModelTips("请输入" + this.data.labelNo) : l.isTextEmpty(this.data.legalPerson) ? l.showModelTips("请输入" + this.data.labelPerson) : l.isTextEmpty(this.data.licensePic) ? l.showModelTips("请上传" + this.data.labelPic) : t(this);
    }
});