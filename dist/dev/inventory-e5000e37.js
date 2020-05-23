import{aL as t,e,R as n,v as i,ab as s,bD as a,bE as r,q as d,aa as c,aS as o,G as l,bn as f,h as u,p,ak as h,N as m,at as b,aI as y,bF as v,C as g,I as k,z as _,br as x,ai as I,a as R,bh as L,bi as M,aX as E}from"./calfSystem-70b0df7f.js"
import"./numberIsNaN-888b325e.js"
import{c as S}from"./createTable-1e93d178.js"
import"./dialogMsg-0ef0d146.js"
import"./all-d4a4126a.js"
import{a as D}from"./allthen-82910129.js"
import{e as T}from"./errorDialog-d60de5ef.js"
import{d as j}from"./dialog-e74653d6.js"
import{e as N,u as w}from"./useItem-5f15dee3.js"
import{a as A}from"./ajaxReturnCode-a4018309.js"
import"./daUseItem-4f1f4b3f.js"
import"./senditems-a7f53a0b.js"
import{d as G,a as q}from"./dropItem-f8a9d0a4.js"
import"./guildStore-997fb26d.js"
import{g as P}from"./getInventory-58a12092.js"
import{l as C,p as U}from"./lvlTests-5da07455.js"
import{l as O}from"./loadDataTables-26792ea2.js"
import{d as F}from"./daLoadInventory-c0d24dca.js"
import{c as W}from"./changeMinMax-7b8b065f.js"
import{i as B}from"./isSelected-a73fc347.js"
import{g as V}from"./getMembrList-e5ee3d0f.js"
import{g as H}from"./guildInventory-d8e8ef53.js"
import{q as Q,a as Y}from"./queue-537d9622.js"
import{n as z}from"./notLastUpdate-60d93b6f.js"
function X(){return t({subcmd:"fetchinv"})}function J(){return H({subcmd2:"report"})}let K,Z=[]
function tt(t){K=t}const et=t=>15===t.t
function nt(t){n(t.r)&&(Z=Array.prototype.concat.apply([],t.r.map(t=>t.items)).filter(et))}function it(t){n(t.r)&&(Z=Z.concat(t.r.filter(et)))}function st(t,e){return e.a===t}function at(t){if(15===t.type){const e=Z.find(i(st,t.inv_id))
e&&(t.item_name=e.n)}}function rt(){K.items.forEach(at)}function dt(){const t=[P().then(tt)]
return"invmanagernew"===e.subcmd&&t.push(F().then(nt)),"guildinvmgr"===e.subcmd&&(t.push(X().then(it)),t.push(J().then(it))),D(t,rt)}function ct(t,e){e.val(""),$(t).DataTable().search("").draw()}function ot(){K.folders&&(K.folders[-1]="Main")}const lt={checkedElements:{0:1,1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,100:1,101:1,102:1,103:1,104:1,105:1,106:1},fshMinLvl:1,fshMaxLvl:9999},ft='<table class="fshInvFilter"><tr><th colspan="14">@@reportTitle@@</th><th><span id="fshRefresh" class="fshLink">[Refresh]</span></th></tr><tr><td colspan="2" rowspan="3"><b>&nbsp;Show Items:</b></td><td class="fshRight">&nbsp;Helmet:</td><td><input id="fshHelmet" type="checkbox" item="0"/></td><td class="fshRight">&nbsp;Armor:</td><td><input id="fshArmor" type="checkbox" item="1"/></td><td class="fshRight">&nbsp;Gloves:</td><td><input id="fshGloves" type="checkbox" item="2"/></td><td class="fshRight">&nbsp;Boots:</td><td><input id="fshBoots" type="checkbox" item="3"/></td><td class="fshRight">&nbsp;Weapon:</td><td><input id="fshWeapon" type="checkbox" item="4"/></td><td></td><td class="fshRight">&nbsp;Min lvl:</td><td><input id="fshMinLvl" size="5" value="1"/></td></tr><tr><td class="fshRight">&nbsp;Shield:</td><td><input id="fshShield" type="checkbox" item="5"/></td><td class="fshRight">&nbsp;Ring:</td><td><input id="fshRing" type="checkbox" item="6"/></td><td class="fshRight">&nbsp;Amulet:</td><td><input id="fshAmulet" type="checkbox" item="7"/></td><td class="fshRight">&nbsp;Rune:</td><td><input id="fshRune" type="checkbox" item="8"/></td><td class="fshRight">&nbsp;Sets Only:</td><td><input id="fshSets" item="-1" type="checkbox"/></td><td></td><td class="fshRight">&nbsp;Max lvl:</td><td><input id="fshMaxLvl" size="5" value="9999"/></td></tr><tr><td colspan="2">&nbsp;[<span id="fshAll" class="fshLink">Select All</span>]</td><td colspan="2">&nbsp;[<span id="fshNone" class="fshLink">Select None</span>]</td><td colspan="2">&nbsp;[<span id="fshDefault" class="fshLink">Defaults</span>]</td><td colspan="6"></td><td><input id="fshReset" type="button" value="Reset"/></td></tr><tr><td class="fshRight">&nbsp;Quest Item:</td><td><input id="fshQuest" item="9" type="checkbox"/></td><td class="fshRight">&nbsp;Potion:</td><td><input id="fshPotion" item="10" type="checkbox"/></td><td class="fshRight">&nbsp;Resource:</td><td><input id="fshResource" item="12" type="checkbox"/></td><td class="fshRight">&nbsp;Recipe:</td><td><input id="fshRecipe" item="13" type="checkbox"/></td><td class="fshRight">&nbsp;Container:</td><td><input id="fshContainer" item="14" type="checkbox"/></td><td class="fshRight">&nbsp;Frag Stash:</td><td><input id="fshStash" item="16" type="checkbox"/></td><td class="fshRight">&nbsp;Composed:</td><td><input id="fshComposed" item="15" type="checkbox"/></td><td></td></tr><tr><td class="fshRight">&nbsp;Common:</td><td><input id="fshCommon" item="100" type="checkbox" checked/></td><td class="fshRight">&nbsp;Rare:</td><td><input id="fshRare" item="101" type="checkbox" checked/></td><td class="fshRight">&nbsp;Unique:</td><td><input id="fshUnique" item="102" type="checkbox" checked/></td><td class="fshRight">&nbsp;Legendary:</td><td><input id="fshLegendary" item="103" type="checkbox" checked/></td><td class="fshRight">&nbsp;Super Elite:</td><td><input id="fshSuperElite" item="104" type="checkbox" checked/></td><td class="fshRight">&nbsp;Crystalline:</td><td><input id="fshCrystalline" item="105" type="checkbox" checked/></td><td class="fshRight">&nbsp;Epic:</td><td colspan="2"><input id="fshEpic" item="106" type="checkbox" checked/></td></tr></table>',ut={0:1,1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1,9:1,10:1,11:1,12:1,13:1,14:1,15:1,16:1,100:1,101:1,102:1,103:1,104:1,105:1,106:1},pt={Perfect:{abbr:"Perf",colour:"#00b600",index:8},Excellent:{abbr:"Exc",colour:"#f6ed00",index:7},"Very Good":{abbr:"VG",colour:"#f67a00",index:6},Good:{abbr:"Good",colour:"#f65d00",index:5},Average:{abbr:"Ave",colour:"#f64500",index:4},Poor:{abbr:"Poor",colour:"#f61d00",index:3},"Very Poor":{abbr:"VPr",colour:"#b21500",index:2},Uncrafted:{abbr:"Unc",colour:"#666666",index:1}}
function ht(t){return pt[t]?pt[t].abbr:""}function mt(t,e){const n=function(t){return t.folder_id?function(t){return t.equipped?"fshGreen":"fshNavy"}(t):function(t){return-1===t.player_id?"fshNavy":"fshMaroon"}(t)}(e)
t.classList.add(n)}function bt(t){return function(t){return t.player_id&&-1!==t.player_id}(t)||function(t){return t.folder_id&&-1!==t.guild_tag}(t)}function yt(t){return`<span class="fshLink recallItem" invid="${t.inv_id}" playerid="${s(t.player_id,K.player_id)}" mode="1" action="recall">GS</span>`}function vt(t){return`<span class="fshLink storeItem" invid="${t.inv_id}">GS</span>`}function gt(t,e,n){return"display"===t?n(e):"GS"}function kt(t,e){const n=function(t){return-1===t.player_id?4:bt(t)?7:1}(e),i=function(t,e,n){return t||(-1!==e?e:n)}(K.player_id,e.player_id,K.guild_id)
let s=t
e.equipped&&(s=`<b>${t}</b>`)
let d=""
return function(t){return t.stats&&""!==t.stats.set_name}(e)&&(d=` (<span class="fshLink setName" set="${e.stats.set_name}">set</span>)`),`<a href="${a}${t}" class="fshInvItem tip-dynamic ${r[e.rarity].clas}" `+`data-tipped="fetchitem.php?item_id=${e.item_id}&inv_id=${e.inv_id}&t=${n}&p=${i}">${s}</a>${d}`}const _t=[[t=>t.player_id&&-1===t.player_id,(t,e)=>`takeItem" action="${e.a}`],[t=>t.player_id&&t.player_id!==K.current_player_id,(t,e)=>`recallItem" playerid="${t.player_id}" mode="0" action="${e.a}`],[t=>function(t){return t.folder_id&&!t.equipped}(t)||function(t){return t.player_id&&!t.equipped&&t.player_id===K.current_player_id}(t),(t,e)=>e.c]]
function $t(t,e){const n=_t.find(e=>e[0](t))
return n?`<span class="fshLink ${n[1](t,e)}" invid="${t.inv_id}">${e.b}</span>`:""}function xt(t){return s(t.folder_id,t.player_id)}function It(t){return e.membrList[t]?e.membrList[t].username:"???"}function Rt(t,e){return t[0]-e[0]}function Lt(t,e){return`<option value="${e[0]}"${B(Number(e[0]),t)}>${e[1]}</option>`}let Mt,Et,St
function Dt(t){Mt=o({},lt),o(Mt,s(t,{})),Et=l("showQuickDropLinks"),St=l("showQuickSendLinks")}const Tt=[{title:"Name",data:"item_name",render:function(t,e,n){return"display"!==e?t:kt(t,n)}},{title:"Level",data:"stats.min_level"},{title:"Where",data:xt,render:{_:function(t,e,n){return n.folder_id?function(t){return t.equipped?-2:t.folder_id}(n):-1===n.player_id?"~":It(n.player_id)},display:function(t,e,n){return n.player_id?function(t){return-1===t.player_id?"Guild Store":`<a class="fshMaroon" href="${c}${t.player_id}">${It(t.player_id)}</a>`}(n):n.equipped?"Worn":`<select class="fshMoveItem" data-inv="${n.inv_id}">${s=n.folder_id,a=K.folders,d(a).sort(Rt).map(i(Lt,s)).join("")}</select>`
var s,a},filter:function(t,e,n){return n.player_id?function(t){return-1===t.player_id?"Guild Store":It(t.player_id)}(n):n.equipped?"Worn":K.folders[n.folder_id]}}},{title:"Type",data:"type",render:t=>f[t]},{title:"Att",data:"stats.attack"},{title:"Def",data:"stats.defense"},{title:"Arm",data:"stats.armor"},{title:"Dam",data:"stats.damage"},{title:"HP",data:"stats.hp"},{title:"Frg",data:"forge",render:function(t,e,n){if(n.type<9)return n.forge}},{title:"Craft",data:"craft",render:{_:t=>pt[t]?pt[t].index:0,display:ht,filter:ht}},{title:"Du%",data:"durability",render:function(t,e,n){if(n.type<9&&n.max_durability>0)return Math.ceil(n.durability/n.max_durability*100)}},{title:"BP",data:xt,render:function(t,e,n){if(!n.folder_id&&n.player_id!==K.current_player_id)return function(t,e){return"display"!==t?"BP":-1===e.player_id?`<span class="fshLink takeItem" invid="${e.inv_id}" action="take">BP</span>`:`<span class="fshLink recallItem" invid="${e.inv_id}" playerid="${e.player_id}" mode="0" action="recall">BP</span>`}(e,n)}},{title:"GS",data:xt,render:function(t,e,n){return bt(n)?gt(e,n,yt):function(t){return t.folder_id&&!t.bound}(n)?gt(e,n,vt):void 0}},{title:"W/U",data:"type",render:function(t,e,n){const i=[1,1,1,1,1,1,1,1,1,,2,2,,,,2][t]
return 1===i?$t(n,{a:"wear",b:"Wear",c:"wearItem"}):2===i?$t(n,{a:"use",b:"Use",c:"useItem"}):void 0}},{title:"setName",data:"stats.set_name",orderable:!1,visible:!1},{title:"Tag",data:"guild_tag",render:t=>-1===t?"No":"Yes"},{title:"Drop",data:"type",render:function(t,e,n){if(!function(t){return-1!==t.guild_tag||t.equipped}(n))return"display"!==e?"Drop":'<span class="dropItem tip-static dropLink" data-tipped="INSTANTLY '+`DESTROY THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk." data-inv="${n.inv_id}">Drop</span>`}},{title:"Send",data:"type",render:function(t,e,n){if(!function(t){return t.equipped||-1===t.guild_tag&&t.bound}(n))return"display"!==e?"Send":'<span class="sendItem tip-static sendLink" data-tipped="INSTANTLY SEND THE ITEM. NO REFUNDS OR DO-OVERS! '+`Use at own risk." data-inv="${n.inv_id}">Send</span>`}}]
function jt(){return"player_id"in K}function Nt(){const t=function(){const t=S({className:"hover fshXSmall",id:jt()?"fshUserInv":"fshGuildInv"})
return u(p,t),t}()
return function(t){t.column(12).visible("current_player_id"in K),t.column(17).visible(jt()&&Et),t.column(18).visible(jt()&&St)}(function(t){return $(t).DataTable({autoWidth:!1,columnDefs:[{targets:"_all",defaultContent:""},{targets:[1,4,5,6,7,8,9,10,12,13],orderSequence:["desc","asc"]}],columns:Tt,createdRow:mt,data:K.items,deferRender:!0,lengthMenu:[[50,100,150,200,-1],[50,100,150,200,"All"]],pageLength:50,stateDuration:0,stateSave:!0})}(t)),t}function wt(t){h(`fsh_${e.subcmd}`,t)}function At(){m('table.fshInvFilter input[type="checkbox"]').forEach(t=>{t.checked=1===Mt.checkedElements[t.getAttribute("item")]}),wt(Mt)}function Gt(t){Mt.checkedElements=ut,At(),$(t).DataTable().draw(!1)}function qt(t,e){Mt.fshMinLvl=t,Mt.fshMaxLvl=e,wt(Mt)}function Pt(t){$(t).DataTable().draw(!1)}function Ct(t){W(qt,i(Pt,t))}function Ut(t){return Number(t[0])>=100}function Ot(t,e){return t[e[0]]=e[1],t}function Ft(t){var e
Mt.checkedElements=(e=Mt.checkedElements,d(e).filter(Ut).reduce(Ot,{})),At(),$(t).DataTable().draw()}function Wt(t,e){t.eq(e).empty()}function Bt(t,e){if(1===e.r)return
const n=t.closest("tr")
!function(t){[2,12,13,14,15,16].forEach(i(Wt,t))}($("td",n)),n.css("text-decoration","line-through")}function Vt(t,e){b(e),function(t){t.closest("tr").find(".takeItem, .recallItem, .wearItem, .dropItem, .sendItem, .storeItem").removeClass()}(e),t().then(i(Bt,e)),function(t){t.empty().append(`<img src="${y}ui/misc/spinner.gif" width="11" height="11">`)}(e)}function Ht(t){Mt.checkedElements={},m('table.fshInvFilter input[type="checkbox"][item]:checked').forEach(t=>{Mt.checkedElements[t.getAttribute("item")]=1}),wt(Mt),$(t).DataTable().draw(!1)}function Qt(t){Mt.checkedElements=lt.checkedElements,At(),$(t).DataTable().draw(!1)}function Yt(t){Mt.fshMinLvl=lt.fshMinLvl,Mt.fshMaxLvl=lt.fshMaxLvl,wt(Mt),$("#fshMinLvl").val(Mt.fshMinLvl),$("#fshMaxLvl").val(Mt.fshMaxLvl),$(t).DataTable().draw(!1)}function zt(t){return function(t){return H({subcmd2:"dostoreitems",storeIndex:t})}(t)}function Xt(t){return zt(t).then(T).then(A)}function Jt(t,e){$(t).DataTable().search($(e.target).attr("set")).draw(),$(`#${t.id}_filter input`).trigger("focus")}function Kt(t){const e=$(t.target)
Vt(i(Q,e.attr("invid"),e.attr("action")),e)}function Zt(t){const e=$(t.target)
Vt(i(Y,e.attr("invid"),e.attr("playerid"),e.attr("mode"),e.attr("action")),e)}function te(t){const e=$(t.target)
Vt(i(N,e.attr("invid")),e)}function ee(t){const e=$(t.target)
Vt(i(w,e.attr("invid")),e)}function ne(t){const e=$(t.target)
var n,i
n=[e.data("inv")],i=e.val(),v({cmd:"profile",subcmd:"sendtofolder",inv_list:JSON.stringify(n),folder_id:i,ajax:1}).then(j)}function ie(t){const e=$(t.target)
Vt(i(Xt,[e.attr("invid")]),e)}function se(t){const e=$(t.target)
Vt(i(G,[e.data("inv")]),e)}function ae(t){const e=$(t.target)
Vt(i(q,[e.data("inv")]),e)}function re(t,e){$(e[0]).on("click",i(e[1],t))}function de(t,e){$(t).on("click",`span.${e[0]}`,e[1])}function ce(t){!function(t){[["#fshReset",Yt],["#fshAll",Gt],["#fshNone",Ft],["#fshDefault",Qt]].forEach(i(re,t))}(t),$("table.fshInvFilter").on("click",'input[type="checkbox"]',i(Ht,t)),function(t){[["setName",i(Jt,t)],["takeItem",Kt],["recallItem",Zt],["wearItem",te],["useItem",ee],["dropItem",se],["sendItem",ae],["storeItem",ie]].forEach(i(de,t))}(t)}function oe(){let t
t=K.player_id?`<b>&nbsp;Inventory Manager</b> ${K.items.length} items (green = worn, blue = backpack)`:`<b>&nbsp;Guild Inventory Manager</b> ${K.items.length} items (maroon = in BP, blue=guild store)`,g(ft.replace("@@reportTitle@@",t),p)}function le(){$("#fshMinLvl").val(Mt.fshMinLvl),$("#fshMaxLvl").val(Mt.fshMaxLvl)}let fe
function ue(t,e){return C(fe,k(e[1]),Mt.fshMinLvl,Mt.fshMaxLvl)}function pe(){fe=[t=>0===t].concat(U),$.fn.dataTable.ext.search.push(ue)}function he(){$.fn.dataTable.ext.search.push((t,e,n,i)=>!Mt.checkedElements||Mt.checkedElements[i.type])}function me(){$.fn.dataTable.ext.search.push((t,e,n,i)=>!Mt.checkedElements||!Mt.checkedElements[-1]||function(t){return Mt.checkedElements[-1]&&t.stats&&-1!==t.stats.set_id}(i))}function be(){$.fn.dataTable.ext.search.push((t,e,n,i)=>{const s=(parseInt(i.rarity,10)+100).toString()
return!Mt.checkedElements||Mt.checkedElements[s]})}function ye(t,e){return t[e[1].id]=e[1],t}function ve(){e.membrList=d(e.membrList).filter(z).reduce(ye,{})}function ge(){E([ot,pe,he,me,be,oe,At,le])
const t=Nt()
!function(t){$("#fshMinLvl, #fshMaxLvl").on("keyup",i(Ct,t)),$(t).on("change","select.fshMoveItem",ne),ce(t)}(t),$("#fshRefresh").on("click",$e),function(t){const e=$(`#${t.id}_filter input`)
e.prop("type","text")
const n=$("<span>&times;</span>")
e.wrap($('<span class="text-input-wrapper"/>')),e.after(n),n.on("click",i(ct,t,e))}(t)}function ke(){L("inventory.getInvMan"),ge(),M("inventory.getInvMan")}function _e(){R(3,ke)}function $e(){_()||(g(`<span id="fshInvMan"><img src = "${x}">&nbsp;Getting inventory data...</span>`,p),function(){const t=[O(),dt()]
"guildinvmgr"===e.subcmd&&t.push(V(!1).then(ve)),t.push(I(`fsh_${e.subcmd}`).then(Dt)),D(t,_e)}())}export default $e
//# sourceMappingURL=inventory-e5000e37.js.map
