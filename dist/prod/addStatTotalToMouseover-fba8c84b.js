import{l as t,i as e,g as r,bl as n,aH as s,v as a,bi as c,D as o}from"./calfSystem-cb871cc0.js"
import{c as l}from"./closestTable-f05bb6bb.js"
import{i}from"./insertHtmlBeforeBegin-4c679357.js"
function u(t,e,r){const n=c(e.cells[0]).replace(":","")
return n?(t[n]={ind:r},function(t){return t.cells[1]&&o(t.cells[1])}(e)&&(t[n].value=Number(c(e.cells[1]).replace("+",""))),t):t}function f(t,e,r){return e+((s=t)[n=r]&&s[n].value?s[n].value:0)
var n,s}function m(t){const e=l(t),r=s(e.rows).reduce(u,{}),n=function(t){return["Attack","Defense","Armor","Damage","HP"].reduce(a(f,t),0)}(r)
var c,o
i((o=e,(c=r).Enhancements?o.rows[c.Enhancements.ind-1]:o.rows[o.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function b(s){const a=t()
return e(a,s),r("font",a).filter(n("Bonuses")).forEach(m),a.innerHTML}function d(t){t.url.startsWith("fetchitem")&&(t.dataFilter=b)}function h(){$.ajaxPrefilter(d)}export{h as a}
//# sourceMappingURL=addStatTotalToMouseover-fba8c84b.js.map
