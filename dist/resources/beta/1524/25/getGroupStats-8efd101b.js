import{h as t,o as a,U as o,aP as r,ax as s,v as n}from"./calfSystem-d3aab5a8.js"
import{o as e}from"./openQuickBuffByName-f588663a.js"
import{c as f}from"./createUl-18e14c72.js"
import{c}from"./createButton-96063297.js"
import{c as u}from"./createLi-d31a7b70.js"
import{c as i}from"./chunk-a1c62f77.js"
import{g as m}from"./groupViewStats-9ea9390c.js"
function p(r,s){const n=u(),f=c({className:"fshBl fshBls",textContent:r})
return a(f,t=>{t.target.blur(),e(s),o("doBuffLinks",r)}),t(n,f),n}function j(a,o,s){return t(a,p(`Buff ${r[s]} 16`,o.join(","))),a}function l(a){const o=i(16,a),r=f()
return o.length>1&&t(r,p("Buff All",a.join(","))),o.reduce(j,r)}function B(t){const a=n(t)
return m(a)}function h(t){return s(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-8efd101b.js.map
