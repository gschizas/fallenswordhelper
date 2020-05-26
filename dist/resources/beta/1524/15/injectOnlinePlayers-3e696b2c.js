import{ag as n,s as e,D as t,ay as a,$ as s,V as l,b9 as i,w as r,a4 as o,o as f,e as u,u as c,a6 as h}from"./calfSystem-1262535f.js"
import{n as d}from"./numberIsNaN-e4fe1516.js"
import{c as p}from"./currentGuildId-5a28bdba.js"
import{i as v}from"./intValue-c4584407.js"
import"./valueText-03ad0c73.js"
import{b as m,p as g,c as y}from"./levelHighlight-a8f02673.js"
import"./all-c00b9c25.js"
import{l as M,p as L}from"./lvlTests-37a8796d.js"
import{l as P}from"./loadDataTables-96074b55.js"
import{o as b}from"./onlinePlayersPage-14367a0a.js"
function x(n,e){const t=$("<div/>").append(n[e][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),n[e][1],n[e][2],100*n[e][3]+n[e][4]+1]}let C,j
const R=[()=>C,n=>function(n){const e=n.match(/;guild_id=([0-9]+)"/)
if(e)return Number(e[1])}(n[0])!==p(),n=>v(n[2])>=m,n=>v(n[2])<=g]
function I(n,e){(function(n){return R.every(e=>e(n))})(e)&&$("td",n).eq(2).addClass("lvlHighlight")}function w(n,e){C=t("highlightPlayersNearMyLvl"),j=$("#fshInv",n).DataTable(function(n){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:n,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(e))}function O(){j.draw()}function k(n){"fshMinLvl"!==n.target.id&&"fshMaxLvl"!==n.target.id||O()}function q(n,e){return parseInt($(n,e).val(),10)}function N(n,e){d(e)||l(n,e)}function T(n,e,t){const a=q("#fshMinLvl",n),l=q("#fshMaxLvl",n)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",l)
const i=s(v(t[2]),0)
return M(L,i,a,l)}let _,D,z,G
function H(a){D=a||{},function(n){$.fn.dataTable.ext.search.push(e(T,n)),$("#fshOutput",n).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),y(),w(_,function(t){return n(t).map(e(x,t))}(D))}function S(n,e,t){const a=$("td",$(t)),s=a.eq(1).text();(function(n,e){return D[n]&&D[n][3]>e})(s,n)||(D[s]=function(n,e,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),n,e]}(n,e,a))}function V(n,e){G=function(n){return parseInt(n.parent().text().match(/(\d+)/g)[0],10)}(e)
for(let e=2;e<=G;e+=1)b(e).then(n)}function A(n){$("#fshOutput",_).append(n)}function W(n){A(" "+(z+1))
const t=c(n),a=$("#pCC input.custominput",t).first()
!function(n,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',n).parent().parent().parent().each(e(S,a))}(t,a),z+=1,1===z&&V(W,a),z===G&&(h("fsh_onlinePlayers",D),H(D))}function B(n){"fshRefresh"===n.target.id&&($("#fshRefresh",_).hide(),z=0,D={},b(1).then(W),l("lastOnlineCheck",a),A("Parsing online players...")),"fshReset"===n.target.id&&function(n){l("onlinePlayerMinLvl",i.onlinePlayerMinLvl),l("onlinePlayerMaxLvl",i.onlinePlayerMaxLvl),$("#fshMinLvl",n).val(i.onlinePlayerMinLvl),$("#fshMaxLvl",n).val(i.onlinePlayerMaxLvl),O()}(_)}function E(){_.html(`<span><b>Online Players</b></span>${function(){const n=t("lastOnlineCheck")
return a-n>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(a-n)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),o("fsh_onlinePlayers").then(H),f(_[0],B),u(_[0],"keyup",k)}export default function(n){r()||(_=n?$(n):$("#pCC"),P().then(E))}
//# sourceMappingURL=injectOnlinePlayers-3e696b2c.js.map
