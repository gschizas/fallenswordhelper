import{w as a,o as e,B as s,C as t}from"./calfSystem-6fc0cc1b.js"
import{d as r}from"./dontPost-7996c1bc.js"
import"./intValue-3f75a919.js"
import"./valueText-5a2c4671.js"
import{c,g as f,a as n,p as o,b as i}from"./levelHighlight-09d89820.js"
import"./closest-958712aa.js"
import{c as l}from"./closestForm-b7a4ace7.js"
import{q as u}from"./quickBuffHref-2e9ce6d8.js"
function p(a){a.preventDefault(),r(l(a.target))}function m(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,o,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(n,f,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),h(a)}function b(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(c(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-a1d640e4.js.map
