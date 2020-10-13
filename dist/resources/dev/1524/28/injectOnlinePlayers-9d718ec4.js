import{au as n,t,H as e,bl as a,a7 as s,a3 as l,Z as i,aV as r,x as o,o as f,f as u,v as c}from"./calfSystem-b136673a.js"
import{n as h}from"./numberIsNaN-91041dcf.js"
import{c as d}from"./currentGuildId-4405d1bb.js"
import{i as p}from"./intValue-f4d85578.js"
import"./valueText-90e91fab.js"
import{a as v,g as m}from"./levelHighlight-4b892b59.js"
import{g,s as b}from"./idb-c31665cb.js"
import{l as y,p as M}from"./lvlTests-045a7c7d.js"
import"./all-7e2b4bf6.js"
import{l as L}from"./loadDataTables-fb922282.js"
import{o as x}from"./onlinePlayersPage-4b1467f0.js"
function P(n,t){const e=$("<div/>").append(n[t][0])
return $("img",e).addClass("fshImgCntr"),[e.html(),n[t][1],n[t][2],100*n[t][3]+n[t][4]+1]}let j,C
const R=[()=>j,n=>function(n){const t=n.match(a)
if(t)return Number(t[1])}(n[0])!==d(),n=>p(n[2])>=v(),n=>p(n[2])<=m()]
function I(n,t){(function(n){return R.every(t=>t(n))})(t)&&$("td",n).eq(2).addClass("lvlHighlight")}function w(n,t){j=e("highlightPlayersNearMyLvl"),C=$("#fshInv",n).DataTable(function(n){return{columns:[{title:"Guild",class:"dt-center",orderable:!1},{title:"Name",class:"dt-center"},{title:"Level",class:"dt-center"},{title:"Page/Index",class:"dt-center"}],createdRow:I,data:n,deferRender:!0,lengthMenu:[[30,60,-1],[30,60,"All"]],order:[3,"desc"],pageLength:30,stateDuration:0,stateSave:!0}}(t))}function O(){C.draw()}function k(n){"fshMinLvl"!==n.target.id&&"fshMaxLvl"!==n.target.id||O()}function q(n,t){return parseInt($(n,t).val(),10)}function N(n,t){h(t)||i(n,t)}function T(n,t,e){const a=q("#fshMinLvl",n),s=q("#fshMaxLvl",n)
N("onlinePlayerMinLvl",a),N("onlinePlayerMaxLvl",s)
const i=l(p(e[2]),0)
return y(M,i,a,s)}let _,D,H,z
function G(a){D=a||{},function(n){$.fn.dataTable.ext.search.push(t(T,n)),$("#fshOutput",n).html(`<div align=right>Min lvl:<input value="${e("onlinePlayerMinLvl")}" size=5 id="fshMinLvl" /> Max lvl:<input value="${e("onlinePlayerMaxLvl")}" size=5 id="fshMaxLvl" /> <input id="fshReset" type="button" value="Reset"/></div><table id="fshInv" class="allow stripe hover"></table>`)}(_),w(_,function(e){return n(e).map(t(P,e))}(D))}function S(n,t,e){const a=$("td",$(e)),s=a.eq(1).text();(function(n,t){return D[n]&&D[n][3]>t})(s,n)||(D[s]=function(n,t,e){return[e.eq(0).html(),e.eq(1).html(),e.eq(2).text(),n,t]}(n,t,a))}function V(n,t){z=function(n){return parseInt(n.parent().text().match(/(\d+)/g)[0],10)}(t)
for(let t=2;t<=z;t+=1)x(t).then(n)}function A(n){$("#fshOutput",_).append(n)}function W(n){A(" "+(H+1))
const e=c(n),a=$("#pCC input.custominput",e).first()
!function(n,e){const a=e.attr("value")
$('#pCC img[src$="/world/icon_action_view.png',n).parent().parent().parent().each(t(S,a))}(e,a),H+=1,1===H&&V(W,a),H===z&&(b("fsh_onlinePlayers",D),G(D))}function Z(n){"fshRefresh"===n.target.id&&($("#fshRefresh",_).hide(),H=0,D={},x(1).then(W),i("lastOnlineCheck",s),A("Parsing online players...")),"fshReset"===n.target.id&&function(n){i("onlinePlayerMinLvl",r.onlinePlayerMinLvl),i("onlinePlayerMaxLvl",r.onlinePlayerMaxLvl),$("#fshMinLvl",n).val(r.onlinePlayerMinLvl),$("#fshMaxLvl",n).val(r.onlinePlayerMaxLvl),O()}(_)}function B(){_.html(`<span><b>Online Players</b></span>${function(){const n=e("lastOnlineCheck")
return s-n>3e5?'<span> (takes a while to refresh so only do it if you really need to) </span><span id="fshRefresh" class="fshLink">[Refresh]</span>':`<span>[ Wait ${Math.round(300-(s-n)/1e3)}s ]</span>`}()}<div id="fshOutput"></div>`),g("fsh_onlinePlayers").then(G),f(_[0],Z),u(_[0],"keyup",k)}function E(n){o()||(_=n?$(n):$("#pCC"),L().then(B))}export default E
//# sourceMappingURL=injectOnlinePlayers-9d718ec4.js.map
