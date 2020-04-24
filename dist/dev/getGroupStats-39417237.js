import{ab as t,b0 as s,o as a,v as o,au as n,h as r,b1 as e,a$ as c,x as u}from"./calfSystem-94018cd0.js"
import{c as f}from"./createUl-64d10195.js"
import{c as i}from"./createButton-080d3bb7.js"
import{g as m}from"./groupViewStats-e145c660.js"
function p(s,a,o){const n=Math.floor(o/16)
return s[n]=t(s[n],[]),s[n].push(a),s}function d(t,c,u){const f=c.join(","),m=e[u],p=s(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,o(n,f)),r(p,d),r(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,f())}function b(t){const s=u(t)
return m(s)}function h(t){return c(t).then(b)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-39417237.js.map
