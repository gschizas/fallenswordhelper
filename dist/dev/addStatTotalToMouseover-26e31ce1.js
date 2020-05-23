import{l as e,i as t,g as r,b6 as n,aK as s,v as a,b7 as o,D as c}from"./calfSystem-70b0df7f.js"
import{c as l}from"./closestTable-64ed8d8b.js"
import{i}from"./insertHtmlBeforeBegin-24c569d6.js"
function f(e,t,r){const n=o(t.cells[0]).replace(":","")
return n?(e[n]={ind:r},function(e){return e.cells[1]&&c(e.cells[1])}(t)&&(e[n].value=Number(o(t.cells[1]).replace("+",""))),e):e}function u(e,t,r){return t+((s=e)[n=r]&&s[n].value?s[n].value:0)
var n,s}function d(e){const t=l(e),r=s(t.rows).reduce(f,{}),n=function(e){return["Attack","Defense","Armor","Damage","HP"].reduce(a(u,e),0)}(r)
var o,c
i((c=t,(o=r).Enhancements?c.rows[o.Enhancements.ind-1]:c.rows[c.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function m(s){const a=e()
return t(a,s),r("font",a).filter(n("Bonuses")).forEach(d),a.innerHTML}function h(e){e.url.startsWith("fetchitem")&&(e.dataFilter=m)}function b(){$.ajaxPrefilter(h)}export{b as a}
//# sourceMappingURL=addStatTotalToMouseover-26e31ce1.js.map
