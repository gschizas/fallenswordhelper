import{g as t,p as e,b2 as n,I as s,bq as a,d as i,D as o,N as c,a7 as r,$ as l,o as f,i as d,t as u,s as m,u as p,M as h,z as b,r as g,k as j,br as N,e as C,f as L,W as v,m as S,ap as y,a as w,ah as $,aK as k,L as M,S as x,c as T,bs as A,b as R,bb as E,w as H,bt as B}from"./calfSystem-57340987.js"
import"./numberIsNaN-9e712afc.js"
import{p as D}from"./playerName-8027bacf.js"
import"./toLowerCase-b755896e.js"
import{c as G}from"./createInput-b52727dd.js"
import{a as I}from"./addCommas-8127b6a1.js"
import{l as V}from"./onlineDot-b1eebf88.js"
import{s as _}from"./setTipped-bbda3ddd.js"
import{b as P}from"./batch-e5312d78.js"
import{c as U,a as z}from"./compressBio-561c939f.js"
import"./createLabel-688f4536.js"
import{c as O}from"./currentGuildId-fd144a5c.js"
import"./intValue-e99f58ac.js"
import"./valueText-2c905a41.js"
import{c as X,b as q,p as F,a as J,g as K}from"./levelHighlight-b0ca1a57.js"
import"./fshOpen-5a3828f4.js"
import{o as Q}from"./openQuickBuffByName-69b6986b.js"
import{d as W}from"./dataRows-bbabdd56.js"
import{c as Z}from"./createUl-177687e9.js"
import{s as Y,g as tt}from"./idb-c55e2904.js"
import"./insertElementBefore-69bb0e1f.js"
import{i as et}from"./insertElementAfterBegin-d5ad26ea.js"
import"./isChecked-e2c7160f.js"
import{b as nt}from"./simpleCheckbox-0095209e.js"
import{a as st}from"./alpha-ef81c50b.js"
import{c as at}from"./createTBody-6df13176.js"
import{c as it}from"./createTable-f10ae272.js"
import"./isDate-2c2b8ff6.js"
import"./padZ-4a0f9130.js"
import{f as ot}from"./formatLocalDateTime-f3e20ebd.js"
import{u as ct,l as rt,v as lt,c as ft,m as dt,a as ut,g as mt}from"./indexConstants-7d32d868.js"
import{c as pt,t as ht}from"./toggleVisibilty-d8f8c431.js"
import{c as bt}from"./createButton-9767d7d7.js"
import{c as gt}from"./createTextArea-e9bdb557.js"
import{d as jt}from"./dialogMsg-e1203629.js"
import{c as Nt}from"./createStyle-1094727e.js"
import{c as Ct}from"./createSpan-14d38ba8.js"
import{h as Lt}from"./hideElement-5296bb8b.js"
function vt(t,e){const n=a.exec(e.dataset.tipped)
return V({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function St(){const a=t("b",e).find(n("Members"))
if(a){const t=s('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(vt,[0,0])}(t)
a.classList.add("tip-static"),_(`Active: ${e[0]}/${t.length}<br>Stamina: ${I(e[1])}`,a)}}let yt,wt,$t,kt,Mt,xt,Tt,At,Rt,Et,Ht,Bt,Dt,Gt,It
function Vt(t,e){const n=Number(/VL:.+?(\d+)/.exec(e)[1]),s=t.parentNode.parentNode
!function(t){return yt&&t>=q&&t<=F}(n)?function(t){return wt&&t>=J&&t<=K}(n)&&s.classList.add("lvlGvGHighlight"):s.classList.add("lvlHighlight")}function _t(t){const{tipped:e}=t.dataset
a.exec(e)[1]<7&&Vt(t,e)}function Pt(){Number(c("guild_id"))!==O()&&(yt||wt)&&(X(),s('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(_t))}function Ut(){yt=o("highlightPlayersNearMyLvl"),wt=o("highlightGvGPlayersNearMyLvl"),Pt(),o("enableHistoryCompressor")&&U(t(i,e).slice(-2,-1)[0].rows[0].cells[0])}function zt(t){d(t.parentNode,' <span class="smallLink">[b]</span>')}function Ot(t){"smallLink"===t.target.className&&Q(t.target.previousElementSibling.text)}function Xt(){const t=r(`#pCC a[href^="${l}"]`)
P([5,3,t,0,zt]),f(e,Ot)}function qt(t){return u({cmd:"guild",subcmd:"conflicts",page:t})}function Ft(t,e){b(e,t.insertCell(-1))}function Jt(t,e,n){const s=t.insertRow(t.rows.length-2)
Ft(s,e),Ft(s,n)}function Kt(t,e){Jt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Qt(t,e,n){1===e&&function(t){Jt(t,`<a href="${g}conflicts">Active Conflicts</a>`,"Score")}(n),W(t.rows,7,0).forEach(m(Kt,n))}function Wt(t,e){const n=p(e),s=h('#pCC input[name="page"]',n)
if(!s)return
const a=Number(s.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(s)
!function(t,e,n){const s=h("#pCC > table > tbody > tr > td > table",t)
s&&s.rows.length>3&&Qt(s,e,n)}(n,a,t.node),i>a&&function(t,e,n){qt(t+1).then(m(e,n))}(a,Wt,t)}function Zt(t){const e=t.rows[6].cells[0].children[0]
e&&qt(1).then(m(Wt,{node:e}))}function Yt(t){t.target.id===N&&v(N,!o(N))}function te(t,e){return`${t}<option value="${e}">${e}</option>`}function ee(t){return $(t)?"#DEF":t.toLocaleString()}function ne(t,e,n){return e+"<tr>"+`<td>${ot(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ee(n[rt])}</td>`+`<td class="fshRight">${ee(n[lt])}</td>`+`<td class="fshRight">${ee(n[ft])}</td>`+`<td class="fshRight">${ee(n[dt])}</td>`+`<td class="fshRight">${Math.floor(n[ft]/n[dt]*100)}</td>`+`<td class="fshRight">${n[ut]}</td>`+`<td class="fshRight">${ee(n[mt])}</td></tr>`}function se(t,e){return function(t){return kt&&"- All -"!==kt&&kt!==t}(e)?t:t+Tt[e].reduce(m(ne,e),"")}function ae(){Tt&&b(y(Tt).reduce(se,""),$t),Mt.classList.remove("fshSpinner")}function ie(){Mt.classList.add("fshSpinner"),w(3,ae)}function oe(t){kt=t.target.value,ie()}function ce(t){t&&(Tt=t,b(`<select name="member"><option value="- All -" selected>- All -</option>${y(t).sort(st).reduce(te,"")}</select>`,xt),ie())}function re(){const t=S("th",{textContent:"Member"})
return xt=j(),L(t,xt),t}function le(){const t=it({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
d(e,"<th>Date</th>")
const n=re()
L(e,n),d(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){$t=at(),L(t,$t)}(t),C(t,"change",oe),Mt=j({className:"tgCont fshSpinner64"}),L(Mt,t),Mt}function fe(t){At.value=t,Ht.classList.remove("fshSpinner")}function de(){At.value='{"lastUpdate": 0, "members": {}}'}function ue(t){jt("Update successful"),ce(t.members)}function me(){const t=k(At.value)
Y("fsh_guildActivity",t).then(m(ue,t)).catch(jt)}function pe(t,e){const n=bt({className:"custombutton",textContent:t})
return f(n,e),n}function he(){return Ht=j({id:"io",className:"fshSpinner64"}),At=gt(),At.setAttribute("autocapitalize","off"),At.setAttribute("autocomplete","off"),At.setAttribute("autocorrect","off"),At.setAttribute("spellcheck","false"),Rt=pe("Save",me),Et=pe("Reset",de),L(Ht,At),L(Ht,pt()),L(Ht,Rt),L(Ht,Et),Ht}function be(){return!Dt.checked}function ge(t){Dt.checked&&"Escape"===t.code&&(Dt.checked=!1)}function je(t){be()&&(t.style.transform=null)}function Ne(){x("guildTracker","updateRawData"),Bt&&function(t){t&&(Ht.classList.add("fshSpinner"),w(4,fe,[t]))}(Bt)}function Ce(){const t=function(){const t=j({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return It=G({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(It,"change",Ne),L(t,It),t}(),e=Z({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return L(t,e),A(e,t),t}function Le(){const t=Ce(),e=function(){const t=j({className:"fsh-dialog-content"})
return L(t,le()),L(t,he()),t}()
L(t,e),C(Dt,"change",m(je,t)),L(Gt,t)}function ve(t){t&&(Bt=JSON.stringify(t),ce(t.members))}function Se(){x("guildTracker","openDialog"),tt("fsh_guildActivity").then(ve),T.dialogIsClosed=be,d(Gt,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Le()}function ye(){!function(){const t=h("#pCC img.guild_openGuildStore"),e=t.parentNode,n=j({className:"fsh-tracker"}),s=j({innerHTML:nt(N)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
C(s,"change",Yt),L(n,t),L(n,s),et(e,n)}(),Dt=G({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(Dt,"change",Se),Gt=j({className:"fsh-dialog"}),L(Gt,Dt),C(document.body,"keydown",ge),L(document.body,Gt)}let we,$e
function ke(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function Me(){$e?$e.disabled=!we:function(){const t=R(i,e),n=t[t.length-1]
n.id="fshMemberList"
const a=s(E,n).map(ke).join("\n")
$e=L(document.body,Nt(a)).sheet}()}function xe(){we=!we,v("enableStamBars",we),Me(),x("guildManage","StamBars")}function Te(){!function(){const t=h("#pCC img.guild_openGuildStore").parentNode,e=L(t,j({className:"fshCenter",innerHTML:nt("enableStamBars")}))
C(e,"change",xe)}(),we=o("enableStamBars"),we&&Me()}function Ae(t,e,n){const s=function(t){return Ct({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
L(t,function(t){const e=Ct({innerHTML:"[&nbsp;"})
return L(e,t),d(e,"&nbsp;]"),e}(s)),e.id=n,o(n)&&Lt(e),f(s,ht)}function Re(t){Ae(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ee(t){const e=t.rows[4].cells[1].children[0]
b(e.innerHTML.trim(),e),Ae(e,t.rows[6].cells[0].children[0],"statisticsControl")}function He(t){Ae(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Be(e){const s=t("b",e).filter(n("Relics"))
if(1!==s.length)return
const a=s[0].parentNode.nextElementSibling.children[0]
b(`[ <a href="${g}reliclist">Control</a> ]&nbsp;`,a)}function De(t){const e=R("li",t),n=e[e.length-1].parentNode
d(n,`<li><a href="${B}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ge(t,e){w(3,e,[t])}function Ie(t){H()||(o("detailedConflictInfo")&&w(3,Zt,[t]),w(4,ye))}function Ve(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Re,Ee,He,Be,De].forEach(m(Ge,t))}(t),w(3,Xt),Ie(t),Te()}function _e(){const t=h('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){w(3,z),w(3,_e),w(3,St),"manage"===T.subcmd&&Ve(),"view"===T.subcmd&&Ut()}
//# sourceMappingURL=guild-382772b3.js.map
