import{z as a,o as e,E as s,F as t}from"./calfSystem-3956a623.js"
import{d as f}from"./dontPost-e1ef8cf2.js"
import{c as r,g as n,a as c,p as l,b as o}from"./levelHighlight-4d0b938d.js"
import{c as i}from"./closest-2eae17cf.js"
import{q as u}from"./quickBuffHref-3ec701a4.js"
function p(a){var e
a.preventDefault(),f((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function m(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(c,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),m(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-280a84d0.js.map
