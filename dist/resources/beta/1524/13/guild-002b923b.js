import{g as t,p as e,bn as a,N as n,ab as s,bL as i,c,G as o,X as r,b3 as l,ax as u,a9 as f,o as d,i as h,ar as m,w as b,v as p,x as g,R as v,C as N,u as L,l as C,f as y,h as S,m as k,a4 as w,r as j,av as T,a as $,bM as M,bN as x,bO as A,bP as R,bQ as H,bR as G,bS as E,am as D,aT as B,aj as I,Q as _,a0 as P,ah as U,e as V,bT as X,b as z,T as O,n as Q,z as F,bU as J,ac as q}from"./calfSystem-1e164202.js"
import"./numberIsNaN-caf9724d.js"
import"./toLowerCase-83d180c2.js"
import{c as K}from"./createInput-57c382fb.js"
import{l as W}from"./onlineDot-af3a0378.js"
import{s as Y}from"./setTipped-dbd83d5f.js"
import{b as Z}from"./batch-ce2b38cf.js"
import{c as tt,a as et}from"./compressBio-3e56e053.js"
import"./createLabel-dfc46f16.js"
import{c as at,b as nt,p as st,a as it,g as ct}from"./levelHighlight-1fbc2a18.js"
import{d as ot}from"./dataRows-51374ccd.js"
import{c as rt}from"./createUl-477ed217.js"
import"./isChecked-a6837b63.js"
import{b as lt}from"./simpleCheckbox-e560fb3f.js"
import{a as ut}from"./alpha-f9bc5317.js"
import{c as ft}from"./createTBody-75fc7b64.js"
import{c as dt}from"./createTable-82fabb58.js"
import"./isDate-15e6062a.js"
import{f as ht}from"./formatLocalDateTime-f28b71af.js"
import{c as mt,t as bt}from"./toggleVisibilty-49577141.js"
import{c as pt}from"./createButton-85e0a2ef.js"
import{c as gt}from"./createTextArea-c501a33a.js"
import{d as vt}from"./dialogMsg-b431c172.js"
import{c as Nt}from"./createStyle-96eea581.js"
function Lt(t,e){const a=i.exec(e.dataset.tipped)
return W({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function Ct(){const i=t("b",e).find(a("Members"))
if(i){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
i.classList.add("tip-static"),Y(`Active: ${e[0]}/${t.length}<br>Stamina: ${s(e[1])}`,i)}}let yt,St,kt,wt,jt,Tt,$t,Mt,xt,At,Rt,Ht,Gt,Et,Dt
function Bt(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return yt&&t>=nt&&t<=st}(a)?function(t){return St&&t>=it&&t<=ct}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function It(t){const{tipped:e}=t.dataset
i.exec(e)[1]<7&&Bt(t,e)}function _t(){Number(r("guild_id"))!==l()&&(yt||St)&&(at(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(It))}function Pt(){yt=o("highlightPlayersNearMyLvl"),St=o("highlightGvGPlayersNearMyLvl"),_t(),o("enableHistoryCompressor")&&tt(t(c,e).slice(-2,-1)[0].rows[0].cells[0])}function Ut(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function Vt(t){"smallLink"===t.target.className&&m(t.target.previousElementSibling.text)}function Xt(){const t=u(`#pCC a[href^="${f}"]`)
Z([5,3,t,0,Ut]),d(e,Vt)}function zt(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function Ot(t,e){N(e,t.insertCell(-1))}function Qt(t,e,a){const n=t.insertRow(t.rows.length-2)
Ot(n,e),Ot(n,a)}function Ft(t,e){Qt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Jt(t,e,a){1===e&&function(t){Qt(t,`<a href="${L}conflicts">Active Conflicts</a>`,"Score")}(a),ot(t.rows,7,0).forEach(p(Ft,a))}function qt(t,e){const a=g(e),n=v('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=v("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Jt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){zt(t+1).then(p(e,a))}(s,qt,t)}function Kt(t){const e=t.rows[6].cells[0].children[0]
e&&zt(1).then(p(qt,{node:e}))}function Wt(t){"enableGuildActivityTracker"===t.target.id&&w("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Yt(t,e){return`${t}<option value="${e}">${e}</option>`}function Zt(t){return D(t)?"#DEF":t.toLocaleString()}function te(t,e,a){return e+"<tr>"+`<td>${ht(new Date(1e3*a[M]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${Zt(a[x])}</td>`+`<td class="fshRight">${Zt(a[A])}</td>`+`<td class="fshRight">${Zt(a[R])}</td>`+`<td class="fshRight">${Zt(a[H])}</td>`+`<td class="fshRight">${Math.floor(a[R]/a[H]*100)}</td>`+`<td class="fshRight">${a[G]}</td>`+`<td class="fshRight">${Zt(a[E])}</td></tr>`}function ee(t,e){return function(t){return wt&&"- All -"!==wt&&wt!==t}(e)?t:t+$t[e].reduce(p(te,e),"")}function ae(){$t&&N(T($t).reduce(ee,""),kt),jt.classList.remove("fshSpinner")}function ne(){jt.classList.add("fshSpinner"),$(3,ae)}function se(t){wt=t.target.value,ne()}function ie(t){t&&($t=t,N(`<select name="member"><option value="- All -" selected>- All -</option>${T(t).sort(ut).reduce(Yt,"")}</select>`,Tt),ne())}function ce(){const t=j("th",{textContent:"Member"})
return Tt=C(),S(t,Tt),t}function oe(){const t=dt({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const a=ce()
S(e,a),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){kt=ft(),S(t,kt)}(t),y(t,"change",se),jt=C({className:"tgCont fshSpinner64"}),S(jt,t),jt}function re(t){Mt.value=t,Rt.classList.remove("fshSpinner")}function le(){Mt.value='{"lastUpdate": 0, "members": {}}'}function ue(t){vt("Update successful"),ie(t.members)}function fe(){const t=B(Mt.value)
I("fsh_guildActivity",t).then(p(ue,t)).catch(vt)}function de(t,e){const a=pt({className:"custombutton",textContent:t})
return d(a,e),a}function he(){return Rt=C({id:"io",className:"fshSpinner64"}),Mt=gt(),Mt.setAttribute("autocapitalize","off"),Mt.setAttribute("autocomplete","off"),Mt.setAttribute("autocorrect","off"),Mt.setAttribute("spellcheck","false"),xt=de("Save",fe),At=de("Reset",le),S(Rt,Mt),S(Rt,mt()),S(Rt,xt),S(Rt,At),Rt}function me(){return!Gt.checked}function be(t){Gt.checked&&"Escape"===t.code&&(Gt.checked=!1)}function pe(t){me()&&(t.style.transform=null)}function ge(){P("guildTracker","updateRawData"),Ht&&function(t){t&&(Rt.classList.add("fshSpinner"),$(4,re,[t]))}(Ht)}function ve(){const t=function(){const t=C({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Dt=K({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),_(Dt,"change",ge),S(t,Dt),t}(),e=rt({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return S(t,e),X(e,t),t}function Ne(){const t=ve(),e=function(){const t=C({className:"fsh-dialog-content"})
return S(t,oe()),S(t,he()),t}()
S(t,e),y(Gt,"change",p(pe,t)),S(Et,t)}function Le(t){t&&(Ht=JSON.stringify(t),ie(t.members))}function Ce(){P("guildTracker","openDialog"),U("fsh_guildActivity").then(Le),V.dialogIsClosed=me,h(Et,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Ne()}function ye(){!function(){const t=v("#pCC img.guild_openGuildStore"),e=t.parentNode,a=C({className:"fsh-tracker"}),n=C({innerHTML:lt("enableGuildActivityTracker")+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
y(n,"change",Wt),S(a,t),S(a,n),k(e,a)}(),Gt=K({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),_(Gt,"change",Ce),Et=C({className:"fsh-dialog"}),S(Et,Gt),y(document.body,"keydown",be),S(document.body,Et)}let Se,ke
function we(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function je(){ke?ke.disabled=!Se:function(){const t=z(c,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map(we).join("\n")
ke=S(document.body,Nt(s)).sheet}()}function Te(){Se=!Se,w("enableStamBars",Se),je(),P("guildManage","StamBars")}function $e(){!function(){const t=v("#pCC img.guild_openGuildStore").parentNode,e=S(t,C({className:"fshCenter",innerHTML:lt("enableStamBars")}))
y(e,"change",Te)}(),Se=o("enableStamBars"),Se&&je()}function Me(t,e,a){const n=function(t){return O({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
S(t,function(t){const e=O({innerHTML:"[&nbsp;"})
return S(e,t),h(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&Q(e),d(n,bt)}function xe(t){Me(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ae(t){const e=t.rows[4].cells[1].children[0]
N(e.innerHTML.trim(),e),Me(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Re(t){Me(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function He(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
N(`[ <a href="${L}reliclist">Control</a> ]&nbsp;`,s)}function Ge(t){const e=z("li",t),a=e[e.length-1].parentNode
h(a,`<li><a href="${J}${q()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ee(t,e){$(3,e,[t])}function De(t){F()||(o("detailedConflictInfo")&&$(3,Kt,[t]),$(4,ye))}function Be(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[xe,Ae,Re,He,Ge].forEach(p(Ee,t))}(t),$(3,Xt),De(t),$e()}function Ie(){const t=v('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){$(3,et),$(3,Ie),$(3,Ct),"manage"===V.subcmd&&Be(),"view"===V.subcmd&&Pt()}
//# sourceMappingURL=guild-002b923b.js.map
