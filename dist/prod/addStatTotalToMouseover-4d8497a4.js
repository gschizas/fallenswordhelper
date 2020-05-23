import{l as t,i as e,g as r,bl as n,aH as a,v as s,bi as c,D as o}from"./calfSystem-4f7c0235.js"
import{c as l}from"./closestTable-3222a25a.js"
import{i}from"./insertHtmlBeforeBegin-2122cda1.js"
function u(t,e,r){const n=c(e.cells[0]).replace(":","")
return n?(t[n]={ind:r},function(t){return t.cells[1]&&o(t.cells[1])}(e)&&(t[n].value=Number(c(e.cells[1]).replace("+",""))),t):t}function f(t,e,r){return e+((a=t)[n=r]&&a[n].value?a[n].value:0)
var n,a}function m(t){const e=l(t),r=a(e.rows).reduce(u,{}),n=function(t){return["Attack","Defense","Armor","Damage","HP"].reduce(s(f,t),0)}(r)
var c,o
i((o=e,(c=r).Enhancements?o.rows[c.Enhancements.ind-1]:o.rows[o.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(a){const s=t()
return e(s,a),r("font",s).filter(n("Bonuses")).forEach(m),s.innerHTML}function h(t){t.url.startsWith("fetchitem")&&(t.dataFilter=d)}function g(){$.ajaxPrefilter(h)}export{g as a}
//# sourceMappingURL=addStatTotalToMouseover-4d8497a4.js.map
