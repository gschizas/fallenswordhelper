import{w as a,o as e,B as s,C as t}from"./calfSystem-dec5e071.js"
import{d as r}from"./dontPost-5930c5be.js"
import"./intValue-8ad0a3ce.js"
import"./valueText-67a7e51e.js"
import{c,g as f,a as n,p as o,b as i}from"./levelHighlight-a4f5ecc7.js"
import"./closest-d88a3ae2.js"
import{c as l}from"./closestForm-b48fc8bc.js"
import{q as u}from"./quickBuffHref-2b8d222d.js"
function p(a){a.preventDefault(),r(l(a.target))}function m(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function d(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,o,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(n,f,"1")}">Get GvG targets</a>`)}function h(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),d(a)}function b(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(c(),h(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-83434175.js.map
