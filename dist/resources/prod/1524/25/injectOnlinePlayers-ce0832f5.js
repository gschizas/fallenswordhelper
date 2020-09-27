import{aq as e,t as n,H as t,bj as a,a4 as s,a2 as l,Y as i,aU as r,x as o,o as f,f as u,v as c}from"./calfSystem-71b9378d.js"
import{n as d}from"./numberIsNaN-929de7af.js"
import{c as h}from"./currentGuildId-58e8f97e.js"
import{i as p}from"./intValue-65d3c36c.js"
import"./valueText-4f638fd7.js"
import{a as v,g as m}from"./levelHighlight-51d4b9d9.js"
import{g,s as y}from"./idb-97e2a44e.js"
import{l as M,p as L}from"./lvlTests-e64d872a.js"
import"./all-3791b7d5.js"
import{l as x}from"./loadDataTables-3161a792.js"
import{o as P}from"./onlinePlayersPage-08c88c4d.js"
function b(e,n){const t=$("<div/>").append(e[n][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),e[n][1],e[n][2],100*e[n][3]+e[n][4]+1]}let j,C
const R=[()=>j,e=>function(e){const n=e.match(a)
if(n)return Number(n[1])}(e[0])!==h(),e=>p(e[2])>=v(),e=>p(e[2])<=m()]
function I(e,n){(function(e){return R.every(n=>n(e))})(n)&&$("td",e).eq(2).addClass("lvlHighlight")}function q(e,n){j=t("highlightPlayersNearMyLvl"),C=$("#fshInv",e).DataTable(function(e){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:e,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(n))}function w(){C.draw()}function O(e){"fshMinLvl"!==e.target.id&&"fshMaxLvl"!==e.target.id||w()}function k(e,n){return parseInt($(e,n).val(),10)}function N(e,n){d(n)||i(e,n)}function T(e,n,t){const a=k("#fshMinLvl",e),s=k("#fshMaxLvl",e)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",s)
const i=l(p(t[2]),0)
return M(L,i,a,s)}let _,D,H,z
function G(a){D=a||{},function(e){$.fn.dataTable.ext.search.push(n(T,e)),$("#fshOutput",e).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),q(_,function(t){return e(t).map(n(b,t))}(D))}function S(e,n,t){const a=$("td",$(t)),s=a.eq(1).text();(function(e,n){return D[e]&&D[e][3]>n})(s,e)||(D[s]=function(e,n,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),e,n]}(e,n,a))}function A(e,n){z=function(e){return parseInt(e.parent().text().match(/(\d+)/g)[0],10)}(n)
for(let n=2;n<=z;n+=1)P(n).then(e)}function U(e){$("#fshOutput",_).append(e)}function V(e){U(" "+(H+1))
const t=c(e),a=$("#pCC input.custominput",t).first()
!function(e,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',e).parent().parent().parent().each(n(S,a))}(t,a),H+=1,1===H&&A(V,a),H===z&&(y("fsh_onlinePlayers",D),G(D))}function W(e){"fshRefresh"===e.target.id&&($("#fshRefresh",_).hide(),H=0,D={},P(1).then(V),i("lastOnlineCheck",s),U("Parsing online players...")),"fshReset"===e.target.id&&function(e){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",e).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",e).val(r.onlinePlayerMaxLvl),w()}(_)}function Y(){_.html(`<span><b>Online Players</b></span>${function(){const e=t("lastOnlineCheck")
return s-e>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-e)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),g("fsh_onlinePlayers").then(G),f(_[0],W),u(_[0],"keyup",O)}function B(e){o()||(_=e?$(e):$("#pCC"),x().then(Y))}export default B
//# sourceMappingURL=injectOnlinePlayers-ce0832f5.js.map
