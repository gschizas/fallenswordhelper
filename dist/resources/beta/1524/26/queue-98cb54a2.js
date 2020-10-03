import{t as n}from"./calfSystem-cf4d22a7.js"
import{e as t}from"./errorDialog-4ea6fda9.js"
import{i as r}from"./indexAjaxJson-451a313a.js"
import{d as e}from"./dialog-e2d24ff9.js"
import{a as o,e as u,u as i}from"./useItem-9c2612f7.js"
import{g as a}from"./guildInventory-a39bbc32.js"
function s(n){return n}function c(t,r,e){return t(r).then(n(s,e))}function f(n,t,r){return function(n,t,r){return a({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function m(n,t,r){const e=r.items[r.items.length-1].a
return"wear"===n?c(u,e,t):"use"===n?c(i,e,t):void 0}function d(t,e){return 0===e.r&&"recall"!==t?r({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,e)):e}function l(r,e,u,i){return function(n,t,r){return f(n,t,r).then(o)}(r,e,u).then(t).then(n(d,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(u,t.b,t):"use"===n?c(i,t.b,t):void 0}(n,t):t}function p(t,o){return function(n){return r({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(e)}(t).then(n(h,o))}let b
function j(){return b||(b=Promise.resolve()),b}function g(t,r){return b=j().then(n(p,t,r)),b}function v(t,r,e,o){return b=j().then(n(l,t,r,e,o)),b}export{v as a,g as q}
//# sourceMappingURL=queue-98cb54a2.js.map
