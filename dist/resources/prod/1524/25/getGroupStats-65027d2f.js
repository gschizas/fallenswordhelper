import{h as t,o,U as r,aP as s,ax as a,v as n}from"./calfSystem-71b9378d.js"
import{o as e}from"./openQuickBuffByName-3c146954.js"
import{c as f}from"./createUl-9605d03d.js"
import{c}from"./createButton-5da07973.js"
import{c as u}from"./createLi-7deaae00.js"
import{c as i}from"./chunk-a1c62f77.js"
import{g as m}from"./groupViewStats-10253c5a.js"
function p(s,a){const n=u(),f=c({className:"fshBl fshBls",textContent:s})
return o(f,t=>{t.target.blur(),e(a),r("doBuffLinks",s)}),t(n,f),n}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=f()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function d(t){const o=n(t)
return m(o)}function B(t){return a(t).then(d)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-65027d2f.js.map
