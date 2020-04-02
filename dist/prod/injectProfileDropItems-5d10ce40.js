import{g as n,p as e,a as i,i as t,b as s,c as r,e as a,f as c,h as o,j as l,k as u,m as d,l as f,n as p,o as h,t as m,q as k,r as v,s as S,u as b,v as g,w as L,x as E,y as N,z as H,A,B as j,C as w,D as I,E as D,F as T,G as x,H as M,I as _,J as O,K as C,L as Q,M as F,N as R,O as U,P as q,Q as y}from"./calfSystem-88a7d475.js"
const G=n=>n.src.includes("/folder.png")
function P(n){return"<option value="+n.parentNode.href.match(/&folder_id=(-?\d+)/i)[1]+">"+s(n.parentNode.parentNode)+"</option>"}var V,Y
function z(n,e){e.checked=!e.disabled&&!e.checked}var B,J=[["guild",function(n,e){e.checked=!e.disabled&&-1!==V[n.invid].guild_tag}],["item",function(n,e){V[n.invid]&&V[n.invid].item_id===Y&&z(0,e)}],["checkAll",z]]
function K(n,e){return e[0]===n}function W(n,e){e.injectHere&&(e.injectHere.parentNode.classList.contains("fshHide")||n(e,e.el.parentNode.parentNode.previousElementSibling.children[0]))}function X(n,e,i,t){V=e
var s=J.find(r(K,i))[1]
Y=Number(t),n.forEach(r(W,s))}function Z(i){if("storeitems"===a.subcmd2){var t=n("form",e)[0]
if(t){var s=c({className:"fshCenter"}),r=o({colSpan:3})
l(s,r),u(s,t),r.innerHTML=d(i),h=n(f,e)[0].rows,p(h[h.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}}var h}function $(n){return n?"Hide":"Show"}function nn(i,t){if(function(){if(!B){var i=n("form",e)
i.length>0&&(B=i[0].previousElementSibling.children[0])}}(),B){var s='[<span id="fshShowExtraLinks" class="sendLink">'+$(i)+' AH and UFSG links</span>]&nbsp;[<span id="fshShowQuickDropLinks" class="sendLink">'+$(t)+" Quick Drop links</span>]&nbsp;"
"storeitems"===a.subcmd2&&(s+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),B.innerHTML=s}}function en(n,e,i){i.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,i){var t=i.injectHere.parentNode,s=n[i.invid].folder_id,r=0!==e&&e!==s
m(t,r),m(t.nextElementSibling,r)}(n,e,i)}function tn(n,e,i){h([2,3,n,0,r(en,e,Number(i.dataset.folder))])}function sn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const rn=n=>n.invid
function an(n,e){return n.toString()===e.invid}function cn(n,e){var i=n.find(r(an,e))
if(i){var t=i.injectHere.parentNode
t.nextElementSibling.remove(),t.remove(),i.el=null,i.invid=null,i.injectHere=null}}function on(n,e){b(e.r)&&e.r.forEach(r(cn,n))}function ln(n,e,i){S(e,i).then(r(on,n))}function un(n){var e=k("selectFolderId").value
v(30,n.filter(sn).map(rn)).forEach(r(ln,n,e))}function dn(n,e,i){1!==i.r&&(n.style.color="green",n.innerHTML=e)}function fn(n,e,i,t){t.className="quickAction",function(n,e,i){e([n.getAttribute("itemInvId")]).then(r(dn,n,i))}(t,n,e),g(t),function(n){n.innerHTML='<img class="quickActionSpinner" src="'+L+'ui/misc/spinner.gif" width="15" height="15">'}(t)
var s=t.parentNode
!function(n,e){var i=E(e,n)
i&&(i.className="quickAction",i.innerHTML="")}(s,i),function(n){var e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(s)}var pn,hn,mn,kn,vn,Sn,bn,gn,Ln,En,Nn,Hn
function An(n){return n.dataset.tipped}function jn(n){var e=n.dataset.tipped.match(j)
return[n,e[1],e[2]]}function wn(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function In(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function Dn(){A(),pn=N("disableItemColoring"),hn=N("showExtraLinks"),mn=N("showQuickDropLinks"),kn=N("showQuickSendLinks"),nn(hn,mn)
var t,s,r=(t=n(f,e),s=t[t.length-1],i("img",s)).filter(An).map(jn)
vn=r.map(In),(Sn=r.reduce(wn,{}))[13699]=1}var Tn=[[function(n){return!gn&&1!==Sn[n.item_id]},function(n,e){return' [<span linkto="'+e.item_id+'" class="fshLink">Check all</span>]'}],[function(n){return!Hn&&kn&&!n.bound},function(n){return' <span class="quickAction sendLink tip-static" itemInvId="'+n.invid+'" data-tipped="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>'}],[function(n){return!Ln&&mn&&-1===n.guild_tag},function(n){return' <span class="quickAction dropLink tip-static" itemInvId="'+n.invid+'" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Drop]</span>'}]]
function xn(n,e){return e[0](n)}function Mn(n,e,i){return i[1](n,e)}function _n(n,e){!function(n,e){Nn||pn||n.injectHere.classList.add(y[e.rarity].clas)}(n,e)
var i=Tn.filter(r(xn,e)).map(r(Mn,n,e)).join("")
""!==i&&q(n.injectHere,i)}function On(n){var e=En[n.invid]
e&&(!function(n,e){if(!Q(bn,!hn)){var i='<span><span class="aHLink">'
e.bound||(i+='[<a href="'+F+encodeURIComponent(e.item_name)+'">AH</a>]'),i+='</span>[<a href="'+R+"items"+U+"view&item_id="+e.item_id+'" target="_blank">UFSG</a>]</span>',p(n.injectHere,i)}}(n,e),_n(n,e))}function Cn(){hn&&(bn=!0),gn=!0,Nn=!0,mn&&(Ln=!0),Hn=!0}function Qn(n){m(n.injectHere.children[0],!hn)}function Fn(){H("showExtraLinks",hn=!hn),nn(hn,mn),bn?vn.forEach(Qn):h([5,3,vn,0,On,Cn])}function Rn(n){m(E(".dropLink",n.injectHere),!mn)}function Un(){H("showQuickDropLinks",mn=!mn),nn(hn,mn),Ln?vn.forEach(Rn):h([5,3,vn,0,On,Cn])}function qn(n,e){X(vn,En,n,e)}function yn(){return[[M("fshShowExtraLinks"),Fn],[M("fshShowQuickDropLinks"),Un],[M("fshSelectAllGuildLocked"),r(qn,"guild",null)],[M("fshMove"),r(un,vn)],[M("fshChkAll"),r(qn,"checkAll",null)]].concat([[function(n){return n.hasAttribute("linkto")},function(n){qn("item",n.getAttribute("linkto"))}],[r(_,"sendLink"),r(fn,O,"Sent",".dropLink")],[r(_,"dropLink"),r(fn,C,"Dropped",".sendLink")],[r(_,"fshFolder"),r(tn,vn,En)]])}function Gn(n){!function(n){return!n||!n.items||!n.folders}(n)&&vn&&(bn=!1,gn=!1,En=n.items,Nn=!1,Ln=!1,Hn=!1,h([5,3,vn,0,On,Cn]),Z(n.folders),T(e,x(yn())))}export default function(){var s,r
w()||(I().then(Gn),D(3,Dn)),"dropitems"===a.subcmd&&(s=n("form",e)[0].nextElementSibling.nextElementSibling.nextElementSibling,0!==(r=i("img",s).filter(G)).length&&t(s,'<tr><td class="fshCenter">Move selected items to: <select name="folder" id="selectFolderId" class="customselect">'+r.map(P).join("")+'</select>&nbsp;<input type="button" class="custombutton" id="fshMove" value="Move"></td></tr>'))}
//# sourceMappingURL=injectProfileDropItems-5d10ce40.js.map
