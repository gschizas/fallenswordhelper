import{aO as e,t as n,H as t,bu as a,a5 as s,a3 as l,Z as i,ae as r,x as o,o as f,f as u,v as c}from"./calfSystem-26bcf570.js"
import{c as d}from"./currentGuildId-b9dbffa6.js"
import{i as h}from"./intValue-da5ad0eb.js"
import{a as p,g as v}from"./levelHighlight-6dccc69c.js"
import{n as m}from"./numberIsNaN-fecd7e6d.js"
import{l as g,p as y}from"./lvlTests-e2dd36df.js"
import{l as M}from"./loadDataTables-dd48330f.js"
import{o as L}from"./onlinePlayersPage-2cfeced6.js"
import{g as b,s as x}from"./idb-47b3fdf8.js"
import"./valueText-60aa9d22.js"
import"./all-31b59575.js"
function P(e,n){const t=$("<div/>").append(e[n][0])
return $("img",t).addClass("fshImgCntr"),[t.html(),e[n][1],e[n][2],100*e[n][3]+e[n][4]+1]}let j,C
const R=[()=>j,e=>function(e){const n=e.match(a)
if(n)return Number(n[1])}(e[0])!==d(),e=>h(e[2])>=p(),e=>h(e[2])<=v()]
function I(e,n){(function(e){return R.every((n=>n(e)))})(n)&&$("td",e).eq(2).addClass("lvlHighlight")}function O(e,n){j=t("highlightPlayersNearMyLvl"),C=$("#fshInv",e).DataTable(function(e){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:e,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(n))}function w(){C.draw()}function k(e){"fshMinLvl"!==e.target.id&&"fshMaxLvl"!==e.target.id||w()}function q(e,n){return parseInt($(e,n).val(),10)}function N(e,n){m(n)||i(e,n)}function T(e,n,t){const a=q("#fshMinLvl",e),s=q("#fshMaxLvl",e)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",s)
const i=l(h(t[2]),0)
return g(y,i,a,s)}let _,D,H,z
function G(a){D=a||{},function(e){$.fn.dataTable.ext.search.push(n(T,e)),$("#fshOutput",e).html(`<div align=right>Min lvl:<input value="${t("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${t("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),O(_,function(t){return e(t).map(n(P,t))}(D))}function S(e,n,t){const a=$("td",$(t)),s=a.eq(1).text();(function(e,n){return D[e]&&D[e][3]>n})(s,e)||(D[s]=function(e,n,t){return[t.eq(0).html(),t.eq(1).html(),t.eq(2).text(),e,n]}(e,n,a))}function A(e,n){z=function(e){return parseInt(e.parent().text().match(/(\d+)/g)[0],10)}(n)
for(let n=2;n<=z;n+=1)L(n).then(e)}function V(e){$("#fshOutput",_).append(e)}function W(e){V(` ${H+1}`)
const t=c(e),a=$("#pCC input.custominput",t).first()
!function(e,t){const a=t.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',e).parent().parent().parent().each(n(S,a))}(t,a),H+=1,1===H&&A(W,a),H===z&&(x("fsh_onlinePlayers",D),G(D))}function Z(e){"fshRefresh"===e.target.id&&($("#fshRefresh",_).hide(),H=0,D={},L(1).then(W),i("lastOnlineCheck",s),V("Parsing online players...")),"fshReset"===e.target.id&&function(e){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",e).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",e).val(r.onlinePlayerMaxLvl),w()}(_)}function B(){_.html(`<span><b>Online Players</b></span>${function(){const e=t("lastOnlineCheck")
return s-e>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-e)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),b("fsh_onlinePlayers").then(G),f(_[0],Z),u(_[0],"keyup",k)}function E(e){o()||(_=e?$(e):$("#pCC"),M().then(B))}export default E
//# sourceMappingURL=injectOnlinePlayers-702a9f9f.js.map
