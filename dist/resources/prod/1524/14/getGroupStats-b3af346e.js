import{a9 as t,a_ as s,o as a,u as o,aq as f,f as n,a$ as r,aZ as e,w as c}from"./calfSystem-d587d232.js"
import{c as u}from"./createUl-8fcf56ef.js"
import{c as i}from"./createButton-04c4f16f.js"
import{g as m}from"./groupViewStats-e7b3f27d.js"
function p(s,a,o){const f=Math.floor(o/16)
return s[f]=t(s[f],[]),s[f].push(a),s}function d(t,e,c){const u=e.join(","),m=r[c],p=s(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,o(f,u)),n(p,d),n(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function h(t){const s=c(t)
return m(s)}function j(t){return e(t).then(h)}export{l as d,j as g}
//# sourceMappingURL=getGroupStats-b3af346e.js.map
