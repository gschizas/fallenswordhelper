import{bB as n,v as t}from"./calfSystem-70c0e373.js"
import{e as r}from"./errorDialog-06521700.js"
import{d as e}from"./dialog-b905c96a.js"
import{e as o,u}from"./useItem-10a66ac5.js"
import{a as i}from"./ajaxReturnCode-7fc00e1d.js"
import{g as a}from"./guildInventory-d915a6d1.js"
function c(n){return n}function s(n,r,e){return n(r).then(t(c,e))}function f(n,t,r){return function(n,t,r){return a({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function m(n,t,r){const e=r.items[r.items.length-1].a
return"wear"===n?s(o,e,t):"use"===n?s(u,e,t):void 0}function d(r,e){return 0===e.r&&"recall"!==r?n({cmd:"profile",subcmd:"fetchinv"}).then(t(m,r,e)):e}function l(n,e,o,u){return function(n,t,r){return f(n,t,r).then(i)}(n,e,o).then(r).then(t(d,u))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?s(o,t.b,t):"use"===n?s(u,t.b,t):void 0}(n,t):t}function p(r,o){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(e)}(r).then(t(h,o))}let b
function j(){return b||(b=Promise.resolve()),b}function g(n,r){return b=j().then(t(p,n,r)),b}function v(n,r,e,o){return b=j().then(t(l,n,r,e,o)),b}export{v as a,g as q}
//# sourceMappingURL=queue-8218d9f4.js.map
