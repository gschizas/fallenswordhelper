import{g as t,p as e,a2 as a,I as n,bs as s,d as i,D as o,O as c,ab as r,a0 as l,o as f,i as d,t as u,s as m,u as p,N as h,z as b,r as g,k as j,bt as N,e as v,f as C,X as L,m as S,au as y,a as w,ak as k,aN as $,L as M,T as x,c as T,bu as A,b as R,bg as E,w as H,bv as B}from"./calfSystem-d49dbbd3.js"
import"./numberIsNaN-1742f258.js"
import{p as D}from"./playerName-7c21a13e.js"
import"./toLowerCase-e686322a.js"
import{c as G}from"./createInput-1699d448.js"
import{a as I}from"./addCommas-ab251bb7.js"
import{l as V}from"./onlineDot-ccdd1fa5.js"
import{s as _}from"./setTipped-d04acae4.js"
import{b as O}from"./batch-3c533826.js"
import{c as P,a as U}from"./compressBio-b999954e.js"
import"./createLabel-f30a5e2d.js"
import{c as X}from"./currentGuildId-fb556ea3.js"
import"./intValue-2ed328c8.js"
import"./valueText-064e4f1c.js"
import{c as z,b as F,p as J,a as Q,g as Z}from"./levelHighlight-acdb4dd3.js"
import"./fshOpen-61afeb3b.js"
import{o as q}from"./openQuickBuffByName-b2ea945d.js"
import{d as K}from"./dataRows-9b520c39.js"
import{c as W}from"./createUl-679c9bc5.js"
import{s as Y,g as tt}from"./idb-a6d1a1ba.js"
import"./insertElementBefore-5eb6d41d.js"
import{i as et}from"./insertElementAfterBegin-cc62b549.js"
import"./isChecked-e319351c.js"
import{b as at}from"./simpleCheckbox-1fc6621f.js"
import{a as nt}from"./alpha-66ff978e.js"
import{c as st}from"./createTBody-6de354b5.js"
import{c as it}from"./createTable-86f16c48.js"
import"./isDate-f02c431c.js"
import"./padZ-004f73b4.js"
import{f as ot}from"./formatLocalDateTime-2be45d59.js"
import{u as ct,l as rt,v as lt,c as ft,m as dt,a as ut,g as mt}from"./indexConstants-872f0d21.js"
import{c as pt}from"./createBr-a87f6e7f.js"
import{c as ht}from"./createButton-27be9a2a.js"
import{c as bt}from"./createTextArea-7ff9cf84.js"
import{d as gt}from"./dialogMsg-c696a07c.js"
import{c as jt}from"./createStyle-83a7b946.js"
import{c as Nt}from"./createSpan-d12a564e.js"
import{h as vt}from"./hideElement-a25240d4.js"
import{t as Ct}from"./toggleVisibilty-fcc450db.js"
function Lt(t,e){const a=s.exec(e.dataset.tipped)
return V({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function St(){const s=t("b",e).find(a("Members"))
if(s){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
s.classList.add("tip-static"),_(`Active: ${e[0]}/${t.length}<br>Stamina: ${I(e[1])}`,s)}}function yt(){}let wt,kt,$t,Mt,xt,Tt,At,Rt,Et,Ht,Bt,Dt,Gt,It,Vt
function _t(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return wt&&t>=F&&t<=J}(a)?function(t){return kt&&t>=Q&&t<=Z}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function Ot(t){const{tipped:e}=t.dataset
s.exec(e)[1]<7&&_t(t,e)}function Pt(){Number(c("guild_id"))!==X()&&(wt||kt)&&(z(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(Ot))}function Ut(){wt=o("highlightPlayersNearMyLvl"),kt=o("highlightGvGPlayersNearMyLvl"),Pt(),o("enableHistoryCompressor")&&P(t(i,e).slice(-2,-1)[0].rows[0].cells[0])}function Xt(t){d(t.parentNode,' <span class="smallLink">[b]</span>')}function zt(t){"smallLink"===t.target.className&&q(t.target.previousElementSibling.text)}function Ft(){const t=r(`#pCC a[href^="${l}"]`)
O([5,3,t,0,Xt]),f(e,zt)}function Jt(t){return u({cmd:"guild",subcmd:"conflicts",page:t})}function Qt(t,e){b(e,t.insertCell(-1))}function Zt(t,e,a){const n=t.insertRow(t.rows.length-2)
Qt(n,e),Qt(n,a)}function qt(t,e){Zt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Kt(t,e,a){1===e&&function(t){Zt(t,`<a href="${g}conflicts">Active Conflicts</a>`,"Score")}(a),K(t.rows,7,0).forEach(m(qt,a))}function Wt(t,e){const a=p(e),n=h('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=h("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Kt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){Jt(t+1).then(m(e,a))}(s,Wt,t)}function Yt(t){const e=t.rows[6].cells[0].children[0]
e&&Jt(1).then(m(Wt,{node:e}))}function te(t){t.target.id===N&&L(N,!o(N))}function ee(t,e){return`${t}<option value="${e}">${e}</option>`}function ae(t){return k(t)?"#DEF":t.toLocaleString()}function ne(t,e,a){return e+"<tr>"+`<td>${ot(new Date(1e3*a[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ae(a[rt])}</td>`+`<td class="fshRight">${ae(a[lt])}</td>`+`<td class="fshRight">${ae(a[ft])}</td>`+`<td class="fshRight">${ae(a[dt])}</td>`+`<td class="fshRight">${Math.floor(a[ft]/a[dt]*100)}</td>`+`<td class="fshRight">${a[ut]}</td>`+`<td class="fshRight">${ae(a[mt])}</td></tr>`}function se(t,e){return function(t){return Mt&&"- All -"!==Mt&&Mt!==t}(e)?t:t+At[e].reduce(m(ne,e),"")}function ie(){At&&b(y(At).reduce(se,""),$t),xt.classList.remove("fshSpinner")}function oe(){xt.classList.add("fshSpinner"),w(3,ie)}function ce(t){Mt=t.target.value,oe()}function re(t){t&&(At=t,b(`<select name="member"><option value="- All -" selected>- All -</option>${y(t).sort(nt).reduce(ee,"")}</select>`,Tt),oe())}function le(){const t=S("th",{textContent:"Member"})
return Tt=j(),C(t,Tt),t}function fe(){const t=it({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
d(e,"<th>Date</th>")
const a=le()
C(e,a),d(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){$t=st(),C(t,$t)}(t),v(t,"change",ce),xt=j({className:"tgCont fshSpinner64"}),C(xt,t),xt}function de(t){Rt.value=t,Bt.classList.remove("fshSpinner")}function ue(){Rt.value='{"lastUpdate": 0, "members": {}}'}function me(t){gt("Update successful"),re(t.members)}function pe(){const t=$(Rt.value)
Y("fsh_guildActivity",t).then(m(me,t)).catch(gt)}function he(t,e){const a=ht({className:"custombutton",textContent:t})
return f(a,e),a}function be(){return Bt=j({id:"io",className:"fshSpinner64"}),Rt=bt(),Rt.setAttribute("autocapitalize","off"),Rt.setAttribute("autocomplete","off"),Rt.setAttribute("autocorrect","off"),Rt.setAttribute("spellcheck","false"),Et=he("Save",pe),Ht=he("Reset",ue),C(Bt,Rt),C(Bt,pt()),C(Bt,Et),C(Bt,Ht),Bt}function ge(){return!Gt.checked}function je(t){Gt.checked&&"Escape"===t.code&&(Gt.checked=!1)}function Ne(t){ge()&&(t.style.transform=null)}function ve(){x("guildTracker","updateRawData"),Dt&&function(t){t&&(Bt.classList.add("fshSpinner"),w(4,de,[t]))}(Dt)}function Ce(){const t=function(){const t=j({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Vt=G({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(Vt,"change",ve),C(t,Vt),t}(),e=W({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return C(t,e),A(e,t),t}function Le(){const t=Ce(),e=function(){const t=j({className:"fsh-dialog-content"})
return C(t,fe()),C(t,be()),t}()
C(t,e),v(Gt,"change",m(Ne,t)),C(It,t)}function Se(t){t&&(Dt=JSON.stringify(t),re(t.members))}function ye(){x("guildTracker","openDialog"),tt("fsh_guildActivity").then(Se),T.dialogIsClosed=ge,d(It,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Le()}function we(){!function(){const t=h("#pCC img.guild_openGuildStore"),e=t.parentNode,a=j({className:"fsh-tracker"}),n=j({innerHTML:at(N)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
v(n,"change",te),C(a,t),C(a,n),et(e,a)}(),Gt=G({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(Gt,"change",ye),It=j({className:"fsh-dialog"}),C(It,Gt),v(document.body,"keydown",je),C(document.body,It)}let ke,$e
function Me(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function xe(){$e?$e.disabled=!ke:function(){const t=R(i,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n(E,a).map(Me).join("\n")
$e=C(document.body,jt(s)).sheet}()}function Te(){ke=!ke,L("enableStamBars",ke),xe(),x("guildManage","StamBars")}function Ae(){!function(){const t=h("#pCC img.guild_openGuildStore").parentNode,e=C(t,j({className:"fshCenter",innerHTML:at("enableStamBars")}))
v(e,"change",Te)}(),ke=o("enableStamBars"),ke&&xe()}function Re(t,e,a){const n=function(t){return Nt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
C(t,function(t){const e=Nt({innerHTML:"[&nbsp;"})
return C(e,t),d(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&vt(e),f(n,Ct)}function Ee(t){Re(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function He(t){const e=t.rows[4].cells[1].children[0]
b(e.innerHTML.trim(),e),Re(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Be(t){Re(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function De(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
b(`[ <a href="${g}reliclist">Control</a> ]&nbsp;`,s)}function Ge(t){const e=R("li",t),a=e[e.length-1].parentNode
d(a,`<li><a href="${B}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ie(t,e){w(3,e,[t])}function Ve(t){H()||(o("detailedConflictInfo")&&w(3,Yt,[t]),w(4,we))}function _e(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ee,He,Be,De,Ge].forEach(m(Ie,t))}(t),w(3,Ft),Ve(t),Ae()}function Oe(){const t=h('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){w(3,U),w(3,Oe),w(3,yt),w(3,St),"manage"===T.subcmd&&_e(),"view"===T.subcmd&&Ut()}
//# sourceMappingURL=guild-76a32ed1.js.map
