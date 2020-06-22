import{m as e,i as t,g as r,b1 as n,M as s,t as a,K as o,B as c}from"./calfSystem-1b876afa.js"
import"./closest-f51e0443.js"
import{c as l}from"./closestTable-e4ca5f26.js"
import{i}from"./insertHtmlBeforeBegin-9799e9af.js"
function f(e,t,r){const n=o(t.cells[0]).replace(":","")
return n?(e[n]={ind:r},function(e){return e.cells[1]&&c(e.cells[1])}(t)&&(e[n].value=Number(o(t.cells[1]).replace("+",""))),e):e}function u(e,t,r){return t+((s=e)[n=r]&&s[n].value?s[n].value:0)
var n,s}function m(e){const t=l(e),r=s(t.rows).reduce(f,{}),n=function(e){return["Attack","Defense","Armor","Damage","HP"].reduce(a(u,e),0)}(r)
var o,c
i((c=t,(o=r).Enhancements?c.rows[o.Enhancements.ind-1]:c.rows[c.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(s){const a=e()
return t(a,s),r("font",a).filter(n("Bonuses")).forEach(m),a.innerHTML}function h(e){e.url.startsWith("fetchitem")&&(e.dataFilter=d)}export default function(){$.ajaxPrefilter(h)}
//# sourceMappingURL=addStatTotalToMouseover-75b28d6c.js.map
