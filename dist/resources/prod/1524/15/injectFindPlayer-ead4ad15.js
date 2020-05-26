import{w as a,o as e,B as s,C as t}from"./calfSystem-740ec4d2.js"
import{d as r}from"./dontPost-e5e24e4d.js"
import"./intValue-576c2dec.js"
import"./valueText-3095af99.js"
import{c as f,g as n,a as c,p as i,b as l}from"./levelHighlight-2bc51b91.js"
import{c as o}from"./closest-a3325de8.js"
import{q as u}from"./quickBuffHref-239a5ae3.js"
function p(a){var e
a.preventDefault(),r((e=a.target,o("FORM",e)))}function m(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(l,i,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(c,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),h(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(f(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-ead4ad15.js.map
