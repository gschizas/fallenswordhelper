import{l as e,i as t,g as r,b6 as n,aK as a,v as s,b7 as c,D as o}from"./calfSystem-9b1fa4ca.js"
import{c as l}from"./closestTable-435cb4b9.js"
import{i}from"./insertHtmlBeforeBegin-efff1a07.js"
function f(e,t,r){const n=c(t.cells[0]).replace(":","")
return n?(e[n]={ind:r},function(e){return e.cells[1]&&o(e.cells[1])}(t)&&(e[n].value=Number(c(t.cells[1]).replace("+",""))),e):e}function u(e,t,r){return t+((a=e)[n=r]&&a[n].value?a[n].value:0)
var n,a}function m(e){const t=l(e),r=a(t.rows).reduce(f,{}),n=function(e){return["Attack","Defense","Armor","Damage","HP"].reduce(s(u,e),0)}(r)
var c,o
i((o=t,(c=r).Enhancements?o.rows[c.Enhancements.ind-1]:o.rows[o.rows.length-1]),`<tr class="fshDodgerBlue"><td>Stat Total:</td><td align="right">${n}&nbsp;</td></tr>`)}function d(a){const s=e()
return t(s,a),r("font",s).filter(n("Bonuses")).forEach(m),s.innerHTML}function b(e){e.url.startsWith("fetchitem")&&(e.dataFilter=d)}function h(){$.ajaxPrefilter(b)}export{h as a}
//# sourceMappingURL=addStatTotalToMouseover-175866fd.js.map
