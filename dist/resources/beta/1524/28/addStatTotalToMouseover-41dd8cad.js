import{m as t,i as e,g as r,b0 as n,M as s,t as a,G as c,B as o}from"./calfSystem-964f4fc9.js"
import"./closest-9ef1a6fc.js"
import{c as l}from"./closestTable-8e45507b.js"
import{i as f}from"./insertHtmlBeforeBegin-f108ca1f.js"
function i(t,e,r){const n=c(e.cells[0]).replace(":","")
return n?(t[n]={ind:r},function(t){return t.cells[1]&&o(t.cells[1])}(e)&&(t[n].value=Number(c(e.cells[1]).replace("+",""))),t):t}function u(t,e,r){return e+((s=t)[n=r]&&s[n].value?s[n].value:0)
var n,s}function m(t){const e=l(t),r=s(e.rows).reduce(i,{}),n=function(t){return["Attack","Defense","Armor","Damage","HP"].reduce(a(u,t),0)}(r)
var c,o
f((o=e,(c=r).Enhancements?o.rows[c.Enhancements.ind-1]:o.rows[o.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(s){const a=t()
return e(a,s),r("font",a).filter(n("Bonuses")).forEach(m),a.innerHTML}function h(t){t.url.startsWith("fetchitem")&&(t.dataFilter=d)}function p(){$.ajaxPrefilter(h)}export default p
//# sourceMappingURL=addStatTotalToMouseover-41dd8cad.js.map
