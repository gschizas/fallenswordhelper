import{au as e,t as n,G as t,bo as a,a7 as s,a3 as l,Z as i,aW as r,x as o,o as f,f as u,v as c}from"./calfSystem-9901ad27.js"
import{n as d}from"./numberIsNaN-cb2409eb.js"
import{c as h}from"./currentGuildId-86da8be9.js"
import{i as p}from"./intValue-0e84cdad.js"
import"./valueText-3f53d458.js"
import{b as v,p as m,c as g}from"./levelHighlight-ee9800e0.js"
import{g as y,s as M}from"./idb-efff97cf.js"
import{l as L,p as b}from"./lvlTests-1e58f0ba.js"
import"./all-9da52a21.js"
import{l as x}from"./loadDataTables-d5d683d1.js"
import{o as P}from"./onlinePlayersPage-110d13f2.js"
function j(e,n){const t=$("<div/>").append(e[n][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),e[n][1],e[n][2],100*e[n][3]+e[n][4]+1]}let C,R
const I=[()=>C,e=>function(e){const n=e.match(a)
if(n)return Number(n[1])}(e[0])!==h(),e=>p(e[2])>=v,e=>p(e[2])<=m]
function w(e,n){(function(e){return I.every(n=>n(e))})(n)&&$("td",e).eq(2).addClass("lvlHighlight")}function O(e,n){C=t("highlightPlayersNearMyLvl"),R=$("#fshInv",e).DataTable(function(e){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:w,data:e,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(n))}function k(){R.draw()}function q(e){"fshMinLvl"!==e.target.id&&"fshMaxLvl"!==e.target.id||k()}function N(e,n){return parseInt($(e,n).val(),10)}function T(e,n){d(n)||i(e,n)}function _(e,n,t){const a=N("#fshMinLvl",e),s=N("#fshMaxLvl",e)
T("onlinePlayerMinLvl",a),T("onlinePlayerMaxLvl",s)
const i=l(p(t[2]),0)
return L(b,i,a,s)}let D,G,z,H
function S(a){G=a||{},function(e){$.fn.dataTable.ext.search.push(n(_,e)),$("#fshOutput",e).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(D),g(),O(D,function(t){return e(t).map(n(j,t))}(G))}function W(e,n,t){const a=$("td",$(t)),s=a.eq(1).text();(function(e,n){return G[e]&&G[e][3]>n})(s,e)||(G[s]=function(e,n,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),e,n]}(e,n,a))}function A(e,n){H=function(e){return parseInt(e.parent().text().match(/(\d+)/g)[0],10)}(n)
for(let n=2;n<=H;n+=1)P(n).then(e)}function V(e){$("#fshOutput",D).append(e)}function Z(e){V(" "+(z+1))
const t=c(e),a=$("#pCC input.custominput",t).first()
!function(e,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',e).parent().parent().parent().each(n(W,a))}(t,a),z+=1,1===z&&A(Z,a),z===H&&(M("fsh_onlinePlayers",G),S(G))}function B(e){"fshRefresh"===e.target.id&&($("#fshRefresh",D).hide(),z=0,G={},P(1).then(Z),i("lastOnlineCheck",s),V("Parsing online players...")),"fshReset"===e.target.id&&function(e){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",e).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",e).val(r.onlinePlayerMaxLvl),k()}(D)}function E(){D.html(`<span><b>Online Players</b></span>${function(){const e=t("lastOnlineCheck")
return s-e>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-e)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),y("fsh_onlinePlayers").then(S),f(D[0],B),u(D[0],"keyup",q)}export default function(e){o()||(D=e?$(e):$("#pCC"),x().then(E))}
//# sourceMappingURL=injectOnlinePlayers-4991381a.js.map
