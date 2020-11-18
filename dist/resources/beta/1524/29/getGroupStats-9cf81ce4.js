import{h as t,o,U as r,aO as s,ax as a,v as e}from"./calfSystem-f9a27018.js"
import{o as n}from"./openQuickBuffByName-77bb54c1.js"
import{c as f}from"./createUl-2a797db3.js"
import{c}from"./createButton-a301619e.js"
import{c as u}from"./createLi-543957e6.js"
import{c as i}from"./chunk-a86d7cea.js"
import{g as m}from"./groupViewStats-e79ccf6f.js"
function p(s,a){const e=u(),f=c({className:"fshBl fshBls",textContent:s})
return o(f,t=>{t.target.blur(),n(a),r("doBuffLinks",s)}),t(e,f),e}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=f()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=e(t)
return m(o)}function h(t){return a(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-9cf81ce4.js.map
