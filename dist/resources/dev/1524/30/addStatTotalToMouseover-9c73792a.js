import{m as e,i as t,g as r,a4 as n,M as s,t as a,G as o,B as c}from"./calfSystem-54df10e3.js"
import"./closest-3bdef2f3.js"
import{c as l}from"./closestTable-15612c09.js"
import{i}from"./insertHtmlBeforeBegin-ce4065b8.js"
function f(e,t,r){const n=o(t.cells[0]).replace(":","")
return n?(e[n]={ind:r},function(e){return e.cells[1]&&c(e.cells[1])}(t)&&(e[n].value=Number(o(t.cells[1]).replace("+",""))),e):e}function u(e,t,r){return t+((s=e)[n=r]&&s[n].value?s[n].value:0)
var n,s}function m(e){const t=l(e),r=s(t.rows).reduce(f,{}),n=function(e){return["Attack","Defense","Armor","Damage","HP"].reduce(a(u,e),0)}(r)
var o,c
i((c=t,(o=r).Enhancements?c.rows[o.Enhancements.ind-1]:c.rows[c.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(s){const a=e()
return t(a,s),r("font",a).filter(n("Bonuses")).forEach(m),a.innerHTML}function h(e){e.url.startsWith("fetchitem")&&(e.dataFilter=d)}function p(){$.ajaxPrefilter(h)}export default p
//# sourceMappingURL=addStatTotalToMouseover-9c73792a.js.map
