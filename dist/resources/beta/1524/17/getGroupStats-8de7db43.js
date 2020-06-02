import{a0 as t,o as s,s as o,f as a,aQ as r,aP as e,u as f}from"./calfSystem-02ae8657.js"
import{o as n}from"./openQuickBuffByName-0219802a.js"
import{c}from"./createUl-f843d9db.js"
import{c as u}from"./createButton-991883ef.js"
import{c as i}from"./createLi-29110707.js"
import{g as m}from"./groupViewStats-fcebd8a2.js"
function p(s,o,a){const r=Math.floor(a/16)
return s[r]=t(s[r],[]),s[r].push(o),s}function d(t,e,f){const c=e.join(","),m=r[f],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(n,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const s=f(t)
return m(s)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-8de7db43.js.map
