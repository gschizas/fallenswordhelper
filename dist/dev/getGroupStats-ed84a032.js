import{ab as t,b0 as s,o as a,v as o,au as e,h as n,b1 as r,a$ as f,x as u}from"./calfSystem-70b0df7f.js"
import{c}from"./createUl-64948536.js"
import{c as i}from"./createButton-e6779a69.js"
import{g as m}from"./groupViewStats-62ee3e4b.js"
function p(s,a,o){const e=Math.floor(o/16)
return s[e]=t(s[e],[]),s[e].push(a),s}function l(t,f,u){const c=f.join(","),m=r[u],p=s(),l=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(l,o(e,c)),n(p,l),n(t,p),t}function d(t){return t.reduce(p,[]).reduce(l,c())}function b(t){const s=u(t)
return m(s)}function h(t){return f(t).then(b)}export{d,h as g}
//# sourceMappingURL=getGroupStats-ed84a032.js.map
