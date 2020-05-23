import{z as a,o as e,E as s,F as t}from"./calfSystem-fb94ddf0.js"
import{d as f}from"./dontPost-9febdb8a.js"
import{c as r,g as n,a as l,p as o,b as c}from"./levelHighlight-ae002e9e.js"
import{c as i}from"./closest-3210f804.js"
import{q as u}from"./quickBuffHref-6f629a9d.js"
function p(a){var e
a.preventDefault(),f((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function d(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(c,o,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(l,n,"1")}">Get GvG targets</a>`)}function m(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),d(a)}function b(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),m(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-a8f2a8ea.js.map
