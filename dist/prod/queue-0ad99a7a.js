import{bz as n,v as t}from"./calfSystem-cb871cc0.js"
import{e,a as r,u}from"./useItem-06188f52.js"
import{d as o}from"./dialog-4937b929.js"
import{a as i}from"./ajaxReturnCode-6aee5610.js"
import{g as c}from"./guildInventory-396279c0.js"
function s(n){return n}function a(n,e,r){return n(e).then(t(s,r))}function f(n,t,e){return function(n,t,e){return c({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const o=e.items[e.items.length-1].a
return"wear"===n?a(r,o,t):"use"===n?a(u,o,t):void 0}function d(e,r){return 0===r.r&&"recall"!==e?n({cmd:"profile",subcmd:"fetchinv"}).then(t(m,e,r)):r}function l(n,r,u,o){return function(n,t,e){return f(n,t,e).then(i)}(n,r,u).then(e).then(t(d,o))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?a(r,t.b,t):"use"===n?a(u,t.b,t):void 0}(n,t):t}function b(e,r){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(o)}(e).then(t(h,r))}let p
function j(){return p||(p=Promise.resolve()),p}function v(n,e){return p=j().then(t(b,n,e)),p}function g(n,e,r,u){return p=j().then(t(l,n,e,r,u)),p}export{g as a,v as q}
//# sourceMappingURL=queue-0ad99a7a.js.map
