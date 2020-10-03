import{t as n}from"./calfSystem-a5fc99d4.js"
import{e as t}from"./errorDialog-4ea6fda9.js"
import{i as e}from"./indexAjaxJson-a651394e.js"
import{d as r}from"./dialog-e2d24ff9.js"
import{a as o,e as u,u as i}from"./useItem-4c56a939.js"
import{g as a}from"./guildInventory-e4725455.js"
function s(n){return n}function c(t,e,r){return t(e).then(n(s,r))}function f(n,t,e){return function(n,t,e){return a({subcmd2:"recall",id:n,player_id:t,mode:e})}(n,t,e)}function m(n,t,e){const r=e.items[e.items.length-1].a
return"wear"===n?c(u,r,t):"use"===n?c(i,r,t):void 0}function d(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(m,t,r)):r}function l(e,r,u,i){return function(n,t,e){return f(n,t,e).then(o)}(e,r,u).then(t).then(n(d,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?c(u,t.b,t):"use"===n?c(i,t.b,t):void 0}(n,t):t}function p(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(h,o))}let j
function g(){return j||(j=Promise.resolve()),j}function b(t,e){return j=g().then(n(p,t,e)),j}function v(t,e,r,o){return j=g().then(n(l,t,e,r,o)),j}export{v as a,b as q}
//# sourceMappingURL=queue-abff84d0.js.map
