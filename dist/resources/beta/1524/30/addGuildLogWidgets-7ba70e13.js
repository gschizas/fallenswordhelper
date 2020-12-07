import{H as s,g as e,p as n,b0 as a,b1 as r,M as o,B as i,A as t}from"./calfSystem-ebf4b17d.js"
import{p as c}from"./playerName-1bc13590.js"
import{d as l}from"./dataRows-1def7750.js"
import{s as f}from"./searchPlayerHref-00276477.js"
function d(s){return s?Number(s[1]):0}function p(s){s.className=""}function m(s){(function(s){const e=s.cells[2].innerHTML,n=/member\s<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),a=/<a\shref="index\.php\?cmd=profile&amp;player_id=(\d+)/.exec(e),o=d(a),i=d(n)
return a&&o!==r()&&i!==r()})(s)&&(o(s.cells).forEach(p),s.classList.add("fshGrey"),s.classList.add("fshXSmall"))}function u(s,e){const n=s.cells[2].innerHTML.split("'"),a=n[1]
n[1]=f(a),t(n.join("'"),s.cells[2]),function(s,e,n){e||n===c()||($(s).find("td").removeClass("row").css("font-size","xx-small"),s.style.color="gray")}(s,e,a)}function h(s){m(s),function(s){const e=i(s.cells[2]),n=e.includes("has invited the player");("'"===e.charAt(0)||n)&&u(s,n)}(s)}function y(){const s=e("td",n).find(a("Message"))
if(!s)return
const r=s.parentNode.parentNode.parentNode
s.innerHTML+='&nbsp;&nbsp;<span class="fshWhite">(Guild Log messages not involving self are dimmed!)</span>',l(r.rows,3,0).forEach(h)}function b(){s("hideNonPlayerGuildLogMessages")&&y()}export{b as a}
//# sourceMappingURL=addGuildLogWidgets-7ba70e13.js.map
