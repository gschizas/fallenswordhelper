import{ab as t,b0 as s,o as a,v as o,au as n,h as r,b1 as e,a$ as f,x as c}from"./calfSystem-fd021443.js"
import{c as u}from"./createUl-d213d71d.js"
import{c as i}from"./createButton-8c918db3.js"
import{g as d}from"./groupViewStats-559d39f1.js"
function m(s,a,o){const n=Math.floor(o/16)
return s[n]=t(s[n],[]),s[n].push(a),s}function p(t,f,c){const u=f.join(","),d=e[c],m=s(),p=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${d} 16`})
return a(p,o(n,u)),r(m,p),r(t,m),t}function l(t){return t.reduce(m,[]).reduce(p,u())}function h(t){const s=c(t)
return d(s)}function b(t){return f(t).then(h)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-ded251e4.js.map
