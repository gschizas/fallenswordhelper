import{a as t}from"./addCommas-b2b2ad82.js"
import{g as e,p as n,aq as a,D as s,bt as o,C as i,i as c,d as r,m as l,A as f,h as d,H as u,R as m,b as p,aa as h,a2 as b,o as g,u as j,t as C,v as N,s as L,bu as v,f as S,Z as y,n as $,aM as w,a as k,aG as x,b1 as M,P as T,V as A,c as H,bv as R,E,x as B,bw as D}from"./calfSystem-45544049.js"
import{l as G}from"./onlineDot-d26b9768.js"
import{s as I}from"./setTipped-808b71de.js"
import{c as P}from"./colouredDots-8e1602e8.js"
import V from"./compressBio-125bb198.js"
import{c as X}from"./createStyle-e1e4f54e.js"
import{c as _}from"./currentGuildId-2687cdb7.js"
import{a as F,g as U,c as O,b as Z}from"./levelHighlight-feb02561.js"
import{b as q}from"./batch-62de3d3c.js"
import{o as z}from"./openQuickBuffByName-81a3ab3b.js"
import{d as J}from"./dataRows-d35c7cec.js"
import{c as Q}from"./createInput-8791792e.js"
import{c as K}from"./createUl-cac51f38.js"
import{s as W,g as Y}from"./idb-ca3578bc.js"
import{i as tt}from"./insertElementAfterBegin-ddd00fbd.js"
import{b as et}from"./simpleCheckbox-30d3f70c.js"
import{a as nt}from"./alpha-6743d5a2.js"
import{c as at}from"./createTBody-ac35e412.js"
import{c as st}from"./createTable-7f36caa1.js"
import{f as ot}from"./formatLocalDateTime-e90fa5a5.js"
import{u as it,l as ct,v as rt,c as lt,m as ft,a as dt,g as ut}from"./indexConstants-90d4e3b3.js"
import{c as mt,t as pt}from"./toggleVisibilty-48fe664a.js"
import{c as ht}from"./createButton-ba5300bd.js"
import{c as bt}from"./createTextArea-a762fed0.js"
import{d as gt}from"./dialogMsg-0a235932.js"
import{p as jt}from"./playerName-c1bcaeb9.js"
import{c as Ct}from"./createSpan-4c34b034.js"
import{h as Nt}from"./hideElement-7c48eb54.js"
import"./createLabel-1e17e412.js"
import"./insertElementBefore-aa28f497.js"
import"./intValue-da5ad0eb.js"
import"./valueText-f47f9857.js"
import"./fshOpen-56a6fafa.js"
import"./isChecked-00f5c23d.js"
import"./toLowerCase-ace931b6.js"
import"./isDate-deba0fc7.js"
import"./numberIsNaN-fecd7e6d.js"
import"./padZ-0fd2ec23.js"
function Lt(t,e){const n=o.exec(e.dataset.tipped)
return G({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function vt(){const o=e("b",n).find(a("Members"))
if(o){const e=s('#pCC a[data-tipped*="Last Activity"]'),n=function(t){return t.reduce(Lt,[0,0])}(e)
o.classList.add("tip-static"),I(`Active: ${n[0]}/${e.length}<br>Stamina: ${t(n[1])}`,o)}}function St(t,e){let n
const a=t.replace(/,/g,"").match(e)
return n=a?parseInt(a[1],10):0,n}function yt(e){const n=e.dataset.tipped,a=St(n,/XP Lock: <b>(\d*)/),s=St(n,/XP: <b>(\d*)/)
c(e.parentNode.nextElementSibling,` (<b>${function(e,n){let a=""
return e>n&&(a="+"),a+t(e-n)}(s,a)}</b>)`)}function $t(){const t=i('#pCC a[data-tipped^="<b>Guild XP</b>"]')
t&&yt(t)}let wt,kt
function xt(t){return wt&&t>=F()&&t<=U()}function Mt(t){return kt&&t>=O()&&t<=Z()}const Tt=t=>[t,o.exec(t.dataset.tipped)[1]],At=([,t])=>t<7,Ht=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],Rt=([t,e])=>[t.parentNode.parentNode.rowIndex,xt(e),Mt(e)]
const Et=t=>t.map((([t])=>`.fshHighlight tr:nth-child(${t+1})`)).join(",")
function Bt(){const t=s('#pCC a[data-tipped*="<td>VL:</td>"]').map(Tt).filter(At).map(Ht).map(Rt),e=t.filter((([,t])=>t)),a=t.filter((([,t,e])=>!t&&e))
!function(t){if(t.length){const e=`${Et(t)} {background-color: #4671C8;}`
d(document.body,X(e))}}(e),function(t){if(t.length){const e=`${Et(t)} {background-color: #FF9900;}`
d(document.body,X(e))}}(a),function(t,e){if(t.length+e.length){const t=p(r,n)
t[t.length-1].classList.add("fshHighlight")}}(e,a)}function Dt(){Number(m("guild_id"))!==_()&&(wt||kt)&&Bt()}function Gt(){wt=u("highlightPlayersNearMyLvl"),kt=u("highlightGvGPlayersNearMyLvl"),Dt(),u("enableHistoryCompressor")&&function(){const t=e(r,n).slice(-2,-1)[0].rows[0].cells[0],a=l({id:"profile-bio",innerHTML:t.innerHTML})
f("",t),d(t,a),V()}()}function It(t){c(t.parentNode,' <span class="smallLink">[b]</span>')}function Pt(t){"smallLink"===t.target.className&&z(t.target.previousElementSibling.text)}function Vt(){const t=h(`#pCC a[href^="${b}"]`)
q([5,3,t,0,It]),g(n,Pt)}function Xt(t){return j({cmd:"guild",subcmd:"conflicts",page:t})}function _t(t,e){f(e,t.insertCell(-1))}function Ft(t,e,n){const a=t.insertRow(t.rows.length-2)
_t(a,e),_t(a,n)}function Ut(t,e){Ft(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ot(t,e,n){1===e&&function(t){Ft(t,`<a href="${L}conflicts">Active Conflicts</a>`,"Score")}(n),J(t.rows,7,0).forEach(C(Ut,n))}function Zt(t,e){const n=N(e),a=i('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=i("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Ot(a,e,n)}(n,s,t.node),o>s&&function(t,e,n){Xt(t+1).then(C(e,n))}(s,Zt,t)}function qt(t){const e=t.rows[6].cells[0].children[0]
e&&Xt(1).then(C(Zt,{node:e}))}function zt(t){t.target.id===v&&y(v,!u(v))}let Jt,Qt,Kt,Wt,Yt,te,ee,ne,ae,se,oe,ie,ce
function re(t,e){return`${t}<option value="${e}">${e}</option>`}function le(t){return x(t)?"#DEF":t.toLocaleString()}function fe(t,e,n){return`${e}<tr><td>${ot(new Date(1e3*n[it]))}</td><td>${t}</td><td class="fshRight">${le(n[ct])}</td><td class="fshRight">${le(n[rt])}</td><td class="fshRight">${le(n[lt])}</td><td class="fshRight">${le(n[ft])}</td><td class="fshRight">${Math.floor(n[lt]/n[ft]*100)}</td><td class="fshRight">${n[dt]}</td><td class="fshRight">${le(n[ut])}</td></tr>`}function de(t,e){return function(t){return Qt&&"- All -"!==Qt&&Qt!==t}(e)?t:t+Yt[e].reduce(C(fe,e),"")}function ue(){Yt&&f(w(Yt).reduce(de,""),Jt),Kt.classList.remove("fshSpinner")}function me(){Kt.classList.add("fshSpinner"),k(3,ue)}function pe(t){Qt=t.target.value,me()}function he(t){t&&(Yt=t,f(`<select name="member"><option value="- All -" selected>- All -</option>${w(t).sort(nt).reduce(re,"")}</select>`,Wt),me())}function be(){const t=$("th",{textContent:"Member"})
return Wt=l(),d(t,Wt),t}function ge(){const t=st({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
c(e,"<th>Date</th>")
const n=be()
d(e,n),c(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){Jt=at(),d(t,Jt)}(t),S(t,"change",pe),Kt=l({className:"tgCont fshSpinner64"}),d(Kt,t),Kt}function je(t){te.value=t,ae.classList.remove("fshSpinner")}function Ce(){te.value='{"lastUpdate": 0, "members": {}}'}function Ne(t){gt("Update successful"),he(t.members)}function Le(){const t=M(te.value)
W("fsh_guildActivity",t).then(C(Ne,t)).catch(gt)}function ve(t,e){const n=ht({className:"custombutton",textContent:t})
return g(n,e),n}function Se(){return ae=l({id:"io",className:"fshSpinner64"}),te=bt(),te.setAttribute("autocapitalize","off"),te.setAttribute("autocomplete","off"),te.setAttribute("autocorrect","off"),te.setAttribute("spellcheck","false"),ee=ve("Save",Le),ne=ve("Reset",Ce),d(ae,te),d(ae,mt()),d(ae,ee),d(ae,ne),ae}function ye(){return!oe.checked}function $e(t){oe.checked&&"Escape"===t.code&&(oe.checked=!1)}function we(t){ye()&&(t.style.transform=null)}function ke(){A("guildTracker","updateRawData"),se&&function(t){t&&(ae.classList.add("fshSpinner"),k(4,je,[t]))}(se)}function xe(){const t=function(){const t=l({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return ce=Q({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),T(ce,"change",ke),d(t,ce),t}(),e=K({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return d(t,e),R(e,t),t}function Me(){const t=xe(),e=function(){const t=l({className:"fsh-dialog-content"})
return d(t,ge()),d(t,Se()),t}()
d(t,e),S(oe,"change",C(we,t)),d(ie,t)}function Te(t){t&&(se=JSON.stringify(t),he(t.members))}function Ae(){A("guildTracker","openDialog"),Y("fsh_guildActivity").then(Te),H.dialogIsClosed=ye,c(ie,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Me()}function He(){!function(){const t=i("#pCC img.guild_openGuildStore"),e=t.parentNode,n=l({className:"fsh-tracker"}),a=l({innerHTML:`${et(v)}&nbsp;<label class="custombutton" for="tracker">Show</label>`})
S(a,"change",zt),d(n,t),d(n,a),tt(e,n)}(),oe=Q({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),T(oe,"change",Ae),ie=l({className:"fsh-dialog"}),d(ie,oe),S(document.body,"keydown",$e),d(document.body,ie)}let Re,Ee
function Be(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function De(){Ee?Ee.disabled=!Re:function(){const t=p(r,n),e=t[t.length-1]
e.classList.add("fshProgressBar")
const a=s(E,e).map(Be).join("\n")
Ee=d(document.body,X(a)).sheet}()}function Ge(){Re=!Re,y("enableStamBars",Re),De(),A("guildManage","StamBars")}function Ie(){!function(){const t=i("#pCC img.guild_openGuildStore").parentNode,e=d(t,l({className:"fshCenter",innerHTML:et("enableStamBars")}))
S(e,"change",Ge)}(),Re=u("enableStamBars"),Re&&De()}function Pe(t,e,n){const a=function(t){return Ct({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
d(t,function(t){const e=Ct({innerHTML:"[&nbsp;"})
return d(e,t),c(e,"&nbsp;]"),e}(a)),e.id=n,u(n)&&Nt(e),g(a,pt)}function Ve(t){Pe(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Xe(t){const e=t.rows[4].cells[1].children[0]
f(e.innerHTML.trim(),e),Pe(e,t.rows[6].cells[0].children[0],"statisticsControl")}function _e(t){Pe(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Fe(t){const n=e("b",t).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
f(`[ <a href="${L}reliclist">Control</a> ]&nbsp;`,s)}function Ue(t){const e=p("li",t),n=e[e.length-1].parentNode
c(n,`<li><a href="${D}${jt()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Oe(t,e){k(3,e,[t])}function Ze(){const t=n.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ve,Xe,_e,Fe,Ue].forEach(C(Oe,t))}(t),k(3,Vt),function(t){B()||(u("detailedConflictInfo")&&k(3,qt,[t]),k(4,He))}(t),Ie()}function qe(){const t=i('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function ze(){k(3,P),k(3,qe),k(3,$t),k(3,vt),"manage"===H.subcmd&&Ze(),"view"===H.subcmd&&Gt()}export default ze
//# sourceMappingURL=guild-0dd8d546.js.map
