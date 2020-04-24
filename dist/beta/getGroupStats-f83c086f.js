import{aa as t,a$ as s,o as a,v as o,ar as r,h as e,b0 as n,a_ as c,x as f}from"./calfSystem-c91e004c.js"
import{c as u}from"./createUl-23cd595f.js"
import{c as i}from"./createButton-ce930ef9.js"
import{g as m}from"./groupViewStats-cb24f5a5.js"
function p(s,a,o){const r=Math.floor(o/16)
return s[r]=t(s[r],[]),s[r].push(a),s}function l(t,c,f){const u=c.join(","),m=n[f],p=s(),l=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(l,o(r,u)),e(p,l),e(t,p),t}function d(t){return t.reduce(p,[]).reduce(l,u())}function h(t){const s=f(t)
return m(s)}function j(t){return c(t).then(h)}export{d,j as g}
//# sourceMappingURL=getGroupStats-f83c086f.js.map
