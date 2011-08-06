/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: Aug 5 21:19
*/
KISSY.add("tree/basenode",function(f,e,c,g,i){var b=e.all,l=i.ITEM_CLS,h=e.KeyCodes,k=c.create(g.ModelControl,[g.DecorateChild],{_keyNav:function(a){var d=true,j,m=this.get("children");switch(a.keyCode){case h.HOME:j=this.get("tree");break;case h.END:j=this.get("tree").getLastVisibleDescendant();break;case h.UP:j=this.getPreviousVisibleNode();break;case h.DOWN:j=this.getNextVisibleNode();break;case h.LEFT:if(this.get("expanded")&&m.length)this.set("expanded",false);else j=this.get("parent");break;
case h.RIGHT:if(m.length)this.get("expanded")?m[0].select():this.set("expanded",true);break;default:d=false}j&&j.select();return d},getLastVisibleDescendant:function(){var a=this.get("children");if(!this.get("expanded")||!a.length)return this;return a[a.length-1].getLastVisibleDescendant()},getNextVisibleNode:function(){var a=this.get("children"),d=this.get("parent");if(this.get("expanded")&&a.length)return a[0];for(a=this.next();d&&!a;){a=d.next();d=d.get("parent")}return a},getPreviousVisibleNode:function(){var a=
this.prev();return a=a?a.getLastVisibleDescendant():this.get("parent")},next:function(){var a=this.get("parent");if(!a)return null;a=a.get("children");var d=f.indexOf(this,a);if(d==a.length-1)return null;return a[d+1]},prev:function(){var a=this.get("parent");if(!a)return null;a=a.get("children");var d=f.indexOf(this,a);if(d===0)return null;return a[d-1]},select:function(){this.get("tree").set("selectedItem",this)},_performInternal:function(a){var d=b(a.target),j=this.get("tree"),m=this.get("view");
j.get("el")[0].focus();if(d.equals(m.get("expandIconEl")))a.type!="dblclick"&&this.set("expanded",!this.get("expanded"));else if(a.type=="dblclick")this.set("expanded",!this.get("expanded"));else{this.select();j.fire("click",{target:this})}},decorateChildrenInternal:function(a,d,j){this.addChild(new a({srcNode:d,tree:this.get("tree"),prefixCls:j}))},addChild:function(a){var d=this.get("tree");a.set("tree",d);a.set("depth",this.get("depth")+1);k.superclass.addChild.call(this,a);this._updateRecursive();
d._register(a);f.each(a.get("children"),function(j){d._register(j)})},_computeClass:function(a){this.get("view")._computeClass(this.get("children"),this.get("parent"),a)},_updateRecursive:function(){var a=this.get("children").length;this._computeClass("_updateRecursive");f.each(this.get("children"),function(d,j){d._computeClass("_updateRecursive_children");d.get("view").set("ariaPosInSet",j+1);d.get("view").set("ariaSize",a)})},removeChild:function(a){var d=this.get("tree");d._unregister(a);f.each(a.get("children"),
function(j){d._unregister(j)});k.superclass.removeChild.apply(this,f.makeArray(arguments));this._updateRecursive()},_uiSetExpanded:function(a){this._computeClass("expanded-"+a);var d=this.get("tree");a?d.fire("expand",{target:this}):d.fire("collapse",{target:this})},expandAll:function(){this.set("expanded",true);f.each(this.get("children"),function(a){a.set("expanded",true)})},collapseAll:function(){this.set("expanded",false);f.each(this.get("children"),function(a){a.set("expanded",false)})}},{DefaultRender:i,
ATTRS:{handleMouseEvents:{value:false},id:{getter:function(){var a=this.get("el").attr("id");a||this.get("el").attr("id",a=f.guid("tree-node"));return a}},content:{view:true},isLeaf:{view:true},expandIconEl:{view:true},iconEl:{view:true},selected:{view:true},expanded:{value:false,view:true},tooltip:{view:true},tree:{},depth:{value:0,view:true},focusable:{value:false},decorateChildCls:{value:"tree-children"}},HTML_PARSER:{expanded:function(a){a=a.one("."+this.getCls("tree-children"));if(!a)return false;
return a.css("display")!="none"}}});g.UIStore.setUIByClass(l,{priority:10,ui:k});return k},{requires:["node","uibase","component","./basenoderender"]});
KISSY.add("tree/basenoderender",function(f,e,c,g){var i=e.all;return c.create(g.Render,{renderUI:function(){this.get("el").addClass(this.getCls("tree-item"))},_computeClass:function(b,l){var h=this.get("expanded"),k=this.get("isLeaf"),a=this.get("iconEl"),d=this.get("expandIconEl"),j=this.get("childrenEl"),m="inline-block tree-icon tree-expand-icon ",n=this.getCls("inline-block tree-icon tree-file-icon "),p=this.getCls(["inline-block tree-icon",h?"tree-expanded-folder-icon":"tree-collapsed-folder-icon",
""].join(" ")),o=!l||l.get("children")[l.get("children").length-1].get("view")==this;if(k===false||k===undefined&&b.length){a.attr("class",p);m+=h?"tree-expand-icon-{t}minus":"tree-expand-icon-{t}plus";d.attr("class",this.getCls(f.substitute(m,{t:o?"l":"t"})))}else{a.attr("class",n);d.attr("class",this.getCls(f.substitute(m+"tree-expand-icon-{t}",{t:o?"l":"t"})))}j&&j.attr("class",this.getCls(o?"tree-lchildren":"tree-children"))},createDom:function(){var b=this.get("el"),l,h,k=this.get("labelEl");
h=i("<div class='"+this.getCls("tree-row")+"'/>");l=f.guid("tree-item");this.set("rowEl",h);var a=i("<div/>").appendTo(h),d=i("<div />").appendTo(h);if(!k){k=i("<span id='"+l+"' class='"+this.getCls("tree-item-label")+"'/>");this.set("labelEl",k)}k.appendTo(h);b.attr({role:"treeitem","aria-labelledby":l}).prepend(h);this.set("expandIconEl",a);this.set("iconEl",d)},_uiSetExpanded:function(b){var l=this.get("childrenEl");if(l)if(b)b&&l.show();else l.hide();this.get("el").attr("aria-expanded",b)},_uiSetContent:function(b){this.get("labelEl").html(b)},
_uiSetDepth:function(b){this.get("el").attr("aria-level",b)},_uiSetAriaSize:function(b){this.get("el").attr("aria-setsize",b)},_uiSetAriaPosInSet:function(b){this.get("el").attr("aria-posinset",b)},_uiSetSelected:function(b){this.get("rowEl")[b?"addClass":"removeClass"](this.getCls("tree-item-selected"))},_uiSetTooltip:function(b){this.get("el").attr("title",b)},getContentElement:function(){if(this.get("childrenEl"))return this.get("childrenEl");var b=i("<div "+(this.get("expanded")?"":"style='display:none'")+
" role='group'></div>").appendTo(this.get("el"));this.set("childrenEl",b);return b}},{ATTRS:{ariaSize:{},ariaPosInSet:{},childrenEl:{},expandIconEl:{},tooltip:{},iconEl:{},rowEl:{},selected:{},expanded:{},depth:{},labelEl:{},content:{},isLeaf:{}},HTML_PARSER:{childrenEl:function(b){return b.children("."+this.getCls("tree-children"))},labelEl:function(b){return b.children("."+this.getCls("tree-item-label"))},content:function(b){return b.children("."+this.getCls("tree-item-label")).html()},isLeaf:function(b){if(b.hasClass(this.getCls("tree-item-leaf")))return true;
if(b.hasClass(this.getCls("tree-item-folder")))return false}},ITEM_CLS:"tree-item"})},{requires:["node","uibase","component"]});
KISSY.add("tree/checknode",function(f,e,c,g,i,b){var l=e.all;e=c.create(i,{_performInternal:function(h){this.get("tree").get("el")[0].focus();var k=l(h.target),a=this.get("view");this.get("tree");if(h.type=="dblclick"){if(k.equals(a.get("expandIconEl")))return;if(k.equals(a.get("checkEl")))return;this.set("expanded",!this.get("expanded"))}if(k.equals(a.get("expandIconEl")))this.set("expanded",!this.get("expanded"));else{h=this.get("checkState");h=h==1?0:1;this.set("checkState",h)}},_uiSetCheckState:function(h){if(h==
1||h==0)f.each(this.get("children"),function(n){n.set("checkState",h)});var k=this.get("parent");if(k){for(var a=0,d=k.get("children"),j=0;j<d.length;j++){var m=d[j].get("checkState");if(m==2){k.set("checkState",2);return}else m==1&&a++}if(a==d.length)k.set("checkState",1);else a===0?k.set("checkState",0):k.set("checkState",2)}}},{ATTRS:{checkState:{view:true,value:0}},CHECK_CLS:"tree-item-checked",DefaultRender:b,PARTIAL_CHECK:2,CHECK:1,EMPTY:0});g.UIStore.setUIByClass("tree-item-checked",{priority:20,
ui:e});return e},{requires:["node","uibase","component","./basenode","./checknoderender"]});
KISSY.add("tree/checknoderender",function(f,e,c,g,i){var b=e.all;return c.create(i,{renderUI:function(){this.get("el").addClass(this.getCls("tree-item-checked"))},createDom:function(){var l=this.get("expandIconEl");this.set("checkEl",b("<div class='"+this.getCls("inline-block  tree-icon")+"'/>").insertAfter(l))},_uiSetCheckState:function(l){this.get("checkEl").removeClass(this.getCls("tree-item-checked0 tree-item-checked1 tree-item-checked2")).addClass(this.getCls("tree-item-checked"+l))}},{ATTRS:{checkEl:{},
checkState:{}},CHECK_CLS:"tree-item-checked"})},{requires:["node","uibase","component","./basenoderender"]});KISSY.add("tree/checktree",function(f,e,c,g,i,b){f=i.CHECKED_TREE_CLS;e=e.create(g,[b,c.DelegateChildren],{},{DefaultRender:i});c.UIStore.setUIByClass(f,{priority:40,ui:e});return e},{requires:["uibase","component","./checknode","./checktreerender","./treemgr"]});
KISSY.add("tree/checktreerender",function(f,e,c,g,i){return e.create(g,[i],{renderUI:function(){this.get("el").addClass(this.getCls("tree-root-checked"))}},{CHECKED_TREE_CLS:"tree-root-checked"})},{requires:["uibase","component","./checknoderender","./treemgrrender"]});KISSY.add("tree/tree",function(f,e,c,g,i,b){f=i.TREE_CLS;e=e.create(g,[b,c.DelegateChildren],{},{DefaultRender:i});c.UIStore.setUIByClass(f,{priority:30,ui:e});return e},{requires:["uibase","component","./basenode","./treerender","./treemgr"]});
KISSY.add("tree/treemgr",function(f){function e(){}e.ATTRS={showRootNode:{view:true},selectedItem:{},tree:{valueFn:function(){return this}},focusable:{value:true}};f.augment(e,{__getAllNodes:function(){if(!this._allNodes)this._allNodes={};return this._allNodes},__renderUI:function(){this.get("children").length||this._computeClass("root_renderUI")},_register:function(c){this.__getAllNodes()[c.get("id")]=c},_unregister:function(c){delete this.__getAllNodes()[c.get("id")]},_handleKeyEventInternal:function(c){var g=
this.get("selectedItem");if(c.keyCode==13)return g._performInternal(c);return g._keyNav(c)},getOwnerControl:function(c){for(var g,i=this.get("el")[0];c&&c!==i;){if(g=this.__getAllNodes()[c.id])return g;c=c.parentNode}return this},_uiSetSelectedItem:function(c,g){g.prevVal&&g.prevVal.set("selected",false);c.set("selected",true)},_uiSetFocused:function(c){if(c)this.get("selectedItem")||this.select()}});return e});
KISSY.add("tree/treemgrrender",function(f){function e(){}e.ATTRS={showRootNode:{}};f.augment(e,{__renderUI:function(){this.get("el").addClass(this.getCls("tree-root")).attr("role","tree")[0].hideFocus=true;this.get("rowEl").addClass(this.getCls("tree-root-row"))},_uiSetShowRootNode:function(c){this.get("rowEl")[c?"show":"hide"]()},_uiSetFocused:function(c){this.get("el")[c?"addClass":"removeClass"](this.getCls("tree-item-focused"))}});return e});
KISSY.add("tree/treerender",function(f,e,c,g,i){return e.create(g,[i],{},{TREE_CLS:"tree-root"})},{requires:["uibase","component","./basenoderender","./treemgrrender"]});KISSY.add("tree",function(f,e,c,g,i){e.Node=c;e.CheckNode=g;e.CheckTree=i;return e},{requires:["tree/tree","tree/basenode","tree/checknode","tree/checktree"]});