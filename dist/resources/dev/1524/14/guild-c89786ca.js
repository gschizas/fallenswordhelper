import{g as t,p as e,b5 as a,M as n,ab as s,bO as i,d as c,F as o,X as r,b3 as l,az as u,a9 as f,o as d,i as m,at as h,v as b,u as p,w as g,R as v,B as L,s as N,k as y,e as C,f as S,l as k,a4 as j,q as w,ax as T,a as $,bP as M,bQ as A,bR as x,bS as R,bT as H,bU as G,bV as E,am as B,aU as D,aj as I,P as _,a0 as P,ah as U,c as V,bW as X,b as z,T as F,m as O,y as q,bX as J,ac as Q}from"./calfSystem-d96a3efd.js"
import"./numberIsNaN-5b8bfc11.js"
import"./toLowerCase-a0540d2c.js"
import{c as W}from"./createInput-2717f905.js"
import{l as K}from"./onlineDot-17edd2c6.js"
import{s as Y}from"./setTipped-906b0642.js"
import{b as Z}from"./batch-cdb16fc8.js"
import{c as tt,a as et}from"./compressBio-9800c306.js"
import"./createLabel-30fdcb3b.js"
import{c as at,b as nt,p as st,a as it,g as ct}from"./levelHighlight-580474a6.js"
import{d as ot}from"./dataRows-f436d5a8.js"
import{c as rt}from"./createUl-78e0780b.js"
import"./isChecked-028fa109.js"
import{b as lt}from"./simpleCheckbox-fb9f4a06.js"
import{a as ut}from"./alpha-2978f86d.js"
import{c as ft}from"./createTBody-f70881cb.js"
import{c as dt}from"./createTable-13920811.js"
import"./isDate-b5dd2678.js"
import{f as mt}from"./formatLocalDateTime-8bf290f3.js"
import{c as ht}from"./createBr-548e4e02.js"
import{c as bt}from"./createButton-e6d20fb1.js"
import{c as pt}from"./createTextArea-9b297a22.js"
import{d as gt}from"./dialogMsg-da77a98e.js"
import{c as vt}from"./createStyle-a27ee8ca.js"
import{t as Lt}from"./toggleVisibilty-9d216c2f.js"
function Nt(t,e){const a=i.exec(e.dataset.tipped)
return K({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function yt(){const i=t("b",e).find(a("Members"))
if(i){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Nt,[0,0])}(t)
i.classList.add("tip-static"),Y(`Active: ${e[0]}/${t.length}<br>Stamina: ${s(e[1])}`,i)}}function Ct(){}let St,kt,jt,wt,Tt,$t,Mt,At,xt,Rt,Ht,Gt,Et,Bt,Dt
function It(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return St&&t>=nt&&t<=st}(a)?function(t){return kt&&t>=it&&t<=ct}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function _t(t){const{tipped:e}=t.dataset
i.exec(e)[1]<7&&It(t,e)}function Pt(){Number(r("guild_id"))!==l()&&(St||kt)&&(at(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(_t))}function Ut(){St=o("highlightPlayersNearMyLvl"),kt=o("highlightGvGPlayersNearMyLvl"),Pt(),o("enableHistoryCompressor")&&tt(t(c,e).slice(-2,-1)[0].rows[0].cells[0])}function Vt(t){m(t.parentNode,' <span class="smallLink">[b]</span>')}function Xt(t){"smallLink"===t.target.className&&h(t.target.previousElementSibling.text)}function zt(){const t=u(`#pCC a[href^="${f}"]`)
Z([5,3,t,0,Vt]),d(e,Xt)}function Ft(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function Ot(t,e){L(e,t.insertCell(-1))}function qt(t,e,a){const n=t.insertRow(t.rows.length-2)
Ot(n,e),Ot(n,a)}function Jt(t,e){qt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Qt(t,e,a){1===e&&function(t){qt(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(a),ot(t.rows,7,0).forEach(p(Jt,a))}function Wt(t,e){const a=g(e),n=v('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=v("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Qt(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){Ft(t+1).then(p(e,a))}(s,Wt,t)}function Kt(t){const e=t.rows[6].cells[0].children[0]
e&&Ft(1).then(p(Wt,{node:e}))}function Yt(t){"enableGuildActivityTracker"===t.target.id&&j("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Zt(t,e){return`${t}<option value="${e}">${e}</option>`}function te(t){return B(t)?"#DEF":t.toLocaleString()}function ee(t,e,a){return e+"<tr>"+`<td>${mt(new Date(1e3*a[M]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${te(a[A])}</td>`+`<td class="fshRight">${te(a[x])}</td>`+`<td class="fshRight">${te(a[R])}</td>`+`<td class="fshRight">${te(a[H])}</td>`+`<td class="fshRight">${Math.floor(a[R]/a[H]*100)}</td>`+`<td class="fshRight">${a[G]}</td>`+`<td class="fshRight">${te(a[E])}</td></tr>`}function ae(t,e){return function(t){return wt&&"- All -"!==wt&&wt!==t}(e)?t:t+Mt[e].reduce(p(ee,e),"")}function ne(){Mt&&L(T(Mt).reduce(ae,""),jt),Tt.classList.remove("fshSpinner")}function se(){Tt.classList.add("fshSpinner"),$(3,ne)}function ie(t){wt=t.target.value,se()}function ce(t){t&&(Mt=t,L(`<select name="member"><option value="- All -" selected>- All -</option>${T(t).sort(ut).reduce(Zt,"")}</select>`,$t),se())}function oe(){const t=w("th",{textContent:"Member"})
return $t=y(),S(t,$t),t}function re(){const t=dt({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
m(e,"<th>Date</th>")
const a=oe()
S(e,a),m(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){jt=ft(),S(t,jt)}(t),C(t,"change",ie),Tt=y({className:"tgCont fshSpinner64"}),S(Tt,t),Tt}function le(t){At.value=t,Ht.classList.remove("fshSpinner")}function ue(){At.value='{"lastUpdate": 0, "members": {}}'}function fe(t){gt("Update successful"),ce(t.members)}function de(){const t=D(At.value)
I("fsh_guildActivity",t).then(p(fe,t)).catch(gt)}function me(t,e){const a=bt({className:"custombutton",textContent:t})
return d(a,e),a}function he(){return Ht=y({id:"io",className:"fshSpinner64"}),At=pt(),At.setAttribute("autocapitalize","off"),At.setAttribute("autocomplete","off"),At.setAttribute("autocorrect","off"),At.setAttribute("spellcheck","false"),xt=me("Save",de),Rt=me("Reset",ue),S(Ht,At),S(Ht,ht()),S(Ht,xt),S(Ht,Rt),Ht}function be(){return!Et.checked}function pe(t){Et.checked&&"Escape"===t.code&&(Et.checked=!1)}function ge(t){be()&&(t.style.transform=null)}function ve(){P("guildTracker","updateRawData"),Gt&&function(t){t&&(Ht.classList.add("fshSpinner"),$(4,le,[t]))}(Gt)}function Le(){const t=function(){const t=y({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Dt=W({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),_(Dt,"change",ve),S(t,Dt),t}(),e=rt({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return S(t,e),X(e,t),t}function Ne(){const t=Le(),e=function(){const t=y({className:"fsh-dialog-content"})
return S(t,re()),S(t,he()),t}()
S(t,e),C(Et,"change",p(ge,t)),S(Bt,t)}function ye(t){t&&(Gt=JSON.stringify(t),ce(t.members))}function Ce(){P("guildTracker","openDialog"),U("fsh_guildActivity").then(ye),V.dialogIsClosed=be,m(Bt,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Ne()}function Se(){!function(){const t=v("#pCC img.guild_openGuildStore"),e=t.parentNode,a=y({className:"fsh-tracker"}),n=y({innerHTML:lt("enableGuildActivityTracker")+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
C(n,"change",Yt),S(a,t),S(a,n),k(e,a)}(),Et=W({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),_(Et,"change",Ce),Bt=y({className:"fsh-dialog"}),S(Bt,Et),C(document.body,"keydown",pe),S(document.body,Bt)}let ke,je
function we(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`#fshMemberList tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function Te(){je?je.disabled=!ke:function(){const t=z(c,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map(we).join("\n")
je=S(document.body,vt(s)).sheet}()}function $e(){ke=!ke,j("enableStamBars",ke),Te(),P("guildManage","StamBars")}function Me(){!function(){const t=v("#pCC img.guild_openGuildStore").parentNode,e=S(t,y({className:"fshCenter",innerHTML:lt("enableStamBars")}))
C(e,"change",$e)}(),ke=o("enableStamBars"),ke&&Te()}function Ae(t,e,a){const n=function(t){return F({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
S(t,function(t){const e=F({innerHTML:"[&nbsp;"})
return S(e,t),m(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&O(e),d(n,Lt)}function xe(t){Ae(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Re(t){const e=t.rows[4].cells[1].children[0]
L(e.innerHTML.trim(),e),Ae(e,t.rows[6].cells[0].children[0],"statisticsControl")}function He(t){Ae(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Ge(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
L(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function Ee(t){const e=z("li",t),a=e[e.length-1].parentNode
m(a,`<li><a href="${J}${Q()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Be(t,e){$(3,e,[t])}function De(t){q()||(o("detailedConflictInfo")&&$(3,Kt,[t]),$(4,Se))}function Ie(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[xe,Re,He,Ge,Ee].forEach(p(Be,t))}(t),$(3,zt),De(t),Me()}function _e(){const t=v('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){$(3,et),$(3,_e),$(3,Ct),$(3,yt),"manage"===V.subcmd&&Ie(),"view"===V.subcmd&&Ut()}
//# sourceMappingURL=guild-c89786ca.js.map
