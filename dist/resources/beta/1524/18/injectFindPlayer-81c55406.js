import{w as a,o as e,B as s,C as t}from"./calfSystem-4197cc22.js"
import{d as f}from"./dontPost-c8e8377e.js"
import"./intValue-202eff7d.js"
import"./valueText-cddc877a.js"
import{c as r,g as c,a as n,p as o,b as i}from"./levelHighlight-b42c75aa.js"
import"./closest-5218baf6.js"
import{c as l}from"./closestForm-3cd1f491.js"
import{q as u}from"./quickBuffHref-fb2e01cb.js"
function p(a){a.preventDefault(),f(l(a.target))}function m(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,o,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(n,c,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),h(a)}function b(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-81c55406.js.map
