import{z as a,o as e,E as s,F as t}from"./calfSystem-0e5d6faf.js"
import{d as f}from"./dontPost-2f9bbd28.js"
import{c as r,g as n,a as l,p as o,b as c}from"./levelHighlight-5250147f.js"
import{c as i}from"./closest-8e8851e4.js"
import{q as u}from"./quickBuffHref-f61ea389.js"
function p(a){var e
a.preventDefault(),f((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function m(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(c,o,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(l,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),m(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-e82d59bb.js.map
