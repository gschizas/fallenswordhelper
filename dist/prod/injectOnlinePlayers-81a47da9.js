import{av as n,v as e,G as t,b3 as a,I as s,aL as l,aa as i,a4 as r,bc as o,z as f,ah as u,o as c,f as h,x as d,aj as p}from"./calfSystem-cb871cc0.js"
import{n as v}from"./numberIsNaN-3061f097.js"
import{b as m,p as g,c as y}from"./levelHighlight-bb3592d4.js"
import"./all-56fa180f.js"
import{l as L,p as M}from"./lvlTests-9e757586.js"
import{l as P}from"./loadDataTables-6e66e590.js"
import{o as b}from"./onlinePlayersPage-f308417e.js"
function x(n,e){const t=$("<div/>").append(n[e][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),n[e][1],n[e][2],100*n[e][3]+n[e][4]+1]}let C,R
const j=[()=>C,n=>function(n){const e=n.match(/;guild_id=([0-9]+)"/)
if(e)return Number(e[1])}(n[0])!==a(),n=>s(n[2])>=m,n=>s(n[2])<=g]
function I(n,e){(function(n){return j.every(e=>e(n))})(e)&&$("td",n).eq(2).addClass("lvlHighlight")}function w(n,e){C=t("highlightPlayersNearMyLvl"),R=$("#fshInv",n).DataTable(function(n){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:n,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(e))}function O(){R.draw()}function k(n){"fshMinLvl"!==n.target.id&&"fshMaxLvl"!==n.target.id||O()}function q(n,e){return parseInt($(n,e).val(),10)}function N(n,e){v(e)||r(n,e)}function _(n,e,t){const a=q("#fshMinLvl",n),l=q("#fshMaxLvl",n)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",l)
const r=i(s(t[2]),0)
return L(M,r,a,l)}let T,z,D,G
function H(a){z=a||{},function(n){$.fn.dataTable.ext.search.push(e(_,n)),$("#fshOutput",n).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> `+`Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> `+'<input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>')}(T),y(),w(T,function(t){return n(t).map(e(x,t))}(z))}function S(n,e,t){const a=$("td",$(t)),s=a.eq(1).text();(function(n,e){return z[n]&&z[n][3]>e})(s,n)||(z[s]=function(n,e,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),n,e]}(n,e,a))}function A(n,e){G=function(n){return parseInt(n.parent().text().match(/(\d+)/g)[0],10)}(e)
for(let e=2;e<=G;e+=1)b(e).then(n)}function W(n){$("#fshOutput",T).append(n)}function B(n){W(` ${D+1}`)
const t=d(n),a=$("#pCC input.custominput",t).first()
!function(n,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',n).parent().parent().parent().each(e(S,a))}(t,a),D+=1,1===D&&A(B,a),D===G&&(p("fsh_onlinePlayers",z),H(z))}function E(n){"fshRefresh"===n.target.id&&($("#fshRefresh",T).hide(),D=0,z={},b(1).then(B),r("lastOnlineCheck",l),W("Parsing online players...")),"fshReset"===n.target.id&&function(n){r("onlinePlayerMinLvl",o.onlinePlayerMinLvl),r("onlinePlayerMaxLvl",o.onlinePlayerMaxLvl),$("#fshMinLvl",n).val(o.onlinePlayerMinLvl),$("#fshMaxLvl",n).val(o.onlinePlayerMaxLvl),O()}(T)}function F(){T.html(`<span><b>Online Players</b></span>${function(){const n=t("lastOnlineCheck")
return l-n>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(l-n)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),u("fsh_onlinePlayers").then(H),c(T[0],E),h(T[0],"keyup",k)}export default function(n){f()||(T=n?$(n):$("#pCC"),P().then(F))}
//# sourceMappingURL=injectOnlinePlayers-81a47da9.js.map
