import{t,c as n,aS as e,a4 as r,aT as s}from"./calfSystem-d04e4be4.js"
import{c as u}from"./currentGuildId-9ae9b1fe.js"
import{g as o,s as i}from"./idb-0492f5ed.js"
import{c as m}from"./cmdExport-9eb7477e.js"
function c(t,n){const e=n||{}
i("fsh_membrList",$.extend(e,t))}function a(n){return o("fsh_membrList").then(t(c,n)),n}function f(t,n){const s=e(n.map(t=>[t.username,t]))
return{[t]:{lastUpdate:r,...s}}}function d(n){return function(t){return m({guild_id:t,subcmd:"guild_members"})}(n).then(t(f,n))}function b(t){return d(t).then(a)}const p=[(t,n)=>n,(t,n)=>s(n),(t,n)=>s(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>r-3e5]
function h(t,n,e){return e(t,n)}function l(n,e){return function(n,e){return p.every(t(h,n,e))}(n,e)?e:b(n)}function g(t,e){return n.membrList=e[t],n.membrList}function j(n){const e=u()
return e?function(n,e){return n?b(e):o("fsh_membrList").then(t(l,e))}(n,e).then(t(g,e)):Promise.reject(new Error("no guild id"))}export{j as g}
//# sourceMappingURL=getMembrList-2684ae4e.js.map
