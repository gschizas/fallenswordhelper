import{a as t}from"./addCommas-02eed580.js"
import{g as e,p as n,ax as a,D as s,by as o,C as i,i as c,d as r,m as l,A as f,h as d,H as u,R as m,b as p,aa as h,a2 as b,o as g,u as j,t as C,v as N,s as L,bz as S,f as v,Z as y,n as $,aU as k,a as w,aM as x,b8 as M,O as T,V as A,c as H,bA as R,E as B,x as E,bB as D}from"./calfSystem-393ab895.js"
import{l as I}from"./onlineDot-9b46cf0c.js"
import{s as G}from"./setTipped-777d443c.js"
import{c as P}from"./colouredDots-feee957b.js"
import V from"./compressBio-a39936a7.js"
import{c as X}from"./createStyle-2bea16e8.js"
import{c as _}from"./currentGuildId-469c60c3.js"
import{a as U,g as F,c as O,b as z}from"./levelHighlight-6a86539a.js"
import{b as Z}from"./batch-28b89a64.js"
import{o as J}from"./openQuickBuffByName-47bff80e.js"
import{d as Q}from"./dataRows-0805e883.js"
import{c as q}from"./createInput-f7e07c00.js"
import{c as K}from"./createUl-7863af9d.js"
import{s as W,g as Y}from"./idb-46b78b1e.js"
import{i as tt}from"./insertElementAfterBegin-b64fd488.js"
import{b as et}from"./simpleCheckbox-649df0f1.js"
import{a as nt}from"./alpha-80a926ba.js"
import{c as at}from"./createTBody-528613e5.js"
import{c as st}from"./createTable-aae48322.js"
import{f as ot}from"./formatLocalDateTime-4d542cb2.js"
import{u as it,l as ct,v as rt,c as lt,m as ft,a as dt,g as ut}from"./indexConstants-dd933112.js"
import{c as mt,t as pt}from"./toggleVisibilty-9409b740.js"
import{c as ht}from"./createButton-3f9a1ed2.js"
import{c as bt}from"./createTextArea-f1a04a11.js"
import{d as gt}from"./dialogMsg-844edf4e.js"
import{p as jt}from"./playerName-03162bd7.js"
import{c as Ct}from"./createSpan-f9f70e5d.js"
import{h as Nt}from"./hideElement-d4551277.js"
import"./createLabel-d7669076.js"
import"./insertElementBefore-43970b1f.js"
import"./intValue-e7ef611d.js"
import"./valueText-89c9d82f.js"
import"./fshOpen-bec182a3.js"
import"./isChecked-1c18cd61.js"
import"./toLowerCase-51740687.js"
import"./isDate-3e775446.js"
import"./numberIsNaN-53300e34.js"
import"./padZ-4bdbf4bf.js"
function Lt(t,e){const n=o.exec(e.dataset.tipped)
return I({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function St(){const o=e("b",n).find(a("Members"))
if(o){const e=s('#pCC a[data-tipped*="Last Activity"]'),n=function(t){return t.reduce(Lt,[0,0])}(e)
o.classList.add("tip-static"),G(`Active: ${n[0]}/${e.length}<br>Stamina: ${t(n[1])}`,o)}}function vt(t,e){let n
const a=t.replace(/,/g,"").match(e)
return n=a?parseInt(a[1],10):0,n}function yt(e){const n=e.dataset.tipped,a=vt(n,/XP Lock: <b>(\d*)/),s=vt(n,/XP: <b>(\d*)/)
c(e.parentNode.nextElementSibling,` (<b>${function(e,n){let a=""
return e>n&&(a="+"),a+t(e-n)}(s,a)}</b>)`)}function $t(){const t=i('#pCC a[data-tipped^="<b>Guild XP</b>"]')
t&&yt(t)}let kt,wt
function xt(t){return kt&&t>=U()&&t<=F()}function Mt(t){return wt&&t>=O()&&t<=z()}const Tt=t=>[t,o.exec(t.dataset.tipped)[1]],At=([,t])=>t<7,Ht=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],Rt=([t,e])=>[t.parentNode.parentNode.rowIndex,xt(e),Mt(e)]
const Bt=t=>t.map((([t])=>`.fshHighlight tr:nth-child(${t+1})`)).join(",")
function Et(){const t=s('#pCC a[data-tipped*="<td>VL:</td>"]').map(Tt).filter(At).map(Ht).map(Rt),e=t.filter((([,t])=>t)),a=t.filter((([,t,e])=>!t&&e))
!function(t){if(t.length){const e=`${Bt(t)} {background-color: #4671C8;}`
d(document.body,X(e))}}(e),function(t){if(t.length){const e=`${Bt(t)} {background-color: #FF9900;}`
d(document.body,X(e))}}(a),function(t,e){if(t.length+e.length){const t=p(r,n)
t[t.length-1].classList.add("fshHighlight")}}(e,a)}function Dt(){Number(m("guild_id"))!==_()&&(kt||wt)&&Et()}function It(){kt=u("highlightPlayersNearMyLvl"),wt=u("highlightGvGPlayersNearMyLvl"),Dt(),u("enableHistoryCompressor")&&function(){const t=e(r,n).slice(-2,-1)[0].rows[0].cells[0],a=l({id:"profile-bio",innerHTML:t.innerHTML})
f("",t),d(t,a),V()}()}function Gt(t){c(t.parentNode,' <span class="smallLink">[b]</span>')}function Pt(t){"smallLink"===t.target.className&&J(t.target.previousElementSibling.text)}function Vt(){const t=h(`#pCC a[href^="${b}"]`)
Z([5,3,t,0,Gt]),g(n,Pt)}function Xt(t){return j({cmd:"guild",subcmd:"conflicts",page:t})}function _t(t,e){f(e,t.insertCell(-1))}function Ut(t,e,n){const a=t.insertRow(t.rows.length-2)
_t(a,e),_t(a,n)}function Ft(t,e){Ut(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ot(t,e,n){1===e&&function(t){Ut(t,`<a href="${L}conflicts">Active Conflicts</a>`,"Score")}(n),Q(t.rows,7,0).forEach(C(Ft,n))}function zt(t,e){const n=N(e),a=i('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=i("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Ot(a,e,n)}(n,s,t.node),o>s&&function(t,e,n){Xt(t+1).then(C(e,n))}(s,zt,t)}function Zt(t){const e=t.rows[6].cells[0].children[0]
e&&Xt(1).then(C(zt,{node:e}))}function Jt(t){t.target.id===S&&y(S,!u(S))}let Qt,qt,Kt,Wt,Yt,te,ee,ne,ae,se,oe,ie,ce
function re(t,e){return`${t}<option value="${e}">${e}</option>`}function le(t){return x(t)?"#DEF":t.toLocaleString()}function fe(t,e,n){return`${e}<tr><td>${ot(new Date(1e3*n[it]))}</td><td>${t}</td><td class="fshRight">${le(n[ct])}</td><td class="fshRight">${le(n[rt])}</td><td class="fshRight">${le(n[lt])}</td><td class="fshRight">${le(n[ft])}</td><td class="fshRight">${Math.floor(n[lt]/n[ft]*100)}</td><td class="fshRight">${n[dt]}</td><td class="fshRight">${le(n[ut])}</td></tr>`}function de(t,e){return function(t){return qt&&"- All -"!==qt&&qt!==t}(e)?t:t+Yt[e].reduce(C(fe,e),"")}function ue(){Yt&&f(k(Yt).reduce(de,""),Qt),Kt.classList.remove("fshSpinner")}function me(){Kt.classList.add("fshSpinner"),w(3,ue)}function pe(t){qt=t.target.value,me()}function he(t){t&&(Yt=t,f(`<select name="member"><option value="- All -" selected>- All -</option>${k(t).sort(nt).reduce(re,"")}</select>`,Wt),me())}function be(){const t=$("th",{textContent:"Member"})
return Wt=l(),d(t,Wt),t}function ge(){const t=st({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
c(e,"<th>Date</th>")
const n=be()
d(e,n),c(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){Qt=at(),d(t,Qt)}(t),v(t,"change",pe),Kt=l({className:"tgCont fshSpinner64"}),d(Kt,t),Kt}function je(t){te.value=t,ae.classList.remove("fshSpinner")}function Ce(){te.value='{"lastUpdate": 0, "members": {}}'}function Ne(t){gt("Update successful"),he(t.members)}function Le(){const t=M(te.value)
W("fsh_guildActivity",t).then(C(Ne,t)).catch(gt)}function Se(t,e){const n=ht({className:"custombutton",textContent:t})
return g(n,e),n}function ve(){return ae=l({id:"io",className:"fshSpinner64"}),te=bt(),te.setAttribute("autocapitalize","off"),te.setAttribute("autocomplete","off"),te.setAttribute("autocorrect","off"),te.setAttribute("spellcheck","false"),ee=Se("Save",Le),ne=Se("Reset",Ce),d(ae,te),d(ae,mt()),d(ae,ee),d(ae,ne),ae}function ye(){return!oe.checked}function $e(t){oe.checked&&"Escape"===t.code&&(oe.checked=!1)}function ke(t){ye()&&(t.style.transform=null)}function we(){A("guildTracker","updateRawData"),se&&function(t){t&&(ae.classList.add("fshSpinner"),w(4,je,[t]))}(se)}function xe(){const t=function(){const t=l({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return ce=q({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),T(ce,"change",we),d(t,ce),t}(),e=K({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return d(t,e),R(e,t),t}function Me(){const t=xe(),e=function(){const t=l({className:"fsh-dialog-content"})
return d(t,ge()),d(t,ve()),t}()
d(t,e),v(oe,"change",C(ke,t)),d(ie,t)}function Te(t){t&&(se=JSON.stringify(t),he(t.members))}function Ae(){A("guildTracker","openDialog"),Y("fsh_guildActivity").then(Te),H.dialogIsClosed=ye,c(ie,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Me()}function He(){!function(){const t=i("#pCC img.guild_openGuildStore"),e=t.parentNode,n=l({className:"fsh-tracker"}),a=l({innerHTML:`${et(S)}&nbsp;<label class="custombutton" for="tracker">Show</label>`})
v(a,"change",Jt),d(n,t),d(n,a),tt(e,n)}(),oe=q({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),T(oe,"change",Ae),ie=l({className:"fsh-dialog"}),d(ie,oe),v(document.body,"keydown",$e),d(document.body,ie)}let Re,Be
function Ee(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function De(){Be?Be.disabled=!Re:function(){const t=p(r,n),e=t[t.length-1]
e.classList.add("fshProgressBar")
const a=s(B,e).map(Ee).join("\n")
Be=d(document.body,X(a)).sheet}()}function Ie(){Re=!Re,y("enableStamBars",Re),De(),A("guildManage","StamBars")}function Ge(){!function(){const t=i("#pCC img.guild_openGuildStore").parentNode,e=d(t,l({className:"fshCenter",innerHTML:et("enableStamBars")}))
v(e,"change",Ie)}(),Re=u("enableStamBars"),Re&&De()}function Pe(t,e,n){const a=function(t){return Ct({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
d(t,function(t){const e=Ct({innerHTML:"[&nbsp;"})
return d(e,t),c(e,"&nbsp;]"),e}(a)),e.id=n,u(n)&&Nt(e),g(a,pt)}function Ve(t){Pe(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Xe(t){const e=t.rows[4].cells[1].children[0]
f(e.innerHTML.trim(),e),Pe(e,t.rows[6].cells[0].children[0],"statisticsControl")}function _e(t){Pe(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Ue(t){const n=e("b",t).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
f(`[ <a href="${L}reliclist">Control</a> ]&nbsp;`,s)}function Fe(t){const e=p("li",t),n=e[e.length-1].parentNode
c(n,`<li><a href="${D}${jt()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Oe(t,e){w(3,e,[t])}function ze(){const t=n.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ve,Xe,_e,Ue,Fe].forEach(C(Oe,t))}(t),w(3,Vt),function(t){E()||(u("detailedConflictInfo")&&w(3,Zt,[t]),w(4,He))}(t),Ge()}function Ze(){const t=i('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function Je(){w(3,P),w(3,Ze),w(3,$t),w(3,St),"manage"===H.subcmd&&ze(),"view"===H.subcmd&&It()}export default Je
//# sourceMappingURL=guild-b2833b6a.js.map
