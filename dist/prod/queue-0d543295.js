import{bz as n,v as t}from"./calfSystem-3956a623.js"
import{e,a as r,u}from"./useItem-7811c104.js"
import{d as o}from"./dialog-a6efa002.js"
import{a as i}from"./ajaxReturnCode-69077631.js"
import{g as a}from"./guildInventory-35daacf8.js"
function s(n){return n}function c(n,e,r){return n(e).then(t(s,r))}function f(n,t,e){return function(n,t,e){return a({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const o=e.items[e.items.length-1].a
return"wear"===n?c(r,o,t):"use"===n?c(u,o,t):void 0}function d(e,r){return 0===r.r&&"recall"!==e?n({cmd:"profile",subcmd:"fetchinv"}).then(t(m,e,r)):r}function l(n,r,u,o){return function(n,t,e){return f(n,t,e).then(i)}(n,r,u).then(e).then(t(d,o))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(r,t.b,t):"use"===n?c(u,t.b,t):void 0}(n,t):t}function p(e,r){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(o)}(e).then(t(h,r))}let b
function j(){return b||(b=Promise.resolve()),b}function v(n,e){return b=j().then(t(p,n,e)),b}function g(n,e,r,u){return b=j().then(t(l,n,e,r,u)),b}export{g as a,v as q}
//# sourceMappingURL=queue-0d543295.js.map
