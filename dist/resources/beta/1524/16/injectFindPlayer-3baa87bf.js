import{w as e,o as a,B as s,C as t}from"./calfSystem-9554b525.js"
import{d as f}from"./dontPost-03651e75.js"
import"./intValue-bb872327.js"
import"./valueText-350043d0.js"
import{c as r,g as n,a as o,p as c,b as i}from"./levelHighlight-5971fae0.js"
import"./closest-687f4f6c.js"
import{c as l}from"./closestForm-6e8f6fcc.js"
import{q as u}from"./quickBuffHref-21c66f8e.js"
function p(e){e.preventDefault(),f(l(e.target))}function m(e,a,t){return`${s}&search_level_min=${e}&search_level_max=${a}&search_in_guild=${t}`}function h(e){e.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,c,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(o,n,"1")}">Get GvG targets</a>`)}function d(){const e=$('input[value="Find Player"]')
!function(e){a(e,p)}(e[0]),h(e)}function b(e,a){const s=t.exec($(a).attr("href"))
$(a).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){e()||(r(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-3baa87bf.js.map
