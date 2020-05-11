import{z as a,o as e,E as s,F as t}from"./calfSystem-72fdbe97.js"
import{d as f}from"./dontPost-ccc4e305.js"
import{c as r,g as n,a as c,p as l,b as o}from"./levelHighlight-715206b0.js"
import{c as i}from"./closest-495903f5.js"
import{q as u}from"./quickBuffHref-ce86ed14.js"
function p(a){var e
a.preventDefault(),f((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function m(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(c,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),m(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-3dee9126.js.map
