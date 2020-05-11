import{aa as t,a$ as a,o as s,v as o,ar as r,h as n,b0 as e,a_ as f,x as c}from"./calfSystem-99da704d.js"
import{c as u}from"./createUl-84a984f8.js"
import{c as i}from"./createButton-eb608668.js"
import{g as m}from"./groupViewStats-6af39def.js"
function p(a,s,o){const r=Math.floor(o/16)
return a[r]=t(a[r],[]),a[r].push(s),a}function d(t,f,c){const u=f.join(","),m=e[c],p=a(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(r,u)),n(p,d),n(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function h(t){const a=c(t)
return m(a)}function j(t){return f(t).then(h)}export{l as d,j as g}
//# sourceMappingURL=getGroupStats-7530903e.js.map
