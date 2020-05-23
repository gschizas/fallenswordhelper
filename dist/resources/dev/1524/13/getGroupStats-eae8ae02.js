import{ab as t,b0 as s,o as a,v as o,au as n,h as r,b1 as e,a$ as c,x as f}from"./calfSystem-01eb06ed.js"
import{c as u}from"./createUl-c1a39af0.js"
import{c as i}from"./createButton-33c18cfd.js"
import{g as m}from"./groupViewStats-118f3795.js"
function p(s,a,o){const n=Math.floor(o/16)
return s[n]=t(s[n],[]),s[n].push(a),s}function d(t,c,f){const u=c.join(","),m=e[f],p=s(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,o(n,u)),r(p,d),r(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function h(t){const s=f(t)
return m(s)}function b(t){return c(t).then(h)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-eae8ae02.js.map
