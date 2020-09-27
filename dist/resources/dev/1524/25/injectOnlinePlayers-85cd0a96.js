import{au as n,t as e,H as t,bo as a,a7 as s,a3 as l,Z as i,aW as r,x as o,o as f,f as u,v as c}from"./calfSystem-69dd5601.js"
import{n as d}from"./numberIsNaN-929de7af.js"
import{c as h}from"./currentGuildId-a0138513.js"
import{i as p}from"./intValue-65d3c36c.js"
import"./valueText-1de8e1c5.js"
import{a as v,g as m}from"./levelHighlight-809d03f9.js"
import{g,s as y}from"./idb-874fe815.js"
import{l as M,p as L}from"./lvlTests-df1daa9a.js"
import"./all-3791b7d5.js"
import{l as x}from"./loadDataTables-0867dbe6.js"
import{o as P}from"./onlinePlayersPage-6805962c.js"
function b(n,e){const t=$("<div/>").append(n[e][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),n[e][1],n[e][2],100*n[e][3]+n[e][4]+1]}let j,C
const R=[()=>j,n=>function(n){const e=n.match(a)
if(e)return Number(e[1])}(n[0])!==h(),n=>p(n[2])>=v(),n=>p(n[2])<=m()]
function I(n,e){(function(n){return R.every(e=>e(n))})(e)&&$("td",n).eq(2).addClass("lvlHighlight")}function w(n,e){j=t("highlightPlayersNearMyLvl"),C=$("#fshInv",n).DataTable(function(n){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:n,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(e))}function O(){C.draw()}function k(n){"fshMinLvl"!==n.target.id&&"fshMaxLvl"!==n.target.id||O()}function q(n,e){return parseInt($(n,e).val(),10)}function N(n,e){d(e)||i(n,e)}function T(n,e,t){const a=q("#fshMinLvl",n),s=q("#fshMaxLvl",n)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",s)
const i=l(p(t[2]),0)
return M(L,i,a,s)}let _,D,H,z
function G(a){D=a||{},function(n){$.fn.dataTable.ext.search.push(e(T,n)),$("#fshOutput",n).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),w(_,function(t){return n(t).map(e(b,t))}(D))}function S(n,e,t){const a=$("td",$(t)),s=a.eq(1).text();(function(n,e){return D[n]&&D[n][3]>e})(s,n)||(D[s]=function(n,e,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),n,e]}(n,e,a))}function W(n,e){z=function(n){return parseInt(n.parent().text().match(/(\d+)/g)[0],10)}(e)
for(let e=2;e<=z;e+=1)P(e).then(n)}function A(n){$("#fshOutput",_).append(n)}function V(n){A(" "+(H+1))
const t=c(n),a=$("#pCC input.custominput",t).first()
!function(n,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',n).parent().parent().parent().each(e(S,a))}(t,a),H+=1,1===H&&W(V,a),H===z&&(y("fsh_onlinePlayers",D),G(D))}function Z(n){"fshRefresh"===n.target.id&&($("#fshRefresh",_).hide(),H=0,D={},P(1).then(V),i("lastOnlineCheck",s),A("Parsing online players...")),"fshReset"===n.target.id&&function(n){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",n).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",n).val(r.onlinePlayerMaxLvl),O()}(_)}function B(){_.html(`<span><b>Online Players</b></span>${function(){const n=t("lastOnlineCheck")
return s-n>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-n)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),g("fsh_onlinePlayers").then(G),f(_[0],Z),u(_[0],"keyup",k)}function E(n){o()||(_=n?$(n):$("#pCC"),x().then(B))}export default E
//# sourceMappingURL=injectOnlinePlayers-85cd0a96.js.map
