import{a as t}from"./addCommas-02eed580.js"
import{g as e,p as n,ar as s,D as a,bv as o,C as i,i as c,d as r,m as l,A as f,h as d,H as u,Q as m,b as p,a9 as h,a1 as b,o as g,u as j,t as C,v as N,s as L,bw as v,f as S,Y as y,n as $,aN as w,a as k,aH as x,b2 as M,O as T,U as A,c as H,bx as E,E as R,x as B,by as D}from"./calfSystem-47fc08ae.js"
import{l as I}from"./onlineDot-b5276d0b.js"
import{s as G}from"./setTipped-777d443c.js"
import{c as P}from"./colouredDots-06e12c69.js"
import V from"./compressBio-1d72d6bf.js"
import{c as X}from"./createStyle-79bfd08a.js"
import{c as _}from"./currentGuildId-72bd2a1a.js"
import{a as U,g as F,c as O,b as Q}from"./levelHighlight-9f8be46e.js"
import{b as z}from"./batch-cd69b94b.js"
import{o as J}from"./openQuickBuffByName-af8be47a.js"
import{d as Y}from"./dataRows-90e5f812.js"
import{c as Z}from"./createInput-e0371f2c.js"
import{c as q}from"./createUl-9aef984f.js"
import{s as K,g as W}from"./idb-b72d80f0.js"
import{i as tt}from"./insertElementAfterBegin-dabff013.js"
import{b as et}from"./simpleCheckbox-c51e0696.js"
import{a as nt}from"./alpha-80a926ba.js"
import{c as st}from"./createTBody-f6ac95b4.js"
import{c as at}from"./createTable-c916e6a3.js"
import{f as ot}from"./formatLocalDateTime-4d542cb2.js"
import{u as it,l as ct,v as rt,c as lt,m as ft,a as dt,g as ut}from"./indexConstants-dd933112.js"
import{c as mt,t as pt}from"./toggleVisibilty-62206359.js"
import{c as ht}from"./createButton-ee808427.js"
import{c as bt}from"./createTextArea-21111f1b.js"
import{d as gt}from"./dialogMsg-844edf4e.js"
import{p as jt}from"./playerName-118d0325.js"
import{c as Ct}from"./createSpan-6b0a8c35.js"
import{h as Nt}from"./hideElement-d4551277.js"
import"./createLabel-2edf29c6.js"
import"./insertElementBefore-43970b1f.js"
import"./intValue-e7ef611d.js"
import"./valueText-d53d9568.js"
import"./fshOpen-bec182a3.js"
import"./isChecked-1c18cd61.js"
import"./toLowerCase-51740687.js"
import"./isDate-3e775446.js"
import"./numberIsNaN-53300e34.js"
import"./padZ-4bdbf4bf.js"
function Lt(t,e){const n=o.exec(e.dataset.tipped)
return I({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function vt(){const o=e("b",n).find(s("Members"))
if(o){const e=a('#pCC a[data-tipped*="Last Activity"]'),n=function(t){return t.reduce(Lt,[0,0])}(e)
o.classList.add("tip-static"),G(`Active: ${n[0]}/${e.length}<br>Stamina: ${t(n[1])}`,o)}}function St(t,e){let n
const s=t.replace(/,/g,"").match(e)
return n=s?parseInt(s[1],10):0,n}function yt(e){const n=e.dataset.tipped,s=St(n,/XP Lock: <b>(\d*)/),a=St(n,/XP: <b>(\d*)/)
c(e.parentNode.nextElementSibling,` (<b>${function(e,n){let s=""
return e>n&&(s="+"),s+t(e-n)}(a,s)}</b>)`)}function $t(){const t=i('#pCC a[data-tipped^="<b>Guild XP</b>"]')
t&&yt(t)}let wt,kt
function xt(t){return wt&&t>=U()&&t<=F()}function Mt(t){return kt&&t>=O()&&t<=Q()}const Tt=t=>[t,o.exec(t.dataset.tipped)[1]],At=([,t])=>t<7,Ht=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],Et=([t,e])=>[t.parentNode.parentNode.rowIndex,xt(e),Mt(e)]
const Rt=t=>t.map((([t])=>`.fshHighlight tr:nth-child(${t+1})`)).join(",")
function Bt(){const t=a('#pCC a[data-tipped*="<td>VL:</td>"]').map(Tt).filter(At).map(Ht).map(Et),e=t.filter((([,t])=>t)),s=t.filter((([,t,e])=>!t&&e))
!function(t){if(t.length){const e=`${Rt(t)} {background-color: #4671C8;}`
d(document.body,X(e))}}(e),function(t){if(t.length){const e=`${Rt(t)} {background-color: #FF9900;}`
d(document.body,X(e))}}(s),function(t,e){if(t.length+e.length){const t=p(r,n)
t[t.length-1].classList.add("fshHighlight")}}(e,s)}function Dt(){Number(m("guild_id"))!==_()&&(wt||kt)&&Bt()}function It(){wt=u("highlightPlayersNearMyLvl"),kt=u("highlightGvGPlayersNearMyLvl"),Dt(),u("enableHistoryCompressor")&&function(){const t=e(r,n).slice(-2,-1)[0].rows[0].cells[0],s=l({id:"profile-bio",innerHTML:t.innerHTML})
f("",t),d(t,s),V()}()}function Gt(t){c(t.parentNode,' <span class="smallLink">[b]</span>')}function Pt(t){"smallLink"===t.target.className&&J(t.target.previousElementSibling.text)}function Vt(){const t=h(`#pCC a[href^="${b}"]`)
z([5,3,t,0,Gt]),g(n,Pt)}function Xt(t){return j({cmd:"guild",subcmd:"conflicts",page:t})}function _t(t,e){f(e,t.insertCell(-1))}function Ut(t,e,n){const s=t.insertRow(t.rows.length-2)
_t(s,e),_t(s,n)}function Ft(t,e){Ut(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ot(t,e,n){1===e&&function(t){Ut(t,`<a href="${L}conflicts">Active Conflicts</a>`,"Score")}(n),Y(t.rows,7,0).forEach(C(Ft,n))}function Qt(t,e){const n=N(e),s=i('#pCC input[name="page"]',n)
if(!s)return
const a=Number(s.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(s)
!function(t,e,n){const s=i("#pCC > table > tbody > tr > td > table",t)
s&&s.rows.length>3&&Ot(s,e,n)}(n,a,t.node),o>a&&function(t,e,n){Xt(t+1).then(C(e,n))}(a,Qt,t)}function zt(t){const e=t.rows[6].cells[0].children[0]
e&&Xt(1).then(C(Qt,{node:e}))}function Jt(t){t.target.id===v&&y(v,!u(v))}let Yt,Zt,qt,Kt,Wt,te,ee,ne,se,ae,oe,ie,ce
function re(t,e){return`${t}<option value="${e}">${e}</option>`}function le(t){return x(t)?"#DEF":t.toLocaleString()}function fe(t,e,n){return`${e}<tr><td>${ot(new Date(1e3*n[it]))}</td><td>${t}</td><td class="fshRight">${le(n[ct])}</td><td class="fshRight">${le(n[rt])}</td><td class="fshRight">${le(n[lt])}</td><td class="fshRight">${le(n[ft])}</td><td class="fshRight">${Math.floor(n[lt]/n[ft]*100)}</td><td class="fshRight">${n[dt]}</td><td class="fshRight">${le(n[ut])}</td></tr>`}function de(t,e){return function(t){return Zt&&"- All -"!==Zt&&Zt!==t}(e)?t:t+Wt[e].reduce(C(fe,e),"")}function ue(){Wt&&f(w(Wt).reduce(de,""),Yt),qt.classList.remove("fshSpinner")}function me(){qt.classList.add("fshSpinner"),k(3,ue)}function pe(t){Zt=t.target.value,me()}function he(t){t&&(Wt=t,f(`<select name="member"><option value="- All -" selected>- All -</option>${w(t).sort(nt).reduce(re,"")}</select>`,Kt),me())}function be(){const t=$("th",{textContent:"Member"})
return Kt=l(),d(t,Kt),t}function ge(){const t=at({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
c(e,"<th>Date</th>")
const n=be()
d(e,n),c(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){Yt=st(),d(t,Yt)}(t),S(t,"change",pe),qt=l({className:"tgCont fshSpinner64"}),d(qt,t),qt}function je(t){te.value=t,se.classList.remove("fshSpinner")}function Ce(){te.value='{"lastUpdate": 0, "members": {}}'}function Ne(t){gt("Update successful"),he(t.members)}function Le(){const t=M(te.value)
K("fsh_guildActivity",t).then(C(Ne,t)).catch(gt)}function ve(t,e){const n=ht({className:"custombutton",textContent:t})
return g(n,e),n}function Se(){return se=l({id:"io",className:"fshSpinner64"}),te=bt(),te.setAttribute("autocapitalize","off"),te.setAttribute("autocomplete","off"),te.setAttribute("autocorrect","off"),te.setAttribute("spellcheck","false"),ee=ve("Save",Le),ne=ve("Reset",Ce),d(se,te),d(se,mt()),d(se,ee),d(se,ne),se}function ye(){return!oe.checked}function $e(t){oe.checked&&"Escape"===t.code&&(oe.checked=!1)}function we(t){ye()&&(t.style.transform=null)}function ke(){A("guildTracker","updateRawData"),ae&&function(t){t&&(se.classList.add("fshSpinner"),k(4,je,[t]))}(ae)}function xe(){const t=function(){const t=l({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return ce=Z({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),T(ce,"change",ke),d(t,ce),t}(),e=q({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return d(t,e),E(e,t),t}function Me(){const t=xe(),e=function(){const t=l({className:"fsh-dialog-content"})
return d(t,ge()),d(t,Se()),t}()
d(t,e),S(oe,"change",C(we,t)),d(ie,t)}function Te(t){t&&(ae=JSON.stringify(t),he(t.members))}function Ae(){A("guildTracker","openDialog"),W("fsh_guildActivity").then(Te),H.dialogIsClosed=ye,c(ie,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Me()}function He(){!function(){const t=i("#pCC img.guild_openGuildStore"),e=t.parentNode,n=l({className:"fsh-tracker"}),s=l({innerHTML:`${et(v)}&nbsp;<label class="custombutton" for="tracker">Show</label>`})
S(s,"change",Jt),d(n,t),d(n,s),tt(e,n)}(),oe=Z({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),T(oe,"change",Ae),ie=l({className:"fsh-dialog"}),d(ie,oe),S(document.body,"keydown",$e),d(document.body,ie)}let Ee,Re
function Be(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function De(){Re?Re.disabled=!Ee:function(){const t=p(r,n),e=t[t.length-1]
e.classList.add("fshProgressBar")
const s=a(R,e).map(Be).join("\n")
Re=d(document.body,X(s)).sheet}()}function Ie(){Ee=!Ee,y("enableStamBars",Ee),De(),A("guildManage","StamBars")}function Ge(){!function(){const t=i("#pCC img.guild_openGuildStore").parentNode,e=d(t,l({className:"fshCenter",innerHTML:et("enableStamBars")}))
S(e,"change",Ie)}(),Ee=u("enableStamBars"),Ee&&De()}function Pe(t,e,n){const s=function(t){return Ct({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
d(t,function(t){const e=Ct({innerHTML:"[&nbsp;"})
return d(e,t),c(e,"&nbsp;]"),e}(s)),e.id=n,u(n)&&Nt(e),g(s,pt)}function Ve(t){Pe(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Xe(t){const e=t.rows[4].cells[1].children[0]
f(e.innerHTML.trim(),e),Pe(e,t.rows[6].cells[0].children[0],"statisticsControl")}function _e(t){Pe(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Ue(t){const n=e("b",t).filter(s("Relics"))
if(1!==n.length)return
const a=n[0].parentNode.nextElementSibling.children[0]
f(`[ <a href="${L}reliclist">Control</a> ]&nbsp;`,a)}function Fe(t){const e=p("li",t),n=e[e.length-1].parentNode
c(n,`<li><a href="${D}${jt()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Oe(t,e){k(3,e,[t])}function Qe(){const t=n.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ve,Xe,_e,Ue,Fe].forEach(C(Oe,t))}(t),k(3,Vt),function(t){B()||(u("detailedConflictInfo")&&k(3,zt,[t]),k(4,He))}(t),Ge()}function ze(){const t=i('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function Je(){k(3,P),k(3,ze),k(3,$t),k(3,vt),"manage"===H.subcmd&&Qe(),"view"===H.subcmd&&It()}export default Je
//# sourceMappingURL=guild-917b8386.js.map
