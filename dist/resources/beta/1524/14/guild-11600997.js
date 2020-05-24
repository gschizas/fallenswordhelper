import{g as t,p as e,bm as a,M as n,aa as s,bK as i,d as c,F as o,W as r,b2 as l,aw as u,a8 as d,o as f,i as m,aq as h,v as p,u as b,w as g,Q as v,B as L,s as N,k as S,e as y,f as C,l as k,a3 as w,q as $,au as j,a as M,bL as T,bM as A,bN as x,bO as R,bP as H,bQ as G,bR as E,al as B,aS as D,ai as I,P as _,$ as P,ag as V,c as U,bS as q,b as F,S as O,m as Q,y as X,bT as z,ab as J}from"./calfSystem-371c414c.js"
import"./numberIsNaN-987e3021.js"
import"./toLowerCase-08111a24.js"
import{c as K}from"./createInput-d378f9d2.js"
import{l as W}from"./onlineDot-b47e695a.js"
import{s as Y}from"./setTipped-a7231de6.js"
import{b as Z}from"./batch-96f40a5d.js"
import{c as tt,a as et}from"./compressBio-ca6fc476.js"
import"./createLabel-146da34f.js"
import{c as at,b as nt,p as st,a as it,g as ct}from"./levelHighlight-cee6b23a.js"
import{d as ot}from"./dataRows-e367647c.js"
import{c as rt}from"./createUl-49043902.js"
import"./isChecked-b460a43d.js"
import{b as lt}from"./simpleCheckbox-5ce6e544.js"
import{a as ut}from"./alpha-9e71f7c7.js"
import{c as dt}from"./createTBody-51b8edc4.js"
import{c as ft}from"./createTable-ad174066.js"
import"./isDate-a362329c.js"
import{f as mt}from"./formatLocalDateTime-1836d05e.js"
import{c as ht,t as pt}from"./toggleVisibilty-6ab598a5.js"
import{c as bt}from"./createButton-957980b2.js"
import{c as gt}from"./createTextArea-6ed77f95.js"
import{d as vt}from"./dialogMsg-33712041.js"
import{c as Lt}from"./createStyle-6a1c39f6.js"
function Nt(t,e){const a=i.exec(e.dataset.tipped)
return W({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function St(){const i=t("b",e).find(a("Members"))
if(i){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Nt,[0,0])}(t)
i.classList.add("tip-static"),Y(`Active: ${e[0]}/${t.length}<br>Stamina: ${s(e[1])}`,i)}}let yt,Ct,kt,wt,$t,jt,Mt,Tt,At,xt,Rt,Ht,Gt,Et,Bt
function Dt(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return yt&&t>=nt&&t<=st}(a)?function(t){return Ct&&t>=it&&t<=ct}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function It(t){const{tipped:e}=t.dataset
i.exec(e)[1]<7&&Dt(t,e)}function _t(){Number(r("guild_id"))!==l()&&(yt||Ct)&&(at(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(It))}function Pt(){yt=o("highlightPlayersNearMyLvl"),Ct=o("highlightGvGPlayersNearMyLvl"),_t(),o("enableHistoryCompressor")&&tt(t(c,e).slice(-2,-1)[0].rows[0].cells[0])}function Vt(t){m(t.parentNode,' <span class="smallLink">[b]</span>')}function Ut(t){"smallLink"===t.target.className&&h(t.target.previousElementSibling.text)}function qt(){const t=u(`#pCC a[href^="${d}"]`)
Z([5,3,t,0,Vt]),f(e,Ut)}function Ft(t){return p({cmd:"guild",subcmd:"conflicts",page:t})}function Ot(t,e){L(e,t.insertCell(-1))}function Qt(t,e,a){const n=t.insertRow(t.rows.length-2)
Ot(n,e),Ot(n,a)}function Xt(t,e){Qt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function zt(t,e,a){1===e&&function(t){Qt(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(a),ot(t.rows,7,0).forEach(b(Xt,a))}function Jt(t,e){const a=g(e),n=v('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=v("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&zt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){Ft(t+1).then(b(e,a))}(s,Jt,t)}function Kt(t){const e=t.rows[6].cells[0].children[0]
e&&Ft(1).then(b(Jt,{node:e}))}function Wt(t){"enableGuildActivityTracker"===t.target.id&&w("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Yt(t,e){return`${t}<option value="${e}">${e}</option>`}function Zt(t){return B(t)?"#DEF":t.toLocaleString()}function te(t,e,a){return e+"<tr>"+`<td>${mt(new Date(1e3*a[T]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${Zt(a[A])}</td>`+`<td class="fshRight">${Zt(a[x])}</td>`+`<td class="fshRight">${Zt(a[R])}</td>`+`<td class="fshRight">${Zt(a[H])}</td>`+`<td class="fshRight">${Math.floor(a[R]/a[H]*100)}</td>`+`<td class="fshRight">${a[G]}</td>`+`<td class="fshRight">${Zt(a[E])}</td></tr>`}function ee(t,e){return function(t){return wt&&"- All -"!==wt&&wt!==t}(e)?t:t+Mt[e].reduce(b(te,e),"")}function ae(){Mt&&L(j(Mt).reduce(ee,""),kt),$t.classList.remove("fshSpinner")}function ne(){$t.classList.add("fshSpinner"),M(3,ae)}function se(t){wt=t.target.value,ne()}function ie(t){t&&(Mt=t,L(`<select name="member"><option value="- All -" selected>- All -</option>${j(t).sort(ut).reduce(Yt,"")}</select>`,jt),ne())}function ce(){const t=$("th",{textContent:"Member"})
return jt=S(),C(t,jt),t}function oe(){const t=ft({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
m(e,"<th>Date</th>")
const a=ce()
C(e,a),m(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){kt=dt(),C(t,kt)}(t),y(t,"change",se),$t=S({className:"tgCont fshSpinner64"}),C($t,t),$t}function re(t){Tt.value=t,Rt.classList.remove("fshSpinner")}function le(){Tt.value='{"lastUpdate": 0, "members": {}}'}function ue(t){vt("Update successful"),ie(t.members)}function de(){const t=D(Tt.value)
I("fsh_guildActivity",t).then(b(ue,t)).catch(vt)}function fe(t,e){const a=bt({className:"custombutton",textContent:t})
return f(a,e),a}function me(){return Rt=S({id:"io",className:"fshSpinner64"}),Tt=gt(),Tt.setAttribute("autocapitalize","off"),Tt.setAttribute("autocomplete","off"),Tt.setAttribute("autocorrect","off"),Tt.setAttribute("spellcheck","false"),At=fe("Save",de),xt=fe("Reset",le),C(Rt,Tt),C(Rt,ht()),C(Rt,At),C(Rt,xt),Rt}function he(){return!Gt.checked}function pe(t){Gt.checked&&"Escape"===t.code&&(Gt.checked=!1)}function be(t){he()&&(t.style.transform=null)}function ge(){P("guildTracker","updateRawData"),Ht&&function(t){t&&(Rt.classList.add("fshSpinner"),M(4,re,[t]))}(Ht)}function ve(){const t=function(){const t=S({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Bt=K({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),_(Bt,"change",ge),C(t,Bt),t}(),e=rt({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return C(t,e),q(e,t),t}function Le(){const t=ve(),e=function(){const t=S({className:"fsh-dialog-content"})
return C(t,oe()),C(t,me()),t}()
C(t,e),y(Gt,"change",b(be,t)),C(Et,t)}function Ne(t){t&&(Ht=JSON.stringify(t),ie(t.members))}function Se(){P("guildTracker","openDialog"),V("fsh_guildActivity").then(Ne),U.dialogIsClosed=he,m(Et,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Le()}function ye(){!function(){const t=v("#pCC img.guild_openGuildStore"),e=t.parentNode,a=S({className:"fsh-tracker"}),n=S({innerHTML:lt("enableGuildActivityTracker")+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
y(n,"change",Wt),C(a,t),C(a,n),k(e,a)}(),Gt=K({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),_(Gt,"change",Se),Et=S({className:"fsh-dialog"}),C(Et,Gt),y(document.body,"keydown",pe),C(document.body,Et)}let Ce,ke
function we(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function $e(){ke?ke.disabled=!Ce:function(){const t=F(c,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map(we).join("\n")
ke=C(document.body,Lt(s)).sheet}()}function je(){Ce=!Ce,w("enableStamBars",Ce),$e(),P("guildManage","StamBars")}function Me(){!function(){const t=v("#pCC img.guild_openGuildStore").parentNode,e=C(t,S({className:"fshCenter",innerHTML:lt("enableStamBars")}))
y(e,"change",je)}(),Ce=o("enableStamBars"),Ce&&$e()}function Te(t,e,a){const n=function(t){return O({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
C(t,function(t){const e=O({innerHTML:"[&nbsp;"})
return C(e,t),m(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&Q(e),f(n,pt)}function Ae(t){Te(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function xe(t){const e=t.rows[4].cells[1].children[0]
L(e.innerHTML.trim(),e),Te(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Re(t){Te(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function He(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
L(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function Ge(t){const e=F("li",t),a=e[e.length-1].parentNode
m(a,`<li><a href="${z}${J()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ee(t,e){M(3,e,[t])}function Be(t){X()||(o("detailedConflictInfo")&&M(3,Kt,[t]),M(4,ye))}function De(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ae,xe,Re,He,Ge].forEach(b(Ee,t))}(t),M(3,qt),Be(t),Me()}function Ie(){const t=v('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){M(3,et),M(3,Ie),M(3,St),"manage"===U.subcmd&&De(),"view"===U.subcmd&&Pt()}
//# sourceMappingURL=guild-11600997.js.map
