import{a as t}from"./addCommas-02eed580.js"
import{g as e,p as n,ap as s,D as a,bs as o,C as i,i as c,d as r,m as l,A as d,h as f,H as u,Q as m,b as p,a9 as h,a1 as b,o as g,u as j,t as C,v as N,s as L,bt as v,f as S,Y as y,n as $,aL as k,a as w,aF as x,b0 as M,O as T,U as A,c as H,bu as E,E as R,x as B,bv as D}from"./calfSystem-7aee5245.js"
import{l as I}from"./onlineDot-d2b3e93d.js"
import{s as G}from"./setTipped-777d443c.js"
import{c as P}from"./colouredDots-57f9735c.js"
import V from"./compressBio-97173c6d.js"
import{c as X}from"./createStyle-a90207f5.js"
import{c as _}from"./currentGuildId-2e15c82d.js"
import{a as F,g as U,c as O,b as Q}from"./levelHighlight-95ce126e.js"
import{b as z}from"./batch-bd79b969.js"
import{o as J}from"./openQuickBuffByName-88fe8230.js"
import{d as Y}from"./dataRows-d2344907.js"
import{c as Z}from"./createInput-cd4a36ae.js"
import{c as q}from"./createUl-e99a308b.js"
import{s as K,g as W}from"./idb-12bca0fb.js"
import{i as tt}from"./insertElementAfterBegin-88a9bca4.js"
import{b as et}from"./simpleCheckbox-4f66a590.js"
import{a as nt}from"./alpha-80a926ba.js"
import{c as st}from"./createTBody-7285c274.js"
import{c as at}from"./createTable-2f08d1b1.js"
import{f as ot}from"./formatLocalDateTime-4d542cb2.js"
import{u as it,l as ct,v as rt,c as lt,m as dt,a as ft,g as ut}from"./indexConstants-dd933112.js"
import{c as mt,t as pt}from"./toggleVisibilty-42427be0.js"
import{c as ht}from"./createButton-504c23fa.js"
import{c as bt}from"./createTextArea-09fadbae.js"
import{d as gt}from"./dialogMsg-844edf4e.js"
import{p as jt}from"./playerName-87d03488.js"
import{c as Ct}from"./createSpan-08d79c06.js"
import{h as Nt}from"./hideElement-d4551277.js"
import"./createLabel-de7e9c70.js"
import"./insertElementBefore-43970b1f.js"
import"./intValue-e7ef611d.js"
import"./valueText-281cbf4b.js"
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
t&&yt(t)}let kt,wt
function xt(t){return kt&&t>=F()&&t<=U()}function Mt(t){return wt&&t>=O()&&t<=Q()}const Tt=t=>[t,o.exec(t.dataset.tipped)[1]],At=([,t])=>t<7,Ht=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],Et=([t,e])=>[t.parentNode.parentNode.rowIndex,xt(e),Mt(e)]
const Rt=t=>t.map((([t])=>`.fshHighlight tr:nth-child(${t+1})`)).join(",")
function Bt(){const t=a('#pCC a[data-tipped*="<td>VL:</td>"]').map(Tt).filter(At).map(Ht).map(Et),e=t.filter((([,t])=>t)),s=t.filter((([,t,e])=>!t&&e))
!function(t){if(t.length){const e=`${Rt(t)} {background-color: #4671C8;}`
f(document.body,X(e))}}(e),function(t){if(t.length){const e=`${Rt(t)} {background-color: #FF9900;}`
f(document.body,X(e))}}(s),function(t,e){if(t.length+e.length){const t=p(r,n)
t[t.length-1].classList.add("fshHighlight")}}(e,s)}function Dt(){Number(m("guild_id"))!==_()&&(kt||wt)&&Bt()}function It(){kt=u("highlightPlayersNearMyLvl"),wt=u("highlightGvGPlayersNearMyLvl"),Dt(),u("enableHistoryCompressor")&&function(){const t=e(r,n).slice(-2,-1)[0].rows[0].cells[0],s=l({id:"profile-bio",innerHTML:t.innerHTML})
d("",t),f(t,s),V()}()}function Gt(t){c(t.parentNode,' <span class="smallLink">[b]</span>')}function Pt(t){"smallLink"===t.target.className&&J(t.target.previousElementSibling.text)}function Vt(){const t=h(`#pCC a[href^="${b}"]`)
z([5,3,t,0,Gt]),g(n,Pt)}function Xt(t){return j({cmd:"guild",subcmd:"conflicts",page:t})}function _t(t,e){d(e,t.insertCell(-1))}function Ft(t,e,n){const s=t.insertRow(t.rows.length-2)
_t(s,e),_t(s,n)}function Ut(t,e){Ft(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ot(t,e,n){1===e&&function(t){Ft(t,`<a href="${L}conflicts">Active Conflicts</a>`,"Score")}(n),Y(t.rows,7,0).forEach(C(Ut,n))}function Qt(t,e){const n=N(e),s=i('#pCC input[name="page"]',n)
if(!s)return
const a=Number(s.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(s)
!function(t,e,n){const s=i("#pCC > table > tbody > tr > td > table",t)
s&&s.rows.length>3&&Ot(s,e,n)}(n,a,t.node),o>a&&function(t,e,n){Xt(t+1).then(C(e,n))}(a,Qt,t)}function zt(t){const e=t.rows[6].cells[0].children[0]
e&&Xt(1).then(C(Qt,{node:e}))}function Jt(t){t.target.id===v&&y(v,!u(v))}let Yt,Zt,qt,Kt,Wt,te,ee,ne,se,ae,oe,ie,ce
function re(t,e){return`${t}<option value="${e}">${e}</option>`}function le(t){return x(t)?"#DEF":t.toLocaleString()}function de(t,e,n){return`${e}<tr><td>${ot(new Date(1e3*n[it]))}</td><td>${t}</td><td class="fshRight">${le(n[ct])}</td><td class="fshRight">${le(n[rt])}</td><td class="fshRight">${le(n[lt])}</td><td class="fshRight">${le(n[dt])}</td><td class="fshRight">${Math.floor(n[lt]/n[dt]*100)}</td><td class="fshRight">${n[ft]}</td><td class="fshRight">${le(n[ut])}</td></tr>`}function fe(t,e){return function(t){return Zt&&"- All -"!==Zt&&Zt!==t}(e)?t:t+Wt[e].reduce(C(de,e),"")}function ue(){Wt&&d(k(Wt).reduce(fe,""),Yt),qt.classList.remove("fshSpinner")}function me(){qt.classList.add("fshSpinner"),w(3,ue)}function pe(t){Zt=t.target.value,me()}function he(t){t&&(Wt=t,d(`<select name="member"><option value="- All -" selected>- All -</option>${k(t).sort(nt).reduce(re,"")}</select>`,Kt),me())}function be(){const t=$("th",{textContent:"Member"})
return Kt=l(),f(t,Kt),t}function ge(){const t=at({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
c(e,"<th>Date</th>")
const n=be()
f(e,n),c(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){Yt=st(),f(t,Yt)}(t),S(t,"change",pe),qt=l({className:"tgCont fshSpinner64"}),f(qt,t),qt}function je(t){te.value=t,se.classList.remove("fshSpinner")}function Ce(){te.value='{"lastUpdate": 0, "members": {}}'}function Ne(t){gt("Update successful"),he(t.members)}function Le(){const t=M(te.value)
K("fsh_guildActivity",t).then(C(Ne,t)).catch(gt)}function ve(t,e){const n=ht({className:"custombutton",textContent:t})
return g(n,e),n}function Se(){return se=l({id:"io",className:"fshSpinner64"}),te=bt(),te.setAttribute("autocapitalize","off"),te.setAttribute("autocomplete","off"),te.setAttribute("autocorrect","off"),te.setAttribute("spellcheck","false"),ee=ve("Save",Le),ne=ve("Reset",Ce),f(se,te),f(se,mt()),f(se,ee),f(se,ne),se}function ye(){return!oe.checked}function $e(t){oe.checked&&"Escape"===t.code&&(oe.checked=!1)}function ke(t){ye()&&(t.style.transform=null)}function we(){A("guildTracker","updateRawData"),ae&&function(t){t&&(se.classList.add("fshSpinner"),w(4,je,[t]))}(ae)}function xe(){const t=function(){const t=l({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return ce=Z({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),T(ce,"change",we),f(t,ce),t}(),e=q({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return f(t,e),E(e,t),t}function Me(){const t=xe(),e=function(){const t=l({className:"fsh-dialog-content"})
return f(t,ge()),f(t,Se()),t}()
f(t,e),S(oe,"change",C(ke,t)),f(ie,t)}function Te(t){t&&(ae=JSON.stringify(t),he(t.members))}function Ae(){A("guildTracker","openDialog"),W("fsh_guildActivity").then(Te),H.dialogIsClosed=ye,c(ie,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Me()}function He(){!function(){const t=i("#pCC img.guild_openGuildStore"),e=t.parentNode,n=l({className:"fsh-tracker"}),s=l({innerHTML:`${et(v)}&nbsp;<label class="custombutton" for="tracker">Show</label>`})
S(s,"change",Jt),f(n,t),f(n,s),tt(e,n)}(),oe=Z({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),T(oe,"change",Ae),ie=l({className:"fsh-dialog"}),f(ie,oe),S(document.body,"keydown",$e),f(document.body,ie)}let Ee,Re
function Be(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function De(){Re?Re.disabled=!Ee:function(){const t=p(r,n),e=t[t.length-1]
e.classList.add("fshProgressBar")
const s=a(R,e).map(Be).join("\n")
Re=f(document.body,X(s)).sheet}()}function Ie(){Ee=!Ee,y("enableStamBars",Ee),De(),A("guildManage","StamBars")}function Ge(){!function(){const t=i("#pCC img.guild_openGuildStore").parentNode,e=f(t,l({className:"fshCenter",innerHTML:et("enableStamBars")}))
S(e,"change",Ie)}(),Ee=u("enableStamBars"),Ee&&De()}function Pe(t,e,n){const s=function(t){return Ct({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
f(t,function(t){const e=Ct({innerHTML:"[&nbsp;"})
return f(e,t),c(e,"&nbsp;]"),e}(s)),e.id=n,u(n)&&Nt(e),g(s,pt)}function Ve(t){Pe(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Xe(t){const e=t.rows[4].cells[1].children[0]
d(e.innerHTML.trim(),e),Pe(e,t.rows[6].cells[0].children[0],"statisticsControl")}function _e(t){Pe(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Fe(t){const n=e("b",t).filter(s("Relics"))
if(1!==n.length)return
const a=n[0].parentNode.nextElementSibling.children[0]
d(`[ <a href="${L}reliclist">Control</a> ]&nbsp;`,a)}function Ue(t){const e=p("li",t),n=e[e.length-1].parentNode
c(n,`<li><a href="${D}${jt()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Oe(t,e){w(3,e,[t])}function Qe(){const t=n.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ve,Xe,_e,Fe,Ue].forEach(C(Oe,t))}(t),w(3,Vt),function(t){B()||(u("detailedConflictInfo")&&w(3,zt,[t]),w(4,He))}(t),Ge()}function ze(){const t=i('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function Je(){w(3,P),w(3,ze),w(3,$t),w(3,vt),"manage"===H.subcmd&&Qe(),"view"===H.subcmd&&It()}export default Je
//# sourceMappingURL=guild-1875520e.js.map
