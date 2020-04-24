import{z as a,o as e,E as s,F as t}from"./calfSystem-9b1fa4ca.js"
import{d as f}from"./dontPost-f8f2337a.js"
import{c as r,g as n,a as c,p as l,b as o}from"./levelHighlight-e81bb645.js"
import{c as i}from"./closest-75cbef2b.js"
import{q as u}from"./quickBuffHref-f4a28822.js"
function p(a){var e
a.preventDefault(),f((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function m(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(c,n,"1")}">Get GvG targets</a>`)}function b(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),m(a)}function d(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),b(),$('table[class="width_full"]').find('a[href*="player_id"]').each(d))}
//# sourceMappingURL=injectFindPlayer-f38315a4.js.map
