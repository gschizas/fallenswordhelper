import{aa as t,a$ as s,o as a,v as o,ar as r,h as n,b0 as e,a_ as f,x as c}from"./calfSystem-d06402b1.js"
import{c as u}from"./createUl-d5ab4946.js"
import{c as i}from"./createButton-b794b03c.js"
import{g as m}from"./groupViewStats-fef195b2.js"
function p(s,a,o){const r=Math.floor(o/16)
return s[r]=t(s[r],[]),s[r].push(a),s}function d(t,f,c){const u=f.join(","),m=e[c],p=s(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,o(r,u)),n(p,d),n(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function b(t){const s=c(t)
return m(s)}function h(t){return f(t).then(b)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-c0d4586e.js.map
