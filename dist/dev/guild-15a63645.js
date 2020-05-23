import{g as t,p as e,b6 as a,N as n,ac as s,bP as i,c,G as o,Y as r,b4 as l,aA as u,aa as f,o as d,i as m,au as h,w as p,v as b,x as g,S as v,C as N,u as C,l as L,f as y,h as S,m as k,a5 as w,r as $,ay as j,a as T,bQ as A,bR as M,bS as x,bT as R,bU as H,bV as G,bW as E,an as B,aV as D,ak as I,Q as V,a1 as _,ai as U,e as P,bX as X,b as z,U as Q,n as Y,z as F,bY as J,ad as O}from"./calfSystem-70b0df7f.js"
import"./numberIsNaN-888b325e.js"
import"./toLowerCase-28f7d145.js"
import{c as W}from"./createInput-9a444f78.js"
import{l as q}from"./onlineDot-75119c69.js"
import{s as K}from"./setTipped-19f09302.js"
import{b as Z}from"./batch-a98ea1eb.js"
import{c as tt,a as et}from"./compressBio-c0dcf591.js"
import"./createLabel-f4168a93.js"
import{c as at,b as nt,p as st,a as it,g as ct}from"./levelHighlight-f8c2fbff.js"
import{d as ot}from"./dataRows-e04f4366.js"
import{c as rt}from"./createUl-64948536.js"
import"./isChecked-c96092db.js"
import{b as lt}from"./simpleCheckbox-13baa371.js"
import{a as ut}from"./alpha-1eacb8e2.js"
import{c as ft}from"./createTBody-9634aab5.js"
import{c as dt}from"./createTable-1e93d178.js"
import"./isDate-765d290d.js"
import{f as mt}from"./formatLocalDateTime-c5a410cd.js"
import{c as ht}from"./createBr-9b6d3893.js"
import{c as pt}from"./createButton-e6779a69.js"
import{c as bt}from"./createTextArea-308ba704.js"
import{d as gt}from"./dialogMsg-0ef0d146.js"
import{c as vt}from"./createStyle-0fe4743c.js"
import{t as Nt}from"./toggleVisibilty-537a0cb4.js"
function Ct(t,e){const a=i.exec(e.dataset.tipped)
return q({min:a[3],hour:a[2],day:a[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function Lt(){const i=t("b",e).find(a("Members"))
if(i){const t=n('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Ct,[0,0])}(t)
i.classList.add("tip-static"),K(`Active: ${e[0]}/${t.length}<br>Stamina: ${s(e[1])}`,i)}}function yt(){}let St,kt,wt,$t,jt,Tt,At,Mt,xt,Rt,Ht,Gt,Et,Bt,Dt
function It(t,e){const a=Number(/VL:.+?(\d+)/.exec(e)[1]),n=t.parentNode.parentNode
!function(t){return St&&t>=nt&&t<=st}(a)?function(t){return kt&&t>=it&&t<=ct}(a)&&n.classList.add("lvlGvGHighlight"):n.classList.add("lvlHighlight")}function Vt(t){const{tipped:e}=t.dataset
i.exec(e)[1]<7&&It(t,e)}function _t(){Number(r("guild_id"))!==l()&&(St||kt)&&(at(),n('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(Vt))}function Ut(){St=o("highlightPlayersNearMyLvl"),kt=o("highlightGvGPlayersNearMyLvl"),_t(),o("enableHistoryCompressor")&&tt(t(c,e).slice(-2,-1)[0].rows[0].cells[0])}function Pt(t){m(t.parentNode,' <span class="smallLink">[b]</span>')}function Xt(t){"smallLink"===t.target.className&&h(t.target.previousElementSibling.text)}function zt(){const t=u(`#pCC a[href^="${f}"]`)
Z([5,3,t,0,Pt]),d(e,Xt)}function Qt(t){return p({cmd:"guild",subcmd:"conflicts",page:t})}function Yt(t,e){N(e,t.insertCell(-1))}function Ft(t,e,a){const n=t.insertRow(t.rows.length-2)
Yt(n,e),Yt(n,a)}function Jt(t,e){Ft(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ot(t,e,a){1===e&&function(t){Ft(t,`<a href="${C}conflicts">Active Conflicts</a>`,"Score")}(a),ot(t.rows,7,0).forEach(b(Jt,a))}function Wt(t,e){const a=g(e),n=v('#pCC input[name="page"]',a)
if(!n)return
const s=Number(n.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(n)
!function(t,e,a){const n=v("#pCC > table > tbody > tr > td > table",t)
n&&n.rows.length>3&&Ot(n,e,a)}(a,s,t.node),i>s&&function(t,e,a){Qt(t+1).then(b(e,a))}(s,Wt,t)}function qt(t){const e=t.rows[6].cells[0].children[0]
e&&Qt(1).then(b(Wt,{node:e}))}function Kt(t){"enableGuildActivityTracker"===t.target.id&&w("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Zt(t,e){return`${t}<option value="${e}">${e}</option>`}function te(t){return B(t)?"#DEF":t.toLocaleString()}function ee(t,e,a){return`${e}<tr>`+`<td>${mt(new Date(1e3*a[A]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${te(a[M])}</td>`+`<td class="fshRight">${te(a[x])}</td>`+`<td class="fshRight">${te(a[R])}</td>`+`<td class="fshRight">${te(a[H])}</td>`+`<td class="fshRight">${Math.floor(a[R]/a[H]*100)}</td>`+`<td class="fshRight">${a[G]}</td>`+`<td class="fshRight">${te(a[E])}</td>`+"</tr>"}function ae(t,e){return function(t){return $t&&"- All -"!==$t&&$t!==t}(e)?t:t+At[e].reduce(b(ee,e),"")}function ne(){At&&N(j(At).reduce(ae,""),wt),jt.classList.remove("fshSpinner")}function se(){jt.classList.add("fshSpinner"),T(3,ne)}function ie(t){$t=t.target.value,se()}function ce(t){t&&(At=t,N('<select name="member">'+`<option value="- All -" selected>- All -</option>${j(t).sort(ut).reduce(Zt,"")}</select>`,Tt),se())}function oe(){const t=$("th",{textContent:"Member"})
return Tt=L(),S(t,Tt),t}function re(){const t=dt({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
m(e,"<th>Date</th>")
const a=oe()
S(e,a),m(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){wt=ft(),S(t,wt)}(t),y(t,"change",ie),jt=L({className:"tgCont fshSpinner64"}),S(jt,t),jt}function le(t){Mt.value=t,Ht.classList.remove("fshSpinner")}function ue(){Mt.value='{"lastUpdate": 0, "members": {}}'}function fe(t){gt("Update successful"),ce(t.members)}function de(){const t=D(Mt.value)
I("fsh_guildActivity",t).then(b(fe,t)).catch(gt)}function me(t,e){const a=pt({className:"custombutton",textContent:t})
return d(a,e),a}function he(){return Ht=L({id:"io",className:"fshSpinner64"}),Mt=bt(),Mt.setAttribute("autocapitalize","off"),Mt.setAttribute("autocomplete","off"),Mt.setAttribute("autocorrect","off"),Mt.setAttribute("spellcheck","false"),xt=me("Save",de),Rt=me("Reset",ue),S(Ht,Mt),S(Ht,ht()),S(Ht,xt),S(Ht,Rt),Ht}function pe(){return!Et.checked}function be(t){Et.checked&&"Escape"===t.code&&(Et.checked=!1)}function ge(t){pe()&&(t.style.transform=null)}function ve(){_("guildTracker","updateRawData"),Gt&&function(t){t&&(Ht.classList.add("fshSpinner"),T(4,le,[t]))}(Gt)}function Ne(){const t=function(){const t=L({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Dt=W({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),V(Dt,"change",ve),S(t,Dt),t}(),e=rt({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return S(t,e),X(e,t),t}function Ce(){const t=Ne(),e=function(){const t=L({className:"fsh-dialog-content"})
return S(t,re()),S(t,he()),t}()
S(t,e),y(Et,"change",b(ge,t)),S(Bt,t)}function Le(t){t&&(Gt=JSON.stringify(t),ce(t.members))}function ye(){_("guildTracker","openDialog"),U("fsh_guildActivity").then(Le),P.dialogIsClosed=pe,m(Bt,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),Ce()}function Se(){!function(){const t=v("#pCC img.guild_openGuildStore"),e=t.parentNode,a=L({className:"fsh-tracker"}),n=L({innerHTML:`${lt("enableGuildActivityTracker")}&nbsp;<label class="custombutton" for="tracker">Show</label>`})
y(n,"change",Kt),S(a,t),S(a,n),k(e,a)}(),Et=W({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),V(Et,"change",ye),Bt=L({className:"fsh-dialog"}),S(Bt,Et),y(document.body,"keydown",be),S(document.body,Bt)}let ke,we
function $e(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return"#fshMemberList "+`tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {`+`background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, `+`transparent ${e+1}%)}`}function je(){we?we.disabled=!ke:function(){const t=z(c,e),a=t[t.length-1]
a.id="fshMemberList"
const s=n('a[href*="&player_id="]',a).map($e).join("\n")
we=S(document.body,vt(s)).sheet}()}function Te(){ke=!ke,w("enableStamBars",ke),je(),_("guildManage","StamBars")}function Ae(){!function(){const t=v("#pCC img.guild_openGuildStore").parentNode,e=S(t,L({className:"fshCenter",innerHTML:lt("enableStamBars")}))
y(e,"change",Te)}(),ke=o("enableStamBars"),ke&&je()}function Me(t,e,a){const n=function(t){return Q({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(a)
S(t,function(t){const e=Q({innerHTML:"[&nbsp;"})
return S(e,t),m(e,"&nbsp;]"),e}(n)),e.id=a,o(a)&&Y(e),d(n,Nt)}function xe(t){Me(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Re(t){const e=t.rows[4].cells[1].children[0]
N(e.innerHTML.trim(),e),Me(e,t.rows[6].cells[0].children[0],"statisticsControl")}function He(t){Me(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Ge(e){const n=t("b",e).filter(a("Relics"))
if(1!==n.length)return
const s=n[0].parentNode.nextElementSibling.children[0]
N(`[ <a href="${C}reliclist">Control</a> ]&nbsp;`,s)}function Ee(t){const e=z("li",t),a=e[e.length-1].parentNode
m(a,`<li><a href="${J}${O()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Be(t,e){T(3,e,[t])}function De(t){F()||(o("detailedConflictInfo")&&T(3,qt,[t]),T(4,Se))}function Ie(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[xe,Re,He,Ge,Ee].forEach(b(Be,t))}(t),T(3,zt),De(t),Ae()}function Ve(){const t=v('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){T(3,et),T(3,Ve),T(3,yt),T(3,Lt),"manage"===P.subcmd&&Ie(),"view"===P.subcmd&&Ut()}
//# sourceMappingURL=guild-15a63645.js.map
