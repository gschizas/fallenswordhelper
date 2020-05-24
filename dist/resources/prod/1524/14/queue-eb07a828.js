import{by as n,u as t}from"./calfSystem-d587d232.js"
import{e,a as r,u}from"./useItem-00e6e986.js"
import{d as o}from"./dialog-f9fad105.js"
import{a as i}from"./ajaxReturnCode-b9bc06f8.js"
import{g as c}from"./guildInventory-bbccbfe0.js"
function s(n){return n}function a(n,e,r){return n(e).then(t(s,r))}function f(n,t,e){return function(n,t,e){return c({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const o=e.items[e.items.length-1].a
return"wear"===n?a(r,o,t):"use"===n?a(u,o,t):void 0}function d(e,r){return 0===r.r&&"recall"!==e?n({cmd:"profile",subcmd:"fetchinv"}).then(t(m,e,r)):r}function l(n,r,u,o){return function(n,t,e){return f(n,t,e).then(i)}(n,r,u).then(e).then(t(d,o))}function b(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?a(r,t.b,t):"use"===n?a(u,t.b,t):void 0}(n,t):t}function h(e,r){return function(t){return n({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:t,ajax:1}).then(o)}(e).then(t(b,r))}let p
function j(){return p||(p=Promise.resolve()),p}function g(n,e){return p=j().then(t(h,n,e)),p}function v(n,e,r,u){return p=j().then(t(l,n,e,r,u)),p}export{v as a,g as q}
//# sourceMappingURL=queue-eb07a828.js.map
