import{g as t,p as e,aP as a,I as n,bC as s,d as i,D as o,N as c,ak as r,$ as l,o as f,i as d,t as u,s as m,u as p,M as h,z as b,r as g,k as j,e as v,f as N,W as C,m as L,aj as y,a as S,bD as k,bE as w,bF as $,bG as T,bH as M,bI as A,bJ as x,a9 as E,aG as G,a7 as H,K as R,S as B,a5 as D,c as I,bK as _,b as V,w as P,bL as U}from"./calfSystem-ee582533.js"
import"./numberIsNaN-c9f76e43.js"
import{p as z}from"./playerName-e40f24e0.js"
import"./toLowerCase-6383ba3b.js"
import{c as F}from"./createInput-2410e798.js"
import{a as J}from"./addCommas-f872a1dc.js"
import{l as K}from"./onlineDot-6ce6d139.js"
import{s as O}from"./setTipped-a858a4c4.js"
import{b as X}from"./batch-59d43fba.js"
import{c as Q,a as W}from"./compressBio-e624b8a1.js"
import"./createLabel-96cdd0a5.js"
import{c as Z}from"./currentGuildId-0564d9a0.js"
import"./intValue-a842cf8a.js"
import"./valueText-a2e47d93.js"
import{c as q,b as Y,p as tt,a as et,g as at}from"./levelHighlight-f61a008a.js"
import"./fshOpen-f1f6c477.js"
import{o as nt}from"./openQuickBuffByName-60dde0f6.js"
import{d as st}from"./dataRows-b7cf82e5.js"
import{c as it}from"./createUl-25b39286.js"
import"./insertElementBefore-7ed837be.js"
import{i as ot}from"./insertElementAfterBegin-115e10be.js"
import"./isChecked-21b2756d.js"
import{b as ct}from"./simpleCheckbox-eb1aed29.js"
import{a as rt}from"./alpha-df6d1f94.js"
import{c as lt}from"./createTBody-aa153e3a.js"
import{c as ft}from"./createTable-cbb3667c.js"
import"./isDate-f3df3fd8.js"
import"./padZ-55be60ec.js"
import{f as dt}from"./formatLocalDateTime-1bf9bcb1.js"
import{c as ut}from"./createBr-7e2936bd.js"
import{c as mt}from"./createButton-6e7396b9.js"
import{c as pt}from"./createTextArea-1f364dcc.js"
import{d as ht}from"./dialogMsg-b9afb04d.js"
import{c as bt}from"./createStyle-9229c8ac.js"
import{c as gt}from"./createSpan-63b97269.js"
import{h as jt}from"./hideElement-faecef36.js"
import{t as vt}from"./toggleVisibilty-e1460b10.js"
function Nt(t,e){const a=s.exec(e.dataset.tipped)
return K({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function Ct(){const s=t("b",e).find(a("Members"))
if(s){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Nt,[0,0])}(t)
s.classList.add("tip-static"),O(`Active: ${e[0]}/${t.length}<br>Stamina: ${J(e[1])}`,s)}}function Lt(){}let yt,St,kt,wt,$t,Tt,Mt,At,xt,Et,Gt,Ht,Rt,Bt,Dt
function It(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return yt&&t>=Y&&t<=tt}(a)?function(t){return St&&t>=et&&t<=at}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function _t(t){const{tipped:e}=t.dataset
s.exec(e)[1]<7&&It(t,e)}function Vt(){Number(c("guild_id"))!==Z()&&(yt||St)&&(q(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(_t))}function Pt(){yt=o("highlightPlayersNearMyLvl"),St=o("highlightGvGPlayersNearMyLvl"),Vt(),o("enableHistoryCompressor")&&Q(t(i,e).slice(-2,-1)[0].rows[0].cells[0])}function Ut(t){d(t.parentNode,' <span class="smallLink">[b]</span>')}function zt(t){"smallLink"===t.target.className&&nt(t.target.previousElementSibling.text)}function Ft(){const t=r(`#pCC a[href^="${l}"]`)
X([5,3,t,0,Ut]),f(e,zt)}function Jt(t){return u({cmd:"guild",subcmd:"conflicts",page:t})}function Kt(t,e){b(e,t.insertCell(-1))}function Ot(t,e,a){const n=t.insertRow(t.rows.length-2)
Kt(n,e),Kt(n,a)}function Xt(t,e){Ot(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Qt(t,e,a){1===e&&function(t){Ot(t,`<a href="${g}conflicts">Active Conflicts</a>`,"Score")}(a),st(t.rows,7,0).forEach(m(Xt,a))}function Wt(t,e){const a=p(e),n=h('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=h("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Qt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){Jt(t+1).then(m(e,a))}(s,Wt,t)}function Zt(t){const e=t.rows[6].cells[0].children[0]
e&&Jt(1).then(m(Wt,{node:e}))}function qt(t){"enableGuildActivityTracker"===t.target.id&&C("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Yt(t,e){return`${t}<option value="${e}">${e}</option>`}function te(t){return E(t)?"#DEF":t.toLocaleString()}function ee(t,e,a){return e+"<tr>"+`<td>${dt(new Date(1e3*a[k]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${te(a[w])}</td>`+`<td class="fshRight">${te(a[$])}</td>`+`<td class="fshRight">${te(a[T])}</td>`+`<td class="fshRight">${te(a[M])}</td>`+`<td class="fshRight">${Math.floor(a[T]/a[M]*100)}</td>`+`<td class="fshRight">${a[A]}</td>`+`<td class="fshRight">${te(a[x])}</td></tr>`}function ae(t,e){return function(t){return wt&&"- All -"!==wt&&wt!==t}(e)?t:t+Mt[e].reduce(m(ee,e),"")}function ne(){Mt&&b(y(Mt).reduce(ae,""),kt),$t.classList.remove("fshSpinner")}function se(){$t.classList.add("fshSpinner"),S(3,ne)}function ie(t){wt=t.target.value,se()}function oe(t){t&&(Mt=t,b(`<select name="member"><option value="- All -" selected>- All -</option>${y(t).sort(rt).reduce(Yt,"")}</select>`,Tt),se())}function ce(){const t=L("th",{textContent:"Member"})
return Tt=j(),N(t,Tt),t}function re(){const t=ft({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
d(e,"<th>Date</th>")
const a=ce()
N(e,a),d(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){kt=lt(),N(t,kt)}(t),v(t,"change",ie),$t=j({className:"tgCont fshSpinner64"}),N($t,t),$t}function le(t){At.value=t,Gt.classList.remove("fshSpinner")}function fe(){At.value='{"lastUpdate": 0, "members": {}}'}function de(t){ht("Update successful"),oe(t.members)}function ue(){const t=G(At.value)
H("fsh_guildActivity",t).then(m(de,t)).catch(ht)}function me(t,e){const a=mt({className:"custombutton",textContent:t})
return f(a,e),a}function pe(){return Gt=j({id:"io",className:"fshSpinner64"}),At=pt(),At.setAttribute("autocapitalize","off"),At.setAttribute("autocomplete","off"),At.setAttribute("autocorrect","off"),At.setAttribute("spellcheck","false"),xt=me("Save",ue),Et=me("Reset",fe),N(Gt,At),N(Gt,ut()),N(Gt,xt),N(Gt,Et),Gt}function he(){return!Rt.checked}function be(t){Rt.checked&&"Escape"===t.code&&(Rt.checked=!1)}function ge(t){he()&&(t.style.transform=null)}function je(){B("guildTracker","updateRawData"),Ht&&function(t){t&&(Gt.classList.add("fshSpinner"),S(4,le,[t]))}(Ht)}function ve(){const t=function(){const t=j({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Dt=F({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),R(Dt,"change",je),N(t,Dt),t}(),e=it({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return N(t,e),_(e,t),t}function Ne(){const t=ve(),e=function(){const t=j({className:"fsh-dialog-content"})
return N(t,re()),N(t,pe()),t}()
N(t,e),v(Rt,"change",m(ge,t)),N(Bt,t)}function Ce(t){t&&(Ht=JSON.stringify(t),oe(t.members))}function Le(){B("guildTracker","openDialog"),D("fsh_guildActivity").then(Ce),I.dialogIsClosed=he,d(Bt,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Ne()}function ye(){!function(){const t=h("#pCC img.guild_openGuildStore"),e=t.parentNode,a=j({className:"fsh-tracker"}),n=j({innerHTML:ct("enableGuildActivityTracker")+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
v(n,"change",qt),N(a,t),N(a,n),ot(e,a)}(),Rt=F({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),R(Rt,"change",Le),Bt=j({className:"fsh-dialog"}),N(Bt,Rt),v(document.body,"keydown",be),N(document.body,Bt)}let Se,ke
function we(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function $e(){ke?ke.disabled=!Se:function(){const t=V(i,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map(we).join("\n")
ke=N(document.body,bt(s)).sheet}()}function Te(){Se=!Se,C("enableStamBars",Se),$e(),B("guildManage","StamBars")}function Me(){!function(){const t=h("#pCC img.guild_openGuildStore").parentNode,e=N(t,j({className:"fshCenter",innerHTML:ct("enableStamBars")}))
v(e,"change",Te)}(),Se=o("enableStamBars"),Se&&$e()}function Ae(t,e,a){const n=function(t){return gt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
N(t,function(t){const e=gt({innerHTML:"[&nbsp;"})
return N(e,t),d(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&jt(e),f(n,vt)}function xe(t){Ae(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ee(t){const e=t.rows[4].cells[1].children[0]
b(e.innerHTML.trim(),e),Ae(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Ge(t){Ae(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function He(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
b(`[ <a href="${g}reliclist">Control</a> ]&nbsp;`,s)}function Re(t){const e=V("li",t),a=e[e.length-1].parentNode
d(a,`<li><a href="${U}${z()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Be(t,e){S(3,e,[t])}function De(t){P()||(o("detailedConflictInfo")&&S(3,Zt,[t]),S(4,ye))}function Ie(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[xe,Ee,Ge,He,Re].forEach(m(Be,t))}(t),S(3,Ft),De(t),Me()}function _e(){const t=h('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){S(3,W),S(3,_e),S(3,Lt),S(3,Ct),"manage"===I.subcmd&&Ie(),"view"===I.subcmd&&Pt()}
//# sourceMappingURL=guild-373101e6.js.map
