import{bz as n,v as t}from"./calfSystem-4f7c0235.js"
import{e as r}from"./errorDialog-96f65b89.js"
import{d as e}from"./dialog-202b3453.js"
import{e as o,u}from"./useItem-df8563a7.js"
import{a as i}from"./ajaxReturnCode-0283a2cf.js"
import{g as a}from"./guildInventory-a46ae0d8.js"
function s(n){return n}function c(n,r,e){return n(r).then(t(s,e))}function f(n,t,r){return function(n,t,r){return a({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function m(n,t,r){const e=r.items[r.items.length-1].a
return"wear"===n?c(o,e,t):"use"===n?c(u,e,t):void 0}function d(r,e){return 0===e.r&&"recall"!==r?n({cmd:"profile",subcmd:"fetchinv"}).then(t(m,r,e)):e}function l(n,e,o,u){return function(n,t,r){return f(n,t,r).then(i)}(n,e,o).then(r).then(t(d,u))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(o,t.b,t):"use"===n?c(u,t.b,t):void 0}(n,t):t}function b(r,o){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(e)}(r).then(t(h,o))}let p
function j(){return p||(p=Promise.resolve()),p}function g(n,r){return p=j().then(t(b,n,r)),p}function v(n,r,e,o){return p=j().then(t(l,n,r,e,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-1dfb4fb3.js.map
