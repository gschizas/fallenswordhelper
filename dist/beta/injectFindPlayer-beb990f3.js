import{z as a,o as e,E as s,F as t}from"./calfSystem-07c25a1c.js"
import{d as r}from"./dontPost-cc24ebb5.js"
import{c as f,g as c,a as n,p as l,b as o}from"./levelHighlight-eb28b137.js"
import{c as i}from"./closest-10a75b5d.js"
import{q as u}from"./quickBuffHref-531c750e.js"
function p(a){var e
a.preventDefault(),r((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function m(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(n,c,"1")}">Get GvG targets</a>`)}function b(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),m(a)}function d(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(f(),b(),$('table[class="width_full"]').find('a[href*="player_id"]').each(d))}
//# sourceMappingURL=injectFindPlayer-beb990f3.js.map
