import{aa as t,a$ as s,o as a,v as o,ar as r,h as e,b0 as n,a_ as f,x as c}from"./calfSystem-fb94ddf0.js"
import{c as u}from"./createUl-65b855dd.js"
import{c as i}from"./createButton-9e7c1e0f.js"
import{g as m}from"./groupViewStats-28e77f71.js"
function d(s,a,o){const r=Math.floor(o/16)
return s[r]=t(s[r],[]),s[r].push(a),s}function p(t,f,c){const u=f.join(","),m=n[c],d=s(),p=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(p,o(r,u)),e(d,p),e(t,d),t}function l(t){return t.reduce(d,[]).reduce(p,u())}function h(t){const s=c(t)
return m(s)}function j(t){return f(t).then(h)}export{l as d,j as g}
//# sourceMappingURL=getGroupStats-e66e6538.js.map
