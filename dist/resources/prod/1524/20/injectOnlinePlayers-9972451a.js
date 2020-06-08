import{aq as n,t as e,G as t,bj as a,a4 as s,a2 as l,Y as i,aU as r,x as o,o as f,e as u,v as c}from"./calfSystem-03970067.js"
import{n as h}from"./numberIsNaN-b19dc958.js"
import{c as d}from"./currentGuildId-cce6862b.js"
import{i as p}from"./intValue-0d844fc4.js"
import"./valueText-49d1445b.js"
import{b as v,p as m,c as g}from"./levelHighlight-46503791.js"
import{g as y,s as M}from"./idb-3dad9172.js"
import{l as L,p as b}from"./lvlTests-494f9b6a.js"
import"./all-34a43a38.js"
import{l as x}from"./loadDataTables-a4c6ac52.js"
import{o as P}from"./onlinePlayersPage-9fbe73a1.js"
function j(n,e){const t=$("<div/>").append(n[e][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),n[e][1],n[e][2],100*n[e][3]+n[e][4]+1]}let C,R
const I=[()=>C,n=>function(n){const e=n.match(a)
if(e)return Number(e[1])}(n[0])!==d(),n=>p(n[2])>=v,n=>p(n[2])<=m]
function q(n,e){(function(n){return I.every(e=>e(n))})(e)&&$("td",n).eq(2).addClass("lvlHighlight")}function w(n,e){C=t("highlightPlayersNearMyLvl"),R=$("#fshInv",n).DataTable(function(n){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:q,data:n,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(e))}function O(){R.draw()}function k(n){"fshMinLvl"!==n.target.id&&"fshMaxLvl"!==n.target.id||O()}function N(n,e){return parseInt($(n,e).val(),10)}function T(n,e){h(e)||i(n,e)}function _(n,e,t){const a=N("#fshMinLvl",n),s=N("#fshMaxLvl",n)
T("onlinePlayerMinLvl",a),T("onlinePlayerMaxLvl",s)
const i=l(p(t[2]),0)
return L(b,i,a,s)}let D,G,z,H
function S(a){G=a||{},function(n){$.fn.dataTable.ext.search.push(e(_,n)),$("#fshOutput",n).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(D),g(),w(D,function(t){return n(t).map(e(j,t))}(G))}function A(n,e,t){const a=$("td",$(t)),s=a.eq(1).text();(function(n,e){return G[n]&&G[n][3]>e})(s,n)||(G[s]=function(n,e,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),n,e]}(n,e,a))}function U(n,e){H=function(n){return parseInt(n.parent().text().match(/(\d+)/g)[0],10)}(e)
for(let e=2;e<=H;e+=1)P(e).then(n)}function V(n){$("#fshOutput",D).append(n)}function W(n){V(" "+(z+1))
const t=c(n),a=$("#pCC input.custominput",t).first()
!function(n,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',n).parent().parent().parent().each(e(A,a))}(t,a),z+=1,1===z&&U(W,a),z===H&&(M("fsh_onlinePlayers",G),S(G))}function Y(n){"fshRefresh"===n.target.id&&($("#fshRefresh",D).hide(),z=0,G={},P(1).then(W),i("lastOnlineCheck",s),V("Parsing online players...")),"fshReset"===n.target.id&&function(n){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",n).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",n).val(r.onlinePlayerMaxLvl),O()}(D)}function B(){D.html(`<span><b>Online Players</b></span>${function(){const n=t("lastOnlineCheck")
return s-n>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-n)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),y("fsh_onlinePlayers").then(S),f(D[0],Y),u(D[0],"keyup",k)}export default function(n){o()||(D=n?$(n):$("#pCC"),x().then(B))}
//# sourceMappingURL=injectOnlinePlayers-9972451a.js.map
