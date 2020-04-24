import{aa as t,a$ as s,o as a,v as o,ar as r,h as e,b0 as n,a_ as f,x as c}from"./calfSystem-3956a623.js"
import{c as u}from"./createUl-f72477f7.js"
import{c as i}from"./createButton-eb3647ed.js"
import{g as m}from"./groupViewStats-68eb99b1.js"
function p(s,a,o){const r=Math.floor(o/16)
return s[r]=t(s[r],[]),s[r].push(a),s}function l(t,f,c){const u=f.join(","),m=n[c],p=s(),l=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(l,o(r,u)),e(p,l),e(t,p),t}function d(t){return t.reduce(p,[]).reduce(l,u())}function h(t){const s=c(t)
return m(s)}function b(t){return f(t).then(h)}export{d,b as g}
//# sourceMappingURL=getGroupStats-9e863e0f.js.map
