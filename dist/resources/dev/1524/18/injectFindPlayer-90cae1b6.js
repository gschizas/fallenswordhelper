import{w as a,o as e,B as s,C as t}from"./calfSystem-5545a3e6.js"
import{d as r}from"./dontPost-14e1d4b8.js"
import"./intValue-02f9213d.js"
import"./valueText-3403f71f.js"
import{c as f,g as n,a as o,p as i,b as l}from"./levelHighlight-0bb6804e.js"
import"./closest-b938ab98.js"
import{c}from"./closestForm-eb32a866.js"
import{q as u}from"./quickBuffHref-a1c4d4e6.js"
function p(a){a.preventDefault(),r(c(a.target))}function m(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(l,i,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(o,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),h(a)}function b(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(f(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-90cae1b6.js.map
