import{l as e,i as t,g as r,b1 as n,M as s,t as a,K as o,B as c}from"./calfSystem-05554bae.js"
import"./closest-a50421eb.js"
import{i as l}from"./insertHtmlBeforeBegin-ee91a388.js"
import{c as i}from"./closestTable-607ac1a3.js"
function u(e,t,r){const n=o(t.cells[0]).replace(":","")
return n?(e[n]={ind:r},function(e){return e.cells[1]&&c(e.cells[1])}(t)&&(e[n].value=Number(o(t.cells[1]).replace("+",""))),e):e}function f(e,t,r){return t+((s=e)[n=r]&&s[n].value?s[n].value:0)
var n,s}function m(e){const t=i(e),r=s(t.rows).reduce(u,{}),n=function(e){return["Attack","Defense","Armor","Damage","HP"].reduce(a(f,e),0)}(r)
var o,c
l((c=t,(o=r).Enhancements?c.rows[o.Enhancements.ind-1]:c.rows[c.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(s){const a=e()
return t(a,s),r("font",a).filter(n("Bonuses")).forEach(m),a.innerHTML}function h(e){e.url.startsWith("fetchitem")&&(e.dataFilter=d)}export default function(){$.ajaxPrefilter(h)}
//# sourceMappingURL=addStatTotalToMouseover-593a69c0.js.map
