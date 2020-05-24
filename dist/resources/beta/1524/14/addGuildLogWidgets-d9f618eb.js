import{F as s,g as e,p as n,bm as a,bn as o,aG as r,C as c,B as i,ab as t}from"./calfSystem-371c414c.js"
import{d as l}from"./dataRows-e367647c.js"
import{s as f}from"./searchPlayerHref-c3704fa7.js"
function d(s){return s?Number(s[1]):0}function p(s){s.className=""}function m(s){(function(s){const e=s.cells[2].innerHTML,n=/member\s<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),a=/<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),r=d(a),c=d(n)
return a&&r!==o()&&c!==o()})(s)&&(r(s.cells).forEach(p),s.classList.add("fshGrey"),s.classList.add("fshXSmall"))}function u(s,e){const n=s.cells[2].innerHTML.split("'"),a=n[1]
n[1]=f(a),i(n.join("'"),s.cells[2]),function(s,e,n){e||n===t()||($(s).find("td").removeClass("row").css("font-size","xx-small"),s.style.color="gray")}(s,e,a)}function h(s){m(s),function(s){const e=c(s.cells[2]),n=e.includes("has invited the player");("'"===e.charAt(0)||n)&&u(s,n)}(s)}function y(){const s=e("td",n).find(a("Message"))
if(!s)return
const o=s.parentNode.parentNode.parentNode
s.innerHTML+='&nbsp;&nbsp;<span class="fshWhite">(Guild Log messages not involving self are dimmed!)</span>',l(o.rows,3,0).forEach(h)}function g(){s("hideNonPlayerGuildLogMessages")&&y()}export{g as a}
//# sourceMappingURL=addGuildLogWidgets-d9f618eb.js.map
