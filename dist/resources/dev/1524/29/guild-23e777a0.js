import{g as t,p as e,a4 as n,D as a,bp as s,C as o,i,d as c,m as r,A as l,h as f,H as d,R as u,b as m,ab as p,a2 as h,o as b,u as g,t as j,v as C,s as N,bq as L,f as S,Z as v,n as y,au as k,a as w,ak as $,aN as x,O as M,V as T,c as A,br as H,E as R,x as B,bs as E}from"./calfSystem-02c48ff5.js"
import"./numberIsNaN-d1ebf732.js"
import{p as D}from"./playerName-5ca71009.js"
import"./toLowerCase-0a22477f.js"
import{c as I}from"./createInput-6ef511c8.js"
import{a as G}from"./addCommas-0aacc5f1.js"
import{l as P}from"./onlineDot-a1876042.js"
import{s as V}from"./setTipped-56aeba85.js"
import{b as X}from"./batch-a00528f6.js"
import{c as _}from"./colouredDots-11b94259.js"
import"./createLabel-14fb38bd.js"
import"./insertElementBefore-7e0a7ce8.js"
import F from"./compressBio-970dcb6f.js"
import{c as O}from"./createStyle-a35475d1.js"
import{c as U}from"./currentGuildId-cefcefd6.js"
import"./intValue-f94761c7.js"
import"./valueText-65f55d5b.js"
import{a as Z,g as q,c as z,b as J}from"./levelHighlight-99d5b481.js"
import"./fshOpen-71b2b356.js"
import{o as Q}from"./openQuickBuffByName-6e7bf41a.js"
import{d as K}from"./dataRows-46078e55.js"
import{c as W}from"./createUl-50d3a920.js"
import{s as Y,g as tt}from"./idb-49c5b621.js"
import{i as et}from"./insertElementAfterBegin-b26662c0.js"
import"./isChecked-92297855.js"
import{b as nt}from"./simpleCheckbox-5230523e.js"
import{a as at}from"./alpha-90aef395.js"
import{c as st}from"./createTBody-41a1ab82.js"
import{c as ot}from"./createTable-b0dd7860.js"
import"./isDate-14b56c12.js"
import"./padZ-a3ed1fe1.js"
import{f as it}from"./formatLocalDateTime-c07c341a.js"
import{u as ct,l as rt,v as lt,c as ft,m as dt,a as ut,g as mt}from"./indexConstants-1b0a7800.js"
import{c as pt}from"./createBr-467e74dc.js"
import{c as ht}from"./createButton-b782218b.js"
import{c as bt}from"./createTextArea-5ab7de2d.js"
import{d as gt}from"./dialogMsg-920f7637.js"
import{c as jt}from"./createSpan-1a0a0b1a.js"
import{h as Ct}from"./hideElement-a8c1e8d6.js"
import{t as Nt}from"./toggleVisibilty-3063e5d8.js"
function Lt(t,e){const n=s.exec(e.dataset.tipped)
return P({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function St(){const s=t("b",e).find(n("Members"))
if(s){const t=a('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
s.classList.add("tip-static"),V(`Active: ${e[0]}/${t.length}<br>Stamina: ${G(e[1])}`,s)}}function vt(t,e){let n
const a=t.replace(/,/g,"").match(e)
return n=a?parseInt(a[1],10):0,n}function yt(t){const e=t.dataset.tipped,n=vt(e,/XP Lock: <b>(\d*)/),a=vt(e,/XP: <b>(\d*)/)
i(t.parentNode.nextElementSibling,` (<b>${function(t,e){let n=""
return t>e&&(n="+"),n+G(t-e)}(a,n)}</b>)`)}function kt(){const t=o('#pCC a[data-tipped^="<b>Guild XP</b>"]')
t&&yt(t)}let wt,$t
function xt(t){return wt&&t>=Z()&&t<=q()}function Mt(t){return $t&&t>=z()&&t<=J()}const Tt=t=>[t,s.exec(t.dataset.tipped)[1]],At=([,t])=>t<7,Ht=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],Rt=([t,e])=>[t.parentNode.parentNode.rowIndex,xt(e),Mt(e)]
const Bt=t=>t.map(([t])=>`.fshHighlight tr:nth-child(${t+1})`).join(",")
function Et(){const t=a('#pCC a[data-tipped*="<td>VL:</td>"]').map(Tt).filter(At).map(Ht).map(Rt),n=t.filter(([,t])=>t),s=t.filter(([,t,e])=>!t&&e)
!function(t){if(t.length){const e=Bt(t)+" {background-color: #4671C8;}"
f(document.body,O(e))}}(n),function(t){if(t.length){const e=Bt(t)+" {background-color: #FF9900;}"
f(document.body,O(e))}}(s),function(t,n){if(t.length+n.length){const t=m(c,e)
t[t.length-1].classList.add("fshHighlight")}}(n,s)}function Dt(){Number(u("guild_id"))!==U()&&(wt||$t)&&Et()}function It(){wt=d("highlightPlayersNearMyLvl"),$t=d("highlightGvGPlayersNearMyLvl"),Dt(),d("enableHistoryCompressor")&&function(){const n=t(c,e).slice(-2,-1)[0].rows[0].cells[0],a=r({id:"profile-bio",innerHTML:n.innerHTML})
l("",n),f(n,a),F()}()}function Gt(t){i(t.parentNode,' <span class="smallLink">[b]</span>')}function Pt(t){"smallLink"===t.target.className&&Q(t.target.previousElementSibling.text)}function Vt(){const t=p(`#pCC a[href^="${h}"]`)
X([5,3,t,0,Gt]),b(e,Pt)}function Xt(t){return g({cmd:"guild",subcmd:"conflicts",page:t})}function _t(t,e){l(e,t.insertCell(-1))}function Ft(t,e,n){const a=t.insertRow(t.rows.length-2)
_t(a,e),_t(a,n)}function Ot(t,e){Ft(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ut(t,e,n){1===e&&function(t){Ft(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(n),K(t.rows,7,0).forEach(j(Ot,n))}function Zt(t,e){const n=C(e),a=o('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=o("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Ut(a,e,n)}(n,s,t.node),i>s&&function(t,e,n){Xt(t+1).then(j(e,n))}(s,Zt,t)}function qt(t){const e=t.rows[6].cells[0].children[0]
e&&Xt(1).then(j(Zt,{node:e}))}function zt(t){t.target.id===L&&v(L,!d(L))}let Jt,Qt,Kt,Wt,Yt,te,ee,ne,ae,se,oe,ie,ce
function re(t,e){return`${t}<option value="${e}">${e}</option>`}function le(t){return $(t)?"#DEF":t.toLocaleString()}function fe(t,e,n){return e+"<tr>"+`<td>${it(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${le(n[rt])}</td>`+`<td class="fshRight">${le(n[lt])}</td>`+`<td class="fshRight">${le(n[ft])}</td>`+`<td class="fshRight">${le(n[dt])}</td>`+`<td class="fshRight">${Math.floor(n[ft]/n[dt]*100)}</td>`+`<td class="fshRight">${n[ut]}</td>`+`<td class="fshRight">${le(n[mt])}</td></tr>`}function de(t,e){return function(t){return Qt&&"- All -"!==Qt&&Qt!==t}(e)?t:t+Yt[e].reduce(j(fe,e),"")}function ue(){Yt&&l(k(Yt).reduce(de,""),Jt),Kt.classList.remove("fshSpinner")}function me(){Kt.classList.add("fshSpinner"),w(3,ue)}function pe(t){Qt=t.target.value,me()}function he(t){t&&(Yt=t,l(`<select name="member"><option value="- All -" selected>- All -</option>${k(t).sort(at).reduce(re,"")}</select>`,Wt),me())}function be(){const t=y("th",{textContent:"Member"})
return Wt=r(),f(t,Wt),t}function ge(){const t=ot({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
i(e,"<th>Date</th>")
const n=be()
f(e,n),i(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){Jt=st(),f(t,Jt)}(t),S(t,"change",pe),Kt=r({className:"tgCont fshSpinner64"}),f(Kt,t),Kt}function je(t){te.value=t,ae.classList.remove("fshSpinner")}function Ce(){te.value='{"lastUpdate": 0, "members": {}}'}function Ne(t){gt("Update successful"),he(t.members)}function Le(){const t=x(te.value)
Y("fsh_guildActivity",t).then(j(Ne,t)).catch(gt)}function Se(t,e){const n=ht({className:"custombutton",textContent:t})
return b(n,e),n}function ve(){return ae=r({id:"io",className:"fshSpinner64"}),te=bt(),te.setAttribute("autocapitalize","off"),te.setAttribute("autocomplete","off"),te.setAttribute("autocorrect","off"),te.setAttribute("spellcheck","false"),ee=Se("Save",Le),ne=Se("Reset",Ce),f(ae,te),f(ae,pt()),f(ae,ee),f(ae,ne),ae}function ye(){return!oe.checked}function ke(t){oe.checked&&"Escape"===t.code&&(oe.checked=!1)}function we(t){ye()&&(t.style.transform=null)}function $e(){T("guildTracker","updateRawData"),se&&function(t){t&&(ae.classList.add("fshSpinner"),w(4,je,[t]))}(se)}function xe(){const t=function(){const t=r({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return ce=I({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(ce,"change",$e),f(t,ce),t}(),e=W({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return f(t,e),H(e,t),t}function Me(){const t=xe(),e=function(){const t=r({className:"fsh-dialog-content"})
return f(t,ge()),f(t,ve()),t}()
f(t,e),S(oe,"change",j(we,t)),f(ie,t)}function Te(t){t&&(se=JSON.stringify(t),he(t.members))}function Ae(){T("guildTracker","openDialog"),tt("fsh_guildActivity").then(Te),A.dialogIsClosed=ye,i(ie,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Me()}function He(){!function(){const t=o("#pCC img.guild_openGuildStore"),e=t.parentNode,n=r({className:"fsh-tracker"}),a=r({innerHTML:nt(L)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
S(a,"change",zt),f(n,t),f(n,a),et(e,n)}(),oe=I({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(oe,"change",Ae),ie=r({className:"fsh-dialog"}),f(ie,oe),S(document.body,"keydown",ke),f(document.body,ie)}let Re,Be
function Ee(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function De(){Be?Be.disabled=!Re:function(){const t=m(c,e),n=t[t.length-1]
n.classList.add("fshProgressBar")
const s=a(R,n).map(Ee).join("\n")
Be=f(document.body,O(s)).sheet}()}function Ie(){Re=!Re,v("enableStamBars",Re),De(),T("guildManage","StamBars")}function Ge(){!function(){const t=o("#pCC img.guild_openGuildStore").parentNode,e=f(t,r({className:"fshCenter",innerHTML:nt("enableStamBars")}))
S(e,"change",Ie)}(),Re=d("enableStamBars"),Re&&De()}function Pe(t,e,n){const a=function(t){return jt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
f(t,function(t){const e=jt({innerHTML:"[&nbsp;"})
return f(e,t),i(e,"&nbsp;]"),e}(a)),e.id=n,d(n)&&Ct(e),b(a,Nt)}function Ve(t){Pe(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Xe(t){const e=t.rows[4].cells[1].children[0]
l(e.innerHTML.trim(),e),Pe(e,t.rows[6].cells[0].children[0],"statisticsControl")}function _e(t){Pe(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Fe(e){const a=t("b",e).filter(n("Relics"))
if(1!==a.length)return
const s=a[0].parentNode.nextElementSibling.children[0]
l(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function Oe(t){const e=m("li",t),n=e[e.length-1].parentNode
i(n,`<li><a href="${E}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ue(t,e){w(3,e,[t])}function Ze(t){B()||(d("detailedConflictInfo")&&w(3,qt,[t]),w(4,He))}function qe(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ve,Xe,_e,Fe,Oe].forEach(j(Ue,t))}(t),w(3,Vt),Ze(t),Ge()}function ze(){const t=o('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function Je(){w(3,_),w(3,ze),w(3,kt),w(3,St),"manage"===A.subcmd&&qe(),"view"===A.subcmd&&It()}export default Je
//# sourceMappingURL=guild-23e777a0.js.map
