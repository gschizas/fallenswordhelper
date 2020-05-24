import{y as a,o as e,D as s,E as t}from"./calfSystem-371c414c.js"
import{d as r}from"./dontPost-0ae0f7ca.js"
import{c as f,g as n,a as c,p as l,b as o}from"./levelHighlight-cee6b23a.js"
import{c as i}from"./closest-d5dda5d9.js"
import{q as u}from"./quickBuffHref-091b47a4.js"
function p(a){var e
a.preventDefault(),r((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function d(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(c,n,"1")}">Get GvG targets</a>`)}function m(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),d(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(f(),m(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-9849e4d2.js.map
