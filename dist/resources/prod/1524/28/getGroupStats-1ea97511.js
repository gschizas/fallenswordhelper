import{h as t,o,U as r,aO as s,ax as a,v as n}from"./calfSystem-a5da5210.js"
import{o as e}from"./openQuickBuffByName-08b8519d.js"
import{c as f}from"./createUl-1742cb9f.js"
import{c}from"./createButton-219c3a0e.js"
import{c as u}from"./createLi-687fb316.js"
import{c as i}from"./chunk-07c9710c.js"
import{g as m}from"./groupViewStats-339bbdd1.js"
function p(s,a){const n=u(),f=c({className:"fshBl fshBls",textContent:s})
return o(f,t=>{t.target.blur(),e(a),r("doBuffLinks",s)}),t(n,f),n}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=f()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=n(t)
return m(o)}function d(t){return a(t).then(B)}export{l as d,d as g}
//# sourceMappingURL=getGroupStats-1ea97511.js.map
