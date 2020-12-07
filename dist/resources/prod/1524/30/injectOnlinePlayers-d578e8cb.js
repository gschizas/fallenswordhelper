import{aq as n,t as e,H as t,bg as a,a4 as s,a2 as l,Y as i,aT as r,x as o,o as f,f as u,v as c}from"./calfSystem-6459f18a.js"
import{n as h}from"./numberIsNaN-fa7d637d.js"
import{c as d}from"./currentGuildId-da0b8fda.js"
import{i as p}from"./intValue-e8157483.js"
import"./valueText-29c7adc9.js"
import{a as v,g as m}from"./levelHighlight-f43341eb.js"
import{g,s as y}from"./idb-737f325b.js"
import{l as M,p as L}from"./lvlTests-a02a80a7.js"
import"./all-36f83e81.js"
import{l as x}from"./loadDataTables-5d301d53.js"
import{o as P}from"./onlinePlayersPage-a3e65c39.js"
function b(n,e){const t=$("<div/>").append(n[e][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),n[e][1],n[e][2],100*n[e][3]+n[e][4]+1]}let j,C
const R=[()=>j,n=>function(n){const e=n.match(a)
if(e)return Number(e[1])}(n[0])!==d(),n=>p(n[2])>=v(),n=>p(n[2])<=m()]
function I(n,e){(function(n){return R.every(e=>e(n))})(e)&&$("td",n).eq(2).addClass("lvlHighlight")}function q(n,e){j=t("highlightPlayersNearMyLvl"),C=$("#fshInv",n).DataTable(function(n){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:n,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(e))}function w(){C.draw()}function O(n){"fshMinLvl"!==n.target.id&&"fshMaxLvl"!==n.target.id||w()}function T(n,e){return parseInt($(n,e).val(),10)}function k(n,e){h(e)||i(n,e)}function N(n,e,t){const a=T("#fshMinLvl",n),s=T("#fshMaxLvl",n)
k("onlinePlayerMinLvl",a),k("onlinePlayerMaxLvl",s)
const i=l(p(t[2]),0)
return M(L,i,a,s)}let _,D,H,z
function G(a){D=a||{},function(n){$.fn.dataTable.ext.search.push(e(N,n)),$("#fshOutput",n).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),q(_,function(t){return n(t).map(e(b,t))}(D))}function S(n,e,t){const a=$("td",$(t)),s=a.eq(1).text();(function(n,e){return D[n]&&D[n][3]>e})(s,n)||(D[s]=function(n,e,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),n,e]}(n,e,a))}function A(n,e){z=function(n){return parseInt(n.parent().text().match(/(\d+)/g)[0],10)}(e)
for(let e=2;e<=z;e+=1)P(e).then(n)}function V(n){$("#fshOutput",_).append(n)}function W(n){V(" "+(H+1))
const t=c(n),a=$("#pCC input.custominput",t).first()
!function(n,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',n).parent().parent().parent().each(e(S,a))}(t,a),H+=1,1===H&&A(W,a),H===z&&(y("fsh_onlinePlayers",D),G(D))}function Y(n){"fshRefresh"===n.target.id&&($("#fshRefresh",_).hide(),H=0,D={},P(1).then(W),i("lastOnlineCheck",s),V("Parsing online players...")),"fshReset"===n.target.id&&function(n){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",n).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",n).val(r.onlinePlayerMaxLvl),w()}(_)}function B(){_.html(`<span><b>Online Players</b></span>${function(){const n=t("lastOnlineCheck")
return s-n>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-n)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),g("fsh_onlinePlayers").then(G),f(_[0],Y),u(_[0],"keyup",O)}function E(n){o()||(_=n?$(n):$("#pCC"),x().then(B))}export default E
//# sourceMappingURL=injectOnlinePlayers-d578e8cb.js.map
