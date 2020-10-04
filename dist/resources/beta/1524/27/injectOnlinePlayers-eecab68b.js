import{ar as e,t as n,H as t,bj as a,a5 as s,a3 as l,Z as i,aU as r,x as o,o as f,f as u,v as c}from"./calfSystem-70c7a660.js"
import{n as h}from"./numberIsNaN-871eca26.js"
import{c as d}from"./currentGuildId-b3e9b6a5.js"
import{i as p}from"./intValue-ef353ded.js"
import"./valueText-6c1d3d77.js"
import{a as v,g as m}from"./levelHighlight-0b338177.js"
import{g,s as y}from"./idb-d93da5f0.js"
import{l as M,p as L}from"./lvlTests-5f917fbb.js"
import"./all-e81516b4.js"
import{l as b}from"./loadDataTables-adc50001.js"
import{o as x}from"./onlinePlayersPage-5e29e7c9.js"
function P(e,n){const t=$("<div/>").append(e[n][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),e[n][1],e[n][2],100*e[n][3]+e[n][4]+1]}let j,C
const R=[()=>j,e=>function(e){const n=e.match(a)
if(n)return Number(n[1])}(e[0])!==d(),e=>p(e[2])>=v(),e=>p(e[2])<=m()]
function I(e,n){(function(e){return R.every(n=>n(e))})(n)&&$("td",e).eq(2).addClass("lvlHighlight")}function w(e,n){j=t("highlightPlayersNearMyLvl"),C=$("#fshInv",e).DataTable(function(e){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:e,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(n))}function O(){C.draw()}function k(e){"fshMinLvl"!==e.target.id&&"fshMaxLvl"!==e.target.id||O()}function q(e,n){return parseInt($(e,n).val(),10)}function N(e,n){h(n)||i(e,n)}function T(e,n,t){const a=q("#fshMinLvl",e),s=q("#fshMaxLvl",e)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",s)
const i=l(p(t[2]),0)
return M(L,i,a,s)}let _,D,H,z
function G(a){D=a||{},function(e){$.fn.dataTable.ext.search.push(n(T,e)),$("#fshOutput",e).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),w(_,function(t){return e(t).map(n(P,t))}(D))}function S(e,n,t){const a=$("td",$(t)),s=a.eq(1).text();(function(e,n){return D[e]&&D[e][3]>n})(s,e)||(D[s]=function(e,n,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),e,n]}(e,n,a))}function A(e,n){z=function(e){return parseInt(e.parent().text().match(/(\d+)/g)[0],10)}(n)
for(let n=2;n<=z;n+=1)x(n).then(e)}function U(e){$("#fshOutput",_).append(e)}function V(e){U(" "+(H+1))
const t=c(e),a=$("#pCC input.custominput",t).first()
!function(e,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',e).parent().parent().parent().each(n(S,a))}(t,a),H+=1,1===H&&A(V,a),H===z&&(y("fsh_onlinePlayers",D),G(D))}function W(e){"fshRefresh"===e.target.id&&($("#fshRefresh",_).hide(),H=0,D={},x(1).then(V),i("lastOnlineCheck",s),U("Parsing online players...")),"fshReset"===e.target.id&&function(e){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",e).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",e).val(r.onlinePlayerMaxLvl),O()}(_)}function Z(){_.html(`<span><b>Online Players</b></span>${function(){const e=t("lastOnlineCheck")
return s-e>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-e)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),g("fsh_onlinePlayers").then(G),f(_[0],W),u(_[0],"keyup",k)}function B(e){o()||(_=e?$(e):$("#pCC"),b().then(Z))}export default B
//# sourceMappingURL=injectOnlinePlayers-eecab68b.js.map
