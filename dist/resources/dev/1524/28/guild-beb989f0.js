import{g as t,p as e,a4 as n,D as a,bp as s,d as o,m as i,A as c,h as r,H as l,R as f,b as d,ab as u,a2 as m,o as p,i as h,u as b,t as g,v as j,C,s as N,bq as L,f as v,Z as S,n as y,au as k,a as w,ak as $,aN as x,O as M,V as T,c as A,br as H,E as R,x as B,bs as E}from"./calfSystem-b136673a.js"
import"./numberIsNaN-91041dcf.js"
import{p as D}from"./playerName-f933c87f.js"
import"./toLowerCase-27ea448e.js"
import{c as I}from"./createInput-08c848a9.js"
import{a as G}from"./addCommas-8259c1a9.js"
import{l as V}from"./onlineDot-3f2bf154.js"
import{s as P}from"./setTipped-e5305fe4.js"
import{b as _}from"./batch-277d0ee9.js"
import{c as F}from"./colouredDots-e672a8e8.js"
import"./createLabel-04ce59e0.js"
import"./insertElementBefore-eada6f05.js"
import O from"./compressBio-1d830ca2.js"
import{c as U}from"./createStyle-04d9ec28.js"
import{c as X}from"./currentGuildId-4405d1bb.js"
import"./intValue-f4d85578.js"
import"./valueText-90e91fab.js"
import{a as Z,g as q,c as z,b as J}from"./levelHighlight-4b892b59.js"
import"./fshOpen-027ef4bd.js"
import{o as Q}from"./openQuickBuffByName-1b8ea02b.js"
import{d as K}from"./dataRows-17e46aaa.js"
import{c as W}from"./createUl-cedddfb2.js"
import{s as Y,g as tt}from"./idb-c31665cb.js"
import{i as et}from"./insertElementAfterBegin-9a4b7ee1.js"
import"./isChecked-12c32ad5.js"
import{b as nt}from"./simpleCheckbox-b7b2f875.js"
import{a as at}from"./alpha-08ee6ec8.js"
import{c as st}from"./createTBody-f74b1a93.js"
import{c as ot}from"./createTable-629a2fee.js"
import"./isDate-45c423ee.js"
import"./padZ-28ca6b6e.js"
import{f as it}from"./formatLocalDateTime-8d7e97c2.js"
import{u as ct,l as rt,v as lt,c as ft,m as dt,a as ut,g as mt}from"./indexConstants-d82f70de.js"
import{c as pt}from"./createBr-31259e07.js"
import{c as ht}from"./createButton-f2fbc414.js"
import{c as bt}from"./createTextArea-141eee0d.js"
import{d as gt}from"./dialogMsg-8ea305bd.js"
import{c as jt}from"./createSpan-65142707.js"
import{h as Ct}from"./hideElement-c14a94c9.js"
import{t as Nt}from"./toggleVisibilty-baa4161d.js"
function Lt(t,e){const n=s.exec(e.dataset.tipped)
return V({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function vt(){const s=t("b",e).find(n("Members"))
if(s){const t=a('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
s.classList.add("tip-static"),P(`Active: ${e[0]}/${t.length}<br>Stamina: ${G(e[1])}`,s)}}function St(){}let yt,kt
function wt(t){return yt&&t>=Z()&&t<=q()}function $t(t){return kt&&t>=z()&&t<=J()}const xt=t=>[t,s.exec(t.dataset.tipped)[1]],Mt=([,t])=>t<7,Tt=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],At=([t,e])=>[t.parentNode.parentNode.rowIndex,wt(e),$t(e)]
const Ht=t=>t.map(([t])=>`.fshHighlight tr:nth-child(${t+1})`).join(",")
function Rt(){const t=a('#pCC a[data-tipped*="<td>VL:</td>"]').map(xt).filter(Mt).map(Tt).map(At),n=t.filter(([,t])=>t),s=t.filter(([,t,e])=>!t&&e)
!function(t){if(t.length){const e=Ht(t)+" {background-color: #4671C8;}"
r(document.body,U(e))}}(n),function(t){if(t.length){const e=Ht(t)+" {background-color: #FF9900;}"
r(document.body,U(e))}}(s),function(t,n){if(t.length+n.length){const t=d(o,e)
t[t.length-1].classList.add("fshHighlight")}}(n,s)}function Bt(){Number(f("guild_id"))!==X()&&(yt||kt)&&Rt()}function Et(){yt=l("highlightPlayersNearMyLvl"),kt=l("highlightGvGPlayersNearMyLvl"),Bt(),l("enableHistoryCompressor")&&function(){const n=t(o,e).slice(-2,-1)[0].rows[0].cells[0],a=i({id:"profile-bio",innerHTML:n.innerHTML})
c("",n),r(n,a),O()}()}function Dt(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function It(t){"smallLink"===t.target.className&&Q(t.target.previousElementSibling.text)}function Gt(){const t=u(`#pCC a[href^="${m}"]`)
_([5,3,t,0,Dt]),p(e,It)}function Vt(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function Pt(t,e){c(e,t.insertCell(-1))}function _t(t,e,n){const a=t.insertRow(t.rows.length-2)
Pt(a,e),Pt(a,n)}function Ft(t,e){_t(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ot(t,e,n){1===e&&function(t){_t(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(n),K(t.rows,7,0).forEach(g(Ft,n))}function Ut(t,e){const n=j(e),a=C('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=C("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Ot(a,e,n)}(n,s,t.node),o>s&&function(t,e,n){Vt(t+1).then(g(e,n))}(s,Ut,t)}function Xt(t){const e=t.rows[6].cells[0].children[0]
e&&Vt(1).then(g(Ut,{node:e}))}function Zt(t){t.target.id===L&&S(L,!l(L))}let qt,zt,Jt,Qt,Kt,Wt,Yt,te,ee,ne,ae,se,oe
function ie(t,e){return`${t}<option value="${e}">${e}</option>`}function ce(t){return $(t)?"#DEF":t.toLocaleString()}function re(t,e,n){return e+"<tr>"+`<td>${it(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ce(n[rt])}</td>`+`<td class="fshRight">${ce(n[lt])}</td>`+`<td class="fshRight">${ce(n[ft])}</td>`+`<td class="fshRight">${ce(n[dt])}</td>`+`<td class="fshRight">${Math.floor(n[ft]/n[dt]*100)}</td>`+`<td class="fshRight">${n[ut]}</td>`+`<td class="fshRight">${ce(n[mt])}</td></tr>`}function le(t,e){return function(t){return zt&&"- All -"!==zt&&zt!==t}(e)?t:t+Kt[e].reduce(g(re,e),"")}function fe(){Kt&&c(k(Kt).reduce(le,""),qt),Jt.classList.remove("fshSpinner")}function de(){Jt.classList.add("fshSpinner"),w(3,fe)}function ue(t){zt=t.target.value,de()}function me(t){t&&(Kt=t,c(`<select name="member"><option value="- All -" selected>- All -</option>${k(t).sort(at).reduce(ie,"")}</select>`,Qt),de())}function pe(){const t=y("th",{textContent:"Member"})
return Qt=i(),r(t,Qt),t}function he(){const t=ot({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const n=pe()
r(e,n),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){qt=st(),r(t,qt)}(t),v(t,"change",ue),Jt=i({className:"tgCont fshSpinner64"}),r(Jt,t),Jt}function be(t){Wt.value=t,ee.classList.remove("fshSpinner")}function ge(){Wt.value='{"lastUpdate": 0, "members": {}}'}function je(t){gt("Update successful"),me(t.members)}function Ce(){const t=x(Wt.value)
Y("fsh_guildActivity",t).then(g(je,t)).catch(gt)}function Ne(t,e){const n=ht({className:"custombutton",textContent:t})
return p(n,e),n}function Le(){return ee=i({id:"io",className:"fshSpinner64"}),Wt=bt(),Wt.setAttribute("autocapitalize","off"),Wt.setAttribute("autocomplete","off"),Wt.setAttribute("autocorrect","off"),Wt.setAttribute("spellcheck","false"),Yt=Ne("Save",Ce),te=Ne("Reset",ge),r(ee,Wt),r(ee,pt()),r(ee,Yt),r(ee,te),ee}function ve(){return!ae.checked}function Se(t){ae.checked&&"Escape"===t.code&&(ae.checked=!1)}function ye(t){ve()&&(t.style.transform=null)}function ke(){T("guildTracker","updateRawData"),ne&&function(t){t&&(ee.classList.add("fshSpinner"),w(4,be,[t]))}(ne)}function we(){const t=function(){const t=i({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return oe=I({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(oe,"change",ke),r(t,oe),t}(),e=W({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return r(t,e),H(e,t),t}function $e(){const t=we(),e=function(){const t=i({className:"fsh-dialog-content"})
return r(t,he()),r(t,Le()),t}()
r(t,e),v(ae,"change",g(ye,t)),r(se,t)}function xe(t){t&&(ne=JSON.stringify(t),me(t.members))}function Me(){T("guildTracker","openDialog"),tt("fsh_guildActivity").then(xe),A.dialogIsClosed=ve,h(se,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),$e()}function Te(){!function(){const t=C("#pCC img.guild_openGuildStore"),e=t.parentNode,n=i({className:"fsh-tracker"}),a=i({innerHTML:nt(L)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
v(a,"change",Zt),r(n,t),r(n,a),et(e,n)}(),ae=I({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(ae,"change",Me),se=i({className:"fsh-dialog"}),r(se,ae),v(document.body,"keydown",Se),r(document.body,se)}let Ae,He
function Re(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function Be(){He?He.disabled=!Ae:function(){const t=d(o,e),n=t[t.length-1]
n.classList.add("fshProgressBar")
const s=a(R,n).map(Re).join("\n")
He=r(document.body,U(s)).sheet}()}function Ee(){Ae=!Ae,S("enableStamBars",Ae),Be(),T("guildManage","StamBars")}function De(){!function(){const t=C("#pCC img.guild_openGuildStore").parentNode,e=r(t,i({className:"fshCenter",innerHTML:nt("enableStamBars")}))
v(e,"change",Ee)}(),Ae=l("enableStamBars"),Ae&&Be()}function Ie(t,e,n){const a=function(t){return jt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
r(t,function(t){const e=jt({innerHTML:"[&nbsp;"})
return r(e,t),h(e,"&nbsp;]"),e}(a)),e.id=n,l(n)&&Ct(e),p(a,Nt)}function Ge(t){Ie(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ve(t){const e=t.rows[4].cells[1].children[0]
c(e.innerHTML.trim(),e),Ie(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Pe(t){Ie(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function _e(e){const a=t("b",e).filter(n("Relics"))
if(1!==a.length)return
const s=a[0].parentNode.nextElementSibling.children[0]
c(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function Fe(t){const e=d("li",t),n=e[e.length-1].parentNode
h(n,`<li><a href="${E}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Oe(t,e){w(3,e,[t])}function Ue(t){B()||(l("detailedConflictInfo")&&w(3,Xt,[t]),w(4,Te))}function Xe(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ge,Ve,Pe,_e,Fe].forEach(g(Oe,t))}(t),w(3,Gt),Ue(t),De()}function Ze(){const t=C('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function qe(){w(3,F),w(3,Ze),w(3,St),w(3,vt),"manage"===A.subcmd&&Xe(),"view"===A.subcmd&&Et()}export default qe
//# sourceMappingURL=guild-beb989f0.js.map
