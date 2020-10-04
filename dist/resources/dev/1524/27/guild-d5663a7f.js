import{g as t,p as e,a5 as n,D as a,bq as s,d as o,m as i,A as c,h as r,H as l,R as f,b as d,ac as u,a3 as m,o as p,i as h,u as b,t as g,v as j,C,s as N,br as L,f as v,_ as S,n as y,av as w,a as k,al as $,aO as x,O as M,W as T,c as A,bs as H,E as R,x as B,bt as E}from"./calfSystem-ec5e5725.js"
import"./numberIsNaN-871eca26.js"
import{p as D}from"./playerName-6b140f29.js"
import"./toLowerCase-33399b5a.js"
import{c as I}from"./createInput-a9a25c4d.js"
import{a as G}from"./addCommas-e12eda5f.js"
import{l as _}from"./onlineDot-e6873f1e.js"
import{s as P}from"./setTipped-141d3404.js"
import{b as V}from"./batch-da424537.js"
import{c as O}from"./colouredDots-f4434fa4.js"
import"./createLabel-de3c44aa.js"
import"./insertElementBefore-543d9ef0.js"
import F from"./compressBio-8223003d.js"
import{c as U}from"./createStyle-bbf14939.js"
import{c as X}from"./currentGuildId-4732beaa.js"
import"./intValue-ef353ded.js"
import"./valueText-f1c6f878.js"
import{a as q,g as z,c as J,b as Q}from"./levelHighlight-ec2201dc.js"
import"./fshOpen-da9a149e.js"
import{o as W}from"./openQuickBuffByName-9db0dd32.js"
import{d as Z}from"./dataRows-fa0ec70c.js"
import{c as K}from"./createUl-94da6fbb.js"
import{s as Y,g as tt}from"./idb-cecca562.js"
import{i as et}from"./insertElementAfterBegin-21a4a979.js"
import"./isChecked-ed98077f.js"
import{b as nt}from"./simpleCheckbox-e694b596.js"
import{a as at}from"./alpha-d5278d39.js"
import{c as st}from"./createTBody-b1c8bf61.js"
import{c as ot}from"./createTable-4d32a607.js"
import"./isDate-ad4f47cd.js"
import"./padZ-b87d0d09.js"
import{f as it}from"./formatLocalDateTime-a37bd785.js"
import{u as ct,l as rt,v as lt,c as ft,m as dt,a as ut,g as mt}from"./indexConstants-b81ff7d8.js"
import{c as pt}from"./createBr-455bae6c.js"
import{c as ht}from"./createButton-142ef647.js"
import{c as bt}from"./createTextArea-73104eab.js"
import{d as gt}from"./dialogMsg-9c8d1b20.js"
import{c as jt}from"./createSpan-a26e8f7c.js"
import{h as Ct}from"./hideElement-b0b3e820.js"
import{t as Nt}from"./toggleVisibilty-46d42458.js"
function Lt(t,e){const n=s.exec(e.dataset.tipped)
return _({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function vt(){const s=t("b",e).find(n("Members"))
if(s){const t=a('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
s.classList.add("tip-static"),P(`Active: ${e[0]}/${t.length}<br>Stamina: ${G(e[1])}`,s)}}function St(){}let yt,wt
function kt(t){return yt&&t>=q()&&t<=z()}function $t(t){return wt&&t>=J()&&t<=Q()}const xt=t=>[t,s.exec(t.dataset.tipped)[1]],Mt=([,t])=>t<7,Tt=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],At=([t,e])=>[t.parentNode.parentNode.rowIndex,kt(e),$t(e)]
const Ht=t=>t.map(([t])=>`.fshHighlight tr:nth-child(${t+1})`).join(",")
function Rt(){const t=a('#pCC a[data-tipped*="<td>VL:</td>"]').map(xt).filter(Mt).map(Tt).map(At),n=t.filter(([,t])=>t),s=t.filter(([,t,e])=>!t&&e)
!function(t){if(t.length){const e=Ht(t)+" {background-color: #4671C8;}"
r(document.body,U(e))}}(n),function(t){if(t.length){const e=Ht(t)+" {background-color: #FF9900;}"
r(document.body,U(e))}}(s),function(t,n){if(t.length+n.length){const t=d(o,e)
t[t.length-1].classList.add("fshHighlight")}}(n,s)}function Bt(){Number(f("guild_id"))!==X()&&(yt||wt)&&Rt()}function Et(){yt=l("highlightPlayersNearMyLvl"),wt=l("highlightGvGPlayersNearMyLvl"),Bt(),l("enableHistoryCompressor")&&function(){const n=t(o,e).slice(-2,-1)[0].rows[0].cells[0],a=i({id:"profile-bio",innerHTML:n.innerHTML})
c("",n),r(n,a),F()}()}function Dt(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function It(t){"smallLink"===t.target.className&&W(t.target.previousElementSibling.text)}function Gt(){const t=u(`#pCC a[href^="${m}"]`)
V([5,3,t,0,Dt]),p(e,It)}function _t(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function Pt(t,e){c(e,t.insertCell(-1))}function Vt(t,e,n){const a=t.insertRow(t.rows.length-2)
Pt(a,e),Pt(a,n)}function Ot(t,e){Vt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ft(t,e,n){1===e&&function(t){Vt(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(n),Z(t.rows,7,0).forEach(g(Ot,n))}function Ut(t,e){const n=j(e),a=C('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=C("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Ft(a,e,n)}(n,s,t.node),o>s&&function(t,e,n){_t(t+1).then(g(e,n))}(s,Ut,t)}function Xt(t){const e=t.rows[6].cells[0].children[0]
e&&_t(1).then(g(Ut,{node:e}))}function qt(t){t.target.id===L&&S(L,!l(L))}let zt,Jt,Qt,Wt,Zt,Kt,Yt,te,ee,ne,ae,se,oe
function ie(t,e){return`${t}<option value="${e}">${e}</option>`}function ce(t){return $(t)?"#DEF":t.toLocaleString()}function re(t,e,n){return e+"<tr>"+`<td>${it(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ce(n[rt])}</td>`+`<td class="fshRight">${ce(n[lt])}</td>`+`<td class="fshRight">${ce(n[ft])}</td>`+`<td class="fshRight">${ce(n[dt])}</td>`+`<td class="fshRight">${Math.floor(n[ft]/n[dt]*100)}</td>`+`<td class="fshRight">${n[ut]}</td>`+`<td class="fshRight">${ce(n[mt])}</td></tr>`}function le(t,e){return function(t){return Jt&&"- All -"!==Jt&&Jt!==t}(e)?t:t+Zt[e].reduce(g(re,e),"")}function fe(){Zt&&c(w(Zt).reduce(le,""),zt),Qt.classList.remove("fshSpinner")}function de(){Qt.classList.add("fshSpinner"),k(3,fe)}function ue(t){Jt=t.target.value,de()}function me(t){t&&(Zt=t,c(`<select name="member"><option value="- All -" selected>- All -</option>${w(t).sort(at).reduce(ie,"")}</select>`,Wt),de())}function pe(){const t=y("th",{textContent:"Member"})
return Wt=i(),r(t,Wt),t}function he(){const t=ot({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const n=pe()
r(e,n),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){zt=st(),r(t,zt)}(t),v(t,"change",ue),Qt=i({className:"tgCont fshSpinner64"}),r(Qt,t),Qt}function be(t){Kt.value=t,ee.classList.remove("fshSpinner")}function ge(){Kt.value='{"lastUpdate": 0, "members": {}}'}function je(t){gt("Update successful"),me(t.members)}function Ce(){const t=x(Kt.value)
Y("fsh_guildActivity",t).then(g(je,t)).catch(gt)}function Ne(t,e){const n=ht({className:"custombutton",textContent:t})
return p(n,e),n}function Le(){return ee=i({id:"io",className:"fshSpinner64"}),Kt=bt(),Kt.setAttribute("autocapitalize","off"),Kt.setAttribute("autocomplete","off"),Kt.setAttribute("autocorrect","off"),Kt.setAttribute("spellcheck","false"),Yt=Ne("Save",Ce),te=Ne("Reset",ge),r(ee,Kt),r(ee,pt()),r(ee,Yt),r(ee,te),ee}function ve(){return!ae.checked}function Se(t){ae.checked&&"Escape"===t.code&&(ae.checked=!1)}function ye(t){ve()&&(t.style.transform=null)}function we(){T("guildTracker","updateRawData"),ne&&function(t){t&&(ee.classList.add("fshSpinner"),k(4,be,[t]))}(ne)}function ke(){const t=function(){const t=i({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return oe=I({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(oe,"change",we),r(t,oe),t}(),e=K({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return r(t,e),H(e,t),t}function $e(){const t=ke(),e=function(){const t=i({className:"fsh-dialog-content"})
return r(t,he()),r(t,Le()),t}()
r(t,e),v(ae,"change",g(ye,t)),r(se,t)}function xe(t){t&&(ne=JSON.stringify(t),me(t.members))}function Me(){T("guildTracker","openDialog"),tt("fsh_guildActivity").then(xe),A.dialogIsClosed=ve,h(se,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),$e()}function Te(){!function(){const t=C("#pCC img.guild_openGuildStore"),e=t.parentNode,n=i({className:"fsh-tracker"}),a=i({innerHTML:nt(L)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
v(a,"change",qt),r(n,t),r(n,a),et(e,n)}(),ae=I({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(ae,"change",Me),se=i({className:"fsh-dialog"}),r(se,ae),v(document.body,"keydown",Se),r(document.body,se)}let Ae,He
function Re(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function Be(){He?He.disabled=!Ae:function(){const t=d(o,e),n=t[t.length-1]
n.classList.add("fshProgressBar")
const s=a(R,n).map(Re).join("\n")
He=r(document.body,U(s)).sheet}()}function Ee(){Ae=!Ae,S("enableStamBars",Ae),Be(),T("guildManage","StamBars")}function De(){!function(){const t=C("#pCC img.guild_openGuildStore").parentNode,e=r(t,i({className:"fshCenter",innerHTML:nt("enableStamBars")}))
v(e,"change",Ee)}(),Ae=l("enableStamBars"),Ae&&Be()}function Ie(t,e,n){const a=function(t){return jt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
r(t,function(t){const e=jt({innerHTML:"[&nbsp;"})
return r(e,t),h(e,"&nbsp;]"),e}(a)),e.id=n,l(n)&&Ct(e),p(a,Nt)}function Ge(t){Ie(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function _e(t){const e=t.rows[4].cells[1].children[0]
c(e.innerHTML.trim(),e),Ie(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Pe(t){Ie(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Ve(e){const a=t("b",e).filter(n("Relics"))
if(1!==a.length)return
const s=a[0].parentNode.nextElementSibling.children[0]
c(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function Oe(t){const e=d("li",t),n=e[e.length-1].parentNode
h(n,`<li><a href="${E}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Fe(t,e){k(3,e,[t])}function Ue(t){B()||(l("detailedConflictInfo")&&k(3,Xt,[t]),k(4,Te))}function Xe(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ge,_e,Pe,Ve,Oe].forEach(g(Fe,t))}(t),k(3,Gt),Ue(t),De()}function qe(){const t=C('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function ze(){k(3,O),k(3,qe),k(3,St),k(3,vt),"manage"===A.subcmd&&Xe(),"view"===A.subcmd&&Et()}export default ze
//# sourceMappingURL=guild-d5663a7f.js.map
