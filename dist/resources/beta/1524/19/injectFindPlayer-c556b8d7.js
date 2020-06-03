import{w as a,o as s,B as e,C as t}from"./calfSystem-57340987.js"
import{d as r}from"./dontPost-e24d8962.js"
import"./intValue-e99f58ac.js"
import"./valueText-2c905a41.js"
import{c as f,g as n,a as o,p as c,b as i}from"./levelHighlight-b0ca1a57.js"
import"./closest-f4291115.js"
import{c as l}from"./closestForm-3a23bbf2.js"
import{q as u}from"./quickBuffHref-718794f5.js"
function p(a){a.preventDefault(),r(l(a.target))}function m(a,s,t){return`${e}&search_level_min=${a}&search_level_max=${s}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,c,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(o,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){s(a,p)}(a[0]),h(a)}function b(a,s){const e=t.exec($(s).attr("href"))
$(s).after(` <a class="fshBf" ${u(e[1])}>[b]</a>`)}export default function(){a()||(f(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-c556b8d7.js.map
