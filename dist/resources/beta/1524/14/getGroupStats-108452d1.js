import{a9 as t,a_ as s,o as a,u as o,aq as n,f as r,a$ as e,aZ as c,w as f}from"./calfSystem-371c414c.js"
import{c as u}from"./createUl-49043902.js"
import{c as i}from"./createButton-957980b2.js"
import{g as m}from"./groupViewStats-34247847.js"
function p(s,a,o){const n=Math.floor(o/16)
return s[n]=t(s[n],[]),s[n].push(a),s}function l(t,c,f){const u=c.join(","),m=e[f],p=s(),l=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(l,o(n,u)),r(p,l),r(t,p),t}function d(t){return t.reduce(p,[]).reduce(l,u())}function h(t){const s=f(t)
return m(s)}function j(t){return c(t).then(h)}export{d,j as g}
//# sourceMappingURL=getGroupStats-108452d1.js.map
