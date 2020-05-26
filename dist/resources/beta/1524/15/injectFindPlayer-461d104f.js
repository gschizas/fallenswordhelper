import{w as a,o as e,B as s,C as t}from"./calfSystem-1262535f.js"
import{d as r}from"./dontPost-780742ab.js"
import"./intValue-c4584407.js"
import"./valueText-03ad0c73.js"
import{c as f,g as n,a as i,p as l,b as o}from"./levelHighlight-a8f02673.js"
import{c}from"./closest-20389d90.js"
import{q as u}from"./quickBuffHref-e5e6eaa1.js"
function p(a){var e
a.preventDefault(),r((e=a.target,c("FORM",e)))}function m(a,e,t){return`${s}&search_level_min=${a}&search_level_max=${e}&search_in_guild=${t}`}function h(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(i,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){e(a,p)}(a[0]),h(a)}function v(a,e){const s=t.exec($(e).attr("href"))
$(e).after(` <a class="fshBf" ${u(s[1])}>[b]</a>`)}export default function(){a()||(f(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-461d104f.js.map
