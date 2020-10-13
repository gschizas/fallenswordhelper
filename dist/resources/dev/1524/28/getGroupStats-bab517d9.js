import{h as t,o,V as r,aQ as s,aB as a,v as n}from"./calfSystem-b136673a.js"
import{o as e}from"./openQuickBuffByName-1b8ea02b.js"
import{c as f}from"./createUl-cedddfb2.js"
import{c}from"./createButton-f2fbc414.js"
import{c as u}from"./createLi-e3c856b3.js"
import{c as i}from"./chunk-07c9710c.js"
import{g as m}from"./groupViewStats-f032a99d.js"
function p(s,a){const n=u(),f=c({className:"fshBl fshBls",textContent:s})
return o(f,t=>{t.target.blur(),e(a),r("doBuffLinks",s)}),t(n,f),n}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=f()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=n(t)
return m(o)}function b(t){return a(t).then(B)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-bab517d9.js.map
