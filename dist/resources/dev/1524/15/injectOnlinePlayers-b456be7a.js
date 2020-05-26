import{aj as e,s as n,D as t,aB as a,a0 as s,W as l,ba as i,w as r,a5 as o,o as f,e as u,u as c,a7 as h}from"./calfSystem-ee582533.js"
import{n as d}from"./numberIsNaN-c9f76e43.js"
import{c as p}from"./currentGuildId-0564d9a0.js"
import{i as v}from"./intValue-a842cf8a.js"
import"./valueText-a2e47d93.js"
import{b as m,p as g,c as y}from"./levelHighlight-f61a008a.js"
import"./all-b94d2d9d.js"
import{l as M,p as L}from"./lvlTests-ac568200.js"
import{l as P}from"./loadDataTables-9af37330.js"
import{o as x}from"./onlinePlayersPage-d9f0303e.js"
function b(e,n){const t=$("<div/>").append(e[n][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),e[n][1],e[n][2],100*e[n][3]+e[n][4]+1]}let j,C
const R=[()=>j,e=>function(e){const n=e.match(/;guild_id=([0-9]+)"/)
if(n)return Number(n[1])}(e[0])!==p(),e=>v(e[2])>=m,e=>v(e[2])<=g]
function I(e,n){(function(e){return R.every(n=>n(e))})(n)&&$("td",e).eq(2).addClass("lvlHighlight")}function w(e,n){j=t("highlightPlayersNearMyLvl"),C=$("#fshInv",e).DataTable(function(e){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:e,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(n))}function O(){C.draw()}function k(e){"fshMinLvl"!==e.target.id&&"fshMaxLvl"!==e.target.id||O()}function q(e,n){return parseInt($(e,n).val(),10)}function N(e,n){d(n)||l(e,n)}function T(e,n,t){const a=q("#fshMinLvl",e),l=q("#fshMaxLvl",e)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",l)
const i=s(v(t[2]),0)
return M(L,i,a,l)}let _,D,z,G
function H(a){D=a||{},function(e){$.fn.dataTable.ext.search.push(n(T,e)),$("#fshOutput",e).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),y(),w(_,function(t){return e(t).map(n(b,t))}(D))}function S(e,n,t){const a=$("td",$(t)),s=a.eq(1).text();(function(e,n){return D[e]&&D[e][3]>n})(s,e)||(D[s]=function(e,n,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),e,n]}(e,n,a))}function W(e,n){G=function(e){return parseInt(e.parent().text().match(/(\d+)/g)[0],10)}(n)
for(let n=2;n<=G;n+=1)x(n).then(e)}function A(e){$("#fshOutput",_).append(e)}function B(e){A(" "+(z+1))
const t=c(e),a=$("#pCC input.custominput",t).first()
!function(e,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',e).parent().parent().parent().each(n(S,a))}(t,a),z+=1,1===z&&W(B,a),z===G&&(h("fsh_onlinePlayers",D),H(D))}function V(e){"fshRefresh"===e.target.id&&($("#fshRefresh",_).hide(),z=0,D={},x(1).then(B),l("lastOnlineCheck",a),A("Parsing online players...")),"fshReset"===e.target.id&&function(e){l("onlinePlayerMinLvl",i.onlinePlayerMinLvl),l("onlinePlayerMaxLvl",i.onlinePlayerMaxLvl),$("#fshMinLvl",e).val(i.onlinePlayerMinLvl),$("#fshMaxLvl",e).val(i.onlinePlayerMaxLvl),O()}(_)}function E(){_.html(`<span><b>Online Players</b></span>${function(){const e=t("lastOnlineCheck")
return a-e>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(a-e)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),o("fsh_onlinePlayers").then(H),f(_[0],V),u(_[0],"keyup",k)}export default function(e){r()||(_=e?$(e):$("#pCC"),P().then(E))}
//# sourceMappingURL=injectOnlinePlayers-b456be7a.js.map
