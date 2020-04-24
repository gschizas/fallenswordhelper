import{G as s,g as e,p as a,b6 as n,bt as o,aK as r,D as i,C as t,ad as c}from"./calfSystem-9b1fa4ca.js"
import{d as l}from"./dataRows-fb2431de.js"
import{s as f}from"./searchPlayerHref-8e5739b5.js"
function d(s){return s?Number(s[1]):0}function p(s){s.className=""}function m(s){(function(s){const e=s.cells[2].innerHTML,a=/member\s<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),n=/<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),r=d(n),i=d(a)
return n&&r!==o()&&i!==o()})(s)&&(r(s.cells).forEach(p),s.classList.add("fshGrey"),s.classList.add("fshXSmall"))}function u(s,e){const a=s.cells[2].innerHTML.split("'"),n=a[1]
a[1]=f(n),t(a.join("'"),s.cells[2]),function(s,e,a){e||a===c()||($(s).find("td").removeClass("row").css("font-size","xx-small"),s.style.color="gray")}(s,e,n)}function h(s){m(s),function(s){const e=i(s.cells[2]),a=e.includes("has invited the player");("'"===e.charAt(0)||a)&&u(s,a)}(s)}function b(){const s=e("td",a).find(n("Message"))
if(!s)return
const o=s.parentNode.parentNode.parentNode
s.innerHTML+='&nbsp;&nbsp;<span class="fshWhite">(Guild Log messages not involving self are dimmed!)</span>',l(o.rows,3,0).forEach(h)}function y(){s("hideNonPlayerGuildLogMessages")&&b()}export{y as a}
//# sourceMappingURL=addGuildLogWidgets-6bdb7f8b.js.map
