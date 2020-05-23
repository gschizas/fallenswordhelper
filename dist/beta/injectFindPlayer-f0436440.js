import{z as a,o as e,E as s,F as t}from"./calfSystem-70c0e373.js"
import{d as r}from"./dontPost-d8e94133.js"
import{c as f,g as n,a as c,p as l,b as o}from"./levelHighlight-669e8d98.js"
import{c as i}from"./closest-9d6eeb1b.js"
import{q as u}from"./quickBuffHref-fd03cd80.js"
function p(a){var e
a.preventDefault(),r((e=a.target,i("FORM",e)))}function d(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${d(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${d(c,n,"1")}">Get GvG targets</a>`)}function m(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),h(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(f(),m(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-f0436440.js.map
