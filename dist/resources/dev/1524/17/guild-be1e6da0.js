import{g as t,p as e,a2 as n,I as s,br as a,d as i,D as o,O as c,ab as r,a0 as l,o as f,i as u,t as d,s as m,u as p,N as h,z as b,r as g,k as j,bs as N,e as C,f as L,X as v,m as S,au as y,a as w,ak as k,aN as $,L as M,T as x,c as T,bt as A,b as R,bf as E,w as H,bu as B}from"./calfSystem-1c103624.js"
import"./numberIsNaN-40c4542d.js"
import{p as D}from"./playerName-191d9509.js"
import"./toLowerCase-9f60cfa4.js"
import{c as G}from"./createInput-7f1f4562.js"
import{a as I}from"./addCommas-708246cb.js"
import{l as V}from"./onlineDot-764e0ffe.js"
import{s as _}from"./setTipped-d80523c9.js"
import{b as O}from"./batch-5d6f84ee.js"
import{c as P,a as U}from"./compressBio-15e584c3.js"
import"./createLabel-da6d9667.js"
import{c as X}from"./currentGuildId-b6fa52f3.js"
import"./intValue-f5e62e5b.js"
import"./valueText-ef8b2cab.js"
import{c as z,b as F,p as J,a as Q,g as Z}from"./levelHighlight-4a16cb82.js"
import"./fshOpen-19720760.js"
import{o as q}from"./openQuickBuffByName-f6a38ccb.js"
import{d as K}from"./dataRows-ce6adc95.js"
import{c as W}from"./createUl-16e74031.js"
import{s as Y,g as tt}from"./idb-347cc2af.js"
import"./insertElementBefore-0e09c5df.js"
import{i as et}from"./insertElementAfterBegin-ed14bd7f.js"
import"./isChecked-acff895a.js"
import{b as nt}from"./simpleCheckbox-195e8c73.js"
import{a as st}from"./alpha-71a6f0bf.js"
import{c as at}from"./createTBody-063a5f27.js"
import{c as it}from"./createTable-930c2471.js"
import"./isDate-a4926894.js"
import"./padZ-717e9500.js"
import{f as ot}from"./formatLocalDateTime-8e22bac1.js"
import{u as ct,l as rt,v as lt,c as ft,m as ut,a as dt,g as mt}from"./indexConstants-7f0d8ce6.js"
import{c as pt}from"./createBr-bd78ed1c.js"
import{c as ht}from"./createButton-c8469336.js"
import{c as bt}from"./createTextArea-f085b552.js"
import{d as gt}from"./dialogMsg-d0fce5cd.js"
import{c as jt}from"./createStyle-40b3705c.js"
import{c as Nt}from"./createSpan-475e9683.js"
import{h as Ct}from"./hideElement-e9cdcfef.js"
import{t as Lt}from"./toggleVisibilty-f5573f4d.js"
function vt(t,e){const n=a.exec(e.dataset.tipped)
return V({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function St(){const a=t("b",e).find(n("Members"))
if(a){const t=s('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(vt,[0,0])}(t)
a.classList.add("tip-static"),_(`Active: ${e[0]}/${t.length}<br>Stamina: ${I(e[1])}`,a)}}function yt(){}let wt,kt,$t,Mt,xt,Tt,At,Rt,Et,Ht,Bt,Dt,Gt,It,Vt
function _t(t,e){const n=Number(/VL:.+?(\d+)/.exec(e)[1]),s=t.parentNode.parentNode
!function(t){return wt&&t>=F&&t<=J}(n)?function(t){return kt&&t>=Q&&t<=Z}(n)&&s.classList.add("lvlGvGHighlight"):s.classList.add("lvlHighlight")}function Ot(t){const{tipped:e}=t.dataset
a.exec(e)[1]<7&&_t(t,e)}function Pt(){Number(c("guild_id"))!==X()&&(wt||kt)&&(z(),s('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(Ot))}function Ut(){wt=o("highlightPlayersNearMyLvl"),kt=o("highlightGvGPlayersNearMyLvl"),Pt(),o("enableHistoryCompressor")&&P(t(i,e).slice(-2,-1)[0].rows[0].cells[0])}function Xt(t){u(t.parentNode,' <span class="smallLink">[b]</span>')}function zt(t){"smallLink"===t.target.className&&q(t.target.previousElementSibling.text)}function Ft(){const t=r(`#pCC a[href^="${l}"]`)
O([5,3,t,0,Xt]),f(e,zt)}function Jt(t){return d({cmd:"guild",subcmd:"conflicts",page:t})}function Qt(t,e){b(e,t.insertCell(-1))}function Zt(t,e,n){const s=t.insertRow(t.rows.length-2)
Qt(s,e),Qt(s,n)}function qt(t,e){Zt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Kt(t,e,n){1===e&&function(t){Zt(t,`<a href="${g}conflicts">Active Conflicts</a>`,"Score")}(n),K(t.rows,7,0).forEach(m(qt,n))}function Wt(t,e){const n=p(e),s=h('#pCC input[name="page"]',n)
if(!s)return
const a=Number(s.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(s)
!function(t,e,n){const s=h("#pCC > table > tbody > tr > td > table",t)
s&&s.rows.length>3&&Kt(s,e,n)}(n,a,t.node),i>a&&function(t,e,n){Jt(t+1).then(m(e,n))}(a,Wt,t)}function Yt(t){const e=t.rows[6].cells[0].children[0]
e&&Jt(1).then(m(Wt,{node:e}))}function te(t){t.target.id===N&&v(N,!o(N))}function ee(t,e){return`${t}<option value="${e}">${e}</option>`}function ne(t){return k(t)?"#DEF":t.toLocaleString()}function se(t,e,n){return e+"<tr>"+`<td>${ot(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ne(n[rt])}</td>`+`<td class="fshRight">${ne(n[lt])}</td>`+`<td class="fshRight">${ne(n[ft])}</td>`+`<td class="fshRight">${ne(n[ut])}</td>`+`<td class="fshRight">${Math.floor(n[ft]/n[ut]*100)}</td>`+`<td class="fshRight">${n[dt]}</td>`+`<td class="fshRight">${ne(n[mt])}</td></tr>`}function ae(t,e){return function(t){return Mt&&"- All -"!==Mt&&Mt!==t}(e)?t:t+At[e].reduce(m(se,e),"")}function ie(){At&&b(y(At).reduce(ae,""),$t),xt.classList.remove("fshSpinner")}function oe(){xt.classList.add("fshSpinner"),w(3,ie)}function ce(t){Mt=t.target.value,oe()}function re(t){t&&(At=t,b(`<select name="member"><option value="- All -" selected>- All -</option>${y(t).sort(st).reduce(ee,"")}</select>`,Tt),oe())}function le(){const t=S("th",{textContent:"Member"})
return Tt=j(),L(t,Tt),t}function fe(){const t=it({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
u(e,"<th>Date</th>")
const n=le()
L(e,n),u(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){$t=at(),L(t,$t)}(t),C(t,"change",ce),xt=j({className:"tgCont fshSpinner64"}),L(xt,t),xt}function ue(t){Rt.value=t,Bt.classList.remove("fshSpinner")}function de(){Rt.value='{"lastUpdate": 0, "members": {}}'}function me(t){gt("Update successful"),re(t.members)}function pe(){const t=$(Rt.value)
Y("fsh_guildActivity",t).then(m(me,t)).catch(gt)}function he(t,e){const n=ht({className:"custombutton",textContent:t})
return f(n,e),n}function be(){return Bt=j({id:"io",className:"fshSpinner64"}),Rt=bt(),Rt.setAttribute("autocapitalize","off"),Rt.setAttribute("autocomplete","off"),Rt.setAttribute("autocorrect","off"),Rt.setAttribute("spellcheck","false"),Et=he("Save",pe),Ht=he("Reset",de),L(Bt,Rt),L(Bt,pt()),L(Bt,Et),L(Bt,Ht),Bt}function ge(){return!Gt.checked}function je(t){Gt.checked&&"Escape"===t.code&&(Gt.checked=!1)}function Ne(t){ge()&&(t.style.transform=null)}function Ce(){x("guildTracker","updateRawData"),Dt&&function(t){t&&(Bt.classList.add("fshSpinner"),w(4,ue,[t]))}(Dt)}function Le(){const t=function(){const t=j({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Vt=G({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(Vt,"change",Ce),L(t,Vt),t}(),e=W({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return L(t,e),A(e,t),t}function ve(){const t=Le(),e=function(){const t=j({className:"fsh-dialog-content"})
return L(t,fe()),L(t,be()),t}()
L(t,e),C(Gt,"change",m(Ne,t)),L(It,t)}function Se(t){t&&(Dt=JSON.stringify(t),re(t.members))}function ye(){x("guildTracker","openDialog"),tt("fsh_guildActivity").then(Se),T.dialogIsClosed=ge,u(It,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),ve()}function we(){!function(){const t=h("#pCC img.guild_openGuildStore"),e=t.parentNode,n=j({className:"fsh-tracker"}),s=j({innerHTML:nt(N)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
C(s,"change",te),L(n,t),L(n,s),et(e,n)}(),Gt=G({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(Gt,"change",ye),It=j({className:"fsh-dialog"}),L(It,Gt),C(document.body,"keydown",je),L(document.body,It)}let ke,$e
function Me(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function xe(){$e?$e.disabled=!ke:function(){const t=R(i,e),n=t[t.length-1]
n.id="fshMemberList"
const a=s(E,n).map(Me).join("\n")
$e=L(document.body,jt(a)).sheet}()}function Te(){ke=!ke,v("enableStamBars",ke),xe(),x("guildManage","StamBars")}function Ae(){!function(){const t=h("#pCC img.guild_openGuildStore").parentNode,e=L(t,j({className:"fshCenter",innerHTML:nt("enableStamBars")}))
C(e,"change",Te)}(),ke=o("enableStamBars"),ke&&xe()}function Re(t,e,n){const s=function(t){return Nt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
L(t,function(t){const e=Nt({innerHTML:"[&nbsp;"})
return L(e,t),u(e,"&nbsp;]"),e}(s)),e.id=n,o(n)&&Ct(e),f(s,Lt)}function Ee(t){Re(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function He(t){const e=t.rows[4].cells[1].children[0]
b(e.innerHTML.trim(),e),Re(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Be(t){Re(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function De(e){const s=t("b",e).filter(n("Relics"))
if(1!==s.length)return
const a=s[0].parentNode.nextElementSibling.children[0]
b(`[ <a href="${g}reliclist">Control</a> ]&nbsp;`,a)}function Ge(t){const e=R("li",t),n=e[e.length-1].parentNode
u(n,`<li><a href="${B}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ie(t,e){w(3,e,[t])}function Ve(t){H()||(o("detailedConflictInfo")&&w(3,Yt,[t]),w(4,we))}function _e(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ee,He,Be,De,Ge].forEach(m(Ie,t))}(t),w(3,Ft),Ve(t),Ae()}function Oe(){const t=h('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){w(3,U),w(3,Oe),w(3,yt),w(3,St),"manage"===T.subcmd&&_e(),"view"===T.subcmd&&Ut()}
//# sourceMappingURL=guild-be1e6da0.js.map
