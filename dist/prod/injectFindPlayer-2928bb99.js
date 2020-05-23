import{z as a,o as e,E as s,F as t}from"./calfSystem-d06402b1.js"
import{d as r}from"./dontPost-a6e48caa.js"
import{c as f,g as n,a as c,p as l,b as o}from"./levelHighlight-118964a3.js"
import{c as i}from"./closest-0e7d337b.js"
import{q as u}from"./quickBuffHref-7624c50e.js"
function p(a){var e
a.preventDefault(),r((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function m(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(c,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),m(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(f(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-2928bb99.js.map
