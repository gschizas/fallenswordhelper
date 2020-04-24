import{z as a,o as e,E as s,F as t}from"./calfSystem-94018cd0.js"
import{d as f}from"./dontPost-cebe2d2a.js"
import{c as r,g as n,a as c,p as l,b as o}from"./levelHighlight-bd182928.js"
import{c as i}from"./closest-5434d1b1.js"
import{q as u}from"./quickBuffHref-ccf9ff2f.js"
function p(a){var e
a.preventDefault(),f((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function d(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(c,n,"1")}">Get GvG targets</a>`)}function m(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),d(a)}function b(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),m(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-a32d544d.js.map
