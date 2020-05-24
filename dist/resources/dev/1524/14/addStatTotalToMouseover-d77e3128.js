import{k as e,i as t,g as r,b5 as n,aJ as s,u as a,b6 as o,C as c}from"./calfSystem-d96a3efd.js"
import{c as l}from"./closestTable-2bbeb9ce.js"
import{i}from"./insertHtmlBeforeBegin-449d0625.js"
function u(e,t,r){const n=o(t.cells[0]).replace(":","")
return n?(e[n]={ind:r},function(e){return e.cells[1]&&c(e.cells[1])}(t)&&(e[n].value=Number(o(t.cells[1]).replace("+",""))),e):e}function f(e,t,r){return t+((s=e)[n=r]&&s[n].value?s[n].value:0)
var n,s}function m(e){const t=l(e),r=s(t.rows).reduce(u,{}),n=function(e){return["Attack","Defense","Armor","Damage","HP"].reduce(a(f,e),0)}(r)
var o,c
i((c=t,(o=r).Enhancements?c.rows[o.Enhancements.ind-1]:c.rows[c.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(s){const a=e()
return t(a,s),r("font",a).filter(n("Bonuses")).forEach(m),a.innerHTML}function b(e){e.url.startsWith("fetchitem")&&(e.dataFilter=d)}function h(){$.ajaxPrefilter(b)}export{h as a}
//# sourceMappingURL=addStatTotalToMouseover-d77e3128.js.map
