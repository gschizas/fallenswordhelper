import{m as t,i as e,g as r,as as s,M as n,t as a,G as o,B as c}from"./calfSystem-26bcf570.js"
import{c as l}from"./closestTable-fd04a72b.js"
import{i}from"./insertHtmlBeforeBegin-d7d0bf25.js"
import"./closest-331833f9.js"
function f(t,e,r){const s=o(e.cells[0]).replace(":","")
return s?(t[s]={ind:r},function(t){return t.cells[1]&&c(t.cells[1])}(e)&&(t[s].value=Number(o(e.cells[1]).replace("+",""))),t):t}function u(t,e,r){return e+((n=t)[s=r]&&n[s].value?n[s].value:0)
var s,n}function m(t){const e=l(t),r=n(e.rows).reduce(f,{}),s=function(t){return["Attack","Defense","Armor","Damage","HP"].reduce(a(u,t),0)}(r)
var o,c
i((c=e,(o=r).Enhancements?c.rows[o.Enhancements.ind-1]:c.rows[c.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${s}&nbsp;</td></tr>`)}function d(n){const a=t()
return e(a,n),r("font",a).filter(s("Bonuses")).forEach(m),a.innerHTML}function h(t){t.url.startsWith("fetchitem")&&(t.dataFilter=d)}function p(){$.ajaxPrefilter(h)}export default p
//# sourceMappingURL=addStatTotalToMouseover-7ca2340d.js.map
