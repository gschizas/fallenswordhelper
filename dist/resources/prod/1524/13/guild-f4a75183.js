import{g as t,p as e,bl as a,N as n,ab as s,bF as i,c,G as o,X as r,b3 as l,ax as u,a9 as d,o as f,i as h,ar as m,w as b,v as p,x as g,R as v,C as N,u as L,l as C,f as y,h as S,m as k,a4 as w,r as j,av as T,a as $,bG as M,bH as x,bI as A,bJ as R,bK as H,bL as G,bM as E,am as D,aT as B,aj as I,Q as _,a0 as V,ah as P,e as U,bN as X,b as z,T as F,n as J,z as O,bO as K,ac as Q}from"./calfSystem-e6a24264.js"
import"./numberIsNaN-c3be1434.js"
import"./toLowerCase-d16882cd.js"
import{c as q}from"./createInput-0d3b3ee8.js"
import{l as W}from"./onlineDot-7be5e04f.js"
import{s as Y}from"./setTipped-3dcc58a1.js"
import{b as Z}from"./batch-7ebdfd88.js"
import{c as tt,a as et}from"./compressBio-625e890a.js"
import"./createLabel-31db3868.js"
import{c as at,b as nt,p as st,a as it,g as ct}from"./levelHighlight-903ab6df.js"
import{d as ot}from"./dataRows-659c5afa.js"
import{c as rt}from"./createUl-8acf1b8c.js"
import"./isChecked-2896c552.js"
import{b as lt}from"./simpleCheckbox-1004d6af.js"
import{a as ut}from"./alpha-5cff921f.js"
import{c as dt}from"./createTBody-f78b7c39.js"
import{c as ft}from"./createTable-f54d2e50.js"
import"./isDate-42796083.js"
import{f as ht}from"./formatLocalDateTime-ae524e59.js"
import{c as mt,t as bt}from"./toggleVisibilty-3e19aeab.js"
import{c as pt}from"./createButton-925a6bb8.js"
import{c as gt}from"./createTextArea-c9631ab4.js"
import{d as vt}from"./dialogMsg-4d5d1433.js"
import{c as Nt}from"./createStyle-d45e7007.js"
function Lt(t,e){const a=i.exec(e.dataset.tipped)
return W({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function Ct(){const i=t("b",e).find(a("Members"))
if(i){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
i.classList.add("tip-static"),Y(`Active: ${e[0]}/${t.length}<br>Stamina: ${s(e[1])}`,i)}}let yt,St,kt,wt,jt,Tt,$t,Mt,xt,At,Rt,Ht,Gt,Et,Dt
function Bt(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return yt&&t>=nt&&t<=st}(a)?function(t){return St&&t>=it&&t<=ct}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function It(t){const{tipped:e}=t.dataset
i.exec(e)[1]<7&&Bt(t,e)}function _t(){Number(r("guild_id"))!==l()&&(yt||St)&&(at(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(It))}function Vt(){yt=o("highlightPlayersNearMyLvl"),St=o("highlightGvGPlayersNearMyLvl"),_t(),o("enableHistoryCompressor")&&tt(t(c,e).slice(-2,-1)[0].rows[0].cells[0])}function Pt(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function Ut(t){"smallLink"===t.target.className&&m(t.target.previousElementSibling.text)}function Xt(){const t=u(`#pCC a[href^="${d}"]`)
Z([5,3,t,0,Pt]),f(e,Ut)}function zt(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function Ft(t,e){N(e,t.insertCell(-1))}function Jt(t,e,a){const n=t.insertRow(t.rows.length-2)
Ft(n,e),Ft(n,a)}function Ot(t,e){Jt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Kt(t,e,a){1===e&&function(t){Jt(t,`<a href="${L}conflicts">Active Conflicts</a>`,"Score")}(a),ot(t.rows,7,0).forEach(p(Ot,a))}function Qt(t,e){const a=g(e),n=v('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=v("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Kt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){zt(t+1).then(p(e,a))}(s,Qt,t)}function qt(t){const e=t.rows[6].cells[0].children[0]
e&&zt(1).then(p(Qt,{node:e}))}function Wt(t){"enableGuildActivityTracker"===t.target.id&&w("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Yt(t,e){return`${t}<option value="${e}">${e}</option>`}function Zt(t){return D(t)?"#DEF":t.toLocaleString()}function te(t,e,a){return e+"<tr>"+`<td>${ht(new Date(1e3*a[M]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${Zt(a[x])}</td>`+`<td class="fshRight">${Zt(a[A])}</td>`+`<td class="fshRight">${Zt(a[R])}</td>`+`<td class="fshRight">${Zt(a[H])}</td>`+`<td class="fshRight">${Math.floor(a[R]/a[H]*100)}</td>`+`<td class="fshRight">${a[G]}</td>`+`<td class="fshRight">${Zt(a[E])}</td></tr>`}function ee(t,e){return function(t){return wt&&"- All -"!==wt&&wt!==t}(e)?t:t+$t[e].reduce(p(te,e),"")}function ae(){$t&&N(T($t).reduce(ee,""),kt),jt.classList.remove("fshSpinner")}function ne(){jt.classList.add("fshSpinner"),$(3,ae)}function se(t){wt=t.target.value,ne()}function ie(t){t&&($t=t,N(`<select name="member"><option value="- All -" selected>- All -</option>${T(t).sort(ut).reduce(Yt,"")}</select>`,Tt),ne())}function ce(){const t=j("th",{textContent:"Member"})
return Tt=C(),S(t,Tt),t}function oe(){const t=ft({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const a=ce()
S(e,a),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){kt=dt(),S(t,kt)}(t),y(t,"change",se),jt=C({className:"tgCont fshSpinner64"}),S(jt,t),jt}function re(t){Mt.value=t,Rt.classList.remove("fshSpinner")}function le(){Mt.value='{"lastUpdate": 0, "members": {}}'}function ue(t){vt("Update successful"),ie(t.members)}function de(){const t=B(Mt.value)
I("fsh_guildActivity",t).then(p(ue,t)).catch(vt)}function fe(t,e){const a=pt({className:"custombutton",textContent:t})
return f(a,e),a}function he(){return Rt=C({id:"io",className:"fshSpinner64"}),Mt=gt(),Mt.setAttribute("autocapitalize","off"),Mt.setAttribute("autocomplete","off"),Mt.setAttribute("autocorrect","off"),Mt.setAttribute("spellcheck","false"),xt=fe("Save",de),At=fe("Reset",le),S(Rt,Mt),S(Rt,mt()),S(Rt,xt),S(Rt,At),Rt}function me(){return!Gt.checked}function be(t){Gt.checked&&"Escape"===t.code&&(Gt.checked=!1)}function pe(t){me()&&(t.style.transform=null)}function ge(){V("guildTracker","updateRawData"),Ht&&function(t){t&&(Rt.classList.add("fshSpinner"),$(4,re,[t]))}(Ht)}function ve(){const t=function(){const t=C({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Dt=q({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),_(Dt,"change",ge),S(t,Dt),t}(),e=rt({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return S(t,e),X(e,t),t}function Ne(){const t=ve(),e=function(){const t=C({className:"fsh-dialog-content"})
return S(t,oe()),S(t,he()),t}()
S(t,e),y(Gt,"change",p(pe,t)),S(Et,t)}function Le(t){t&&(Ht=JSON.stringify(t),ie(t.members))}function Ce(){V("guildTracker","openDialog"),P("fsh_guildActivity").then(Le),U.dialogIsClosed=me,h(Et,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Ne()}function ye(){!function(){const t=v("#pCC img.guild_openGuildStore"),e=t.parentNode,a=C({className:"fsh-tracker"}),n=C({innerHTML:lt("enableGuildActivityTracker")+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
y(n,"change",Wt),S(a,t),S(a,n),k(e,a)}(),Gt=q({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),_(Gt,"change",Ce),Et=C({className:"fsh-dialog"}),S(Et,Gt),y(document.body,"keydown",be),S(document.body,Et)}let Se,ke
function we(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function je(){ke?ke.disabled=!Se:function(){const t=z(c,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map(we).join("\n")
ke=S(document.body,Nt(s)).sheet}()}function Te(){Se=!Se,w("enableStamBars",Se),je(),V("guildManage","StamBars")}function $e(){!function(){const t=v("#pCC img.guild_openGuildStore").parentNode,e=S(t,C({className:"fshCenter",innerHTML:lt("enableStamBars")}))
y(e,"change",Te)}(),Se=o("enableStamBars"),Se&&je()}function Me(t,e,a){const n=function(t){return F({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
S(t,function(t){const e=F({innerHTML:"[&nbsp;"})
return S(e,t),h(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&J(e),f(n,bt)}function xe(t){Me(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ae(t){const e=t.rows[4].cells[1].children[0]
N(e.innerHTML.trim(),e),Me(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Re(t){Me(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function He(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
N(`[ <a href="${L}reliclist">Control</a> ]&nbsp;`,s)}function Ge(t){const e=z("li",t),a=e[e.length-1].parentNode
h(a,`<li><a href="${K}${Q()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ee(t,e){$(3,e,[t])}function De(t){O()||(o("detailedConflictInfo")&&$(3,qt,[t]),$(4,ye))}function Be(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[xe,Ae,Re,He,Ge].forEach(p(Ee,t))}(t),$(3,Xt),De(t),$e()}function Ie(){const t=v('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){$(3,et),$(3,Ie),$(3,Ct),"manage"===U.subcmd&&Be(),"view"===U.subcmd&&Vt()}
//# sourceMappingURL=guild-f4a75183.js.map
