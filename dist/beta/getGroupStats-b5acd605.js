import{aa as t,a$ as s,o as a,v as o,ar as r,h as n,b0 as e,a_ as c,x as f}from"./calfSystem-70c0e373.js"
import{c as u}from"./createUl-48b7bdd1.js"
import{c as i}from"./createButton-1947cfb3.js"
import{g as m}from"./groupViewStats-1416c40b.js"
function p(s,a,o){const r=Math.floor(o/16)
return s[r]=t(s[r],[]),s[r].push(a),s}function d(t,c,f){const u=c.join(","),m=e[f],p=s(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,o(r,u)),n(p,d),n(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function b(t){const s=f(t)
return m(s)}function h(t){return c(t).then(b)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-b5acd605.js.map
