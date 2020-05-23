import{G as s,g as e,p as n,bn as a,bo as o,aH as r,D as i,C as t,ac as c}from"./calfSystem-2fb02284.js"
import{d as l}from"./dataRows-86353101.js"
import{s as f}from"./searchPlayerHref-b96f3f8a.js"
function d(s){return s?Number(s[1]):0}function p(s){s.className=""}function m(s){(function(s){const e=s.cells[2].innerHTML,n=/member\s<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),a=/<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),r=d(a),i=d(n)
return a&&r!==o()&&i!==o()})(s)&&(r(s.cells).forEach(p),s.classList.add("fshGrey"),s.classList.add("fshXSmall"))}function u(s,e){const n=s.cells[2].innerHTML.split("'"),a=n[1]
n[1]=f(a),t(n.join("'"),s.cells[2]),function(s,e,n){e||n===c()||($(s).find("td").removeClass("row").css("font-size","xx-small"),s.style.color="gray")}(s,e,a)}function h(s){m(s),function(s){const e=i(s.cells[2]),n=e.includes("has invited the player");("'"===e.charAt(0)||n)&&u(s,n)}(s)}function y(){const s=e("td",n).find(a("Message"))
if(!s)return
const o=s.parentNode.parentNode.parentNode
s.innerHTML+='&nbsp;&nbsp;<span class="fshWhite">(Guild Log messages not involving self are dimmed!)</span>',l(o.rows,3,0).forEach(h)}function b(){s("hideNonPlayerGuildLogMessages")&&y()}export{b as a}
//# sourceMappingURL=addGuildLogWidgets-6f178f97.js.map
