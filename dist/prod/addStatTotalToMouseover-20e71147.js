import{l as e,i as t,g as r,bl as n,aH as s,v as a,bi as c,D as o}from"./calfSystem-4b4fbec4.js"
import{c as l}from"./closestTable-6a2d8591.js"
import{i}from"./insertHtmlBeforeBegin-bb56c349.js"
function u(e,t,r){const n=c(t.cells[0]).replace(":","")
return n?(e[n]={ind:r},function(e){return e.cells[1]&&o(e.cells[1])}(t)&&(e[n].value=Number(c(t.cells[1]).replace("+",""))),e):e}function f(e,t,r){return t+((s=e)[n=r]&&s[n].value?s[n].value:0)
var n,s}function m(e){const t=l(e),r=s(t.rows).reduce(u,{}),n=function(e){return["Attack","Defense","Armor","Damage","HP"].reduce(a(f,e),0)}(r)
var c,o
i((o=t,(c=r).Enhancements?o.rows[c.Enhancements.ind-1]:o.rows[o.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(s){const a=e()
return t(a,s),r("font",a).filter(n("Bonuses")).forEach(m),a.innerHTML}function b(e){e.url.startsWith("fetchitem")&&(e.dataFilter=d)}function h(){$.ajaxPrefilter(b)}export{h as a}
//# sourceMappingURL=addStatTotalToMouseover-20e71147.js.map
