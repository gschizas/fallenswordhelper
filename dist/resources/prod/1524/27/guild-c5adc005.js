import{g as t,p as e,a$ as n,D as a,bj as s,d as o,m as i,A as r,h as c,H as l,Q as d,b as f,aa as u,a2 as m,o as p,i as h,u as b,t as g,v as j,C,s as N,bk as L,f as v,Z as S,n as y,ar as k,a as w,aj as $,aL as x,O as M,V as T,c as A,bl as H,E as R,x as B,bm as E}from"./calfSystem-3bdf319e.js"
import"./numberIsNaN-871eca26.js"
import{p as D}from"./playerName-26a1f7d9.js"
import"./toLowerCase-33399b5a.js"
import{c as I}from"./createInput-52b88e62.js"
import{a as G}from"./addCommas-e12eda5f.js"
import{l as V}from"./onlineDot-d9e2b3a9.js"
import{s as P}from"./setTipped-141d3404.js"
import{b as _}from"./batch-06380bde.js"
import{c as F}from"./colouredDots-1ad7dddc.js"
import"./createLabel-5e5a446f.js"
import"./insertElementBefore-543d9ef0.js"
import O from"./compressBio-e2c240da.js"
import{c as U}from"./createStyle-41532d32.js"
import{c as Q}from"./currentGuildId-e8170186.js"
import"./intValue-ef353ded.js"
import"./valueText-0f01a014.js"
import{a as X,g as Z,c as z,b as J}from"./levelHighlight-63484977.js"
import"./fshOpen-da9a149e.js"
import{o as q}from"./openQuickBuffByName-223a30ec.js"
import{d as K}from"./dataRows-2d50b364.js"
import{c as W}from"./createUl-4c832f49.js"
import{s as Y,g as tt}from"./idb-31fb041e.js"
import{i as et}from"./insertElementAfterBegin-788dea7e.js"
import"./isChecked-ed98077f.js"
import{b as nt}from"./simpleCheckbox-4f2c6115.js"
import{a as at}from"./alpha-d5278d39.js"
import{c as st}from"./createTBody-e1fd2ed4.js"
import{c as ot}from"./createTable-bf1faf4f.js"
import"./isDate-ad4f47cd.js"
import"./padZ-b87d0d09.js"
import{f as it}from"./formatLocalDateTime-a37bd785.js"
import{u as rt,l as ct,v as lt,c as dt,m as ft,a as ut,g as mt}from"./indexConstants-b81ff7d8.js"
import{c as pt,t as ht}from"./toggleVisibilty-0cda9d69.js"
import{c as bt}from"./createButton-ef816a4f.js"
import{c as gt}from"./createTextArea-075f36de.js"
import{d as jt}from"./dialogMsg-9c8d1b20.js"
import{c as Ct}from"./createSpan-a10d5602.js"
import{h as Nt}from"./hideElement-b0b3e820.js"
function Lt(t,e){const n=s.exec(e.dataset.tipped)
return V({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function vt(){const s=t("b",e).find(n("Members"))
if(s){const t=a('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
s.classList.add("tip-static"),P(`Active: ${e[0]}/${t.length}<br>Stamina: ${G(e[1])}`,s)}}let St,yt
function kt(t){return St&&t>=X()&&t<=Z()}function wt(t){return yt&&t>=z()&&t<=J()}const $t=t=>[t,s.exec(t.dataset.tipped)[1]],xt=([,t])=>t<7,Mt=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],Tt=([t,e])=>[t.parentNode.parentNode.rowIndex,kt(e),wt(e)]
const At=t=>t.map(([t])=>`.fshHighlight tr:nth-child(${t+1})`).join(",")
function Ht(){const t=a('#pCC a[data-tipped*="<td>VL:</td>"]').map($t).filter(xt).map(Mt).map(Tt),n=t.filter(([,t])=>t),s=t.filter(([,t,e])=>!t&&e)
!function(t){if(t.length){const e=At(t)+" {background-color: #4671C8;}"
c(document.body,U(e))}}(n),function(t){if(t.length){const e=At(t)+" {background-color: #FF9900;}"
c(document.body,U(e))}}(s),function(t,n){if(t.length+n.length){const t=f(o,e)
t[t.length-1].classList.add("fshHighlight")}}(n,s)}function Rt(){Number(d("guild_id"))!==Q()&&(St||yt)&&Ht()}function Bt(){St=l("highlightPlayersNearMyLvl"),yt=l("highlightGvGPlayersNearMyLvl"),Rt(),l("enableHistoryCompressor")&&function(){const n=t(o,e).slice(-2,-1)[0].rows[0].cells[0],a=i({id:"profile-bio",innerHTML:n.innerHTML})
r("",n),c(n,a),O()}()}function Et(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function Dt(t){"smallLink"===t.target.className&&q(t.target.previousElementSibling.text)}function It(){const t=u(`#pCC a[href^="${m}"]`)
_([5,3,t,0,Et]),p(e,Dt)}function Gt(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function Vt(t,e){r(e,t.insertCell(-1))}function Pt(t,e,n){const a=t.insertRow(t.rows.length-2)
Vt(a,e),Vt(a,n)}function _t(t,e){Pt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ft(t,e,n){1===e&&function(t){Pt(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(n),K(t.rows,7,0).forEach(g(_t,n))}function Ot(t,e){const n=j(e),a=C('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=C("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Ft(a,e,n)}(n,s,t.node),o>s&&function(t,e,n){Gt(t+1).then(g(e,n))}(s,Ot,t)}function Ut(t){const e=t.rows[6].cells[0].children[0]
e&&Gt(1).then(g(Ot,{node:e}))}function Qt(t){t.target.id===L&&S(L,!l(L))}let Xt,Zt,zt,Jt,qt,Kt,Wt,Yt,te,ee,ne,ae,se
function oe(t,e){return`${t}<option value="${e}">${e}</option>`}function ie(t){return $(t)?"#DEF":t.toLocaleString()}function re(t,e,n){return e+"<tr>"+`<td>${it(new Date(1e3*n[rt]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ie(n[ct])}</td>`+`<td class="fshRight">${ie(n[lt])}</td>`+`<td class="fshRight">${ie(n[dt])}</td>`+`<td class="fshRight">${ie(n[ft])}</td>`+`<td class="fshRight">${Math.floor(n[dt]/n[ft]*100)}</td>`+`<td class="fshRight">${n[ut]}</td>`+`<td class="fshRight">${ie(n[mt])}</td></tr>`}function ce(t,e){return function(t){return Zt&&"- All -"!==Zt&&Zt!==t}(e)?t:t+qt[e].reduce(g(re,e),"")}function le(){qt&&r(k(qt).reduce(ce,""),Xt),zt.classList.remove("fshSpinner")}function de(){zt.classList.add("fshSpinner"),w(3,le)}function fe(t){Zt=t.target.value,de()}function ue(t){t&&(qt=t,r(`<select name="member"><option value="- All -" selected>- All -</option>${k(t).sort(at).reduce(oe,"")}</select>`,Jt),de())}function me(){const t=y("th",{textContent:"Member"})
return Jt=i(),c(t,Jt),t}function pe(){const t=ot({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const n=me()
c(e,n),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){Xt=st(),c(t,Xt)}(t),v(t,"change",fe),zt=i({className:"tgCont fshSpinner64"}),c(zt,t),zt}function he(t){Kt.value=t,te.classList.remove("fshSpinner")}function be(){Kt.value='{"lastUpdate": 0, "members": {}}'}function ge(t){jt("Update successful"),ue(t.members)}function je(){const t=x(Kt.value)
Y("fsh_guildActivity",t).then(g(ge,t)).catch(jt)}function Ce(t,e){const n=bt({className:"custombutton",textContent:t})
return p(n,e),n}function Ne(){return te=i({id:"io",className:"fshSpinner64"}),Kt=gt(),Kt.setAttribute("autocapitalize","off"),Kt.setAttribute("autocomplete","off"),Kt.setAttribute("autocorrect","off"),Kt.setAttribute("spellcheck","false"),Wt=Ce("Save",je),Yt=Ce("Reset",be),c(te,Kt),c(te,pt()),c(te,Wt),c(te,Yt),te}function Le(){return!ne.checked}function ve(t){ne.checked&&"Escape"===t.code&&(ne.checked=!1)}function Se(t){Le()&&(t.style.transform=null)}function ye(){T("guildTracker","updateRawData"),ee&&function(t){t&&(te.classList.add("fshSpinner"),w(4,he,[t]))}(ee)}function ke(){const t=function(){const t=i({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return se=I({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(se,"change",ye),c(t,se),t}(),e=W({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return c(t,e),H(e,t),t}function we(){const t=ke(),e=function(){const t=i({className:"fsh-dialog-content"})
return c(t,pe()),c(t,Ne()),t}()
c(t,e),v(ne,"change",g(Se,t)),c(ae,t)}function $e(t){t&&(ee=JSON.stringify(t),ue(t.members))}function xe(){T("guildTracker","openDialog"),tt("fsh_guildActivity").then($e),A.dialogIsClosed=Le,h(ae,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),we()}function Me(){!function(){const t=C("#pCC img.guild_openGuildStore"),e=t.parentNode,n=i({className:"fsh-tracker"}),a=i({innerHTML:nt(L)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
v(a,"change",Qt),c(n,t),c(n,a),et(e,n)}(),ne=I({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(ne,"change",xe),ae=i({className:"fsh-dialog"}),c(ae,ne),v(document.body,"keydown",ve),c(document.body,ae)}let Te,Ae
function He(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function Re(){Ae?Ae.disabled=!Te:function(){const t=f(o,e),n=t[t.length-1]
n.classList.add("fshProgressBar")
const s=a(R,n).map(He).join("\n")
Ae=c(document.body,U(s)).sheet}()}function Be(){Te=!Te,S("enableStamBars",Te),Re(),T("guildManage","StamBars")}function Ee(){!function(){const t=C("#pCC img.guild_openGuildStore").parentNode,e=c(t,i({className:"fshCenter",innerHTML:nt("enableStamBars")}))
v(e,"change",Be)}(),Te=l("enableStamBars"),Te&&Re()}function De(t,e,n){const a=function(t){return Ct({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
c(t,function(t){const e=Ct({innerHTML:"[&nbsp;"})
return c(e,t),h(e,"&nbsp;]"),e}(a)),e.id=n,l(n)&&Nt(e),p(a,ht)}function Ie(t){De(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ge(t){const e=t.rows[4].cells[1].children[0]
r(e.innerHTML.trim(),e),De(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Ve(t){De(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Pe(e){const a=t("b",e).filter(n("Relics"))
if(1!==a.length)return
const s=a[0].parentNode.nextElementSibling.children[0]
r(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function _e(t){const e=f("li",t),n=e[e.length-1].parentNode
h(n,`<li><a href="${E}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Fe(t,e){w(3,e,[t])}function Oe(t){B()||(l("detailedConflictInfo")&&w(3,Ut,[t]),w(4,Me))}function Ue(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ie,Ge,Ve,Pe,_e].forEach(g(Fe,t))}(t),w(3,It),Oe(t),Ee()}function Qe(){const t=C('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function Xe(){w(3,F),w(3,Qe),w(3,vt),"manage"===A.subcmd&&Ue(),"view"===A.subcmd&&Bt()}export default Xe
//# sourceMappingURL=guild-c5adc005.js.map
