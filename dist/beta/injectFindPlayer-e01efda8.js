import{z as a,o as e,E as s,F as t}from"./calfSystem-99da704d.js"
import{d as f}from"./dontPost-af5ba7a2.js"
import{c as r,g as n,a as c,p as l,b as o}from"./levelHighlight-1ffbce6d.js"
import{c as i}from"./closest-5dc907d7.js"
import{q as u}from"./quickBuffHref-d5031e2c.js"
function d(a){var e
a.preventDefault(),f((e=a.target,i("FORM",e)))}function p(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${p(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${p(c,n,"1")}">Get GvG targets</a>`)}function m(){const a=$('input[value="Find Player"]')
!function(a){e(a,d)}(a[0]),h(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),m(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-e01efda8.js.map
