import{bz as n,v as t}from"./calfSystem-4b4fbec4.js"
import{e,a as r,u}from"./useItem-c33570bd.js"
import{d as o}from"./dialog-00707b06.js"
import{a as i}from"./ajaxReturnCode-ca9b4e78.js"
import{g as a}from"./guildInventory-6fa87940.js"
function c(n){return n}function s(n,e,r){return n(e).then(t(c,r))}function f(n,t,e){return function(n,t,e){return a({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const o=e.items[e.items.length-1].a
return"wear"===n?s(r,o,t):"use"===n?s(u,o,t):void 0}function d(e,r){return 0===r.r&&"recall"!==e?n({cmd:"profile",subcmd:"fetchinv"}).then(t(m,e,r)):r}function l(n,r,u,o){return function(n,t,e){return f(n,t,e).then(i)}(n,r,u).then(e).then(t(d,o))}function b(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?s(r,t.b,t):"use"===n?s(u,t.b,t):void 0}(n,t):t}function h(e,r){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(o)}(e).then(t(b,r))}let p
function j(){return p||(p=Promise.resolve()),p}function v(n,e){return p=j().then(t(h,n,e)),p}function g(n,e,r,u){return p=j().then(t(l,n,e,r,u)),p}export{g as a,v as q}
//# sourceMappingURL=queue-b10e9691.js.map
