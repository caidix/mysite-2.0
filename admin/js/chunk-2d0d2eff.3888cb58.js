(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d2eff"],{"5b40":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("content-component",[a("edit-component",{attrs:{slot:"header",datas:e.datas},on:{submit:e.fetchData},slot:"header"}),a("list-component",{directives:[{name:"loading",rawName:"v-loading",value:e.isLoading,expression:"isLoading"}],attrs:{configs:e.tagConfig,datas:e.datas,border:""}},[a("el-table-column",{attrs:{fixed:"right",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("edit-component",{attrs:{isEdit:"",datas:e.datas,editId:n.id,data:n},on:{submit:e.fetchData}}),a("el-button",{attrs:{slot:"reference",type:"danger",size:"small"},on:{click:function(t){return e.delCategory(n)}},slot:"reference"},[e._v("删除")])]}}])})],1),a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[a("el-pagination",{attrs:{"current-page":e.page,"page-size":e.limit,"page-sizes":[5,10,30,50],layout:"total, prev, sizes, pager, next, jumper",total:e.total},on:{"size-change":e.handleLimitChange,"current-change":e.handlePageChange}})],1)],1)},s=[],r=a("5530"),i=(a("96cf"),a("1da1")),o=a("751a"),c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return o["a"].request({method:"get",url:"/applet/classic/create",params:e,config:t})},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return o["a"].request({method:"get",url:"/applet/classic/update",params:e,config:t})},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return o["a"].request({method:"get",url:"/applet/classic/query",params:e,config:t})},p={createClassic:c,queryClassic:l,updateClassic:u},d=a("5c96"),m=a("94a1"),g=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("edit-component",e._b({attrs:{isResetParams:"",data:e.data,configs:e.editConfig,btnText:e.setTitle},on:{submit:e.submit}},"edit-component",e.$attrs,!1))},f=[],b=(a("a9e3"),a("93b6")),h=a("b572"),v=new h["a"]({prop:"id",label:"ID",width:"100"}),w=new h["a"]({prop:"message",label:"信息",type:"input",required:!0}),y=new h["a"]({prop:"content",label:"主要内容",width:"300",type:"textarea"}),C=new h["a"]({prop:"isShow",label:"是否展示",type:"select",required:!0,enums:[{label:"是",value:!0},{label:"否",value:!1}]}),j=new h["a"]({prop:"likes",label:"喜欢人数"}),x=new h["a"]({prop:"createTime",label:"创建时间"}),O=new h["a"]({prop:"background",label:"背景",type:"upload",isImage:!0}),k=new h["a"]({prop:"isMusic",label:"是否音链",type:"select",enums:[{label:"是",value:!0},{label:"否",value:!1}]}),q=new h["a"]({prop:"music",label:"上传音乐",type:"uploadMusic"}),E=new h["b"]([v,w,y,C,j,O,k,x]).clone(),R=new h["b"]([C,w,y,O,k,q]).clone(),M={components:{EditComponent:b["a"]},props:{data:{type:Object},isEdit:{type:Boolean,default:!1},editId:{type:[Number,String]},datas:{type:Array,default:function(){return[]}}},computed:{defaultValue:function(){return!0},setData:function(){return!1},editConfig:function(){return R.getFields()},setTitle:function(){return this.isEdit?"编辑":"新建分类"}},methods:{submit:function(e){this.isEdit?this.updateClassic(e):this.createClassic(e)},createClassic:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,p.createClassic(Object(r["a"])({},e.params));case 2:n=a.sent,s=n.data,0===s.code?(Object(d["Message"])({message:s.message||"添加成功",type:"success"}),t.$emit("submit")):Object(d["Message"])({message:s.message||"添加失败",type:"error"}),e.callback();case 6:case"end":return a.stop()}}),a)})))()},updateClassic:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n,s,i;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=Object(r["a"])({},e.params,{id:t.editId}),a.next=3,p.updateClassic(n);case 3:s=a.sent,i=s.data,0===i.code?(Object(d["Message"])({message:i.message||"修改成功",type:"success"}),t.$emit("submit")):Object(d["Message"])({message:i.message||"修改失败",type:"error"}),e.callback();case 7:case"end":return a.stop()}}),a)})))()}}},D=M,_=a("2877"),I=Object(_["a"])(D,g,f,!1,null,null,null),$=I.exports,z=a("f54e"),L=a("1afd"),S={mixins:[L["a"]],components:{ContentComponent:m["a"],EditComponent:$,ListComponent:z["a"]},props:{id:{}},data:function(){return{configs:[{prop:"name",label:"标签名称",type:"input",required:!0},{prop:"desc",label:"分类描述",type:"input",required:!0}],tagConfig:E.getFields()}},mounted:function(){this.fetchData()},methods:{getDatas:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={limit:e.limit,page:e.page},t.next=3,p.queryClassic(a);case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})))()},handleEdit:function(e){this.editItem=Object(r["a"])({},e),this.showDialog=!0},delCategory:function(e){var t=this;this.$confirm("确认删除该分类吗？").then(Object(i["a"])(regeneratorRuntime.mark((function a(){var n,s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,p.delCategory({id:e.id});case 2:n=a.sent,s=n.data,0===s.code?(Object(d["Message"])({message:s.message||"删除成功",type:"success"}),t.getList()):Object(d["Message"])({message:s.message||"删除失败",type:"error"});case 5:case"end":return a.stop()}}),a)})))).catch((function(){}))}}},T=S,F=Object(_["a"])(T,n,s,!1,null,"b79e82ec",null);t["default"]=F.exports}}]);