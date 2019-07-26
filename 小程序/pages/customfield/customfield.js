function t(t, e) {
    for (var i = 0; i < t.length; i++) if (t[i].id == e.id) return i;
    return -1;
}

function e(t) {
    for (var e = 0; e < t.length; e++) {
        if (a.isTextEmpty(t[e].text)) return !0;
        var i = a.hasSensitiveWords(t[e].text);
        if (i) return i;
    }
    return !1;
}

function i(t) {
    for (var e = [], i = 0; i < t.length; i++) e.push(t[i].text);
    return e;
}

var a = require("../../utils/util.js"), n = require("../../tmp/tmp.js"), s = getApp();

Page({
    data: {
        fieldType: [ "单行文本", "数字", "上传多图", "日期（年月日）", "单选", "多选", "时间（时分）", "多行文本", "地图位置", "手写签名", "下拉框", "标签", "省/市/区", "手机号", "上传单图" ],
        fieldTips: [ "适用于输入少量文本，比如学校名称、聚会地点", "适用于输入数字的数据，比如年龄、身高", "允许报名者上传多张图片", "格式如：2018-12-31", "适用于多个中选出一个，比如性别、年级、省份", "适用于从多个中选择几个，比如兴趣爱好", "格式如：23:59", "最多支持500个字，适用于备注、详细介绍", "用户让发起者从地图中点选位置，如地址", "报名者可以手绘图形，适用于手写签名、涂鸦", "单选内容较多时，适合使用下拉框", "适用于衣服尺码、颜色、状态等", "适用于收货地址等", "适用于需要填写手机号的信息，比如：联系方式", "允许报名者上传单张图片" ],
        fieldTypeIndex: 0,
        wordLength: [ 10, 20, 30, 40, 50, 100, 200, 300, 500 ],
        wordIndex: 4,
        limitLength: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 100, 200, 300, 400, 500 ],
        minIndex: 0,
        maxIndex: 18,
        fieldOptions: [ {
            id: 1,
            text: ""
        }, {
            id: 2,
            text: ""
        } ],
        title: "",
        status: 0,
        require: 0,
        fieldType2: s.fieldType,
        chageType: 1
    },
    onLoad: function(t) {
        if (t.edit) {
            var e = a.getStorage("tabCurrent"), i = this;
            this.setData({
                defaultName: e.field_name,
                title: e.field_name,
                defaultDesc: e.field_desc || "",
                desc: e.field_desc || "",
                fieldTypeIndex: e.field_type,
                wordIndex: i.getIndex(e.field_len),
                minIndex: i.getLimitIndex(e.min_length, 1),
                maxIndex: i.getLimitIndex(e.max_length, 2),
                fieldOptions: i.getOptions(e.options),
                status: e.status,
                require: e.require,
                field_key: e.field_key
            }), a.removeStorage("tabCurrent");
        } else this.setData({
            fieldTypeIndex: t.type ? parseInt(t.type) : 0
        });
        n.fieldType(this);
    },
    getIndex: function(t) {
        for (var e = this.data.wordLength, i = 0; i < e.length; i++) if (e[i] == t) return i;
        return 13;
    },
    getLimitIndex: function(t, e) {
        for (var i = this.data.limitLength, a = 0; a < i.length; a++) if (i[a] == t) return a;
        return 1 == e ? 0 : 2 == e ? 18 : void 0;
    },
    getOptions: function(t) {
        t = t || [ "", "" ];
        for (var e = [], i = 0; i < t.length; i++) e.push({
            id: i + 1,
            text: t[i]
        });
        return e;
    },
    onShow: function() {},
    onHide: function() {},
    changeFieldType: function(t) {
        this.setData({
            fieldTypeIndex: parseInt(t.detail.value)
        });
    },
    changeMinLength: function(t) {
        this.setData({
            minIndex: parseInt(t.detail.value)
        });
    },
    changeMaxLength: function(t) {
        this.setData({
            maxIndex: parseInt(t.detail.value)
        });
    },
    addOption: function(t) {
        var e = this.data.fieldOptions.length;
        this.data.fieldOptions[e] = {
            id: 0 == e ? 1 : this.data.fieldOptions[e - 1].id + 1,
            text: ""
        }, this.setData({
            fieldOptions: this.data.fieldOptions
        });
    },
    deleteOption: function(e) {
        var i = this.data.fieldOptions, a = t(i, e.currentTarget.dataset.item);
        i.splice(a, 1), this.setData({
            fieldOptions: i
        });
    },
    inputTitle: function(t) {
        this.setData({
            title: t.detail.value
        });
    },
    inputDesc: function(t) {
        this.setData({
            desc: t.detail.value
        });
    },
    inputOptionText: function(e) {
        var i = t(this.data.fieldOptions, e.currentTarget.dataset.item);
        -1 != i && (this.data.fieldOptions[i].text = e.detail.value, this.setData({
            fieldOptions: this.data.fieldOptions
        }));
    },
    openUiFieldType: function() {
        this.setData({
            fieldTypeDialog: !0,
            ruleDefault: this.data.rule
        });
    },
    saveField: function(t) {
        a.buttonClicked(this);
        var n = this.data.title;
        if (a.isTextEmpty(n)) a.showModelTips("请输入字段名称"); else {
            var s = a.hasSensitiveWords(n);
            if (s) return a.showModelTips("字段名称包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                title: a.replaceAll(n, s),
                defaultName: a.replaceAll(n, s)
            });
            var d = this.data.desc, l = a.hasSensitiveWords(d);
            if (l) return a.showModelTips("字段名称包含敏感词，已经自动处理为*，请重新编辑"), void this.setData({
                desc: a.replaceAll(d, l),
                defaultDesc: a.replaceAll(d, l)
            });
            var o = this.data.fieldTypeIndex, r = "单选", f = 50, u = [];
            if (4 == o || 5 == o || 10 == o || 11 == o) {
                r = 5 == o ? "多选" : r;
                var h = e(this.data.fieldOptions);
                if (1 == h) return void a.showModelTips("请将选项内容填写完整");
                if (this.data.fieldOptions.length < 1) return void a.showModelTips("至少要有一个选项");
                if ("string" == typeof h) {
                    for (var p = this.data.fieldOptions, c = 0, g = p.length; c < g; c++) {
                        var x = p[c].text;
                        p[c].text = a.replaceAll(x, h), console.log(x);
                    }
                    return this.setData({
                        fieldOptions: p
                    }), void a.showModelTips("选项内容包含敏感词，已经自动处理为*，请重新编辑");
                }
                u = i(this.data.fieldOptions);
            } else f = this.data.wordLength[this.data.wordIndex];
            var v = this.data, m = v.minIndex, I = v.maxIndex, T = v.limitLength, y = T[m], O = T[I], _ = {
                field_name: n,
                field_desc: d,
                status: this.data.status,
                require: this.data.require,
                field_len: f,
                field_type: o,
                min_length: y,
                max_length: O
            };
            this.data.field_key && (_.field_key = this.data.field_key), u.length && (_.options = u), 
            10 == o ? _.field_value = "请选择" : 12 == o && (_.field_value = [ "省", "市", "区" ], 
            _.custom_item = "请选择"), console.log("fieldTypeIndex ====== :"), console.log(o), 
            console.log("fieldCustom ====== :", _), a.setStorage("fieldCustom", _), wx.showToast({
                title: "保存成功",
                icon: "success",
                success: function() {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 1500);
                }
            });
        }
    },
    postFormId: function(t) {
        a.postFormId(t.detail.formId);
    }
});