import{au as e,u as n,F as t,b2 as a,H as s,aK as l,a9 as i,a3 as r,bb as o,y as u,ag as f,o as c,e as h,w as d,ai as p}from"./calfSystem-371c414c.js"
import{n as v}from"./numberIsNaN-987e3021.js"
import{b as m,p as g,c as y}from"./levelHighlight-cee6b23a.js"
import"./all-93023d41.js"
import{l as M,p as L}from"./lvlTests-9314ee2e.js"
import{l as P}from"./loadDataTables-60dc642e.js"
import{o as b}from"./onlinePlayersPage-68c9a28e.js"
function x(e,n){const t=$("<div/>").append(e[n][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),e[n][1],e[n][2],100*e[n][3]+e[n][4]+1]}let C,R
const j=[()=>C,e=>function(e){const n=e.match(/;guild_id=([0-9]+)"/)
if(n)return Number(n[1])}(e[0])!==a(),e=>s(e[2])>=m,e=>s(e[2])<=g]
function w(e,n){(function(e){return j.every(n=>n(e))})(n)&&$("td",e).eq(2).addClass("lvlHighlight")}function I(e,n){C=t("highlightPlayersNearMyLvl"),R=$("#fshInv",e).DataTable(function(e){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:w,data:e,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(n))}function O(){R.draw()}function k(e){"fshMinLvl"!==e.target.id&&"fshMaxLvl"!==e.target.id||O()}function q(e,n){return parseInt($(e,n).val(),10)}function N(e,n){v(n)||r(e,n)}function _(e,n,t){const a=q("#fshMinLvl",e),l=q("#fshMaxLvl",e)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",l)
const r=i(s(t[2]),0)
return M(L,r,a,l)}let T,D,H,z
function S(a){D=a||{},function(e){$.fn.dataTable.ext.search.push(n(_,e)),$("#fshOutput",e).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(T),y(),I(T,function(t){return e(t).map(n(x,t))}(D))}function A(e,n,t){const a=$("td",$(t)),s=a.eq(1).text();(function(e,n){return D[e]&&D[e][3]>n})(s,e)||(D[s]=function(e,n,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),e,n]}(e,n,a))}function F(e,n){z=function(e){return parseInt(e.parent().text().match(/(\d+)/g)[0],10)}(n)
for(let n=2;n<=z;n+=1)b(n).then(e)}function G(e){$("#fshOutput",T).append(e)}function K(e){G(" "+(H+1))
const t=d(e),a=$("#pCC input.custominput",t).first()
!function(e,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',e).parent().parent().parent().each(n(A,a))}(t,a),H+=1,1===H&&F(K,a),H===z&&(p("fsh_onlinePlayers",D),S(D))}function W(e){"fshRefresh"===e.target.id&&($("#fshRefresh",T).hide(),H=0,D={},b(1).then(K),r("lastOnlineCheck",l),G("Parsing online players...")),"fshReset"===e.target.id&&function(e){r("onlinePlayerMinLvl",o.onlinePlayerMinLvl),r("onlinePlayerMaxLvl",o.onlinePlayerMaxLvl),$("#fshMinLvl",e).val(o.onlinePlayerMinLvl),$("#fshMaxLvl",e).val(o.onlinePlayerMaxLvl),O()}(T)}function B(){T.html(`<span><b>Online Players</b></span>${function(){const e=t("lastOnlineCheck")
return l-e>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(l-e)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),f("fsh_onlinePlayers").then(S),c(T[0],W),h(T[0],"keyup",k)}export default function(e){u()||(T=e?$(e):$("#pCC"),P().then(B))}
//# sourceMappingURL=injectOnlinePlayers-0c99e4fd.js.map
