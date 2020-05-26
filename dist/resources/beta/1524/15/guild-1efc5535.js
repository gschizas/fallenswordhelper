import{g as t,p as e,b8 as a,I as n,bx as s,d as i,D as o,M as c,ah as r,_ as l,o as d,i as f,t as u,s as m,u as p,L as h,z as b,r as g,k as v,e as j,f as N,V as y,m as C,ag as L,a as S,by as k,bz as w,bA as $,bB as T,bC as A,bD as M,bE as x,a8 as E,aE as R,a6 as G,K as H,R as B,a4 as D,c as I,bF as _,b as V,w as z,bG as P}from"./calfSystem-1262535f.js"
import"./numberIsNaN-e4fe1516.js"
import{p as U}from"./playerName-11654d0b.js"
import"./toLowerCase-0c270c29.js"
import{c as F}from"./createInput-62cab8cf.js"
import{a as O}from"./addCommas-feda1131.js"
import{l as X}from"./onlineDot-7b6024de.js"
import{s as J}from"./setTipped-5b3efabc.js"
import{b as K}from"./batch-f97a2ba5.js"
import{c as Q,a as Z}from"./compressBio-2909e2b8.js"
import"./createLabel-7ec6b2f8.js"
import{c as q}from"./currentGuildId-5a28bdba.js"
import"./intValue-c4584407.js"
import"./valueText-03ad0c73.js"
import{c as W,b as Y,p as tt,a as et,g as at}from"./levelHighlight-a8f02673.js"
import"./fshOpen-6d67ed12.js"
import{o as nt}from"./openQuickBuffByName-05521d4e.js"
import{d as st}from"./dataRows-f0bd58da.js"
import{c as it}from"./createUl-17d107e3.js"
import"./insertElementBefore-dcdbe7ae.js"
import{i as ot}from"./insertElementAfterBegin-eeb77058.js"
import"./isChecked-d8a3d688.js"
import{b as ct}from"./simpleCheckbox-69fdc6eb.js"
import{a as rt}from"./alpha-cdb4272d.js"
import{c as lt}from"./createTBody-5668a27d.js"
import{c as dt}from"./createTable-34bb0f34.js"
import"./isDate-b25d137c.js"
import"./padZ-9d5b7a82.js"
import{f as ft}from"./formatLocalDateTime-ff109bee.js"
import{c as ut,t as mt}from"./toggleVisibilty-6d1fd362.js"
import{c as pt}from"./createButton-641ff4d6.js"
import{c as ht}from"./createTextArea-98df359f.js"
import{d as bt}from"./dialogMsg-06808fe1.js"
import{c as gt}from"./createStyle-09e01556.js"
import{c as vt}from"./createSpan-aa5e4be8.js"
import{h as jt}from"./hideElement-405c1665.js"
function Nt(t,e){const a=s.exec(e.dataset.tipped)
return X({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function yt(){const s=t("b",e).find(a("Members"))
if(s){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Nt,[0,0])}(t)
s.classList.add("tip-static"),J(`Active: ${e[0]}/${t.length}<br>Stamina: ${O(e[1])}`,s)}}let Ct,Lt,St,kt,wt,$t,Tt,At,Mt,xt,Et,Rt,Gt,Ht,Bt
function Dt(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return Ct&&t>=Y&&t<=tt}(a)?function(t){return Lt&&t>=et&&t<=at}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function It(t){const{tipped:e}=t.dataset
s.exec(e)[1]<7&&Dt(t,e)}function _t(){Number(c("guild_id"))!==q()&&(Ct||Lt)&&(W(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(It))}function Vt(){Ct=o("highlightPlayersNearMyLvl"),Lt=o("highlightGvGPlayersNearMyLvl"),_t(),o("enableHistoryCompressor")&&Q(t(i,e).slice(-2,-1)[0].rows[0].cells[0])}function zt(t){f(t.parentNode,' <span class="smallLink">[b]</span>')}function Pt(t){"smallLink"===t.target.className&&nt(t.target.previousElementSibling.text)}function Ut(){const t=r(`#pCC a[href^="${l}"]`)
K([5,3,t,0,zt]),d(e,Pt)}function Ft(t){return u({cmd:"guild",subcmd:"conflicts",page:t})}function Ot(t,e){b(e,t.insertCell(-1))}function Xt(t,e,a){const n=t.insertRow(t.rows.length-2)
Ot(n,e),Ot(n,a)}function Jt(t,e){Xt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Kt(t,e,a){1===e&&function(t){Xt(t,`<a href="${g}conflicts">Active Conflicts</a>`,"Score")}(a),st(t.rows,7,0).forEach(m(Jt,a))}function Qt(t,e){const a=p(e),n=h('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=h("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Kt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){Ft(t+1).then(m(e,a))}(s,Qt,t)}function Zt(t){const e=t.rows[6].cells[0].children[0]
e&&Ft(1).then(m(Qt,{node:e}))}function qt(t){"enableGuildActivityTracker"===t.target.id&&y("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Wt(t,e){return`${t}<option value="${e}">${e}</option>`}function Yt(t){return E(t)?"#DEF":t.toLocaleString()}function te(t,e,a){return e+"<tr>"+`<td>${ft(new Date(1e3*a[k]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${Yt(a[w])}</td>`+`<td class="fshRight">${Yt(a[$])}</td>`+`<td class="fshRight">${Yt(a[T])}</td>`+`<td class="fshRight">${Yt(a[A])}</td>`+`<td class="fshRight">${Math.floor(a[T]/a[A]*100)}</td>`+`<td class="fshRight">${a[M]}</td>`+`<td class="fshRight">${Yt(a[x])}</td></tr>`}function ee(t,e){return function(t){return kt&&"- All -"!==kt&&kt!==t}(e)?t:t+Tt[e].reduce(m(te,e),"")}function ae(){Tt&&b(L(Tt).reduce(ee,""),St),wt.classList.remove("fshSpinner")}function ne(){wt.classList.add("fshSpinner"),S(3,ae)}function se(t){kt=t.target.value,ne()}function ie(t){t&&(Tt=t,b(`<select name="member"><option value="- All -" selected>- All -</option>${L(t).sort(rt).reduce(Wt,"")}</select>`,$t),ne())}function oe(){const t=C("th",{textContent:"Member"})
return $t=v(),N(t,$t),t}function ce(){const t=dt({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
f(e,"<th>Date</th>")
const a=oe()
N(e,a),f(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){St=lt(),N(t,St)}(t),j(t,"change",se),wt=v({className:"tgCont fshSpinner64"}),N(wt,t),wt}function re(t){At.value=t,Et.classList.remove("fshSpinner")}function le(){At.value='{"lastUpdate": 0, "members": {}}'}function de(t){bt("Update successful"),ie(t.members)}function fe(){const t=R(At.value)
G("fsh_guildActivity",t).then(m(de,t)).catch(bt)}function ue(t,e){const a=pt({className:"custombutton",textContent:t})
return d(a,e),a}function me(){return Et=v({id:"io",className:"fshSpinner64"}),At=ht(),At.setAttribute("autocapitalize","off"),At.setAttribute("autocomplete","off"),At.setAttribute("autocorrect","off"),At.setAttribute("spellcheck","false"),Mt=ue("Save",fe),xt=ue("Reset",le),N(Et,At),N(Et,ut()),N(Et,Mt),N(Et,xt),Et}function pe(){return!Gt.checked}function he(t){Gt.checked&&"Escape"===t.code&&(Gt.checked=!1)}function be(t){pe()&&(t.style.transform=null)}function ge(){B("guildTracker","updateRawData"),Rt&&function(t){t&&(Et.classList.add("fshSpinner"),S(4,re,[t]))}(Rt)}function ve(){const t=function(){const t=v({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Bt=F({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),H(Bt,"change",ge),N(t,Bt),t}(),e=it({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return N(t,e),_(e,t),t}function je(){const t=ve(),e=function(){const t=v({className:"fsh-dialog-content"})
return N(t,ce()),N(t,me()),t}()
N(t,e),j(Gt,"change",m(be,t)),N(Ht,t)}function Ne(t){t&&(Rt=JSON.stringify(t),ie(t.members))}function ye(){B("guildTracker","openDialog"),D("fsh_guildActivity").then(Ne),I.dialogIsClosed=pe,f(Ht,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),je()}function Ce(){!function(){const t=h("#pCC img.guild_openGuildStore"),e=t.parentNode,a=v({className:"fsh-tracker"}),n=v({innerHTML:ct("enableGuildActivityTracker")+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
j(n,"change",qt),N(a,t),N(a,n),ot(e,a)}(),Gt=F({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),H(Gt,"change",ye),Ht=v({className:"fsh-dialog"}),N(Ht,Gt),j(document.body,"keydown",he),N(document.body,Ht)}let Le,Se
function ke(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function we(){Se?Se.disabled=!Le:function(){const t=V(i,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map(ke).join("\n")
Se=N(document.body,gt(s)).sheet}()}function $e(){Le=!Le,y("enableStamBars",Le),we(),B("guildManage","StamBars")}function Te(){!function(){const t=h("#pCC img.guild_openGuildStore").parentNode,e=N(t,v({className:"fshCenter",innerHTML:ct("enableStamBars")}))
j(e,"change",$e)}(),Le=o("enableStamBars"),Le&&we()}function Ae(t,e,a){const n=function(t){return vt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
N(t,function(t){const e=vt({innerHTML:"[&nbsp;"})
return N(e,t),f(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&jt(e),d(n,mt)}function Me(t){Ae(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function xe(t){const e=t.rows[4].cells[1].children[0]
b(e.innerHTML.trim(),e),Ae(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Ee(t){Ae(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Re(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
b(`[ <a href="${g}reliclist">Control</a> ]&nbsp;`,s)}function Ge(t){const e=V("li",t),a=e[e.length-1].parentNode
f(a,`<li><a href="${P}${U()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function He(t,e){S(3,e,[t])}function Be(t){z()||(o("detailedConflictInfo")&&S(3,Zt,[t]),S(4,Ce))}function De(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Me,xe,Ee,Re,Ge].forEach(m(He,t))}(t),S(3,Ut),Be(t),Te()}function Ie(){const t=h('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){S(3,Z),S(3,Ie),S(3,yt),"manage"===I.subcmd&&De(),"view"===I.subcmd&&Vt()}
//# sourceMappingURL=guild-1efc5535.js.map
