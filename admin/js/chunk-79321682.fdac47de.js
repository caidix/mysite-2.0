(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-79321682"],{1246:function(e,t,a){"use strict";var s=a("c790"),r=a.n(s);r.a},"1afd":function(e,t,a){"use strict";a("d3b7"),a("96cf");var s=a("1da1"),r=a("671a"),n=10,i=1,o={mixins:[r["a"]],data:function(){return{page:1,datas:[],limit:n,total:i}},methods:{fetchData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading(),t.next=3,e.getDatas();case 3:a=t.sent,s=a.data,console.log(s),s&&0===s.code&&s.data&&Array.isArray(s.data.data)&&(e.datas=s.data.data,e.total=s.data.total?s.data.total:s.data.data.length),e.loaded();case 8:case"end":return t.stop()}}),t)})))()},getDatas:function(){return Promise.resolve([])},resetData:function(){this.datas=[],this.resetPage(),this.fetchData()},resetPage:function(){this.limit=n,this.total=i}}};t["a"]={mixins:[o],methods:{handlePageChange:function(e){this.page=e,this.fetchData()},handleLimitChange:function(e){this.limit=e,this.fetchData()}}}},"671a":function(e,t,a){"use strict";t["a"]={data:function(){return{isLoading:!1}},methods:{beforeLoading:function(){},afterLoading:function(){},loading:function(){this.beforeLoading(),this.isLoading=!0},loaded:function(){this.afterLoading(),this.isLoading=!1}}}},c790:function(e,t,a){},dea2:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"list"},[a("h1",[e._v("管理员列表")]),a("div",{staticClass:"filter-container"},[a("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"small"},on:{click:e.handleEdit}},[e._v("新建用户")])],1),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],attrs:{data:e.item,border:""}},[a("el-table-column",{attrs:{prop:"_id",label:"ID",width:"130"}}),a("el-table-column",{attrs:{prop:"username",label:"用户名"}}),a("el-table-column",{attrs:{prop:"introduce",label:"简述",width:"400"}}),a("el-table-column",{attrs:{prop:"avatar",label:"头像"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{height:"3rem"},attrs:{src:e.row.avatar,alt:""}})]}}])}),a("el-table-column",{attrs:{prop:"username",label:"权限类型"},scopedSlots:e._u([{key:"default",fn:function(t){var s=t.row;return[a("el-tag",{attrs:{type:e._f("typeFilter")(s.type)}},[e._v(e._s(e._f("typeMeanFilter")(s.type)))])]}}])}),a("el-table-column",{attrs:{fixed:"right",width:"250",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"small",plain:""},on:{click:function(a){return e.edit(t.row)}}},[e._v("编辑 ")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){return e.handleDel(t.row)}}},[e._v("删除")])]}}])})],1),a("el-pagination",{attrs:{"current-page":e.page,"page-size":e.limit,"page-sizes":[5,10,30,50],layout:"total, prev, sizes, pager, next, jumper",total:e.total},on:{"size-change":e.handleLimitChange,"current-change":e.handlePageChange}}),a("UserDialog",{attrs:{show:e.dialogShow,"is-edit":e.isEdit,"edit-form":e.editForm},on:{"update:show":function(t){e.dialogShow=t},"add-success":e.fetch,"update:isEdit":function(t){e.isEdit=t},"update:is-edit":function(t){e.isEdit=t}}})],1)},r=[],n=(a("96cf"),a("1da1")),i=a("5530"),o=a("c24f"),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-dialog",{attrs:{title:e.isEdit?"编辑用户":"创建用户",visible:e.visible,width:"50%"},on:{closed:e.closed,"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"userForm",staticClass:"demo-userForm",attrs:{model:e.userForm,"status-icon":"","label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名",prop:"username"}},[a("el-input",{attrs:{type:"text",autocomplete:"off"},model:{value:e.userForm.username,callback:function(t){e.$set(e.userForm,"username",t)},expression:"userForm.username"}})],1),a("el-form-item",{attrs:{label:"密码",prop:"password"}},[a("el-input",{attrs:{type:"password","show-password":"",autocomplete:"off"},model:{value:e.userForm.password,callback:function(t){e.$set(e.userForm,"password",t)},expression:"userForm.password"}})],1),a("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[a("el-input",{model:{value:e.userForm.phone,callback:function(t){e.$set(e.userForm,"phone",e._n(t))},expression:"userForm.phone"}},[a("template",{slot:"prepend"},[e._v("+86")])],2)],1),a("el-form-item",{attrs:{label:"用户类型",prop:"type"}},[a("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择"},model:{value:e.userForm.type,callback:function(t){e.$set(e.userForm,"type",t)},expression:"userForm.type"}},[a("el-option",{attrs:{label:"管理员",value:1}}),a("el-option",{attrs:{label:"普通用户",value:0}})],1)],1),a("el-form-item",{attrs:{label:"简述",prop:"introduce"}},[a("el-input",{attrs:{type:"textarea"},model:{value:e.userForm.introduce,callback:function(t){e.$set(e.userForm,"introduce",t)},expression:"userForm.introduce"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.handleClose}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.submit}},[e._v("确 定")])],1)],1)],1)},u=[],c={data:function(){return{userForm:{password:"",username:"",introduce:"",type:0,phone:""},visible:this.show}},props:{show:Boolean,isEdit:Boolean,editForm:{type:Object,default:function(){return{}}}},watch:{show:function(){this.visible=this.show},isEdit:function(e){e&&(this.userForm=Object(i["a"])({},this.editForm))}},methods:{closed:function(){this.userForm={},this.$emit("update:show",!1),this.$emit("update:isEdit",!1)},handleClose:function(e){this.$emit("update:show",!1)},submit:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,s,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=Object(i["a"])({},e.userForm),a.username){t.next=4;break}return e.$message({type:"error",message:"必须填写用户名!"}),t.abrupt("return");case 4:if(a.password){t.next=7;break}return e.$message({type:"error",message:"必须填写密码!"}),t.abrupt("return");case 7:if(a.phone&&(a.phone="86"+a.phone),!e.isEdit){t.next=14;break}return t.next=11,o["a"].editUser(e.editForm._id,a);case 11:t.t0=t.sent,t.next=17;break;case 14:return t.next=16,o["a"].register(a);case 16:t.t0=t.sent;case 17:s=t.t0,r=s.data,e.$message({type:0===r.code?"success":"error",message:r.message}),0===r.code&&e.$emit("add-success"),e.$emit("update:show",!1);case 22:case"end":return t.stop()}}),t)})))()}}},d=c,m=a("2877"),p=Object(m["a"])(d,l,u,!1,null,null,null),h=p.exports,f=a("1afd"),g={mixins:[f["a"]],components:{UserDialog:h},filters:{typeMeanFilter:function(e){var t=["普通用户","管理员"];return t[e]},typeFilter:function(e){var t=["info","success"];return t[e]}},data:function(){return{item:[],listLoading:!1,dialogShow:!1,isEdit:!1,editForm:{}}},mounted:function(){this.fetch()},methods:{handleEdit:function(){this.isEdit=!1,this.dialogShow=!0},edit:function(e){this.isEdit=!0,this.editForm=Object(i["a"])({},e),this.dialogShow=!0},fetch:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.listLoading=!0,t.next=3,o["a"].list({limit:e.limit,page:e.page});case 3:a=t.sent,s=a.data,0===s.code?(e.item=s.data.data,e.total=s.data.total,e.$message({type:"success",message:s.message})):e.$message({type:"error",message:"获取列表失败!"}),e.listLoading=!1;case 7:case"end":return t.stop()}}),t)})))()},handleDel:function(e){var t=this;this.$confirm("是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(n["a"])(regeneratorRuntime.mark((function a(){var s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,o["a"].delUser(e._id);case 2:s=a.sent,r=s.data,t.$message({type:0===r.code?"success":"error",message:r.message}),t.fetch();case 6:case"end":return a.stop()}}),a)}))))}}},b=g,w=(a("1246"),Object(m["a"])(b,s,r,!1,null,"0d77c85a",null));t["default"]=w.exports}}]);