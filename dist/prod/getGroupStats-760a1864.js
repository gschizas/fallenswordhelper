import{aa as t,a$ as s,o as a,v as o,ar as r,h as n,b0 as e,a_ as c,x as f}from"./calfSystem-cb871cc0.js"
import{c as u}from"./createUl-7522713d.js"
import{c as i}from"./createButton-6f584fe4.js"
import{g as m}from"./groupViewStats-b5a72545.js"
function p(s,a,o){const r=Math.floor(o/16)
return s[r]=t(s[r],[]),s[r].push(a),s}function l(t,c,f){const u=c.join(","),m=e[f],p=s(),l=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(l,o(r,u)),n(p,l),n(t,p),t}function d(t){return t.reduce(p,[]).reduce(l,u())}function h(t){const s=f(t)
return m(s)}function j(t){return c(t).then(h)}export{d,j as g}
//# sourceMappingURL=getGroupStats-760a1864.js.map
