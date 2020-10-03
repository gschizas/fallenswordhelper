import{H as s,g as e,p as a,b1 as n,b2 as r,M as o,B as c,A as i}from"./calfSystem-cf4d22a7.js"
import{p as t}from"./playerName-b9ef36e6.js"
import{d as l}from"./dataRows-1c64b1cb.js"
import{s as f}from"./searchPlayerHref-fece30ec.js"
function d(s){return s?Number(s[1]):0}function p(s){s.className=""}function m(s){(function(s){const e=s.cells[2].innerHTML,a=/member\s<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),n=/<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),o=d(n),c=d(a)
return n&&o!==r()&&c!==r()})(s)&&(o(s.cells).forEach(p),s.classList.add("fshGrey"),s.classList.add("fshXSmall"))}function u(s,e){const a=s.cells[2].innerHTML.split("'"),n=a[1]
a[1]=f(n),i(a.join("'"),s.cells[2]),function(s,e,a){e||a===t()||($(s).find("td").removeClass("row").css("font-size","xx-small"),s.style.color="gray")}(s,e,n)}function h(s){m(s),function(s){const e=c(s.cells[2]),a=e.includes("has invited the player");("'"===e.charAt(0)||a)&&u(s,a)}(s)}function y(){const s=e("td",a).find(n("Message"))
if(!s)return
const r=s.parentNode.parentNode.parentNode
s.innerHTML+='&nbsp;&nbsp;<span class="fshWhite">(Guild Log messages not involving self are dimmed!)</span>',l(r.rows,3,0).forEach(h)}function b(){s("hideNonPlayerGuildLogMessages")&&y()}export{b as a}
//# sourceMappingURL=addGuildLogWidgets-042a9474.js.map
