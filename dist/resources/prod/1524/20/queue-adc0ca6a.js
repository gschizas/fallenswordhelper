import{t as n}from"./calfSystem-03970067.js"
import{a as t}from"./ajaxReturnCode-f8cf1a95.js"
import{d as r}from"./dialog-d5dff1df.js"
import{i as e}from"./indexAjaxJson-d04ad897.js"
import{e as o}from"./errorDialog-2397605e.js"
import{e as u,u as i}from"./useItem-79767d67.js"
import{g as f}from"./guildInventory-4fd2dbfe.js"
function s(n){return n}function a(t,r,e){return t(r).then(n(s,e))}function c(n,t,r){return function(n,t,r){return f({subcmd2:"recall",id:n,player_id:t,mode:r})}(n,t,r)}function d(n,t,r){const e=r.items[r.items.length-1].a
return"wear"===n?a(u,e,t):"use"===n?a(i,e,t):void 0}function m(t,r){return 0===r.r&&"recall"!==t?e({cmd:"profile",subcmd:"fetchinv"}).then(n(d,t,r)):r}function l(r,e,u,i){return function(n,r,e){return c(n,r,e).then(t)}(r,e,u).then(o).then(n(m,i))}function h(n,t){return 0===t.r&&"take"!==n?function(n,t){return"wear"===n?a(u,t.b,t):"use"===n?a(i,t.b,t):void 0}(n,t):t}function j(t,o){return function(n){return e({cmd:"guild",subcmd:"inventory",subcmd2:"takeitem",guildstore_id:n,ajax:1}).then(r)}(t).then(n(h,o))}let p
function b(){return p||(p=Promise.resolve()),p}function g(t,r){return p=b().then(n(j,t,r)),p}function v(t,r,e,o){return p=b().then(n(l,t,r,e,o)),p}export{v as a,g as q}
//# sourceMappingURL=queue-adc0ca6a.js.map
