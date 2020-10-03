import{h as t,o,U as r,aP as s,ax as a,v as f}from"./calfSystem-a5fc99d4.js"
import{o as e}from"./openQuickBuffByName-58a2f3ec.js"
import{c as n}from"./createUl-f5b6cede.js"
import{c}from"./createButton-5993a089.js"
import{c as u}from"./createLi-a116a945.js"
import{c as i}from"./chunk-5f9a7027.js"
import{g as m}from"./groupViewStats-e7f47cf7.js"
function p(s,a){const f=u(),n=c({className:"fshBl fshBls",textContent:s})
return o(n,t=>{t.target.blur(),e(a),r("doBuffLinks",s)}),t(f,n),f}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=n()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=f(t)
return m(o)}function h(t){return a(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-be6b0476.js.map
