import{z as a,o as s,E as e,F as t}from"./calfSystem-fd021443.js"
import{d as f}from"./dontPost-18b03cba.js"
import{c as r,g as n,a as c,p as l,b as o}from"./levelHighlight-40280eac.js"
import{c as i}from"./closest-23d4903f.js"
import{q as u}from"./quickBuffHref-1c22292c.js"
function p(a){var s
a.preventDefault(),f((s=a.target,i("FORM",s)))}function h(a,s,t){return`${e}&search_level_min=${a}&search_level_max=${s}&search_in_guild=${t}`}function m(a){a.parent().append(`&nbsp;<a class="fshBlue" href="${h(o,l,"-1")}">Get PvP targets</a>&nbsp;<a class="fshBlue" href="${h(c,n,"1")}">Get GvG targets</a>`)}function d(){const a=$('input[value="Find Player"]')
!function(a){s(a,p)}(a[0]),m(a)}function v(a,s){const e=t.exec($(s).attr("href"))
$(s).after(` <a class="fshBf" ${u(e[1])}>[b]</a>`)}export default function(){a()||(r(),d(),$('table[class="width_full"]').find('a[href*="player_id"]').each(v))}
//# sourceMappingURL=injectFindPlayer-4621a794.js.map
