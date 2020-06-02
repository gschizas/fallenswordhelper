import{w as a,o as e,B as s,C as t}from"./calfSystem-1c103624.js"
import{d as r}from"./dontPost-f9ce543e.js"
import"./intValue-f5e62e5b.js"
import"./valueText-ef8b2cab.js"
import{c as f,g as c,a as n,p as o,b as i}from"./levelHighlight-4a16cb82.js"
import"./closest-a4273a71.js"
import{c as l}from"./closestForm-29ccb52c.js"
import{q as u}from"./quickBuffHref-62aa05f3.js"
function p(a){a.preventDefault(),r(l(a.target))}function m(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,o,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(n,c,"1")}">Get GvG targets</a>`)}function b(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),h(a)}function d(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(f(),b(),$('table[class="width_full"]').find('a[href*="player_id"]').each(d))}
//# sourceMappingURL=injectFindPlayer-f529499e.js.map
