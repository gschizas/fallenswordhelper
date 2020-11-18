import{h as t,o,U as r,aO as s,ax as a,v as e}from"./calfSystem-57628ebe.js"
import{o as n}from"./openQuickBuffByName-4b21bd39.js"
import{c}from"./createUl-5c3ef6d6.js"
import{c as f}from"./createButton-7f32ccb6.js"
import{c as u}from"./createLi-41b6c14a.js"
import{c as i}from"./chunk-a86d7cea.js"
import{g as m}from"./groupViewStats-136c7484.js"
function p(s,a){const e=u(),c=f({className:"fshBl fshBls",textContent:s})
return o(c,t=>{t.target.blur(),n(a),r("doBuffLinks",s)}),t(e,c),e}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=c()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=e(t)
return m(o)}function b(t){return a(t).then(B)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-cc812e13.js.map
