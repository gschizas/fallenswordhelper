import{g as t,p as e,bk as a,M as n,aa as s,bE as i,d as c,F as o,W as r,b2 as l,aw as d,a8 as u,o as f,i as h,aq as m,v as p,u as b,w as g,Q as v,B as L,s as N,k as y,e as C,f as S,l as k,a3 as w,q as $,au as j,a as M,bF as T,bG as A,bH as x,bI as H,bJ as R,bK as G,bL as E,al as B,aS as D,ai as I,P as _,$ as P,ag as V,c as F,bM as U,b as q,S as J,m as X,y as z,bN as K,ab as O}from"./calfSystem-d587d232.js"
import"./numberIsNaN-054e0c59.js"
import"./toLowerCase-f57cc259.js"
import{c as Q}from"./createInput-f5f615ed.js"
import{l as W}from"./onlineDot-c976faff.js"
import{s as Y}from"./setTipped-3e31c084.js"
import{b as Z}from"./batch-a68928f8.js"
import{c as tt,a as et}from"./compressBio-9443c9ed.js"
import"./createLabel-d01980d0.js"
import{c as at,b as nt,p as st,a as it,g as ct}from"./levelHighlight-5c499030.js"
import{d as ot}from"./dataRows-22551573.js"
import{c as rt}from"./createUl-8fcf56ef.js"
import"./isChecked-75e8367b.js"
import{b as lt}from"./simpleCheckbox-d7dd72e2.js"
import{a as dt}from"./alpha-7dc073eb.js"
import{c as ut}from"./createTBody-d864b9fe.js"
import{c as ft}from"./createTable-5f8e2bd3.js"
import"./isDate-e674ecfd.js"
import{f as ht}from"./formatLocalDateTime-9f6d250b.js"
import{c as mt,t as pt}from"./toggleVisibilty-19d7dd9f.js"
import{c as bt}from"./createButton-04c4f16f.js"
import{c as gt}from"./createTextArea-7dc1aafa.js"
import{d as vt}from"./dialogMsg-8c5a22d3.js"
import{c as Lt}from"./createStyle-5e050c42.js"
function Nt(t,e){const a=i.exec(e.dataset.tipped)
return W({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function yt(){const i=t("b",e).find(a("Members"))
if(i){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Nt,[0,0])}(t)
i.classList.add("tip-static"),Y(`Active: ${e[0]}/${t.length}<br>Stamina: ${s(e[1])}`,i)}}let Ct,St,kt,wt,$t,jt,Mt,Tt,At,xt,Ht,Rt,Gt,Et,Bt
function Dt(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return Ct&&t>=nt&&t<=st}(a)?function(t){return St&&t>=it&&t<=ct}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function It(t){const{tipped:e}=t.dataset
i.exec(e)[1]<7&&Dt(t,e)}function _t(){Number(r("guild_id"))!==l()&&(Ct||St)&&(at(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(It))}function Pt(){Ct=o("highlightPlayersNearMyLvl"),St=o("highlightGvGPlayersNearMyLvl"),_t(),o("enableHistoryCompressor")&&tt(t(c,e).slice(-2,-1)[0].rows[0].cells[0])}function Vt(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function Ft(t){"smallLink"===t.target.className&&m(t.target.previousElementSibling.text)}function Ut(){const t=d(`#pCC a[href^="${u}"]`)
Z([5,3,t,0,Vt]),f(e,Ft)}function qt(t){return p({cmd:"guild",subcmd:"conflicts",page:t})}function Jt(t,e){L(e,t.insertCell(-1))}function Xt(t,e,a){const n=t.insertRow(t.rows.length-2)
Jt(n,e),Jt(n,a)}function zt(t,e){Xt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Kt(t,e,a){1===e&&function(t){Xt(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(a),ot(t.rows,7,0).forEach(b(zt,a))}function Ot(t,e){const a=g(e),n=v('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=v("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Kt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){qt(t+1).then(b(e,a))}(s,Ot,t)}function Qt(t){const e=t.rows[6].cells[0].children[0]
e&&qt(1).then(b(Ot,{node:e}))}function Wt(t){"enableGuildActivityTracker"===t.target.id&&w("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Yt(t,e){return`${t}<option value="${e}">${e}</option>`}function Zt(t){return B(t)?"#DEF":t.toLocaleString()}function te(t,e,a){return e+"<tr>"+`<td>${ht(new Date(1e3*a[T]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${Zt(a[A])}</td>`+`<td class="fshRight">${Zt(a[x])}</td>`+`<td class="fshRight">${Zt(a[H])}</td>`+`<td class="fshRight">${Zt(a[R])}</td>`+`<td class="fshRight">${Math.floor(a[H]/a[R]*100)}</td>`+`<td class="fshRight">${a[G]}</td>`+`<td class="fshRight">${Zt(a[E])}</td></tr>`}function ee(t,e){return function(t){return wt&&"- All -"!==wt&&wt!==t}(e)?t:t+Mt[e].reduce(b(te,e),"")}function ae(){Mt&&L(j(Mt).reduce(ee,""),kt),$t.classList.remove("fshSpinner")}function ne(){$t.classList.add("fshSpinner"),M(3,ae)}function se(t){wt=t.target.value,ne()}function ie(t){t&&(Mt=t,L(`<select name="member"><option value="- All -" selected>- All -</option>${j(t).sort(dt).reduce(Yt,"")}</select>`,jt),ne())}function ce(){const t=$("th",{textContent:"Member"})
return jt=y(),S(t,jt),t}function oe(){const t=ft({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const a=ce()
S(e,a),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){kt=ut(),S(t,kt)}(t),C(t,"change",se),$t=y({className:"tgCont fshSpinner64"}),S($t,t),$t}function re(t){Tt.value=t,Ht.classList.remove("fshSpinner")}function le(){Tt.value='{"lastUpdate": 0, "members": {}}'}function de(t){vt("Update successful"),ie(t.members)}function ue(){const t=D(Tt.value)
I("fsh_guildActivity",t).then(b(de,t)).catch(vt)}function fe(t,e){const a=bt({className:"custombutton",textContent:t})
return f(a,e),a}function he(){return Ht=y({id:"io",className:"fshSpinner64"}),Tt=gt(),Tt.setAttribute("autocapitalize","off"),Tt.setAttribute("autocomplete","off"),Tt.setAttribute("autocorrect","off"),Tt.setAttribute("spellcheck","false"),At=fe("Save",ue),xt=fe("Reset",le),S(Ht,Tt),S(Ht,mt()),S(Ht,At),S(Ht,xt),Ht}function me(){return!Gt.checked}function pe(t){Gt.checked&&"Escape"===t.code&&(Gt.checked=!1)}function be(t){me()&&(t.style.transform=null)}function ge(){P("guildTracker","updateRawData"),Rt&&function(t){t&&(Ht.classList.add("fshSpinner"),M(4,re,[t]))}(Rt)}function ve(){const t=function(){const t=y({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Bt=Q({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),_(Bt,"change",ge),S(t,Bt),t}(),e=rt({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return S(t,e),U(e,t),t}function Le(){const t=ve(),e=function(){const t=y({className:"fsh-dialog-content"})
return S(t,oe()),S(t,he()),t}()
S(t,e),C(Gt,"change",b(be,t)),S(Et,t)}function Ne(t){t&&(Rt=JSON.stringify(t),ie(t.members))}function ye(){P("guildTracker","openDialog"),V("fsh_guildActivity").then(Ne),F.dialogIsClosed=me,h(Et,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Le()}function Ce(){!function(){const t=v("#pCC img.guild_openGuildStore"),e=t.parentNode,a=y({className:"fsh-tracker"}),n=y({innerHTML:lt("enableGuildActivityTracker")+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
C(n,"change",Wt),S(a,t),S(a,n),k(e,a)}(),Gt=Q({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),_(Gt,"change",ye),Et=y({className:"fsh-dialog"}),S(Et,Gt),C(document.body,"keydown",pe),S(document.body,Et)}let Se,ke
function we(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function $e(){ke?ke.disabled=!Se:function(){const t=q(c,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map(we).join("\n")
ke=S(document.body,Lt(s)).sheet}()}function je(){Se=!Se,w("enableStamBars",Se),$e(),P("guildManage","StamBars")}function Me(){!function(){const t=v("#pCC img.guild_openGuildStore").parentNode,e=S(t,y({className:"fshCenter",innerHTML:lt("enableStamBars")}))
C(e,"change",je)}(),Se=o("enableStamBars"),Se&&$e()}function Te(t,e,a){const n=function(t){return J({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
S(t,function(t){const e=J({innerHTML:"[&nbsp;"})
return S(e,t),h(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&X(e),f(n,pt)}function Ae(t){Te(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function xe(t){const e=t.rows[4].cells[1].children[0]
L(e.innerHTML.trim(),e),Te(e,t.rows[6].cells[0].children[0],"statisticsControl")}function He(t){Te(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Re(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
L(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function Ge(t){const e=q("li",t),a=e[e.length-1].parentNode
h(a,`<li><a href="${K}${O()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ee(t,e){M(3,e,[t])}function Be(t){z()||(o("detailedConflictInfo")&&M(3,Qt,[t]),M(4,Ce))}function De(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ae,xe,He,Re,Ge].forEach(b(Ee,t))}(t),M(3,Ut),Be(t),Me()}function Ie(){const t=v('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){M(3,et),M(3,Ie),M(3,yt),"manage"===F.subcmd&&De(),"view"===F.subcmd&&Pt()}
//# sourceMappingURL=guild-c9aaa153.js.map
