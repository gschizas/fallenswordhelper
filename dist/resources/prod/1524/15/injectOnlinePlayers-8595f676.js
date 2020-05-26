import{ag as e,s as n,D as t,ay as a,$ as s,V as l,b9 as i,w as r,a4 as o,o as f,e as u,u as c,a6 as d}from"./calfSystem-740ec4d2.js"
import{n as h}from"./numberIsNaN-2fbabd4d.js"
import{c as p}from"./currentGuildId-ce4d8404.js"
import{i as v}from"./intValue-576c2dec.js"
import"./valueText-3095af99.js"
import{b as m,p as g,c as y}from"./levelHighlight-2bc51b91.js"
import"./all-30e677b0.js"
import{l as M,p as L}from"./lvlTests-7a00a4d1.js"
import{l as b}from"./loadDataTables-89aea7e0.js"
import{o as P}from"./onlinePlayersPage-39ffde6b.js"
function x(e,n){const t=$("<div/>").append(e[n][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),e[n][1],e[n][2],100*e[n][3]+e[n][4]+1]}let C,j
const R=[()=>C,e=>function(e){const n=e.match(/;guild_id=([0-9]+)"/)
if(n)return Number(n[1])}(e[0])!==p(),e=>v(e[2])>=m,e=>v(e[2])<=g]
function I(e,n){(function(e){return R.every(n=>n(e))})(n)&&$("td",e).eq(2).addClass("lvlHighlight")}function w(e,n){C=t("highlightPlayersNearMyLvl"),j=$("#fshInv",e).DataTable(function(e){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:e,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(n))}function O(){j.draw()}function k(e){"fshMinLvl"!==e.target.id&&"fshMaxLvl"!==e.target.id||O()}function q(e,n){return parseInt($(e,n).val(),10)}function N(e,n){h(n)||l(e,n)}function T(e,n,t){const a=q("#fshMinLvl",e),l=q("#fshMaxLvl",e)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",l)
const i=s(v(t[2]),0)
return M(L,i,a,l)}let _,D,z,G
function H(a){D=a||{},function(e){$.fn.dataTable.ext.search.push(n(T,e)),$("#fshOutput",e).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),y(),w(_,function(t){return e(t).map(n(x,t))}(D))}function S(e,n,t){const a=$("td",$(t)),s=a.eq(1).text();(function(e,n){return D[e]&&D[e][3]>n})(s,e)||(D[s]=function(e,n,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),e,n]}(e,n,a))}function V(e,n){G=function(e){return parseInt(e.parent().text().match(/(\d+)/g)[0],10)}(n)
for(let n=2;n<=G;n+=1)P(n).then(e)}function A(e){$("#fshOutput",_).append(e)}function W(e){A(" "+(z+1))
const t=c(e),a=$("#pCC input.custominput",t).first()
!function(e,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',e).parent().parent().parent().each(n(S,a))}(t,a),z+=1,1===z&&V(W,a),z===G&&(d("fsh_onlinePlayers",D),H(D))}function B(e){"fshRefresh"===e.target.id&&($("#fshRefresh",_).hide(),z=0,D={},P(1).then(W),l("lastOnlineCheck",a),A("Parsing online players...")),"fshReset"===e.target.id&&function(e){l("onlinePlayerMinLvl",i.onlinePlayerMinLvl),l("onlinePlayerMaxLvl",i.onlinePlayerMaxLvl),$("#fshMinLvl",e).val(i.onlinePlayerMinLvl),$("#fshMaxLvl",e).val(i.onlinePlayerMaxLvl),O()}(_)}function E(){_.html(`<span><b>Online Players</b></span>${function(){const e=t("lastOnlineCheck")
return a-e>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(a-e)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),o("fsh_onlinePlayers").then(H),f(_[0],B),u(_[0],"keyup",k)}export default function(e){r()||(_=e?$(e):$("#pCC"),b().then(E))}
//# sourceMappingURL=injectOnlinePlayers-8595f676.js.map
