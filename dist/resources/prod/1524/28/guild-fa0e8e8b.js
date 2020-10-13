import{g as t,p as e,a_ as n,D as a,bi as s,d as o,m as i,A as c,h as r,H as l,Q as f,b as d,a9 as u,a1 as m,o as p,i as h,u as b,t as g,v as j,C,s as N,bj as L,f as v,Y as S,n as y,aq as k,a as w,ai as $,aK as x,O as M,U as T,c as A,bk as H,E as R,x as B,bl as E}from"./calfSystem-a5da5210.js"
import"./numberIsNaN-91041dcf.js"
import{p as D}from"./playerName-22f2b3f0.js"
import"./toLowerCase-27ea448e.js"
import{c as I}from"./createInput-0af9c89a.js"
import{a as G}from"./addCommas-8259c1a9.js"
import{l as _}from"./onlineDot-ae5ba72d.js"
import{s as P}from"./setTipped-e5305fe4.js"
import{b as V}from"./batch-948dbb93.js"
import{c as U}from"./colouredDots-376a183f.js"
import"./createLabel-5fa02d85.js"
import"./insertElementBefore-eada6f05.js"
import F from"./compressBio-e042188d.js"
import{c as O}from"./createStyle-c78804ee.js"
import{c as Q}from"./currentGuildId-87288eec.js"
import"./intValue-f4d85578.js"
import"./valueText-92f43a8d.js"
import{a as X,g as q,c as z,b as J}from"./levelHighlight-a0073d40.js"
import"./fshOpen-027ef4bd.js"
import{o as K}from"./openQuickBuffByName-08b8519d.js"
import{d as Y}from"./dataRows-544fd651.js"
import{c as Z}from"./createUl-1742cb9f.js"
import{s as W,g as tt}from"./idb-2c141566.js"
import{i as et}from"./insertElementAfterBegin-619f3b2f.js"
import"./isChecked-12c32ad5.js"
import{b as nt}from"./simpleCheckbox-b35743b7.js"
import{a as at}from"./alpha-08ee6ec8.js"
import{c as st}from"./createTBody-7279fad8.js"
import{c as ot}from"./createTable-731fc93d.js"
import"./isDate-45c423ee.js"
import"./padZ-28ca6b6e.js"
import{f as it}from"./formatLocalDateTime-8d7e97c2.js"
import{u as ct,l as rt,v as lt,c as ft,m as dt,a as ut,g as mt}from"./indexConstants-d82f70de.js"
import{c as pt,t as ht}from"./toggleVisibilty-a673c2ac.js"
import{c as bt}from"./createButton-219c3a0e.js"
import{c as gt}from"./createTextArea-6c19a0fe.js"
import{d as jt}from"./dialogMsg-8ea305bd.js"
import{c as Ct}from"./createSpan-8b1ff67f.js"
import{h as Nt}from"./hideElement-c14a94c9.js"
function Lt(t,e){const n=s.exec(e.dataset.tipped)
return _({min:n[3],hour:n[2],day:n[1]})<44640&&(t[0]+=1,t[1]+=Number(/Stamina:<\/td><td>(\d+)/.exec(e.dataset.tipped)[1])),t}function vt(){const s=t("b",e).find(n("Members"))
if(s){const t=a('#pCC a[data-tipped*="Last Activity"]'),e=function(t){return t.reduce(Lt,[0,0])}(t)
s.classList.add("tip-static"),P(`Active: ${e[0]}/${t.length}<br>Stamina: ${G(e[1])}`,s)}}let St,yt
function kt(t){return St&&t>=X()&&t<=q()}function wt(t){return yt&&t>=z()&&t<=J()}const $t=t=>[t,s.exec(t.dataset.tipped)[1]],xt=([,t])=>t<7,Mt=([t])=>[t,Number(/VL:.+?(\d+)/.exec(t.dataset.tipped)[1])],Tt=([t,e])=>[t.parentNode.parentNode.rowIndex,kt(e),wt(e)]
const At=t=>t.map(([t])=>`.fshHighlight tr:nth-child(${t+1})`).join(",")
function Ht(){const t=a('#pCC a[data-tipped*="<td>VL:</td>"]').map($t).filter(xt).map(Mt).map(Tt),n=t.filter(([,t])=>t),s=t.filter(([,t,e])=>!t&&e)
!function(t){if(t.length){const e=At(t)+" {background-color: #4671C8;}"
r(document.body,O(e))}}(n),function(t){if(t.length){const e=At(t)+" {background-color: #FF9900;}"
r(document.body,O(e))}}(s),function(t,n){if(t.length+n.length){const t=d(o,e)
t[t.length-1].classList.add("fshHighlight")}}(n,s)}function Rt(){Number(f("guild_id"))!==Q()&&(St||yt)&&Ht()}function Bt(){St=l("highlightPlayersNearMyLvl"),yt=l("highlightGvGPlayersNearMyLvl"),Rt(),l("enableHistoryCompressor")&&function(){const n=t(o,e).slice(-2,-1)[0].rows[0].cells[0],a=i({id:"profile-bio",innerHTML:n.innerHTML})
c("",n),r(n,a),F()}()}function Et(t){h(t.parentNode,' <span class="smallLink">[b]</span>')}function Dt(t){"smallLink"===t.target.className&&K(t.target.previousElementSibling.text)}function It(){const t=u(`#pCC a[href^="${m}"]`)
V([5,3,t,0,Et]),p(e,Dt)}function Gt(t){return b({cmd:"guild",subcmd:"conflicts",page:t})}function _t(t,e){c(e,t.insertCell(-1))}function Pt(t,e,n){const a=t.insertRow(t.rows.length-2)
_t(a,e),_t(a,n)}function Vt(t,e){Pt(t,e.cells[0].innerHTML,`<b>${e.cells[6].innerHTML}</b>`)}function Ut(t,e,n){1===e&&function(t){Pt(t,`<a href="${N}conflicts">Active Conflicts</a>`,"Score")}(n),Y(t.rows,7,0).forEach(g(Vt,n))}function Ft(t,e){const n=j(e),a=C('#pCC input[name="page"]',n)
if(!a)return
const s=Number(a.value),o=function(t){return Number(t.parentNode.innerHTML.match(/of&nbsp;(\d*)/)[1])}(a)
!function(t,e,n){const a=C("#pCC > table > tbody > tr > td > table",t)
a&&a.rows.length>3&&Ut(a,e,n)}(n,s,t.node),o>s&&function(t,e,n){Gt(t+1).then(g(e,n))}(s,Ft,t)}function Ot(t){const e=t.rows[6].cells[0].children[0]
e&&Gt(1).then(g(Ft,{node:e}))}function Qt(t){t.target.id===L&&S(L,!l(L))}let Xt,qt,zt,Jt,Kt,Yt,Zt,Wt,te,ee,ne,ae,se
function oe(t,e){return`${t}<option value="${e}">${e}</option>`}function ie(t){return $(t)?"#DEF":t.toLocaleString()}function ce(t,e,n){return e+"<tr>"+`<td>${it(new Date(1e3*n[ct]))}</td>`+`<td>${t}</td>`+`<td class="fshRight">${ie(n[rt])}</td>`+`<td class="fshRight">${ie(n[lt])}</td>`+`<td class="fshRight">${ie(n[ft])}</td>`+`<td class="fshRight">${ie(n[dt])}</td>`+`<td class="fshRight">${Math.floor(n[ft]/n[dt]*100)}</td>`+`<td class="fshRight">${n[ut]}</td>`+`<td class="fshRight">${ie(n[mt])}</td></tr>`}function re(t,e){return function(t){return qt&&"- All -"!==qt&&qt!==t}(e)?t:t+Kt[e].reduce(g(ce,e),"")}function le(){Kt&&c(k(Kt).reduce(re,""),Xt),zt.classList.remove("fshSpinner")}function fe(){zt.classList.add("fshSpinner"),w(3,le)}function de(t){qt=t.target.value,fe()}function ue(t){t&&(Kt=t,c(`<select name="member"><option value="- All -" selected>- All -</option>${k(t).sort(at).reduce(oe,"")}</select>`,Jt),fe())}function me(){const t=y("th",{textContent:"Member"})
return Jt=i(),r(t,Jt),t}function pe(){const t=ot({id:"tg"})
return function(t){const e=t.createTHead().insertRow(-1)
h(e,"<th>Date</th>")
const n=me()
r(e,n),h(e,"<th>Level</th><th>VL</th><th>Stam</th><th>Max<br>Stam</th><th>Stam<br>%</th><th>Last<br>Activity<br>(Days)</th><th>GXP</th>")}(t),function(t){Xt=st(),r(t,Xt)}(t),v(t,"change",de),zt=i({className:"tgCont fshSpinner64"}),r(zt,t),zt}function he(t){Yt.value=t,te.classList.remove("fshSpinner")}function be(){Yt.value='{"lastUpdate": 0, "members": {}}'}function ge(t){jt("Update successful"),ue(t.members)}function je(){const t=x(Yt.value)
W("fsh_guildActivity",t).then(g(ge,t)).catch(jt)}function Ce(t,e){const n=bt({className:"custombutton",textContent:t})
return p(n,e),n}function Ne(){return te=i({id:"io",className:"fshSpinner64"}),Yt=gt(),Yt.setAttribute("autocapitalize","off"),Yt.setAttribute("autocomplete","off"),Yt.setAttribute("autocorrect","off"),Yt.setAttribute("spellcheck","false"),Zt=Ce("Save",je),Wt=Ce("Reset",be),r(te,Yt),r(te,pt()),r(te,Zt),r(te,Wt),te}function Le(){return!ne.checked}function ve(t){ne.checked&&"Escape"===t.code&&(ne.checked=!1)}function Se(t){Le()&&(t.style.transform=null)}function ye(){T("guildTracker","updateRawData"),ee&&function(t){t&&(te.classList.add("fshSpinner"),w(4,he,[t]))}(ee)}function ke(){const t=function(){const t=i({className:"fsh-dialog-popup ui-dialog ui-tabs ui-widget ui-widget-content ui-corner-all",innerHTML:'<input id="acttab1" class="fsh-tab-open" name="acttabs" checked type="radio">'})
return se=I({className:"fsh-tab-open",id:"acttab2",name:"acttabs",type:"radio"}),M(se,"change",ye),r(t,se),t}(),e=Z({className:"fshMove ui-tabs-nav ui-widget-header ui-corner-all ui-helper-reset ui-helper-clearfix",innerHTML:'<li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab1">Guild Activity Tracker</label></li><li class="ui-state-default ui-corner-top"><label class="fsh-tab-label" for="acttab2">Import/Export</label></li><label for="tracker" class="fsh-dialog-close ui-dialog-titlebar-close">&times;</label>'})
return r(t,e),H(e,t),t}function we(){const t=ke(),e=function(){const t=i({className:"fsh-dialog-content"})
return r(t,pe()),r(t,Ne()),t}()
r(t,e),v(ne,"change",g(Se,t)),r(ae,t)}function $e(t){t&&(ee=JSON.stringify(t),ue(t.members))}function xe(){T("guildTracker","openDialog"),tt("fsh_guildActivity").then($e),A.dialogIsClosed=Le,h(ae,'<div class="fsh-dialog-overlay"><label class="fsh-dialog-cancel" for="tracker"></label></div>'),we()}function Me(){!function(){const t=C("#pCC img.guild_openGuildStore"),e=t.parentNode,n=i({className:"fsh-tracker"}),a=i({innerHTML:nt(L)+'&nbsp;<label class="custombutton" for="tracker">Show</label>'})
v(a,"change",Qt),r(n,t),r(n,a),et(e,n)}(),ne=I({id:"tracker",className:"fsh-dialog-open",type:"checkbox"}),M(ne,"change",xe),ae=i({className:"fsh-dialog"}),r(ae,ne),v(document.body,"keydown",ve),r(document.body,ae)}let Te,Ae
function He(t){const e=function(t){const e=t.dataset.tipped.match(/(\d+) \/ (\d+)/)
return Math.min(Math.round(Number(e[1])/Number(e[2])*100),100)}(t)
return`.fshProgressBar tr:nth-child(${t.parentNode.parentNode.rowIndex+1}) {background-image: linear-gradient(to right, rgba(255, 153, 0, 0.5) ${e}%, transparent ${e+1}%)}`}function Re(){Ae?Ae.disabled=!Te:function(){const t=d(o,e),n=t[t.length-1]
n.classList.add("fshProgressBar")
const s=a(R,n).map(He).join("\n")
Ae=r(document.body,O(s)).sheet}()}function Be(){Te=!Te,S("enableStamBars",Te),Re(),T("guildManage","StamBars")}function Ee(){!function(){const t=C("#pCC img.guild_openGuildStore").parentNode,e=r(t,i({className:"fshCenter",innerHTML:nt("enableStamBars")}))
v(e,"change",Be)}(),Te=l("enableStamBars"),Te&&Re()}function De(t,e,n){const a=function(t){return Ct({className:"fshLink tip-static",dataset:{linkto:t,tipped:"Toggle Section"},textContent:"X"})}(n)
r(t,function(t){const e=Ct({innerHTML:"[&nbsp;"})
return r(e,t),h(e,"&nbsp;]"),e}(a)),e.id=n,l(n)&&Nt(e),p(a,ht)}function Ie(t){De(t.rows[0].cells[1].children[0],t.rows[2].cells[0].children[0],"guildLogoControl")}function Ge(t){const e=t.rows[4].cells[1].children[0]
c(e.innerHTML.trim(),e),De(e,t.rows[6].cells[0].children[0],"statisticsControl")}function _e(t){De(t.rows[15].cells[1].children[0],t.rows[17].cells[0].children[0],"guildStructureControl")}function Pe(e){const a=t("b",e).filter(n("Relics"))
if(1!==a.length)return
const s=a[0].parentNode.nextElementSibling.children[0]
c(`[ <a href="${N}reliclist">Control</a> ]&nbsp;`,s)}function Ve(t){const e=d("li",t),n=e[e.length-1].parentNode
h(n,`<li><a href="${E}${D()}" class="tip-static" data-tipped="Self Recall">Self Recall</a></li>`)}function Ue(t,e){w(3,e,[t])}function Fe(t){B()||(l("detailedConflictInfo")&&w(3,Ot,[t]),w(4,Me))}function Oe(){const t=e.lastElementChild.rows[2].cells[0].children[0]
!function(t){[Ie,Ge,_e,Pe,Ve].forEach(g(Ue,t))}(t),w(3,It),Fe(t),Ee()}function Qe(){const t=C('#pCC img[src*="/guilds/"][width="200"]')
t&&(t.removeAttribute("style"),function(t){const e=t.nextElementSibling.nextElementSibling
e&&e.classList.add("fshBreakAll")}(t))}function Xe(){w(3,U),w(3,Qe),w(3,vt),"manage"===A.subcmd&&Oe(),"view"===A.subcmd&&Bt()}export default Xe
//# sourceMappingURL=guild-fa0e8e8b.js.map
