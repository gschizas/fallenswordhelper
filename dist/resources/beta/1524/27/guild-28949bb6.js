import{g as t,p as e,b1 as n,D as a,bo as s,d as o,m as i,A as c,h as r,H as l,Q as d,b as f,aa as u,a2 as m,o as p,i as h,u as b,t as g,v as j,C,s as N,bp as L,f as v,Z as S,n as y,ar as w,a as k,aj as $,aL as x,O as M,V as T,c as A,bq as H,E as R,x as B,br as E}from"./calfSystem-70c7a660.js"
import"./numberIsNaN-871eca26.js"
import{p as D}from"./playerName-d7dd0a91.js"
import"./toLowerCase-33399b5a.js"
import{c as I}from"./createInput-1c8df108.js"
import{a as G}from"./addCommas-e12eda5f.js"
import{l as V}from"./onlineDot-0c0af287.js"
import{s as P}from"./setTipped-141d3404.js"
import{b as _}from"./batch-e1df795d.js"
import{c as F}from"./colouredDots-e8d00daa.js"
import"./createLabel-5339f796.js"
import"./insertElementBefore-543d9ef0.js"
import O from"./compressBio-112f1294.js"
import{c as U}from"./createStyle-cb78fc8f.js"
import{c as Q}from"./currentGuildId-b3e9b6a5.js"
import"./intValue-ef353ded.js"
import"./valueText-6c1d3d77.js"
import{a as X,g as Z,c as q,b as z}from"./levelHighlight-0b338177.js"
import"./fshOpen-da9a149e.js"
import{o as J}from"./openQuickBuffByName-caa214c8.js"
import{d as K}from"./dataRows-91ac97a0.js"
import{c as W}from"./createUl-41b45dbb.js"
import{s as Y,g as tt}from"./idb-d93da5f0.js"
import{i as et}from"./insertElementAfterBegin-8a7c1149.js"
import"./isChecked-ed98077f.js"
import{b as nt}from"./simpleCheckbox-334243d2.js"
import{a as at}from"./alpha-d5278d39.js"
import{c as st}from"./createTBody-0057c25b.js"
import{c as ot}from"./createTable-72dc1b73.js"
import"./isDate-ad4f47cd.js"
import"./padZ-b87d0d09.js"
import{f as it}from"./formatLocalDateTime-a37bd785.js"
import{u as ct,l as rt,v as lt,c as dt,m as ft,a as ut,g as mt}from"./indexConstants-b81ff7d8.js"
import{c as pt,t as ht}from"./toggleVisibilty-2e6836d2.js"
import{c as bt}from"./createButton-e241a765.js"
import{c as gt}from"./createTextArea-6e3d33ab.js"
import{d as jt}from"./dialogMsg-9c8d1b20.js"
import{c as Ct}from"./createSpan-fc68466d.js"
import{h as Nt}from"./hideElement-b0b3e820.js"
function Lt(t,e){const n=s.exec(e.dataset.tipped)
return V({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function vt(){const s=t("b",e).find(n("Members"))
if(s){const t=a('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
s.classList.add("tip-static"),P(`Active: ${e[0]}/${t.length}<br>Stamina: ${G(e[1])}`,s)}}let St,yt
function wt(t){return St&&t>=X()&&t<=Z()}function kt(t){return yt&&t>=q()&&t<=z()}const $t=t=>[t,s.exec(t.dataset.tipped)[1]],xt=([,t])=>t<7,Mt=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],Tt=([t,e])=>[t.parentNode.parentNode.rowIndex,wt(e),kt(e)]
const At=t=>t.map(([t])=>`.fshHighlight tr:nth-child(${t+1})`).join(",")
function Ht(){const t=a('#pCC a[data-tipped*="<td>VL:</td>"]').map($t).filter(xt).map(Mt).map(Tt),n=t.filter(([,t])=>t),s=t.filter(([,t,e])=>!t&&e)
!function(t){if(t.length){const e=At(t)+" {background-color: #4671C8;}"
r(document.body,U(e))}}(n),function(t){if(t.length){const e=At(t)+" {background-color: #FF9900;}"
r(document.body,U(e))}}(s),function(t,n){if(t.length+n.length){const t=f(o,e)
t[t.length-1].classList.add("fshHighlight")}}(n,s)}function Rt(){Number(d("guild_id"))!==Q()&&(St||yt)&&Ht()}function Bt(){St=l("highlightPlayersNearMyLvl"),yt=l("highlightGvGPlayersNearMyLvl"),Rt(),l("enableHistoryCompressor")&&function(){const n=t(o,e).slice(-2,-1)[0].rows[0].cells[0],a=i({id:"profile-bio",innerHTML:n.innerHTML})
c("",n),r(n,a),O()}()}function Et(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function Dt(t){"smallLink"===t.target.className&&J(t.target.previousElementSibling.text)}function It(){const t=u(`#pCC a[href^="${m}"]`)
_([5,3,t,0,Et]),p(e,Dt)}function Gt(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function Vt(t,e){c(e,t.insertCell(-1))}function Pt(t,e,n){const a=t.insertRow(t.rows.length-2)
Vt(a,e),Vt(a,n)}function _t(t,e){Pt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ft(t,e,n){1===e&&function(t){Pt(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(n),K(t.rows,7,0).forEach(g(_t,n))}function Ot(t,e){const n=j(e),a=C('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=C("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Ft(a,e,n)}(n,s,t.node),o>s&&function(t,e,n){Gt(t+1).then(g(e,n))}(s,Ot,t)}function Ut(t){const e=t.rows[6].cells[0].children[0]
e&&Gt(1).then(g(Ot,{node:e}))}function Qt(t){t.target.id===L&&S(L,!l(L))}let Xt,Zt,qt,zt,Jt,Kt,Wt,Yt,te,ee,ne,ae,se
function oe(t,e){return`${t}<option value="${e}">${e}</option>`}function ie(t){return $(t)?"#DEF":t.toLocaleString()}function ce(t,e,n){return e+"<tr>"+`<td>${it(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ie(n[rt])}</td>`+`<td class="fshRight">${ie(n[lt])}</td>`+`<td class="fshRight">${ie(n[dt])}</td>`+`<td class="fshRight">${ie(n[ft])}</td>`+`<td class="fshRight">${Math.floor(n[dt]/n[ft]*100)}</td>`+`<td class="fshRight">${n[ut]}</td>`+`<td class="fshRight">${ie(n[mt])}</td></tr>`}function re(t,e){return function(t){return Zt&&"- All -"!==Zt&&Zt!==t}(e)?t:t+Jt[e].reduce(g(ce,e),"")}function le(){Jt&&c(w(Jt).reduce(re,""),Xt),qt.classList.remove("fshSpinner")}function de(){qt.classList.add("fshSpinner"),k(3,le)}function fe(t){Zt=t.target.value,de()}function ue(t){t&&(Jt=t,c(`<select name="member"><option value="- All -" selected>- All -</option>${w(t).sort(at).reduce(oe,"")}</select>`,zt),de())}function me(){const t=y("th",{textContent:"Member"})
return zt=i(),r(t,zt),t}function pe(){const t=ot({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const n=me()
r(e,n),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){Xt=st(),r(t,Xt)}(t),v(t,"change",fe),qt=i({className:"tgCont fshSpinner64"}),r(qt,t),qt}function he(t){Kt.value=t,te.classList.remove("fshSpinner")}function be(){Kt.value='{"lastUpdate": 0, "members": {}}'}function ge(t){jt("Update successful"),ue(t.members)}function je(){const t=x(Kt.value)
Y("fsh_guildActivity",t).then(g(ge,t)).catch(jt)}function Ce(t,e){const n=bt({className:"custombutton",textContent:t})
return p(n,e),n}function Ne(){return te=i({id:"io",className:"fshSpinner64"}),Kt=gt(),Kt.setAttribute("autocapitalize","off"),Kt.setAttribute("autocomplete","off"),Kt.setAttribute("autocorrect","off"),Kt.setAttribute("spellcheck","false"),Wt=Ce("Save",je),Yt=Ce("Reset",be),r(te,Kt),r(te,pt()),r(te,Wt),r(te,Yt),te}function Le(){return!ne.checked}function ve(t){ne.checked&&"Escape"===t.code&&(ne.checked=!1)}function Se(t){Le()&&(t.style.transform=null)}function ye(){T("guildTracker","updateRawData"),ee&&function(t){t&&(te.classList.add("fshSpinner"),k(4,he,[t]))}(ee)}function we(){const t=function(){const t=i({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return se=I({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(se,"change",ye),r(t,se),t}(),e=W({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return r(t,e),H(e,t),t}function ke(){const t=we(),e=function(){const t=i({className:"fsh-dialog-content"})
return r(t,pe()),r(t,Ne()),t}()
r(t,e),v(ne,"change",g(Se,t)),r(ae,t)}function $e(t){t&&(ee=JSON.stringify(t),ue(t.members))}function xe(){T("guildTracker","openDialog"),tt("fsh_guildActivity").then($e),A.dialogIsClosed=Le,h(ae,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),ke()}function Me(){!function(){const t=C("#pCC img.guild_openGuildStore"),e=t.parentNode,n=i({className:"fsh-tracker"}),a=i({innerHTML:nt(L)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
v(a,"change",Qt),r(n,t),r(n,a),et(e,n)}(),ne=I({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(ne,"change",xe),ae=i({className:"fsh-dialog"}),r(ae,ne),v(document.body,"keydown",ve),r(document.body,ae)}let Te,Ae
function He(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function Re(){Ae?Ae.disabled=!Te:function(){const t=f(o,e),n=t[t.length-1]
n.classList.add("fshProgressBar")
const s=a(R,n).map(He).join("\n")
Ae=r(document.body,U(s)).sheet}()}function Be(){Te=!Te,S("enableStamBars",Te),Re(),T("guildManage","StamBars")}function Ee(){!function(){const t=C("#pCC img.guild_openGuildStore").parentNode,e=r(t,i({className:"fshCenter",innerHTML:nt("enableStamBars")}))
v(e,"change",Be)}(),Te=l("enableStamBars"),Te&&Re()}function De(t,e,n){const a=function(t){return Ct({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
r(t,function(t){const e=Ct({innerHTML:"[&nbsp;"})
return r(e,t),h(e,"&nbsp;]"),e}(a)),e.id=n,l(n)&&Nt(e),p(a,ht)}function Ie(t){De(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ge(t){const e=t.rows[4].cells[1].children[0]
c(e.innerHTML.trim(),e),De(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Ve(t){De(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Pe(e){const a=t("b",e).filter(n("Relics"))
if(1!==a.length)return
const s=a[0].parentNode.nextElementSibling.children[0]
c(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function _e(t){const e=f("li",t),n=e[e.length-1].parentNode
h(n,`<li><a href="${E}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Fe(t,e){k(3,e,[t])}function Oe(t){B()||(l("detailedConflictInfo")&&k(3,Ut,[t]),k(4,Me))}function Ue(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ie,Ge,Ve,Pe,_e].forEach(g(Fe,t))}(t),k(3,It),Oe(t),Ee()}function Qe(){const t=C('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function Xe(){k(3,F),k(3,Qe),k(3,vt),"manage"===A.subcmd&&Ue(),"view"===A.subcmd&&Bt()}export default Xe
//# sourceMappingURL=guild-28949bb6.js.map
