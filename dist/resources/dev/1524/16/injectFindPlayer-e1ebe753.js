import{w as e,o as a,B as s,C as t}from"./calfSystem-d49dbbd3.js"
import{d as r}from"./dontPost-9ae48c7f.js"
import"./intValue-2ed328c8.js"
import"./valueText-064e4f1c.js"
import{c as f,g as c,a as n,p as o,b as i}from"./levelHighlight-acdb4dd3.js"
import"./closest-c1f1e24c.js"
import{c as l}from"./closestForm-b109e51b.js"
import{q as u}from"./quickBuffHref-70fb15c0.js"
function p(e){e.preventDefault(),r(l(e.target))}function m(e,a,t){return`${s}&search_level_min=${e}&search_level_max=${a}&search_in_guild=${t}`}function d(e){e.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,o,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(n,c,"1")}">Get GvG targets</a>`)}function h(){const e=$('input[value="Find Player"]')
!function(e){a(e,p)}(e[0]),d(e)}function b(e,a){const s=t.exec($(a).attr("href"))
$(a).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){e()||(f(),h(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-e1ebe753.js.map
