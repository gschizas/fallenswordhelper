import{g as t,p as e,bn as n,N as a,ab as s,bL as i,c,G as o,X as r,b3 as l,ax as u,a9 as f,o as d,i as h,ar as m,w as b,v as p,x as g,R as v,C as N,u as L,l as C,f as y,h as S,m as k,a4 as w,r as $,av as j,a as T,bM as M,bN as x,bO as A,bP as R,bQ as H,bR as G,bS as E,am as D,aT as B,aj as I,Q as _,a0 as P,ah as U,e as V,bT as X,b as z,T as O,n as Q,z as F,bU as J,ac as q}from"./calfSystem-07c25a1c.js"
import"./numberIsNaN-77d2bff3.js"
import"./toLowerCase-5806cc21.js"
import{c as K}from"./createInput-2b2e8237.js"
import{l as W}from"./onlineDot-5308cdcc.js"
import{b as Y}from"./batch-a0e92c81.js"
import{c as Z,a as tt}from"./compressBio-fbb6f58c.js"
import"./createLabel-758fd9df.js"
import{c as et,b as nt,p as at,a as st,g as it}from"./levelHighlight-eb28b137.js"
import{d as ct}from"./dataRows-ce49235e.js"
import{c as ot}from"./createUl-06e31567.js"
import"./isChecked-7fc8132c.js"
import{b as rt}from"./simpleCheckbox-754ddbda.js"
import{a as lt}from"./alpha-6cdf0d3e.js"
import{c as ut}from"./createTBody-9ae87977.js"
import{c as ft}from"./createTable-be6cef64.js"
import"./isDate-684e0288.js"
import{f as dt}from"./formatLocalDateTime-3f733767.js"
import{c as ht,t as mt}from"./toggleVisibilty-d21138e9.js"
import{c as bt}from"./createButton-ffeacb28.js"
import{c as pt}from"./createTextArea-23a067e2.js"
import{d as gt}from"./dialogMsg-3e572607.js"
import{c as vt}from"./createStyle-74cc41b1.js"
function Nt(t,e){const n=i.exec(e.dataset.tipped)
return W({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function Lt(){const i=t("b",e).find(n("Members"))
if(i){const t=a('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Nt,[0,0])}(t)
i.classList.add("tip-static"),i.dataset.tipped=`Active: ${e[0]}/${t.length}<br>`+`Stamina: ${s(e[1])}`}}let Ct,yt,St,kt,wt,$t,jt,Tt,Mt,xt,At,Rt,Ht,Gt,Et
function Dt(t,e){const n=Number(/VL:.+?(\d+)/.exec(e)[1]),a=t.parentNode.parentNode
!function(t){return Ct&&t>=nt&&t<=at}(n)?function(t){return yt&&t>=st&&t<=it}(n)&&a.classList.add("lvlGvGHighlight"):a.classList.add("lvlHighlight")}function Bt(t){const{tipped:e}=t.dataset
i.exec(e)[1]<7&&Dt(t,e)}function It(){Number(r("guild_id"))!==l()&&(Ct||yt)&&(et(),a('#pCC a[data-tipped*="<td>VL:</td>"]').forEach(Bt))}function _t(){Ct=o("highlightPlayersNearMyLvl"),yt=o("highlightGvGPlayersNearMyLvl"),It(),o("enableHistoryCompressor")&&Z(t(c,e).slice(-2,-1)[0].rows[0].cells[0])}function Pt(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function Ut(t){"smallLink"===t.target.className&&m(t.target.previousElementSibling.text)}function Vt(){const t=u(`#pCC a[href^="${f}"]`)
Y([5,3,t,0,Pt]),d(e,Ut)}function Xt(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function zt(t,e){N(e,t.insertCell(-1))}function Ot(t,e,n){const a=t.insertRow(t.rows.length-2)
zt(a,e),zt(a,n)}function Qt(t,e){Ot(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ft(t,e,n){1===e&&function(t){Ot(t,`<a href="${L}conflicts">Active Conflicts</a>`,"Score")}(n),ct(t.rows,7,0).forEach(p(Qt,n))}function Jt(t,e){const n=g(e),a=v('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),i=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=v("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Ft(a,e,n)}(n,s,t.node),i>s&&function(t,e,n){Xt(t+1).then(p(e,n))}(s,Jt,t)}function qt(t){const e=t.rows[6].cells[0].children[0]
e&&Xt(1).then(p(Jt,{node:e}))}function Kt(t){"enableGuildActivityTracker"===t.target.id&&w("enableGuildActivityTracker",!o("enableGuildActivityTracker"))}function Wt(t,e){return`${t}<option value="${e}">${e}</option>`}function Yt(t){return D(t)?"#DEF":t.toLocaleString()}function Zt(t,e,n){return`${e}<tr>`+`<td>${dt(new Date(1e3*n[M]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${Yt(n[x])}</td>`+`<td class="fshRight">${Yt(n[A])}</td>`+`<td class="fshRight">${Yt(n[R])}</td>`+`<td class="fshRight">${Yt(n[H])}</td>`+`<td class="fshRight">${Math.floor(n[R]/n[H]*100)}</td>`+`<td class="fshRight">${n[G]}</td>`+`<td class="fshRight">${Yt(n[E])}</td>`+"</tr>"}function te(t,e){return function(t){return kt&&"- All -"!==kt&&kt!==t}(e)?t:t+jt[e].reduce(p(Zt,e),"")}function ee(){jt&&N(j(jt).reduce(te,""),St),wt.classList.remove("fshSpinner")}function ne(){wt.classList.add("fshSpinner"),T(3,ee)}function ae(t){kt=t.target.value,ne()}function se(t){t&&(jt=t,N('<select name="member">'+`<option value="- All -" selected>- All -</option>${j(t).sort(lt).reduce(Wt,"")}</select>`,$t),ne())}function ie(){const t=$("th",{textContent:"Member"})
return $t=C(),S(t,$t),t}function ce(){const t=ft({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const n=ie()
S(e,n),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){St=ut(),S(t,St)}(t),y(t,"change",ae),wt=C({className:"tgCont fshSpinner64"}),S(wt,t),wt}function oe(t){Tt.value=t,At.classList.remove("fshSpinner")}function re(){Tt.value='{"lastUpdate": 0, "members": {}}'}function le(t){gt("Update successful"),se(t.members)}function ue(){const t=B(Tt.value)
I("fsh_guildActivity",t).then(p(le,t)).catch(gt)}function fe(t,e){const n=bt({className:"custombutton",textContent:t})
return d(n,e),n}function de(){return At=C({id:"io",className:"fshSpinner64"}),Tt=pt(),Tt.setAttribute("autocapitalize","off"),Tt.setAttribute("autocomplete","off"),Tt.setAttribute("autocorrect","off"),Tt.setAttribute("spellcheck","false"),Mt=fe("Save",ue),xt=fe("Reset",re),S(At,Tt),S(At,ht()),S(At,Mt),S(At,xt),At}function he(){return!Ht.checked}function me(t){Ht.checked&&"Escape"===t.code&&(Ht.checked=!1)}function be(t){he()&&(t.style.transform=null)}function pe(){P("guildTracker","updateRawData"),Rt&&function(t){t&&(At.classList.add("fshSpinner"),T(4,oe,[t]))}(Rt)}function ge(){const t=function(){const t=C({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return Et=K({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),_(Et,"change",pe),S(t,Et),t}(),e=ot({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return S(t,e),X(e,t),t}function ve(){const t=ge(),e=function(){const t=C({className:"fsh-dialog-content"})
return S(t,ce()),S(t,de()),t}()
S(t,e),y(Ht,"change",p(be,t)),S(Gt,t)}function Ne(t){t&&(Rt=JSON.stringify(t),se(t.members))}function Le(){P("guildTracker","openDialog"),U("fsh_guildActivity").then(Ne),V.dialogIsClosed=he,h(Gt,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),ve()}function Ce(){!function(){const t=v("#pCC img.guild_openGuildStore"),e=t.parentNode,n=C({className:"fsh-tracker"}),a=C({innerHTML:`${rt("enableGuildActivityTracker")}&nbsp;<label class="custombutton" for="tracker">Show</label>`})
y(a,"change",Kt),S(n,t),S(n,a),k(e,n)}(),Ht=K({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),_(Ht,"change",Le),Gt=C({className:"fsh-dialog"}),S(Gt,Ht),y(document.body,"keydown",me),S(document.body,Gt)}let ye,Se
function ke(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return"#fshMemberList "+`tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {`+`background: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, `+`transparent ${e+1}%)}`}function we(){Se?Se.disabled=!ye:function(){const t=z(c,e),n=t[t.length-1]
n.id="fshMemberList"
const s=a('a[href*="&player_id="]',n).map(ke).join("\n")
Se=S(document.body,vt(s)).sheet}()}function $e(){ye=!ye,w("enableStamBars",ye),we(),P("guildManage","StamBars")}function je(){!function(){const t=v("#pCC img.guild_openGuildStore").parentNode,e=S(t,C({className:"fshCenter",innerHTML:rt("enableStamBars")}))
y(e,"change",$e)}(),ye=o("enableStamBars"),ye&&we()}function Te(t,e,n){const a=function(t){return O({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
S(t,function(t){const e=O({innerHTML:"[&nbsp;"})
return S(e,t),h(e,"&nbsp;]"),e}(a)),e.id=n,o(n)&&Q(e),d(a,mt)}function Me(t){Te(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function xe(t){const e=t.rows[4].cells[1].children[0]
N(e.innerHTML.trim(),e),Te(e,t.rows[6].cells[0].children[0],"statisticsControl")}function Ae(t){Te(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Re(e){const a=t("b",e).filter(n("Relics"))
if(1!==a.length)return
const s=a[0].parentNode.nextElementSibling.children[0]
N(`[ <a href="${L}reliclist">Control</a> ]&nbsp;`,s)}function He(t){const e=z("li",t),n=e[e.length-1].parentNode
h(n,`<li><a href="${J}${q()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ge(t,e){T(3,e,[t])}function Ee(t){F()||(o("detailedConflictInfo")&&T(3,qt,[t]),T(4,Ce))}function De(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Me,xe,Ae,Re,He].forEach(p(Ge,t))}(t),T(3,Vt),Ee(t),je()}function Be(){const t=v('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}export default function(){T(3,tt),T(3,Be),T(3,Lt),"manage"===V.subcmd&&De(),"view"===V.subcmd&&_t()}
//# sourceMappingURL=guild-58a9bd9a.js.map
