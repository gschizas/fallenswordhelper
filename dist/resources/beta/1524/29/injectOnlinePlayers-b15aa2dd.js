import{aq as n,t,H as e,bi as a,a4 as s,a2 as l,Y as i,aT as r,x as o,o as f,f as u,v as c}from"./calfSystem-f9a27018.js"
import{n as h}from"./numberIsNaN-d1ebf732.js"
import{c as d}from"./currentGuildId-a542fdb9.js"
import{i as p}from"./intValue-f94761c7.js"
import"./valueText-d637a521.js"
import{a as v,g as m}from"./levelHighlight-4cc4c0d9.js"
import{g,s as y}from"./idb-5c501cd3.js"
import{l as M,p as L}from"./lvlTests-12363b02.js"
import"./all-01203f8c.js"
import{l as x}from"./loadDataTables-343ff96f.js"
import{o as P}from"./onlinePlayersPage-0a908844.js"
function b(n,t){const e=$("<div/>").append(n[t][0])
return $("img",e).addClass("fshImgCntr"),[e.html(),n[t][1],n[t][2],100*n[t][3]+n[t][4]+1]}let j,C
const R=[()=>j,n=>function(n){const t=n.match(a)
if(t)return Number(t[1])}(n[0])!==d(),n=>p(n[2])>=v(),n=>p(n[2])<=m()]
function I(n,t){(function(n){return R.every(t=>t(n))})(t)&&$("td",n).eq(2).addClass("lvlHighlight")}function q(n,t){j=e("highlightPlayersNearMyLvl"),C=$("#fshInv",n).DataTable(function(n){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:n,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(t))}function w(){C.draw()}function O(n){"fshMinLvl"!==n.target.id&&"fshMaxLvl"!==n.target.id||w()}function T(n,t){return parseInt($(n,t).val(),10)}function k(n,t){h(t)||i(n,t)}function N(n,t,e){const a=T("#fshMinLvl",n),s=T("#fshMaxLvl",n)
k("onlinePlayerMinLvl",a),k("onlinePlayerMaxLvl",s)
const i=l(p(e[2]),0)
return M(L,i,a,s)}let _,D,H,z
function G(a){D=a||{},function(n){$.fn.dataTable.ext.search.push(t(N,n)),$("#fshOutput",n).html(`<div align=right>Min lvl:<input value="${e("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${e("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),q(_,function(e){return n(e).map(t(b,e))}(D))}function S(n,t,e){const a=$("td",$(e)),s=a.eq(1).text();(function(n,t){return D[n]&&D[n][3]>t})(s,n)||(D[s]=function(n,t,e){return[e.eq(0).html(),e.eq(1).html(),e.eq(2).text(),n,t]}(n,t,a))}function A(n,t){z=function(n){return parseInt(n.parent().text().match(/(\d+)/g)[0],10)}(t)
for(let t=2;t<=z;t+=1)P(t).then(n)}function V(n){$("#fshOutput",_).append(n)}function W(n){V(" "+(H+1))
const e=c(n),a=$("#pCC input.custominput",e).first()
!function(n,e){const a=e.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',n).parent().parent().parent().each(t(S,a))}(e,a),H+=1,1===H&&A(W,a),H===z&&(y("fsh_onlinePlayers",D),G(D))}function Y(n){"fshRefresh"===n.target.id&&($("#fshRefresh",_).hide(),H=0,D={},P(1).then(W),i("lastOnlineCheck",s),V("Parsing online players...")),"fshReset"===n.target.id&&function(n){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",n).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",n).val(r.onlinePlayerMaxLvl),w()}(_)}function B(){_.html(`<span><b>Online Players</b></span>${function(){const n=e("lastOnlineCheck")
return s-n>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-n)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),g("fsh_onlinePlayers").then(G),f(_[0],Y),u(_[0],"keyup",O)}function E(n){o()||(_=n?$(n):$("#pCC"),x().then(B))}export default E
//# sourceMappingURL=injectOnlinePlayers-b15aa2dd.js.map
