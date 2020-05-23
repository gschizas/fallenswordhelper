import{aa as t,a$ as s,o as a,v as o,ar as e,h as r,b0 as n,a_ as f,x as c}from"./calfSystem-4b4fbec4.js"
import{c as u}from"./createUl-63ded7ff.js"
import{c as i}from"./createButton-6ae98290.js"
import{g as m}from"./groupViewStats-162802e1.js"
function p(s,a,o){const e=Math.floor(o/16)
return s[e]=t(s[e],[]),s[e].push(a),s}function d(t,f,c){const u=f.join(","),m=n[c],p=s(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,o(e,u)),r(p,d),r(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function h(t){const s=c(t)
return m(s)}function j(t){return f(t).then(h)}export{l as d,j as g}
//# sourceMappingURL=getGroupStats-359c2905.js.map
