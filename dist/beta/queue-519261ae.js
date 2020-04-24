import{bB as n,v as t}from"./calfSystem-07c25a1c.js"
import{e as r,a as e,u}from"./useItem-4133d4d9.js"
import{d as o}from"./dialog-cdd815db.js"
import{a as i}from"./ajaxReturnCode-7d8a3377.js"
import{g as c}from"./guildInventory-c5217275.js"
function a(n){return n}function s(n,r,e){return n(r).then(t(a,e))}function d(n,t,r){return function(n,t,r){return c({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function f(n,t,r){const o=r.items[r.items.length-1].a
return"wear"===n?s(e,o,t):"use"===n?s(u,o,t):void 0}function m(r,e){return 0===e.r&&"recall"!==r?n({cmd:"profile",subcmd:"fetchinv"}).then(t(f,r,e)):e}function l(n,e,u,o){return function(n,t,r){return d(n,t,r).then(i)}(n,e,u).then(r).then(t(m,o))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?s(e,t.b,t):"use"===n?s(u,t.b,t):void 0}(n,t):t}function b(r,e){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(o)}(r).then(t(h,e))}let p
function j(){return p||(p=Promise.resolve()),p}function v(n,r){return p=j().then(t(b,n,r)),p}function g(n,r,e,u){return p=j().then(t(l,n,r,e,u)),p}export{g as a,v as q}
//# sourceMappingURL=queue-519261ae.js.map
