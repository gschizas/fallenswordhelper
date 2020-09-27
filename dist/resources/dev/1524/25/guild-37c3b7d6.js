import{g as t,p as e,a4 as n,D as s,bs as a,d as o,m as i,A as c,h as r,H as l,R as f,b as d,ab as u,a2 as m,o as p,i as h,u as b,t as g,v as j,C,s as N,bt as L,f as v,Z as S,n as y,au as k,a as w,ak as $,aN as x,O as M,V as T,c as A,bu as H,E as R,x as B,bv as E}from"./calfSystem-69dd5601.js"
import"./numberIsNaN-929de7af.js"
import{p as D}from"./playerName-688c2cbc.js"
import"./toLowerCase-c42114e1.js"
import{c as I}from"./createInput-31301338.js"
import{a as G}from"./addCommas-bdfe3cd5.js"
import{l as V}from"./onlineDot-0fddc3bd.js"
import{s as P}from"./setTipped-64e874d6.js"
import{b as _}from"./batch-9d8c3bf7.js"
import{c as F}from"./colouredDots-84d91696.js"
import"./createLabel-76355438.js"
import"./insertElementBefore-286ff14c.js"
import O from"./compressBio-dd6acf8b.js"
import{c as U}from"./createStyle-ced277c4.js"
import{c as X}from"./currentGuildId-a0138513.js"
import"./intValue-65d3c36c.js"
import"./valueText-1de8e1c5.js"
import{a as Z,g as z,c as J,b as Q}from"./levelHighlight-809d03f9.js"
import"./fshOpen-4f280086.js"
import{o as q}from"./openQuickBuffByName-a66e5d09.js"
import{d as K}from"./dataRows-88052c7e.js"
import{c as W}from"./createUl-713f95e6.js"
import{s as Y,g as tt}from"./idb-874fe815.js"
import{i as et}from"./insertElementAfterBegin-c6f715e1.js"
import"./isChecked-9f10b428.js"
import{b as nt}from"./simpleCheckbox-5b36aca2.js"
import{a as st}from"./alpha-4977b995.js"
import{c as at}from"./createTBody-c786127c.js"
import{c as ot}from"./createTable-ba9c0bc4.js"
import"./isDate-b3759236.js"
import"./padZ-0c2f5370.js"
import{f as it}from"./formatLocalDateTime-be73fafb.js"
import{u as ct,l as rt,v as lt,c as ft,m as dt,a as ut,g as mt}from"./indexConstants-00eab081.js"
import{c as pt}from"./createBr-e5b43d84.js"
import{c as ht}from"./createButton-fadf93b3.js"
import{c as bt}from"./createTextArea-3f9e5c21.js"
import{d as gt}from"./dialogMsg-1f890a82.js"
import{c as jt}from"./createSpan-71b557d6.js"
import{h as Ct}from"./hideElement-c8e0696f.js"
import{t as Nt}from"./toggleVisibilty-337481a6.js"
function Lt(t,e){const n=a.exec(e.dataset.tipped)
return V({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function vt(){const a=t("b",e).find(n("Members"))
if(a){const t=s('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
a.classList.add("tip-static"),P(`Active: ${e[0]}/${t.length}<br>Stamina: ${G(e[1])}`,a)}}function St(){}let yt,kt
function wt(t){return yt&&t>=Z()&&t<=z()}function $t(t){return kt&&t>=J()&&t<=Q()}const xt=t=>[t,a.exec(t.dataset.tipped)[1]],Mt=([,t])=>t<7,Tt=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],At=([t,e])=>[t.parentNode.parentNode.rowIndex,wt(e),$t(e)]
const Ht=t=>t.map(([t])=>`.fshHighlight tr:nth-child(${t+1})`).join(",")
function Rt(){const t=s('#pCC a[data-tipped*="<td>VL:</td>"]').map(xt).filter(Mt).map(Tt).map(At),n=t.filter(([,t])=>t),a=t.filter(([,t,e])=>!t&&e)
!function(t){if(t.length){const e=Ht(t)+" {background-color: #4671C8;}"
r(document.body,U(e))}}(n),function(t){if(t.length){const e=Ht(t)+" {background-color: #FF9900;}"
r(document.body,U(e))}}(a),function(t,n){if(t.length+n.length){const t=d(o,e)
t[t.length-1].classList.add("fshHighlight")}}(n,a)}function Bt(){Number(f("guild_id"))!==X()&&(yt||kt)&&Rt()}function Et(){yt=l("highlightPlayersNearMyLvl"),kt=l("highlightGvGPlayersNearMyLvl"),Bt(),l("enableHistoryCompressor")&&function(){const n=t(o,e).slice(-2,-1)[0].rows[0].cells[0],s=i({id:"profile-bio",innerHTML:n.innerHTML})
c("",n),r(n,s),O()}()}function Dt(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function It(t){"smallLink"===t.target.className&&q(t.target.previousElementSibling.text)}function Gt(){const t=u(`#pCC a[href^="${m}"]`)
_([5,3,t,0,Dt]),p(e,It)}function Vt(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function Pt(t,e){c(e,t.insertCell(-1))}function _t(t,e,n){const s=t.insertRow(t.rows.length-2)
Pt(s,e),Pt(s,n)}function Ft(t,e){_t(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ot(t,e,n){1===e&&function(t){_t(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(n),K(t.rows,7,0).forEach(g(Ft,n))}function Ut(t,e){const n=j(e),s=C('#pCC input[name="page"]',n)
if(!s)return
const a=Number(s.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(s)
!function(t,e,n){const s=C("#pCC > table > tbody > tr > td > table",t)
s&&s.rows.length>3&&Ot(s,e,n)}(n,a,t.node),o>a&&function(t,e,n){Vt(t+1).then(g(e,n))}(a,Ut,t)}function Xt(t){const e=t.rows[6].cells[0].children[0]
e&&Vt(1).then(g(Ut,{node:e}))}function Zt(t){t.target.id===L&&S(L,!l(L))}let zt,Jt,Qt,qt,Kt,Wt,Yt,te,ee,ne,se,ae,oe
function ie(t,e){return`${t}<option value="${e}">${e}</option>`}function ce(t){return $(t)?"#DEF":t.toLocaleString()}function re(t,e,n){return e+"<tr>"+`<td>${it(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ce(n[rt])}</td>`+`<td class="fshRight">${ce(n[lt])}</td>`+`<td class="fshRight">${ce(n[ft])}</td>`+`<td class="fshRight">${ce(n[dt])}</td>`+`<td class="fshRight">${Math.floor(n[ft]/n[dt]*100)}</td>`+`<td class="fshRight">${n[ut]}</td>`+`<td class="fshRight">${ce(n[mt])}</td></tr>`}function le(t,e){return function(t){return Jt&&"- All -"!==Jt&&Jt!==t}(e)?t:t+Kt[e].reduce(g(re,e),"")}function fe(){Kt&&c(k(Kt).reduce(le,""),zt),Qt.classList.remove("fshSpinner")}function de(){Qt.classList.add("fshSpinner"),w(3,fe)}function ue(t){Jt=t.target.value,de()}function me(t){t&&(Kt=t,c(`<select name="member"><option value="- All -" selected>- All -</option>${k(t).sort(st).reduce(ie,"")}</select>`,qt),de())}function pe(){const t=y("th",{textContent:"Member"})
return qt=i(),r(t,qt),t}function he(){const t=ot({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const n=pe()
r(e,n),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){zt=at(),r(t,zt)}(t),v(t,"change",ue),Qt=i({className:"tgCont fshSpinner64"}),r(Qt,t),Qt}function be(t){Wt.value=t,ee.classList.remove("fshSpinner")}function ge(){Wt.value='{"lastUpdate": 0, "members": {}}'}function je(t){gt("Update successful"),me(t.members)}function Ce(){const t=x(Wt.value)
Y("fsh_guildActivity",t).then(g(je,t)).catch(gt)}function Ne(t,e){const n=ht({className:"custombutton",textContent:t})
return p(n,e),n}function Le(){return ee=i({id:"io",className:"fshSpinner64"}),Wt=bt(),Wt.setAttribute("autocapitalize","off"),Wt.setAttribute("autocomplete","off"),Wt.setAttribute("autocorrect","off"),Wt.setAttribute("spellcheck","false"),Yt=Ne("Save",Ce),te=Ne("Reset",ge),r(ee,Wt),r(ee,pt()),r(ee,Yt),r(ee,te),ee}function ve(){return!se.checked}function Se(t){se.checked&&"Escape"===t.code&&(se.checked=!1)}function ye(t){ve()&&(t.style.transform=null)}function ke(){T("guildTracker","updateRawData"),ne&&function(t){t&&(ee.classList.add("fshSpinner"),w(4,be,[t]))}(ne)}function we(){const t=function(){const t=i({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return oe=I({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(oe,"change",ke),r(t,oe),t}(),e=W({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return r(t,e),H(e,t),t}function $e(){const t=we(),e=function(){const t=i({className:"fsh-dialog-content"})
return r(t,he()),r(t,Le()),t}()
r(t,e),v(se,"change",g(ye,t)),r(ae,t)}function xe(t){t&&(ne=JSON.stringify(t),me(t.members))}function Me(){T("guildTracker","openDialog"),tt("fsh_guildActivity").then(xe),A.dialogIsClosed=ve,h(ae,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),$e()}function Te(){!function(){const t=C("#pCC img.guild_openGuildStore"),e=t.parentNode,n=i({className:"fsh-tracker"}),s=i({innerHTML:nt(L)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
v(s,"change",Zt),r(n,t),r(n,s),et(e,n)}(),se=I({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(se,"change",Me),ae=i({className:"fsh-dialog"}),r(ae,se),v(document.body,"keydown",Se),r(document.body,ae)}let Ae,He
function Re(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function Be(){He?He.disabled=!Ae:function(){const t=d(o,e),n=t[t.length-1]
n.classList.add("fshProgressBar")
const a=s(R,n).map(Re).join("\n")
He=r(document.body,U(a)).sheet}()}function Ee(){Ae=!Ae,S("enableStamBars",Ae),Be(),T("guildManage","StamBars")}function De(){!function(){const t=C("#pCC img.guild_openGuildStore").parentNode,e=r(t,i({className:"fshCenter",innerHTML:nt("enableStamBars")}))
v(e,"change",Ee)}(),Ae=l("enableStamBars"),Ae&&Be()}function Ie(t,e,n){const s=function(t){return jt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
r(t,function(t){const e=jt({innerHTML:"[&nbsp;"})
return r(e,t),h(e,"&nbsp;]"),e}(s)),e.id=n,l(n)&&Ct(e),p(s,Nt)}function Ge(t){Ie(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ve(t){const e=t.rows[4].cells[1].children[0]
c(e.innerHTML.trim(),e),Ie(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Pe(t){Ie(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function _e(e){const s=t("b",e).filter(n("Relics"))
if(1!==s.length)return
const a=s[0].parentNode.nextElementSibling.children[0]
c(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,a)}function Fe(t){const e=d("li",t),n=e[e.length-1].parentNode
h(n,`<li><a href="${E}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Oe(t,e){w(3,e,[t])}function Ue(t){B()||(l("detailedConflictInfo")&&w(3,Xt,[t]),w(4,Te))}function Xe(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ge,Ve,Pe,_e,Fe].forEach(g(Oe,t))}(t),w(3,Gt),Ue(t),De()}function Ze(){const t=C('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function ze(){w(3,F),w(3,Ze),w(3,St),w(3,vt),"manage"===A.subcmd&&Xe(),"view"===A.subcmd&&Et()}export default ze
//# sourceMappingURL=guild-37c3b7d6.js.map
