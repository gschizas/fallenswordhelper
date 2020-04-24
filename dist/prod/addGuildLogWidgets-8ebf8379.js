import{G as s,g as e,p as n,bl as a,bm as o,aH as r,D as c,C as i,ac as t}from"./calfSystem-cb871cc0.js"
import{d as l}from"./dataRows-87df51bd.js"
import{s as f}from"./searchPlayerHref-b6316ef2.js"
function d(s){return s?Number(s[1]):0}function p(s){s.className=""}function m(s){(function(s){const e=s.cells[2].innerHTML,n=/member\s<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),a=/<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),r=d(a),c=d(n)
return a&&r!==o()&&c!==o()})(s)&&(r(s.cells).forEach(p),s.classList.add("fshGrey"),s.classList.add("fshXSmall"))}function u(s,e){const n=s.cells[2].innerHTML.split("'"),a=n[1]
n[1]=f(a),i(n.join("'"),s.cells[2]),function(s,e,n){e||n===t()||($(s).find("td").removeClass("row").css("font-size","xx-small"),s.style.color="gray")}(s,e,a)}function h(s){m(s),function(s){const e=c(s.cells[2]),n=e.includes("has invited the player");("'"===e.charAt(0)||n)&&u(s,n)}(s)}function b(){const s=e("td",n).find(a("Message"))
if(!s)return
const o=s.parentNode.parentNode.parentNode
s.innerHTML+='&nbsp;&nbsp;<span class="fshWhite">(Guild Log messages not involving self are dimmed!)</span>',l(o.rows,3,0).forEach(h)}function y(){s("hideNonPlayerGuildLogMessages")&&b()}export{y as a}
//# sourceMappingURL=addGuildLogWidgets-8ebf8379.js.map
