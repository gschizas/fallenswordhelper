import{l as t,i as e,g as r,a4 as n,M as s,t as a,K as o,B as c}from"./calfSystem-a2862afc.js"
import"./closest-75b5e3c5.js"
import{i as l}from"./insertHtmlBeforeBegin-484417d0.js"
import{c as i}from"./closestTable-89a74d0f.js"
function f(t,e,r){const n=o(e.cells[0]).replace(":","")
return n?(t[n]={ind:r},function(t){return t.cells[1]&&c(t.cells[1])}(e)&&(t[n].value=Number(o(e.cells[1]).replace("+",""))),t):t}function u(t,e,r){return e+((s=t)[n=r]&&s[n].value?s[n].value:0)
var n,s}function m(t){const e=i(t),r=s(e.rows).reduce(f,{}),n=function(t){return["Attack","Defense","Armor","Damage","HP"].reduce(a(u,t),0)}(r)
var o,c
l((c=e,(o=r).Enhancements?c.rows[o.Enhancements.ind-1]:c.rows[c.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(s){const a=t()
return e(a,s),r("font",a).filter(n("Bonuses")).forEach(m),a.innerHTML}function h(t){t.url.startsWith("fetchitem")&&(t.dataFilter=d)}export default function(){$.ajaxPrefilter(h)}
//# sourceMappingURL=addStatTotalToMouseover-34d939c2.js.map
