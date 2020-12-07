import{h as t,o,U as r,aO as s,ax as a,v as n}from"./calfSystem-6459f18a.js"
import{o as f}from"./openQuickBuffByName-240bf7ec.js"
import{c as e}from"./createUl-75275523.js"
import{c}from"./createButton-b54fa939.js"
import{c as u}from"./createLi-d700bab9.js"
import{c as i}from"./chunk-c85463de.js"
import{g as m}from"./groupViewStats-df79c111.js"
function p(s,a){const n=u(),e=c({className:"fshBl fshBls",textContent:s})
return o(e,t=>{t.target.blur(),f(a),r("doBuffLinks",s)}),t(n,e),n}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=e()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=n(t)
return m(o)}function d(t){return a(t).then(B)}export{l as d,d as g}
//# sourceMappingURL=getGroupStats-2456b3bd.js.map
