import{z as a,o as s,E as e,F as t}from"./calfSystem-8dc0fa4b.js"
import{d as f}from"./dontPost-c6d67b14.js"
import{c as r,g as c,a as n,p as l,b as o}from"./levelHighlight-390d1d11.js"
import{c as i}from"./closest-9cd85ce4.js"
import{q as u}from"./quickBuffHref-c30ff433.js"
function p(a){var s
a.preventDefault(),f((s=a.target,i("FORM",s)))}function d(a,s,t){return`${e}&search_level_min=${a}&search_level_max=${s}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${d(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${d(n,c,"1")}">Get GvG targets</a>`)}function m(){const a=$('input[value="Find Player"]')
!function(a){s(a,p)}(a[0]),h(a)}function v(a,s){const e=t.exec($(s).attr("href"))
$(s).after(` <a class="fshBf" ${u(e[1])}>[b]</a>`)}export default function(){a()||(r(),m(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-f5da4c13.js.map
