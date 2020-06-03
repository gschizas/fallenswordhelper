import{w as a,o as s,B as t,C as e}from"./calfSystem-f7574730.js"
import{d as r}from"./dontPost-f800280d.js"
import"./intValue-0280032d.js"
import"./valueText-686b8935.js"
import{c as f,g as c,a as n,p as o,b as i}from"./levelHighlight-c31cdec6.js"
import"./closest-807af018.js"
import{c as l}from"./closestForm-b93f80cc.js"
import{q as u}from"./quickBuffHref-4d02d277.js"
function p(a){a.preventDefault(),r(l(a.target))}function m(a,s,e){return`${t}&search_level_min=${a}&search_level_max=${s}&search_in_guild=${e}`}function d(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${m(i,o,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${m(n,c,"1")}">Get GvG targets</a>`)}function h(){const a=$('input[value="Find Player"]')
!function(a){s(a,p)}(a[0]),d(a)}function j(a,s){const t=e.exec($(s).attr("href"))
$(s).after(` <a class="fshBf" ${u(t[1])}>[b]</a>`)}export default function(){a()||(f(),h(),$('table[class="width_full"]').find('a[href*="player_id"]').each(j))}
//# sourceMappingURL=injectFindPlayer-277706c0.js.map
