import{g as t,p as e,b6 as a,N as n,ac as s,bP as i,c,G as o,Y as r,b4 as l,aA as u,aa as d,o as f,i as h,au as m,w as b,v as p,x as g,S as v,C as N,u as C,l as L,f as y,h as S,m as k,a5 as w,r as $,ay as j,a as T,bQ as A,bR as M,bS as x,bT as R,bU as H,bV as G,bW as E,an as B,aV as D,ak as I,Q as V,a1 as _,ai as U,e as P,bX as X,b as z,U as Q,n as Y,z as F,bY as J,ad as O}from"./calfSystem-9b1fa4ca.js"
import"./numberIsNaN-6f59053c.js"
import"./toLowerCase-cb0a8722.js"
import{c as W}from"./createInput-097870f4.js"
import{l as q}from"./onlineDot-ae55259c.js"
import{b as K}from"./batch-71913221.js"
import{c as Z,a as tt}from"./compressBio-194cf02b.js"
import"./createLabel-9fc35de2.js"
import{c as et,b as at,p as nt,a as st,g as it}from"./levelHighlight-e81bb645.js"
import{d as ct}from"./dataRows-fb2431de.js"
import{c as ot}from"./createUl-4f91ab2c.js"
import"./isChecked-c7d79538.js"
import{b as rt}from"./simpleCheckbox-8c7c7b00.js"
import{a as lt}from"./alpha-4bb25a31.js"
import{c as ut}from"./createTBody-7410a11b.js"
import{c as dt}from"./createTable-aa7942b1.js"
import"./isDate-dcf658b5.js"
import{f as ft}from"./formatLocalDateTime-5d5ddd42.js"
import{c as ht}from"./createBr-d5520a60.js"
import{c as mt}from"./createButton-91feba56.js"
import{c as bt}from"./createTextArea-a62ca881.js"
import{d as pt}from"./dialogMsg-91ed6ec0.js"
import{c as gt}from"./createStyle-a59d0f88.js"
import{t as vt}from"./toggleVisibilty-35e0d99b.js"
function Nt(t,e){const a=i.exec(e.dataset.tipped)
return q({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function Ct(){const i=t("b",e).find(a("Members"))
if(i){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Nt,[0,0])}(t)
i.classList.add("tip-static"),i.dataset.tipped=`Active: ${e[0]}/${t.length}<br>`+`Stamina: ${s(e[1])}`}}function Lt(){}let yt,St,kt,wt,$t,jt,Tt,At,Mt,xt,Rt,Ht,Gt,Et,Bt
function Dt(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return yt&&t>=at&&t<=nt}(a)?function(t){return St&&t>=st&&t<=it}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function It(t){const{tipped:e}=t.dataset
i.exec(e)[1]<7&&Dt(t,e)}function Vt(){Number(r("guild_id"))!==l()&&(yt||St)&&(et(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(It))}function _t(){yt=o("highlightPlayersNearMyLvl"),St=o("highlightGvGPlayersNearMyLvl"),Vt(),o("enableHistoryCompressor")&&Z(t(c,e).slice(-2,-1)[0].rows[0].cells[0])}function Ut(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function Pt(t){"smallLink"===t.target.className&&m(t.target.previousElementSibling.text)}function Xt(){const t=u(`#pCC a[href^="${d}"]`)
K([5,3,t,0,Ut]),f(e,Pt)}function zt(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function Qt(t,e){N(e,t.insertCell(-1))}function Yt(t,e,a){const n=t.insertRow(t.rows.length-2)
Qt(n,e),Qt(n,a)}function Ft(t,e){Yt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Jt(t,e,a){1===e&&function(t){Yt(t,`<a href="${C}conflicts">Active Conflicts</a>`,"Score")}(a),ct(t.rows,7,0).forEach(p(Ft,a))}function Ot(t,e){const a=g(e),n=v('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=v("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Jt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){zt(t+1).then(p(e,a))}(s,Ot,t)}function Wt(t){const e=t.rows[6].cells[0].children[0]
e&&zt(1).then(p(Ot,{node:e}))}function qt(t){"enableGuildActivityTracker"===t.target.id&&w("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Kt(t,e){return`${t}<option value="${e}">${e}</option>`}function Zt(t){return B(t)?"#DEF":t.toLocaleString()}function te(t,e,a){return`${e}<tr>`+`<td>${ft(new Date(1e3*a[A]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${Zt(a[M])}</td>`+`<td class="fshRight">${Zt(a[x])}</td>`+`<td class="fshRight">${Zt(a[R])}</td>`+`<td class="fshRight">${Zt(a[H])}</td>`+`<td class="fshRight">${Math.floor(a[R]/a[H]*100)}</td>`+`<td class="fshRight">${a[G]}</td>`+`<td class="fshRight">${Zt(a[E])}</td>`+"</tr>"}function ee(t,e){return function(t){return wt&&"- All -"!==wt&&wt!==t}(e)?t:t+Tt[e].reduce(p(te,e),"")}function ae(){Tt&&N(j(Tt).reduce(ee,""),kt),$t.classList.remove("fshSpinner")}function ne(){$t.classList.add("fshSpinner"),T(3,ae)}function se(t){wt=t.target.value,ne()}function ie(t){t&&(Tt=t,N('<select name="member">'+`<option value="- All -" selected>- All -</option>${j(t).sort(lt).reduce(Kt,"")}</select>`,jt),ne())}function ce(){const t=$("th",{textContent:"Member"})
return jt=L(),S(t,jt),t}function oe(){const t=dt({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const a=ce()
S(e,a),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){kt=ut(),S(t,kt)}(t),y(t,"change",se),$t=L({className:"tgCont fshSpinner64"}),S($t,t),$t}function re(t){At.value=t,Rt.classList.remove("fshSpinner")}function le(){At.value='{"lastUpdate": 0, "members": {}}'}function ue(t){pt("Update successful"),ie(t.members)}function de(){const t=D(At.value)
I("fsh_guildActivity",t).then(p(ue,t)).catch(pt)}function fe(t,e){const a=mt({className:"custombutton",textContent:t})
return f(a,e),a}function he(){return Rt=L({id:"io",className:"fshSpinner64"}),At=bt(),At.setAttribute("autocapitalize","off"),At.setAttribute("autocomplete","off"),At.setAttribute("autocorrect","off"),At.setAttribute("spellcheck","false"),Mt=fe("Save",de),xt=fe("Reset",le),S(Rt,At),S(Rt,ht()),S(Rt,Mt),S(Rt,xt),Rt}function me(){return!Gt.checked}function be(t){Gt.checked&&"Escape"===t.code&&(Gt.checked=!1)}function pe(t){me()&&(t.style.transform=null)}function ge(){_("guildTracker","updateRawData"),Ht&&function(t){t&&(Rt.classList.add("fshSpinner"),T(4,re,[t]))}(Ht)}function ve(){const t=function(){const t=L({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Bt=W({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),V(Bt,"change",ge),S(t,Bt),t}(),e=ot({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return S(t,e),X(e,t),t}function Ne(){const t=ve(),e=function(){const t=L({className:"fsh-dialog-content"})
return S(t,oe()),S(t,he()),t}()
S(t,e),y(Gt,"change",p(pe,t)),S(Et,t)}function Ce(t){t&&(Ht=JSON.stringify(t),ie(t.members))}function Le(){_("guildTracker","openDialog"),U("fsh_guildActivity").then(Ce),P.dialogIsClosed=me,h(Et,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Ne()}function ye(){!function(){const t=v("#pCC img.guild_openGuildStore"),e=t.parentNode,a=L({className:"fsh-tracker"}),n=L({innerHTML:`${rt("enableGuildActivityTracker")}&nbsp;<label class="custombutton" for="tracker">Show</label>`})
y(n,"change",qt),S(a,t),S(a,n),k(e,a)}(),Gt=W({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),V(Gt,"change",Le),Et=L({className:"fsh-dialog"}),S(Et,Gt),y(document.body,"keydown",be),S(document.body,Et)}let Se,ke
function we(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return"#fshMemberList "+`tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {`+`background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, `+`transparent ${e+1}%)}`}function $e(){ke?ke.disabled=!Se:function(){const t=z(c,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map(we).join("\n")
ke=S(document.body,gt(s)).sheet}()}function je(){Se=!Se,w("enableStamBars",Se),$e(),_("guildManage","StamBars")}function Te(){!function(){const t=v("#pCC img.guild_openGuildStore").parentNode,e=S(t,L({className:"fshCenter",innerHTML:rt("enableStamBars")}))
y(e,"change",je)}(),Se=o("enableStamBars"),Se&&$e()}function Ae(t,e,a){const n=function(t){return Q({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
S(t,function(t){const e=Q({innerHTML:"[&nbsp;"})
return S(e,t),h(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&Y(e),f(n,vt)}function Me(t){Ae(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function xe(t){const e=t.rows[4].cells[1].children[0]
N(e.innerHTML.trim(),e),Ae(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Re(t){Ae(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function He(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
N(`[ <a href="${C}reliclist">Control</a> ]&nbsp;`,s)}function Ge(t){const e=z("li",t),a=e[e.length-1].parentNode
h(a,`<li><a href="${J}${O()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ee(t,e){T(3,e,[t])}function Be(t){F()||(o("detailedConflictInfo")&&T(3,Wt,[t]),T(4,ye))}function De(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Me,xe,Re,He,Ge].forEach(p(Ee,t))}(t),T(3,Xt),Be(t),Te()}function Ie(){const t=v('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){T(3,tt),T(3,Ie),T(3,Lt),T(3,Ct),"manage"===P.subcmd&&De(),"view"===P.subcmd&&_t()}
//# sourceMappingURL=guild-55e00f97.js.map
