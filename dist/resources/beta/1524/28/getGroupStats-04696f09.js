import{h as t,o,U as r,aO as s,ax as a,v as n}from"./calfSystem-964f4fc9.js"
import{o as c}from"./openQuickBuffByName-6421c857.js"
import{c as e}from"./createUl-ad078013.js"
import{c as f}from"./createButton-342296b6.js"
import{c as u}from"./createLi-8aac306c.js"
import{c as i}from"./chunk-07c9710c.js"
import{g as m}from"./groupViewStats-c14e9448.js"
function p(s,a){const n=u(),e=f({className:"fshBl fshBls",textContent:s})
return o(e,t=>{t.target.blur(),c(a),r("doBuffLinks",s)}),t(n,e),n}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=e()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=n(t)
return m(o)}function h(t){return a(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-04696f09.js.map
