import{z as a,o as e,E as s,F as t}from"./calfSystem-2fb02284.js"
import{d as f}from"./dontPost-cf6d2cbc.js"
import{c as r,g as n,a as c,p as l,b as o}from"./levelHighlight-ed38ee66.js"
import{c as i}from"./closest-435e5cd2.js"
import{q as u}from"./quickBuffHref-a9a4aa74.js"
function p(a){var e
a.preventDefault(),f((e=a.target,i("FORM",e)))}function h(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function m(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(c,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),m(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(r(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-02681c82.js.map
