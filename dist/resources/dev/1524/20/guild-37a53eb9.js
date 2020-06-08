import{g as t,p as e,a4 as n,D as a,bs as s,d as i,l as o,A as c,f as r,G as l,Q as f,ab as u,a2 as d,o as m,i as p,u as h,t as b,v as g,C as j,s as N,bt as v,e as C,Z as L,n as S,au as y,a as w,ak as k,aN as $,O as M,V as x,c as T,bu as A,b as H,E,x as R,bv as B}from"./calfSystem-a2862afc.js"
import"./numberIsNaN-77d06981.js"
import{p as D}from"./playerName-72c7301a.js"
import"./toLowerCase-2574a84c.js"
import{c as G}from"./createInput-457456bb.js"
import{a as I}from"./addCommas-f02ec3aa.js"
import{l as V}from"./onlineDot-003f5d07.js"
import{s as _}from"./setTipped-4f77e47d.js"
import{b as O}from"./batch-1aa805d3.js"
import{c as P}from"./colouredDots-0f189e6b.js"
import"./createLabel-0e59a017.js"
import"./insertElementBefore-372e5ad6.js"
import U from"./compressBio-368a3474.js"
import{c as Q}from"./currentGuildId-e84c528e.js"
import"./intValue-8b673ab3.js"
import"./valueText-0b6b2a96.js"
import{c as X,b as Z,p as z,a as F,g as J}from"./levelHighlight-1bce539f.js"
import"./fshOpen-a1ebd7c1.js"
import{o as q}from"./openQuickBuffByName-808f9233.js"
import{d as K}from"./dataRows-b327254e.js"
import{c as W}from"./createUl-1aaeeb73.js"
import{s as Y,g as tt}from"./idb-911ff7c2.js"
import{i as et}from"./insertElementAfterBegin-195a0721.js"
import"./isChecked-e0d689b2.js"
import{b as nt}from"./simpleCheckbox-c8f3914c.js"
import{a as at}from"./alpha-557396ad.js"
import{c as st}from"./createTBody-9b48ed82.js"
import{c as it}from"./createTable-6dbc7d62.js"
import"./isDate-4c8ac6ee.js"
import"./padZ-c3ec0e2d.js"
import{f as ot}from"./formatLocalDateTime-8559d2c3.js"
import{u as ct,l as rt,v as lt,c as ft,m as ut,a as dt,g as mt}from"./indexConstants-3e970228.js"
import{c as pt}from"./createBr-8f382fb1.js"
import{c as ht}from"./createButton-62b6c44a.js"
import{c as bt}from"./createTextArea-176b0835.js"
import{d as gt}from"./dialogMsg-98e801f7.js"
import{c as jt}from"./createStyle-571bf4ff.js"
import{c as Nt}from"./createSpan-b8f0a31d.js"
import{h as vt}from"./hideElement-66d2f02e.js"
import{t as Ct}from"./toggleVisibilty-abe9046b.js"
function Lt(t,e){const n=s.exec(e.dataset.tipped)
return V({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function St(){const s=t("b",e).find(n("Members"))
if(s){const t=a('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
s.classList.add("tip-static"),_(`Active: ${e[0]}/${t.length}<br>Stamina: ${I(e[1])}`,s)}}function yt(){}let wt,kt,$t,Mt,xt,Tt,At,Ht,Et,Rt,Bt,Dt,Gt,It,Vt
function _t(t,e){const n=Number(/VL:.+?(\d+)/.exec(e)[1]),a=t.parentNode.parentNode
!function(t){return wt&&t>=Z&&t<=z}(n)?function(t){return kt&&t>=F&&t<=J}(n)&&a.classList.add("lvlGvGHighlight"):a.classList.add("lvlHighlight")}function Ot(t){const{tipped:e}=t.dataset
s.exec(e)[1]<7&&_t(t,e)}function Pt(){Number(f("guild_id"))!==Q()&&(wt||kt)&&(X(),a('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(Ot))}function Ut(){wt=l("highlightPlayersNearMyLvl"),kt=l("highlightGvGPlayersNearMyLvl"),Pt(),l("enableHistoryCompressor")&&function(){const n=t(i,e).slice(-2,-1)[0].rows[0].cells[0],a=o({id:"profile-bio",innerHTML:n.innerHTML})
c("",n),r(n,a),U()}()}function Qt(t){p(t.parentNode,' <span class="smallLink">[b]</span>')}function Xt(t){"smallLink"===t.target.className&&q(t.target.previousElementSibling.text)}function Zt(){const t=u(`#pCC a[href^="${d}"]`)
O([5,3,t,0,Qt]),m(e,Xt)}function zt(t){return h({cmd:"guild",subcmd:"conflicts",page:t})}function Ft(t,e){c(e,t.insertCell(-1))}function Jt(t,e,n){const a=t.insertRow(t.rows.length-2)
Ft(a,e),Ft(a,n)}function qt(t,e){Jt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Kt(t,e,n){1===e&&function(t){Jt(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(n),K(t.rows,7,0).forEach(b(qt,n))}function Wt(t,e){const n=g(e),a=j('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=j("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Kt(a,e,n)}(n,s,t.node),i>s&&function(t,e,n){zt(t+1).then(b(e,n))}(s,Wt,t)}function Yt(t){const e=t.rows[6].cells[0].children[0]
e&&zt(1).then(b(Wt,{node:e}))}function te(t){t.target.id===v&&L(v,!l(v))}function ee(t,e){return`${t}<option value="${e}">${e}</option>`}function ne(t){return k(t)?"#DEF":t.toLocaleString()}function ae(t,e,n){return e+"<tr>"+`<td>${ot(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ne(n[rt])}</td>`+`<td class="fshRight">${ne(n[lt])}</td>`+`<td class="fshRight">${ne(n[ft])}</td>`+`<td class="fshRight">${ne(n[ut])}</td>`+`<td class="fshRight">${Math.floor(n[ft]/n[ut]*100)}</td>`+`<td class="fshRight">${n[dt]}</td>`+`<td class="fshRight">${ne(n[mt])}</td></tr>`}function se(t,e){return function(t){return Mt&&"- All -"!==Mt&&Mt!==t}(e)?t:t+At[e].reduce(b(ae,e),"")}function ie(){At&&c(y(At).reduce(se,""),$t),xt.classList.remove("fshSpinner")}function oe(){xt.classList.add("fshSpinner"),w(3,ie)}function ce(t){Mt=t.target.value,oe()}function re(t){t&&(At=t,c(`<select name="member"><option value="- All -" selected>- All -</option>${y(t).sort(at).reduce(ee,"")}</select>`,Tt),oe())}function le(){const t=S("th",{textContent:"Member"})
return Tt=o(),r(t,Tt),t}function fe(){const t=it({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
p(e,"<th>Date</th>")
const n=le()
r(e,n),p(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){$t=st(),r(t,$t)}(t),C(t,"change",ce),xt=o({className:"tgCont fshSpinner64"}),r(xt,t),xt}function ue(t){Ht.value=t,Bt.classList.remove("fshSpinner")}function de(){Ht.value='{"lastUpdate": 0, "members": {}}'}function me(t){gt("Update successful"),re(t.members)}function pe(){const t=$(Ht.value)
Y("fsh_guildActivity",t).then(b(me,t)).catch(gt)}function he(t,e){const n=ht({className:"custombutton",textContent:t})
return m(n,e),n}function be(){return Bt=o({id:"io",className:"fshSpinner64"}),Ht=bt(),Ht.setAttribute("autocapitalize","off"),Ht.setAttribute("autocomplete","off"),Ht.setAttribute("autocorrect","off"),Ht.setAttribute("spellcheck","false"),Et=he("Save",pe),Rt=he("Reset",de),r(Bt,Ht),r(Bt,pt()),r(Bt,Et),r(Bt,Rt),Bt}function ge(){return!Gt.checked}function je(t){Gt.checked&&"Escape"===t.code&&(Gt.checked=!1)}function Ne(t){ge()&&(t.style.transform=null)}function ve(){x("guildTracker","updateRawData"),Dt&&function(t){t&&(Bt.classList.add("fshSpinner"),w(4,ue,[t]))}(Dt)}function Ce(){const t=function(){const t=o({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Vt=G({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(Vt,"change",ve),r(t,Vt),t}(),e=W({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return r(t,e),A(e,t),t}function Le(){const t=Ce(),e=function(){const t=o({className:"fsh-dialog-content"})
return r(t,fe()),r(t,be()),t}()
r(t,e),C(Gt,"change",b(Ne,t)),r(It,t)}function Se(t){t&&(Dt=JSON.stringify(t),re(t.members))}function ye(){x("guildTracker","openDialog"),tt("fsh_guildActivity").then(Se),T.dialogIsClosed=ge,p(It,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Le()}function we(){!function(){const t=j("#pCC img.guild_openGuildStore"),e=t.parentNode,n=o({className:"fsh-tracker"}),a=o({innerHTML:nt(v)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
C(a,"change",te),r(n,t),r(n,a),et(e,n)}(),Gt=G({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(Gt,"change",ye),It=o({className:"fsh-dialog"}),r(It,Gt),C(document.body,"keydown",je),r(document.body,It)}let ke,$e
function Me(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function xe(){$e?$e.disabled=!ke:function(){const t=H(i,e),n=t[t.length-1]
n.id="fshMemberList"
const s=a(E,n).map(Me).join("\n")
$e=r(document.body,jt(s)).sheet}()}function Te(){ke=!ke,L("enableStamBars",ke),xe(),x("guildManage","StamBars")}function Ae(){!function(){const t=j("#pCC img.guild_openGuildStore").parentNode,e=r(t,o({className:"fshCenter",innerHTML:nt("enableStamBars")}))
C(e,"change",Te)}(),ke=l("enableStamBars"),ke&&xe()}function He(t,e,n){const a=function(t){return Nt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
r(t,function(t){const e=Nt({innerHTML:"[&nbsp;"})
return r(e,t),p(e,"&nbsp;]"),e}(a)),e.id=n,l(n)&&vt(e),m(a,Ct)}function Ee(t){He(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Re(t){const e=t.rows[4].cells[1].children[0]
c(e.innerHTML.trim(),e),He(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Be(t){He(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function De(e){const a=t("b",e).filter(n("Relics"))
if(1!==a.length)return
const s=a[0].parentNode.nextElementSibling.children[0]
c(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function Ge(t){const e=H("li",t),n=e[e.length-1].parentNode
p(n,`<li><a href="${B}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ie(t,e){w(3,e,[t])}function Ve(t){R()||(l("detailedConflictInfo")&&w(3,Yt,[t]),w(4,we))}function _e(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ee,Re,Be,De,Ge].forEach(b(Ie,t))}(t),w(3,Zt),Ve(t),Ae()}function Oe(){const t=j('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){w(3,P),w(3,Oe),w(3,yt),w(3,St),"manage"===T.subcmd&&_e(),"view"===T.subcmd&&Ut()}
//# sourceMappingURL=guild-37a53eb9.js.map
