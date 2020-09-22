import{aq as n,t as e,H as t,bj as a,a4 as s,a2 as l,Y as i,aU as r,x as o,o as f,f as u,v as c}from"./calfSystem-ec854151.js"
import{n as h}from"./numberIsNaN-00e0daaf.js"
import{c as d}from"./currentGuildId-1299fc05.js"
import{i as p}from"./intValue-44683b42.js"
import"./valueText-0f3877db.js"
import{a as v,g as m}from"./levelHighlight-f068b902.js"
import{g,s as y}from"./idb-72ad0068.js"
import{l as M,p as L}from"./lvlTests-2fd3e201.js"
import"./all-e4fd8fad.js"
import{l as x}from"./loadDataTables-27ca2fa3.js"
import{o as P}from"./onlinePlayersPage-af830b70.js"
function b(n,e){const t=$("<div/>").append(n[e][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),n[e][1],n[e][2],100*n[e][3]+n[e][4]+1]}let j,C
const R=[()=>j,n=>function(n){const e=n.match(a)
if(e)return Number(e[1])}(n[0])!==d(),n=>p(n[2])>=v(),n=>p(n[2])<=m()]
function I(n,e){(function(n){return R.every(e=>e(n))})(e)&&$("td",n).eq(2).addClass("lvlHighlight")}function q(n,e){j=t("highlightPlayersNearMyLvl"),C=$("#fshInv",n).DataTable(function(n){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:n,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(e))}function w(){C.draw()}function O(n){"fshMinLvl"!==n.target.id&&"fshMaxLvl"!==n.target.id||w()}function k(n,e){return parseInt($(n,e).val(),10)}function N(n,e){h(e)||i(n,e)}function T(n,e,t){const a=k("#fshMinLvl",n),s=k("#fshMaxLvl",n)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",s)
const i=l(p(t[2]),0)
return M(L,i,a,s)}let _,D,H,z
function G(a){D=a||{},function(n){$.fn.dataTable.ext.search.push(e(T,n)),$("#fshOutput",n).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),q(_,function(t){return n(t).map(e(b,t))}(D))}function S(n,e,t){const a=$("td",$(t)),s=a.eq(1).text();(function(n,e){return D[n]&&D[n][3]>e})(s,n)||(D[s]=function(n,e,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),n,e]}(n,e,a))}function A(n,e){z=function(n){return parseInt(n.parent().text().match(/(\d+)/g)[0],10)}(e)
for(let e=2;e<=z;e+=1)P(e).then(n)}function U(n){$("#fshOutput",_).append(n)}function V(n){U(" "+(H+1))
const t=c(n),a=$("#pCC input.custominput",t).first()
!function(n,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',n).parent().parent().parent().each(e(S,a))}(t,a),H+=1,1===H&&A(V,a),H===z&&(y("fsh_onlinePlayers",D),G(D))}function W(n){"fshRefresh"===n.target.id&&($("#fshRefresh",_).hide(),H=0,D={},P(1).then(V),i("lastOnlineCheck",s),U("Parsing online players...")),"fshReset"===n.target.id&&function(n){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",n).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",n).val(r.onlinePlayerMaxLvl),w()}(_)}function Y(){_.html(`<span><b>Online Players</b></span>${function(){const n=t("lastOnlineCheck")
return s-n>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-n)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),g("fsh_onlinePlayers").then(G),f(_[0],W),u(_[0],"keyup",O)}function B(n){o()||(_=n?$(n):$("#pCC"),x().then(Y))}export default B
//# sourceMappingURL=injectOnlinePlayers-61262583.js.map
