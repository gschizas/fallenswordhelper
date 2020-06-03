import{au as e,s as n,D as t,a7 as a,a1 as s,X as l,aX as i,w as r,o,e as f,u}from"./calfSystem-f7574730.js"
import{n as c}from"./numberIsNaN-92f332e4.js"
import{c as h}from"./currentGuildId-3e98e06d.js"
import{i as d}from"./intValue-0280032d.js"
import"./valueText-686b8935.js"
import{b as p,p as v,c as m}from"./levelHighlight-c31cdec6.js"
import{g,s as y}from"./idb-14a57c5b.js"
import"./all-d5952527.js"
import{l as M,p as L}from"./lvlTests-38a8de9e.js"
import{l as P}from"./loadDataTables-791afcee.js"
import{o as x}from"./onlinePlayersPage-2cfc5b33.js"
function b(e,n){const t=$("<div/>").append(e[n][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),e[n][1],e[n][2],100*e[n][3]+e[n][4]+1]}let j,C
const R=[()=>j,e=>function(e){const n=e.match(/;guild_id=([0-9]+)"/)
if(n)return Number(n[1])}(e[0])!==h(),e=>d(e[2])>=p,e=>d(e[2])<=v]
function I(e,n){(function(e){return R.every(n=>n(e))})(n)&&$("td",e).eq(2).addClass("lvlHighlight")}function w(e,n){j=t("highlightPlayersNearMyLvl"),C=$("#fshInv",e).DataTable(function(e){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:e,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(n))}function O(){C.draw()}function k(e){"fshMinLvl"!==e.target.id&&"fshMaxLvl"!==e.target.id||O()}function q(e,n){return parseInt($(e,n).val(),10)}function N(e,n){c(n)||l(e,n)}function T(e,n,t){const a=q("#fshMinLvl",e),l=q("#fshMaxLvl",e)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",l)
const i=s(d(t[2]),0)
return M(L,i,a,l)}let _,D,z,G
function H(a){D=a||{},function(e){$.fn.dataTable.ext.search.push(n(T,e)),$("#fshOutput",e).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),m(),w(_,function(t){return e(t).map(n(b,t))}(D))}function S(e,n,t){const a=$("td",$(t)),s=a.eq(1).text();(function(e,n){return D[e]&&D[e][3]>n})(s,e)||(D[s]=function(e,n,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),e,n]}(e,n,a))}function X(e,n){G=function(e){return parseInt(e.parent().text().match(/(\d+)/g)[0],10)}(n)
for(let n=2;n<=G;n+=1)x(n).then(e)}function A(e){$("#fshOutput",_).append(e)}function V(e){A(" "+(z+1))
const t=u(e),a=$("#pCC input.custominput",t).first()
!function(e,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',e).parent().parent().parent().each(n(S,a))}(t,a),z+=1,1===z&&X(V,a),z===G&&(y("fsh_onlinePlayers",D),H(D))}function W(e){"fshRefresh"===e.target.id&&($("#fshRefresh",_).hide(),z=0,D={},x(1).then(V),l("lastOnlineCheck",a),A("Parsing online players...")),"fshReset"===e.target.id&&function(e){l("onlinePlayerMinLvl",i.onlinePlayerMinLvl),l("onlinePlayerMaxLvl",i.onlinePlayerMaxLvl),$("#fshMinLvl",e).val(i.onlinePlayerMinLvl),$("#fshMaxLvl",e).val(i.onlinePlayerMaxLvl),O()}(_)}function B(){_.html(`<span><b>Online Players</b></span>${function(){const e=t("lastOnlineCheck")
return a-e>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(a-e)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),g("fsh_onlinePlayers").then(H),o(_[0],W),f(_[0],"keyup",k)}export default function(e){r()||(_=e?$(e):$("#pCC"),P().then(B))}
//# sourceMappingURL=injectOnlinePlayers-1ce10b54.js.map
