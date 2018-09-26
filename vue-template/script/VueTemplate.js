

/*
数据结构
==========================================================================================
{
    pagination: {
        page: 1,
        size: 10,
        sizes: [10, 20, 30, 50, 100, 500],
        total: 100
    },
    query: {
        properties: [
            { property: "num", label: "编号" },
            { property: "status", label: "状态" },
            { property: "amount", label: "金额" }
        ],
        filters: [
            { property: "", operator: "like", value: "" },
            { property: "", operator: "like", value: "" },
        ],
    },
    
    button:{
        query:{label:"查询"},
        create:{label:"添加"},
    }
}
==========================================================================================
*/

import TemplateFormInput from "../panel/form/TemplateFormInput.vue";
import TemplateFormSelect from "../panel/form/TemplateFormSelect.vue";
import TemplateFormSwitch from "../panel/form/TemplateFormSwitch.vue";
import TemplateFormRadio from "../panel/form/TemplateFormRadio.vue";
import TemplateFormText from "../panel/form/TemplateFormText.vue";
import TemplateFormDate from "../panel/form/TemplateFormDate.vue";
import TemplateFormTime from "../panel/form/TemplateFormTime.vue";
import TemplateFormCheckbox from "../panel/form/TemplateFormCheckbox.vue";
import TemplateFormEditor from "../panel/form/TemplateFormEditor.vue";
import TemplateFormImage from "../panel/form/TemplateFormImage.vue";
import TemplateFormImages from "../panel/form/TemplateFormImages.vue";



export default {
    form: {
        input: TemplateFormInput,
        select: TemplateFormSelect,
        switch: TemplateFormSwitch,
        radio: TemplateFormRadio,
        text: TemplateFormText,
        date: TemplateFormDate,
        time: TemplateFormTime,
        checkbox: TemplateFormCheckbox,
        editor: TemplateFormEditor,
        image: TemplateFormImage,
        images: TemplateFormImages,
    },
    init(nv) {
        nv = this.merge(this.getEmpty(), nv);
        if (nv.query.properties.length > 0 && nv.query.filters.length == 0) {
            this.merge(nv, {
                query: {
                    filters: [
                        { property: "", operator: "like", value: "" },
                        { property: "", operator: "like", value: "" },
                    ]
                }
            })
        }
        return nv
    },

    initQueryProperties(properties) {
        return this.init({
            query: {
                properties: properties
            }
        })
    },

    merge(bv, nv) {
        if (!nv) { return bv }
        if (!bv) { return nv }
        if (!nv && !bv) { return {} }

        if (!bv.query) { bv.query = {}; }
        if (!bv.query.filters) { bv.query.filters = [] }
        if (!bv.query.properties) { bv.query.properties = [] }

        Object.assign(bv.pagination, nv.pagination)
        if (nv.query) {
            if (nv.query.filters && nv.query.filters.length > 0) {
                nv.query.filters.forEach(e => {
                    bv.query.filters.push(Object.assign({}, e))
                });
            }
            if (nv.query.properties && nv.query.properties.length > 0) {
                nv.query.properties.forEach(e => {
                    bv.query.properties.push(Object.assign({}, e))
                });
            }
        }
        if (nv.button) {
            if (nv.button.query) {
                Object.assign(bv.button.query, nv.button.query)
            }
            if (nv.button.create) {
                Object.assign(bv.button.create, nv.button.create)
            }
        }
        return bv
    },
    getEmpty() {
        return {
            pagination: {
                page: 1,
                size: 10,
                sizes: [10, 20, 30, 50, 100, 500],
                total: 100
            },
            query: {
                properties: [],
                filters: []
            },
            button: {
                query: { label: "查询" },
                create: { label: "创建" }
            }
        }
    },

}



