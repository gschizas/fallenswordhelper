import{g as t,p as e,b8 as a,I as n,bs as s,d as i,D as o,M as c,ah as r,_ as l,o as d,i as f,t as u,s as m,u as p,L as h,z as b,r as g,k as v,e as j,f as N,V as y,m as L,ag as C,a as S,bt as k,bu as w,bv as $,bw as T,bx as A,by as M,bz as x,a8 as R,aE as E,a6 as H,K as B,R as G,a4 as D,c as I,bA as _,b as V,w as z,bB as P}from"./calfSystem-740ec4d2.js"
import"./numberIsNaN-2fbabd4d.js"
import{p as U}from"./playerName-a172b8d3.js"
import"./toLowerCase-dcd4458e.js"
import{c as O}from"./createInput-e6e1d6b3.js"
import{a as X}from"./addCommas-49286cf6.js"
import{l as F}from"./onlineDot-176ac2e8.js"
import{s as J}from"./setTipped-af58be0b.js"
import{b as K}from"./batch-b6a89158.js"
import{c as Q,a as Z}from"./compressBio-5d88febd.js"
import"./createLabel-de0fa934.js"
import{c as q}from"./currentGuildId-ce4d8404.js"
import"./intValue-576c2dec.js"
import"./valueText-3095af99.js"
import{c as W,b as Y,p as tt,a as et,g as at}from"./levelHighlight-2bc51b91.js"
import"./fshOpen-78430220.js"
import{o as nt}from"./openQuickBuffByName-e399773d.js"
import{d as st}from"./dataRows-4e334837.js"
import{c as it}from"./createUl-ebfbcd93.js"
import"./insertElementBefore-d3961941.js"
import{i as ot}from"./insertElementAfterBegin-08e27acb.js"
import"./isChecked-3cb537d5.js"
import{b as ct}from"./simpleCheckbox-f50ed15c.js"
import{a as rt}from"./alpha-28899565.js"
import{c as lt}from"./createTBody-cd7d668a.js"
import{c as dt}from"./createTable-0cac6208.js"
import"./isDate-1559670b.js"
import"./padZ-54c74bdd.js"
import{f as ft}from"./formatLocalDateTime-144e4c80.js"
import{c as ut,t as mt}from"./toggleVisibilty-e97ff965.js"
import{c as pt}from"./createButton-cf2f339d.js"
import{c as ht}from"./createTextArea-e25330d9.js"
import{d as bt}from"./dialogMsg-a44aafc4.js"
import{c as gt}from"./createStyle-d3a09e9f.js"
import{c as vt}from"./createSpan-b29fd959.js"
import{h as jt}from"./hideElement-f48178cf.js"
function Nt(t,e){const a=s.exec(e.dataset.tipped)
return F({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function yt(){const s=t("b",e).find(a("Members"))
if(s){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Nt,[0,0])}(t)
s.classList.add("tip-static"),J(`Active: ${e[0]}/${t.length}<br>Stamina: ${X(e[1])}`,s)}}let Lt,Ct,St,kt,wt,$t,Tt,At,Mt,xt,Rt,Et,Ht,Bt,Gt
function Dt(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return Lt&&t>=Y&&t<=tt}(a)?function(t){return Ct&&t>=et&&t<=at}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function It(t){const{tipped:e}=t.dataset
s.exec(e)[1]<7&&Dt(t,e)}function _t(){Number(c("guild_id"))!==q()&&(Lt||Ct)&&(W(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(It))}function Vt(){Lt=o("highlightPlayersNearMyLvl"),Ct=o("highlightGvGPlayersNearMyLvl"),_t(),o("enableHistoryCompressor")&&Q(t(i,e).slice(-2,-1)[0].rows[0].cells[0])}function zt(t){f(t.parentNode,' <span class="smallLink">[b]</span>')}function Pt(t){"smallLink"===t.target.className&&nt(t.target.previousElementSibling.text)}function Ut(){const t=r(`#pCC a[href^="${l}"]`)
K([5,3,t,0,zt]),d(e,Pt)}function Ot(t){return u({cmd:"guild",subcmd:"conflicts",page:t})}function Xt(t,e){b(e,t.insertCell(-1))}function Ft(t,e,a){const n=t.insertRow(t.rows.length-2)
Xt(n,e),Xt(n,a)}function Jt(t,e){Ft(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Kt(t,e,a){1===e&&function(t){Ft(t,`<a href="${g}conflicts">Active Conflicts</a>`,"Score")}(a),st(t.rows,7,0).forEach(m(Jt,a))}function Qt(t,e){const a=p(e),n=h('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=h("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Kt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){Ot(t+1).then(m(e,a))}(s,Qt,t)}function Zt(t){const e=t.rows[6].cells[0].children[0]
e&&Ot(1).then(m(Qt,{node:e}))}function qt(t){"enableGuildActivityTracker"===t.target.id&&y("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Wt(t,e){return`${t}<option value="${e}">${e}</option>`}function Yt(t){return R(t)?"#DEF":t.toLocaleString()}function te(t,e,a){return e+"<tr>"+`<td>${ft(new Date(1e3*a[k]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${Yt(a[w])}</td>`+`<td class="fshRight">${Yt(a[$])}</td>`+`<td class="fshRight">${Yt(a[T])}</td>`+`<td class="fshRight">${Yt(a[A])}</td>`+`<td class="fshRight">${Math.floor(a[T]/a[A]*100)}</td>`+`<td class="fshRight">${a[M]}</td>`+`<td class="fshRight">${Yt(a[x])}</td></tr>`}function ee(t,e){return function(t){return kt&&"- All -"!==kt&&kt!==t}(e)?t:t+Tt[e].reduce(m(te,e),"")}function ae(){Tt&&b(C(Tt).reduce(ee,""),St),wt.classList.remove("fshSpinner")}function ne(){wt.classList.add("fshSpinner"),S(3,ae)}function se(t){kt=t.target.value,ne()}function ie(t){t&&(Tt=t,b(`<select name="member"><option value="- All -" selected>- All -</option>${C(t).sort(rt).reduce(Wt,"")}</select>`,$t),ne())}function oe(){const t=L("th",{textContent:"Member"})
return $t=v(),N(t,$t),t}function ce(){const t=dt({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
f(e,"<th>Date</th>")
const a=oe()
N(e,a),f(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){St=lt(),N(t,St)}(t),j(t,"change",se),wt=v({className:"tgCont fshSpinner64"}),N(wt,t),wt}function re(t){At.value=t,Rt.classList.remove("fshSpinner")}function le(){At.value='{"lastUpdate": 0, "members": {}}'}function de(t){bt("Update successful"),ie(t.members)}function fe(){const t=E(At.value)
H("fsh_guildActivity",t).then(m(de,t)).catch(bt)}function ue(t,e){const a=pt({className:"custombutton",textContent:t})
return d(a,e),a}function me(){return Rt=v({id:"io",className:"fshSpinner64"}),At=ht(),At.setAttribute("autocapitalize","off"),At.setAttribute("autocomplete","off"),At.setAttribute("autocorrect","off"),At.setAttribute("spellcheck","false"),Mt=ue("Save",fe),xt=ue("Reset",le),N(Rt,At),N(Rt,ut()),N(Rt,Mt),N(Rt,xt),Rt}function pe(){return!Ht.checked}function he(t){Ht.checked&&"Escape"===t.code&&(Ht.checked=!1)}function be(t){pe()&&(t.style.transform=null)}function ge(){G("guildTracker","updateRawData"),Et&&function(t){t&&(Rt.classList.add("fshSpinner"),S(4,re,[t]))}(Et)}function ve(){const t=function(){const t=v({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Gt=O({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),B(Gt,"change",ge),N(t,Gt),t}(),e=it({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return N(t,e),_(e,t),t}function je(){const t=ve(),e=function(){const t=v({className:"fsh-dialog-content"})
return N(t,ce()),N(t,me()),t}()
N(t,e),j(Ht,"change",m(be,t)),N(Bt,t)}function Ne(t){t&&(Et=JSON.stringify(t),ie(t.members))}function ye(){G("guildTracker","openDialog"),D("fsh_guildActivity").then(Ne),I.dialogIsClosed=pe,f(Bt,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),je()}function Le(){!function(){const t=h("#pCC img.guild_openGuildStore"),e=t.parentNode,a=v({className:"fsh-tracker"}),n=v({innerHTML:ct("enableGuildActivityTracker")+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
j(n,"change",qt),N(a,t),N(a,n),ot(e,a)}(),Ht=O({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),B(Ht,"change",ye),Bt=v({className:"fsh-dialog"}),N(Bt,Ht),j(document.body,"keydown",he),N(document.body,Bt)}let Ce,Se
function ke(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function we(){Se?Se.disabled=!Ce:function(){const t=V(i,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map(ke).join("\n")
Se=N(document.body,gt(s)).sheet}()}function $e(){Ce=!Ce,y("enableStamBars",Ce),we(),G("guildManage","StamBars")}function Te(){!function(){const t=h("#pCC img.guild_openGuildStore").parentNode,e=N(t,v({className:"fshCenter",innerHTML:ct("enableStamBars")}))
j(e,"change",$e)}(),Ce=o("enableStamBars"),Ce&&we()}function Ae(t,e,a){const n=function(t){return vt({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
N(t,function(t){const e=vt({innerHTML:"[&nbsp;"})
return N(e,t),f(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&jt(e),d(n,mt)}function Me(t){Ae(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function xe(t){const e=t.rows[4].cells[1].children[0]
b(e.innerHTML.trim(),e),Ae(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Re(t){Ae(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Ee(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
b(`[ <a href="${g}reliclist">Control</a> ]&nbsp;`,s)}function He(t){const e=V("li",t),a=e[e.length-1].parentNode
f(a,`<li><a href="${P}${U()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Be(t,e){S(3,e,[t])}function Ge(t){z()||(o("detailedConflictInfo")&&S(3,Zt,[t]),S(4,Le))}function De(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Me,xe,Re,Ee,He].forEach(m(Be,t))}(t),S(3,Ut),Ge(t),Te()}function Ie(){const t=h('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){S(3,Z),S(3,Ie),S(3,yt),"manage"===I.subcmd&&De(),"view"===I.subcmd&&Vt()}
//# sourceMappingURL=guild-20991113.js.map
