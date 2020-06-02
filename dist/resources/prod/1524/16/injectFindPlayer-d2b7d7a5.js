import{w as a,o as e,B as s,C as t}from"./calfSystem-be09bdff.js"
import{d as f}from"./dontPost-c1d489a0.js"
import"./intValue-b1f59eab.js"
import"./valueText-ca5f01f1.js"
import{c as r,g as n,a as o,p as c,b as i}from"./levelHighlight-14caffd9.js"
import"./closest-81c3e392.js"
import{c as l}from"./closestForm-15394b22.js"
import{q as u}from"./quickBuffHref-e3f7893b.js"
function p(a){a.preventDefault(),f(l(a.target))}function m(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,c,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(o,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),h(a)}function b(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-d2b7d7a5.js.map
