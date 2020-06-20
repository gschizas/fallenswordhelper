import{m as e,i as t,g as r,a4 as n,M as s,t as a,K as c,B as o}from"./calfSystem-9c7241dc.js"
import"./closest-eb66b280.js"
import{c as l}from"./closestTable-98acc63e.js"
import{i}from"./insertHtmlBeforeBegin-d8eaadbd.js"
function u(e,t,r){const n=c(t.cells[0]).replace(":","")
return n?(e[n]={ind:r},function(e){return e.cells[1]&&o(e.cells[1])}(t)&&(e[n].value=Number(c(t.cells[1]).replace("+",""))),e):e}function f(e,t,r){return t+((s=e)[n=r]&&s[n].value?s[n].value:0)
var n,s}function m(e){const t=l(e),r=s(t.rows).reduce(u,{}),n=function(e){return["Attack","Defense","Armor","Damage","HP"].reduce(a(f,e),0)}(r)
var c,o
i((o=t,(c=r).Enhancements?o.rows[c.Enhancements.ind-1]:o.rows[o.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(s){const a=e()
return t(a,s),r("font",a).filter(n("Bonuses")).forEach(m),a.innerHTML}function h(e){e.url.startsWith("fetchitem")&&(e.dataFilter=d)}export default function(){$.ajaxPrefilter(h)}
//# sourceMappingURL=addStatTotalToMouseover-d3c02241.js.map
