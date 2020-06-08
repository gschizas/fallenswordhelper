import{g as t,p as e,b1 as n,D as s,bq as a,d as i,l as o,A as c,f as r,G as l,P as d,a9 as f,a1 as u,o as m,i as p,u as h,t as b,v as g,C as j,s as C,br as L,e as N,Y as v,n as S,aq as y,a as w,ai as $,aK as k,O as M,U as x,c as T,bs as A,b as H,E,x as R,bt as B}from"./calfSystem-05554bae.js"
import"./numberIsNaN-d04aa9f7.js"
import{p as D}from"./playerName-0e65dbb6.js"
import"./toLowerCase-4d1a2136.js"
import{c as G}from"./createInput-b4c4948c.js"
import{a as I}from"./addCommas-1723dd41.js"
import{l as V}from"./onlineDot-2dc99915.js"
import{s as _}from"./setTipped-227f970f.js"
import{b as P}from"./batch-62c1054e.js"
import{c as U}from"./colouredDots-bcbb39d3.js"
import"./createLabel-ce6d9261.js"
import"./insertElementBefore-2ba0b318.js"
import O from"./compressBio-5a732bb6.js"
import{c as q}from"./currentGuildId-03628998.js"
import"./intValue-f723fc88.js"
import"./valueText-d9bb024d.js"
import{c as X,b as z,p as F,a as J,g as K}from"./levelHighlight-5d27ef2e.js"
import"./fshOpen-79258363.js"
import{o as Q}from"./openQuickBuffByName-5ddc4d1b.js"
import{d as Y}from"./dataRows-2cd1da8f.js"
import{c as Z}from"./createUl-8c07ba25.js"
import{s as W,g as tt}from"./idb-862da886.js"
import{i as et}from"./insertElementAfterBegin-1acc7ec9.js"
import"./isChecked-57b4060d.js"
import{b as nt}from"./simpleCheckbox-1bbe1878.js"
import{a as st}from"./alpha-48a506ea.js"
import{c as at}from"./createTBody-24bbe037.js"
import{c as it}from"./createTable-db205e04.js"
import"./isDate-b81a8388.js"
import"./padZ-14d8d7ee.js"
import{f as ot}from"./formatLocalDateTime-1ff300c1.js"
import{u as ct,l as rt,v as lt,c as dt,m as ft,a as ut,g as mt}from"./indexConstants-e5da2172.js"
import{c as pt,t as ht}from"./toggleVisibilty-d2dbe60b.js"
import{c as bt}from"./createButton-3a781ecf.js"
import{c as gt}from"./createTextArea-b810605f.js"
import{d as jt}from"./dialogMsg-08e9871c.js"
import{c as Ct}from"./createStyle-0d9a7c79.js"
import{c as Lt}from"./createSpan-472d43ae.js"
import{h as Nt}from"./hideElement-b7650daa.js"
function vt(t,e){const n=a.exec(e.dataset.tipped)
return V({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function St(){const a=t("b",e).find(n("Members"))
if(a){const t=s('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(vt,[0,0])}(t)
a.classList.add("tip-static"),_(`Active: ${e[0]}/${t.length}<br>Stamina: ${I(e[1])}`,a)}}let yt,wt,$t,kt,Mt,xt,Tt,At,Ht,Et,Rt,Bt,Dt,Gt,It
function Vt(t,e){const n=Number(/VL:.+?(\d+)/.exec(e)[1]),s=t.parentNode.parentNode
!function(t){return yt&&t>=z&&t<=F}(n)?function(t){return wt&&t>=J&&t<=K}(n)&&s.classList.add("lvlGvGHighlight"):s.classList.add("lvlHighlight")}function _t(t){const{tipped:e}=t.dataset
a.exec(e)[1]<7&&Vt(t,e)}function Pt(){Number(d("guild_id"))!==q()&&(yt||wt)&&(X(),s('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(_t))}function Ut(){yt=l("highlightPlayersNearMyLvl"),wt=l("highlightGvGPlayersNearMyLvl"),Pt(),l("enableHistoryCompressor")&&function(){const n=t(i,e).slice(-2,-1)[0].rows[0].cells[0],s=o({id:"profile-bio",innerHTML:n.innerHTML})
c("",n),r(n,s),O()}()}function Ot(t){p(t.parentNode,' <span class="smallLink">[b]</span>')}function qt(t){"smallLink"===t.target.className&&Q(t.target.previousElementSibling.text)}function Xt(){const t=f(`#pCC a[href^="${u}"]`)
P([5,3,t,0,Ot]),m(e,qt)}function zt(t){return h({cmd:"guild",subcmd:"conflicts",page:t})}function Ft(t,e){c(e,t.insertCell(-1))}function Jt(t,e,n){const s=t.insertRow(t.rows.length-2)
Ft(s,e),Ft(s,n)}function Kt(t,e){Jt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Qt(t,e,n){1===e&&function(t){Jt(t,`<a href="${C}conflicts">Active Conflicts</a>`,"Score")}(n),Y(t.rows,7,0).forEach(b(Kt,n))}function Yt(t,e){const n=g(e),s=j('#pCC input[name="page"]',n)
if(!s)return
const a=Number(s.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(s)
!function(t,e,n){const s=j("#pCC > table > tbody > tr > td > table",t)
s&&s.rows.length>3&&Qt(s,e,n)}(n,a,t.node),i>a&&function(t,e,n){zt(t+1).then(b(e,n))}(a,Yt,t)}function Zt(t){const e=t.rows[6].cells[0].children[0]
e&&zt(1).then(b(Yt,{node:e}))}function Wt(t){t.target.id===L&&v(L,!l(L))}function te(t,e){return`${t}<option value="${e}">${e}</option>`}function ee(t){return $(t)?"#DEF":t.toLocaleString()}function ne(t,e,n){return e+"<tr>"+`<td>${ot(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ee(n[rt])}</td>`+`<td class="fshRight">${ee(n[lt])}</td>`+`<td class="fshRight">${ee(n[dt])}</td>`+`<td class="fshRight">${ee(n[ft])}</td>`+`<td class="fshRight">${Math.floor(n[dt]/n[ft]*100)}</td>`+`<td class="fshRight">${n[ut]}</td>`+`<td class="fshRight">${ee(n[mt])}</td></tr>`}function se(t,e){return function(t){return kt&&"- All -"!==kt&&kt!==t}(e)?t:t+Tt[e].reduce(b(ne,e),"")}function ae(){Tt&&c(y(Tt).reduce(se,""),$t),Mt.classList.remove("fshSpinner")}function ie(){Mt.classList.add("fshSpinner"),w(3,ae)}function oe(t){kt=t.target.value,ie()}function ce(t){t&&(Tt=t,c(`<select name="member"><option value="- All -" selected>- All -</option>${y(t).sort(st).reduce(te,"")}</select>`,xt),ie())}function re(){const t=S("th",{textContent:"Member"})
return xt=o(),r(t,xt),t}function le(){const t=it({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
p(e,"<th>Date</th>")
const n=re()
r(e,n),p(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){$t=at(),r(t,$t)}(t),N(t,"change",oe),Mt=o({className:"tgCont fshSpinner64"}),r(Mt,t),Mt}function de(t){At.value=t,Rt.classList.remove("fshSpinner")}function fe(){At.value='{"lastUpdate": 0, "members": {}}'}function ue(t){jt("Update successful"),ce(t.members)}function me(){const t=k(At.value)
W("fsh_guildActivity",t).then(b(ue,t)).catch(jt)}function pe(t,e){const n=bt({className:"custombutton",textContent:t})
return m(n,e),n}function he(){return Rt=o({id:"io",className:"fshSpinner64"}),At=gt(),At.setAttribute("autocapitalize","off"),At.setAttribute("autocomplete","off"),At.setAttribute("autocorrect","off"),At.setAttribute("spellcheck","false"),Ht=pe("Save",me),Et=pe("Reset",fe),r(Rt,At),r(Rt,pt()),r(Rt,Ht),r(Rt,Et),Rt}function be(){return!Dt.checked}function ge(t){Dt.checked&&"Escape"===t.code&&(Dt.checked=!1)}function je(t){be()&&(t.style.transform=null)}function Ce(){x("guildTracker","updateRawData"),Bt&&function(t){t&&(Rt.classList.add("fshSpinner"),w(4,de,[t]))}(Bt)}function Le(){const t=function(){const t=o({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return It=G({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(It,"change",Ce),r(t,It),t}(),e=Z({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return r(t,e),A(e,t),t}function Ne(){const t=Le(),e=function(){const t=o({className:"fsh-dialog-content"})
return r(t,le()),r(t,he()),t}()
r(t,e),N(Dt,"change",b(je,t)),r(Gt,t)}function ve(t){t&&(Bt=JSON.stringify(t),ce(t.members))}function Se(){x("guildTracker","openDialog"),tt("fsh_guildActivity").then(ve),T.dialogIsClosed=be,p(Gt,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Ne()}function ye(){!function(){const t=j("#pCC img.guild_openGuildStore"),e=t.parentNode,n=o({className:"fsh-tracker"}),s=o({innerHTML:nt(L)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
N(s,"change",Wt),r(n,t),r(n,s),et(e,n)}(),Dt=G({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(Dt,"change",Se),Gt=o({className:"fsh-dialog"}),r(Gt,Dt),N(document.body,"keydown",ge),r(document.body,Gt)}let we,$e
function ke(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function Me(){$e?$e.disabled=!we:function(){const t=H(i,e),n=t[t.length-1]
n.id="fshMemberList"
const a=s(E,n).map(ke).join("\n")
$e=r(document.body,Ct(a)).sheet}()}function xe(){we=!we,v("enableStamBars",we),Me(),x("guildManage","StamBars")}function Te(){!function(){const t=j("#pCC img.guild_openGuildStore").parentNode,e=r(t,o({className:"fshCenter",innerHTML:nt("enableStamBars")}))
N(e,"change",xe)}(),we=l("enableStamBars"),we&&Me()}function Ae(t,e,n){const s=function(t){return Lt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
r(t,function(t){const e=Lt({innerHTML:"[&nbsp;"})
return r(e,t),p(e,"&nbsp;]"),e}(s)),e.id=n,l(n)&&Nt(e),m(s,ht)}function He(t){Ae(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ee(t){const e=t.rows[4].cells[1].children[0]
c(e.innerHTML.trim(),e),Ae(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Re(t){Ae(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Be(e){const s=t("b",e).filter(n("Relics"))
if(1!==s.length)return
const a=s[0].parentNode.nextElementSibling.children[0]
c(`[ <a href="${C}reliclist">Control</a> ]&nbsp;`,a)}function De(t){const e=H("li",t),n=e[e.length-1].parentNode
p(n,`<li><a href="${B}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ge(t,e){w(3,e,[t])}function Ie(t){R()||(l("detailedConflictInfo")&&w(3,Zt,[t]),w(4,ye))}function Ve(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[He,Ee,Re,Be,De].forEach(b(Ge,t))}(t),w(3,Xt),Ie(t),Te()}function _e(){const t=j('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){w(3,U),w(3,_e),w(3,St),"manage"===T.subcmd&&Ve(),"view"===T.subcmd&&Ut()}
//# sourceMappingURL=guild-ed601496.js.map
