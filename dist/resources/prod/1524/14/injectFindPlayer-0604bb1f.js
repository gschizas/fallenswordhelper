import{y as a,o as e,D as s,E as t}from"./calfSystem-d587d232.js"
import{d as r}from"./dontPost-bc1edacc.js"
import{c as f,g as c,a as n,p as l,b as o}from"./levelHighlight-5c499030.js"
import{c as i}from"./closest-2b33b59d.js"
import{q as u}from"./quickBuffHref-a7c3924e.js"
function p(a){var e
a.preventDefault(),r((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function d(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(n,c,"1")}">Get GvG targets</a>`)}function m(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),d(a)}function b(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(f(),m(),$('table[class="width_full"]').find('a[href*="player_id"]').each(b))}
//# sourceMappingURL=injectFindPlayer-0604bb1f.js.map
