import{w as a,o as e,B as s,C as t}from"./calfSystem-02ae8657.js"
import{d as f}from"./dontPost-c73663bf.js"
import"./intValue-514fe585.js"
import"./valueText-cd2843d1.js"
import{c as r,g as c,a as n,p as o,b as i}from"./levelHighlight-f38cd8e7.js"
import"./closest-8af29cf3.js"
import{c as l}from"./closestForm-2319dd5e.js"
import{q as u}from"./quickBuffHref-0459cf30.js"
function p(a){a.preventDefault(),f(l(a.target))}function m(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function d(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,o,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(n,c,"1")}">Get GvG targets</a>`)}function h(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),d(a)}function j(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),h(),$('table[class="width_full"]').find('a[href*="player_id"]').each(j))}
//# sourceMappingURL=injectFindPlayer-f667c962.js.map
